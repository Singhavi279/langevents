"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cityOptions, events, type LanguageEvent } from "@/lib/events";

const withUtm = (event: LanguageEvent) => {
  try {
    const url = new URL(event.micrositeUrl);
    url.searchParams.set("utm_source", "timeslanguages");
    url.searchParams.set("utm_medium", "portfolio");
    url.searchParams.set("utm_campaign", "languages_live_events");
    url.searchParams.set("utm_content", event.id);
    return url.toString();
  } catch {
    return event.micrositeUrl;
  }
};

const FAQs: { q: string; a: string }[] = [
  {
    q: "What is Times Internet Languages Live?",
    a: "Times Internet Languages Live is the vernacular-first events arm of Times Internet - a curated portfolio of region-first experiences across healthcare, education, entertainment & lifestyle, and MSMEs, built for the audiences, cities, and languages that move modern India."
  },
  {
    q: "Which domains do Times Internet Languages Live events cover?",
    a: "Our events span healthcare, education, entertainment & lifestyle, and MSMEs - each designed for a regional audience, grounded in regional context, and focused on real decisions like business growth, careers, and community health."
  },
  {
    q: "What are the flagship events?",
    a: "Our flagship IPs include Times Future of Maternity, Times Study Abroad Conclave, Times Career Counselling, NBT Mic Drop Madness, and Times India MSME Dialogue."
  },
  {
    q: "How can brands partner with Times Internet Languages Live?",
    a: "We offer tailored formats - from speaking slots and title sponsorships to integrated regional campaigns. Write to gaurav.vats@timesinternet.in for the partnership deck."
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
  { numeral: "01", title: "Education", text: "Study abroad, career counselling, college discovery, and skilling – shaping futures through expert discussions." },
  { numeral: "02", title: "Healthcare", text: "Conversations on maternity, fertility, wellness, and family health with vital insights for better lives." },
  { numeral: "03", title: "Entertainment & Lifestyle", text: "Spotlighting creator discovery, Hindi-first culture, talent stages, and city rounds to ignite your passion." },
  { numeral: "04", title: "MSME", text: "Forums for policy dialogue, business solutions, market access, and scalability for small businesses." },
];

const PARTNER_INVENTORY = [
  { label: "Thought Leadership", note: "Position your brand as a domain authority." },
  { label: "Decision-Maker Access", note: "Engage with policymakers, industry leaders, experts." },
  { label: "Regional Brand Relevance", note: "Speak to local audiences in their language." },
  { label: "Multi-City Exposure", note: "Active across 10+ Indian cities." },
  { label: "Audience Insights", note: "First-party data from high-intent communities." },
  { label: "Speaking Slots", note: "Own the stage. Drive the conversation." }
];



export function EventsLanding() {

  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const openModal = useCallback(() => setShowInterestModal(true), []);
  const closeModal = useCallback(() => setShowInterestModal(false), []);

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
          <a href="#top">Home</a>
          <a href="#events">Events</a>
          <a href="#partners">Partner</a>
          <a href="#faq">FAQs</a>
          <a href="#contact">Contact Us</a>
        </nav>
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
            <span className="hero-greeting" key={`greeting-${CITY_SLIDES[slideIndex].lang}`}>
              {CITY_SLIDES[slideIndex].word},
              <em>{CITY_SLIDES[slideIndex].lang}</em>
            </span>
            <h1>
              India&apos;s grandest stage, <span className="hero-script">in every language</span>
            </h1>
            <p>
              A premium portfolio of vernacular-first event IPs from <strong>Times Internet</strong>, built across <strong>healthcare, education, entertainment & lifestyle, and MSME domains</strong> for the audiences, cities, and languages that move modern India.
            </p>
            <div className="hero-actions">
              <button type="button" className="button button-primary" onClick={openModal}>
                Express Interest
              </button>
              <a href="#events" className="button button-secondary button-ghost">
                Explore Our Events →
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

      <section className="about-us section" id="about">
        <div className="section-heading" data-reveal>
          <p className="overline">About Us</p>
          <div className="about-text-content">
            <p>
              Built for India’s diverse audiences, Times Internet Languages Live curates region-first events across healthcare, education, entertainment, lifestyle, and MSMEs. Each experience is designed for a regional audience, grounded in regional context, and focused on real decisions, business, careers, and growth.
            </p>
            <p>
              From focused gatherings to large-format summits, we bring together policymakers, industry leaders, and communities to exchange practical insight and create direct, high-value connections both on-ground and online.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="events">
        <div className="section-heading" data-reveal>
          <p className="overline">Flagship Events</p>
          <h2>Find your moment in the spotlight.</h2>
          <p>
            Our flagship events include Times Future of Maternity, Times Study Abroad Conclave,
            Times Career Counselling, NBT Mic Drop Madness, and Times India MSME Dialogue
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
            <p className="overline">Why Times Internet Languages Live?</p>
            <h2>Strong Speakers. Relevant Audiences. <br /> Outcome-Driven Events.</h2>
            <p>
              We bring regional business leaders, policymakers, and domain experts together with a credible media voice to address real issues – from local healthcare access and education gaps to MSME growth and evolving consumer trends.
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
          <h2>Partner with Times Internet Languages Live - Built Around Your Objectives.</h2>
          <div className="partners-intro-row">
            <p>
              Work with us to position your brand in regional markets, communicate with clarity to local audiences, and build relationships that convert.
            </p>
            <button type="button" className="button button-primary" onClick={openModal}>
              Partner with Us →
            </button>
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
          <p className="overline" style={{ textTransform: "none" }}>FAQs</p>
          <h2>Everything you wanted to ask.</h2>
        </div>
        <div className="faq-list">
          {FAQs.map((f, i) => (
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
              window.location.href = `mailto:gaurav.vats@timesinternet.in?subject=Subscribe to Languages Live brief&body=Please subscribe ${encodeURIComponent(email)}`;
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

      <section className="contact-us section" id="contact">
        <div className="section-heading" data-reveal>
          <p className="overline">Contact Us</p>
          <h2>Get in Touch</h2>
          <p>Reach out to our team for any inquiries or support.</p>
        </div>
        <div className="contact-grid">
          {[
            { icon: "🤝", role: "General Query", name: "Avnish Singh", number: "+91 7669138964", email: "avnish.singh@timesinternet.in" },
            { icon: "🏆", role: "Award Nominations", name: "Sagun Kumari", number: "+91 9304412377", email: "sagun.kumari@timesinternet.in" },
            { icon: "🎤", role: "Speaking Opportunity", name: "Simran Singh", number: "+91 7838788554", email: "simran1@timesinternet.in" },
            { icon: "✉️", role: "Sponsorships", name: "Gaurav Vats", number: "+91 9811573962", email: "gaurav.vats@timesinternet.in" },
          ].map((contact, i) => (
            <div
              className="contact-card"
              key={contact.email}
              data-reveal
              style={{ ['--reveal-delay' as never]: `${i * 100}ms` }}
            >
              <div className="contact-card-icon">{contact.icon}</div>
              <p className="contact-card-role">{contact.role}</p>
              <h3>{contact.name}</h3>
              <p><span>Contact:</span> <a href={`tel:${contact.number.replace(/\s/g, '')}`}>{contact.number}</a></p>
              <p><span>Email:</span> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            </div>
          ))}
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
              <a href="https://www.linkedin.com/company/times-languages-live/" aria-label="LinkedIn" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589492833800" aria-label="Facebook" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </a>
              <a href="https://x.com/timeslanglive" aria-label="X / Twitter" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
              </a>
              <a href="https://www.youtube.com/@timeslanguageslive" aria-label="YouTube" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
              <a href="https://www.instagram.com/timeslanguages" aria-label="Instagram" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Domains</h4>
            <ul>
              <li><a href="#events">Education</a></li>
              <li><a href="#events">Healthcare</a></li>
              <li><a href="#events">Entertainment &amp; Lifestyle</a></li>
              <li><a href="#events">MSME</a></li>
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
              <li><a href="#faq">FAQs</a></li>
              <li><a href="mailto:gaurav.vats@timesinternet.in">Contact Sales</a></li>
              <li><a href="https://www.timesinternet.in/" rel="noopener noreferrer">Times Internet</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Times Internet Languages Live. All rights reserved.</span>
          <span className="geo-tag">Headquartered in Uttar Pradesh · Serving Pan-India regional audiences</span>
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

      {showInterestModal && <InterestModal onClose={closeModal} />}
    </main>
  );
}

function EventCard({ event }: { event: LanguageEvent }) {
  return (
    <article className={`event-card ${event.visualTone}`}>
      <div className="event-image">
        <img src={event.image} alt={event.title} loading="lazy" />
        <span data-status={event.status}>{event.status}</span>
      </div>
      <div className="event-body">
        <p className="event-eyebrow">{event.category}</p>
        <h3>{event.title}</h3>
        <p>{event.subtitle}</p>
        <div className="meta-row">
          <span className="meta-item"><span className="meta-icon">◷</span>{event.dateLabel}</span>
          <span className="meta-item"><span className="meta-icon">◉</span>{event.cityLabel}</span>
        </div>
        <div className="tag-row">
          {event.cardTags.slice(0, 5).map((tag) => (
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

/* ─── Interest Modal with OTP ─── */
function InterestModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    designation: "",
    company: "",
    note: "",
    optComms: false,
    optTerms: true,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const OTP_CODE = "1234";

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSendOtp = () => {
    if (form.phone.replace(/\D/g, "").length < 10) return;
    setOtpSent(true);
    setOtpError("");
  };

  const handleVerifyOtp = () => {
    if (otpValue === OTP_CODE) {
      setOtpVerified(true);
      setOtpError("");
    } else {
      setOtpError("Invalid OTP. Try 1234.");
    }
  };

  const canSubmit =
    form.fullName.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    form.designation.trim() &&
    form.company.trim() &&
    otpVerified &&
    form.optTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 800);
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (submitted) {
    return (
      <div className="modal-backdrop" ref={backdropRef} onClick={handleBackdrop}>
        <div className="modal-panel">
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
          <div className="modal-success">
            <span className="modal-success-icon">✓</span>
            <h3>Thank you, {form.fullName.split(" ")[0]}!</h3>
            <p>We&apos;ve received your interest. Our partnerships team will reach out within 24 hours.</p>
            <button type="button" className="button button-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" ref={backdropRef} onClick={handleBackdrop}>
      <div className="modal-panel">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-header">
          <p className="overline" style={{ textTransform: "none", marginBottom: 8 }}>Express Interest</p>
          <h3>Partner with Times Internet Languages Live</h3>
          <p>Fill in your details and our team will get back to you.</p>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="interest-name">Full Name *</label>
            <input id="interest-name" type="text" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your full name" />
          </div>

          <div className="modal-field">
            <label htmlFor="interest-phone">Phone Number *</label>
            <div className="modal-otp-row">
              <input
                id="interest-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => { update("phone", e.target.value); if (otpVerified) { setOtpVerified(false); setOtpSent(false); setOtpValue(""); } }}
                placeholder="+91 9876543210"
                disabled={otpVerified}
              />
              {!otpVerified && (
                <button type="button" className="modal-otp-btn" onClick={handleSendOtp} disabled={otpSent && !otpError}>
                  {otpSent ? "Resend" : "Send OTP"}
                </button>
              )}
              {otpVerified && <span className="modal-otp-verified">✓ Verified</span>}
            </div>
            {otpSent && !otpVerified && (
              <div className="modal-otp-row" style={{ marginTop: 8 }}>
                <input
                  type="text"
                  maxLength={4}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 4-digit OTP"
                  className="modal-otp-input"
                />
                <button type="button" className="modal-otp-btn" onClick={handleVerifyOtp}>Verify</button>
              </div>
            )}
            {otpError && <span className="modal-field-error">{otpError}</span>}
          </div>

          <div className="modal-field">
            <label htmlFor="interest-email">Email *</label>
            <input id="interest-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" />
          </div>

          <div className="modal-row-2">
            <div className="modal-field">
              <label htmlFor="interest-designation">Designation *</label>
              <input id="interest-designation" type="text" required value={form.designation} onChange={(e) => update("designation", e.target.value)} placeholder="VP Marketing" />
            </div>
            <div className="modal-field">
              <label htmlFor="interest-company">Company *</label>
              <input id="interest-company" type="text" required value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme Corp" />
            </div>
          </div>

          <div className="modal-field">
            <label htmlFor="interest-note">Add a Note <span>(optional)</span></label>
            <textarea id="interest-note" rows={3} value={form.note} onChange={(e) => update("note", e.target.value)} placeholder="Tell us about your interest or questions..." />
          </div>

          <div className="modal-checks">
            <label className="modal-check">
              <input type="checkbox" checked={form.optComms} onChange={(e) => update("optComms", e.target.checked)} />
              <span>I agree to receive further communication via WhatsApp and email</span>
            </label>
            <label className="modal-check">
              <input type="checkbox" checked={form.optTerms} onChange={(e) => update("optTerms", e.target.checked)} />
              <span>I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a> and <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" className="button button-primary modal-submit" disabled={!canSubmit || sending}>
            {sending ? "Submitting..." : "Submit Interest"}
          </button>
        </form>
      </div>
    </div>
  );
}
