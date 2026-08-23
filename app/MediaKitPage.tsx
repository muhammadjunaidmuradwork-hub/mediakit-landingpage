/* Local WebP assets use explicit dimensions and native lazy loading to avoid Vinext's client-side image runtime. */
/* eslint-disable @next/next/no-img-element */
import { MotionBoot } from "./MotionBoot";

const brands = [
  { name: "Shan", logo: "/logos/shan.png" },
  { name: "Daraz", logo: "/logos/daraz.png" },
  { name: "Jazz", logo: "/logos/jazz.png" },
  { name: "Tapmad", logo: "/logos/tapmad.png" },
  { name: "Diamond Paints", logo: "/logos/diamond-paints.png" },
  { name: "Bluebird Paints", logo: "/logos/bluebird-paints.png" },
  { name: "Alpinebear", logo: "/logos/alpinebear.png" },
  { name: "Astonish", logo: "/logos/astonish.png" },
  { name: "Rollover Kids Company", logo: "/logos/rollover.png" },
  { name: "Idealancy", logo: "/logos/idealancy.png" },
  { name: "Techmanistan", logo: "/logos/techmanistan.png" },
  { name: "Popbar", logo: "/logos/popbar.png" },
  { name: "Pattex", logo: "/logos/patex.png" },
  { name: "Anaajpur", logo: "/logos/anaajpur.png" },
  { name: "With Influence", logo: "/logos/withinfluence.png" },
  { name: "Tandruste", logo: "/logos/tandruste.png" },
  { name: "Hair Pantry", logo: "/logos/hair-pantry.png" },
  { name: "Skin Pantry", logo: "/logos/skin-pantry.png" },
  { name: "Elo", logo: "/logos/elo.png" },
  { name: "Powerhouse Express", logo: "/logos/powerhouse-express.png" },
  { name: "Mtronic", logo: "/logos/mtronic.png" },
];

const featuredBrandProof = [
  { name: "Daraz", logo: "/logos/daraz.png", result: "Best Affiliate Influencer of the Year" },
  { name: "Shan", logo: "/logos/shan.png", result: "Recipe storytelling for a household name" },
  { name: "Jazz", logo: "/logos/jazz.png", result: "Creator content for a national audience" },
];

const collaborationFormats = [
  ["01", "Reels + Collabs", "Creator video with brand partnership visibility"],
  ["02", "Story Launches", "Fast, useful storytelling built to earn the tap"],
  ["03", "Static Content", "Saveable posts with a clear product or lifestyle role"],
  ["04", "Across Platforms", "One coordinated package across the channels that matter"],
  ["05", "Paid Usage Rights", "Creative prepared for brand amplification and advertising"],
];

const reels = [
  { label: "Big things come to those who don't settle for small ones!!", url: "https://www.instagram.com/reel/DX6j5r-IFPw/", image: "/images/reel-daraz-big-things.webp", alt: "Daraz reel cover reading Big things come to those who don't settle for small ones" },
  { label: "I HATE COOKING", url: "https://www.instagram.com/reel/DRjza3aiBEm/", image: "/images/reel-shan-hate-cooking.webp", alt: "Shan Easy Tandoori Chicken reel cover reading I hate cooking" },
  { label: "تین مسئلے، تین الماریاں", url: "https://www.instagram.com/reel/DPv6E3JiATE/", image: "/images/reel-kitchen-three-cabinets.webp", alt: "Kitchen organization reel cover reading three problems, three cabinets in Urdu" },
  { label: "PAINTING...", url: "https://www.instagram.com/reel/DGu_24nI2iZ/", image: "/images/reel-bluebird-painting.webp", alt: "Bluebird Paints reel cover showing Annie painting a wall green" },
  { label: "5 FLAVORS!!", url: "https://www.instagram.com/reel/DCT2ysuI4RO/", image: "/images/reel-popbar-five-flavors.webp", alt: "Popbar ice cream reel cover displaying five flavors" },
];

const insightProof = [
  { src: "/images/insights-overview.webp", alt: "Instagram Insights showing 5,215,918 views in 30 days", stat: "5.2M", label: "views / 30 days", featured: true },
  { src: "/images/insights-content.webp", alt: "Instagram Insights showing 1,530,142 viewers and top content performance", stat: "1.53M", label: "viewers" },
  { src: "/images/insights-audience.webp", alt: "Instagram audience insights showing an 81.5 percent women audience", stat: "81.5%", label: "women" },
  { src: "/images/insights-locations.webp", alt: "Instagram audience insights showing Pakistan as the top location at 79.6 percent", stat: "79.6%", label: "Pakistan" },
  { src: "/images/insights-story-views.webp", alt: "Instagram story insights with individual stories reaching more than 16 thousand views", stat: "16.4K", label: "top story views" },
  { src: "/images/insights-story-likes.webp", alt: "Instagram story insights showing strong likes and replies across recent stories", stat: "126", label: "story likes" },
  { src: "/images/insights-story-shares.webp", alt: "Instagram story insights showing 80 shares on a fitness story", stat: "80", label: "story shares" },
  { src: "/images/insights-story-clicks.webp", alt: "Instagram story insights showing 666 link clicks on a single story", stat: "666", label: "link clicks" },
];

function Arrow() {
  return <span aria-hidden="true">↗︎</span>;
}

export function MediaKitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Annie Azhar",
    alternateName: ["Qurratulain", "tireddesimom"],
    jobTitle: "UGC Creator and Lifestyle Content Creator",
    url: "https://www.instagram.com/tireddesimom/",
    email: "mailto:tireddesimom@gmail.com",
    sameAs: ["https://www.instagram.com/tireddesimom/"],
  };

  return (
    <main>
      <div className="site-loader" role="status" aria-live="polite" aria-label="Desimom is loading">
          <div className="loader-top">
            <span className="loader-wordmark">tired<span>desi</span>mom</span>
            <span>Media kit</span>
          </div>
          <div className="loader-stage" aria-hidden="true">
            <div className="loader-title">
              <span className="loader-tired">tired</span>
              <span className="loader-desi">desi</span>
              <span className="loader-mom">mom</span>
            </div>
            <div className="loader-marquee">
              <span>Desimom is loading · Desimom is loading · Desimom is loading · Desimom is loading · </span>
              <span>Desimom is loading · Desimom is loading · Desimom is loading · Desimom is loading · </span>
            </div>
          </div>
          <div className="loader-bottom">
            <span>Real life · useful ideas · Seedhi Baat, No Bakwas</span>
            <strong data-loader-count>00</strong>
          </div>
          <div className="loader-track" aria-hidden="true"><span /></div>
      </div>
      <noscript><style>{`html{overflow:auto!important}.site-loader{display:none}`}</style></noscript>
      <MotionBoot />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="tireddesimom home">tired<span>desi</span>mom</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#audience">Audience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" data-track="media_kit_download" href="/api/download?file=media-kit">Media kit <span aria-hidden="true">↓</span></a>
      </header>

      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow" data-reveal>UGC creator · Lifestyle · Pakistan</p>
          <h1 data-reveal>
            <span className="hero-bold"><span>Real Life.</span><span>Useful Ideas.</span></span>
            <em>Seedhi Baat, No Bakwas.</em>
          </h1>
          <p className="hero-proof" data-reveal>1.53M monthly viewers <span>·</span> 81.5% women <span>·</span> 79.6% in Pakistan</p>
          <p className="hero-intro" data-reveal>
            Annie Azhar <span>(Qurratulain)</span> turns practical knowledge, honest recommendations and everyday chaos into content people save, share and act on.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button button-dark" data-track="media_kit_download" href="/api/download?file=media-kit">Download Media Kit <span aria-hidden="true">↓</span></a>
            <a className="button button-ghost" data-track="book_collab" href="mailto:tireddesimom@gmail.com?subject=Collaboration%20with%20tireddesimom">Book a Collab <Arrow /></a>
          </div>
        </div>

        <div className="hero-visual" data-reveal>
          <div className="hero-sticker">Engineer<br />turned<br />✦ creator ✦</div>
          <div className="hero-image-wrap">
            <img src="/images/annie-profile.webp" alt="Portrait of Annie Azhar, creator behind tireddesimom" width={612} height={612} fetchPriority="high" decoding="async" className="cover-image hero-profile" />
          </div>
          <div className="hero-caption"><span>01</span> Creator · DIYer · Reviewer · Gym freak · Meetha lover</div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Audience performance highlights">
        <div><strong><span data-count="5.2" data-decimals="1" data-suffix="M">5.2M</span></strong><span>views / 30 days</span></div>
        <div><strong><span data-count="1.53" data-decimals="2" data-suffix="M">1.53M</span></strong><span>unique viewers</span></div>
        <div><strong><span data-count="2.2" data-decimals="1" data-suffix="M">2.2M</span></strong><span>story views</span></div>
        <div><strong><span data-count="1.2" data-decimals="1" data-suffix="M">1.2M</span></strong><span>reel views</span></div>
      </section>

      <section className="about section-pad" id="about">
        <div className="section-kicker" data-reveal><span>02</span><p>Meet Annie</p></div>
        <div className="about-grid" data-reveal>
          <h2>Engineering Brain.<br /><em>Creator energy.</em></h2>
          <div className="about-copy">
            <p>By training, Annie is a telecom engineer. By instinct, she is the friend who has already tested the tool, tried the hack and found the honest answer.</p>
            <p>Her world moves between practical DIYs, useful product reviews, viral recipes, gym life and a very real love of <em>meetha</em>. Everything is delivered with warmth, wit and practical detail.</p>
          </div>
        </div>

        <div className="pillars" aria-label="Content pillars">
          {[
            ["01", "DIY + Tools", "Practical guides that build confidence"],
            ["02", "Honest Reviews", "Products, tested in real life"],
            ["03", "Food + Meetha", "Viral recipes worth trying"],
            ["04", "Fitness", "Gym life without the performance"],
            ["05", "Everyday Living", "Useful, candid and relatable"],
          ].map(([number, title, description], index) => (
            <article key={title} className={`pillar pillar-${index + 1}`} data-reveal>
              <span>{number}</span><h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="audience section-pad" id="audience">
        <div className="section-kicker light" data-reveal><span>03</span><p>The audience</p></div>
        <div className="audience-heading" data-reveal>
          <h2>An audience ready to purchase with <em>real influence.</em></h2>
          <p>Instagram insights · 30 day snapshot supplied August 2026</p>
        </div>

        <div className="audience-grid">
          <div className="audience-big" data-reveal>
            <span className="audience-number" data-count="81.5" data-decimals="1" data-suffix="%">81.5%</span>
            <h3>women</h3>
            <p>A community led by women making household, lifestyle, wellness and family purchase decisions.</p>
          </div>
          <div className="audience-bars" data-reveal>
            <h3>Age</h3>
            {[["25–34", "55.5%", 55.5], ["35–44", "27.7%", 27.7], ["18–24", "10.2%", 10.2]].map(([label, value, width]) => (
              <div className="bar-row" key={label as string}>
                <div><span>{label}</span><strong>{value}</strong></div>
                <div className="bar"><span style={{ width: `${width}%` }} /></div>
              </div>
            ))}
            <p className="bar-note"><strong>83.2%</strong> are ages 25–44.</p>
          </div>
          <div className="audience-bars locations" data-reveal>
            <h3>Top locations</h3>
            {[["Pakistan", "79.6%", 79.6], ["India", "5.2%", 5.2], ["United Kingdom", "2.8%", 2.8], ["UAE", "2.3%", 2.3]].map(([label, value, width]) => (
              <div className="bar-row" key={label as string}>
                <div><span>{label}</span><strong>{value}</strong></div>
                <div className="bar"><span style={{ width: `${width}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="platform section-pad">
        <div className="section-kicker" data-reveal><span>04</span><p>Platform snapshot</p></div>
        <div className="platform-card" data-reveal>
          <div className="platform-title"><span>Instagram</span><a href="https://www.instagram.com/tireddesimom/" target="_blank" rel="noreferrer">@tireddesimom <Arrow /></a></div>
          <div className="platform-metric"><strong data-count="50.9" data-decimals="1" data-suffix="%">50.9%</strong><span>views from people beyond her followers</span></div>
          <div className="platform-metric"><strong data-count="1" data-suffix="M+">1M+</strong><span>top content views</span></div>
          <div className="platform-metric"><strong data-count="666">666</strong><span>link clicks on a top story</span></div>
          <p className="platform-note">A community built through stories, with meaningful discovery beyond the existing follower base.</p>
        </div>
        <div className="proof-head" data-reveal>
          <h2>Receipts,<br /><em>not promises.</em></h2>
          <p>Selected Instagram Insights supplied directly by Annie. Performance shown reflects the captured 30 day reporting period.</p>
        </div>
        <div className="insight-wall" aria-label="Instagram Insights evidence">
          {insightProof.map((item) => (
            <figure className={`insight-shot${item.featured ? " featured" : ""}`} key={item.src} data-reveal>
              <div className="insight-image">
                <img src={item.src} alt={item.alt} width={1080} height={2316} loading="lazy" decoding="async" className="cover-image" />
              </div>
              <figcaption><strong>{item.stat}</strong><span>{item.label}</span><i aria-hidden="true">Verified insight</i></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="section-kicker" data-reveal><span>05</span><p>Selected work</p></div>
        <div className="work-head" data-reveal><h2>Content that earns<br /><em>the tap.</em></h2><p>Five recent examples across product storytelling, home, lifestyle and food.</p></div>
        <div className="reel-grid">
          {reels.map((reel, index) => (
            <a key={reel.url} className="reel-card" href={reel.url} target="_blank" rel="noreferrer" data-reveal>
              <img src={reel.image} alt={reel.alt} width={320} height={448} loading="lazy" decoding="async" className="reel-image" />
              <span className="reel-shade" aria-hidden="true" />
              <span className="reel-number">0{index + 1}</span><span className="reel-play">PLAY ↗</span><h3>{reel.label}</h3><p>View on Instagram</p>
            </a>
          ))}
        </div>
      </section>

      <section className="brands section-pad">
        <div className="section-kicker light" data-reveal><span>06</span><p>Trusted by</p></div>
        <h2 data-reveal>From household names to<br /><em>homegrown favourites.</em></h2>
        <div className="brand-proof-grid" data-reveal>
          {featuredBrandProof.map((brand, index) => (
            <article className={index === 1 ? "accent" : ""} key={brand.name}>
              <div className="brand-mark"><img src={brand.logo} alt={`${brand.name} logo`} width={140} height={72} loading="lazy" decoding="async" /></div>
              <p>{brand.result}</p>
            </article>
          ))}
        </div>
        <div className="brand-logo-grid" aria-label="Past brand collaborations">
          {brands.filter((brand) => !featuredBrandProof.some((featured) => featured.name === brand.name)).map((brand) => (
            <div className="brand-logo-cell" key={brand.name} data-reveal>
              {brand.logo ? <img src={brand.logo} alt={`${brand.name} logo`} width={112} height={56} loading="lazy" decoding="async" /> : <span className="logo-fallback" aria-label={`${brand.name} logo asset pending`}>SP</span>}
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="recognition section-pad">
        <div className="section-kicker" data-reveal><span>07</span><p>Recognition</p></div>
        <div className="recognition-grid">
          <article className="recognition-card magazine" data-reveal>
            <div className="recognition-image"><img src="/images/magone-painting-walls-feature.webp" alt="Mag One Weekly interview with Annie Azhar titled Painting Walls, Breaking Stereotypes" width={1368} height={2048} loading="lazy" decoding="async" className="cover-image" /></div>
            <div><span>Editorial feature</span><h3>“Painting Walls, Breaking Stereotypes”</h3><p>Featured in Mag One Weekly for building a community rooted in relatability, DIY confidence and real life.</p></div>
          </article>
          <article className="recognition-card award" data-reveal>
            <div className="recognition-image"><img src="/images/daraz-affiliate-award.webp" alt="Daraz eCommerce Summit Best Affiliate Influencer of the Year award held by Annie Azhar" width={1086} height={1448} loading="lazy" decoding="async" className="cover-image" /></div>
            <div><span>Award</span><h3>Best Affiliate Influencer of the Year</h3><p>Recognised at the Daraz eCommerce Summit for her commercial impact as a creator.</p></div>
          </article>
        </div>
      </section>

      <section className="collab section-pad">
        <div className="section-kicker" data-reveal><span>08</span><p>Ways to work together</p></div>
        <div className="collab-grid" data-reveal>
          <h2>Built for brands that value <em>trust over theatre.</em></h2>
          <div className="collab-summary">
            <p>Standard delivery window: <strong>two weeks.</strong></p>
            <p>Full rate card and package pricing are included in the download below.</p>
            <a className="button button-outline" data-track="rate_card_download" href="/api/download?file=rate-card">Download Rate Card <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="service-cards" aria-label="Collaboration formats">
          {collaborationFormats.map(([number, title, description]) => (
            <article className="service-card" key={title} data-reveal>
              <span>{number}</span><h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="download-panel section-pad">
        <div data-reveal>
          <span className="download-tag">The quick download</span>
          <h2>Numbers, audience and proof. <em>Ready for your team.</em></h2>
          <p>Download the full media kit for the clearest snapshot of Annie’s audience, content and commercial fit.</p>
          <a className="button button-yellow" data-track="media_kit_download" href="/api/download?file=media-kit">Download Media Kit <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div data-reveal>
          <p className="eyebrow">Have a brief in mind?</p>
          <h2>Let’s make something <em>genuinely useful.</em></h2>
          <div className="contact-actions">
            <a className="contact-link" data-track="email_contact" href="mailto:tireddesimom@gmail.com?subject=Brand%20collaboration%20with%20Annie%20Azhar">tireddesimom@gmail.com <Arrow /></a>
            <a className="contact-link" data-track="instagram_dm" href="https://www.instagram.com/direct/t/124095245649990/" target="_blank" rel="noreferrer">Send an Instagram DM <Arrow /></a>
          </div>
          <div className="social-handles" aria-label="Social handles">
            <a className="social-link" href="https://www.instagram.com/tireddesimom" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/logos/instagram.svg" alt="" aria-hidden="true" />
            </a>
            <a className="social-link" href="https://www.tiktok.com/@tireddesimom_" target="_blank" rel="noreferrer" aria-label="TikTok">
              <img src="/logos/tiktok.svg" alt="" aria-hidden="true" />
            </a>
            <a className="social-link" href="https://www.facebook.com/TIREDDESIMOM" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="/logos/facebook.svg" alt="" aria-hidden="true" />
            </a>
            <a className="social-link" href="https://www.youtube.com/@tireddesimom_" target="_blank" rel="noreferrer" aria-label="YouTube">
              <img src="/logos/youtube.svg" alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">tired<span>desi</span>mom</a>
        <p>© {new Date().getFullYear()} Annie Azhar (Qurratulain)</p>
        <a href="https://www.instagram.com/tireddesimom/" target="_blank" rel="noreferrer">Instagram ↗</a>
      </footer>
    </main>
  );
}
