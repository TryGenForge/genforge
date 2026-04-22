import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Social Media Bio Generator — Instagram, LinkedIn, X | GenForge",
  description: "Create punchy social media bios for Instagram, LinkedIn and X in seconds with AI.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}