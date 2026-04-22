"use client";
import { useState, useEffect } from "react";

const PRO_KEY = "genforge_pro";

export default function BrandVoiceGenerator() {
  const [businessType, setBusinessType] = useState("");
  const [audience, setAudience] = useState("");
  const [personality, setPersonality] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    setIsPro(localStorage.getItem(PRO_KEY) === "true");
  }, []);

  const handleGenerate = async () => {
    if (!businessType.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/brand-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, audience, personality }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", background: "#141414", border: "1px solid #242424",
    borderRadius: "10px", padding: "14px 18px", color: "#fff",
    fontSize: "14px", outline: "none", boxSizing: "border-box" as const,
    marginBottom: "12px", fontFamily: "inherit",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,8,8,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1c1c1c",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px", height: "60px"
      }}>
        <a href="/" style={{ fontFamily: "sans-serif", fontSize: "19px", fontWeight: 800, color: "#f0f0f0", textDecoration: "none" }}>
          Gen<span style={{ color: "#7c3aed" }}>Forge</span>
        </a>
        {!isPro && (
          <button onClick={handleCheckout} disabled={checkoutLoading} style={{
            background: "#7c3aed", color: "#fff", border: "none",
            padding: "8px 18px", borderRadius: "7px", fontSize: "13px",
            fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
          }}>
            {checkoutLoading ? "Loading..." : "Get PRO — €9.99"}
          </button>
        )}
      </nav>

      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 40px" }}>
        <a href="/" style={{ fontSize: "13px", color: "#555", textDecoration: "none", display: "block", marginBottom: "32px" }}>← Back to all tools</a>

        <h1 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px", marginBottom: "8px" }}>Brand Voice Generator</h1>
        <p style={{ fontSize: "15px", color: "#666", marginBottom: "40px", fontWeight: 300 }}>
          Define your tone of voice and communication style.
        </p>

        {!isPro ? (
          <div style={{
            background: "linear-gradient(145deg, #130d20 0%, #0e0e0e 100%)",
            border: "1px solid rgba(124,58,237,0.3)", borderRadius: "16px", padding: "40px", textAlign: "center"
          }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>✦</div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>PRO Tool</h2>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px", fontWeight: 300 }}>
              Unlock Brand Voice Generator and all other tools for a one-time payment.
            </p>
            <button onClick={handleCheckout} disabled={checkoutLoading} style={{
              background: "#7c3aed", color: "#fff", border: "none",
              padding: "14px 32px", borderRadius: "8px", fontSize: "15px",
              fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
            }}>
              {checkoutLoading ? "Loading..." : "Get PRO — €9.99"}
            </button>
          </div>
        ) : (
          <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "16px", padding: "32px" }}>
            <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="Business type (e.g. fitness studio, law firm...)" style={inputStyle} />
            <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Target audience (e.g. young professionals, parents...)" style={inputStyle} />
            <input value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="Personality (e.g. bold and energetic, calm and trustworthy...)" style={inputStyle} />
            <button onClick={handleGenerate} disabled={loading || !businessType.trim()} style={{
              width: "100%", background: loading ? "#222" : "#7c3aed",
              color: "#fff", border: "none", borderRadius: "10px",
              padding: "14px", fontSize: "15px", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit"
            }}>
              {loading ? "Generating..." : "Generate Brand Voice"}
            </button>
          </div>
        )}

        {result && isPro && (
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Tone</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#a78bfa" }}>{result.tone}</div>
            </div>
            <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Brand Adjectives</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {result.adjectives?.map((a: string, i: number) => (
                  <span key={i} style={{ background: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>{a}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
                <div style={{ fontSize: "11px", color: "#4ade80", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Do's</div>
                {result.dos?.map((d: string, i: number) => (
                  <div key={i} style={{ fontSize: "13px", color: "#888", marginBottom: "8px", paddingLeft: "12px", borderLeft: "2px solid #4ade80" }}>{d}</div>
                ))}
              </div>
              <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
                <div style={{ fontSize: "11px", color: "#f87171", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Don'ts</div>
                {result.donts?.map((d: string, i: number) => (
                  <div key={i} style={{ fontSize: "13px", color: "#888", marginBottom: "8px", paddingLeft: "12px", borderLeft: "2px solid #f87171" }}>{d}</div>
                ))}
              </div>
            </div>
            <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Example Sentences</div>
              {result.examples?.map((e: string, i: number) => (
                <div key={i} style={{ fontSize: "14px", color: "#888", marginBottom: "10px", fontStyle: "italic", paddingLeft: "12px", borderLeft: "2px solid #333" }}>"{e}"</div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}