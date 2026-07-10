export const defaultSiteContent = {
  nav: [
    { label: 'Home', id: 'home' },
    { label: 'Why Us', id: 'why' },
    { label: 'Facilities', id: 'facilities' },
    { label: 'Products', id: 'products' },
    { label: 'Contact', id: 'contact' },
  ],
  contact: {
    email: 'sales@kmstextiles.com',
    website: 'www.kmstextiles.com',
    websiteHref: 'http://www.kmstextiles.com/',
    location: 'Karachi, Pakistan',
    headerLabel: 'Contact Us',
    railLabel: 'Connect',
    railLinks: [
      {
        label: 'Mail',
        handle: 'sales@kmstextiles.com',
        href: 'mailto:sales@kmstextiles.com',
        icon: 'mail',
      },
      {
        label: 'Web',
        handle: 'kmstextiles.com',
        href: 'http://www.kmstextiles.com/',
        icon: 'web',
        external: true,
      },
      {
        label: 'Brief',
        handle: 'Start a brief',
        href: '#contact',
        icon: 'brief',
        anchor: 'contact',
      },
    ],
  },
  hero: {
    title: 'Engineered for\nGlobal Standards\nCrafted for Lasting Partnerships.',
    text:
      'KMS Textiles is an export-focused knitwear and apparel manufacturing enterprise, distinguished by technical expertise, precision-driven production, and an unwavering commitment to manufacturing excellence.',
    mini: 'Advanced manufacturing technologies. Specialised production systems. Disciplined quality protocols.',
    bullets: [
      { icon: 'technology', text: 'Advanced manufacturing technologies' },
      { icon: 'systems', text: 'Specialised production systems' },
      { icon: 'quality', text: 'Disciplined quality protocols' },
    ],
    ctaLabel: 'Get in Touch',
    ctaHref: 'mailto:sales@kmstextiles.com',
    image: '/images/kms-figma-hero.jpg',
    imageAlt: 'KMS Textiles manufacturing ecosystem',
  },
  metrics: {
    image: '/images/kms-figma-metric-banner.jpg',
    imageAlt: 'Textile cutting table and fabric rolls',
    items: [
      { value: 125000, start: 110000, step: 2500, suffix: '+', label: 'Garments / Month' },
      { value: 100, start: 90, step: 1, suffix: '%', label: 'On-Time Delivery' },
      { value: 95, start: 90, step: 1, suffix: '%', label: 'Client Retention' },
    ],
  },
  why: {
    title: 'Why Global Brands Choose Us',
    text:
      'Every garment moves through a carefully controlled production ecosystem designed to ensure consistency, efficiency, and uncompromising quality.',
    ctaLabel: 'View Products',
    ctaHref: '#products',
    cardLinkLabel: 'Read More',
    cardLinkHref: '#facilities',
    cards: [
      {
        title: 'State-of-the-Art Manufacturing',
        image: '/images/kms-figma-metric-banner.jpg',
        text:
          'Advanced lockstitch, overlock, flatlock, two-needle, bartack, snap-button, and steam-press systems engineered for precision.',
      },
      {
        title: 'Export-Focused Production',
        image: '/images/kms-figma-cta.jpg',
        text:
          'Garments manufactured to international standards for global brands, buying houses, importers, and sourcing partners.',
      },
      {
        title: 'Rigorous Quality Assurance',
        image: '/images/kms-figma-feature.jpg',
        text:
          'Multiple inspection checkpoints, dedicated audit procedures, and final pre-dispatch verification support every order.',
      },
      {
        title: 'Scalable Manufacturing Capacity',
        image: '/images/kms-figma-promo-b.jpg',
        text:
          'A facility designed to support growing brands and large-volume production programmes up to 125,000+ garments per month.',
      },
    ],
  },
  promos: {
    cards: [
      {
        eyebrow: 'About Us',
        title: 'Where Institutional Strength Meets Manufacturing Excellence',
        text: '',
        image: '/images/kms-figma-promo-a.jpg',
        imageAlt: 'Apparel development and sampling table',
        ctaLabel: 'Our Facilities',
        ctaHref: '#facilities',
      },
      {
        eyebrow: '',
        title: 'Manufactured for\nGlobal Markets',
        text:
          'KMS Textiles offers a versatile product portfolio across knitwear, denim, and non-denim categories, with full customisation available for sizing, colours, fabrics, and branding.',
        image: '/images/kms-figma-promo-b.jpg',
        imageAlt: 'Production and dispatch ready textile facility',
        ctaLabel: 'Our Products',
        ctaHref: '#products',
      },
    ],
  },
  about: {
    label: 'About KMS Textiles',
    title: 'Built to serve international fashion brands and sourcing partners.',
    paragraphs: [
      'KMS Textiles was established with a clear vision: to build a world-class textile and apparel manufacturing facility capable of serving the evolving needs of international fashion brands and sourcing partners.',
      'Supported by the longstanding commercial legacy of Pak Pulses, KMS combines financial stability with modern manufacturing expertise to create a dependable production partner for global markets.',
      'Our approach is founded on precision, consistency, and partnership. We do not simply produce garments; we build manufacturing confidence through disciplined processes, advanced technology, and an unwavering commitment to quality.',
    ],
    side: {
      image: '/images/kms-figma-metric-banner.jpg',
      imageAlt: 'KMS Textiles production planning and fabric preparation',
      title: 'From fabric inspection to final packaging.',
      text:
        'Every garment moves through a carefully controlled production ecosystem designed to ensure consistency, efficiency, and uncompromising quality.',
    },
  },
  facilities: {
    image: '/images/kms-figma-feature.jpg',
    imageAlt: 'Quality assurance table with garments and textile tools',
    title: 'Built for Precision\nDesigned for Scale.',
    text:
      'Our facility is a contemporary manufacturing ecosystem designed to optimise workflow, minimise handling time, and maximise quality control across every stage of production.',
    cards: [
      {
        title: 'Precision Cutting Department',
        text:
          'Equipped with 8 x 52-inch cutting machines, the cutting department ensures dimensional accuracy, optimised fabric utilisation, and consistent preparation for production.',
      },
      {
        title: 'Advanced Stitching Unit',
        text:
          'The stitching floor incorporates lockstitch, overlock, flatlock, overlap, two-needle, bartack, and snap-button systems for precision garment construction.',
      },
      {
        title: 'Finishing & Pressing Excellence',
        text:
          'Professional steam press units, techni tables, buff machines, and cropping tables finish every garment to the required specification and presentation standard.',
      },
      {
        title: 'Quality Assurance Infrastructure',
        text:
          'Ten dedicated inspection tables and a separate audit room support a multi-stage quality system from raw material intake through final dispatch.',
      },
      {
        title: 'Integrated Support Units',
        text:
          'Fabric stores, accessory stock rooms, and packaging departments are managed to ensure uninterrupted production flow and efficient order fulfilment.',
      },
    ],
  },
  products: {
    title: 'Our Products',
    text:
      'KMS Textiles offers a versatile product portfolio across knitwear, denim, non-denim, specialised knit fabrics, and custom fabric sourcing and development.',
    actionLabel: 'Discuss a Programme',
    actionHref: 'mailto:sales@kmstextiles.com',
    inquiryLabel: 'Inquiry',
    inquiryHref: 'mailto:sales@kmstextiles.com',
    cards: [
      {
        title: 'Knits Division',
        image: '/images/kms-product-knits.jpg',
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
        image: '/images/kms-product-denim.jpg',
        price: 'Custom apparel styles',
        rows: [
          ['Garments', 'Jackets, Trousers, Shirts, Shorts, Skirts'],
          ['Programme fit', 'Sizing, colours, fabrics, and branding'],
          ['Production scope', 'Reliable construction across diverse product categories'],
        ],
      },
    ],
  },
  fabric: {
    title: 'Fabrics & Textiles',
    text:
      'We work with a carefully curated fabric library spanning classic knits, performance textiles, and specialty constructions.',
    ctaLabel: 'Custom Sourcing',
    ctaHref: 'mailto:sales@kmstextiles.com',
    cards: [
      {
        title: 'Specialised Knit Fabrics',
        image: '/images/kms-product-activewear.jpg',
        price: 'The foundation of every great garment',
        rows: [
          ['Classic knits', 'Single Jersey, Interlock, Pique'],
          ['Comfort builds', 'Fleece, French Terry, Melange Jersey'],
          ['Performance knits', 'Stripe Jersey, Pointelle, Stretch Jersey, Ribbed Jersey, Polyester Mesh'],
        ],
      },
      {
        title: 'Fabric Expertise',
        image: '/images/kms-product-home.jpg',
        price: 'Sourcing and development',
        rows: [
          ['Natural base', '100% Cotton and Cotton-Polyester Blends'],
          ['Responsible yarns', 'Recycled Polyester Yarns'],
          ['Stretch systems', 'Performance Stretch, Polyester-Spandex, Nylon-Spandex Blends'],
        ],
      },
    ],
  },
  cta: {
    title: "Let's Build Something Exceptional Together",
    text:
      'Whether you are developing a new collection, scaling an existing programme, or exploring a long-term manufacturing partnership, KMS Textiles is ready to support your production requirements with precision, reliability, and uncompromising quality.',
    image: '/images/kms-figma-cta.jpg',
    imageAlt: 'Export-ready textile production floor',
    buttonLabel: 'Get in Touch',
    buttonHref: 'mailto:sales@kmstextiles.com',
  },
  foundation: {
    title: 'Our Foundation',
    text:
      'Precision, consistency, and partnership guide the manufacturing confidence KMS Textiles builds with every programme.',
    ctaLabel: 'Contact KMS',
    ctaHref: '#contact',
    cards: [
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
        quote: 'Reliability means delivering orders within agreed timelines through efficient production planning.',
        name: 'Reliability',
      },
      {
        dark: false,
        quote: 'Quality means maintaining rigorous standards from raw material inspection to final packaging.',
        name: 'Quality',
      },
      {
        dark: true,
        quote: 'Partnership means building long-term relationships through transparent collaboration.',
        name: 'Partnership',
      },
      {
        dark: false,
        quote: 'Stability is backed by the financial strength and credibility of the Pak Pulses Group.',
        name: 'Stability',
      },
    ],
  },
  footer: {
    productTitle: 'Product',
    productText: 'Manufactured for global markets',
    productLinks: [
      { label: 'Knits Division', href: '#products' },
      { label: 'Denim & Non-Denim', href: '#products' },
      { label: 'Specialised Knit Fabrics', href: '#products' },
      { label: 'Fabric Expertise', href: '#products' },
    ],
    contactTitle: 'Contact Us',
    newsletterTitle: 'Get in Touch',
    newsletterText: 'Send your brief to begin a production conversation with KMS Textiles.',
    copyright: 'Copyright 2026, All Rights Reserved',
  },
};
