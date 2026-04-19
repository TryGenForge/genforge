"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("genforge_pro", "true");
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#08080F", color: "#fff", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div>
        <div style={{ fontSize: "60px", marginBottom: "24px" }}>🎉</div>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "12px" }}>
          You're now <span style={{ color: "#7B5EFF" }}>Pro!</span>
        </h1>
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "32px" }}>
          Unlimited name generations. Forever.
        </p>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "linear-gradient(135deg, #7B5EFF, #5B3EDD)",
            color: "#fff", border: "none", borderRadius: "12px",
            padding: "14px 28px", fontSize: "16px", fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Start Generating →
        </button>
      </div>
    </main>
  );
}