import { Metadata } from "next";
import Link from "next/link";

const tools: Record<string, { name: string; desc: string; action: string }> = {
  "tagline-generator": { name: "Tagline Generator", desc: "catchy slogans and taglines", action: "Generate Taglines" },
  "mission-statement-generator": { name: "Mission Statement Generator", desc: "clear mission statements", action: "Generate Mission Statement" },
  "brand-story-generator": { name: "Brand Story Generator", desc: "compelling brand stories", action: "Generate Brand Story" },
  "brand-voice-generator": { name: "Brand Voice Generator", desc: "tone of voice guidelines", action: "Generate Brand Voice" },
  "company-values-generator": { name: "Company Values Generator", desc: "core company values", action: "Generate Company Values" },
  "brand-positioning-generator": { name: "Brand Positioning Generator", desc: "positioning statements", action: "Generate Positioning" },
  "logo-concept-generator": { name: "Logo Concept Generator", desc: "logo concepts and direction", action: "Generate Logo Concepts" },
  "bio-generator": { name: "Bio Generator", desc: "professional bios", action: "Generate Bio" },
  "product-description-generator": { name: "Product Description Generator", desc: "selling product descriptions", action: "Generate Description" },
  "seo-meta-generator": { name: "SEO Meta Generator", desc: "SEO title and meta descriptions", action: "Generate SEO Meta" },
  "social-media-bio-generator": { name: "Social Media Bio Generator", desc: "social media bios", action: "Generate Social Bio" },
  "about-page-generator": { name: "About Page Generator", desc: "compelling about pages", action: "Generate About Page" },
  "homepage-headline-generator": { name: "Homepage Headline Generator", desc: "converting homepage headlines", action: "Generate Headlines" },
  "faq-generator": { name: "FAQ Generator", desc: "frequently asked questions", action: "Generate FAQs" },
  "landing-page-copy-generator": { name: "Landing Page Copy Generator", desc: "full landing page copy", action: "Generate Landing Page" },
  "elevator-pitch-generator": { name: "Elevator Pitch Generator", desc: "perfect elevator pitches", action: "Generate Elevator Pitch" },
  "cold-email-generator": { name: "Cold Email Generator", desc: "outreach emails that get replies", action: "Generate Cold Email" },
  "ad-copy-generator": { name: "Ad Copy Generator", desc: "Google and Facebook ad copy", action: "Generate Ad Copy" },
  "blog-post-intro-generator": { name: "Blog Post Intro Generator", desc: "blog post introductions", action: "Generate Blog Intro" },
  "cta-generator": { name: "Call-to-Action Generator", desc: "converting CTAs", action: "Generate CTAs" },
  "lead-magnet-generator": { name: "Lead Magnet Generator", desc: "lead magnet ideas", action: "Generate Lead Magnets" },
  "testimonial-request-generator": { name: "Testimonial Request Generator", desc: "testimonial request emails", action: "Generate Emails" },
  "business-plan-generator": { name: "Business Plan Generator", desc: "business plan summaries", action: "Generate Business Plan" },
  "swot-generator": { name: "SWOT Analysis Generator", desc: "SWOT analyses", action: "Generate SWOT" },
  "competitor-analysis-generator": { name: "Competitor Analysis Generator", desc: "competitor analyses", action: "Generate Analysis" },
  "goal-planner-generator": { name: "90-Day Goal Planner", desc: "90-day action plans", action: "Generate Goal Plan" },
  "pricing-page-generator": { name: "Pricing Page Generator", desc: "pricing page copy", action: "Generate Pricing Page" },
};

const industries = [
  "restaurant", "gym", "law firm", "coffee shop", "e-commerce", "SaaS", "fitness coach",
  "real estate", "dental clinic", "marketing agency", "bakery", "hotel", "photography",
  "consulting", "retail store", "hair salon", "accounting firm", "personal trainer",
  "wedding planner", "travel agency", "pet shop", "yoga studio", "online course", "podcast",
  "nonprofit", "construction", "interior design", "fashion brand", "tech startup",
  "recruitment agency", "insurance broker", "mortgage broker", "car dealership", "pharmacy",
  "veterinary clinic", "cleaning company", "landscaping", "plumbing", "electrician",
  "tutoring", "childcare", "catering", "event planning", "music school", "art studio",
  "tattoo studio", "florist", "jewellery", "optician", "physiotherapy",
  "small business", "startup", "freelancer", "agency", "enterprise", "solopreneur",
  "side hustle", "local business", "online business", "service business", "product business",
  "B2B company", "B2C company", "family business", "new business", "growing business",
  "established business", "creative business", "professional services", "trade business",
  "health business", "food business", "tech business", "retail business", "hospitality business",
  "education business", "coaching business", "consulting business", "digital business",
  "brick and mortar", "subscription business", "marketplace", "platform", "community",
  "membership site", "ecommerce store", "dropshipping business", "print on demand",
  "affiliate business", "content creator", "influencer", "coach", "mentor", "speaker",
  "author", "blogger", "YouTuber", "podcaster", "photographer", "designer",
];

export async function generateStaticParams() {
  const params = [];
  for (const tool of Object.keys(tools)) {
    for (const industry of industries) {
      params.push({
        tool,
        industry: industry.toLowerCase().replace(/\s+/g, "-"),
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { tool: string; industry: string } }): Promise<Metadata> {
  const tool = tools[params.tool];
  const industry = params.industry.replace(/-/g, " ");
  if (!tool) return { title: "GenForge" };
  return {
    title: `${tool.name} for ${industry} — GenForge`,
    description: `Generate ${tool.desc} for your ${industry} business in seconds. Free to try — no signup required.`,
  };
}

export default function IndustryToolPage({ params }: { params: { tool: string; industry: string } }) {
  const tool = tools[params.tool];
  const industry = params.industry.replace(/-/g, " ");

  if (!tool) return null;

  const relatedTools = Object.entries(tools)
    .filter(([key]) => key !== params.tool)
    .slice(0, 4);

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
        <Link href={`/tools/${params.tool}`} style={{
          background: "#7c3aed", color: "#fff", border: "none",
          padding: "8px 18px", borderRadius: "7px", fontSize: "13px",
          fontWeight: 500, textDecoration: "none"
        }}>
          Try Free →
        </Link>
      </nav>

      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "60px 40px 40px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: "20px", padding: "5px 12px", fontSize: "12px", color: "#a78bfa",
          marginBottom: "24px", fontWeight: 600, textTransform: "capitalize"
        }}>
          {industry}
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "16px" }}>
          {tool.name} for{" "}
          <span style={{ color: "#7c3aed", textTransform: "capitalize" }}>{industry}</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#888", lineHeight: 1.6, marginBottom: "32px", fontWeight: 300 }}>
          Generate {tool.desc} tailored specifically for your {industry} business in seconds.
          No copywriter needed — just AI that understands your industry.
        </p>
        <Link href={`/tools/${params.tool}`} style={{
          display: "inline-block", background: "#7c3aed", color: "#fff",
          padding: "14px 32px", borderRadius: "8px", fontSize: "15px",
          fontWeight: 700, textDecoration: "none"
        }}>
          {tool.action} →
        </Link>
      </section>

      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 40px 60px" }}>
        <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.3px" }}>
            Why use AI for your {industry}?
          </h2>
          <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.8 }}>
            Running a {industry} business means wearing many hats. Writing copy, creating brand materials,
            and planning strategy takes hours — time you don't have. GenForge's {tool.name} is built
            to give {industry} owners professional-quality {tool.desc} in seconds, so you can focus
            on what actually matters: growing your business.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "40px" }}>
          {[
            { title: "Instant results", desc: `Generate ${tool.desc} in under 30 seconds.` },
            { title: "Industry-specific", desc: `Tailored for ${industry} businesses specifically.` },
            { title: "No experience needed", desc: "No copywriting or marketing skills required." },
            { title: "One-time payment", desc: "Pay once, use all 28 tools forever." },
          ].map((item, i) => (
            <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "6px", color: "#a78bfa" }}>{item.title}</div>
              <div style={{ fontSize: "13px", color: "#666" }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <Link href={`/tools/${params.tool}`} style={{
            display: "inline-block", background: "#7c3aed", color: "#fff",
            padding: "16px 40px", borderRadius: "8px", fontSize: "16px",
            fontWeight: 700, textDecoration: "none"
          }}>
            Try {tool.name} Free →
          </Link>
          <div style={{ fontSize: "12px", color: "#444", marginTop: "10px" }}>No signup required</div>
        </div>

        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#444", marginBottom: "16px" }}>
            More tools for your {industry}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {relatedTools.map(([key, t]) => (
              <Link key={key} href={`/tools/${key}/${params.industry}`} style={{
                background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: "10px",
                padding: "14px 18px", textDecoration: "none", color: "#f0f0f0",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ fontSize: "13px", fontWeight: 600 }}>{t.name}</span>
                <span style={{ fontSize: "12px", color: "#a78bfa" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{
        borderTop: "1px solid #1c1c1c", padding: "28px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
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