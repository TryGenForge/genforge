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
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState("modern");
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
        body: JSON.stringify({ businessType, keywords, style }),
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

  const remainingFree = Math.max(0, FREE_LIMIT - usageCount);

  return (
    <main style={{ minHeight: "100vh", background: "#08080F", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <header style={{ padding: "24px 40px", borderBottom: "1px solid #1a1a2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "sans-serif", fontSize: "22px", fontWeight: 700 }}>
          <span style={{ color: "#7B5EFF" }}>Gen</span>Forge
        </div>
        {!isPro && (
          <div style={{ fontSize: "13px", color: "#666" }}>
            {remainingFree > 0 ? `${remainingFree} безплатни генерации` : "Лимитът е достигнат"}
          </div>
        )}
        {isPro && <div style={{ fontSize: "13px", color: "#00E5FF" }}>✓ Pro</div>}
      </header>

      <section style={{ textAlign: "center", padding: "80px 20px 40px" }}>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
          Намери перфектното<br />
          <span style={{ color: "#7B5EFF" }}>бизнес </span>
          <span style={{ color: "#00E5FF" }}>име</span>
        </h1>
        <p style={{ color: "#888", fontSize: "18px", maxWidth: "500px", margin: "0 auto" }}>
          AI генерира уникални имена за твоя бизнес за секунди.
        </p>
      </section>

      <section style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px 60px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="Какъв е твоят бизнес? (напр. кафене, фитнес...)" style={inputStyle} />
          <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Ключови думи (по желание)" style={inputStyle} />
          <select value={style} onChange={(e) => setStyle(e.target.value)} style={inputStyle}>
            <option value="modern">Модерен и технологичен</option>
            <option value="playful">Игрив и приятелски</option>
            <option value="luxury">Луксозен и премиум</option>
            <option value="minimal">Минималистичен</option>
            <option value="bold">Смел и директен</option>
          </select>
          <button onClick={handleGenerate} disabled={loading || !businessType.trim()} style={{ background: loading ? "#333" : "linear-gradient(135deg, #7B5EFF, #00E5FF)", color: "#fff", border: "none", borderRadius: "12px", padding: "16px 32px", fontSize: "16px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Генерирам..." : "⚡ Генерирай имена"}
          </button>
        </div>
      </section>

      {results.length > 0 && (
        <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px 80px" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "24px", color: "#ccc" }}>Генерирани имена</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {results.map((item, i) => (
              <div key={i} style={{ background: "#0f0f1a", border: "1px solid #1a1a2e", borderRadius: "16px", padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>{item.name}</div>
                    <div style={{ color: "#7B5EFF", fontSize: "14px", marginBottom: "8px" }}>{item.tagline}</div>
                    <div style={{ color: "#666", fontSize: "13px" }}>{item.reason}</div>
                  </div>
                  <button onClick={() => handleCopy(item.name)} style={{ background: copied === item.name ? "#00E5FF22" : "#1a1a2e", color: copied === item.name ? "#00E5FF" : "#666", border: "1px solid #222", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", fontSize: "12px", flexShrink: 0 }}>
                    {copied === item.name ? "✓ Копирано" : "Копирай"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showPaywall && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#0f0f1a", border: "1px solid #7B5EFF44", borderRadius: "20px", padding: "40px", maxWidth: "420px", textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚡</div>
            <h2 style={{ fontSize: "26px", marginBottom: "12px" }}>Достигна лимита</h2>
            <p style={{ color: "#888", marginBottom: "28px" }}>Използва 3-те безплатни генерации. Отключи unlimited генерации еднократно.</p>
            <div style={{ background: "linear-gradient(135deg, #7B5EFF22, #00E5FF11)", border: "1px solid #7B5EFF44", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>€4.99</div>
              <div style={{ color: "#888", fontSize: "14px" }}>еднократно · без абонамент</div>
            </div>
            <button style={{ width: "100%", background: "linear-gradient(135deg, #7B5EFF, #00E5FF)", color: "#fff", border: "none", borderRadius: "12px", padding: "16px", fontSize: "16px", fontWeight: 700, cursor: "pointer", marginBottom: "12px" }}>
              Отключи за €4.99
            </button>
            <div onClick={() => setShowPaywall(false)} style={{ color: "#444", fontSize: "13px", cursor: "pointer" }}>Затвори</div>
          </div>
        </div>
      )}
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#0f0f1a",
  border: "1px solid #1a1a2e",
  borderRadius: "12px",
  padding: "14px 18px",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};