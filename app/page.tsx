"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const FREE_LIMIT = 3;
const STORAGE_KEY = "genforge_count";
const PRO_KEY = "genforge_pro";

interface BusinessName {
  name: string;
  tagline: string;
  reason: string;
}

const tools = [
  { name: "Business Name Generator", desc: "Generate unique names for your business in seconds.", badge: "FREE", category: "Branding", href: "/" },
  { name: "Tagline Generator", desc: "Catchy slogans that make your brand stick.", badge: "PRO", category: "Branding", href: "/tools/tagline-generator" },
  { name: "Mission Statement", desc: "Define your company vision and mission.", badge: "PRO", category: "Branding", href: "/tools/mission-statement-generator" },
  { name: "Brand Story", desc: "Tell the story behind your brand.", badge: "PRO", category: "Branding", href: "/tools/brand-story-generator" },
  { name: "Bio Generator", desc: "Professional About page bio in seconds.", badge: "PRO", category: "Online Presence", href: "/tools/bio-generator" },
  { name: "Product Description", desc: "Selling copy for your products.", badge: "PRO", category: "Online Presence", href: "/tools/product-description-generator" },
  { name: "SEO Meta Generator", desc: "Title and description tags for Google.", badge: "PRO", category: "Online Presence", href: "/tools/seo-meta-generator" },
  { name: "Social Media Bio", desc: "Instagram, LinkedIn, X bios optimised.", badge: "PRO", category: "Online Presence", href: "/tools/social-media-bio-generator" },
  { name: "Elevator Pitch", desc: "The perfect 30-second business pitch.", badge: "PRO", category: "Growth", href: "#" },
  { name: "Cold Email Generator", desc: "Outreach emails that get replies.", badge: "PRO", category: "Growth", href: "#" },
];

const categories = ["All", "Branding", "Online Presence", "Growth", "Planning", "Finance"];

const badgeStyle: Record<string, React.CSSProperties> = {
  FREE: { background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" },
  PRO: { background: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" },
  NEW: { background: "rgba(249,115,22,0.1)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" },
};

export default function Home() {
  const [businessType, setBusinessType] = useState("");
  const [results, setResults] = useState<BusinessName[]>([]);
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);

  useEffect(() => {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    const pro = localStorage.getItem(PRO_KEY) === "true";
    setUsageCount(count);
    setIsPro(pro);
  }, []);

  const handleGenerate = async () => {
    if (!businessType.trim()) return;
    if (!isPro && usageCount >= FREE_LIMIT) {
      handleCheckout();
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

  const remaining = Math.max(0, FREE_LIMIT - usageCount);

  const filteredTools = tools.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,8,8,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1c1c1c",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px", height: "60px"
      }}>
        <div style={{ fontFamily: "sans-serif", fontSize: "19px", fontWeight: 800, color: "#f0f0f0" }}>
          Gen<span style={{ color: "#7c3aed" }}>Forge</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isPro && (
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              style={{
                background: "#7c3aed", color: "#fff", border: "none",
                padding: "8px 18px", borderRadius: "7px", fontSize: "13px",
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              {checkoutLoading ? "Loading..." : "Get PRO — €4.99"}
            </button>
          )}
          {isPro && (
            <div style={{
              background: "rgba(124,58,237,0.12)", color: "#a78bfa",
              border: "1px solid rgba(124,58,237,0.25)",
              padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600
            }}>
              PRO
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px 60px", display: "grid", gridTemplateColumns: "1fr 400px", gap: "60px", alignItems: "center" }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "20px", padding: "5px 12px", fontSize: "12px", color: "#a78bfa",
            marginBottom: "24px", fontWeight: 600, letterSpacing: "0.3px"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
            10 AI-powered tools — growing weekly
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "18px", fontFamily: "sans-serif" }}>
            Build your business<br />
            <span style={{ color: "#7c3aed" }}>faster</span> with AI
          </h1>
          <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.6, marginBottom: "32px", fontWeight: 300 }}>
            From branding to growth — every tool you need to start and scale. One payment, everything unlocked.
          </p>
          <div style={{
            display: "flex", background: "#0f0f0f", border: "1px solid #242424",
            borderRadius: "10px", overflow: "hidden", maxWidth: "440px"
          }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              style={{
                flex: 1, background: "transparent", border: "none",
                padding: "13px 16px", color: "#f0f0f0", fontSize: "14px",
                fontFamily: "inherit", outline: "none"
              }}
            />
            <button style={{
              background: "#7c3aed", border: "none", padding: "13px 18px",
              color: "#fff", cursor: "pointer", fontSize: "16px"
            }}>→</button>
          </div>
        </div>

        {/* FEATURED CARD */}
        <div style={{
          background: "linear-gradient(145deg, #130d20 0%, #0e0e0e 60%)",
          border: "1px solid rgba(124,58,237,0.3)", borderRadius: "16px", padding: "28px"
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#444", marginBottom: "16px" }}>
            Most popular
          </div>
          <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.3px" }}>
            Business Name Generator
          </div>
          <div style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "20px", fontWeight: 300 }}>
            Generate unique, memorable business names tailored to your industry and brand personality.
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <button
              onClick={() => setShowGenerator(true)}
              style={{
                background: "#7c3aed", color: "#fff", border: "none",
                padding: "10px 20px", borderRadius: "7px", fontSize: "13px",
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              Try free →
            </button>
            <span style={{ ...badgeStyle.FREE, fontSize: "10px", fontWeight: 700, padding: "4px 9px", borderRadius: "5px", letterSpacing: "0.8px" }}>
              FREE
            </span>
          </div>
          <div style={{ borderTop: "1px solid #1c1c1c", paddingTop: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Tagline Generator", badge: "PRO" },
                { name: "Elevator Pitch", badge: "NEW" },
                { name: "Mission Statement", badge: "PRO" },
              ].map((t) => (
                <div key={t.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#888", fontWeight: 600 }}>{t.name}</span>
                  <span style={{ ...badgeStyle[t.badge], fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px", letterSpacing: "0.5px" }}>
                    {t.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GENERATOR (показва се при клик на Try free) */}
      {showGenerator && (
        <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 40px 60px" }}>
          <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "16px", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800 }}>Business Name Generator</h2>
              <button onClick={() => setShowGenerator(false)} style={{ background: "none", border: "none", color: "#444", fontSize: "20px", cursor: "pointer" }}>×</button>
            </div>
            <input
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Enter your business type (e.g. coffee shop, gym...)"
              style={{
                width: "100%", background: "#141414", border: "1px solid #242424",
                borderRadius: "10px", padding: "14px 18px", color: "#fff",
                fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "12px",
                fontFamily: "inherit"
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !businessType.trim()}
              style={{
                width: "100%", background: loading ? "#222" : "#7c3aed",
                color: "#fff", border: "none", borderRadius: "10px",
                padding: "14px", fontSize: "15px", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer", marginBottom: "16px",
                fontFamily: "inherit"
              }}
            >
              {loading ? "Generating..." : "Generate Business Names"}
            </button>

            {!isPro && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: i < remaining ? "#7c3aed" : "#222"
                  }} />
                ))}
                <span style={{ color: "#555", fontSize: "12px", marginLeft: "4px" }}>
                  {remaining} of 3 free generations remaining
                </span>
              </div>
            )}

            {results.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {results.map((item, i) => (
                  <div key={i} style={{
                    background: "#141414", border: "1px solid #1c1c1c",
                    borderRadius: "10px", padding: "14px 16px",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "2px" }}>{item.name}</div>
                      <div style={{ color: "#555", fontSize: "11px" }}>{item.tagline}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(item.name)}
                      style={{
                        background: "none", border: "1px solid #242424", borderRadius: "6px",
                        padding: "5px 8px", cursor: "pointer",
                        color: copied === item.name ? "#a78bfa" : "#444",
                        fontSize: "11px", flexShrink: 0, marginLeft: "8px", fontFamily: "inherit"
                      }}
                    >
                      {copied === item.name ? "✓" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TOOLS SECTION */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px 80px" }}>

        {/* FILTER TABS */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "32px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "7px 18px", borderRadius: "7px", fontSize: "13px",
                cursor: "pointer", fontFamily: "inherit", fontWeight: 400,
                transition: "all 0.15s",
                background: activeCategory === cat ? "rgba(124,58,237,0.12)" : "transparent",
                color: activeCategory === cat ? "#a78bfa" : "#888",
                border: activeCategory === cat ? "1px solid rgba(124,58,237,0.3)" : "1px solid #1c1c1c",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#444" }}>Featured</span>
          <div style={{ flex: 1, height: "1px", background: "#1c1c1c" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "40px" }}>
          {tools.slice(0, 3).map((tool) => (
            <div
              key={tool.name}
              onClick={() => { if (tool.name === "Business Name Generator") { setShowGenerator(true); } else if (tool.href !== "#") { window.location.href = tool.href; } }}
              style={{
                background: "linear-gradient(145deg, #110d1a 0%, #0f0f0f 100%)",
                border: "1px solid rgba(124,58,237,0.2)", borderRadius: "12px",
                padding: "20px", cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "8px",
                  background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
                }}>✦</div>
                <span style={{ ...badgeStyle[tool.badge], fontSize: "10px", fontWeight: 700, padding: "4px 9px", borderRadius: "5px", letterSpacing: "0.8px" }}>
                  {tool.badge}
                </span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "6px", letterSpacing: "-0.2px" }}>{tool.name}</div>
              <div style={{ fontSize: "12px", color: "#666", lineHeight: 1.5, fontWeight: 300 }}>{tool.desc}</div>
            </div>
          ))}
        </div>

        {/* ALL TOOLS */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#444" }}>All Tools</span>
          <div style={{ flex: 1, height: "1px", background: "#1c1c1c" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "60px" }}>
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              onClick={() => { if (tool.name === "Business Name Generator") { setShowGenerator(true); } else if (tool.href !== "#") { window.location.href = tool.href; } }}
              style={{
                background: "#0f0f0f", border: "1px solid #1c1c1c",
                borderRadius: "10px", padding: "14px 16px", cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700 }}>{tool.name}</span>
                <span style={{ ...badgeStyle[tool.badge], fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px", letterSpacing: "0.5px" }}>
                  {tool.badge}
                </span>
              </div>
              <div style={{ fontSize: "11px", color: "#444", lineHeight: 1.4 }}>{tool.desc}</div>
            </div>
          ))}
        </div>

        {/* PRO BANNER */}
        {!isPro && (
          <div style={{
            background: "linear-gradient(135deg, #130d20 0%, #0e0e16 100%)",
            border: "1px solid rgba(124,58,237,0.25)", borderRadius: "14px",
            padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "60px"
          }}>
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "6px", letterSpacing: "-0.3px" }}>
                Unlock every tool. One payment.
              </h3>
              <p style={{ fontSize: "14px", color: "#888", fontWeight: 300 }}>
                Get unlimited access to all AI business tools — forever.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#a78bfa", fontFamily: "sans-serif" }}>
                €4.99 <span style={{ fontSize: "14px", color: "#444", fontWeight: 400, fontFamily: "inherit" }}>one-time</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                style={{
                  background: "#7c3aed", color: "#fff", border: "none",
                  padding: "13px 28px", borderRadius: "8px", fontSize: "15px",
                  fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
                }}
              >
                {checkoutLoading ? "Loading..." : "Get PRO →"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #1c1c1c", padding: "28px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: "15px", fontWeight: 800, color: "#444" }}>
          Gen<span style={{ color: "#7c3aed" }}>Forge</span>
        </div>
        <div style={{ display: "flex", gap: "28px" }}>
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Refund", href: "/refund" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link key={l.label} href={l.href} style={{ fontSize: "12px", color: "#444", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#333" }}>© 2026 GenForge</div>
      </footer>

    </main>
  );
}
