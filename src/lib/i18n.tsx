import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "el";

const STORAGE_KEY = "greta-lang";

export const dictionaries = {
  en: {
    langLabel: "EN",
    langSwitchTo: "Ελληνικά",
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      gretaAi: "Greta AI",
      contact: "Contact",
    },
    hero: {
      badge: "Thessaloniki, Greece · Open to work",
      titleA: "ISTQB QA Specialist ",
      titleB: "& AI Product Builder",
      tagline:
        "Bridging the gap between QA precision, product logic, and rapid AI-assisted execution.",
      ctaChat: "Chat with Greta AI",
      ctaProjects: "View Projects",
      stats: [
        { k: "8+ yrs", v: "IT & QA experience" },
        { k: "ISTQB", v: "Certified Tester (CTFL)" },
        { k: "4 live", v: "Products shipped solo" },
      ],
    },
    about: {
      eyebrow: "01 / About",
      heading: "From managing delivery, to guarding quality, to building the product.",
      lead: "A QA Product Engineer who connects business logic with technical execution across SaaS, ERP, CRM and e-commerce — and now builds the products too.",
      globalReach: "Worked with cross-functional teams & B2B clients across the USA, UK, Spain, Latvia & New Zealand.",
      credentials: {
        heading: "Certifications & Education",
        items: [
          "Cyber Hygiene at Work — National Cyber Security Center (2025)",
          "ISTQB Certified Tester (CTFL) — Oct 2023",
          "The Knowledge Academy — ISTQB Software Testing Foundation Level Course (Oct 2023)",
          "Udemy — Manual QA Software Testing (Mar 2022)",
          "Vilnius University — Bachelor's in Business Administration (2011-2016)",
        ],
      },
      steps: [
        {
          period: "2016 — 2018",
          role: "IT Project Manager",
          org: "SJ Digital · Capital Realty (Lithuania)",
          points: [
            "Ran agile delivery for .NET, PHP and Ruby teams — standups, sprint planning, timelines.",
            "Owned client relations with B2B stakeholders in the USA, UK, Spain, New Zealand and Latvia.",
            "Stayed hands-on with manual QA for every release before it reached the client.",
          ],
        },
        {
          period: "2021 — 2026",
          role: "QA Product Engineer · ISTQB Certified",
          org: "Sonaro UAB · Zebracloud AB (remote)",
          points: [
            "End-to-end manual, functional and regression suites across Windows, macOS and iOS via BrowserStack.",
            "Full defect lifecycle in Jira with high-detail reports that cut developer resolution time.",
            "Refined system logic with developers and product owners, removing requirement ambiguity before sprint planning.",
          ],
        },
        {
          period: "2024 — now",
          role: "AI Product Builder / Full-Stack Developer",
          org: "Independent · Lovable, Vercel, TypeScript",
          points: [
            "Prototypes and ships production-ready apps with AI tooling — days of work compressed into hours.",
            "Owns the whole pipeline: prototype, QA cycle, GitHub version control, Vercel deploy, DNS and env config.",
            "Live products launched solo with zero critical launch bugs.",
          ],
        },
      ],
    },

    projects: {
      eyebrow: "02 / Projects",
      heading: "Shipped, tested, live.",
      lead: "Products designed, built, QA-cycled across devices and deployed independently.",
      summaries: [
        "Company landing page featuring an interactive AI assistant that handles client support and qualifies enquiries automatically.",
        "Beauty salon platform with interactive service menus, transparent pricing and a responsive photo gallery.",
        "Informational platform for commercial cleaning services with an integrated blog and lead capture flow.",
      ],
    },
    skills: {
      eyebrow: "03 / Skills",
      heading: "The toolkit.",
      groups: ["AI & Prototyping", "QA & Testing", "Management & Agile", "Systems & Frontend"],
      items: [
        ["Lovable AI", "AI-Assisted Development", "Prompt Engineering", "GitHub", "Vercel Deployment", "DNS & Env Config"],
        [
          "ISTQB Certified",
          "Test Strategy",
          "Test Case Design",
          "Functional & Non-functional",
          "Regression Testing",
          "Smoke Testing",
          "E2E & UAT",
          "Cross-browser & Cross-platform",
          "Cross-Platform Testing (iOS, macOS, Windows)",
          "Defect Lifecycle",
          "BrowserStack",
        ],
        ["Jira", "Confluence", "Trello", "Scrum", "Kanban", "Sprint Planning", "Requirement Analysis", "Client Communication"],
        ["SaaS", "ERP", "CRM", "E-commerce", "React", "TypeScript", "Tailwind CSS", "Responsive Web Design"],
      ],
    },

    chat: {
      eyebrow: "04 / Greta AI",
      heading: "Ask Greta AI",
      lead: "Her virtual career assistant — trained only on Greta's background, skills and projects.",
      empty:
        "Hi, I'm Greta AI. Ask me anything about Greta's QA experience, certifications or the products she has shipped.",
      suggestions: [
        "What does Greta's ISTQB certification cover?",
        "Tell me about the Devcraft project.",
        "How did she move from QA into AI building?",
        "Which testing tools does she use?",
      ],
      placeholder: "Ask about Greta's QA experience, ISTQB or her AI projects...",
      thinking: "Thinking...",
      error: "Greta AI is unavailable right now. Please try again in a moment.",
    },
    contact: {
      eyebrow: "05 / Contact",
      heading: "Let's build something that ships clean.",
      lead: "Open to career opportunities and custom product development. Let's turn your idea into a production-ready application.",
      inquiry: "What is this about?",
      inquiryJob: "Project",
      inquiryProject: "Offer",

      phone: "Call",
      phoneNumber: "+30 697 583 5277",
      downloadCv: "Download my CV here!",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      message: "Message",
      messagePlaceholder: "Tell Greta about the role or project...",
      send: "Send message",
      sending: "Sending...",
      success: "Thanks! Your message reached Greta's inbox.",
      failure: "Message could not be sent. Please email greta.rusecke@gmail.com instead.",
      errors: {
        name: "Please add your name",
        nameLong: "Name is too long",
        email: "Enter a valid email address",
        message: "Please write at least 10 characters",
        messageLong: "Message is too long",
      },
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    },
    legal: {
      back: "← Back to portfolio",
      updated: "Last updated: 5 August 2026",
      privacyTitle: "Privacy Policy",
      privacy: [
        {
          h: "Who runs this site",
          p: "This personal portfolio is maintained by Greta Rusecke (Thessaloniki, Greece). For any privacy question, write to greta.rusecke@gmail.com.",
        },
        {
          h: "What is collected",
          list: [
            "Contact form: the name, email address, enquiry type (job offer or custom project) and message you submit. These are stored securely in the site database so Greta can reply to you.",
            "Greta AI chat: the questions you type and the assistant's replies are sent to an AI model provider and are also stored in the site database, together with the language you used and a random conversation identifier.",
            "Approximate location and IP address: when you chat with Greta AI, your IP address and the approximate location derived from it (country, and where available city and region) are recorded with the conversation. Your country is also used to decide whether the site is shown in Greek or English.",
            "Technical storage: your language preference is saved in your browser.",
          ],
        },
        {
          h: "How it is used",
          p: "Contact details are used only to respond to your enquiry. Chat transcripts and their approximate location are used only to understand how the assistant is used, to improve its answers and to prevent abuse. None of this data is sold, rented or used for marketing lists.",
        },
        {
          h: "Retention and access",
          p: "Contact messages and chat transcripts are kept for as long as needed to handle the conversation and improve the assistant, and are deleted on request. They are visible only to Greta through a private, password-protected owner dashboard; visitors cannot read this data.",
        },
        {
          h: "Your rights",
          p: "Under the GDPR you may request access to, correction of, or deletion of the personal data you submitted, including chat transcripts and the location data stored with them. Email the address above and the request will be handled promptly.",
        },
        {
          h: "Cookies",
          p: "This site does not use advertising or tracking cookies. Only technical storage needed to display the page is used.",
        },
      ],
      termsTitle: "Terms & Conditions",
      terms: [
        {
          h: "1. Purpose of this site",
          p: "This website presents the professional background, skills and projects of Greta Rusecke. It is informational and does not constitute a service offer or contract.",
        },
        {
          h: "2. Greta AI assistant",
          p: 'The "Greta AI" assistant is an automated tool that answers questions about Greta\'s career only. Its answers are generated by an AI model and may contain inaccuracies; they are not binding statements. Do not submit confidential or personal information through the chat.',
        },
        {
          h: "3. Intellectual property",
          p: "The content, design, text and images on this site belong to Greta Rusecke unless stated otherwise. Reuse without written permission is not allowed. Third-party project links remain the property of their respective owners.",
        },
        {
          h: "4. External links",
          p: "Links to external sites (GitHub, LinkedIn, client projects) are provided for convenience. No responsibility is taken for their content or availability.",
        },
        {
          h: "5. Acceptable use",
          p: "You agree not to misuse the contact form or chat for spam, abusive content, automated scraping, or attempts to disrupt the service.",
        },
        {
          h: "6. Liability",
          p: 'The site is provided "as is" without warranties. Greta Rusecke is not liable for any damage arising from its use.',
        },
        { h: "7. Governing law", p: "These terms are governed by the laws of Greece." },
      ],
    },
  },
  el: {
    langLabel: "EL",
    langSwitchTo: "English",
    nav: {
      about: "Προφίλ",
      projects: "Έργα",
      skills: "Δεξιότητες",
      gretaAi: "Greta AI",
      contact: "Επικοινωνία",
    },
    hero: {
      badge: "Θεσσαλονίκη, Ελλάδα · Διαθέσιμη για εργασία",
      titleA: "Ειδικός QA με πιστοποίηση ISTQB ",
      titleB: "& AI Product Builder",
      tagline:
        "Γεφυρώνω την ακρίβεια του QA, τη λογική του προϊόντος και την ταχεία υλοποίηση με εργαλεία AI.",
      ctaChat: "Μίλησε με το Greta AI",
      ctaProjects: "Δες τα έργα",
      stats: [
        { k: "8+ έτη", v: "Εμπειρία σε IT & QA" },
        { k: "ISTQB", v: "Πιστοποιημένη Tester (CTFL)" },
        { k: "4 live", v: "Προϊόντα υλοποιημένα solo" },
      ],
    },
    about: {
      eyebrow: "01 / Προφίλ",
      heading:
        "Από τη διαχείριση παράδοσης, στη διασφάλιση ποιότητας, μέχρι τη δημιουργία του προϊόντος.",
      lead: "QA Product Engineer που συνδέει την επιχειρησιακή λογική με την τεχνική υλοποίηση σε SaaS, ERP, CRM και e-commerce — και πλέον φτιάχνει και τα ίδια τα προϊόντα.",
      globalReach: "Συνεργάστηκε με διαλειτουργικές ομάδες και B2B πελάτες στις ΗΠΑ, ΗΒ, Ισπανία, Λετονία και Νέα Ζηλανδία.",
      credentials: {
        heading: "Πιστοποιήσεις & Εκπαίδευση",
        items: [
          "Cyber Hygiene at Work — Εθνικό Κέντρο Κυβερνοασφάλειας (2025)",
          "ISTQB Certified Tester (CTFL) — Οκτ 2023",
          "The Knowledge Academy — ISTQB Software Testing Foundation Level Course (Οκτ 2023)",
          "Udemy — Manual QA Software Testing (Μάρ 2022)",
          "Πανεπιστήμιο Βίλνιους — Πτυχίο στη Διοίκηση Επιχειρήσεων (2011-2016)",
        ],
      },
      steps: [
        {
          period: "2016 — 2018",
          role: "Διευθύντρια Έργων IT",
          org: "SJ Digital · Capital Realty (Λιθουανία)",
          points: [
            "Διαχείριση agile παράδοσης για ομάδες .NET, PHP και Ruby — standups, σχεδιασμός sprint, χρονοδιαγράμματα.",
            "Υπεύθυνη επικοινωνίας με B2B πελάτες σε ΗΠΑ, Ηνωμένο Βασίλειο, Ισπανία, Νέα Ζηλανδία και Λετονία.",
            "Ενεργή συμμετοχή σε manual QA για κάθε έκδοση πριν φτάσει στον πελάτη.",
          ],
        },
        {
          period: "2021 — 2026",
          role: "QA Product Engineer · Πιστοποίηση ISTQB",
          org: "Sonaro UAB · Zebracloud AB (εξ αποστάσεως)",
          points: [
            "Πλήρη σενάρια manual, λειτουργικού και regression ελέγχου σε Windows, macOS και iOS μέσω BrowserStack.",
            "Πλήρης κύκλος ζωής σφαλμάτων στο Jira, με αναλυτικές αναφορές που μείωσαν τον χρόνο επίλυσης των developers.",
            "Βελτίωση της λογικής του συστήματος μαζί με developers και product owners, εξαλείφοντας ασάφειες στις απαιτήσεις πριν τον σχεδιασμό sprint.",
          ],
        },
        {
          period: "2024 — σήμερα",
          role: "AI Product Builder / Full-Stack Developer",
          org: "Ανεξάρτητα · Lovable, Vercel, TypeScript",
          points: [
            "Δημιουργία prototypes και έτοιμων για παραγωγή εφαρμογών με εργαλεία AI — ημέρες δουλειάς σε λίγες ώρες.",
            "Διαχείριση όλης της ροής: prototype, κύκλος QA, έλεγχος εκδόσεων στο GitHub, deploy στο Vercel, ρυθμίσεις DNS και env.",
            "Live προϊόντα σε παραγωγή, υλοποιημένα solo, χωρίς κρίσιμα σφάλματα στην κυκλοφορία.",
          ],
        },
      ],
    },

    projects: {
      eyebrow: "02 / Έργα",
      heading: "Υλοποιημένα, ελεγμένα, live.",
      lead: "Προϊόντα σχεδιασμένα, υλοποιημένα, ελεγμένα σε διαφορετικές συσκευές και δημοσιευμένα ανεξάρτητα.",
      summaries: [
        "Εταιρική σελίδα προορισμού με διαδραστικό βοηθό AI που εξυπηρετεί πελάτες και αξιολογεί αυτόματα τα αιτήματα.",
        "Πλατφόρμα για σαλόνι ομορφιάς με διαδραστικούς καταλόγους υπηρεσιών, διαφανή τιμολόγηση και responsive γκαλερί φωτογραφιών.",
        "Ενημερωτική πλατφόρμα για υπηρεσίες επαγγελματικού καθαρισμού με ενσωματωμένο blog και φόρμα προσέλκυσης πελατών.",
      ],
    },
    skills: {
      eyebrow: "03 / Δεξιότητες",
      heading: "Τα εργαλεία μου.",
      groups: ["AI & Prototyping", "QA & Έλεγχος λογισμικού", "Διοίκηση & Agile", "Systems & Frontend"],
      items: [
        ["Lovable AI", "AI-Assisted Development", "Prompt Engineering", "GitHub", "Deploy σε Vercel", "Ρυθμίσεις DNS & Env"],
        [
          "Πιστοποίηση ISTQB",
          "Στρατηγική Ελέγχου",
          "Σχεδιασμός Test Cases",
          "Λειτουργικός & Μη λειτουργικός",
          "Regression Testing",
          "Smoke Testing",
          "E2E & UAT",
          "Cross-browser & Cross-platform",
          "Cross-Platform Testing (iOS, macOS, Windows)",
          "Κύκλος ζωής σφαλμάτων",
          "BrowserStack",
        ],
        ["Jira", "Confluence", "Trello", "Scrum", "Kanban", "Σχεδιασμός Sprint", "Ανάλυση Απαιτήσεων", "Επικοινωνία με πελάτες"],
        ["SaaS", "ERP", "CRM", "E-commerce", "React", "TypeScript", "Tailwind CSS", "Responsive Web Design"],
      ],
    },

    chat: {
      eyebrow: "04 / Greta AI",
      heading: "Ρώτησε το Greta AI",
      lead: "Ο εικονικός βοηθός καριέρας της — εκπαιδευμένος αποκλειστικά στο προφίλ, τις δεξιότητες και τα έργα της Greta.",
      empty:
        "Γεια, είμαι το Greta AI. Ρώτησέ με ό,τι θέλεις για την εμπειρία της Greta στο QA, τις πιστοποιήσεις της ή τα προϊόντα που έχει υλοποιήσει.",
      suggestions: [
        "Τι καλύπτει η πιστοποίηση ISTQB της Greta;",
        "Πες μου για το έργο Devcraft.",
        "Πώς πέρασε από το QA στη δημιουργία προϊόντων με AI;",
        "Ποια εργαλεία ελέγχου χρησιμοποιεί;",
      ],
      placeholder: "Ρώτησε για την εμπειρία της στο QA, το ISTQB ή τα έργα AI...",
      thinking: "Σκέφτομαι...",
      error: "Το Greta AI δεν είναι διαθέσιμο αυτή τη στιγμή. Δοκίμασε ξανά σε λίγο.",
    },
    contact: {
      eyebrow: "05 / Επικοινωνία",
      heading: "Ας φτιάξουμε κάτι που κυκλοφορεί χωρίς σφάλματα.",
      lead: "Ανοιχτή σε επαγγελματικές ευκαιρίες και ανάπτυξη προϊόντων κατά παραγγελία. Ας μετατρέψουμε την ιδέα σου σε μια εφαρμογή έτοιμη για παραγωγή.",
      inquiry: "Για ποιο θέμα επικοινωνείς;",
      inquiryJob: "Έργο",
      inquiryProject: "Προσφορά",

      phone: "Κλήση",
      phoneNumber: "+30 697 583 5277",
      downloadCv: "Κατέβασε το βιογραφικό μου εδώ!",
      name: "Όνομα",
      namePlaceholder: "Το όνομά σου",
      email: "Email",
      emailPlaceholder: "you@company.com",
      message: "Μήνυμα",
      messagePlaceholder: "Πες στη Greta για τη θέση ή το έργο...",
      send: "Αποστολή μηνύματος",
      sending: "Αποστολή...",
      success: "Ευχαριστώ! Το μήνυμά σου έφτασε στη Greta.",
      failure: "Το μήνυμα δεν στάλθηκε. Στείλε email στο greta.rusecke@gmail.com.",
      errors: {
        name: "Συμπλήρωσε το όνομά σου",
        nameLong: "Το όνομα είναι πολύ μεγάλο",
        email: "Δώσε μια έγκυρη διεύθυνση email",
        message: "Γράψε τουλάχιστον 10 χαρακτήρες",
        messageLong: "Το μήνυμα είναι πολύ μεγάλο",
      },
      rights: "Με επιφύλαξη παντός δικαιώματος.",
      privacy: "Πολιτική Απορρήτου",
      terms: "Όροι Χρήσης",
    },
    legal: {
      back: "← Επιστροφή στο portfolio",
      updated: "Τελευταία ενημέρωση: 5 Αυγούστου 2026",
      privacyTitle: "Πολιτική Απορρήτου",
      privacy: [
        {
          h: "Ποιος διαχειρίζεται τον ιστότοπο",
          p: "Αυτό το προσωπικό portfolio διατηρείται από την Greta Rusecke (Θεσσαλονίκη, Ελλάδα). Για οποιοδήποτε ζήτημα απορρήτου, γράψε στο greta.rusecke@gmail.com.",
        },
        {
          h: "Ποια δεδομένα συλλέγονται",
          list: [
            "Φόρμα επικοινωνίας: το όνομα, η διεύθυνση email, ο τύπος αιτήματος (ευκαιρία εργασίας ή έργο κατά παραγγελία) και το μήνυμα που υποβάλλεις. Αποθηκεύονται με ασφάλεια στη βάση δεδομένων του ιστότοπου ώστε να μπορεί η Greta να σου απαντήσει.",
            "Συνομιλία Greta AI: οι ερωτήσεις που πληκτρολογείς και οι απαντήσεις του βοηθού αποστέλλονται σε πάροχο μοντέλου AI και αποθηκεύονται επίσης στη βάση δεδομένων του ιστότοπου, μαζί με τη γλώσσα που χρησιμοποίησες και ένα τυχαίο αναγνωριστικό συνομιλίας.",
            "Κατά προσέγγιση τοποθεσία και διεύθυνση IP: όταν συνομιλείς με τη Greta AI, καταγράφονται η διεύθυνση IP σου και η κατά προσέγγιση τοποθεσία που προκύπτει από αυτήν (χώρα και, όπου είναι διαθέσιμα, πόλη και περιοχή). Η χώρα σου χρησιμοποιείται επίσης για να εμφανιστεί ο ιστότοπος στα ελληνικά ή στα αγγλικά.",
            "Τεχνική αποθήκευση: η προτίμηση γλώσσας αποθηκεύεται στον browser σου.",
          ],
        },
        {
          h: "Πώς χρησιμοποιούνται",
          p: "Τα στοιχεία επικοινωνίας χρησιμοποιούνται αποκλειστικά για την απάντηση στο αίτημά σου. Τα αρχεία συνομιλιών και η κατά προσέγγιση τοποθεσία χρησιμοποιούνται μόνο για την κατανόηση της χρήσης του βοηθού, τη βελτίωση των απαντήσεων και την αποτροπή κατάχρησης. Κανένα από αυτά τα δεδομένα δεν πωλείται, δεν ενοικιάζεται και δεν χρησιμοποιείται σε λίστες μάρκετινγκ.",
        },
        {
          h: "Διατήρηση και πρόσβαση",
          p: "Τα μηνύματα επικοινωνίας και τα αρχεία συνομιλιών διατηρούνται όσο χρειάζεται για τη διεκπεραίωση της επικοινωνίας και τη βελτίωση του βοηθού και διαγράφονται κατόπιν αιτήματος. Είναι ορατά μόνο στη Greta μέσω ιδιωτικού πίνακα διαχείρισης με κωδικό· οι επισκέπτες δεν έχουν πρόσβαση σε αυτά τα δεδομένα.",
        },
        {
          h: "Τα δικαιώματά σου",
          p: "Σύμφωνα με τον GDPR μπορείς να ζητήσεις πρόσβαση, διόρθωση ή διαγραφή των προσωπικών δεδομένων που υπέβαλες, συμπεριλαμβανομένων των αρχείων συνομιλίας και των δεδομένων τοποθεσίας που αποθηκεύονται μαζί τους. Στείλε email στην παραπάνω διεύθυνση και το αίτημα θα διεκπεραιωθεί άμεσα.",
        },
        {
          h: "Cookies",
          p: "Ο ιστότοπος δεν χρησιμοποιεί cookies διαφήμισης ή παρακολούθησης. Χρησιμοποιείται μόνο η τεχνικά απαραίτητη αποθήκευση για την εμφάνιση της σελίδας.",
        },
      ],
      termsTitle: "Όροι Χρήσης",
      terms: [
        {
          h: "1. Σκοπός του ιστότοπου",
          p: "Ο ιστότοπος παρουσιάζει το επαγγελματικό προφίλ, τις δεξιότητες και τα έργα της Greta Rusecke. Έχει ενημερωτικό χαρακτήρα και δεν αποτελεί προσφορά υπηρεσιών ή σύμβαση.",
        },
        {
          h: "2. Ο βοηθός Greta AI",
          p: "Ο βοηθός «Greta AI» είναι αυτοματοποιημένο εργαλείο που απαντά αποκλειστικά σε ερωτήσεις για την καριέρα της Greta. Οι απαντήσεις παράγονται από μοντέλο AI και ενδέχεται να περιέχουν ανακρίβειες· δεν αποτελούν δεσμευτικές δηλώσεις. Μην υποβάλλεις εμπιστευτικές ή προσωπικές πληροφορίες μέσω της συνομιλίας.",
        },
        {
          h: "3. Πνευματική ιδιοκτησία",
          p: "Το περιεχόμενο, ο σχεδιασμός, τα κείμενα και οι εικόνες του ιστότοπου ανήκουν στην Greta Rusecke, εκτός αν αναφέρεται διαφορετικά. Η επαναχρησιμοποίηση χωρίς γραπτή άδεια δεν επιτρέπεται. Οι σύνδεσμοι έργων τρίτων παραμένουν ιδιοκτησία των αντίστοιχων κατόχων τους.",
        },
        {
          h: "4. Εξωτερικοί σύνδεσμοι",
          p: "Οι σύνδεσμοι προς εξωτερικούς ιστότοπους (GitHub, LinkedIn, έργα πελατών) παρέχονται για διευκόλυνση. Δεν αναλαμβάνεται ευθύνη για το περιεχόμενο ή τη διαθεσιμότητά τους.",
        },
        {
          h: "5. Αποδεκτή χρήση",
          p: "Συμφωνείς να μην κάνεις κατάχρηση της φόρμας επικοινωνίας ή της συνομιλίας για spam, υβριστικό περιεχόμενο, αυτοματοποιημένη συλλογή δεδομένων ή απόπειρες διατάραξης της υπηρεσίας.",
        },
        {
          h: "6. Ευθύνη",
          p: "Ο ιστότοπος παρέχεται «ως έχει», χωρίς εγγυήσεις. Η Greta Rusecke δεν φέρει ευθύνη για οποιαδήποτε ζημία προκύψει από τη χρήση του.",
        },
        {
          h: "7. Εφαρμοστέο δίκαιο",
          p: "Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο.",
        },
      ],
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "el" || stored === "en") {
      setLanguageState(stored);
      return;
    }

    let cancelled = false;
    // No saved preference: pick language from the visitor's country (Greece -> Greek).
    void fetch("/api/public/geo")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { language?: string } | null) => {
        if (cancelled) return;
        if (data?.language === "el" || data?.language === "en") {
          setLanguageState(data.language);
          return;
        }
        if (navigator.language?.toLowerCase().startsWith("el")) setLanguageState("el");
      })
      .catch(() => {
        if (!cancelled && navigator.language?.toLowerCase().startsWith("el")) {
          setLanguageState("el");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);


  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (lang) => {
        setLanguageState(lang);
        window.localStorage.setItem(STORAGE_KEY, lang);
      },
      t: dictionaries[language] as unknown as Dictionary,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
