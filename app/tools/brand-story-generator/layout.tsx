import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Brand Story Generator — Tell Your Story | GenForge",
  description: "Create a compelling brand story that connects with your audience. AI-powered generator for entrepreneurs.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}