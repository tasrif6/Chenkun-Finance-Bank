// ALL copy lives here. Replace with the real Chenkun copy (and add a zh block for i18n if needed).

import { Database, Lightbulb, TimerReset } from "lucide-react";

// NOTE: every number/claim below is a PLACEHOLDER, not verified company data.
export const brand = { name: "Chenkun", full: "Chenkun Financial Service Co., Ltd.", logo: "/images/Chenkun_Logo.png" };

export const hero = {
  pill: "Chenkun Financial Service Co., Ltd.",
  a: "Clarity In",
  em: "Every",
  b: "Business Decision.",
  text: "Make smarter, faster decisions across supply chain and trade operations. Real-time counterparty intelligence and precise risk evaluation empower you to scale with confidence.",
  primary: { label: "Explore services", target: "#cooperation" },
  secondary: { label: "Book a consultation", target: "#contact" },
  // IMAGE FIELD 1: hero photo. Put the file in /public/images and use a path like "/images/hero.jpg".
  image: "/images/Hangzhou.jpg",
  alt: "Hangzhou city skyline",
};

export const about = {
  eyebrow: "About us",
  title: "Built on trust, rooted in Data.",
  text: "Access to reliable intelligence shouldn't be a privilege, it should be the standard. We empower businesses of every size, from global financial institutions to emerging market enterprises, with the insights needed to trade smarter and grow with confidence anywhere in the world.",
  points: [
    { id: 1, icon: Lightbulb,title: "Data-Driven Insights", link: "Our approach" },
    { id: 2, icon: Database,title: "Exclusive Accesss to Chinese Databases", link: "Who we serve" },
    { id:3, icon: TimerReset,title: "Quick Turn Around Time", link: "Cross-border services" },
  ],
  // IMAGE FIELD 2: About-page team photo. Example: "/images/team.jpg".
  photo: "/images/Chenkun_image.png",
  photoAlt: "The Chenkun team",
  tags: ["Wealth", "Corporate finance", "Risk", "Insurance"],
};

export const services = [
  { n: "01", title: "Credit Reports", text: "", tone: "navy",
    // Sleeve card: the image peeks out of the sleeve and opens in a portrait pop-up on click.
    sleeve: {
      image: "/images/Credit_Rating.jpeg", 
      imageAlt: "Credit report",
    },
   },
  { n: "02", title: "Trade Finance", tone: "gold", logo:"/images/Services_Logo/Ship.png",
    sleeve: {
      image: "/images/Trade Finance.jpg", 
      imageAlt: "Trade Finance",
    },
   },
  { n: "03", title: "Risk Management", tone: "teal", logo: "/images/Services_Logo/Risk.png",
    sleeve: {
      image: "/images/RM.jpg", 
      imageAlt: "Risk Management",
    },
   },
  { n: "04", title: "Trade Compliance Software", tone: "sand", logo: "/images/Services_Logo/Trade_software.png",
    sleeve: {
      image: "/images/TS.jpg", 
      imageAlt: "Trade Compliance",
    },
   },
  { n: "05", title: "Recovery Services", tone: "navy", logo: "/images/Services_Logo/Recovery.png",
    sleeve: {
      image: "/images/recovery.jpg", 
      imageAlt: "Recovery Services",
    },
   },
];

export const metrics = [
  { label: "Years of experience", value: 12, suffix: "+" },
  { label: "Clients served", value: 100, suffix: "+" },
  { label: "Reports Delivered", value: 100000, suffix: "+"},
];

export const process = [
  { n: "01", title: "Data Collection"},
  { n: "02", title: "Analysis & Evaluation"},
  { n: "03", title: "Credit Decision"},
  { n: "04", title: "Ongoing Monitoring"},
];


// PLACEHOLDER list: text wordmarks only; confirm real partners before publishing.
export const banks = {
  eyebrow: "Banking partners",
  title: "Working alongside leading banks.",
  rows: [
  [
    { name: "Bank of China", logo: "/images/bank_of_china.jpg" },
    { name: "Union Bank", logo: "/images/unionbank.jpg" },
    { name: "Banco Safra", logo: "/images/Banko_Safra.jpg" },
    { name: "Sino Sure", logo: "/images/Sino_Sure.jpg" },
    { name: "Bradesco", logo: "/images/bradesco.jpg" },
  ],
  [
    { name: "Exim Bank", logo: "/images/Exim_Bank.jpg" },
    { name: "Bradesco", logo: "/images/bradesco.jpg" },
    { name: "DBBL", logo: "/images/DBBL.jpg" },
    { name: "", logo: "/images/IDB.jpg" },
    { name: "Sino Sure", logo: "/images/Sino_Sure.jpg" },

  ],
],
  colors: ["#0b1f3a", "#1f6f78", "#7f3b2d", "#c9a24b", "#4a4a6a", "#2d6a4f"],
};
