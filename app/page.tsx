"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "genforge_count";
const PRO_KEY = "genforge_pro";
const FREE_LIMIT = 3;

const tools = [
  { name: "Business Name Generator", desc: "Generate unique, memorable business names in seconds.", badge: "FREE", category: "Branding", href: "/", icon: "✦", color: "#7c3aed" },
  { name: "Tagline Generator", desc: "Catchy slogans that make your brand stick.", badge: "PRO", category: "Branding", href: "/tools/tagline-generator", icon: "◈", color: "#2563eb" },
  { name: "Mission Statement", desc: "Define your company vision and mission.", badge: "PRO", category: "Branding", href: "/tools/mission-statement-generator", icon: "◎", color: "#db2777" },
  { name: "Brand Story", desc: "Tell the story behind your brand.", badge: "PRO", category: "Branding", href: "/tools/brand-story-generator", icon: "❋", color: "#ea580c" },
  { name: "Brand Voice", desc: "Define your tone of voice and style.", badge: "PRO", category: "Branding", href: "/tools/brand-voice-generator", icon: "◉", color: "#0891b2" },
  { name: "Company Values", desc: "Generate core values that define your culture.", badge: "PRO", category: "Branding", href: "/tools/company-values-generator", icon: "◆", color: "#7c3aed" },
  { name: "Brand Positioning", desc: "Stand out from competitors clearly.", badge: "PRO", category: "Branding", href: "/tools/brand-positioning-generator", icon: "◐", color: "#16a34a" },
  { name: "Logo Concept", desc: "Creative logo concepts for your designer.", badge: "PRO", category: "Branding", href: "/tools/logo-concept-generator", icon: "◑", color: "#ca8a04" },
  { name: "Bio Generator", desc: "Professional About page bio in seconds.", badge: "PRO", category: "Online Presence", href: "/tools/bio-generator", icon: "◭", color: "#dc2626" },
  { name: "Product Description", desc: "Selling copy for your products.", badge: "PRO", category: "Online Presence", href: "/tools/product-description-generator", icon: "◬", color: "#7c3aed" },
  { name: "SEO Meta Generator", desc: "Title and description tags for Google.", badge: "PRO", category: "Online Presence", href: "/tools/seo-meta-generator", icon: "◈", color: "#2563eb" },
  { name: "Social Media Bio", desc: "Instagram, LinkedIn, X bios optimised.", badge: "PRO", category: "Online Presence", href: "/tools/social-media-bio-generator", icon: "◎", color: "#db2777" },
  { name: "About Page", desc: "Write a compelling About page fast.", badge: "PRO", category: "Online Presence", href: "/tools/about-page-generator", icon: "❋", color: "#ea580c" },
  { name: "Homepage Headline", desc: "Hero headlines that convert visitors.", badge: "PRO", category: "Online Presence", href: "/tools/homepage-headline-generator", icon: "◉", color: "#0891b2" },
  { name: "FAQ Generator", desc: "FAQs that answer customers before they ask.", badge: "PRO", category: "Online Presence", href: "/tools/faq-generator", icon: "◆", color: "#16a34a" },
  { name: "Landing Page Copy", desc: "Full landing page copy ready to publish.", badge: "PRO", category: "Online Presence", href: "/tools/landing-page-copy-generator", icon: "◐", color: "#ca8a04" },
  { name: "Elevator Pitch", desc: "The perfect 30-second business pitch.", badge: "PRO", category: "Growth", href: "/tools/elevator-pitch-generator", icon: "◑", color: "#dc2626" },
  { name: "Cold Email", desc: "Outreach emails that get replies.", badge: "PRO", category: "Growth", href: "/tools/cold-email-generator", icon: "◭", color: "#7c3aed" },
  { name: "Ad Copy", desc: "Google and Facebook ads that drive clicks.", badge: "PRO", category: "Growth", href: "/tools/ad-copy-generator", icon: "◬", color: "#2563eb" },
  { name: "Blog Post Intro", desc: "Hook readers from the first sentence.", badge: "PRO", category: "Growth", href: "/tools/blog-post-intro-generator", icon: "◈", color: "#db2777" },
  { name: "CTA Generator", desc: "CTAs that turn visitors into customers.", badge: "PRO", category: "Growth", href: "/tools/cta-generator", icon: "◎", color: "#ea580c" },
  { name: "Lead Magnet Ideas", desc: "Free offer ideas that grow your email list.", badge: "PRO", category: "Growth", href: "/tools/lead-magnet-generator", icon: "❋", color: "#0891b2" },
  { name: "Testimonial Request", desc: "Emails that get customers to leave reviews.", badge: "PRO", category: "Growth", href: "/tools/testimonial-request-generator", icon: "◉", color: "#16a34a" },
  { name: "Business Plan", desc: "A concise business plan to share instantly.", badge: "PRO", category: "Planning", href: "/tools/business-plan-generator", icon: "◆", color: "#ca8a04" },
  { name: "SWOT Analysis", desc: "Analyse strengths, weaknesses, opportunities.", badge: "PRO", category: "Planning", href: "/tools/swot-generator", icon: "◐", color: "#dc2626" },
  { name: "Competitor Analysis", desc: "Structured competitor analysis in seconds.", badge: "PRO", category: "Planning", href: "/tools/competitor-analysis-generator", icon: "◑", color: "#7c3aed" },
  { name: "90-Day Goal Planner", desc: "Break your vision into a 90-day action plan.", badge: "PRO", category: "Planning", href: "/tools/goal-planner-generator", icon: "◭", color: "#2563eb" },
  { name: "Pricing Page Copy", desc: "Copy that makes your pricing irresistible.", badge: "PRO", category: "Finance", href: "/tools/pricing-page-generator", icon: "◬", color: "#db2777" },
];

const categories = ["All", "Branding", "Online Presence", "Growth", "Planning", "Finance"];

interface BusinessName { name: string; tagline: string; reason: string; }

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
    setUsageCount(parseInt(localStorage.getItem(STORAGE_KEY) || "0"));
    setIsPro(localStorage.getItem(PRO_KEY) === "true");
  }, []);

  const handleGenerate = async () => {
    if (!businessType.trim()) return;
    if (!isPro && usageCount >= FREE_LIMIT) { handleCheckout(); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, keywords: "", style: "modern" }),
      });
      const data = await res.json();
      setResults(data.names);
      if (!isPro) {
        const n = usageCount + 1;
        setUsageCount(n);
        localStorage.setItem(STORAGE_KEY, n.toString());
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) { console.error(e); }
    finally { setCheckoutLoading(false); }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const remaining = Math.max(0, FREE_LIMIT - usageCount);

  const filteredTools = tools.filter(t => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const badgeStyle = (badge: string) => {
    if (badge === "FREE") return { background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" };
    return { background: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" };
  };

  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#f0f0f0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,8,8,0.9)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1c1c1c",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 clamp(16px, 4vw, 40px)", height: "60px"
      }}>
        <div style={{ fontSize: "19px", fontWeight: 800 }}>
          Gen<span style={{ color: "#7c3aed" }}>Forge</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isPro ? (
            <div style={{ background: "rgba(124,58,237,0.12)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>PRO</div>
          ) : (
            <button onClick={handleCheckout} disabled={checkoutLoading} style={{
              background: "#7c3aed", color: "#fff", border: "none",
              padding: "8px clamp(12px, 3vw, 18px)", borderRadius: "7px",
              fontSize: "clamp(11px, 2.5vw, 13px)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
            }}>
              {checkoutLoading ? "Loading..." : "Get PRO — €9.99"}
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "clamp(32px, 6vw, 80px) clamp(16px, 4vw, 40px) clamp(24px, 4vw, 48px)", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "20px", padding: "5px 12px", fontSize: "11px", color: "#a78bfa", marginBottom: "20px", fontWeight: 600 }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
          28 AI-powered tools · One payment · Unlimited access
        </div>
        <h1 style={{ fontSize: "clamp(32px, 7vw, 58px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "16px", maxWidth: "700px" }}>
          Everything your business needs.<br />
          <span style={{ color: "#7c3aed" }}>Powered by AI.</span>
        </h1>
        <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "#888", lineHeight: 1.6, marginBottom: "28px", maxWidth: "500px", fontWeight: 300 }}>
          From naming to growth — all the AI tools you need to start, brand and scale your business. One payment. Unlimited possibilities.
        </p>
        <div style={{ display: "flex", background: "#0f0f0f", border: "1px solid #242424", borderRadius: "10px", overflow: "hidden", maxWidth: "440px" }}>
          <input
            type="text" value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="What do you want to create?"
            style={{ flex: 1, background: "transparent", border: "none", padding: "13px 16px", color: "#f0f0f0", fontSize: "14px", fontFamily: "inherit", outline: "none" }}
          />
          <button onClick={() => setShowGenerator(true)} style={{ background: "#7c3aed", border: "none", padding: "13px 18px", color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap" }}>
            Generate →
          </button>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ borderTop: "1px solid #1c1c1c", borderBottom: "1px solid #1c1c1c", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0" }}>
          {[
            { num: "28", label: "AI Tools" },
            { num: "2,800+", label: "SEO Pages" },
            { num: "2,732", label: "Indexed in Google" },
            { num: "€9.99", label: "One-time payment" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "20px 16px", borderRight: i % 2 === 0 ? "1px solid #1c1c1c" : "none", borderBottom: i < 2 ? "1px solid #1c1c1c" : "none", textAlign: "center" }}>
              <div style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, color: "#f0f0f0", marginBottom: "4px" }}>{stat.num}</div>
              <div style={{ fontSize: "11px", color: "#555" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GENERATOR MODAL */}
      {showGenerator && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0 }}>Business Name Generator</h2>
              <button onClick={() => setShowGenerator(false)} style={{ background: "none", border: "none", color: "#444", fontSize: "22px", cursor: "pointer" }}>×</button>
            </div>
            <input
              value={businessType} onChange={e => setBusinessType(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleGenerate()}
              placeholder="Describe your business (e.g. coffee shop, gym...)"
              style={{ width: "100%", background: "#141414", border: "1px solid #242424", borderRadius: "10px", padding: "13px 16px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "12px", fontFamily: "inherit" }}
            />
            <button onClick={handleGenerate} disabled={loading || !businessType.trim()} style={{
              width: "100%", background: loading ? "#222" : "#7c3aed", color: "#fff", border: "none",
              borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", marginBottom: "12px", fontFamily: "inherit"
            }}>
              {loading ? "Generating..." : "Generate Business Names"}
            </button>
            {!isPro && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: i < remaining ? "#7c3aed" : "#222" }} />
                ))}
                <span style={{ color: "#555", fontSize: "12px" }}>{remaining} of 3 free generations remaining</span>
              </div>
            )}
            {results.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {results.map((item, i) => (
                  <div key={i} style={{ background: "#141414", border: "1px solid #1c1c1c", borderRadius: "10px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "13px", marginBottom: "2px" }}>{item.name}</div>
                      <div style={{ color: "#555", fontSize: "10px" }}>{item.tagline}</div>
                    </div>
                    <button onClick={() => handleCopy(item.name)} style={{ background: "none", border: "1px solid #242424", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", color: copied === item.name ? "#a78bfa" : "#444", fontSize: "10px", marginLeft: "6px", fontFamily: "inherit" }}>
                      {copied === item.name ? "✓" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* POPULAR TOOLS */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px) 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 800, margin: 0 }}>Popular AI Tools 🔥</h2>
          <button onClick={() => document.getElementById("all-tools")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "none", border: "none", color: "#a78bfa", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
            View all tools →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {tools.slice(0, 4).map(tool => (
            <div key={tool.name} onClick={() => tool.name === "Business Name Generator" ? setShowGenerator(true) : window.location.href = tool.href}
              style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "18px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${tool.color}20`, border: `1px solid ${tool.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: tool.color }}>
                  {tool.icon}
                </div>
                <span style={{ ...badgeStyle(tool.badge), fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px" }}>{tool.badge}</span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>{tool.name}</div>
              <div style={{ fontSize: "12px", color: "#666", lineHeight: 1.5, marginBottom: "12px" }}>{tool.desc}</div>
              <div style={{ fontSize: "12px", color: "#a78bfa" }}>
                {tool.badge === "FREE" ? "Try free →" : "Try now →"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px) 0" }}>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 800, marginBottom: "20px" }}>How GenForge Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { num: "1", icon: "⊞", title: "Choose a Tool", desc: "Pick the AI tool you need for your business." },
            { num: "2", icon: "≡", title: "Enter Your Info", desc: "Add a few details about your business." },
            { num: "3", icon: "✦", title: "Get AI Results", desc: "Receive unique, high-quality results in seconds." },
          ].map((step, i) => (
            <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "#a78bfa" }}>{step.num}</div>
                {i < 2 && <div style={{ display: "none" }} />}
              </div>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{step.icon}</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>{step.title}</div>
                <div style={{ fontSize: "12px", color: "#666", lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL TOOLS */}
      <section id="all-tools" style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px) 0" }}>
        <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 800, marginBottom: "20px" }}>All Tools</h2>

        {/* FILTER TABS */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "7px 16px", borderRadius: "7px", fontSize: "12px", cursor: "pointer",
              fontFamily: "inherit", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0,
              background: activeCategory === cat ? "rgba(124,58,237,0.12)" : "transparent",
              color: activeCategory === cat ? "#a78bfa" : "#888",
              border: activeCategory === cat ? "1px solid rgba(124,58,237,0.3)" : "1px solid #1c1c1c",
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px", marginBottom: "40px" }}>
          {filteredTools.map(tool => (
            <div key={tool.name} onClick={() => tool.name === "Business Name Generator" ? setShowGenerator(true) : window.location.href = tool.href}
              style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "10px", padding: "14px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700 }}>{tool.name}</span>
                <span style={{ ...badgeStyle(tool.badge), fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "4px", flexShrink: 0, marginLeft: "4px" }}>{tool.badge}</span>
              </div>
              <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.4 }}>{tool.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRO BANNER */}
      {!isPro && (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px) clamp(32px, 5vw, 60px)" }}>
          <div style={{ background: "linear-gradient(135deg, #130d20 0%, #0e0e16 100%)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "14px", padding: "clamp(24px, 4vw, 36px) clamp(20px, 4vw, 40px)" }}>
            <h3 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 800, marginBottom: "8px" }}>Unlock All 28 AI Tools</h3>
            <p style={{ fontSize: "14px", color: "#888", marginBottom: "20px", fontWeight: 300 }}>Get unlimited access to every AI tool. One payment. Forever.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
              {["One-time payment", "Unlimited usage", "All future tools included", "30-day money-back guarantee"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#888" }}>
                  <span style={{ color: "#4ade80", fontSize: "14px" }}>✓</span> {item}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, color: "#a78bfa" }}>
                €9.99 <span style={{ fontSize: "14px", color: "#555", fontWeight: 400 }}>one-time</span>
              </div>
              <button onClick={handleCheckout} disabled={checkoutLoading} style={{
                background: "#7c3aed", color: "#fff", border: "none",
                padding: "14px clamp(20px, 4vw, 32px)", borderRadius: "8px",
                fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
              }}>
                {checkoutLoading ? "Loading..." : "🔒 Get PRO Now →"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1c1c1c", padding: "clamp(24px, 4vw, 40px) clamp(16px, 4vw, 40px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "16px", fontWeight: 800, color: "#444" }}>
            Gen<span style={{ color: "#7c3aed" }}>Forge</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Refund", href: "/refund" }, { label: "Contact", href: "/contact" }].map(l => (
              <Link key={l.label} href={l.href} style={{ fontSize: "12px", color: "#444", textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
          <div style={{ fontSize: "12px", color: "#333" }}>© 2026 GenForge</div>
        </div>
      </footer>

    </main>
  );
}