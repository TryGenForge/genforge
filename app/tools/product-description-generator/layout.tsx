import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Product Description Generator — Sell More | GenForge",
  description: "Write compelling product descriptions that convert browsers into buyers. AI-powered for e-commerce.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}