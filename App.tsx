'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import {
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
  MapPin,
  Copy,
  Check,
  Terminal,
  Globe,
  Layers,
  Coffee,
  ExternalLink,
  Sparkles,
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  Sun,
  Moon,
  Download,
  Calendar,
  Code2,
  Shield,
  Clock,
  BookOpen,
  ChevronLeft,
  ArrowRight,
  Search,
  Share2,
  Menu,
  Link
} from 'lucide-react';

// --- Data & Constants ---

const PROJECTS = [
  {
    id: 1,
    title: "Cortex",
    quarter: "In Progress",
    description: "A web platform designed to support neurodiverse individuals with task management and focus tools.",
    longDescription: "Cortex is a specialized platform built to aid neurodiverse individuals. It features a distraction-free interface with visual schedules, timers, and customizable task boards. The platform includes text-to-speech functionality, font customization, and color themes tailored for accessibility (e.g., dyslexia-friendly modes).",
    tags: ["React", "Accessibility", "Design", "Text-to-Speech"],
    link: "#",
    gradient: "from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40"
  },
  {
    id: 2,
    title: "Realtime Discord Bot App",
    quarter: "Completed",
    description: "A custom Discord bot built to automate server management and enhance community engagement.",
    longDescription: "This project involves a robust Discord bot designed for automation. It supports custom commands, role assignment, and moderation tools. Integrated with external APIs, it fetches dynamic content like memes, weather updates, and news to keep the community engaged.",
    tags: ["Node.js", "Discord.js", "API Integration", "Automation"],
    link: "#",
    gradient: "from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40"
  },
  {
    id: 3,
    title: "Portfolio Website",
    quarter: "Completed",
    description: "A personal portfolio website to showcase projects, skills, and experience with a clean, responsive UI.",
    longDescription: "Designed with a mobile-first approach, this portfolio features a clean and responsive UI for both desktop and mobile users. It includes a dynamic project gallery, downloadable resume functionality, and a contact form for direct communication.",
    tags: ["React", "Tailwind CSS", "Responsive Design", "UI/UX"],
    link: "#",
    gradient: "from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40"
  }
];

// Flattened and split for marquee
const SKILLS_ROW_1 = [
  "C/C++", "Python", "Java", "JavaScript", "React.js", "Node.js", "MongoDB", "System Design"
];

const SKILLS_ROW_2 = [
  "Firebase", "MySQL", "HTML/CSS", "Git", "GitHub", "Data Structures", "OOPs", "Web Design"
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Zero Trust Architecture: Beyond the Buzzword",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    excerpt: "Why traditional perimeter-based security is failing and how identity-centric security models are shaping the future of enterprise infrastructure.",
    tags: ["Security", "Architecture"],
    content: (
      <>
        <p className="lead text-lg mb-6">
          For decades, the "castle-and-moat" security model dominated enterprise architecture. The premise was simple: build a strong perimeter firewall, verify users once at the gate, and then trust them implicitly once they're inside.
        </p>
        <h4 id="perimeter-is-dead" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">The Perimeter is Dead</h4>
        <p className="mb-4">
          With the rise of cloud computing, remote work, and BYOD (Bring Your Own Device), the network perimeter has dissolved. Users are accessing resources from coffee shops, home networks, and mobile devices. The assumption that "inside equals safe" is no longer valid.
        </p>
        <p className="mb-4">
          Zero Trust Architecture (ZTA) flips this model on its head. It operates on a simple, yet profound principle: <strong>Never trust, always verify.</strong>
        </p>
        <h4 id="core-pillars" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Core Pillars of Zero Trust</h4>
        <ul className="list-disc pl-5 space-y-2 mb-6 marker:text-blue-500">
          <li><strong>Identity:</strong> Verify the user's identity with strong MFA, not just a password. Context matters—is the login coming from an unusual location?</li>
          <li><strong>Device:</strong> Ensure the accessing device is compliant, patched, and healthy before allowing connection.</li>
          <li><strong>Network:</strong> Micro-segmentation prevents lateral movement. If an attacker breaches one server, they shouldn't have free reign over the entire network.</li>
          <li><strong>Data:</strong> Classify and encrypt data at rest and in transit. Access should be granted based on the sensitivity of the data and the user's need-to-know.</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-l-4 border-blue-500 rounded-r-lg mb-6">
          <p className="text-sm text-blue-800 dark:text-blue-200 italic">
            "Zero Trust isn't about buying a single product; it's a strategic shift in how we view access and risk across the entire organization."
          </p>
        </div>
        <p>
          Moving to Zero Trust is a journey, not a destination. It starts with visibility—knowing exactly what users, devices, and applications are on your network—and incrementally tightening policies to reduce the attack surface.
        </p>
      </>
    ),
    toc: [
      { id: "perimeter-is-dead", title: "The Perimeter is Dead", level: 1 },
      { id: "core-pillars", title: "Core Pillars of Zero Trust", level: 1 }
    ]
  },
  {
    id: 2,
    title: "Securing Modern React Applications",
    date: "Feb 28, 2025",
    readTime: "8 min read",
    excerpt: "A deep dive into XSS prevention, Content Security Policies (CSP), and secure authentication patterns in Next.js and React ecosystems.",
    tags: ["React", "AppSec"],
    content: (
      <>
        <p className="lead text-lg mb-6">
          React's component-based architecture and Virtual DOM provide a significant security baseline by default, primarily by escaping values in JSX. However, "secure by default" doesn't mean "invulnerable."
        </p>

        <h4 id="dangerously-set-inner-html" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">The Danger of `dangerouslySetInnerHTML`</h4>
        <p className="mb-4">
          As the name implies, <code>dangerouslySetInnerHTML</code> is React's method for handling raw HTML. It is the most common vector for Cross-Site Scripting (XSS) in React apps.
        </p>
        <pre className="bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto text-sm mb-4 font-mono">
          {`// Vulnerable Code
<div dangerouslySetInnerHTML={{ __html: userProvidedString }} />

// Safer Approach: Sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userProvidedString) }} />`}
        </pre>
        <p className="mb-4">
          Always sanitize any HTML string coming from an external source (API, user input, CMS) before rendering it. Libraries like <strong>DOMPurify</strong> are essential.
        </p>

        <h4 id="csp" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Content Security Policy (CSP)</h4>
        <p className="mb-4">
          A robust CSP is your second line of defense. It restricts where scripts, styles, and images can be loaded from. For a Next.js application, you can configure headers in <code>next.config.js</code> or via middleware.
        </p>
        <p className="mb-4">
          A strict CSP might look like this:
        </p>
        <code className="block bg-gray-100 dark:bg-neutral-900 p-3 rounded text-xs mb-6 text-neutral-600 dark:text-neutral-400 font-mono">
          default-src 'self'; script-src 'self' https://analytics.example.com; style-src 'self' 'unsafe-inline';
        </code>

        <h4 id="auth-storage" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Authentication Storage</h4>
        <p className="mb-4">
          Where do you store your JWTs?
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6 marker:text-green-500">
          <li><strong>LocalStorage:</strong> Vulnerable to XSS. If an attacker runs JS on your page, they steal the token.</li>
          <li><strong>HttpOnly Cookie:</strong> Immune to XSS (JS cannot read it), but vulnerable to CSRF (Cross-Site Request Forgery).</li>
        </ul>
        <p>
          The recommended approach for modern web apps is using <strong>HttpOnly, Secure, SameSite=Strict cookies</strong> to store session tokens, effectively mitigating both vectors when paired with anti-CSRF tokens for mutating actions.
        </p>
      </>
    ),
    toc: [
      { id: "dangerously-set-inner-html", title: "The Danger of dangerouslySetInnerHTML", level: 1 },
      { id: "csp", title: "Content Security Policy (CSP)", level: 1 },
      { id: "auth-storage", title: "Authentication Storage", level: 1 }
    ]
  },
  {
    id: 3,
    title: "The State of Supply Chain Security",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    excerpt: "Analyzing recent npm malware incidents and practical strategies to audit and lock down your dependency tree to prevent upstream attacks.",
    tags: ["DevSecOps", "Node.js"],
    content: (
      <>
        <p className="lead text-lg mb-6">
          Modern software development is like building with Lego blocks. We pull hundreds, sometimes thousands, of dependencies from registries like npm, PyPI, or Docker Hub. But what happens if one of those blocks is poisoned?
        </p>

        <h4 id="attack-surface" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">The Attack Surface</h4>
        <p className="mb-4">
          Supply chain attacks target the upstream components of your application. Instead of hacking your server directly, an attacker compromises a library you use (e.g., `event-stream` or `ua-parser-js`). When you run `npm install`, you invite the malware in.
        </p>

        <h4 id="typosquatting" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Typosquatting & Dependency Confusion</h4>
        <p className="mb-4">
          Attackers often publish packages with names similar to popular internal libraries (e.g., `react-dom` vs `react-d0m`). If your internal registry isn't prioritized correctly, your build system might pull the public malicious package instead of your private one.
        </p>

        <h4 id="defensive-strategies" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Defensive Strategies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <h5 className="font-bold mb-2">Lock Your Dependencies</h5>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Always commit `package-lock.json` or `yarn.lock`. This ensures every build uses the exact same version of every package.</p>
          </div>
          <div className="bg-gray-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <h5 className="font-bold mb-2">Automated Audits</h5>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Integrate `npm audit` or tools like Snyk into your CI/CD pipeline to block builds with critical vulnerabilities.</p>
          </div>
        </div>

        <p>
          Trust nothing. Verify everything. Even the code you didn't write is your responsibility once it's in your production bundle.
        </p>
      </>
    ),
    toc: [
      { id: "attack-surface", title: "The Attack Surface", level: 1 },
      { id: "typosquatting", title: "Typosquatting & Dependency Confusion", level: 1 },
      { id: "defensive-strategies", title: "Defensive Strategies", level: 1 }
    ]
  },
  {
    id: 4,
    title: "Mastering React Server Components",
    date: "Dec 05, 2024",
    readTime: "7 min read",
    excerpt: "Understanding the paradigm shift in data fetching. How RSCs reduce bundle size and improve First Contentful Paint (FCP) in Next.js applications.",
    tags: ["React", "Performance"],
    content: (
      <>
        <p className="lead text-lg mb-6">
          React Server Components (RSC) represent the biggest shift in the React ecosystem since hooks. They allow us to render components exclusively on the server, sending zero JavaScript to the client.
        </p>
        <h4 id="why-rsc" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Why RSC?</h4>
        <p className="mb-4">
          Traditionally, we had to choose between Client-Side Rendering (CSR) and Server-Side Rendering (SSR). Both usually involved hydration, where the client re-runs the code to attach event listeners. RSCs allow you to keep heavy dependencies (like markdown parsers or date libraries) on the server.
        </p>
        <p className="mb-4">
          This results in significantly smaller bundle sizes. You can fetch data directly from your database inside your component without exposing API secrets or needing `useEffect`.
        </p>
        <pre className="bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto text-sm mb-4 font-mono">
          {`// Server Component
async function ProductList() {
  const products = await db.products.findAll(); // Direct DB access
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}`}
        </pre>
        <p>
          Embracing RSCs requires a mental model shift, but the performance gains for content-heavy applications are undeniable.
        </p>
      </>
    ),
    toc: [
      { id: "why-rsc", title: "Why RSC?", level: 1 }
    ]
  },
  {
    id: 5,
    title: "Optimizing Core Web Vitals",
    date: "Nov 20, 2024",
    readTime: "5 min read",
    excerpt: "Practical techniques to improve LCP, FID, and CLS scores. From font loading strategies to image optimization and code splitting.",
    tags: ["Performance", "SEO"],
    content: (
      <>
        <p className="lead text-lg mb-6">
          Core Web Vitals are no longer just "nice to have metrics." Google uses them as a direct ranking signal. If your LCP (Largest Contentful Paint) is slow, your SEO suffers.
        </p>
        <h4 id="key-strategies" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Key Strategies</h4>
        <ul className="list-disc pl-5 space-y-2 mb-6 marker:text-purple-500">
          <li><strong>Images:</strong> Always use `width` and `height` attributes to prevent Cumulative Layout Shift (CLS). Use modern formats like AVIF or WebP.</li>
          <li><strong>Fonts:</strong> Use `font-display: swap` to ensure text is visible immediately. Self-host critical fonts to reduce DNS lookups.</li>
          <li><strong>Third-party Scripts:</strong> Defer non-critical scripts (chat widgets, analytics) until after the main content has loaded using `requestIdleCallback` or the `defer` attribute.</li>
        </ul>
        <p>
          Remember, performance is a feature. A fast site converts better and ranks higher.
        </p>
      </>
    ),
    toc: [
      { id: "key-strategies", title: "Key Strategies", level: 1 }
    ]
  },
  {
    id: 6,
    title: "Accessibility First Development",
    date: "Oct 15, 2024",
    readTime: "6 min read",
    excerpt: "Building inclusive web experiences isn't just about compliance. It's about creating better products for everyone. A guide to ARIA, focus management, and semantic HTML.",
    tags: ["A11y", "HTML"],
    content: (
      <>
        <p className="lead text-lg mb-6">
          The Web Content Accessibility Guidelines (WCAG) should be your bible. But accessibility goes beyond checking boxes. It's about empathy.
        </p>
        <h4 id="common-pitfalls" className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">Common Pitfalls</h4>
        <p className="mb-4">
          One common mistake is div-itis. Using a `div` with an `onClick` handler does not make it a button. It lacks keyboard focus, Enter key support, and screen reader announcements.
        </p>
        <pre className="bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto text-sm mb-4 font-mono">
          {`/* Bad */
<div onClick={submit}>Submit</div>

/* Good */
<button onClick={submit} type="button">Submit</button>`}
        </pre>
        <p className="mb-4">
          <strong>Semantic HTML</strong> is 80% of the battle. Use `nav`, `main`, `article`, and `aside`. Use `h1` through `h6` logically, not just for font sizing.
        </p>
        <p>
          When you build for accessibility, you often improve the experience for power users (keyboard navigation) and bots (SEO) as well.
        </p>
      </>
    ),
    toc: [
      { id: "common-pitfalls", title: "Common Pitfalls", level: 1 }
    ]
  }
];

const EXPERIENCE = [
  { id: 1, role: "Cyber Security Intern", company: "The Red Users", period: "Mar 2025 - May 2025" },
  { id: 2, role: "Contributor", company: "GirlScript Summer of Code", period: "Oct 2024 - Dec 2024" },
  { id: 3, role: "Senior Moderator", company: "Brainly", period: "Feb 2020 - Jan 2022" },
];

// --- Sub-Components ---

const Badge = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors border-neutral-200 bg-gray-100 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400 ${className}`}>
    {children}
  </span>
);

const Card = ({
  as: Tag = 'div',
  children,
  className = "",
  hoverEffect = true,
  onClick,
  ...props
}: {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const isInteractive = !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Tag
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={isInteractive ? 0 : undefined}
      // Note: We avoid adding role="button" if there are nested interactive elements like buttons inside,
      // but tabIndex ensures keyboard users can focus and activate the card.
      className={`bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 transition-all duration-300 ${hoverEffect ? 'hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer' : ''} ${className} ${isInteractive ? 'focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600' : ''}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

const SocialButton = ({ icon, label, subLabel, href, ariaLabel }: { icon: React.ReactNode; label: string; subLabel: string; href: string; ariaLabel: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer me"
    aria-label={ariaLabel}
    className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white dark:bg-neutral-950 rounded-lg text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors border border-neutral-200 dark:border-transparent" aria-hidden="true">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{label}</span>
        <span className="text-xs text-neutral-500">{subLabel}</span>
      </div>
    </div>
    <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" aria-hidden="true" />
  </a>
);

const Marquee = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden select-none marquee-container w-full">
      <div
        className={`flex shrink-0 gap-4 py-4 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {/* Render items 4 times to ensure seamless looping on large screens */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="px-6 py-3 bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-300 font-medium transition-all duration-300 cursor-default hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 shadow-sm dark:shadow-none"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const FadeIn = ({
  children,
  className = "",
  delay = 0
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ReadingProgress = ({ progress }: { progress: number }) => (
  <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-neutral-800 z-50">
    <div
      className="h-full bg-blue-500 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const SocialShare = ({ title, url, className = "" }: { title: string; url: string; className?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      icon: <Twitter className="w-4 h-4" />,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Share:</span>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label={`Share on ${link.label}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-gray-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors relative"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

const Toast = ({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
      <div className="bg-neutral-900 text-white dark:bg-white dark:text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm">
        <Check className="w-4 h-4 text-green-500" />
        {message}
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: typeof PROJECTS[0] | null, onClose: () => void }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true"></div>
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#111111] rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} relative shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-white/40" />
          </div>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 id="modal-title" className="text-2xl font-bold text-neutral-900 dark:text-white">{project.title}</h3>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 px-2 py-1 rounded">
              {project.quarter}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <p>{project.description}</p>
            <p>{project.longDescription}</p>

            <div className="bg-gray-50 dark:bg-neutral-900/50 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Tech Stack Highlights
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {project.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex gap-4">
              <button onClick={() => window.open("https://example.com", "_blank")} className="flex-1 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                View Live Site <ExternalLink className="w-4 h-4" />
              </button>
              <button onClick={() => window.open("https://github.com/kaushalrnc0?tab=repositories", "_blank")} className="flex-1 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                Source Code <Github className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <SocialShare
                title={`Check out ${project.title} by Kaushal Raj Gupta`}
                url={project.link === "#" ? window.location.href : project.link}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogModal = ({ post, onClose }: { post: typeof BLOG_POSTS[0] | null, onClose: () => void }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setReadingProgress(Math.min(100, Math.max(0, progress)));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true"></div>
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#111111] rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
      >
        <ReadingProgress progress={readingProgress} />

        {/* Header */}
        <div className="bg-gray-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 px-8 py-6 relative shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 dark:opacity-100"></div>
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-800/50">
                  {post.tags[0]}
                </span>
                <span className="text-xs text-neutral-500">{post.date}</span>
                <span className="text-xs text-neutral-500">•</span>
                <span className="text-xs text-neutral-500">{post.readTime}</span>
              </div>
              <h2 id="blog-modal-title" className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-tight">{post.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors z-10 shrink-0"
              aria-label="Close article"
            >
              <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Table of Contents - Desktop */}
          {post.toc && (
            <div className="hidden lg:block w-64 border-r border-neutral-200 dark:border-neutral-800 p-6 overflow-y-auto shrink-0 bg-gray-50/50 dark:bg-neutral-900/20">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Contents</h3>
              <nav className="space-y-1">
                {post.toc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-sm py-1.5 px-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-white dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Content */}
          <div
            className="flex-1 p-8 md:p-12 overflow-y-auto scroll-smooth"
            onScroll={handleScroll}
            ref={contentRef}
          >
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500">
              {post.content}
            </div>

            {/* Mobile TOC */}
            {post.toc && (
              <div className="lg:hidden mt-8 p-4 bg-gray-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">In this article</h3>
                <div className="space-y-2">
                  {post.toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-neutral-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">Alex Developer</span>
                    <span className="text-xs text-neutral-500">Senior Frontend Engineer</span>
                  </div>
                </div>

                <SocialShare
                  title={post.title}
                  url={window.location.href}
                  className="w-full md:w-auto justify-center md:justify-end"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button onClick={onClose} className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full text-sm hover:opacity-90 transition-opacity">
                  Back to Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>(() => {
    const hour = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 18) timeGreeting = "Good afternoon";

    return [
      {
        role: 'model',
        text: `${timeGreeting}! I'm Kaushal's AI assistant. Feel free to ask me about his work on ${PROJECTS[0].title}, his skills in ${PROJECTS[0].tags[0]}, or anything else regarding his portfolio.`
      }
    ];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const initChat = () => {
    if (!chatSessionRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        You are an AI assistant for Alex Developer's portfolio website.
        Your goal is to answer visitor questions professionally and concisely about Alex.
        
        Here is Alex's Resume Context:
        
        SUMMARY:
        Full Stack Engineer & React Specialist based in San Francisco. Building scalable, accessible web apps.
        
        SKILLS:
        ${SKILLS_ROW_1.join(', ')}, ${SKILLS_ROW_2.join(', ')}
        
        EXPERIENCE:
        ${JSON.stringify(EXPERIENCE)}
        
        PROJECTS:
        ${JSON.stringify(PROJECTS)}
        
        You are an AI assistant for Kaushal Raj Gupta's portfolio website.
        Your goal is to answer visitor questions professionally and concisely about Kaushal.
        
        Here is Kaushal's Resume Context:
        
        SUMMARY:
        B.Tech student at ITER (SOA), Odisha. CGPA 8.9. Passionate about Web Development and Cyber Security.
        
        TONE:
        Professional, enthusiastic, slightly technical but accessible. Keep responses under 3-4 sentences unless asked for detail.
      `;

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: context }
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      initChat();
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) initChat();

      const result = await chatSessionRef.current.sendMessageStream({ message: userText });

      setMessages(prev => [...prev, { role: 'model', text: "" }]);
      let fullText = "";

      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].text = fullText;
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white dark:bg-neutral-800 text-black dark:text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-neutral-200 dark:border-neutral-700"
        aria-label="Open AI Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        style={{ maxHeight: 'calc(100vh - 120px)', height: '500px' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-900/50 flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Bot className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Ask AI about Kaushal</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online • Powered by Gemini
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-white dark:bg-[#111111]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black rounded-tr-sm'
                  : 'bg-gray-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-sm border border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-sm border border-neutral-200 dark:border-neutral-700 flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-900/30">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my skills..."
              className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-1.5 bg-neutral-900 dark:bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// --- JSON-LD Schema ---
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kaushal Raj Gupta",
  "jobTitle": "Bachelor of Technology Student",
  "url": "https://kaushal-portfolio.com",
  "sameAs": [
    "https://github.com/kaushalrnc0",
    "https://linkedin.com/in/kaushal-raj-gupta"
  ],
  "knowsAbout": ["C++", "Python", "React.js", "Node.js", "Cyber Security", "Web Design"],
  "worksFor": {
    "@type": "Organization",
    "name": "Institute of Technical Education and Research (SOA)"
  }
};

// --- Page Components ---

export default function App() {
  const [timeGreeting, setTimeGreeting] = useState("");
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<typeof BLOG_POSTS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'blog'>('home');

  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme from localStorage on client side
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting("Good Morning");
    else if (hour < 18) setTimeGreeting("Good Afternoon");
    else setTimeGreeting("Good Evening");

    // Parallax scroll handler
    const handleScroll = () => {
      if (heroBgRef.current) {
        const scrolled = window.scrollY;
        // Move background at 40% speed of scroll for parallax effect
        heroBgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("kaushalrnc0@gmail.com");
    showNotification("Email copied to clipboard!");
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    showNotification("Downloading Resume...");

    // Create a virtual link to trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Kaushal_Raj_Gupta_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      showNotification("Resume Downloaded Successfully");
    }, 1500);
  };

  const navigateTo = (view: 'home' | 'projects' | 'blog') => {
    setCurrentView(view);
    setSearchQuery(""); // Reset search on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-200 selection:bg-neutral-200 dark:selection:bg-neutral-800 selection:text-black dark:selection:text-white font-sans overflow-x-hidden transition-colors duration-300">

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-25%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Toast message={toastMessage} visible={showToast} onClose={() => setShowToast(false)} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <BlogModal post={selectedBlogPost} onClose={() => setSelectedBlogPost(null)} />

      {/* Parallax Background Container */}
      <div className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden -z-10 pointer-events-none">
        <div
          ref={heroBgRef}
          className="absolute inset-0 w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-30 transition-opacity duration-300"
          aria-hidden="true"
        />
        {/* Gradient Overlay to fade into main background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/60 dark:via-[#0a0a0a]/60 to-gray-50 dark:to-[#0a0a0a] transition-colors duration-300"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <nav
          aria-label="Main Navigation"
          className="bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800/80 rounded-full px-6 py-3 flex items-center gap-6 shadow-xl dark:shadow-2xl transition-colors duration-300"
        >
          <button onClick={() => navigateTo('home')} className={`text-sm font-semibold transition-colors ${currentView === 'home' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}>Home</button>

          <button onClick={() => {
            // If we are on home page, scroll to section, otherwise navigate to project page
            if (currentView === 'home') {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigateTo('projects');
            }
          }} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Work</button>

          <button onClick={() => {
            if (currentView === 'home') {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigateTo('home');
              setTimeout(() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">About</button>

          <button onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Contact</button>

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-neutral-200 dark:border-neutral-800" role="status">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-neutral-500">{timeGreeting}</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 ml-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-32 pb-20 space-y-20 relative">

        {currentView === 'home' && (
          <div className="space-y-20 animate-fade-in-up">
            {/* Hero Section */}
            <section aria-label="Introduction" className="space-y-8 py-10 md:py-20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge>Available for hire</Badge>
                  <Badge>Based in India</Badge>
                </div>
                {/* Keyword Rich H1 */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                  Hello, I'm Kaushal. <br />
                  <span className="text-neutral-500 dark:text-neutral-500">Full Stack Developer.</span>
                </h1>
                <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  I build <strong>accessible</strong>, <strong>pixel-perfect</strong>, and <strong>scalable web apps</strong>.
                  Specializing in React, Next.js, and modern UI/UX architecture to turn ideas into digital reality.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-lg dark:shadow-none"
                  aria-label="Connect now"
                >
                  Connect now <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={copyEmail}
                  className="px-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
                  aria-label="Copy email address"
                >
                  {showToast && toastMessage.includes("copied") ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {showToast && toastMessage.includes("copied") ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </section>

            {/* Bento Grid: Socials & Status */}
            <section aria-label="Social Links" className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <Card className="md:col-span-1 flex flex-col justify-between min-h-[180px] bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-[#0a0a0a]">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <Globe className="w-5 h-5 text-neutral-500 dark:text-neutral-300" aria-hidden="true" />
                  </div>
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Open to Work</h3>
                  <p className="text-neutral-500 text-sm mt-1">Accepting new projects</p>
                </div>
              </Card>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SocialButton
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                  subLabel="@kaushalrnc0"
                  href="https://github.com/kaushalrnc0?tab=repositories"
                  ariaLabel="GitHub Profile"
                />
                <SocialButton
                  icon={<Twitter className="w-5 h-5" />}
                  label="Twitter/X"
                  subLabel="@alex_builds"
                  href="https://twitter.com"
                  ariaLabel="Twitter Profile"
                />
                <SocialButton
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                  subLabel="/in/kaushal-raj-gupta"
                  href="https://www.linkedin.com/in/kaushal-raj-gupta-b1799a256/"
                  ariaLabel="LinkedIn Profile"
                />
                <div className="p-4 bg-gray-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-neutral-950 rounded-lg text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors border border-neutral-200 dark:border-transparent">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Odisha, India</span>
                      <span className="text-xs text-neutral-500">Remote Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Selected Work (Limited) */}
            <section id="work" aria-label="Portfolio Projects" className="space-y-8 scroll-mt-32">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                  <Layers className="w-8 h-8 text-neutral-500" aria-hidden="true" /> Selected Work
                </h2>
                <button
                  onClick={() => navigateTo('projects')}
                  className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                  aria-label="View all projects"
                >
                  View all projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {PROJECTS.slice(0, 3).map((project, index) => (
                  <React.Fragment key={project.id}>
                    <FadeIn delay={index * 100}>
                      <Card
                        as="article"
                        className="group p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f0f0f] h-full"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex flex-col h-full">
                          {/* Image Area */}
                          <div className={`w-full h-56 md:h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`} role="img" aria-label={`Abstract representation of ${project.title} project`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="absolute inset-0 bg-white/0 dark:bg-black/0 dark:group-hover:bg-black/10 transition-colors duration-500"></div>
                            <Sparkles className="w-12 h-12 text-black/10 dark:text-white/20 group-hover:text-black/20 dark:group-hover:text-white/50 group-hover:scale-110 transition-all duration-500" aria-hidden="true" />
                          </div>

                          {/* Content Area */}
                          <div className="flex-1 p-6 flex flex-col gap-6">
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neutral-200 transition-colors">
                                  {project.title}
                                </h3>
                                <span className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900/50 px-2 py-1 rounded" aria-label={`Project timeline: ${project.quarter}`}>
                                  {project.quarter}
                                </span>
                              </div>
                              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                                {project.description}
                              </p>
                            </div>

                            <div className="flex flex-col gap-4 mt-auto">
                              <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                                {project.tags.map(tag => (
                                  <span key={tag} className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(project);
                                }}
                                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-white hover:underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-4 w-fit"
                                aria-label={`View case study for ${project.title}`}
                              >
                                View Case Study <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </FadeIn>
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* Skills / Marquee Section */}
            <section aria-label="Skills and Technologies" className="space-y-6">
              <FadeIn>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                  <Terminal className="w-8 h-8 text-neutral-500" aria-hidden="true" /> The Secret Sauce
                </h2>
              </FadeIn>

              <div className="space-y-4">
                <FadeIn delay={200}>
                  <Marquee items={SKILLS_ROW_1} />
                </FadeIn>
                <FadeIn delay={400}>
                  <Marquee items={SKILLS_ROW_2} reverse />
                </FadeIn>
              </div>
            </section>

            {/* Blog Section (Limited) */}
            <section aria-label="From the Blog" className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                  <Shield className="w-8 h-8 text-neutral-500" aria-hidden="true" /> Security Insights
                </h2>
                <button
                  onClick={() => navigateTo('blog')}
                  className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                  aria-label="Read all articles"
                >
                  Read all articles <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_POSTS.slice(0, 3).map((post, index) => (
                  <React.Fragment key={post.id}>
                    <FadeIn delay={index * 100}>
                      <Card
                        as="article"
                        className="flex flex-col justify-between h-full bg-gray-50 dark:bg-neutral-900/30 group hover:bg-white dark:hover:bg-neutral-900"
                        onClick={() => setSelectedBlogPost(post)}
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                          </div>

                          <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-6 mt-2 flex flex-col gap-4">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                              <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBlogPost(post);
                            }}
                            className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:gap-3 transition-all"
                          >
                            Read Article <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </Card>
                    </FadeIn>
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section id="about" aria-label="About and Experience" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 scroll-mt-32 items-start">
              {/* Left Column: Image */}
              <div className="relative w-full h-full min-h-[400px] md:min-h-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm group">
                <img
                  src="https://i.ibb.co/RkQjqyMZ/IMG-20250807-225109.jpg"
                  alt="Profile"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>

              {/* Right Column: Content */}
              <div className="flex flex-col gap-8">
                {/* About Me Text */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                    <Coffee className="w-8 h-8 text-neutral-500" aria-hidden="true" /> About Me
                  </h2>
                  <div className="prose prose-neutral dark:prose-invert text-neutral-600 dark:text-neutral-400">
                    <p>
                      I am a Bachelor of Technology student at the Institute of Technical Education and Research (SOA), Odisha, with a CGPA of 8.9.
                      I am passionate about <strong>Web Design and Development</strong> and <strong>Cyber Security</strong>.
                    </p>
                    <p>
                      My technical curiosity has led me to work on various projects including a neurodiverse support platform and automated bots.
                      I actively participate in hackathons and technical communities.
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Experience</h3>
                  <div className="space-y-4">
                    {EXPERIENCE.map(exp => (
                      <article key={exp.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-900/50 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-neutral-900 dark:text-white font-medium">{exp.role}</span>
                          <span className="text-sm text-neutral-500">{exp.company}</span>
                        </div>
                        <span className="text-sm font-mono text-neutral-600 dark:text-neutral-600 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Resume Button */}
                <div className="pt-2">
                  <button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Download Resume <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- ALL PROJECTS PAGE --- */}
        {currentView === 'projects' && (
          <div className="animate-fade-in-up space-y-8 min-h-[60vh]">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">All Projects</h1>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                A complete collection of my open source work, side projects, and experiments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project, index) => (
                <React.Fragment key={project.id}>
                  <FadeIn delay={index * 50}>
                    <Card
                      as="article"
                      className="group p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f0f0f] h-full"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex flex-col h-full">
                        <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                          <Sparkles className="w-12 h-12 text-black/10 dark:text-white/20" />
                        </div>

                        <div className="flex-1 p-6 flex flex-col gap-6">
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                                {project.title}
                              </h3>
                              <span className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900/50 px-2 py-1 rounded">
                                {project.quarter}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-gray-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-xs text-neutral-400 py-1">+ {project.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* --- ALL ARTICLES PAGE --- */}
        {currentView === 'blog' && (
          <div className="animate-fade-in-up space-y-8 min-h-[60vh]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>

              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-full leading-5 bg-white dark:bg-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors text-neutral-900 dark:text-white"
                  placeholder="Search articles by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Security Insights & Thoughts</h1>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                Deep dives into frontend security, performance architecture, and modern web patterns.
              </p>
            </div>

            {/* Filter Logic */}
            {(() => {
              const filteredPosts = BLOG_POSTS.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              if (filteredPosts.length === 0) {
                return (
                  <div className="py-20 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-gray-50 dark:bg-neutral-900 rounded-full mb-4">
                      <Search className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No articles found</h3>
                    <p className="text-neutral-500 mt-2">We couldn't find any articles matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <FadeIn delay={index * 50}>
                        <Card
                          as="article"
                          className="flex flex-col justify-between h-full bg-gray-50 dark:bg-neutral-900/30 group hover:bg-white dark:hover:bg-neutral-900"
                          onClick={() => setSelectedBlogPost(post)}
                        >
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                            </div>

                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-6 mt-2 flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBlogPost(post);
                              }}
                              className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white hover:gap-3 transition-all"
                            >
                              Read Article <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </Card>
                      </FadeIn>
                    </React.Fragment>
                  ))}
                </div>
              )
            })()}
          </div>
        )}

        {/* Footer */}
        <footer id="contact" className="pt-20 border-t border-neutral-200 dark:border-neutral-900 scroll-mt-32">
          <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 md:p-16 text-center border border-neutral-200 dark:border-neutral-800 relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
              Let's work together.
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-lg mx-auto">
              Have a project in mind? Let's build something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:hello@developer.com" className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-lg font-bold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                Send an email
              </a>
              <button onClick={copyEmail} className="px-8 py-4 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-lg font-medium rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                {showToast && toastMessage.includes("copied") ? "Copied!" : "Copy email address"}
              </button>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500 pb-8">
            <p>&copy; {new Date().getFullYear()} Alex Developer. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://twitter.com" rel="noopener noreferrer me" className="hover:text-black dark:hover:text-white transition-colors">Twitter</a>
              <a href="https://linkedin.com" rel="noopener noreferrer me" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com" rel="noopener noreferrer me" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </footer>

        <ChatWidget />

      </main>
    </div>
  );
}