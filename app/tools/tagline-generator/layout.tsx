import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tagline Generator — Create Catchy Slogans | GenForge",
  description: "Generate memorable taglines for your brand in seconds. AI-powered tagline generator for entrepreneurs and small businesses.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}