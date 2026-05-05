export type EventStatus = "Upcoming" | "Live" | "Past" | "Coming Soon";

export type LanguageEvent = {
  id: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  category: "Education" | "Healthcare" | "Youth Culture";
  subCategory: string;
  status: EventStatus;
  dateLabel: string;
  cityLabel: string;
  cities: string[];
  languageTags: string[];
  audienceTags: string[];
  intentTags: string[];
  formatTags: string[];
  partnerTags: string[];
  image: string;
  visualTone: string;
  micrositeUrl: string;
  primaryCta: string;
  salesPositioning: string;
  featuredRank: number;
};

export const events: LanguageEvent[] = [
  {
    id: "future-of-maternity-2026",
    title: "Times Future of Maternity 2026",
    eyebrow: "Healthcare / Maternity",
    subtitle: "A premium maternity, fertility, parenting, expo, and awards platform.",
    description:
      "A high-trust healthcare event built around expecting parents, caregivers, clinicians, maternity hospitals, IVF leaders, and baby-care brands.",
    category: "Healthcare",
    subCategory: "Maternity, Fertility, Parenting",
    status: "Past",
    dateLabel: "Mar 28, 2026",
    cityLabel: "New Delhi",
    cities: ["Delhi"],
    languageTags: ["English", "Hindi", "Vernacular-ready"],
    audienceTags: [
      "Expecting Parents",
      "Couples",
      "Doctors",
      "Hospitals",
      "Healthcare Brands"
    ],
    intentTags: ["Expert Guidance", "Expo", "Awards", "Wellness", "Family Decisions"],
    formatTags: ["Summit", "Expo", "Awards"],
    partnerTags: ["Healthcare", "Baby Care", "Diagnostics", "IVF", "Insurance", "Wellness"],
    image:
      "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1200",
    visualTone: "tone-health",
    micrositeUrl: "https://pregatips.com/events/times-future-of-maternity-2026",
    primaryCta: "View Event",
    salesPositioning:
      "Premium access to decision-stage families and healthcare stakeholders in a trust-sensitive category.",
    featuredRank: 3
  },
  {
    id: "times-career-counselling-2026",
    title: "Times Career Counselling 2026",
    eyebrow: "Education / Career",
    subtitle: "Multi-city career guidance for students and parents across India.",
    description:
      "A weekend meetup series that combines college discovery, mainstage talks, and 1-on-1 private counselling cabins for high-intent families.",
    category: "Education",
    subCategory: "Career Counselling",
    status: "Upcoming",
    dateLabel: "May 9 - Aug 15, 2026",
    cityLabel: "8 Cities",
    cities: ["Delhi", "Jaipur", "Bhopal", "Mumbai", "Pune", "Patna", "Lucknow", "Chennai"],
    languageTags: ["Hindi", "English", "Vernacular-ready"],
    audienceTags: ["Students", "Parents", "Counsellors", "Colleges", "EdTech"],
    intentTags: ["Career Clarity", "Admissions", "1-on-1 Counselling", "College Discovery"],
    formatTags: ["Multi-city", "Weekend Meetups", "Booths", "Counselling Cabins"],
    partnerTags: ["Colleges", "Universities", "EdTech", "Skilling", "Test Prep"],
    image:
      "https://images.pexels.com/photos/8199169/pexels-photo-8199169.jpeg?auto=compress&cs=tinysrgb&w=1200",
    visualTone: "tone-education",
    micrositeUrl: "https://singhavi279.github.io/nbtcareer/",
    primaryCta: "Explore Meetups",
    salesPositioning:
      "A conversion-led education property with qualified, decision-stage families across eight major markets.",
    featuredRank: 1
  },
  {
    id: "times-study-abroad-conclave",
    title: "Times Study Abroad Conclave",
    eyebrow: "Education / Study Abroad",
    subtitle: "A trusted platform for global education decisions.",
    description:
      "A one-day summit, expo, masterclass, and awards format focused on universities, countries, visas, scholarships, ROI, and career outcomes.",
    category: "Education",
    subCategory: "Study Abroad",
    status: "Upcoming",
    dateLabel: "Jul 4, 2026",
    cityLabel: "New Delhi",
    cities: ["Delhi"],
    languageTags: ["English", "Hindi", "Vernacular-ready"],
    audienceTags: [
      "Students",
      "Parents",
      "Graduates",
      "Working Professionals",
      "Education Consultants"
    ],
    intentTags: ["Visa Guidance", "Scholarships", "ROI", "Country Selection", "Global Careers"],
    formatTags: ["Summit", "Expo", "Masterclass", "Awards"],
    partnerTags: ["Universities", "Country Bodies", "Forex", "Loans", "EdTech", "Consultants"],
    image:
      "https://images.pexels.com/photos/7616700/pexels-photo-7616700.jpeg?auto=compress&cs=tinysrgb&w=1200",
    visualTone: "tone-abroad",
    micrositeUrl: "https://singhavi279.github.io/nbtabroad/",
    primaryCta: "View Conclave",
    salesPositioning:
      "A high-consideration study abroad platform built for universities, country bodies, financial brands, and consultants.",
    featuredRank: 2
  },
  {
    id: "nbt-mic-drop-madness",
    title: "NBT Mic Drop Madness",
    eyebrow: "Youth Culture / Entertainment",
    subtitle: "A national Hindi comedy talent discovery IP.",
    description:
      "A digital-to-stage comedy talent hunt that moves from self-recorded entries to city rounds and a Delhi finale for Hindi-first performers.",
    category: "Youth Culture",
    subCategory: "Comedy, Talent Hunt, Entertainment",
    status: "Live",
    dateLabel: "Entries open May 1, 2026",
    cityLabel: "National + City Rounds",
    cities: ["Jaipur", "Lucknow", "Ahmedabad", "Hyderabad", "Delhi"],
    languageTags: ["Hindi", "Hinglish", "Vernacular-first"],
    audienceTags: ["Creators", "Comedians", "Youth", "College Students", "Hindi Belt Audiences"],
    intentTags: ["Talent Discovery", "Stage Opportunity", "Creator Economy", "Social Content"],
    formatTags: ["Digital Entries", "City Rounds", "Delhi Finale"],
    partnerTags: ["Youth Brands", "Beverage", "Snacking", "Tech", "Lifestyle", "Fintech", "Telecom"],
    image:
      "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1200",
    visualTone: "tone-youth",
    micrositeUrl: "https://micdropmadness.vercel.app/",
    primaryCta: "Enter the IP",
    salesPositioning:
      "A youth-culture IP with 360-degree integration across digital, city rounds, branded content, and finale-stage moments.",
    featuredRank: 4
  }
];

export const categories = ["All", "Education", "Healthcare", "Youth Culture"] as const;

export const cityOptions = [
  "All",
  "Delhi",
  "Jaipur",
  "Bhopal",
  "Mumbai",
  "Pune",
  "Patna",
  "Lucknow",
  "Chennai",
  "Ahmedabad",
  "Hyderabad"
] as const;

export const audienceOptions = [
  "All",
  "Students",
  "Parents",
  "Creators",
  "Healthcare Brands",
  "Working Professionals",
  "Colleges",
  "Youth"
] as const;

export const languageOptions = [
  "All",
  "Hindi",
  "English",
  "Hinglish",
  "Vernacular-ready",
  "Vernacular-first"
] as const;

export const formatOptions = [
  "All",
  "Summit",
  "Expo",
  "Awards",
  "Multi-city",
  "Counselling Cabins",
  "Talent Hunt",
  "City Rounds"
] as const;
