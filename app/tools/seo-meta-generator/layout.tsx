import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "SEO Meta Generator — Rank on Google | GenForge",
  description: "Generate optimised title tags and meta descriptions that rank on Google. AI-powered SEO tool.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}