import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission Statement Generator — Define Your Purpose | GenForge",
  description: "Create a powerful mission statement for your company in seconds. AI-powered generator for entrepreneurs and small businesses.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}