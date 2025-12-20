
import React from 'react';

export const PROJECTS = [
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

export const SKILLS_ROW_1 = [
    "C/C++", "Python", "Java", "JavaScript", "React.js", "Node.js", "MongoDB", "System Design"
];

export const SKILLS_ROW_2 = [
    "Firebase", "MySQL", "HTML/CSS", "Git", "GitHub", "Data Structures", "OOPs", "Web Design"
];

export const BLOG_POSTS = [
    {
        id: 1,
        title: "Zero Trust Architecture: Beyond the Buzzword",
        date: "Mar 15, 2025",
        readTime: "5 min read",
        excerpt: "Why traditional perimeter-based security is failing and how identity-centric security models are shaping the future of enterprise infrastructure.",
        tags: ["Security", "Architecture"],
        content: (
            <>
            <p className= "lead text-lg mb-6" >
            For decades, the "castle-and-moat" security model dominated enterprise architecture.The premise was simple: build a strong perimeter firewall, verify users once at the gate, and then trust them implicitly once they're inside.
            </ p >
    <h4 id="perimeter-is-dead" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > The Perimeter is Dead </h4>
    < p className = "mb-4" >
    With the rise of cloud computing, remote work, and BYOD(Bring Your Own Device), the network perimeter has dissolved.Users are accessing resources from coffee shops, home networks, and mobile devices.The assumption that "inside equals safe" is no longer valid.
        </p>
    < p className = "mb-4" >
    Zero Trust Architecture(ZTA) flips this model on its head.It operates on a simple, yet profound principle: <strong>Never trust, always verify.</strong>
    </p>
    < h4 id = "core-pillars" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Core Pillars of Zero Trust </h4>
    < ul className = "list-disc pl-5 space-y-2 mb-6 marker:text-blue-500" >
    <li><strong>Identity: </strong> Verify the user's identity with strong MFA, not just a password. Context matters—is the login coming from an unusual location?</li >
    <li><strong>Device: </strong> Ensure the accessing device is compliant, patched, and healthy before allowing connection.</li >
    <li><strong>Network: </strong> Micro-segmentation prevents lateral movement. If an attacker breaches one server, they shouldn't have free reign over the entire network.</li >
    <li><strong>Data: </strong> Classify and encrypt data at rest and in transit. Access should be granted based on the sensitivity of the data and the user's need-to-know.</li >
    </ul>
    < div className = "bg-blue-50 dark:bg-blue-900/20 p-4 border-l-4 border-blue-500 rounded-r-lg mb-6" >
    <p className="text-sm text-blue-800 dark:text-blue-200 italic" >
    "Zero Trust isn't about buying a single product; it's a strategic shift in how we view access and risk across the entire organization."
    </p>
    </div>
    <p>
          Moving to Zero Trust is a journey, not a destination.It starts with visibility—knowing exactly what users, devices, and applications are on your network—and incrementally tightening policies to reduce the attack surface.
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
                                <p className= "lead text-lg mb-6" >
                                React's component-based architecture and Virtual DOM provide a significant security baseline by default, primarily by escaping values in JSX. However, "secure by default" doesn't mean "invulnerable."
                                    </p>

                                    < h4 id = "dangerously-set-inner-html" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > The Danger of`dangerouslySetInnerHTML` </h4>
                                        < p className = "mb-4" >
                                            As the name implies, <code>dangerouslySetInnerHTML </code> is React's method for handling raw HTML. It is the most common vector for Cross-Site Scripting (XSS) in React apps.
                                                </p>
                                                < pre className = "bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto text-sm mb-4 font-mono" >
                                                    {`// Vulnerable Code
<div dangerouslySetInnerHTML={{ __html: userProvidedString }} />

// Safer Approach: Sanitize first
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userProvidedString) }} />`}
</pre>
    < p className = "mb-4" >
        Always sanitize any HTML string coming from an external source(API, user input, CMS) before rendering it.Libraries like < strong > DOMPurify </strong> are essential.
            </p>

            < h4 id = "csp" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Content Security Policy(CSP) </h4>
                < p className = "mb-4" >
                    A robust CSP is your second line of defense.It restricts where scripts, styles, and images can be loaded from.For a Next.js application, you can configure headers in <code>next.config.js </code> or via middleware.
                        </p>
                        < p className = "mb-4" >
                            A strict CSP might look like this:
</p>
    < code className = "block bg-gray-100 dark:bg-neutral-900 p-3 rounded text-xs mb-6 text-neutral-600 dark:text-neutral-400 font-mono" >
          default -src 'self'; script - src 'self' https://analytics.example.com; style-src 'self' 'unsafe-inline';
</code>

    < h4 id = "auth-storage" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Authentication Storage </h4>
        < p className = "mb-4" >
            Where do you store your JWTs ?
                </p>
                < ul className = "list-disc pl-5 space-y-2 mb-6 marker:text-green-500" >
                    <li><strong>LocalStorage: </strong> Vulnerable to XSS. If an attacker runs JS on your page, they steal the token.</li >
                        <li><strong>HttpOnly Cookie: </strong> Immune to XSS (JS cannot read it), but vulnerable to CSRF (Cross-Site Request Forgery).</li >
                            </ul>
                            <p>
          The recommended approach for modern web apps is using < strong > HttpOnly, Secure, SameSite = Strict cookies </strong> to store session tokens, effectively mitigating both vectors when paired with anti-CSRF tokens for mutating actions.
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
                                <p className= "lead text-lg mb-6" >
                                Modern software development is like building with Lego blocks.We pull hundreds, sometimes thousands, of dependencies from registries like npm, PyPI, or Docker Hub.But what happens if one of those blocks is poisoned ?
                                    </p>

                                    < h4 id = "attack-surface" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > The Attack Surface </h4>
                                        < p className = "mb-4" >
                                            Supply chain attacks target the upstream components of your application.Instead of hacking your server directly, an attacker compromises a library you use(e.g., `event-stream` or`ua-parser-js`).When you run`npm install`, you invite the malware in.
        </p>

                                                < h4 id = "typosquatting" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Typosquatting & Dependency Confusion </h4>
                                                    < p className = "mb-4" >
                                                        Attackers often publish packages with names similar to popular internal libraries(e.g., `react-dom` vs`react-d0m`).If your internal registry isn't prioritized correctly, your build system might pull the public malicious package instead of your private one.
                                                            </p>

                                                            < h4 id = "defensive-strategies" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Defensive Strategies </h4>
                                                                < div className = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" >
                                                                    <div className="bg-gray-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800" >
                                                                        <h5 className="font-bold mb-2" > Lock Your Dependencies </h5>
                                                                            < p className = "text-sm text-neutral-600 dark:text-neutral-400" > Always commit `package-lock.json` or`yarn.lock`.This ensures every build uses the exact same version of every package.</p>
                                                                                </div>
                                                                                < div className = "bg-gray-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800" >
                                                                                    <h5 className="font-bold mb-2" > Automated Audits </h5>
                                                                                        < p className = "text-sm text-neutral-600 dark:text-neutral-400" > Integrate`npm audit` or tools like Snyk into your CI / CD pipeline to block builds with critical vulnerabilities.</p>
                                                                                            </div>
                                                                                            </div>

                                                                                            <p>
          Trust nothing.Verify everything.Even the code you didn't write is your responsibility once it's in your production bundle.
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
                    excerpt: "Understanding the paradigm shift in data fetching. How RSCs reduce bundle size and improve First Contentful Paint (FCP) in Next.js and React ecosystems.",
                        tags: ["React", "Performance"],
                            content: (
                                <>
                                <p className= "lead text-lg mb-6" >
                                React Server Components(RSC) represent the biggest shift in the React ecosystem since hooks.They allow us to render components exclusively on the server, sending zero JavaScript to the client.
        </p>
                                    < h4 id = "why-rsc" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Why RSC ? </h4>
                                        < p className = "mb-4" >
                                            Traditionally, we had to choose between Client - Side Rendering(CSR) and Server - Side Rendering(SSR).Both usually involved hydration, where the client re - runs the code to attach event listeners.RSCs allow you to keep heavy dependencies(like markdown parsers or date libraries) on the server.
        </p>
                                                < p className = "mb-4" >
                                                    This results in significantly smaller bundle sizes.You can fetch data directly from your database inside your component without exposing API secrets or needing`useEffect`.
        </p>
                                                        < pre className = "bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto text-sm mb-4 font-mono" >
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
          Embracing RSCs requires a mental model shift, but the performance gains for content - heavy applications are undeniable.
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
                                <p className= "lead text-lg mb-6" >
                                Core Web Vitals are no longer just "nice to have metrics." Google uses them as a direct ranking signal.If your LCP(Largest Contentful Paint) is slow, your SEO suffers.
        </p>
                                    < h4 id = "key-strategies" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Key Strategies </h4>
                                        < ul className = "list-disc pl-5 space-y-2 mb-6 marker:text-purple-500" >
                                            <li><strong>Images: </strong> Always use `width` and `height` attributes to prevent Cumulative Layout Shift (CLS). Use modern formats like AVIF or WebP.</li >
                                                <li><strong>Fonts: </strong> Use `font-display: swap` to ensure text is visible immediately. Self-host critical fonts to reduce DNS lookups.</li >
                                                    <li><strong>Third - party Scripts: </strong> Defer non-critical scripts (chat widgets, analytics) until after the main content has loaded using `requestIdleCallback` or the `defer` attribute.</li >
                                                        </ul>
                                                        <p>
    Remember, performance is a feature.A fast site converts better and ranks higher.
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
                                <p className= "lead text-lg mb-6" >
                                The Web Content Accessibility Guidelines(WCAG) should be your bible.But accessibility goes beyond checking boxes.It's about empathy.
                                    </p>
                                    < h4 id = "common-pitfalls" className = "text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-4" > Common Pitfalls </h4>
                                        < p className = "mb-4" >
                                            One common mistake is div - itis.Using a `div` with an`onClick` handler does not make it a button.It lacks keyboard focus, Enter key support, and screen reader announcements.
        </p>
                                                < pre className = "bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto text-sm mb-4 font-mono" >
                                                    {`/* Bad */
<div onClick={submit}>Submit</div>

/* Good */
<button onClick={submit} type="button">Submit</button>`}
</pre>
    < p className = "mb-4" >
        <strong>Semantic HTML </strong> is 80% of the battle. Use `nav`, `main`, `article`, and `aside`. Use `h1` through `h6` logically, not just for font sizing.
            </p>
            <p>
          When you build for accessibility, you often improve the experience for power users(keyboard navigation) and bots(SEO) as well.
    </p>
    </>
    ),
toc: [
    { id: "common-pitfalls", title: "Common Pitfalls", level: 1 }
]
  }
];

export const EXPERIENCE = [
    { id: 1, role: "Cyber Security Intern", company: "The Red Users", period: "Mar 2025 - May 2025" },
    { id: 2, role: "Contributor", company: "GirlScript Summer of Code", period: "Oct 2024 - Dec 2024" },
    { id: 3, role: "Senior Moderator", company: "Brainly", period: "Feb 2020 - Jan 2022" },
];
