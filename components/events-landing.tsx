"use client";

import { useEffect, useRef, useState } from "react";
import { cityOptions, events, type LanguageEvent } from "@/lib/events";

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
    a: "Times Languages Live is the vernacular-first events arm of Times Internet - a curated portfolio of region-first experiences across healthcare, education, entertainment & lifestyle, and MSMEs, built for the audiences, cities, and languages that move modern India."
  },
  {
    q: "Which domains do Times Languages Live events cover?",
    a: "Our events span healthcare, education, entertainment & lifestyle, and MSMEs - each designed for a regional audience, grounded in regional context, and focused on real decisions like business growth, careers, and community health."
  },
  {
    q: "What are the flagship events?",
    a: "Our flagship IPs include Times Future of Maternity, Times Study Abroad Conclave, Times Career Counselling, NBT Mic Drop Madness, and Times India MSME Dialogue: Atmanirbhar Udyam."
  },
  {
    q: "How can brands partner with Times Languages Live?",
    a: "We offer tailored formats - from speaking slots and title sponsorships to integrated regional campaigns. Write to sales@timeslanguages.in for the partnership deck."
  },
  {
    q: "How do I attend or register?",
    a: "Every event has its own microsite linked from the calendar above. Tap the primary action on any card to register, view the agenda, or claim a counselling slot."
  }
];

const CITY_SLIDES = [
  { word: "Namaste", lang: "Hindi", city: "New Delhi", src: "/delhi_one.webm" },
  { word: "Namaste", lang: "Hindi", city: "New Delhi", src: "/delhi_two.webm" },
  { word: "Kasa Kay", lang: "Marathi", city: "Mumbai", src: "/mumbai_one.webm" },
  { word: "Kasa Kay", lang: "Marathi", city: "Mumbai", src: "/mumbai_two.webm" },
  { word: "Nomoshkar", lang: "Bengali", city: "Kolkata", src: "/bengal_one.webm" },
  { word: "Nomoshkar", lang: "Bengali", city: "Kolkata", src: "/bengal_two.webm" },
  { word: "Vanakkam", lang: "Tamil", city: "Chennai", src: "/tamil_one.webm" },
  { word: "Vanakkam", lang: "Tamil", city: "Chennai", src: "/tamil_two.webm" },
  { word: "Kem Cho", lang: "Gujarati", city: "Ahmedabad", src: "/gujarati_one.webm" },
  { word: "Kem Cho", lang: "Gujarati", city: "Ahmedabad", src: "/gujarati_two.webm" },
  { word: "Namaskaram", lang: "Telugu", city: "Hyderabad", src: "/telugu_one.webm" },
  { word: "Namaskaram", lang: "Telugu", city: "Hyderabad", src: "/telugu_two.webm" },
];



const UNIVERSES = [
  { numeral: "01", title: "Education", text: "Study abroad, career counselling, college discovery and skilling - decisions that shape futures." },
  { numeral: "02", title: "Healthcare", text: "Trusted platforms on maternity, fertility, wellness and family health access." },
  { numeral: "03", title: "Entertainment & Lifestyle", text: "Creator discovery, Hindi-first culture, talent stages and city rounds." },
  { numeral: "04", title: "MSME Growth", text: "Policy dialogue, business access, market connections and Atmanirbhar entrepreneurship." },
];

const PARTNER_INVENTORY = [
  { label: "Thought Leadership", note: "Position your brand as a domain authority." },
  { label: "Decision-Maker Access", note: "Engage policymakers, industry leaders, experts." },
  { label: "Regional Brand Relevance", note: "Speak to local audiences in their language." },
  { label: "Multi-City Exposure", note: "Activate across 10+ Indian cities." },
  { label: "Audience Insights", note: "First-party data from high-intent communities." },
  { label: "Speaking Slots", note: "Own the stage. Drive the conversation." },
  { label: "Title Sponsorship", note: "Lead the IP. Own the marquee." },
  { label: "Integrated Campaigns", note: "Regional campaigns aligned with your goals." }
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

  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  const [slideIndex, setSlideIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const slideIdxRef = useRef(0);
  const activeSlotRef = useRef<0 | 1>(0);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoARef.current?.play().catch(() => { });

    const tick = () => {
      const next = (slideIdxRef.current + 1) % CITY_SLIDES.length;
      const nextSlot = (activeSlotRef.current === 0 ? 1 : 0) as 0 | 1;
      const nextVideo = nextSlot === 0 ? videoARef.current : videoBRef.current;
      if (nextVideo) {
        nextVideo.src = CITY_SLIDES[next].src;
        nextVideo.load();
        nextVideo.play().catch(() => { });
      }
      slideIdxRef.current = next;
      activeSlotRef.current = nextSlot;
      setSlideIndex(next);
      setActiveSlot(nextSlot);
    };

    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
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
        {/* A/B video background */}
        <div className="hero-bg" aria-hidden="true">
          <video
            ref={videoARef}
            className="hero-video"
            style={{ opacity: activeSlot === 0 ? 1 : 0 }}
            src={CITY_SLIDES[0].src}
            autoPlay
            muted
            playsInline
            loop
          />
          <video
            ref={videoBRef}
            className="hero-video"
            style={{ opacity: activeSlot === 1 ? 1 : 0 }}
            muted
            playsInline
            loop
          />
          <div className="hero-overlay" />
        </div>

        {/* Content */}
        <div className="hero-content">
          <a href="#top" className="hero-logo-wrap" aria-label="Times Internet Languages Live home">
            <img
              src="/langlive.png"
              alt="Times Internet Languages Live"
              className="hero-logo-img"
            />
          </a>
          <div className="hero-copy">
            <span className="hero-greeting" key={`greeting-${slideIndex}`}>
              {CITY_SLIDES[slideIndex].word},
              <em>{CITY_SLIDES[slideIndex].lang}</em>
            </span>
            <h1>
              India&apos;s grandest stage, <span className="hero-script">in every language</span>
            </h1>
            <p>
              A premium portfolio of vernacular-first event IPs from <strong>Times Internet</strong>, built across <strong>healthcare, education, entertainment & lifestyle, and MSME domains</strong> for the audiences, cities, and languages that move modern India
            </p>
            <div className="hero-actions">
              <a href="#events" className="button button-primary">
                Explore Our Events →
              </a>
              <a href="#partners" className="button button-secondary button-ghost">
                Partner with Us
              </a>
            </div>
          </div>
        </div>

        {/* City slider indicator */}
        <div className="hero-city-bar" aria-live="polite" aria-atomic="true">
          <div className="hero-city-dots">
            {CITY_SLIDES.map((_, i) => (
              <span
                key={i}
                className={`hero-dot${i === slideIndex ? " active" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>



      <section className="section" id="events">
        <div className="section-heading" data-reveal>
          <p className="overline">The 2026 Calendar</p>
          <h2>Find your moment in the spotlight.</h2>
          <p>
            Our flagship events include Times Future of Maternity, Times Study Abroad Conclave,
            Times Career Counselling, NBT Mic Drop Madness, and Times India MSME Dialogue:
            Atmanirbhar Udyam.
          </p>
        </div>

        <div className="event-grid">
          {events.map((event, i) => (
            <div
              key={event.id}
              data-reveal
              style={{ ['--reveal-delay' as never]: `${i * 80}ms` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>

      <section className="universes" id="universes">
        <div className="universes-inner">
          <div className="section-heading" data-reveal>
            <p className="overline">Why Times Languages Live?</p>
            <h2>Strong Speakers. Relevant Audiences. Outcome-Driven Events.</h2>
            <p>
              Built for India&apos;s diverse audiences, Times Languages Live curates region-first events
              across healthcare, education, entertainment &amp; lifestyle, and MSMEs. Each experience is
              designed for a regional audience, grounded in regional context, and focused on real
              decisions - business, careers, and growth. From focused gatherings to large-format summits,
              we bring together policymakers, industry leaders, and communities to exchange practical
              insight and create direct, high-value connections both on-ground and online.
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="partners" id="partners">
        <div className="partners-copy" data-reveal>
          <p className="overline">For Partners</p>
          <h2>Partner with Times Languages Live - Built Around Your Objectives.</h2>
          <p>
            We bring regional business leaders, policymakers, and domain experts together with a
            credible media voice to address real issues - from local healthcare access and education
            gaps to MSME growth and evolving consumer trends. Work with us to position your brand
            in regional markets, communicate with clarity to local audiences, and build relationships
            that convert.
          </p>
          <div className="partners-actions">
            <a className="button button-primary" href="mailto:sales@timeslanguages.in?subject=Languages Live sponsorship inquiry">
              Explore Sponsorship Opportunities →
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
          <h2>The Languages Live Brief - to your inbox.</h2>
          <p>Event launches, city dates, partner openings and on-ground access - no spam, ever.</p>
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
            <p>Region-first events across healthcare, education, entertainment &amp; lifestyle, and MSMEs - bringing policymakers, industry leaders, and communities together for real outcomes.</p>
            <div className="social-row" aria-label="Social media">
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" rel="noopener noreferrer">in</a>
              <a href="https://www.instagram.com/" aria-label="Instagram" rel="noopener noreferrer">ig</a>
              <a href="https://twitter.com/" aria-label="X / Twitter" rel="noopener noreferrer">𝕏</a>
              <a href="https://www.youtube.com/" aria-label="YouTube" rel="noopener noreferrer">▶</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Domains</h4>
            <ul>
              <li><a href="#events">Education</a></li>
              <li><a href="#events">Healthcare</a></li>
              <li><a href="#events">Entertainment &amp; Lifestyle</a></li>
              <li><a href="#events">MSME Growth</a></li>
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
          <span>© {new Date().getFullYear()} Times Internet Ltd. - Languages Live. All rights reserved.</span>
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
