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
};

export function localizePost(post: BlogPost, lang: string): BlogPost {
  return lang === "el" && el[post.slug] ? { ...post, ...el[post.slug] } : post;
}

export const blogUi = {
  en: {
    blog: "Blog",
    heading: "QA & Security Blog",
    intro: "Practical articles on software QA testing, release readiness and penetration testing by ISTQB-certified QA specialist Greta Rusecke.",
    read: "Read article →",
    min: "min read",
    by: "by Greta Rusecke, ISTQB Certified QA Specialist",
    home: "Home",
    faq: "Frequently asked questions",
    cta: "Need QA or a security review for your product?",
    contact: "Contact Greta →",
    next: "Read next",
  },
  el: {
    blog: "Blog",
    heading: "Blog για QA & Ασφάλεια",
    intro: "Πρακτικά άρθρα για τον έλεγχο ποιότητας λογισμικού, την ετοιμότητα κυκλοφορίας και τις δοκιμές διείσδυσης από την πιστοποιημένη κατά ISTQB ειδικό QA Greta Rusecke.",
    read: "Διάβασε το άρθρο →",
    min: "λεπτά ανάγνωσης",
    by: "από τη Greta Rusecke, πιστοποιημένη ειδικό QA κατά ISTQB",
    home: "Αρχική",
    faq: "Συχνές ερωτήσεις",
    cta: "Χρειάζεστε έλεγχο ποιότητας ή ασφαλείας για το προϊόν σας;",
    contact: "Επικοινώνησε με τη Greta →",
    next: "Διάβασε επίσης",
  },
} as const;
