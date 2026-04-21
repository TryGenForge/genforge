"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PRO_KEY = "genforge_pro";

interface Description {
  description: string;
  reason: string;
}

export default function ProductDescriptionGenerator() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [audience, setAudience] = useState("");
  const [results, setResults] = useState<Description[]>([]);
  const [previewResult, setPreviewResult] = useState<Description | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const pro = localStorage.getItem(PRO_KEY) === "true";
    setIsPro(pro);
  }, []);

  const handleGenerate = async () => {
    if (!productName.trim()) return;
    setLoading(true);
    setShowPaywall(false);
    try {
      const res = await fetch("/api/product-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, category, features, audience }),
      });
      const data = await res.json();
      if (isPro) {
        setResults(data.descriptions);
        setPreviewResult(null);
      } else {
        setPreviewResult(data.descriptions[0]);
        setResults([]);
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif" }}>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,8,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1c1c1c", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px", height: "60px" }}>
        <Link href="/" style={{ fontFamily: "sans-serif", fontSize: "19px", fontWeight: 800, color: "#f0f0f0", textDecoration: "none" }}>
          Gen<span style={{ color: "#7c3aed" }}>Forge</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isPro && (
            <button onClick={handleCheckout} disabled={checkoutLoading} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "7px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
              {checkoutLoading ? "Loading..." : "Get PRO — €4.99"}
            </button>
          )}
          {isPro && (
            <div style={{ background: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>PRO</div>
          )}
        </div>
      </nav>

      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 40px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "20px", padding: "5px 12px", fontSize: "12px", color: "#a78bfa", marginBottom: "24px", fontWeight: 600 }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
          PRO Tool
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "16px" }}>
          Product Description <span style={{ color: "#7c3aed" }}>Generator</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.6, marginBottom: "40px", fontWeight: 300 }}>
          Write compelling product descriptions that convert browsers into buyers.
        </p>
      </section>

      <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
          <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product name (e.g. Wireless Earbuds Pro)" style={{ background: "#0f0f0f", border: "1px solid #242424", borderRadius: "10px", padding: "14px 18px", color: "#fff", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category (e.g. electronics, fashion, food...)" style={{ background: "#0f0f0f", border: "1px solid #242424", borderRadius: "10px", padding: "14px 18px", color: "#fff", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
          <input value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Key features (e.g. waterproof, 30h battery, noise cancelling...)" style={{ background: "#0f0f0f", border: "1px solid #242424", borderRadius: "10px", padding: "14px 18px", color: "#fff", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
          <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Target audience (e.g. gym goers, remote workers...)" style={{ background: "#0f0f0f", border: "1px solid #242424", borderRadius: "10px", padding: "14px 18px", color: "#fff", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
        </div>
        <button onClick={handleGenerate} disabled={loading || !productName.trim()} style={{ width: "100%", background: loading ? "#222" : "#7c3aed", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
          {loading ? "Generating..." : "Generate Descriptions"}
        </button>
      </section>

      {previewResult && !isPro && (
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 20px" }}>
          <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#444", marginBottom: "10px" }}>Preview</div>
            <div style={{ fontSize: "15px", lineHeight: 1.6, marginBottom: "8px" }}>{previewResult.description}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{previewResult.reason}</div>
          </div>
        </section>
      )}

      {showPaywall && !isPro && (
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 40px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ filter: "blur(6px)", pointerEvents: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Premium quality meets everyday functionality.", "Designed for those who refuse to compromise.", "The last product you'll ever need to buy.", "Built to exceed expectations, priced to impress.", "Where performance meets style."].map((t, i) => (
                <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "10px", padding: "16px 20px" }}>
                  <div style={{ fontSize: "14px" }}>{t}</div>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom, transparent, #080808 60%)" }}>
              <div style={{ background: "linear-gradient(135deg, #130d20, #0e0e16)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "14px", padding: "28px 32px", textAlign: "center", maxWidth: "340px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>Unlock all 6 descriptions</h3>
                <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px", fontWeight: 300 }}>One payment. All tools. Forever.</p>
                <button onClick={handleCheckout} disabled={checkoutLoading} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {checkoutLoading ? "Loading..." : "Get Unlimited — €4.99"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {results.length > 0 && isPro && (
        <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {results.map((item, i) => (
              <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", lineHeight: 1.6, marginBottom: "6px" }}>{item.description}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>{item.reason}</div>
                </div>
                <button onClick={() => handleCopy(item.description)} style={{ background: "none", border: "1px solid #242424", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", color: copied === item.description ? "#a78bfa" : "#444", fontSize: "12px", flexShrink: 0, marginLeft: "12px", fontFamily: "inherit" }}>
                  {copied === item.description ? "✓" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer style={{ borderTop: "1px solid #1c1c1c", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px" }}>
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