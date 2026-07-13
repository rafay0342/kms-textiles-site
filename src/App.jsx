import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowRight, Cog, Facebook, Globe2, Instagram, Layers3, Mail, Menu, MessageSquareText, ShieldCheck, X } from 'lucide-react';
import { CmsPanel } from './CmsPanel.jsx';
import { KmsLogoMark } from './logo';
import { ChatWidget } from './ChatWidget.jsx';
import { defaultSiteContent } from './defaultContent.js';

const CMS_STORAGE_KEY = 'kms-textiles-local-cms-v1';
const LEGACY_HERO_TITLE = 'Engineered for Global Standards - Crafted for Lasting Partnerships.';
const UPDATED_HERO_TITLE = 'Engineered for\nGlobal Standards\nCrafted for Lasting Partnerships.';
const LEGACY_PROMO_TITLE = 'Manufactured for Global Markets';
const UPDATED_PROMO_TITLE = 'Manufactured for\nGlobal Markets';
const LEGACY_FACILITY_TITLE = 'Built for Precision - Designed for Scale.';
const UPDATED_FACILITY_TITLE = 'Built for Precision\nDesigned for Scale.';
const contactIconMap = {
  mail: Mail,
  web: Globe2,
  brief: MessageSquareText,
};

const heroBulletIconMap = {
  factory: Cog,
  technology: Cog,
  layers: Layers3,
  systems: Layers3,
  quality: ShieldCheck,
};

function cloneContent(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeContent(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? savedValue : cloneContent(defaultValue);
  }

  if (defaultValue && typeof defaultValue === 'object') {
    const savedObject = savedValue && typeof savedValue === 'object' && !Array.isArray(savedValue) ? savedValue : {};

    return Object.fromEntries(
      Object.entries(defaultValue).map(([key, value]) => [key, mergeContent(value, savedObject[key])]),
    );
  }

  return savedValue ?? defaultValue;
}

function loadCmsContent() {
  try {
    const saved = window.localStorage.getItem(CMS_STORAGE_KEY);
    return migrateContent(saved ? mergeContent(defaultSiteContent, JSON.parse(saved)) : cloneContent(defaultSiteContent));
  } catch {
    return migrateContent(cloneContent(defaultSiteContent));
  }
}

function migrateContent(value) {
  const next = mergeContent(defaultSiteContent, value);

  if (next.hero?.title === LEGACY_HERO_TITLE) {
    next.hero.title = UPDATED_HERO_TITLE;
  }

  if (next.why?.cardLinkLabel === 'Facilities') {
    next.why.cardLinkLabel = 'Read More';
  }

  if (next.promos?.cards?.[1]?.title === LEGACY_PROMO_TITLE) {
    next.promos.cards[1].title = UPDATED_PROMO_TITLE;
  }

  if (next.facilities?.title === LEGACY_FACILITY_TITLE) {
    next.facilities.title = UPDATED_FACILITY_TITLE;
  }

  return next;
}

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Why Us', id: 'why' },
  { label: 'Facilities', id: 'facilities' },
  { label: 'Products', id: 'products' },
  { label: 'Contact', id: 'contact' },
];

const contactRailLinks = [
  {
    label: 'Mail',
    handle: 'sales@kmstextiles.com',
    href: 'mailto:sales@kmstextiles.com',
    icon: Mail,
  },
  {
    label: 'Web',
    handle: 'kmstextiles.com',
    href: 'http://www.kmstextiles.com/',
    icon: Globe2,
    external: true,
  },
  {
    label: 'Brief',
    handle: 'Start a brief',
    href: '#contact',
    icon: MessageSquareText,
    anchor: 'contact',
  },
];

const metrics = [
  { value: 125000, start: 110000, step: 2500, suffix: '+', label: 'Garments / Month' },
  { value: 100, start: 90, step: 1, suffix: '%', label: 'On-Time Delivery' },
  { value: 95, start: 90, step: 1, suffix: '%', label: 'Client Retention' },
];

const whyCards = [
  {
    title: 'State-of-the-Art Manufacturing',
    image: '/kms-v3/images/kms-figma-metric-banner.jpg',
    text: 'Advanced lockstitch, overlock, flatlock, two-needle, bartack, snap-button, and steam-press systems engineered for precision.',
  },
  {
    title: 'Export-Focused Production',
    image: '/kms-v3/images/kms-figma-cta.jpg',
    text: 'Garments manufactured to international standards for global brands, buying houses, importers, and sourcing partners.',
  },
  {
    title: 'Rigorous Quality Assurance',
    image: '/kms-v3/images/kms-figma-feature.jpg',
    text: 'Multiple inspection checkpoints, dedicated audit procedures, and final pre-dispatch verification support every order.',
  },
  {
    title: 'Scalable Manufacturing Capacity',
    image: '/kms-v3/images/kms-figma-promo-b.jpg',
    text: 'A facility designed to support growing brands and large-volume production programmes up to 125,000+ garments per month.',
  },
];

const productCards = [
  {
    title: 'Knits Division',
    image: '/kms-v3/images/kms-product-knits.jpg',
    dark: true,
    price: 'Manufactured for global markets',
    rows: [
      ['Core styles', 'Crew Neck & V-Neck T-Shirts, Graphic Tees, Henley Shirts, Polo Shirts'],
      ['Extended range', 'Sweatshirts, Hoodies & Zip-Up Jackets, Tank Tops'],
      ['Active essentials', 'Joggers & Gym Pants, Activewear, Boxer Shorts & Underwear'],
    ],
  },
  {
    title: 'Denim & Non-Denim Division',
    image: '/kms-v3/images/kms-product-denim.jpg',
    price: 'Custom apparel styles',
    rows: [
      ['Garments', 'Jackets, Trousers, Shirts, Shorts, Skirts'],
      ['Programme fit', 'Sizing, colours, fabrics, and branding'],
      ['Production scope', 'Reliable construction across diverse product categories'],
    ],
  },
];

const fabricGroups = [
  {
    title: 'Specialised Knit Fabrics',
    image: '/kms-v3/images/kms-product-activewear.jpg',
    price: 'The foundation of every great garment',
    rows: [
      ['Classic knits', 'Single Jersey, Interlock, Pique'],
      ['Comfort builds', 'Fleece, French Terry, Melange Jersey'],
      ['Performance knits', 'Stripe Jersey, Pointelle, Stretch Jersey, Ribbed Jersey, Polyester Mesh'],
    ],
  },
  {
    title: 'Fabric Expertise',
    image: '/kms-v3/images/kms-product-home.jpg',
    price: 'Sourcing and development',
    rows: [
      ['Natural base', '100% Cotton and Cotton-Polyester Blends'],
      ['Responsible yarns', 'Recycled Polyester Yarns'],
      ['Stretch systems', 'Performance Stretch, Polyester-Spandex, Nylon-Spandex Blends'],
    ],
  },
];

const aboutParagraphs = [
  'KMS Textiles was established with a clear vision: to build a world-class textile and apparel manufacturing facility capable of serving the evolving needs of international fashion brands and sourcing partners.',
  'Supported by the longstanding commercial legacy of Pak Pulses, KMS combines financial stability with modern manufacturing expertise to create a dependable production partner for global markets.',
  'Our approach is founded on precision, consistency, and partnership. We do not simply produce garments; we build manufacturing confidence through disciplined processes, advanced technology, and an unwavering commitment to quality.',
];

const facilityCards = [
  {
    title: 'Precision Cutting Department',
    text: 'Equipped with 8 x 52-inch cutting machines, the cutting department ensures dimensional accuracy, optimised fabric utilisation, and consistent preparation for production.',
  },
  {
    title: 'Advanced Stitching Unit',
    text: 'The stitching floor incorporates lockstitch, overlock, flatlock, overlap, two-needle, bartack, and snap-button systems for precision garment construction.',
  },
  {
    title: 'Finishing & Pressing Excellence',
    text: 'Professional steam press units, techni tables, buff machines, and cropping tables finish every garment to the required specification and presentation standard.',
  },
  {
    title: 'Quality Assurance Infrastructure',
    text: 'Ten dedicated inspection tables and a separate audit room support a multi-stage quality system from raw material intake through final dispatch.',
  },
  {
    title: 'Integrated Support Units',
    text: 'Fabric stores, accessory stock rooms, and packaging departments are managed to ensure uninterrupted production flow and efficient order fulfilment.',
  },
];

const foundationCards = [
  {
    dark: false,
    quote:
      'KMS Textiles was established to build a world-class textile and apparel manufacturing facility for international fashion brands and sourcing partners.',
    name: 'About KMS Textiles',
  },
  {
    dark: true,
    quote:
      'Supported by the longstanding commercial legacy of Pak Pulses, KMS combines financial stability with modern manufacturing expertise.',
    name: 'Institutional Strength',
  },
  {
    dark: false,
    quote:
      'Reliability means delivering orders within agreed timelines through efficient production planning.',
    name: 'Reliability',
  },
  {
    dark: false,
    quote:
      'Quality means maintaining rigorous standards from raw material inspection to final packaging.',
    name: 'Quality',
  },
  {
    dark: true,
    quote:
      'Partnership means building long-term relationships through transparent collaboration.',
    name: 'Partnership',
  },
  {
    dark: false,
    quote:
      'Stability is backed by the financial strength and credibility of the Pak Pulses Group.',
    name: 'Stability',
  },
];

function scrollTo(event, id) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const LOGO_LOOP = { inline: true, intro: false, footer: false };
function AnimatedLogo({ variant = 'inline' }) {
  return (
    <span className={`animated-logo animated-logo--${variant}`}>
      <KmsLogoMark loop={LOGO_LOOP[variant] ?? false} durationSeconds={5} />
    </span>
  );
}

function Logo() {
  return (
    <a className="logo" href="#home" onClick={(event) => scrollTo(event, 'home')} aria-label="KMS Textiles home">
      <AnimatedLogo />
    </a>
  );
}

function LogoIntro() {
  return (
    <div className="logo-intro-overlay" aria-hidden="true">
      <div className="logo-intro-mark">
        <AnimatedLogo variant="intro" />
      </div>
    </div>
  );
}

function Button({ href, children, dark = true }) {
  return (
    <a className={`figma-button ${dark ? 'is-dark' : 'is-light'}`} href={href}>
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={1.8} />
    </a>
  );
}

function MultilineTitle({ text, className = '', indentSecond = false }) {
  return (
    <h2 className={className}>
      {String(text || '')
        .split('\n')
        .map((line, index) => (
          <span className={`title-line ${indentSecond && index > 0 ? 'is-indented' : ''}`} key={`${line}-${index}`}>
            {line}
          </span>
        ))}
    </h2>
  );
}

function CountMetric({ value, start, step, suffix, label }) {
  const metricRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    const metric = metricRef.current;
    if (!metric) return undefined;

    let frameId = 0;
    let hasRun = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runCount = () => {
      if (hasRun) return;
      hasRun = true;

      if (reduceMotion) {
        setDisplayValue(value);
        return;
      }

      const duration = 1500;
      const startTime = performance.now();
      const distance = value - start;

      const tick = (now) => {
        const elapsed = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 4);
        const rawValue = start + distance * eased;
        const nextValue =
          elapsed >= 1 ? value : Math.min(value, start + Math.floor((rawValue - start) / step) * step);

        setDisplayValue(nextValue);

        if (elapsed < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCount();
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(metric);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [start, value]);

  return (
    <article ref={metricRef} className="metric-counter" aria-label={`${value.toLocaleString('en-US')}${suffix} ${label}`}>
      <strong aria-hidden="true">
        {displayValue.toLocaleString('en-US')}
        {suffix}
      </strong>
      <span>{label}</span>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState(loadCmsContent);
  const [cmsOpen, setCmsOpen] = useState(() => window.location.hash === '#cms');

  useEffect(() => {
    setContent((current) => migrateContent(current));
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [content]);

  useEffect(() => {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    const syncCmsRoute = () => setCmsOpen(window.location.hash === '#cms');
    window.addEventListener('hashchange', syncCmsRoute);
    return () => window.removeEventListener('hashchange', syncCmsRoute);
  }, []);

  const handleNav = (event, id) => {
    setMenuOpen(false);
    scrollTo(event, id);
  };

  const closeCms = () => {
    setCmsOpen(false);
    if (window.location.hash === '#cms') {
      window.history.pushState(null, '', '#home');
    }
  };

  const navItems = content.nav || [];
  const contact = content.contact || defaultSiteContent.contact;
  const contactRailLinks = [
    { label: 'Mail', href: 'mailto:sales@kmstextiles.com', icon: Mail },
    { label: 'Facebook', href: 'https://facebook.com/kmstextiles', icon: Facebook, external: true },
    { label: 'Instagram', href: 'https://instagram.com/kmstextiles', icon: Instagram, external: true },
  ];
  const heroBullets =
    content.hero.bullets?.length > 0
      ? content.hero.bullets
      : String(content.hero.mini || '')
          .split('.')
          .map((text) => ({ text: text.trim(), icon: 'quality' }))
          .filter((item) => item.text);
  const isLocalCms = ['127.0.0.1', 'localhost'].includes(window.location.hostname);

  return (
    <main className="zandora-shell">
      <LogoIntro />
      <ChatWidget />
      {isLocalCms && (
        <a className="cms-entry-button" href="#cms" onClick={() => setCmsOpen(true)}>
          CMS
        </a>
      )}
      {cmsOpen && (
        <CmsPanel content={content} defaults={defaultSiteContent} onChange={setContent} onClose={closeCms} />
      )}

      <aside className="social-rail" aria-label="KMS Textiles contact links">
        <span className="social-rail-label">{contact.railLabel}</span>
        {contactRailLinks.map((item) => {
          const Icon = item.icon;
          const linkProps = item.external ? { target: '_blank', rel: 'noreferrer' } : {};
          return (
            <a
              className="social-rail-link"
              href={item.href}
              key={item.label}
              onClick={item.anchor ? (event) => scrollTo(event, item.anchor) : undefined}
              {...linkProps}
            >
              <Icon size={15} strokeWidth={1.8} />
              <span className="social-rail-text">{item.label}</span>
              <span className="social-rail-handle">{item.handle}</span>
            </a>
          );
        })}
      </aside>

      <section id="home" className="hero-section">
        <div className="ornament ornament-left" />
        <div className="ornament ornament-right" />

        <header className="figma-header">
          <Logo />
          <nav className={`figma-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(event) => handleNav(event, item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-link" href={`mailto:${contact.email}`}>
            {contact.headerLabel}
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="hero-grid container">
          <div className="hero-copy" data-reveal="fade-right">
            <h1>{content.hero.title}</h1>
            <p>{content.hero.text}</p>
            <div className="hero-mini">
              <ul className="hero-bullets">
                {heroBullets.map((item, index) => {
                  const Icon = heroBulletIconMap[item.icon] || BadgeCheck;
                  return (
                    <li key={`${item.text}-${index}`}>
                      <Icon size={17} strokeWidth={1.9} />
                      <span>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
              <Button href={content.hero.ctaHref}>{content.hero.ctaLabel}</Button>
            </div>
          </div>
          <div className="hero-image-wrap" data-reveal="fade-left">
            <div className="arch-frame">
              <img src={content.hero.image} alt={content.hero.imageAlt} />
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-section">
        <div className="container metrics-grid">
          <div className="metric-image" data-reveal="scale">
            <img src={content.metrics.image} alt={content.metrics.imageAlt} />
          </div>
          <div className="metrics-content" data-reveal="fade-up">
            {content.metrics.items.map((metric, index) => (
              <Fragment key={metric.label}>
                {index > 0 && <i />}
                <CountMetric key={metric.label} {...metric} />
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="collection-section container page-section">
        <div className="section-head split-head" data-reveal="fade-up">
          <div>
            <h2>{content.why.title}</h2>
            <p>{content.why.text}</p>
          </div>
          <Button href={content.why.ctaHref}>{content.why.ctaLabel}</Button>
        </div>
        <div className="collection-row">
          {content.why.cards.map((item, index) => (
            <article className="collection-card" key={item.title} data-reveal="fade-up" style={{ '--delay': `${index * 90}ms` }}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={content.why.cardLinkHref} onClick={(event) => scrollTo(event, 'facilities')}>
                <span>{content.why.cardLinkLabel}</span>
                <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="promote-section container page-section">
        {content.promos.cards.map((card, index) => (
          <article className="promo-card" data-reveal={index % 2 === 0 ? 'fade-right' : 'fade-left'} key={card.title}>
            <img src={card.image} alt={card.imageAlt || card.title} />
            <div>
              {card.eyebrow && <p>{card.eyebrow}</p>}
              <MultilineTitle text={card.title} />
              {card.text && <p>{card.text}</p>}
              <Button href={card.ctaHref}>{card.ctaLabel}</Button>
            </div>
          </article>
        ))}
      </section>

      <section className="about-detail-section container page-section">
        <div className="about-story" data-reveal="fade-right">
          <p className="section-label">{content.about.label}</p>
          <h2>{content.about.title}</h2>
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-side" data-reveal="fade-left">
          <img src={content.about.side.image} alt={content.about.side.imageAlt} />
          <div>
            <h3>{content.about.side.title}</h3>
            <p>{content.about.side.text}</p>
          </div>
        </div>
      </section>

      <section id="facilities" className="feature-section container page-section">
        <div className="feature-image" data-reveal="fade-right">
          <img src={content.facilities.image} alt={content.facilities.imageAlt} />
        </div>
        <div className="feature-content" data-reveal="fade-left">
          <div className="section-head">
            <MultilineTitle className="facility-title" text={content.facilities.title} indentSecond />
            <p>{content.facilities.text}</p>
          </div>
          <div className="feature-list">
            {content.facilities.cards.map((item, index) => (
              <article key={item.title} data-reveal="fade-up" style={{ '--delay': `${index * 70}ms` }}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="showcase-section container page-section">
        <div className="section-head center" data-reveal="fade-up">
          <h2>{content.products.title}</h2>
          <p>{content.products.text}</p>
        </div>
        <div className="showcase-grid">
          {content.products.cards.map((item, index) => (
            <article
              className={`showcase-card ${item.dark ? 'is-dark' : ''}`}
              key={item.title}
              data-reveal={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            >
              <img src={item.image} alt={item.title} />
              <div className="showcase-copy">
                <h3>{item.title}</h3>
                <p className="product-meta">{item.price}</p>
                <dl>
                  {item.rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <a href={content.products.inquiryHref}>
                  {content.products.inquiryLabel}
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="showcase-action" data-reveal="fade-up">
          <Button href={content.products.actionHref}>{content.products.actionLabel}</Button>
        </div>
      </section>

      <section className="fabric-section container page-section">
        <div className="section-head split-head" data-reveal="fade-up">
          <div>
            <h2>{content.fabric.title}</h2>
            <p>{content.fabric.text}</p>
          </div>
          <Button href={content.fabric.ctaHref}>{content.fabric.ctaLabel}</Button>
        </div>
        <div className="fabric-grid">
          {content.fabric.cards.map((item, index) => (
            <article className="fabric-card" key={item.title} data-reveal="fade-up" style={{ '--delay': `${index * 90}ms` }}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.price}</p>
                <dl>
                  {item.rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <img src={content.cta.image} alt={content.cta.imageAlt} />
        <div className="cta-content" data-reveal="scale">
          <h2>{content.cta.title}</h2>
          <p>{content.cta.text}</p>
          <Button href={content.cta.buttonHref}>{content.cta.buttonLabel}</Button>
        </div>
      </section>

      <section className="testimonial-section page-section">
        <div className="container section-head split-head" data-reveal="fade-up">
          <div>
            <h2>{content.foundation.title}</h2>
            <p>{content.foundation.text}</p>
          </div>
          <Button href={content.foundation.ctaHref}>{content.foundation.ctaLabel}</Button>
        </div>
        <div className="proof-grid container">
          {content.foundation.cards.map((card, index) => (
            <article
              className={`proof-card ${card.dark ? 'is-dark' : ''}`}
              key={card.name}
              data-reveal="fade-up"
              style={{ '--delay': `${index * 60}ms` }}
            >
              <p>{card.quote}</p>
              <h3>{card.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="footer-section page-section">
        <div className="footer-title">
          <AnimatedLogo variant="footer" />
        </div>
        <div className="footer-main container">
          <div className="footer-column">
            <h3>{content.footer.contactTitle}</h3>
            <p>{contact.location}</p>
            <p>{contact.email}</p>
            <p>{contact.website}</p>
          </div>
          <i />
          <div className="footer-column footer-product">
            <h3>{content.footer.productTitle}</h3>
            <p>{content.footer.productText}</p>
            <nav>
              {content.footer.productLinks.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <i />
          <div className="footer-column newsletter">
            <h3>{content.footer.newsletterTitle}</h3>
            <p>{content.footer.newsletterText}</p>
            <a href={`mailto:${contact.email}`}>
              <Mail size={18} />
              {contact.email}
            </a>
          </div>
        </div>
        <div className="footer-bottom">{content.footer.copyright}</div>
      </footer>
    </main>
  );
}

export default App;
