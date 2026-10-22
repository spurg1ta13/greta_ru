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
  {
    slug: "gdpr-in-greece-what-it-means",
    title: "GDPR in Greece: What It Means and How It Is Enforced",
    description:
      "How the General Data Protection Regulation applies in Greece — the Hellenic Data Protection Authority, law 4624/2019, fines, user rights and what organisations must do.",
    datePublished: "2026-10-22",
    readMinutes: 6,
    tags: ["GDPR", "Data Protection", "Greece", "HDPA", "Compliance"],
    summary:
      "GDPR has applied directly in Greece since May 2018, enforced by the Hellenic Data Protection Authority under Greek law 4624/2019. It gives people rights over their data and obliges organisations to protect it — with real fines for those that do not comply.",
    sections: [
      {
        h: "The short answer",
        p: [
          "The General Data Protection Regulation (EU) 2016/679 has applied directly in Greece since 25 May 2018. Greek law 4624/2019 adapted national rules to it and re-established the supervisory authority, the Hellenic Data Protection Authority (HDPA). If you process personal data of people in Greece — a name, an email, an IP address, cookie identifiers — GDPR applies to you, no matter where your business is based or how small it is.",
        ],
      },
      {
        h: "Who enforces GDPR in Greece",
        p: [
          "The Hellenic Data Protection Authority (Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα) is the independent supervisory authority. It investigates complaints, carries out inspections, issues guidance and imposes fines. Anyone can file a complaint with the HDPA — online, free of charge — and the authority publishes its decisions and guidance so organisations can see in practice what compliance looks like.",
        ],
      },
      {
        h: "Your rights under GDPR",
        p: [
          "GDPR gives individuals concrete rights over their personal data. Organisations must respond to these requests within one month.",
        ],
        list: [
          "Access — a copy of the personal data held about them.",
          "Rectification — correction of inaccurate or incomplete data.",
          "Erasure — the \"right to be forgotten\" when there is no good reason to keep the data.",
          "Restriction — limiting how data is used while a dispute is resolved.",
          "Data portability — receiving data in a portable, machine-readable format.",
          "Objection — objecting to processing, including for direct marketing.",
          "Withdrawal of consent — withdrawing consent at any time, as easily as it was given.",
        ],
      },
      {
        h: "What organisations must do",
        list: [
          "Identify a lawful basis for every processing activity — consent, contract, legal obligation, legitimate interest.",
          "Provide clear, specific privacy information before collecting data.",
          "Apply data protection by design and by default.",
          "Implement appropriate security measures for the data they hold.",
          "Keep records of processing activities (Article 30).",
          "Sign data processing agreements with all processors (Article 28).",
          "Appoint a Data Protection Officer where required — public bodies must appoint one under Greek law.",
          "Notify the HDPA of a personal data breach within 72 hours.",
        ],
      },
      {
        h: "Fines and enforcement",
        p: [
          "GDPR fines reach up to €20 million or 4% of an organisation's total worldwide annual turnover, whichever is higher. The HDPA enforces actively: in 2022 it audited 30 Greek news websites and found that many cookie banners lacked a proper reject option or visually pushed users towards accepting — a breach of the rules on electronic communications.",
        ],
      },
      {
        h: "What this means in practice",
        p: [
          "Even a simple website with a contact form and analytics collects personal data, so GDPR compliance is a baseline for doing business online in Greece — not an optional extra. The next article walks through the concrete requirements for websites.",
        ],
      },
    ],
    faq: [
      {
        q: "Does GDPR apply to small businesses in Greece?",
        a: "Yes. GDPR applies to any organisation processing personal data of people in the EU, regardless of size. Small sites with contact forms, newsletters or analytics are covered.",
      },
      {
        q: "Who is the data protection authority in Greece?",
        a: "The Hellenic Data Protection Authority (HDPA), an independent authority whose framework was established by Greek law 4624/2019.",
      },
      {
        q: "How large are GDPR fines?",
        a: "Up to €20 million or 4% of total worldwide annual turnover, whichever is higher, plus possible restrictions on processing.",
      },
      {
        q: "How do I file a GDPR complaint in Greece?",
        a: "Complaints can be submitted to the HDPA free of charge through its online complaint form; you can also contact the organisation directly first.",
      },
    ],
  },
  {
    slug: "gdpr-requirements-websites-greece",
    title: "GDPR Requirements for Websites in Greece: A Practical Checklist",
    description:
      "The concrete GDPR duties for websites in Greece — privacy policy, cookie consent rules from the Hellenic Data Protection Authority, data subject rights, security and breach notification.",
    datePublished: "2026-10-22",
    readMinutes: 7,
    tags: ["GDPR", "Cookie Consent", "Website Compliance", "Privacy Policy", "Greece"],
    summary:
      "Any website that collects personal data — a contact form, analytics, cookies — must follow GDPR. In Greece, the HDPA's Recommendations 1/2020 add specific cookie rules: no cookie walls, an equally prominent Reject button, and no pre-ticked consent boxes.",
    sections: [
      {
        h: "Does GDPR apply to your website?",
        p: [
          "If your website processes personal data of visitors — a contact form, newsletter sign-up, analytics, cookies or comment fields — GDPR applies. That is true for a one-person business as much as for a large company, and for websites hosted outside the EU that serve visitors in Greece.",
        ],
      },
      {
        h: "A privacy policy that actually informs",
        p: [
          "Your privacy policy must state what personal data you collect, why, on what legal basis, how long you keep it, who it is shared with, and how visitors can exercise their rights. It must be easy to find — linked from every page — and specific, not a generic block buried in the terms of use. The HDPA has stressed that a general mention in the terms of service, or a long policy covering unrelated topics, is not enough information for cookie consent.",
        ],
      },
      {
        h: "Cookie consent: the HDPA's specific rules",
        p: [
          "Beyond GDPR, Greece applies national rules on electronic communications (law 3471/2006). The HDPA's Recommendations 1/2020 set out what a compliant cookie banner looks like:",
        ],
        list: [
          "Prior consent for all non-essential cookies — analytics, statistics and marketing cookies need explicit, active consent.",
          "No cookie walls — visitors must be able to continue using the site without accepting non-essential cookies.",
          "Accept and Reject equally easy — the same number of clicks, from the same layer, with buttons of the same size, emphasis and colour.",
          "No pre-ticked boxes — consent must come from a clear, affirmative action.",
          "Informed consent — continuing to browse after a notice is not consent; explain the specific purpose of each cookie.",
          "Easy withdrawal — users must be able to change their mind as easily as they consented.",
        ],
      },
      {
        h: "The data protection essentials",
        list: [
          "A lawful basis for every processing activity.",
          "Security: HTTPS everywhere, access control, hashed passwords, regular backups, updated software.",
          "Records of processing activities kept up to date (Article 30).",
          "Written data processing agreements with hosting, email and analytics providers (Article 28).",
          "A Data Protection Officer where required — public bodies must appoint one under Greek law.",
          "A Data Protection Impact Assessment for high-risk processing.",
          "Breach notification within 72 hours to the HDPA, and to affected individuals when the risk is high.",
        ],
      },
      {
        h: "Honouring user rights",
        p: [
          "Visitors have the right to access their data, correct it, delete it, receive it in a portable format and object to processing. Provide a clear contact channel — your privacy policy should name an email address — and respond within one month.",
        ],
      },
      {
        h: "A website GDPR checklist",
        list: [
          "Privacy policy published and linked from every page.",
          "Cookie banner with prior consent, equally prominent Accept and Reject, no pre-ticked boxes, no cookie wall.",
          "Consent recorded and easy to withdraw.",
          "HTTPS enabled everywhere.",
          "Data processing agreements in place with all service providers.",
          "Records of processing activities kept up to date.",
          "A named contact for data subject requests, answered within one month.",
          "A breach response procedure with 72-hour notification to the HDPA.",
        ],
      },
      {
        h: "GDPR is part of QA",
        p: [
          "GDPR compliance is not a one-time project. Every new feature, form or integration that touches personal data needs review, consent flows need testing, and security needs regular verification. Treating privacy and security as part of your quality process — the same way you test functionality — keeps your site compliant and your visitors' data safe.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a cookie banner if my site only uses essential cookies?",
        a: "No. Cookies strictly necessary for the service (such as session cookies) do not require consent, but you must still inform visitors about them. All non-essential cookies need prior consent.",
      },
      {
        q: "Is a cookie wall allowed in Greece?",
        a: "No. The HDPA's guidance prohibits cookie walls: visitors must be able to use the site without accepting non-essential cookies.",
      },
      {
        q: "Does my Greek website need a Data Protection Officer?",
        a: "Not always. Public bodies must appoint one under Greek law 4624/2019, as must organisations whose core activities involve large-scale monitoring or special-category data.",
      },
      {
        q: "How fast must I report a data breach in Greece?",
        a: "Within 72 hours of becoming aware of the breach, to the Hellenic Data Protection Authority, and to affected individuals without undue delay when the risk is high.",
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

type Localized = Pick<BlogPost, "title" | "description" | "summary" | "sections" | "faq">;

const el: Record<string, Localized> = {
  "why-qa-testing-matters-before-and-after-launch": {
    title: "Γιατί ο έλεγχος ποιότητας (QA) είναι σημαντικός πριν και μετά την κυκλοφορία",
    description:
      "Μια πιστοποιημένη κατά ISTQB ειδικός QA εξηγεί γιατί ο έλεγχος λογισμικού πρέπει να γίνεται τόσο πριν όσο και μετά την κυκλοφορία — και τι να ελέγχετε σε κάθε στάδιο.",
    summary:
      "Ο έλεγχος πριν την κυκλοφορία εμποδίζει τα σφάλματα να φτάσουν στους χρήστες· ο έλεγχος μετά την κυκλοφορία εντοπίζει ό,τι αποκαλύπτουν μόνο η πραγματική κίνηση, οι συσκευές και τα δεδομένα. Και τα δύο χρειάζονται για ένα αξιόπιστο προϊόν.",
    sections: [
      {
        h: "Η σύντομη απάντηση",
        p: [
          "Η διασφάλιση ποιότητας δεν είναι ένας μόνο έλεγχος πριν την κυκλοφορία. Ο έλεγχος πριν το λανσάρισμα μειώνει τον κίνδυνο να κυκλοφορήσουν χαλασμένες λειτουργίες, ενώ ο έλεγχος μετά επιβεβαιώνει ότι το προϊόν συνεχίζει να λειτουργεί με πραγματικούς χρήστες, πραγματικές συσκευές και συνεχείς αλλαγές.",
          "Όσο νωρίτερα εντοπιστεί ένα σφάλμα, τόσο φθηνότερη είναι η διόρθωσή του. Ένα σφάλμα που βρίσκεται στον σχεδιασμό κοστίζει λεπτά· το ίδιο σφάλμα που βρίσκουν οι πελάτες κοστίζει χρόνο υποστήριξης, επιστροφές χρημάτων και εμπιστοσύνη.",
        ],
      },
      {
        h: "Τι να ελέγξετε πριν την κυκλοφορία",
        list: [
          "Λειτουργικός έλεγχος — κάθε βασική ροή χρήστη (εγγραφή, αγορά, φόρμες επικοινωνίας) λειτουργεί όπως ορίζεται.",
          "Έλεγχος από άκρο σε άκρο (E2E) — ολοκληρωμένες διαδρομές μέσα από frontend, backend και υπηρεσίες τρίτων.",
          "Έλεγχος σε διαφορετικούς φυλλομετρητές και συσκευές — Chrome, Safari, Firefox, iOS και Android σε πραγματικά μεγέθη οθόνης.",
          "Έλεγχος απόδοσης — ταχύτητα σελίδας και Core Web Vitals, που επηρεάζουν τόσο τις μετατροπές όσο και το SEO.",
          "Έλεγχοι προσβασιμότητας — πλοήγηση με πληκτρολόγιο, αντίθεση χρωμάτων και ετικέτες για αναγνώστες οθόνης.",
          "Βασική ασφάλεια — έλεγχος δεδομένων εισόδου, αυθεντικοποίηση και προστασία δεδομένων (GDPR).",
        ],
      },
      {
        h: "Γιατί ο έλεγχος πρέπει να συνεχίζεται μετά την κυκλοφορία",
        p: [
          "Το περιβάλλον παραγωγής είναι διαφορετικό. Οι πραγματικοί χρήστες συμπεριφέρονται απρόβλεπτα, οι φυλλομετρητές ενημερώνονται αυτόματα, τα API αλλάζουν και οι νέες λειτουργίες αλληλεπιδρούν με τις παλιές. Ένα προϊόν που πέρασε κάθε έλεγχο την ημέρα κυκλοφορίας μπορεί να χαλάσει εβδομάδες αργότερα χωρίς να αλλάξει ούτε μία γραμμή του κώδικά σας.",
        ],
        list: [
          "Έλεγχος παλινδρόμησης (regression) μετά από κάθε ενημέρωση, ώστε οι νέες λειτουργίες να μη χαλούν τις υπάρχουσες.",
          "Smoke tests μετά από κάθε ανάπτυξη, για να επιβεβαιωθεί ότι οι κρίσιμες ροές λειτουργούν.",
          "Παρακολούθηση σφαλμάτων, αρχείων καταγραφής και αναλυτικών στοιχείων για εντοπισμό προβλημάτων πριν τα αναφέρουν οι χρήστες.",
          "Επανέλεγχος σε νέες εκδόσεις φυλλομετρητών και λειτουργικών συστημάτων.",
          "Συλλογή σχολίων χρηστών και μετατροπή τους σε σενάρια ελέγχου.",
        ],
      },
      {
        h: "Ο αντίκτυπος στην επιχείρηση",
        p: [
          "Οι χρήστες σπάνια αναφέρουν σφάλματα — απλώς φεύγουν. Μια χαλασμένη φόρμα ή μια αργή σελίδα μειώνει άμεσα τις μετατροπές, την κατάταξη στις μηχανές αναζήτησης και τη φήμη της επωνυμίας. Ο συνεχής έλεγχος ποιότητας προστατεύει τα έσοδα, διασφαλίζοντας ότι το προϊόν που βρήκαν οι χρήστες χθες λειτουργεί και σήμερα.",
        ],
      },
      {
        h: "Μια πρακτική λίστα ελέγχου QA",
        list: [
          "Ορίστε κριτήρια αποδοχής πριν ξεκινήσει η ανάπτυξη.",
          "Ελέγξτε κάθε κρίσιμη ροή σε τουλάχιστον τρεις φυλλομετρητές και δύο κινητές συσκευές.",
          "Αυτοματοποιήστε τους ελέγχους παλινδρόμησης για τις ροές που φέρνουν έσοδα.",
          "Εκτελέστε smoke test μετά από κάθε κυκλοφορία.",
          "Εξετάζετε σφάλματα και σχόλια χρηστών κάθε εβδομάδα.",
        ],
      },
    ],
    faq: [
      {
        q: "Χρειάζεται έλεγχος QA αφού κυκλοφορήσει μια ιστοσελίδα;",
        a: "Ναι. Οι ενημερώσεις φυλλομετρητών, οι νέες λειτουργίες, οι αλλαγές σε API τρίτων και η πραγματική συμπεριφορά των χρηστών μπορούν να χαλάσουν ένα προϊόν που λειτουργεί. Οι έλεγχοι παλινδρόμησης και τα smoke tests μετά την κυκλοφορία το κρατούν αξιόπιστο.",
      },
      {
        q: "Ποια είναι η διαφορά ανάμεσα στον έλεγχο πριν και μετά την κυκλοφορία;",
        a: "Ο έλεγχος πριν την κυκλοφορία επιβεβαιώνει ότι το προϊόν πληροί τις απαιτήσεις πριν το δουν οι χρήστες. Ο έλεγχος μετά την κυκλοφορία το παρακολουθεί και το επανελέγχει στην παραγωγή καθώς αλλάζει με τον χρόνο.",
      },
      {
        q: "Πόσο συχνά πρέπει να γίνεται έλεγχος παλινδρόμησης;",
        a: "Μετά από κάθε ανάπτυξη για τις κρίσιμες ροές, ιδανικά αυτοματοποιημένα, και ένας ευρύτερος έλεγχος πριν από μεγάλες κυκλοφορίες.",
      },
    ],
  },
  "why-regular-penetration-testing-keeps-you-safe": {
    title: "Γιατί οι τακτικές δοκιμές διείσδυσης κρατούν το προϊόν σας ασφαλές",
    description:
      "Τι είναι οι δοκιμές διείσδυσης (pentesting), γιατί μία μόνο δοκιμή δεν αρκεί και πόσο συχνά να ελέγχετε την ασφάλεια της ιστοσελίδας και των χρηστών σας.",
    summary:
      "Μια δοκιμή διείσδυσης προσομοιώνει μια πραγματική επίθεση για να εντοπίσει ευπάθειες πριν τις βρουν οι επιτιθέμενοι. Επειδή ο κώδικας, οι εξαρτήσεις και οι απειλές αλλάζουν συνεχώς, οι δοκιμές πρέπει να επαναλαμβάνονται τακτικά — όχι μία φορά.",
    sections: [
      {
        h: "Τι είναι η δοκιμή διείσδυσης;",
        p: [
          "Η δοκιμή διείσδυσης (pentesting) είναι μια εξουσιοδοτημένη, προσομοιωμένη επίθεση σε ιστοσελίδα, εφαρμογή ή δίκτυο. Στόχος είναι να εντοπιστούν αδυναμίες ασφαλείας — όπως σφάλματα έγχυσης κώδικα (injection), ελαττωματική αυθεντικοποίηση ή εκτεθειμένα δεδομένα — και να διορθωθούν πριν τις εκμεταλλευτεί πραγματικός επιτιθέμενος.",
          "Σε αντίθεση με την αυτοματοποιημένη σάρωση ευπαθειών, μια δοκιμή διείσδυσης συνδυάζει εργαλεία με ανθρώπινη σκέψη, ώστε μικρές αδυναμίες να συνδεθούν σε ρεαλιστικά σενάρια επίθεσης.",
        ],
      },
      {
        h: "Γιατί μία δοκιμή δεν αρκεί",
        list: [
          "Ο κώδικάς σας αλλάζει — κάθε νέα λειτουργία μπορεί να εισάγει νέα ευπάθεια.",
          "Οι εξαρτήσεις παλιώνουν — στις βιβλιοθήκες που χρησιμοποιείτε δημοσιεύονται νέες γνωστές ευπάθειες (CVE).",
          "Οι ρυθμίσεις αλλάζουν — δικαιώματα, ρυθμίσεις cloud και κανόνες πρόσβασης μεταβάλλονται με τον χρόνο.",
          "Οι τεχνικές επίθεσης εξελίσσονται — μέθοδοι που δεν υπήρχαν πέρυσι χρησιμοποιούνται σήμερα.",
          "Η συμμόρφωση το απαιτεί — ο GDPR απαιτεί κατάλληλα μέτρα ασφαλείας που ελέγχονται τακτικά.",
        ],
      },
      {
        h: "Τι ελέγχει συνήθως μια δοκιμή διείσδυσης",
        list: [
          "Κινδύνους του OWASP Top 10, όπως injection, ελαττωματικό έλεγχο πρόσβασης και λανθασμένες ρυθμίσεις.",
          "Αυθεντικοποίηση, διαχείριση συνεδριών και ροές επαναφοράς κωδικού.",
          "Έκθεση προσωπικών δεδομένων, κλειδιών API και περιοχών διαχείρισης.",
          "Κατάχρηση φορμών, spam και επιθέσεις από bots.",
          "Κεφαλίδες διακομιστή, ρυθμίσεις TLS και scripts τρίτων.",
        ],
      },
      {
        h: "Πόσο συχνά πρέπει να γίνεται δοκιμή διείσδυσης;",
        p: [
          "Μια συνήθης βάση είναι τουλάχιστον μία φορά τον χρόνο, καθώς και μετά από κάθε μεγάλη κυκλοφορία, αλλαγή υποδομής ή νέα ενσωμάτωση που διαχειρίζεται δεδομένα χρηστών. Ανάμεσα στις δοκιμές, αυτοματοποιημένες σαρώσεις ασφαλείας και έλεγχοι εξαρτήσεων πρέπει να εκτελούνται συνεχώς.",
        ],
      },
      {
        h: "Η ασφάλεια είναι μέρος του QA",
        p: [
          "Ο έλεγχος ασφαλείας ανήκει στην ίδια διαδικασία ποιότητας με τον λειτουργικό έλεγχο. Όταν αντιμετωπίζεται ως τακτική, προγραμματισμένη δραστηριότητα — και όχι ως αντίδραση σε έκτακτη ανάγκη — προστατεύει τους χρήστες, τα δεδομένα και τη φήμη σας, και κοστίζει πολύ λιγότερο από την αποκατάσταση μετά από παραβίαση.",
        ],
      },
    ],
    faq: [
      {
        q: "Πόσο συχνά πρέπει να γίνεται δοκιμή διείσδυσης σε μια ιστοσελίδα;",
        a: "Τουλάχιστον μία φορά τον χρόνο και μετά από μεγάλες κυκλοφορίες, αλλαγές υποδομής ή νέες ενσωματώσεις που διαχειρίζονται δεδομένα χρηστών, με αυτοματοποιημένες σαρώσεις στο ενδιάμεσο.",
      },
      {
        q: "Ποια είναι η διαφορά ανάμεσα σε σάρωση ευπαθειών και δοκιμή διείσδυσης;",
        a: "Η σάρωση ευπαθειών είναι αυτοματοποιημένη και καταγράφει γνωστά προβλήματα. Η δοκιμή διείσδυσης προσθέτει ανθρώπινη εμπειρογνωμοσύνη για να εκμεταλλευτεί και να συνδυάσει αδυναμίες όπως θα έκανε ένας πραγματικός επιτιθέμενος.",
      },
      {
        q: "Χρειάζονται οι μικρές επιχειρήσεις δοκιμές διείσδυσης;",
        a: "Ναι. Οι μικρές ιστοσελίδες είναι συχνοί στόχοι αυτοματοποιημένων επιθέσεων, και κάθε ιστοσελίδα που συλλέγει προσωπικά δεδομένα έχει υποχρεώσεις ασφαλείας βάσει του GDPR.",
      },
    ],
  },
  "gdpr-in-greece-what-it-means": {
    title: "GDPR στην Ελλάδα: Τι σημαίνει και πώς εφαρμόζεται",
    description:
      "Πώς εφαρμόζεται ο Γενικός Κανονισμός Προστασίας Δεδομένων στην Ελλάδα — η Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα, ο νόμος 4624/2019, τα πρόστιμα, τα δικαιώματα των χρηστών και οι υποχρεώσεις των οργανισμών.",
    summary:
      "Ο GDPR εφαρμόζεται άμεσα στην Ελλάδα από τις 25 Μαΐου 2018, με εποπτική αρχή την Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα και εθνικό νόμο 4624/2019. Δίνει στους ανθρώπους δικαιώματα επί των δεδομένων τους και υποχρεώνει τους οργανισμούς να τα προστατεύουν — με πραγματικά πρόστιμα για όσους δεν συμμορφώνονται.",
    sections: [
      {
        h: "Η σύντομη απάντηση",
        p: [
          "Ο Γενικός Κανονισμός Προστασίας Δεδομένων (ΕΕ) 2016/679 εφαρμόζεται άμεσα στην Ελλάδα από τις 25 Μαΐου 2018. Ο ελληνικός νόμος 4624/2019 προσάρμοσε τους εθνικούς κανόνες σε αυτόν και επανασύστησε την εποπτική αρχή, την Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα. Αν επεξεργάζεστε προσωπικά δεδομένα ανθρώπων στην Ελλάδα — ένα όνομα, ένα email, μια διεύθυνση IP, αναγνωριστικά cookies — ο GDPR εφαρμόζεται σε εσάς, ανεξάρτητα από τον τόπο έδρας της επιχείρησης ή το μέγεθός της.",
        ],
      },
      {
        h: "Ποιος εποπτεύει τον GDPR στην Ελλάδα",
        p: [
          "Η Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα είναι η ανεξάρτητη εποπτική αρχή. Διερευνά καταγγελίες, διενεργεί ελέγχους, εκδίδει κατευθυντήριες οδηγίες και επιβάλλει πρόστιμα. Ο καθένας μπορεί να υποβάλει καταγγελία στην Αρχή — ηλεκτρονικά και δωρεάν — ενώ η Αρχή δημοσιεύει τις αποφάσεις και τις οδηγίες της, ώστε οι οργανισμοί να βλέπουν έμπρακτα τι σημαίνει συμμόρφωση.",
        ],
      },
      {
        h: "Τα δικαιώματά σας βάσει του GDPR",
        p: [
          "Ο GDPR δίνει στα άτομα συγκεκριμένα δικαιώματα επί των προσωπικών τους δεδομένων. Οι οργανισμοί οφείλουν να απαντούν σε αυτά τα αιτήματα εντός ενός μηνός.",
        ],
        list: [
          "Πρόσβαση — αντίγραφο των προσωπικών δεδομένων που τηρούνται γι' αυτούς.",
          "Διόρθωση — αποκατάσταση ανακριβών ή ελλιπών δεδομένων.",
          "Διαγραφή — το «δικαίωμα στη λήθη» όταν δεν υπάρχει βάσιμος λόγος διατήρησης των δεδομένων.",
          "Περιορισμός — περιορισμός της χρήσης των δεδομένων όσο εκκρεμεί μια διαφορά.",
          "Φορητότητα δεδομένων — λήψη των δεδομένων σε φορητή, αναγνώσιμη από μηχανή μορφή.",
          "Εναντίωση — αντίρρηση στην επεξεργασία, συμπεριλαμβανομένης της άμεσης προώθησης.",
          "Ανάκληση συγκατάθεσης — ανάκληση ανά πάσα στιγμή, το ίδιο εύκολα όπως δόθηκε.",
        ],
      },
      {
        h: "Τι οφείλουν να κάνουν οι οργανισμοί",
        list: [
          "Προσδιορισμός νόμιμης βάσης για κάθε επεξεργασία — συγκατάθεση, σύμβαση, νομική υποχρέωση, έννομο συμφέρον.",
          "Σαφής, συγκεκριμένη ενημέρωση για την ιδιωτικότητα πριν από τη συλλογή δεδομένων.",
          "Προστασία δεδομένων εκ σχεδιασμού και εξ ορισμού.",
          "Κατάλληλα μέτρα ασφαλείας για τα δεδομένα που τηρούνται.",
          "Τήρηση αρχείου δραστηριοτήτων επεξεργασίας (άρθρο 30).",
          "Υπογραφή συμβάσεων επεξεργασίας με όλους τους εκτελούντες την επεξεργασία (άρθρο 28).",
          "Διορισμός Υπευθύνου Προστασίας Δεδομένων όπου απαιτείται — οι δημόσιοι φορείς οφείλουν να διορίζουν έναν κατά τον ελληνικό νόμο.",
          "Γνωστοποίηση παραβίασης προσωπικών δεδομένων στην Αρχή εντός 72 ωρών.",
        ],
      },
      {
        h: "Πρόστιμα και εφαρμογή",
        p: [
          "Τα πρόστιμα του GDPR φτάνουν τα 20 εκατομμύρια ευρώ ή το 4% του συνολικού ετήσιου κύκλου εργασιών παγκοσμίως, όποιο είναι μεγαλύτερο. Η Αρχή εφαρμόζει ενεργά: το 2022 έλεγξε 30 ελληνικές ειδησεογραφικές ιστοσελίδες και διαπίστωσε ότι πολλές δεν είχαν ουσιαστική επιλογή απόρριψης στα cookies ή προωθούσαν οπτικά την αποδοχή — παράβαση των κανόνων για τις ηλεκτρονικές επικοινωνίες.",
        ],
      },
      {
        h: "Τι σημαίνει αυτό στην πράξη",
        p: [
          "Ακόμα και μια απλή ιστοσελίδα με φόρμα επικοινωνίας και αναλυτικά στοιχεία συλλέγει προσωπικά δεδομένα, οπότε η συμμόρφωση με τον GDPR είναι βασική προϋπόθεση για επιχειρηματική δραστηριότητα στο διαδίκτυο στην Ελλάδα — όχι προαιρετική. Το επόμενο άρθρο περιγράφει τις συγκεκριμένες απαιτήσεις για ιστοσελίδες.",
        ],
      },
    ],
    faq: [
      {
        q: "Εφαρμόζεται ο GDPR στις μικρές επιχειρήσεις στην Ελλάδα;",
        a: "Ναι. Ο GDPR εφαρμόζεται σε κάθε οργανισμό που επεξεργάζεται προσωπικά δεδομένα ανθρώπων στην ΕΕ, ανεξαρτήτως μεγέθους. Μικρές ιστοσελίδες με φόρμες επικοινωνίας, newsletters ή αναλυτικά στοιχεία καλύπτονται.",
      },
      {
        q: "Ποια είναι η αρχή προστασίας δεδομένων στην Ελλάδα;",
        a: "Η Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα, ανεξάρτητη αρχή το πλαίσιο της οποίας θεσπίστηκε με τον ελληνικό νόμο 4624/2019.",
      },
      {
        q: "Πόσο μεγάλα είναι τα πρόστιμα του GDPR;",
        a: "Έως 20 εκατομμύρια ευρώ ή 4% του συνολικού παγκόσμιου ετήσιου κύκλου εργασιών, όποιο είναι μεγαλύτερο, καθώς και πιθανοί περιορισμοί στην επεξεργασία.",
      },
      {
        q: "Πώς υποβάλλω καταγγελία GDPR στην Ελλάδα;",
        a: "Οι καταγγελίες υποβάλλονται δωρεάν στην Αρχή μέσω της ηλεκτρονικής φόρμας της· μπορείτε επίσης να απευθυνθείτε πρώτα απευθείας στον οργανισμό.",
      },
    ],
  },
  "gdpr-requirements-websites-greece": {
    title: "Απαιτήσεις GDPR για ιστοσελίδες στην Ελλάδα: Πρακτική λίστα συμμόρφωσης",
    description:
      "Οι συγκεκριμένες υποχρεώσεις GDPR για ιστοσελίδες στην Ελλάδα — πολιτική απορρήτου, κανόνες συγκατάθεσης cookies από την Αρχή Προστασίας Δεδομένων, δικαιώματα χρηστών, ασφάλεια και γνωστοποίηση παραβιάσεων.",
    summary:
      "Κάθε ιστοσελίδα που συλλέγει προσωπικά δεδομένα — φόρμα επικοινωνίας, αναλυτικά στοιχεία, cookies — οφείλει να συμμορφώνεται με τον GDPR. Στην Ελλάδα, οι Συστάσεις 1/2020 της Αρχής Προστασίας Δεδομένων προσθέτουν ειδικούς κανόνες: όχι cookie walls, εξίσου εμφανές κουμπί «Απόρριψη» και κανένα προεπιλεγμένο κουτί συγκατάθεσης.",
    sections: [
      {
        h: "Εφαρμόζεται ο GDPR στην ιστοσελίδα σας;",
        p: [
          "Αν η ιστοσελίδα σας επεξεργάζεται προσωπικά δεδομένα επισκεπτών — φόρμα επικοινωνίας, εγγραφή σε newsletter, αναλυτικά στοιχεία, cookies ή πεδία σχολίων — ο GDPR εφαρμόζεται. Αυτό ισχύει για μια επιχείρηση ενός ατόμου όσο και για μια μεγάλη εταιρεία, καθώς και για ιστοσελίδες που φιλοξενούνται εκτός ΕΕ και εξυπηρετούν επισκέπτες στην Ελλάδα.",
        ],
      },
      {
        h: "Μια πολιτική απορρήτου που πραγματικά ενημερώνει",
        p: [
          "Η πολιτική απορρήτου σας πρέπει να αναφέρει ποια προσωπικά δεδομένα συλλέγετε, γιατί, με ποια νόμιμη βάση, πόσο καιρό τα διατηρείτε, με ποιους κοινοποιούνται και πώς οι επισκέπτες μπορούν να ασκήσουν τα δικαιώματά τους. Πρέπει να είναι εύκολα προσβάσιμη — με σύνδεσμο από κάθε σελίδα — και συγκεκριμένη, όχι ένα γενικό κείμενο θαμμένο στους όρους χρήσης. Η Αρχή έχει τονίσει ότι μια γενική αναφορά στους όρους χρήσης ή μια μακροσκελής πολιτική που καλύπτει άσχετα θέματα δεν αρκεί ως ενημέρωση για τη συγκατάθεση cookies.",
        ],
      },
      {
        h: "Συγκατάθεση cookies: οι ειδικοί κανόνες της Αρχής",
        p: [
          "Πέρα από τον GDPR, στην Ελλάδα εφαρμόζεται η εθνική νομοθεσία για τις ηλεκτρονικές επικοινωνίες (νόμος 3471/2006). Οι Συστάσεις 1/2020 της Αρχής ορίζουν πώς μοιάζει ένα σύννομο banner cookies:",
        ],
        list: [
          "Προηγούμενη συγκατάθεση για όλα τα μη απαραίτητα cookies — τα cookies αναλυτικών, στατιστικών και μάρκετινγκ απαιτούν ρητή, ενεργή συγκατάθεση.",
          "Χωρίς cookie walls — οι επισκέπτες πρέπει να μπορούν να συνεχίσουν να χρησιμοποιούν τον ιστότοπο χωρίς να αποδεχτούν τα μη απαραίτητα cookies.",
          "Αποδοχή και Απόρριψη εξίσου εύκολες — ίδιος αριθμός κλικ, από το ίδιο επίπεδο, με κουμπιά ίδιου μεγέθους, τονισμού και χρώματος.",
          "Χωρίς προεπιλεγμένα κουτιά — η συγκατάθεση πρέπει να προέρχεται από σαφή, θετική ενέργεια.",
          "Ενημερωμένη συγκατάθεση — η συνέχιση της περιήγησης μετά από ειδοποίηση δεν αποτελεί συγκατάθεση· εξηγήστε τον συγκεκριμένο σκοπό κάθε cookie.",
          "Εύκολη ανάκληση — οι χρήστες πρέπει να μπορούν να αλλάξουν γνώμη το ίδιο εύκολα όπως συγκατατέθηκαν.",
        ],
      },
      {
        h: "Τα βασικά της προστασίας δεδομένων",
        list: [
          "Νόμιμη βάση για κάθε δραστηριότητα επεξεργασίας.",
          "Ασφάλεια: HTTPS παντού, έλεγχος πρόσβασης, κωδικοί με κατακερματισμό, τακτικά αντίγραφα ασφαλείας, ενημερωμένο λογισμικό.",
          "Ενημερωμένο αρχείο δραστηριοτήτων επεξεργασίας (άρθρο 30).",
          "Έγγραφες συμβάσεις επεξεργασίας δεδομένων με παρόχους φιλοξενίας, email και αναλυτικών (άρθρο 28).",
          "Υπεύθυνος Προστασίας Δεδομένων όπου απαιτείται — οι δημόσιοι φορείς οφείλουν να διορίζουν έναν κατά τον ελληνικό νόμο.",
          "Εκτίμηση Αντικτύπου στην Προστασία Δεδομένων για επεξεργασία υψηλού κινδύνου.",
          "Γνωστοποίηση παραβίασης εντός 72 ωρών στην Αρχή, και στα θιγόμενα πρόσωπα όταν ο κίνδυνος είναι υψηλός.",
        ],
      },
      {
        h: "Σεβασμός των δικαιωμάτων των χρηστών",
        p: [
          "Οι επισκέπτες έχουν δικαίωμα πρόσβασης στα δεδομένα τους, διόρθωσης, διαγραφής, λήψης τους σε φορητή μορφή και εναντίωσης στην επεξεργασία. Παρέχετε σαφές κανάλι επικοινωνίας — η πολιτική απορρήτου σας πρέπει να αναφέρει διεύθυνση email — και απαντήστε εντός ενός μηνός.",
        ],
      },
      {
        h: "Λίστα συμμόρφωσης GDPR για ιστοσελίδες",
        list: [
          "Πολιτική απορρήτου δημοσιευμένη και συνδεδεμένη από κάθε σελίδα.",
          "Banner cookies με προηγούμενη συγκατάθεση, εξίσου εμφανή Αποδοχή και Απόρριψη, χωρίς προεπιλεγμένα κουτιά, χωρίς cookie wall.",
          "Καταγραφή της συγκατάθεσης και εύκολη ανάκλησή της.",
          "HTTPS ενεργό παντού.",
          "Συμβάσεις επεξεργασίας δεδομένων με όλους τους παρόχους υπηρεσιών.",
          "Ενημερωμένο αρχείο δραστηριοτήτων επεξεργασίας.",
          "Ορισμένο σημείο επικοινωνίας για αιτήματα υποκειμένων, με απάντηση εντός ενός μηνός.",
          "Διαδικασία απόκρισης σε παραβίαση με γνωστοποίηση 72 ωρών στην Αρχή.",
        ],
      },
      {
        h: "Ο GDPR είναι μέρος του QA",
        p: [
          "Η συμμόρφωση με τον GDPR δεν είναι έργο μίας φοράς. Κάθε νέα λειτουργία, φόρμα ή ενσωμάτωση που αγγίζει προσωπικά δεδομένα χρειάζεται αξιολόγηση, οι ροές συγκατάθεσης χρειάζονται έλεγχο και η ασφάλεια χρειάζεται τακτική επαλήθευση. Αντιμετωπίζοντας την ιδιωτικότητα και την ασφάλεια ως μέρος της διαδικασίας ποιότητάς σας — όπως ακριβώς ελέγχετε τη λειτουργικότητα — κρατάτε τον ιστότοπό σας σύννομο και τα δεδομένα των επισκεπτών σας ασφαλή.",
        ],
      },
    ],
    faq: [
      {
        q: "Χρειάζομαι banner cookies αν η ιστοσελίδα μου χρησιμοποιεί μόνο απαραίτητα cookies;",
        a: "Όχι. Τα cookies που είναι αυστηρά απαραίτητα για την υπηρεσία (όπως τα session cookies) δεν απαιτούν συγκατάθεση, αλλά οφείλετε να ενημερώνετε τους επισκέπτες γι' αυτά. Όλα τα μη απαραίτητα cookies απαιτούν προηγούμενη συγκατάθεση.",
      },
      {
        q: "Επιτρέπεται το cookie wall στην Ελλάδα;",
        a: "Όχι. Οι οδηγίες της Αρχής απαγορεύουν τα cookie walls: οι επισκέπτες πρέπει να μπορούν να χρησιμοποιούν τον ιστότοπο χωρίς να αποδεχτούν τα μη απαραίτητα cookies.",
      },
      {
        q: "Χρειάζεται η ελληνική ιστοσελίδα μου Υπεύθυνο Προστασίας Δεδομένων;",
        a: "Όχι πάντα. Οι δημόσιοι φορείς οφείλουν να διορίζουν έναν κατά τον ελληνικό νόμο 4624/2019, όπως και οι οργανισμοί των οποίων η κύρια δραστηριότητα περιλαμβάνει παρακολούθηση μεγάλης κλίμακας ή δεδομένα ειδικών κατηγοριών.",
      },
      {
        q: "Πόσο γρήγορα πρέπει να αναφέρω παραβίαση δεδομένων στην Ελλάδα;",
        a: "Εντός 72 ωρών από τη στιγμή που λαμβάνετε γνώση της παραβίασης, στην Αρχή Προστασίας Δεδομένων, και στα θιγόμενα πρόσωπα χωρίς αδικαιολόγητη καθυστέρηση όταν ο κίνδυνος είναι υψηλός.",
      },
    ],
  },
};

export function localizePost(post: BlogPost, lang: string): BlogPost {
  return lang === "el" && el[post.slug] ? { ...post, ...el[post.slug] } : post;
}

export const blogUi = {
  en: {
    blog: "Blog",
    heading: "QA, Security & GDPR Blog",
    intro: "Practical articles on software QA testing, release readiness, penetration testing and GDPR compliance by ISTQB-certified QA specialist Greta Rusecke.",
    read: "Read article",
    min: "min read",
    by: "by Greta Rusecke, ISTQB Certified QA Specialist",
    home: "Home",
    faq: "Frequently asked questions",
    cta: "Need QA or a security review for your product?",
    contact: "Contact Greta",
    next: "Read next",
  },
  el: {
    blog: "Blog",
    heading: "Blog για QA, Ασφάλεια & GDPR",
    intro: "Πρακτικά άρθρα για τον έλεγχο ποιότητας λογισμικού, την ετοιμότητα κυκλοφορίας, τις δοκιμές διείσδυσης και τη συμμόρφωση με τον GDPR από την πιστοποιημένη κατά ISTQB ειδικό QA Greta Rusecke.",
    read: "Διάβασε το άρθρο",
    min: "λεπτά ανάγνωσης",
    by: "από τη Greta Rusecke, πιστοποιημένη ειδικό QA κατά ISTQB",
    home: "Αρχική",
    faq: "Συχνές ερωτήσεις",
    cta: "Χρειάζεστε έλεγχο ποιότητας ή ασφαλείας για το προϊόν σας;",
    contact: "Επικοινώνησε με τη Greta",
    next: "Διάβασε επίσης",
  },
} as const;
