import { EventsLanding } from "@/components/events-landing";
import { events } from "@/lib/events";

const SITE_URL = "https://timeslanguages.in";

const FAQS = [
  {
    q: "What is Times Languages Live?",
    a: "Languages Live is the flagship vernacular-first events arm of Times Internet - a curated portfolio of premium IPs across Education, Healthcare and Youth Culture, built for the audiences, languages and cities that move modern India."
  },
  {
    q: "Which Indian cities do these events activate in?",
    a: "Our calendar lights up Delhi, Mumbai, Pune, Jaipur, Bhopal, Patna, Lucknow, Chennai, Ahmedabad and Hyderabad - with multi-city formats for our flagship properties."
  },
  {
    q: "How can brands sponsor or partner with these events?",
    a: "Inventory spans title sponsorship, category presenting, city partnerships, awards association, content series, expo booths, on-ground sampling and lead generation. Write to sales@timeslanguages.in for the partnership deck."
  },
  {
    q: "Are events conducted in Hindi or English?",
    a: "Most flagship IPs are bilingual or vernacular-first - Hindi, English, Hinglish and regional language expression, calibrated to each city and audience."
  },
  {
    q: "How do I attend or register?",
    a: "Every event has its own microsite linked from the calendar. Tap the primary action on any card to register, view the agenda or claim a counselling slot."
  }
];

export default function Home() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Times Languages Live Events",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: event.micrositeUrl,
      name: event.title
    }))
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Times Internet - Languages Live",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.timesinternet.in/",
      "https://www.linkedin.com/company/times-internet/",
      "https://twitter.com/timesinternet"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressRegion: "DL",
      addressCountry: "IN"
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Times Internet"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@timeslanguages.in",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"]
      }
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Times Languages Live",
    url: SITE_URL,
    inLanguage: ["en-IN", "hi-IN"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Events", item: `${SITE_URL}/#events` }
    ]
  };

  const eventsJsonLd = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    image: [event.image],
    url: event.micrositeUrl,
    eventStatus:
      event.status === "Past"
        ? "https://schema.org/EventPostponed"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: event.cities.map((city) => ({
      "@type": "Place",
      name: city,
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: "IN"
      }
    })),
    inLanguage: event.languageTags,
    audience: {
      "@type": "Audience",
      audienceType: event.audienceTags.join(", ")
    },
    organizer: {
      "@type": "Organization",
      name: "Times Internet - Languages Live",
      url: SITE_URL
    }
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EventsLanding />
    </>
  );
}
