import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import '../styles/editorial.css';

import marketPulseShot from '../Media/MarketPulse/Homepage_Light.png';
import stayFinderShot from '../Media/StayFinder/01-home-hero.png';
import festifyShot from '../Media/Festify/festify-eventspage.png';

const EMAIL = 'AbhishekRajoria24@gmail.com';
const PHONE = '+91 9319054781';
const GITHUB = 'https://github.com/Abhishek1334';
const LINKEDIN = 'https://linkedin.com/in/AbhishekRajoria';

type Project = {
  n: string;
  title: string;
  tagline: string;
  meta: string;
  blurb: string;
  points: string[];
  tech: string;
  live: string;
  code: string;
  shot: string;
  alt: string;
};

const projects: Project[] = [
  {
    n: '01',
    title: 'MarketPulse',
    tagline: 'Stock analytics SPA with an AI assistant',
    meta: '2025–2026',
    blurb:
      'A real-time stock tracker with watchlists, a live-price portfolio, indicator charts, and a Gemini assistant grounded in the user’s own portfolio data.',
    points: [
      'AI assistant on the Vercel AI SDK and Gemini 2.5 Flash, with three portfolio-aware tools and streaming, inspectable tool-call chips.',
      'React 19 SPA and Express 5 shipped as a single Vercel Function; an LRU cache extended the free data quota roughly tenfold.',
    ],
    tech: 'React 19 · Vercel AI SDK · Gemini · Express 5 · Zustand · TanStack Query',
    live: 'https://market-pulse-two.vercel.app/',
    code: 'https://github.com/Abhishek1334/MarketPulse',
    shot: marketPulseShot,
    alt: 'MarketPulse homepage',
  },
  {
    n: '02',
    title: 'StayFinder',
    tagline: 'Property booking marketplace with Stripe',
    meta: '2025–2026',
    blurb:
      'A full-stack booking platform: listings, search, calendar-aware reservations, and end-to-end payments. Functionally Airbnb-shaped, visually a magazine.',
    points: [
      'End-to-end Stripe Checkout with signed, idempotent webhooks and race-safe Mongoose booking transactions.',
      'Role-based guest, host, and admin dashboards on a ten-component editorial design system, TypeScript across the stack.',
    ],
    tech: 'React 18 · TypeScript · Express · MongoDB · Stripe · shadcn/ui',
    live: 'https://stayfinder-eta.vercel.app/',
    code: 'https://github.com/Abhishek1334/stayfinder',
    shot: stayFinderShot,
    alt: 'StayFinder home hero',
  },
  {
    n: '03',
    title: 'Festify',
    tagline: 'IoT-enabled event ticketing platform',
    meta: '2025',
    blurb:
      'An event platform with dual-mode check-in: ESP8266 + RC522 RFID hardware and a browser QR scanner feed the same verification endpoint. A solo build, deployed end to end.',
    points: [
      'One endpoint verifies both QR browser scans and ESP8266 RFID taps, bound at ticket-issue time.',
      'Vite SPA and Express run as a single Vercel project with a warm-reused, serverless Mongoose connection.',
    ],
    tech: 'React 19 · Vite · Express · MongoDB · ESP8266 / RC522 · html5-qrcode',
    live: 'https://festify-tau.vercel.app/',
    code: 'https://github.com/Abhishek1334/festify',
    shot: festifyShot,
    alt: 'Festify events page',
  },
];

const experience = {
  company: 'PRNK Infotech',
  period: 'Aug 2025 – May 2026',
  months: '10 mos',
  roles: [
    { title: 'Software Developer', period: 'Feb 2026 – May 2026', months: '4 mos', note: 'Promoted from intern' },
    { title: 'Frontend Developer Intern', period: 'Aug 2025 – Feb 2026', months: '7 mos', note: '' },
  ],
  bullets: [
    'Built a Google Ads SaaS analytics dashboard end to end for a client, owning UI design, API, and full-stack delivery single-handedly; it became the client’s primary operational tool, per the founder’s LinkedIn recommendation.',
    'Led the frontend of MinoriLabs: audited the codebase, fixed broken filters, dashboards, and API integrations, and ran a ten-day sprint coordinating frontend devs, backend engineers, and the client directly, delivered before deadline.',
    'Shipped production frontends across 5+ products in Next.js 15/16 (App Router), React 19, and TypeScript: Freshbuyzar grocery (web and a React Native app), QR Code Creator SaaS, Riders Choice, MinoriLabs, and the Google Ads SaaS.',
    'Integrated Stripe and Razorpay end to end; improved Lighthouse from 50 to 95 via Promise.all parallelization and server components; reached 538/538 Vitest coverage on qrcodecreator-fe, with Playwright e2e before every push.',
  ],
};

const skills: [string, string][] = [
  ['Languages', 'TypeScript, JavaScript'],
  ['Frontend', 'Next.js, React 19, Vite, Tailwind CSS, shadcn/ui, Radix UI, Framer Motion, React Konva, Recharts'],
  ['Mobile', 'React Native, Expo, Expo Router, NativeWind'],
  ['State & Data', 'TanStack Query, Zustand, Redux Toolkit, Axios, React Hook Form'],
  ['Backend & APIs', 'Node.js, Express.js, REST, JWT, Session, OTP, API-Key auth, CSRF, Bcrypt.js'],
  ['Databases', 'PostgreSQL, MongoDB, Mongoose, MySQL'],
  ['Testing & QA', 'Vitest, Playwright, React Testing Library'],
  ['Payments', 'Stripe, Razorpay'],
  ['DevOps', 'Git, GitHub, Vercel, AWS Amplify, Docker, Railway'],
  ['Tools', 'Postman, Cloudinary, ESLint, Prettier'],
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`ed-reveal ${shown ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Redesign = () => {
  const [open, setOpen] = useState<Set<string>>(() => new Set(['01']));
  const toggle = (n: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  return (
    <div className="editorial">
      {/* Nav */}
      <header
        className="sticky top-0 z-40"
        style={{ background: 'var(--paper-trans)', backdropFilter: 'saturate(140%) blur(10px)', WebkitBackdropFilter: 'saturate(140%) blur(10px)', borderBottom: '1px solid var(--line)' }}
      >
        <div className="ed-shell flex items-center justify-between" style={{ height: 64 }}>
          <a href="#top" className="ed-mono" style={{ fontWeight: 500, letterSpacing: '0.02em', color: 'var(--ink)' }}>
            Abhishek Rajoria
          </a>
          <nav className="hidden md:flex items-center" style={{ gap: 28 }}>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="ed-mono" style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                {n.label}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn-ghost" style={{ padding: '0.5rem 0.9rem' }}>
              Résumé <ArrowUpRight size={14} />
            </a>
          </nav>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn-ghost md:hidden" style={{ padding: '0.45rem 0.8rem' }}>
            Résumé <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="ed-section" style={{ paddingTop: 92 }}>
          <div className="ed-shell">
            <Reveal>
              <p className="ed-label" style={{ marginBottom: 28 }}>Full-stack engineer · New Delhi</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="ed-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.2rem)', maxWidth: '16ch' }}>
                I build and <em>ship</em> production web and mobile products.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="ed-measure" style={{ marginTop: 32, fontSize: '1.2rem', color: 'var(--ink-soft)' }}>
                I work across Next.js App Router, React Native, and AI-powered apps, from Stripe payment flows to
                assistants with tool-calling. I take features from requirements to deployed product.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap items-center" style={{ gap: 14, marginTop: 40 }}>
                <a href="#work" className="ed-btn ed-btn-primary">
                  View work <ArrowDown size={14} />
                </a>
                <a href={`mailto:${EMAIL}`} className="ed-btn ed-btn-ghost">
                  Get in touch
                </a>
                <span className="flex items-center ed-mono" style={{ gap: 9, fontSize: '0.8rem', color: 'var(--ink-soft)', marginLeft: 6 }}>
                  <span className="ed-dot" /> Open to full-stack &amp; frontend roles
                </span>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="ed-spec" style={{ marginTop: 56, maxWidth: 720 }}>
                <div>
                  <span className="k">Based in</span>
                  <span className="v">New Delhi, India</span>
                </div>
                <div>
                  <span className="k">Focus</span>
                  <span className="v">Web &amp; mobile products</span>
                </div>
                <div>
                  <span className="k">Currently</span>
                  <span className="v">Software Developer, PRNK Infotech</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <hr className="ed-rule" />

        {/* Work */}
        <section id="work" className="ed-section" style={{ scrollMarginTop: 64 }}>
          <div className="ed-shell">
            <Reveal>
              <div className="ed-sechead" style={{ marginBottom: 36 }}>
                <span className="ed-num">§ 01</span>
                <h2 className="ed-label">Selected work</h2>
                <span className="ed-rule-flex" />
                <span className="ed-mono" style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>tap to expand</span>
              </div>
            </Reveal>

            <Reveal>
              <div>
                {projects.map((p) => {
                  const isOpen = open.has(p.n);
                  return (
                    <div className="ed-acc" key={p.n}>
                      <button className="ed-acc-head" aria-expanded={isOpen} onClick={() => toggle(p.n)}>
                        <span className="ed-acc-num">{p.n}</span>
                        <span className="ed-acc-title">{p.title}</span>
                        <span className="ed-acc-tag">{p.tagline}</span>
                        <span className="ed-acc-meta">{p.meta}</span>
                        <span className="ed-acc-ind" aria-hidden>{isOpen ? '–' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="ed-acc-panel">
                          <div className="ed-acc-panel-inner">
                            <div>
                              <p className="ed-serif" style={{ fontSize: '1.16rem', fontStyle: 'italic', color: 'var(--ink-soft)' }}>
                                {p.tagline}
                              </p>
                              <p style={{ marginTop: 14, color: 'var(--ink-soft)', maxWidth: '46ch' }}>{p.blurb}</p>
                              <ul style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {p.points.map((pt, k) => (
                                  <li key={k} className="flex" style={{ gap: 12, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                                    <span aria-hidden style={{ color: 'var(--accent)' }}>–</span>
                                    <span style={{ maxWidth: '44ch' }}>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                              <p className="ed-tag" style={{ marginTop: 18 }}>{p.tech}</p>
                              <div className="flex items-center" style={{ gap: 22, marginTop: 22 }}>
                                <a href={p.live} target="_blank" rel="noopener noreferrer" className="ed-link ed-mono" style={{ fontSize: '0.85rem' }}>Live ↗</a>
                                <a href={p.code} target="_blank" rel="noopener noreferrer" className="ed-link ed-mono" style={{ fontSize: '0.85rem' }}>Code ↗</a>
                              </div>
                            </div>
                            <a href={p.live} target="_blank" rel="noopener noreferrer" className="ed-frame ed-shot" style={{ display: 'block' }}>
                              <img src={p.shot} alt={p.alt} loading="lazy" decoding="async" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <hr className="ed-rule" />

        {/* Experience */}
        <section id="experience" className="ed-section" style={{ scrollMarginTop: 64 }}>
          <div className="ed-shell">
            <div className="ed-aside">
              <Reveal>
                <div className="ed-aside-label">
                  <span className="ed-num">§ 02</span>
                  <h2 className="ed-label">Experience</h2>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between" style={{ gap: 8 }}>
                    <h3 className="ed-display" style={{ fontSize: '1.9rem', fontWeight: 500 }}>{experience.company}</h3>
                    <span className="ed-mono" style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                      {experience.period} · {experience.months}
                    </span>
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {experience.roles.map((r) => (
                      <div key={r.title} className="flex flex-wrap items-baseline" style={{ gap: 12 }}>
                        <span style={{ fontWeight: 500 }}>{r.title}</span>
                        {r.note && <span className="ed-mono" style={{ fontSize: '0.72rem', color: 'var(--accent)' }}>{r.note}</span>}
                        <span className="ed-mono" style={{ fontSize: '0.78rem', color: 'var(--muted)', marginLeft: 'auto' }}>
                          {r.period} · {r.months}
                        </span>
                      </div>
                    ))}
                  </div>
                  <ul style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {experience.bullets.map((b, k) => (
                      <li key={k} className="flex" style={{ gap: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                        <span aria-hidden style={{ color: 'var(--accent)' }}>–</span>
                        <span style={{ maxWidth: '62ch' }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <hr className="ed-rule" />

        {/* Skills */}
        <section id="skills" className="ed-section" style={{ scrollMarginTop: 64 }}>
          <div className="ed-shell">
            <div className="ed-aside">
              <Reveal>
                <div className="ed-aside-label">
                  <span className="ed-num">§ 03</span>
                  <h2 className="ed-label">Skills</h2>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="ed-skills">
                  {skills.map(([k, v], i) => {
                    const items = v.split(', ');
                    return (
                      <div key={k}>
                        <div className="ed-skill-grp-h">
                          <span className="n">{String(i + 1).padStart(2, '0')}</span>
                          <span className="l">{k}</span>
                          <span className="c">{String(items.length).padStart(2, '0')}</span>
                        </div>
                        <div className="ed-skill-tokens">
                          {items.map((s) => (
                            <span key={s} className="ed-token">{s}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <hr className="ed-rule" />

        {/* Education */}
        <section className="ed-section" style={{ paddingBlock: 72 }}>
          <div className="ed-shell">
            <div className="ed-aside">
              <Reveal>
                <div className="ed-aside-label">
                  <span className="ed-num">§ 04</span>
                  <h2 className="ed-label">Education</h2>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="flex flex-wrap items-baseline justify-between" style={{ gap: 8 }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>BCA, Vivekananda Institute of Professional Studies</p>
                    <p className="ed-mono" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 4 }}>
                      New Delhi · CGPA 8.0 · IBM Frontend &amp; Newton School SQL certified
                    </p>
                  </div>
                  <span className="ed-mono" style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>2022–2025</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{ scrollMarginTop: 64, background: 'var(--paper-2)', borderTop: '1px solid var(--line)' }}>
          <div className="ed-shell ed-section">
            <Reveal>
              <p className="ed-label" style={{ marginBottom: 24 }}>§ 05 · Contact</p>
              <h2 className="ed-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', maxWidth: '18ch' }}>
                Let&rsquo;s build something worth shipping.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="ed-contact-grid">
                {[
                  { k: 'Email', v: EMAIL, href: `mailto:${EMAIL}` },
                  { k: 'Phone', v: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
                  { k: 'GitHub', v: 'github.com/Abhishek1334', href: GITHUB },
                  { k: 'LinkedIn', v: 'in/AbhishekRajoria', href: LINKEDIN },
                ].map((c) => (
                  <a
                    key={c.k}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="ed-contact-cell"
                    style={{ background: 'var(--paper)', padding: '26px 28px', display: 'block' }}
                  >
                    <span className="ed-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>{c.k}</span>
                    <span className="flex items-center justify-between" style={{ marginTop: 10, fontSize: '1.05rem', color: 'var(--ink)' }}>
                      {c.v} <ArrowUpRight size={16} style={{ color: 'var(--accent)' }} />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--line)' }}>
          <div className="ed-shell flex flex-wrap items-center justify-between" style={{ paddingBlock: 28, gap: 12 }}>
            <span className="ed-mono" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>© 2026 Abhishek Rajoria</span>
            <span className="ed-mono" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>New Delhi, India</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Redesign;
