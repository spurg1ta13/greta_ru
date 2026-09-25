export type BlogSection = { h: string; p?: string[]; list?: string[] };
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  readMinutes: number;
  tags: string[];
  summary: string;
  sections: BlogSection[];
  faq: { q: string; a: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-qa-testing-matters-before-and-after-launch",
    title: "Why QA Testing Matters Before and After Launch",
    description:
      "An ISTQB-certified QA specialist explains why software testing must happen both before release and after go-live — and what to test at each stage.",
    datePublished: "2026-09-25",
    readMinutes: 6,
    tags: ["QA", "Software Testing", "Release Readiness", "ISTQB"],
    summary:
      "Testing before launch stops defects from reaching users; testing after launch catches what only real traffic, devices and data reveal. Both are needed for a product that stays reliable.",
    sections: [
      {
        h: "The short answer",
        p: [
          "Quality assurance is not a single gate before release. Pre-launch testing reduces the risk of shipping broken features, while post-launch testing confirms the product keeps working under real users, real devices and constant change.",
          "The earlier a defect is found, the cheaper it is to fix. A bug caught during design review costs minutes; the same bug found by customers costs support time, refunds and trust.",
        ],
      },
      {
        h: "What to test before launch",
        list: [
          "Functional testing — every core user flow (sign-up, checkout, contact forms) works as specified.",
          "End-to-end (E2E) testing — complete journeys across frontend, backend and third-party services.",
          "Cross-browser and cross-device testing — Chrome, Safari, Firefox, iOS and Android at real screen sizes.",
          "Performance testing — page speed and Core Web Vitals, which affect both conversion and SEO.",
          "Accessibility checks — keyboard navigation, contrast and screen-reader labels.",
          "Security basics — input validation, authentication and data protection (GDPR).",
        ],
      },
      {
        h: "Why testing must continue after launch",
        p: [
          "Production is a different environment. Real users behave unpredictably, browsers update automatically, APIs change and new features interact with old ones. A product that passed every test on release day can break weeks later without a single line of your code changing.",
        ],
        list: [
          "Regression testing after every update so new features do not break existing ones.",
          "Smoke tests after each deployment to confirm critical paths are alive.",
          "Monitoring errors, logs and analytics to spot issues before users report them.",
          "Re-testing on new browser and OS versions.",
          "Collecting user feedback and turning it into test cases.",
        ],
      },
      {
        h: "The business impact",
        p: [
          "Users rarely report bugs — they simply leave. A broken form or slow page directly lowers conversion, search rankings and brand reputation. Continuous QA protects revenue by making sure the product people found yesterday still works today.",
        ],
      },
      {
        h: "A practical QA checklist",
        list: [
          "Define acceptance criteria before development starts.",
          "Test every critical flow on at least three browsers and two mobile devices.",
          "Automate regression tests for the flows that make money.",
          "Run a smoke test after every release.",
          "Review errors and user feedback weekly.",
        ],
      },
    ],
    faq: [
      {
        q: "Is QA testing needed after a website launches?",
        a: "Yes. Browser updates, new features, third-party API changes and real user behaviour can break a working product. Regression and smoke testing after launch keep it reliable.",
      },
      {
        q: "What is the difference between pre-launch and post-launch testing?",
        a: "Pre-launch testing verifies the product meets requirements before users see it. Post-launch testing monitors and re-verifies it in production as it changes over time.",
      },
      {
        q: "How often should regression testing run?",
        a: "After every deployment for critical flows, ideally automated, plus a broader regression pass before major releases.",
      },
    ],
  },
  {
    slug: "why-regular-penetration-testing-keeps-you-safe",
    title: "Why Regular Penetration Testing Keeps Your Product Safe",
    description:
      "What penetration testing is, why a one-time pentest is not enough, and how often to run security tests to keep your website and users safe.",
    datePublished: "2026-09-25",
    readMinutes: 6,
    tags: ["Penetration Testing", "Security Testing", "Cybersecurity", "GDPR"],
    summary:
      "A penetration test simulates a real attack to find vulnerabilities before criminals do. Because code, dependencies and threats change constantly, pentests should be repeated regularly — not run once.",
    sections: [
      {
        h: "What is penetration testing?",
        p: [
          "Penetration testing (pentesting) is an authorised, simulated attack on a website, application or network. The goal is to find security weaknesses — such as injection flaws, broken authentication or exposed data — and fix them before a real attacker exploits them.",
          "Unlike automated vulnerability scanning, a pentest combines tools with human thinking to chain small weaknesses into realistic attack paths.",
        ],
      },
      {
        h: "Why one pentest is not enough",
        list: [
          "Your code changes — every new feature can introduce a new vulnerability.",
          "Dependencies age — libraries you use get new publicly known vulnerabilities (CVEs).",
          "Configuration drifts — permissions, cloud settings and access rules change over time.",
          "Attack techniques evolve — methods that did not exist last year are used today.",
          "Compliance expects it — GDPR requires appropriate, regularly tested security measures.",
        ],
      },
      {
        h: "What a pentest typically checks",
        list: [
          "OWASP Top 10 risks such as injection, broken access control and misconfiguration.",
          "Authentication, session handling and password reset flows.",
          "Exposure of personal data, API keys and admin areas.",
          "Form abuse, spam and bot attacks.",
          "Server headers, TLS configuration and third-party scripts.",
        ],
      },
      {
        h: "How often should you run a pentest?",
        p: [
          "A common baseline is at least once a year, plus after any major release, infrastructure change or new integration handling user data. Between pentests, automated security scans and dependency checks should run continuously.",
        ],
      },
      {
        h: "Security is part of QA",
        p: [
          "Security testing belongs in the same quality process as functional testing. Treating it as a regular, planned activity — not an emergency reaction — protects your users, your data and your reputation, and is far cheaper than recovering from a breach.",
        ],
      },
    ],
    faq: [
      {
        q: "How often should a website be penetration tested?",
        a: "At least once a year and after major releases, infrastructure changes or new integrations that handle user data, with automated scans running in between.",
      },
      {
        q: "What is the difference between a vulnerability scan and a pentest?",
        a: "A vulnerability scan is automated and lists known issues. A penetration test adds human expertise to exploit and chain weaknesses the way a real attacker would.",
      },
      {
        q: "Do small businesses need penetration testing?",
        a: "Yes. Small sites are frequent targets of automated attacks, and any site collecting personal data has GDPR security obligations.",
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
