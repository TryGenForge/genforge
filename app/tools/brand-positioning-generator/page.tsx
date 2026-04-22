"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PRO_KEY = "genforge_pro";

export default function BrandPositioningGenerator() {
  const [businessType, setBusinessType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [uniqueValue, setUniqueValue] = useState("");
  const [previewResult, setPreviewResult] = useState<any>(null);
  const [fullResult, setFullResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    setIsPro(localStorage.getItem(PRO_KEY) === "true");
  }, []);

  const handleGenerate = async () => {
    if (!businessType.trim()) return;
    setLoading(true);
    setShowPaywall(false);
    try {
      const res = await fetch("/api/brand-positioning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, targetAudience, competitors, uniqueValue }),
      });
      const data = await res.json();
      if (isPro) {
        setFullResult(data);
        setPreviewResult(null);
      } else {
        setPreviewResult(data);
        setFullResult(null);
        setShowPaywall(true);
      }
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
    background: "#0f0f0f", border: "1px solid #242424",
    borderRadius: "10px", padding: "14px 18px", color: "#fff",
    fontSize: "14px", outline: "none", fontFamily: "inherit",
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
        <Link href="/" style={{ fontFamily: "sans-serif", fontSize: "19px", fontWeight: 800, color: "#f0f0f0", textDecoration: "none" }}>
          Gen<span style={{ color: "#7c3aed" }}>Forge</span>
        </Link>
        {!isPro ? (
          <button onClick={handleCheckout} disabled={checkoutLoading} style={{
            background: "#7c3aed", color: "#fff", border: "none",
            padding: "8px 18px", borderRadius: "7px", fontSize: "13px",
            fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
          }}>
            {checkoutLoading ? "Loading..." : "Get PRO — €9.99"}
          </button>
        ) : (
          <div style={{
            background: "rgba(124,58,237,0.12)", color: "#a78bfa",
            border: "1px solid rgba(124,58,237,0.25)",
            padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600
          }}>PRO</div>
        )}
      </nav>

      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 40px 40px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: "20px", padding: "5px 12px", fontSize: "12px", color: "#a78bfa",
          marginBottom: "24px", fontWeight: 600
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
          PRO Tool
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "16px" }}>
          Brand Positioning <span style={{ color: "#7c3aed" }}>Generator</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.6, marginBottom: "40px", fontWeight: 300 }}>
          Stand out from competitors with a clear positioning statement.
        </p>
      </section>

      <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
          <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="Business type (e.g. project management SaaS...)" style={inputStyle} />
          <input value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="Target audience (e.g. remote teams, freelancers...)" style={inputStyle} />
          <input value={competitors} onChange={(e) => setCompetitors(e.target.value)} placeholder="Main competitors (e.g. Notion, Asana, Trello...)" style={inputStyle} />
          <input value={uniqueValue} onChange={(e) => setUniqueValue(e.target.value)} placeholder="Your unique value (e.g. AI-powered automation...)" style={inputStyle} />
        </div>
        <button onClick={handleGenerate} disabled={loading || !businessType.trim()} style={{
          width: "100%", background: loading ? "#222" : "#7c3aed",
          color: "#fff", border: "none", borderRadius: "10px",
          padding: "14px", fontSize: "15px", fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit"
        }}>
          {loading ? "Generating..." : "Generate Positioning Statement"}
        </button>
      </section>

      {previewResult && !isPro && (
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 20px" }}>
          <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#444", marginBottom: "10px" }}>Preview</div>
            <div style={{ fontSize: "14px", color: "#ccc", lineHeight: 1.7 }}>{previewResult.statement}</div>
          </div>
        </section>
      )}

      {showPaywall && !isPro && (
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 40px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ filter: "blur(6px)", pointerEvents: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Target Audience Refinement", "Core Brand Promise", "3 Alternative Positioning Angles"].map((t, i) => (
                <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "10px", padding: "16px 20px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700 }}>{t}</div>
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>Unlock to see full details.</div>
                </div>
              ))}
            </div>
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: "linear-gradient(to bottom, transparent, #080808 60%)"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #130d20, #0e0e16)",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: "14px", padding: "28px 32px", textAlign: "center", maxWidth: "340px"
              }}>
                <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>Unlock full positioning report</h3>
                <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px", fontWeight: 300 }}>One payment. All tools. Forever.</p>
                <button onClick={handleCheckout} disabled={checkoutLoading} style={{
                  width: "100%", background: "#7c3aed", color: "#fff", border: "none",
                  padding: "13px", borderRadius: "8px", fontSize: "15px",
                  fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
                }}>
                  {checkoutLoading ? "Loading..." : "Get Unlimited — €9.99"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {fullResult && isPro && (
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Positioning Statement</div>
              <div style={{ fontSize: "15px", color: "#ccc", lineHeight: 1.7 }}>{fullResult.statement}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
                <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Target Audience</div>
                <div style={{ fontSize: "13px", color: "#888" }}>{fullResult.targetAudience}</div>
              </div>
              <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
                <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Differentiation</div>
                <div style={{ fontSize: "13px", color: "#888" }}>{fullResult.differentiation}</div>
              </div>
            </div>
            <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Brand Promise</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#a78bfa" }}>{fullResult.promise}</div>
            </div>
            <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "11px", color: "#444", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Alternative Angles</div>
              {fullResult.alternatives?.map((a: string, i: number) => (
                <div key={i} style={{ fontSize: "13px", color: "#888", marginBottom: "8px", paddingLeft: "12px", borderLeft: "2px solid #333" }}>{a}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{
        borderTop: "1px solid #1c1c1c", padding: "28px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px"
      }}>
        <Link href="/" style={{ fontSize: "15px", fontWeight: 800, color: "#444", textDecoration: "none" }}>
          Gen<span style={{ color: "#7c3aed" }}>Forge</span>
        </Link>
        <div style={{ display: "flex", gap: "28px" }}>
          {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Refund", href: "/refund" }, { label: "Contact", href: "/contact" }].map((l) => (
            <Link key={l.label} href={l.href} style={{ fontSize: "12px", color: "#444", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#333" }}>© 2026 GenForge</div>
      </footer>

    </main>
  );
}