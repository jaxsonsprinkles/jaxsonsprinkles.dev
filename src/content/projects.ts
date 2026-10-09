export type Project = {
  title: string;
  tag: string;
  href?: string;
  linkLabel?: string;
  desc: string;
  impact?: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    "title": "Mochi",
    "tag": "AI · Health · iMessage",
    "href": "https://mochitext.com",
    "linkLabel": "mochitext.com",
    "desc": "Calorie and macro tracking that lives in your iMessage. Text or photo a meal, get instant logging — no app to open. Supports barcode and restaurant lookups, proactive nudges, weight tracking, streaks, and coaching tone modes.",
    "tech": [
      "Bun",
      "Hono",
      "Next.js",
      "Convex",
      "GPT-4.1"
    ]
  },
  {
    "title": "Forge",
    "tag": "AI · Agent Framework · Open Source",
    "href": "https://github.com/jaxsonsprinkles/forge",
    "linkLabel": "github",
    "desc": "A framework that builds and improves AI agents automatically. Give it a task spec and Forge writes an agent, runs it, analyzes failures, proposes changes, and keeps what measurably helps — across generations of code mutation and persistent memory.",
    "tech": [
      "Python",
      "LLM Agents",
      "Evals"
    ]
  },
  {
    "title": "Avian",
    "tag": "AI · SaaS · Outreach",
    "href": "https://avian.sh",
    "linkLabel": "avian.sh",
    "desc": "AI-powered outreach research platform. Input a name, email, or social handle and Avian builds a personality profile and generates tailored messages in under a minute — short, warm, or hyper-specific variants for any platform.",
    "tech": [
      "Next.js",
      "Convex",
      "OpenAI API",
      "Serper API"
    ]
  },
  {
    "title": "Fluent",
    "tag": "AI · SaaS · Speech",
    "href": "https://speakfluent.coach",
    "linkLabel": "speakfluent.coach",
    "desc": "AI-powered filler word detection and speech coaching. Fluent listens as you speak, catches filler words in real time, and gives you an AI coach to debrief your session and improve over time.",
    "tech": [
      "Next.js",
      "Supabase",
      "Gemini AI",
      "Stripe",
      "Web Speech API"
    ]
  },
  {
    "title": "Limbo",
    "tag": "Productivity · File Management · Desktop",
    "href": "https://trylimbo.vercel.app",
    "linkLabel": "trylimbo.vercel.app",
    "desc": "A download manager that auto-deletes files after a set time. Every file goes to \"Limbo\" — held temporarily so you can save or copy it, then automatically cleared when the timer runs out.",
    "tech": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ]
  },
  {
    "title": "RepoAI",
    "tag": "AI · Developer Tools",
    "href": "https://getrepoai.vercel.app",
    "linkLabel": "getrepoai.vercel.app",
    "desc": "Understand any GitHub repository in seconds. RepoAI uses AI to analyze and summarize codebases, so developers can get up to speed on unfamiliar projects without digging through hundreds of files.",
    "tech": [
      "AI",
      "GitHub API",
      "Vercel"
    ]
  },
  {
    "title": "CFA Leadership Platform",
    "tag": "Full-Stack · Automation",
    "desc": "Built a website and automated email system for a Chick-fil-A leadership organization. Streamlined event coordination and improved communication across the group.",
    "impact": "Measurably increased engagement and meeting turnout through better communication.",
    "tech": [
      "Web",
      "Email Automation"
    ]
  }
];
