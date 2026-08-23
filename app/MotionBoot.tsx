"use client";

import { useEffect } from "react";

export function MotionBoot() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loader = document.querySelector<HTMLElement>(".site-loader");
    const loaderCount = document.querySelector<HTMLElement>("[data-loader-count]");
    const loaderStarted = performance.now();
    const timers: number[] = [];
    const animationFrames = new Set<number>();

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    };

    const requestFrame = (callback: FrameRequestCallback) => {
      const frame = window.requestAnimationFrame((time) => {
        animationFrames.delete(frame);
        callback(time);
      });
      animationFrames.add(frame);
      return frame;
    };

    const closeLoader = () => {
      const minimumDisplay = reduceMotion ? 0 : 900;
      const elapsed = performance.now() - loaderStarted;

      schedule(() => {
        loader?.classList.add("is-leaving");
        document.documentElement.classList.add("site-revealing");

        schedule(() => {
          document.documentElement.classList.add("site-loaded");
          loader?.setAttribute("hidden", "");
        }, reduceMotion ? 0 : 450);
      }, Math.max(0, minimumDisplay - elapsed));
    };

    if (!loader) {
      document.documentElement.classList.add("site-loaded");
    } else if (!reduceMotion && loaderCount) {
      const updateLoaderCount = (now: number) => {
        const progress = Math.min((now - loaderStarted) / 850, 1);
        loaderCount.textContent = String(Math.round(progress * 100)).padStart(2, "0");
        if (progress < 1) requestFrame(updateLoaderCount);
      };
      requestFrame(updateLoaderCount);
    } else if (loaderCount) {
      loaderCount.textContent = "100";
    }

    closeLoader();

    const send = (event: string) => {
      const payload = JSON.stringify({ event, path: location.pathname });
      if (!navigator.sendBeacon?.("/api/events", payload)) {
        void fetch("/api/events", { method: "POST", body: payload, headers: { "Content-Type": "text/plain" }, keepalive: true, credentials: "same-origin" });
      }
    };

    send("page_view");
    let sent50 = false;
    let sent90 = false;
    let observer: IntersectionObserver | undefined;

    if (!reduceMotion) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;

          element.animate(
            [{ opacity: 0.76, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 580, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" },
          );

          if (element.dataset.count) {
            const target = Number(element.dataset.count);
            const decimals = Number(element.dataset.decimals || 0);
            const suffix = element.dataset.suffix || "";
            const started = performance.now();

            const updateCount = (now: number) => {
              const progress = Math.min((now - started) / 900, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              element.textContent = (target * eased).toFixed(decimals) + suffix;
              if (progress < 1) requestFrame(updateCount);
            };

            requestFrame(updateCount);
          }

          observer?.unobserve(element);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

      document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]").forEach((element) => observer?.observe(element));
    }

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const depth = max > 0 ? scrollY / max : 0;
      if (depth >= 0.5 && !sent50) { sent50 = true; send("scroll_depth_50"); }
      if (depth >= 0.9 && !sent90) { sent90 = true; send("scroll_depth_90"); }
    };

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-track]");
      if (target?.dataset.track) send(target.dataset.track);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      timers.forEach(window.clearTimeout);
      animationFrames.forEach(window.cancelAnimationFrame);
    };
  }, []);

  return null;
}
