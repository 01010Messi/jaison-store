import { MetadataRoute } from "next";

const disallow = [
  "/admin",
  "/admin/",
  "/api/",
  "/login",
  "/register",
  "/_next/",
  "/checkout",
  "/order-success",
  "/account",
  "/dev/",
];

// AI crawlers explicitly allowed for search/citation visibility (GEO).
// llms.txt provides a structured summary for AI agents: /llms.txt
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://jaisonskincare.com/sitemap.xml",
  };
}
