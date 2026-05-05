"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  audienceOptions,
  categories,
  cityOptions,
  events,
  formatOptions,
  languageOptions,
  type LanguageEvent
} from "@/lib/events";

type SortMode = "Featured" | "Upcoming first" | "City A-Z" | "Category A-Z";

const allTags = (event: LanguageEvent) => [
  event.title,
  event.eyebrow,
  event.subtitle,
  event.description,
  event.category,
  event.subCategory,
  event.status,
  event.cityLabel,
  ...event.cities,
  ...event.languageTags,
  ...event.audienceTags,
  ...event.intentTags,
  ...event.formatTags,
  ...event.partnerTags
];

const withUtm = (event: LanguageEvent) => {
  const url = new URL(event.micrositeUrl);
  url.searchParams.set("utm_source", "timeslanguages");
  url.searchParams.set("utm_medium", "portfolio");
  url.searchParams.set("utm_campaign", "languages_live_events");
  url.searchParams.set("utm_content", event.id);
  return url.toString();
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is Times Languages Live?",
    a: "Languages Live is the flagship vernacular-first events arm of Times Internet — a curated portfolio of premium IPs across Education, Healthcare and Youth Culture, built for the audiences, languages and cities that move modern India."
  },
  {
    q: "Which Indian cities do these events activate in?",
    a: "Our calendar lights up Delhi, Mumbai, Pune, Jaipur, Bhopal, Patna, Lucknow, Chennai, Ahmedabad and Hyderabad — with multi-city formats for our flagship properties."
  },
  {
    q: "How can brands sponsor or partner with these events?",
    a: "Inventory spans title sponsorship, category presenting, city partnerships, awards association, content series, expo booths, on-ground sampling and lead generation. Write to sales@timeslanguages.in for the partnership deck."
  },
  {
    q: "Are events conducted in Hindi or English?",
    a: "Most flagship IPs are bilingual or vernacular-first — Hindi, English, Hinglish and regional language expression, calibrated to each city and audience."
  },
  {
    q: "How do I attend or register?",
    a: "Every event has its own microsite linked from the calendar above. Tap the primary action on any card to register, view the agenda or claim a counselling slot."
  }
];

const GREETINGS = [
  { word: "Namaste", lang: "Hindi" },
  { word: "Vanakkam", lang: "Tamil" },
  { word: "Namaskaram", lang: "Telugu" },
  { word: "Sat Sri Akal", lang: "Punjabi" },
  { word: "Nomoshkar", lang: "Bengali" },
  { word: "Namaskara", lang: "Kannada" },
  { word: "Kem Cho", lang: "Gujarati" },
  { word: "Kasa Kay", lang: "Marathi" }
];

const CITIES = [
  { src: "/taj_mahal.png", alt: "Taj Mahal", caption: "Agra" },
  { src: "/mumbai.png", alt: "Gateway of India", caption: "Mumbai" },
  { src: "/chennai.png", alt: "Kapaleeshwarar Temple", caption: "Chennai" },
  { src: "/kolkata.png", alt: "Victoria Memorial", caption: "Kolkata" },
  { src: "/hyderabad.png", alt: "Charminar", caption: "Hyderabad" },
  { src: "/ahmedabad.png", alt: "Sidi Saiyyed Mosque", caption: "Ahmedabad" },
  { src: "/pune.png", alt: "Shaniwar Wada", caption: "Pune" }
];

const STATS = [
  { value: "10+", label: "Indian cities" },
  { value: "8", label: "Languages on stage" },
  { value: "4", label: "Flagship IPs" },
  { value: "1M+", label: "Audience reach" }
];

const UNIVERSES = [
  {
    numeral: "01",
    title: "Education",
    text: "Career decisions, study abroad, college discovery, counselling and the future of skilling.",
    meta: "2 IPs · Students, Parents, Universities"
  },
  {
    numeral: "02",
    title: "Healthcare",
    text: "Trust-led platforms across maternity, fertility, wellness and family healthcare.",
    meta: "1 IP · Families, Clinicians, Hospitals"
  },
  {
    numeral: "03",
    title: "Youth Culture",
    text: "Creator discovery, Hindi-first entertainment, city rounds and stage-bound talent.",
    meta: "1 IP · Creators, College Crowds, Hindi Belt"
  },
  {
    numeral: "04",
    title: "Partner-Open IPs",
    text: "Sales-ready properties for sponsorship, content series, awards and lead generation.",
    meta: "Open canvas · Title, Category, City"
  }
];

const PARTNER_INVENTORY = [
  { label: "Title sponsorship", note: "Lead the IP. Own the marquee." },
  { label: "Co-presenting partner", note: "Shared masthead, shared spotlight." },
  { label: "City partner", note: "Anchor a market. Local takeover." },
  { label: "Category partner", note: "Own a vertical inside the IP." },
  { label: "Expo booth", note: "On-ground discovery and sampling." },
  { label: "Awards association", note: "Recognition the audience trusts." },
  { label: "Content series", note: "Branded story arcs across surfaces." },
  { label: "Lead generation", note: "Decision-stage audiences, qualified." }
];

// Ornamental section divider
const Divider = () => (
  <div className="ornament" aria-hidden="true">
    <span className="ornament-rule" />
    <svg viewBox="0 0 64 16" width="64" height="16">
      <path
        d="M0 8 H22 M42 8 H64 M32 2 L36 8 L32 14 L28 8 Z M24 8 L28 8 M36 8 L40 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="32" cy="8" r="1.5" fill="currentColor" />
    </svg>
    <span className="ornament-rule" />
  </div>
);

export function EventsLanding() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [city, setCity] = useState<(typeof cityOptions)[number]>("All");
  const [audience, setAudience] = useState<(typeof audienceOptions)[number]>("All");
  const [language, setLanguage] = useState<(typeof languageOptions)[number]>("All");
  const [format, setFormat] = useState<(typeof formatOptions)[number]>("All");
  const [sort, setSort] = useState<SortMode>("Featured");
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  const [greetingIndex, setGreetingIndex] = useState(0);
  // Each card starts at a different city; they cycle one-at-a-time in round-robin
  const [cityIndices, setCityIndices] = useState([0, 2, 4]);
  const roundRobinRef = useRef(0);

  const heroVisualsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 1800);
    const cityInterval = setInterval(() => {
      const card = roundRobinRef.current % 3;
      roundRobinRef.current += 1;
      setCityIndices((prev) => {
        const next = [...prev];
        next[card] = (next[card] + 1) % CITIES.length;
        return next;
      });
    }, 1800);
    return () => {
      clearInterval(greetingInterval);
      clearInterval(cityInterval);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowTop(y > 800);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(1, y / docH) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Hero polaroid mouse parallax
  useEffect(() => {
    const el = heroVisualsRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return events
      .filter((event) => {
        const matchesQuery =
          !normalizedQuery ||
          allTags(event).some((value) => value.toLowerCase().includes(normalizedQuery));
        const matchesCategory = category === "All" || event.category === category;
        const matchesCity = city === "All" || event.cities.includes(city);
        const matchesAudience = audience === "All" || event.audienceTags.includes(audience);
        const matchesLanguage = language === "All" || event.languageTags.includes(language);
        const matchesFormat = format === "All" || event.formatTags.includes(format);
        return (
          matchesQuery &&
          matchesCategory &&
          matchesCity &&
          matchesAudience &&
          matchesLanguage &&
          matchesFormat
        );
      })
      .sort((a, b) => {
        if (sort === "Featured") return a.featuredRank - b.featuredRank;
        if (sort === "City A-Z") return a.cityLabel.localeCompare(b.cityLabel);
        if (sort === "Category A-Z") return a.category.localeCompare(b.category);
        return statusWeight(a.status) - statusWeight(b.status);
      });
  }, [audience, category, city, format, language, query, sort]);

  const marqueeCities = [...CITIES, ...CITIES];

  return (
    <main>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Times Internet Languages Live home">
          <img
            src="/langlive.png"
            alt="Times Internet Languages Live"
            className="brand-logo-custom"
            width={200}
            height={52}
          />
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#events">Calendar</a>
          <a href="#universes">Universes</a>
          <a href="#partners">For Partners</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a
          className="header-cta"
          href="mailto:sales@timeslanguages.in?subject=Languages Live partnership inquiry"
        >
          Contact Sales
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <a href="#top" className="hero-logo-wrap" aria-label="Times Internet Languages Live home">
            <img
              src="/langlive.png"
              alt="Times Internet Languages Live"
              className="hero-logo-img"
            />
          </a>
          <h1>
            India&apos;s grandest stage,
            <br />
            <span className="hero-script">in every language.</span>
          </h1>
          <p>
            A premium portfolio of vernacular-first event IPs from Times Internet — built across
            Education, Healthcare and Youth Culture for the audiences, cities and languages that
            move modern India.
          </p>
          <div className="hero-actions">
            <a href="#events" className="button button-primary">
              Explore the 2026 Calendar →
            </a>
            <a href="#partners" className="button button-secondary">
              Partner with Us
            </a>
          </div>
        </div>

        <div className="hero-visuals" ref={heroVisualsRef}>
          <span className="hero-greeting" key={`greeting-${greetingIndex}`}>
            {GREETINGS[greetingIndex].word},
            <em>{GREETINGS[greetingIndex].lang}</em>
          </span>
          <div className="polaroid polaroid-1" key={`p1-${cityIndices[0]}`}>
            <img src={CITIES[cityIndices[0]].src} alt={CITIES[cityIndices[0]].alt} />
            <span className="polaroid-caption">{CITIES[cityIndices[0]].caption}</span>
          </div>
          <div className="polaroid polaroid-2" key={`p2-${cityIndices[1]}`}>
            <img src={CITIES[cityIndices[1]].src} alt={CITIES[cityIndices[1]].alt} />
            <span className="polaroid-caption">{CITIES[cityIndices[1]].caption}</span>
          </div>
          <div className="polaroid polaroid-3" key={`p3-${cityIndices[2]}`}>
            <img src={CITIES[cityIndices[2]].src} alt={CITIES[cityIndices[2]].alt} />
            <span className="polaroid-caption">{CITIES[cityIndices[2]].caption}</span>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Languages Live at a glance">
        {STATS.map((stat, i) => (
          <div
            className="stat"
            key={stat.label}
            data-reveal
            style={{ ['--reveal-delay' as never]: `${i * 100}ms` }}
          >
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
            {i < STATS.length - 1 && <span className="stat-divider" aria-hidden="true">✦</span>}
          </div>
        ))}
      </section>

      <section className="cities-marquee" aria-label="Cities we activate in">
        <div className="cities-heading" data-reveal>
          <p className="overline">On Tour</p>
          <h2>Ten cities. Countless stories.</h2>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {marqueeCities.map((c, i) => (
              <figure className="marquee-card" key={`${c.caption}-${i}`}>
                <img src={c.src} alt={c.alt} />
                <figcaption>{c.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="section" id="events">
        <div className="section-heading" data-reveal>
          <p className="overline">The 2026 Calendar</p>
          <h2>Find your moment in the spotlight.</h2>
          <p>
            Filter the full Languages Live catalogue by city, audience, language, format and
            sponsor-fit — every flagship IP, in one place.
          </p>
        </div>

        <div className="category-rail" role="tablist" aria-label="Quick category filter" data-reveal>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="discovery-panel" data-reveal>
          <label className="search-box">
            <span className="sr-only">Search the portfolio</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students, Delhi, Hindi, awards, healthcare, comedy…"
              aria-label="Search Languages Live events"
            />
          </label>

          <div className="filters" aria-label="Event filters">
            <FilterSelect label="City" value={city} onChange={setCity} options={cityOptions} />
            <FilterSelect label="Audience" value={audience} onChange={setAudience} options={audienceOptions} />
            <FilterSelect label="Language" value={language} onChange={setLanguage} options={languageOptions} />
            <FilterSelect label="Format" value={format} onChange={setFormat} options={formatOptions} />
            <FilterSelect
              label="Sort"
              value={sort}
              onChange={setSort}
              options={["Featured", "Upcoming first", "City A-Z", "Category A-Z"] as const}
            />
          </div>
        </div>

        <div className="results-bar">
          <span>
            Showing <strong>{filteredEvents.length}</strong> of {events.length} events
          </span>
          <button
            className="reset-button"
            type="button"
            onClick={() => {
              setQuery(""); setCategory("All"); setCity("All");
              setAudience("All"); setLanguage("All"); setFormat("All");
              setSort("Featured");
            }}
          >
            Reset filters
          </button>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="event-grid">
            {filteredEvents.map((event, i) => (
              <div
                key={event.id}
                data-reveal
                style={{ ['--reveal-delay' as never]: `${i * 80}ms` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" data-reveal>
            <h3>No event matches that filter set.</h3>
            <p>Try removing a filter or searching by a broader term — education, Delhi, parents, Hindi.</p>
          </div>
        )}
      </section>

      <Divider />

      <section className="section universes" id="universes">
        <div className="section-heading" data-reveal>
          <p className="overline">Event Universes</p>
          <h2>Where India shows up.</h2>
          <p>
            From career decisions to creator stages — four universes engineered around the moments
            where vernacular India makes real choices.
          </p>
        </div>
        <div className="universe-grid">
          {UNIVERSES.map((u, i) => (
            <article
              className="universe-card"
              key={u.title}
              data-reveal
              style={{ ['--reveal-delay' as never]: `${i * 100}ms` }}
            >
              <span className="universe-numeral">{u.numeral}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
              <span className="universe-meta">{u.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      <section className="partners" id="partners">
        <div className="partners-copy" data-reveal>
          <p className="overline">For Partners</p>
          <h2>One portfolio. Every high-intent audience.</h2>
          <p>
            Languages Live gives brands a structured way to participate in the moments where Indian
            audiences are deciding, building identity, seeking guidance and discovering opportunity
            — at vernacular scale.
          </p>
          <div className="partners-actions">
            <a className="button button-primary" href="mailto:sales@timeslanguages.in?subject=Languages Live annual partnership inquiry">
              Get the Partnership Deck →
            </a>
            <a className="button button-secondary" href="mailto:sales@timeslanguages.in?subject=Schedule a call">
              Schedule a Call
            </a>
          </div>
        </div>
        <div className="partner-inventory">
          {PARTNER_INVENTORY.map((item, i) => (
            <div
              className="inventory-card"
              key={item.label}
              data-reveal
              style={{ ['--reveal-delay' as never]: `${i * 60}ms` }}
            >
              <span className="inventory-mark">✦</span>
              <div>
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="overline">FAQ</p>
          <h2>Everything you wanted to ask.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              style={{ ['--reveal-delay' as never]: `${i * 70}ms` }}
            >
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="newsletter" aria-label="Newsletter signup">
        <div className="newsletter-inner" data-reveal>
          <p className="overline">Stay in the loop</p>
          <h2>The Languages Live Brief — to your inbox.</h2>
          <p>New IP launches, city dates, partner openings and on-ground access — no spam, ever.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const email = (data.get("email") as string) || "";
              window.location.href = `mailto:hello@timeslanguages.in?subject=Subscribe to Languages Live brief&body=Please subscribe ${encodeURIComponent(email)}`;
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@brand.com"
              aria-label="Email address"
            />
            <button type="submit" className="button button-primary">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top" aria-label="Times Internet Languages Live home">
              <img
                src="/langlive.png"
                alt="Times Internet Languages Live"
                className="brand-logo-custom"
                width={210}
                height={52}
              />
            </a>
            <p>Premium, vernacular-first event IPs from Times Internet — built for the audiences, cities and languages that move India.</p>
            <div className="social-row" aria-label="Social media">
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" rel="noopener noreferrer">in</a>
              <a href="https://www.instagram.com/" aria-label="Instagram" rel="noopener noreferrer">ig</a>
              <a href="https://twitter.com/" aria-label="X / Twitter" rel="noopener noreferrer">𝕏</a>
              <a href="https://www.youtube.com/" aria-label="YouTube" rel="noopener noreferrer">▶</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Universes</h4>
            <ul>
              <li><a href="#events">Education</a></li>
              <li><a href="#events">Healthcare</a></li>
              <li><a href="#events">Youth Culture</a></li>
              <li><a href="#universes">All universes</a></li>
            </ul>
          </div>

          <div className="footer-col footer-col-cities">
            <h4>Cities</h4>
            <ul className="cities-grid">
              {cityOptions.filter((c) => c !== "All").slice(0, 8).map((c) => (
                <li key={c}><a href="#events">{c}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#partners">For Partners</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="mailto:sales@timeslanguages.in">Contact Sales</a></li>
              <li><a href="mailto:press@timeslanguages.in">Press</a></li>
              <li><a href="https://www.timesinternet.in/" rel="noopener noreferrer">Times Internet</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Times Internet Ltd. — Languages Live. All rights reserved.</span>
          <span className="geo-tag">Headquartered in New Delhi · Serving Pan-India audiences</span>
        </div>
      </footer>

      <button
        type="button"
        className={`back-to-top ${showTop ? "visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </main>
  );
}

function statusWeight(status: LanguageEvent["status"]) {
  if (status === "Live") return 0;
  if (status === "Upcoming") return 1;
  if (status === "Coming Soon") return 2;
  return 3;
}

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function EventCard({ event }: { event: LanguageEvent }) {
  const tags = [
    event.category,
    event.cityLabel,
    ...event.languageTags,
    ...event.intentTags,
    ...event.formatTags
  ].slice(0, 6);

  return (
    <article className={`event-card ${event.visualTone}`}>
      <div className="event-image">
        <img src={event.image} alt={event.title} loading="lazy" />
        <span data-status={event.status}>{event.status}</span>
      </div>
      <div className="event-body">
        <p className="event-eyebrow">{event.eyebrow}</p>
        <h3>{event.title}</h3>
        <p>{event.subtitle}</p>
        <div className="meta-row">
          <span className="meta-item"><span className="meta-icon">◷</span>{event.dateLabel}</span>
          <span className="meta-item"><span className="meta-icon">◉</span>{event.cityLabel}</span>
        </div>
        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-actions">
          <a href={withUtm(event)} aria-label={`Explore more about ${event.title}`}>
            Explore more →
          </a>
        </div>
      </div>
    </article>
  );
}
