export type EventStatus = "Upcoming" | "Live" | "Past" | "Coming Soon";

export type LanguageEvent = {
  id: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  category: "Education" | "Healthcare" | "Lifestyle & Entertainment" | "MSME";
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
  cardTags: string[];
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
    subtitle: "Integrated platform dedicated to discussing maternal and child health.",
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
    cardTags: ["Maternity Care", "IVF & Fertility", "Pregnancy", "Motherhood", "Wellness"],
    image:
      "https://static.langimg.com/photo/130486561.cms",
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
    dateLabel: "Jun - Aug, 2026",
    cityLabel: "8 Cities",
    cities: ["Delhi", "Jaipur", "Bhopal", "Mumbai", "Pune", "Patna", "Lucknow", "Chennai"],
    languageTags: ["Hindi", "English", "Vernacular-ready"],
    audienceTags: ["Students", "Parents", "Counsellors", "Colleges", "EdTech"],
    intentTags: ["Career Clarity", "Admissions", "1-on-1 Counselling", "College Discovery"],
    formatTags: ["Multi-city", "Weekend Meetups", "Booths", "Counselling Cabins"],
    partnerTags: ["Colleges", "Universities", "EdTech", "Skilling", "Test Prep"],
    cardTags: ["Career Guidance", "1-on-1 Counselling", "College Admissions", "Students"],
    image:
      "https://static.langimg.com/photo/130302755.cms",
    visualTone: "tone-education",
    micrositeUrl: "https://singhavi279.github.io/nbtcareer/",
    primaryCta: "Explore Meetups",
    salesPositioning:
      "A conversion-led education property with qualified, decision-stage families across eight major markets.",
    featuredRank: 1
  },
  {
    id: "nbt-mic-drop-madness",
    title: "NBT Mic Drop Madness",
    eyebrow: "Lifestyle & Entertainment",
    subtitle: "A Hindi comedy talent discovery platform.",
    description:
      "A digital-to-stage comedy talent hunt that moves from self-recorded entries to city rounds and a Delhi finale for Hindi-first performers.",
    category: "Lifestyle & Entertainment",
    subCategory: "Comedy, Talent Hunt, Entertainment",
    status: "Upcoming",
    dateLabel: "June 2026",
    cityLabel: "National + City Rounds",
    cities: ["Jaipur", "Lucknow", "Ahmedabad", "Hyderabad", "Delhi"],
    languageTags: ["Hindi", "Hinglish", "Vernacular-first"],
    audienceTags: ["Creators", "Comedians", "Youth", "College Students", "Hindi Belt Audiences"],
    intentTags: ["Talent Discovery", "Stage Opportunity", "Creator Economy", "Social Content"],
    formatTags: ["Digital Entries", "City Rounds", "Delhi Finale"],
    partnerTags: ["Youth Brands", "Beverage", "Snacking", "Tech", "Lifestyle", "Fintech", "Telecom"],
    cardTags: ["Comedy Talent Hunt", "Stand-up", "Hindi-first", "Clean Comedy", "Creator"],
    image:
      "https://img.magnific.com/free-photo/process-creating-stand-up-comedy_23-2151053520.jpg",
    visualTone: "tone-youth",
    micrositeUrl: "https://micdropmadness.vercel.app/",
    primaryCta: "Enter the IP",
    salesPositioning:
      "A youth-culture IP with 360-degree integration across digital, city rounds, branded content, and finale-stage moments.",
    featuredRank: 4
  },
  {
    id: "times-study-abroad-conclave",
    title: "Times Study Abroad Conclave",
    eyebrow: "Education / Study Abroad",
    subtitle: "A trusted platform for informed decision making for studying abroad.",
    description:
      "A one-day summit, expo, masterclass, and awards format focused on universities, countries, visas, scholarships, ROI, and career outcomes.",
    category: "Education",
    subCategory: "Study Abroad",
    status: "Upcoming",
    dateLabel: "Jul, 2026",
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
    cardTags: ["Study Abroad", "Visas & Scholarships", "Global Careers", "Colleges", "Universities"],
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
    id: "india-msme-dialogue",
    title: "India MSME Dialogue: Atmanirbhar Udyam | Atmanirbhar Bharat",
    eyebrow: "MSME",
    subtitle: "A multi-state, multi-language platform uniting regional MSMEs.",
    description:
      "A platform uniting MSMEs — rooted in regional economies, cultures, and industrial clusters — to foster focused discussions, collaboration, and inclusive growth.",
    category: "MSME",
    subCategory: "Business, Entrepreneurship, Policy",
    status: "Upcoming",
    dateLabel: "August 2026",
    cityLabel: "Uttar Pradesh",
    cities: ["Lucknow", "Uttar Pradesh"],
    languageTags: ["Hindi", "English"],
    audienceTags: ["MSMEs", "Working Professionals", "Entrepreneurs"],
    intentTags: ["Business Growth", "Policy Dialogue", "Market Access"],
    formatTags: ["Summit", "Expo", "Multi-city"],
    partnerTags: ["Banks", "Fintech", "Logistics", "Technology"],
    cardTags: ["MSME Growth", "Clusters", "Atmanirbhar", "Entrepreneurs", "Small Business"],
    image:
      "https://images.pexels.com/photos/31321004/pexels-photo-31321004.jpeg",
    visualTone: "tone-msme",
    micrositeUrl: "https://singhavi279.github.io/udyam/",
    primaryCta: "View Dialogue",
    salesPositioning:
      "A platform for MSMEs, government bodies, and industry leaders to connect and grow.",
    featuredRank: 5
  }
];

export const categories = ["All", "Education", "Healthcare", "Lifestyle & Entertainment", "MSME"] as const;

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
