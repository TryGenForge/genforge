import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cold Email Generator — Outreach That Gets Replies | GenForge",
  description: "Write cold emails that get replies, not sent to spam. AI-powered outreach email generator.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}