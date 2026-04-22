import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bio Generator — Professional Bio in Seconds | GenForge",
  description: "Generate a professional bio for your About page, LinkedIn or social media instantly with AI.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}