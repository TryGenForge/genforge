import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Elevator Pitch Generator — Perfect Your Pitch | GenForge",
  description: "Craft the perfect 30-second elevator pitch for investors and customers. AI-powered pitch generator.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}