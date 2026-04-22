import { MetadataRoute } from "next";

const toolSlugs = [
  "tagline-generator", "mission-statement-generator", "brand-story-generator",
  "brand-voice-generator", "company-values-generator", "brand-positioning-generator",
  "logo-concept-generator", "bio-generator", "product-description-generator",
  "seo-meta-generator", "social-media-bio-generator", "about-page-generator",
  "homepage-headline-generator", "faq-generator", "landing-page-copy-generator",
  "elevator-pitch-generator", "cold-email-generator", "ad-copy-generator",
  "blog-post-intro-generator", "cta-generator", "lead-magnet-generator",
  "testimonial-request-generator", "business-plan-generator", "swot-generator",
  "competitor-analysis-generator", "goal-planner-generator", "pricing-page-generator",
];

const industries = [
  "restaurant", "gym", "law-firm", "coffee-shop", "e-commerce", "saas", "fitness-coach",
  "real-estate", "dental-clinic", "marketing-agency", "bakery", "hotel", "photography",
  "consulting", "retail-store", "hair-salon", "accounting-firm", "personal-trainer",
  "wedding-planner", "travel-agency", "pet-shop", "yoga-studio", "online-course", "podcast",
  "nonprofit", "construction", "interior-design", "fashion-brand", "tech-startup",
  "recruitment-agency", "insurance-broker", "mortgage-broker", "car-dealership", "pharmacy",
  "veterinary-clinic", "cleaning-company", "landscaping", "plumbing", "electrician",
  "tutoring", "childcare", "catering", "event-planning", "music-school", "art-studio",
  "tattoo-studio", "florist", "jewellery", "optician", "physiotherapy",
  "small-business", "startup", "freelancer", "agency", "enterprise", "solopreneur",
  "side-hustle", "local-business", "online-business", "service-business", "product-business",
  "b2b-company", "b2c-company", "family-business", "new-business", "growing-business",
  "established-business", "creative-business", "professional-services", "trade-business",
  "health-business", "food-business", "tech-business", "retail-business", "hospitality-business",
  "education-business", "coaching-business", "consulting-business", "digital-business",
  "brick-and-mortar", "subscription-business", "marketplace", "platform", "community",
  "membership-site", "ecommerce-store", "dropshipping-business", "print-on-demand",
  "affiliate-business", "content-creator", "influencer", "coach", "mentor", "speaker",
  "author", "blogger", "youtuber", "podcaster", "photographer", "designer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: "https://trygenforge.com", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: "https://trygenforge.com/tools/tagline-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/mission-statement-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/brand-story-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/brand-voice-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/company-values-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/brand-positioning-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/logo-concept-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/bio-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/product-description-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/seo-meta-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/social-media-bio-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/about-page-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/homepage-headline-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/faq-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/landing-page-copy-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/elevator-pitch-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/cold-email-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/ad-copy-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/blog-post-intro-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/cta-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/lead-magnet-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/testimonial-request-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/business-plan-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/swot-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/competitor-analysis-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/goal-planner-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/tools/pricing-page-generator", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://trygenforge.com/privacy", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "https://trygenforge.com/terms", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "https://trygenforge.com/refund", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "https://trygenforge.com/contact", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const programmaticPages = toolSlugs.flatMap((tool) =>
    industries.map((industry) => ({
      url: `https://trygenforge.com/tools/${tool}/${industry}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...programmaticPages];
}