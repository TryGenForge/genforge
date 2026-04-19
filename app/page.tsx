"use client";
import { useState, useEffect } from "react";

const FREE_LIMIT = 3;
const STORAGE_KEY = "genforge_count";
const PRO_KEY = "genforge_pro";

interface BusinessName {
  name: string;
  tagline: string;
  reason: string;
}

export default function Home() {
  const [businessType, setBusinessType] = useState("");
  const [results, setResults] = useState<BusinessName[]>([]);
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    const pro = localStorage.getItem(PRO_KEY) === "true";
    setUsageCount(count);
    setIsPro(pro);
  }, []);

  const handleGenerate = async () => {
    if (!businessType.trim()) return;
    if (!isPro && usageCount >= FREE_LIMIT) {
      setShowPaywall(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, keywords: "", style: "modern" }),
      });
      const data = await res.json();
      setResults(data.names);
      if (!isPro) {
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const remaining = Math.max(0, FREE_LIMIT - usageCount);

  return (
    <main style={{ minHeight: "100vh", background: "#08080F", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      
      <header style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "sans-serif", fontSize: "20px", fontWeight: 800, color: "#7B5EFF" }}>
          Gen<span style={{ color: "#fff" }}>Forge</span>
        </div>
        <div style={{ border: "1px solid #00E5FF", borderRadius: "20px", padding: "6px 14px", fontSize: "12px", color: "#00E5FF" }}>
          AI-Powered
        </div>
      </header>

      <section style={{ textAlign: "center", padding: "60px 24px 40px", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(#7B5EFF11 1px, transparent 1px), linear-gradient(90deg, #7B5EFF11 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none"
        }} />
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          border: "1px solid #7B5EFF44", borderRadius: "20px",
          padding: "6px 16px", fontSize: "11px", letterSpacing: "2px",
          color: "#888", marginBottom: "32px"
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7B5EFF", display: "inline-block" }} />
          BUSINESS NAME GENERATOR
        </div>
        <h1 style={{ fontSize: "clamp(36px, 8vw, 64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px", position: "relative" }}>
          Generate <span style={{ color: "#7B5EFF" }}>1000+</span><br />
          Business Names<br />
          in Seconds
        </h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: 1.6, marginBottom: "0" }}>
          10 free ideas instantly. No signup required.<br />
          Upgrade once for unlimited names.
        </p>
      </section>

      <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px 40px" }}>
        <input
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Enter your business type (e.g. coffee shop, gym...)"
          style={{
            width: "100%", background: "#0f0f1a", border: "1px solid #7B5EFF44",
            borderRadius: "12px", padding: "16px 20px", color: "#fff",
            fontSize: "15px", outline: "none", boxSizing: "border-box",
            marginBottom: "12px"
          }}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !businessType.trim()}
          style={{
            width: "100%", background: loading ? "#333" : "linear-gradient(135deg, #7B5EFF, #5B3EDD)",
            color: "#fff", border: "none", borderRadius: "12px",
            padding: "16px", fontSize: "16px", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", marginBottom: "16px"
          }}
        >
          {loading ? "Generating..." : "⚡ Generate Business Names"}
        </button>
        {!isPro && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: i < remaining ? "#7B5EFF" : "#333"
              }} />
            ))}
            <span style={{ color: "#666", fontSize: "13px", marginLeft: "4px" }}>
              {remaining} of 3 free generations remaining
            </span>
          </div>
        )}
      </section>

      {results.length > 0 ? (
        <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {results.map((item, i) => (
              <div key={i} style={{
                background: "#0f0f1a", border: "1px solid #1a1a2e",
                borderRadius: "12px", padding: "16px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>{item.name}</div>
                  <div style={{ color: "#666", fontSize: "12px" }}>{item.tagline}</div>
                </div>
                <button
                  onClick={() => handleCopy(item.name)}
                  style={{
                    background: "none", border: "1px solid #333", borderRadius: "8px",
                    padding: "6px 10px", cursor: "pointer", color: copied === item.name ? "#00E5FF" : "#666",
                    fontSize: "12px", flexShrink: 0, marginLeft: "8px"
                  }}
                >
                  {copied === item.name ? "✓" : "⧉"}
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px 40px" }}>
          <div style={{ color: "#444", fontSize: "11px", letterSpacing: "1px", marginBottom: "12px" }}>
            — EXAMPLE RESULTS FOR "TECH STARTUP"
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {["NexaCore", "Vaultix", "Syntrex", "Zephyr Labs", "Orbio", "Kaldra"].map((name) => (
              <div key={name} style={{
                background: "#0f0f1a", border: "1px solid #1a1a2e",
                borderRadius: "12px", padding: "16px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ fontWeight: 700 }}>{name}</span>
                <span style={{ color: "#333", fontSize: "16px" }}>⧉</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { icon: "✓", text: "No signup needed" },
            { icon: "✓", text: "Instant results" },
            { icon: "✓", text: "No subscription" },
            { icon: "★", text: "500+ entrepreneurs" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666", fontSize: "14px" }}>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%",
                background: "#7B5EFF22", border: "1px solid #7B5EFF44",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", color: "#7B5EFF", flexShrink: 0
              }}>
                {item.icon}
              </div>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {!isPro && (
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{
            background: "#0f0f1a", border: "1px solid #7B5EFF44",
            borderRadius: "16px", padding: "28px 24px",
            textAlign: "center"
          }}>
            <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
              Unlock <span style={{ color: "#7B5EFF" }}>Unlimited</span> Names
            </h3>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
              One-time payment. No subscription. Ever.
            </p>
            <button
              onClick={() => setShowPaywall(true)}
              style={{
                width: "100%", background: "none",
                border: "1px solid #7B5EFF", borderRadius: "10px",
                padding: "14px", fontSize: "15px", fontWeight: 700,
                cursor: "pointer", color: "#7B5EFF"
              }}
            >
              Get Unlimited — €4.99
            </button>
          </div>
        </section>
      )}

      {showPaywall && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100
        }}>
          <div style={{
            background: "#0f0f1a", border: "1px solid #7B5EFF44",
            borderRadius: "20px", padding: "40px", maxWidth: "420px",
            width: "90%", textAlign: "center"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚡</div>
            <h2 style={{ fontSize: "24px", marginBottom: "12px" }}>Unlock Unlimited Names</h2>
            <p style={{ color: "#888", marginBottom: "28px", fontSize: "14px" }}>
              One-time payment. No subscription. Ever.
            </p>
            <div style={{
              background: "#7B5EFF11", border: "1px solid #7B5EFF44",
              borderRadius: "12px", padding: "20px", marginBottom: "20px"
            }}>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>€4.99</div>
              <div style={{ color: "#888", fontSize: "13px" }}>one-time · no subscription</div>
            </div>
            <button style={{
              width: "100%", background: "linear-gradient(135deg, #7B5EFF, #00E5FF)",
              color: "#fff", border: "none", borderRadius: "12px",
              padding: "16px", fontSize: "16px", fontWeight: 700,
              cursor: "pointer", marginBottom: "12px"
            }}>
              Get Unlimited — €4.99
            </button>
            <div onClick={() => setShowPaywall(false)} style={{ color: "#444", fontSize: "13px", cursor: "pointer" }}>
              Close
            </div>
          </div>
        </div>
      )}
    </main>
  );
}