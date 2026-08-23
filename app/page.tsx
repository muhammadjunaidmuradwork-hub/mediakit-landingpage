import type { Metadata } from "next";
import { MediaKitPage } from "./MediaKitPage";

export const metadata: Metadata = {
  title: "Annie Azhar | tireddesimom Media Kit",
  description:
    "Meet Annie Azhar (Qurratulain), the creator behind tireddesimom: practical DIY, honest reviews, lifestyle, food and fitness content for an engaged audience concentrated in Pakistan.",
};

export default function Home() {
  return <MediaKitPage />;
}
