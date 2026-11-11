/**
 * Every word on this site lives in this file.
 *
 * Edit it, commit, push — the site rebuilds and redeploys itself.
 * Images live in `public/assets/images/` and are referenced root-absolute,
 * e.g. `/assets/images/portrait.webp`. The build rewrites them onto the
 * correct base path.
 *
 * Anything marked TODO is a deliberate gap waiting on content.
 */

import type { LogoName } from "../components/Logo";
import type { IconName } from "../components/icons";

/**
 * Authoring notes below are wrapped in `DEV ? [...] : []` so the bundler
 * removes them entirely from the production build — they never render on the
 * published site and never appear in the shipped JavaScript.
 */
const DEV = import.meta.env.DEV;

export const site = {
  name: "Pooja Goel",
  role: "Database Administrator",
  location: "Singapore",
  email: "8poojagoel@gmail.com",
  linkedin: "https://www.linkedin.com/in/poojagoel08",
  instagram: "https://www.instagram.com/colourzone_melbourne",
  instagramHandle: "@colourzone_melbourne",
  tagline: "Databases that stay up, stay fast, and stay governed.",
  /** Published copy has the phone number redacted out of the PDF. */
  resume: "/assets/documents/pooja-goel-resume.pdf",
};

/* ------------------------------------------------------------------ home */

export const hero = {
  lede: "I keep production databases alive. Over four years of SQL Server, PostgreSQL and Azure — high availability, migrations, performance, access control — and a growing conviction that the database team is where AI adoption either becomes real or quietly stalls.",
  secondary:
    "Data Services Engineer at PointsBet, working across on-premises and Azure estates in a regulated, always-on industry.",
};

export const metrics = [
  { value: "99.99%", label: "Availability across 13 production environments" },
  { value: "100%", label: "Server uptime through peak wagering periods" },
  { value: "67%", label: "Faster database issue resolution" },
  { value: "60+", label: "AI-enabled engineering hours returned each month" },
];

export const arc = {
  eyebrow: "The route here",
  heading: "India, Australia, Singapore",
  body: [
    "I trained as a computer engineer in India, then moved to Australia for a Master of Information Systems and stayed — first as a graduate engineer, then running database services for a wagering platform where a slow query is a lost customer and an outage is a regulatory conversation.",
    "The environment taught me what this whole site is really about: reliability is not a feature you add. It is a set of habits — tested restores, rehearsed failovers, access you can audit, changes you can reverse — applied relentlessly and mostly invisibly.",
    "I am now based in Singapore, which runs on the same combination I have spent over four years inside: regulated industries, cloud-first platforms, and real appetite for putting AI to work on operational data rather than in a demo.",
  ],
};

export const capabilities = [
  {
    title: "Reliability & availability",
    icon: "pulse" as const,
    body: "High availability groups, replication, failover rehearsal, backup and restore, disaster recovery against real RTO and RPO targets, capacity planning, patching and upgrades.",
    adjacency: "Overlaps: Site Reliability Engineering",
  },
  {
    title: "Security & governance",
    icon: "shield" as const,
    body: "Database access controls, data-plane RBAC, audit reporting, governance policy, data integrity and compliance support in a licensed, heavily supervised industry.",
    adjacency: "Overlaps: Data Security & Governance",
  },
  {
    title: "Performance & migration",
    icon: "migration" as const,
    body: "Query and index tuning, configuration optimisation, on-premises to cloud migration, estate consolidation, scalability work and business continuity through change.",
    adjacency: "Overlaps: Data Platform Engineering",
  },
  {
    title: "AI enablement",
    icon: "ai" as const,
    body: "LLM knowledge assistants, agentic alert diagnosis, workflow automation, vector databases and semantic search — grounded in the operational data a DBA already governs.",
    adjacency: "Overlaps: AI Platform & Enablement",
  },
];

/**
 * Ordered so the three groups with product logos fill the first row of the
 * grid; the rest name practices and carry none.
 */
export const skillGroups = [
  {
    title: "Databases & cloud",
    icon: "database" as const,
    logos: [
      "microsoftsqlserver", "azuresqldatabase", "cosmosdb", "postgresql", "mysql",
    ] as LogoName[],
    items: [
      "Microsoft SQL Server",
      "Azure SQL",
      "PostgreSQL",
      "MySQL",
      "Azure Cosmos DB",
      "On-premises and cloud estates",
    ],
  },
  {
    title: "Automation & tooling",
    icon: "automation" as const,
    logos: [
      "powershell", "python", "githubactions", "githubcopilot", "azuredevops",
      "terraform", "grafana", "yaml",
    ] as LogoName[],
    items: [
      "PowerShell",
      "Python",
      "GitHub Actions",
      "GitHub Copilot",
      "Azure DevOps",
      "Terraform",
      "Bicep",
      "YAML",
      "Grafana",
      "SSMS",
    ],
  },
  {
    title: "AI & evaluation",
    icon: "ai" as const,
    logos: [
      "claude", "githubcopilot", "azure", "databricks",
    ] as LogoName[],
    items: [
      "LLM knowledge assistants",
      "Agentic AI",
      "Vector databases",
      "Embeddings",
      "Semantic search",
      "Proof-of-concept design",
      "Benchmarking",
      "Test-case development",
    ],
  },
  {
    title: "Operations & reliability",
    icon: "pulse" as const,
    logos: [] as LogoName[],
    items: [
      "Production support",
      "Monitoring",
      "Incident troubleshooting",
      "High availability",
      "Replication",
      "Backup and restore",
      "Disaster recovery",
      "RTO / RPO",
      "Capacity planning",
      "Patching and upgrades",
    ],
  },
  {
    title: "Performance & migration",
    icon: "migration" as const,
    logos: [] as LogoName[],
    items: [
      "Query tuning",
      "Index tuning",
      "Configuration optimisation",
      "Database migration",
      "Cloud migration",
      "Consolidation",
      "Business continuity",
    ],
  },
  {
    title: "Security & governance",
    icon: "shield" as const,
    logos: [] as LogoName[],
    items: [
      "Database access controls",
      "Data-plane RBAC",
      "Audit reporting",
      "Governance policy",
      "Data integrity",
      "Compliance support",
    ],
  },
];

/* --------------------------------------------------------------- contact */

export type ContactTopic = {
  label: string;
  /** A line of orientation under the label, in the menu. */
  hint: string;
  subject: string;
  /** The draft the sender lands in. Written as them, not as Pooja. */
  body: string[];
};

/**
 * The contact button opens these rather than a bare mailto. A named subject
 * and an opening line get a better class of email than an empty compose
 * window, and it sorts the enquiry before it arrives.
 */
export const contactTopics: ContactTopic[] = [
  {
    label: "Database and reliability work",
    hint: "Migrations, availability, performance, access control",
    subject: "Database and reliability work",
    body: [
      "Hi Pooja,",
      "",
      "I came across your site and wanted to ask about database and reliability work.",
      "",
      "A bit of context on what we are running and where it hurts:",
      "",
    ],
  },
  {
    label: "AI enablement",
    hint: "Getting models onto governed operational data",
    subject: "AI enablement",
    body: [
      "Hi Pooja,",
      "",
      "I came across your site and wanted to ask about AI enablement work.",
      "",
      "What we are trying to connect, and where it is getting stuck:",
      "",
    ],
  },
  {
    label: "Tutoring and mentoring",
    hint: "Students, early-career engineers, teams",
    subject: "Tutoring and mentoring",
    body: [
      "Hi Pooja,",
      "",
      "I came across your site and wanted to ask about tutoring or mentoring.",
      "",
      "Who it is for and what they are working through:",
      "",
    ],
  },
  {
    label: "Face painting and commissions",
    hint: "Events, portraits, commissioned pieces",
    subject: "Face painting or a commission",
    body: [
      "Hi Pooja,",
      "",
      "I came across your site and wanted to ask about a commission.",
      "",
      "What I have in mind, and roughly when:",
      "",
    ],
  },
  {
    label: "Something else",
    hint: "Anything that does not fit the above",
    subject: "Hello",
    body: ["Hi Pooja,", "", ""],
  },
];

/* ------------------------------------------------------------------ work */

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  context: string[];
  approach: string[];
  outcome: { value: string; label: string }[];
  stack: string[];
  /** Set true while the narrative still needs detail from Pooja. */
  needsDetail?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "azure-migration",
    title: "Moving production to Azure without moving the risk",
    summary:
      "Six-plus databases from on-premises to Azure, and a high-availability posture that had to survive the move rather than be rebuilt after it.",
    context: [
      "The estate had grown on-premises: hardware with a known ceiling, scaling that meant procurement, and a recovery story that depended on where a server happened to sit. Wagering traffic does not politely wait for capacity, and the business was expanding into new jurisdictions.",
      "Migration was the easy half to describe and the hard half to do safely. The databases carried live customer and transaction data in a licensed industry, so the move had to preserve availability, integrity and auditability at every step — not restore them afterwards.",
    ],
    approach: [
      "Migrated the databases to Azure while keeping business continuity intact throughout, improving scalability by roughly 90% against the on-premises ceiling.",
      "Implemented and tuned high availability, replication and recovery across 13 production environments, taking measured availability to 99.99%.",
      "Treated recovery as something to prove rather than document: restores tested, failovers rehearsed, RTO and RPO targets agreed with the business and then actually measured against.",
      ...(DEV ? ["// TODO — the cutover itself: how it was sequenced, what the rollback plan was, and what nearly went wrong. This is the part that makes the story credible."] : []),
    ],
    outcome: [
      { value: "99.99%", label: "Availability achieved" },
      { value: "13", label: "Production environments" },
      { value: "~90%", label: "Scalability improvement" },
      { value: "0", label: "Continuity incidents during migration" },
    ],
    stack: ["SQL Server", "Azure SQL", "Always On availability groups", "Replication", "PowerShell"],
    needsDetail: true,
  },
  {
    slug: "acquisition-consolidation",
    title: "Two acquisitions, eleven databases, one estate",
    summary:
      "Integrating and consolidating acquired database estates with data integrity, compliance and business continuity held intact.",
    context: [
      "Acquisitions arrive with databases that were never designed to live alongside yours: different schemas, different versions, different assumptions about who may read what, and compliance obligations that do not pause while engineering catches up.",
      "I led the database side of two acquisition-related migrations, integrating eleven databases into the existing estate.",
    ],
    approach: [
      "Mapped each incoming estate before moving anything — what the data meant, who had access to it, and which obligations travelled with it.",
      "Consolidated into the existing platform while maintaining data integrity and compliance throughout, with continuity for the business on both sides of the transaction.",
      "Reconciled access models so that permissions in the acquired systems became permissions we could audit, rather than inherited exceptions nobody owned.",
      ...(DEV ? ["// TODO — the genuinely hard part: schema conflicts, version gaps, differing compliance regimes, or the integration that took three attempts. Name it."] : []),
    ],
    outcome: [
      { value: "2", label: "Acquisition migrations led" },
      { value: "11", label: "Databases integrated" },
      { value: "100%", label: "Data integrity maintained" },
    ],
    stack: ["SQL Server", "Azure SQL", "Migration tooling", "Access control", "Audit reporting"],
    needsDetail: true,
  },
];

export const alsoDelivered = [
  {
    title: "Infrastructure for expansion, inside a two-day SLA",
    body: "Led provisioning and operational readiness for SQL Server infrastructure supporting business expansion into new markets — setup through deployment, consistently within a two-day service commitment.",
  },
  {
    title: "Uptime through the peaks",
    body: "Maintained 100% server uptime with no performance degradation across high-volume wagering periods, by tuning servers, queries and configuration ahead of the load rather than during it.",
  },
  {
    title: "Proof of concept as a discipline",
    body: "Ran feasibility and performance evaluations on monitoring tools, Azure features, data management solutions and database security concepts — benchmarking 15+ configurations and turning the results into recommendations the team could act on.",
  },
];

/* --------------------------------------------------------- ai enablement */

export const aiIntro = {
  lede: "AI adoption in an engineering org tends to stall in the same place: the models are fine, but nobody can safely connect them to the operational data that would make them useful. That connection is a database problem, which is why I find myself in the middle of it.",
};

/** `short` is the one-word label the radial selector shows. */
export const aiWork = [
  {
    title: "An LLM knowledge assistant for the DBA function",
    short: "Assistant",
    body: "Built an internal assistant that answers the questions the database team fields over and over — performance tuning guidance, database standards, operational procedures, data access rules — with context rather than a link to a wiki page.",
    results: [
      "30+ recurring query types absorbed",
      "60+ engineering hours returned each month",
    ],
  },
  {
    title: "Agentic monitoring and incident diagnosis",
    short: "Monitoring",
    body: "Implemented AI-driven monitoring with agentic alert diagnosis and automated incident post-mortem reporting, so that an alert arrives with a first opinion attached and a post-mortem writes its own first draft.",
    results: ["67% reduction in issue resolution time"],
  },
  {
    title: "Six DBA workflows, automated",
    short: "Automation",
    body: "Automated data access requests, task creation, audit reporting, pull request validation, third-party script review and compliance processes using GitHub Actions and GitHub Copilot — the administrative weight that quietly consumes a database team's week.",
    results: ["70% reduction in manual effort", "6 workflows automated"],
  },
  {
    title: "Retrieval groundwork",
    short: "Retrieval",
    body: "Explored vector databases, embeddings and semantic search to improve how operational knowledge is retrieved — the unglamorous layer that decides whether an AI answer is grounded or invented.",
    results: [],
  },
  {
    title: "Evaluating what is actually worth adopting",
    short: "Evaluation",
    body: "Led proofs of concept for Azure Storage Actions, data-plane RBAC, Copilot agents, MCP servers, burst capacity and PostgreSQL index tuning — designing test cases, benchmarking configurations and reporting on performance, scalability, security and cost.",
    results: ["80% efficiency gain", "Cost reduced by a third", "15+ configurations benchmarked"],
  },
];

export const hackathon = {
  eyebrow: "Hackathon 2026",
  title: "People's Choice Award",
  summary:
    "A company-wide hackathon spanning Australia, India and Canada. Our team's entry was a personalisation and social experience concept for the betting product — and it only worked if customer behavioural data could reach the AI layer safely.",
  role: [
    "My part was the connection itself: establishing the data points between Databricks and Microsoft Azure AI Foundry, and making sure that what crossed between them kept its integrity and its access controls.",
    "It is the clearest example I have of why this role matters to AI work. The idea was the team's; the reason it could run on real data rather than a mock-up was the plumbing underneath it.",
    ...(DEV ? ["// TODO — the technical specifics: what moved between Databricks and AI Foundry, how identity and network access were handled, what happened to anything sensitive before the model saw it, and the schema contract the AI layer read from."] : []),
  ],
  image: {
    src: "/assets/images/hackathon.webp",
    alt: "Pooja presenting during the hackathon",
    caption: "Presenting during the hackathon.",
  },
  needsDetail: true,
};

/* ------------------------------------------------------------ experience */

/**
 * Logos for the organisations in `roles` and `education`, keyed by `org`
 * exactly as written there. An organisation missing from this list simply
 * shows no logo. `pointsbet.png` is PointsBet's own app icon, from
 * pointsbet.com.au.
 */
export const orgLogos: Record<string, string> = {
  PointsBet: "/assets/logos/pointsbet.png",
  "The University of Melbourne": "/assets/logos/unimelb.svg",
};

export const roles = [
  {
    title: "Data Services Engineer",
    org: "PointsBet",
    place: "Australia",
    period: "Nov 2022 — present",
    points: [
      "Maintained 100% server uptime and no performance degradation through high-volume periods by optimising database servers, queries and configuration across environments.",
      "Delivered SQL Server infrastructure for business expansion within a two-day SLA, leading provisioning and operational readiness from setup to deployment.",
      "Reduced database issue resolution time by 67% through AI-driven monitoring, agentic alert diagnosis and automated incident post-mortem reporting.",
    ],
  },
  {
    title: "Graduate Data Services Engineer",
    org: "PointsBet",
    place: "Australia",
    period: "Jul 2022 — Nov 2022",
    points: [
      "Migrated 6+ databases from on-premises to Azure, improving scalability by 90% while maintaining business continuity.",
      "Improved database availability to 99.99% by implementing and optimising high availability, replication and recovery across 13 production environments.",
      "Led two acquisition-related database migrations and consolidations, integrating 11 databases with data integrity and compliance intact.",
    ],
  },
  {
    title: "Academic Tutor — Professional IS Consulting",
    org: "The University of Melbourne",
    place: "Australia",
    period: "Feb 2022 — Nov 2025",
    points: [
      "Ran tutorials for a postgraduate information systems consulting subject, alongside a full-time engineering role.",
      "Tracked student progress, identified where comprehension was breaking down, and intervened before it became a grade.",
      "Worked with faculty to keep tutorial content aligned to curriculum objectives and assessment standards.",
    ],
  },
  {
    title: "Project Management Intern",
    org: "Ladder Media",
    place: "India",
    period: "Nov 2021 — Feb 2022",
    points: [
      "Coordinated a team of 20+ across functions, holding task alignment and milestone delivery together.",
      "Managed 50+ project workstreams and dependencies, improving delivery turnaround by 65%.",
      "Refined project plans and presentation material used in investor presentations and funding evaluation.",
    ],
  },
];

export const education = [
  {
    title: "Master of Information Systems (Professional)",
    org: "The University of Melbourne",
    place: "Australia",
    period: "Feb 2021 — Dec 2022",
    notes: [
      "Melbourne School of Engineering Scholarship, 2020",
      "Melbourne Graduate Scholarship, 2022",
      "Dean's Honour List, Faculty of Engineering and IT, 2022",
    ],
  },
  {
    title: "Bachelor of Technology, Computer Science and Engineering",
    org: "SRM Institute of Science and Technology",
    place: "India",
    period: "Jul 2016 — Jun 2020",
    notes: ["First Class with Distinction"],
  },
];

/**
 * The organisations the volunteering sits under. A missing `logo` shows the
 * initials instead, in a badge the same size, so a logo can be added later by
 * dropping the file into public/assets/logos/ and naming it here.
 */
export const volunteerOrgs = {
  unimelb: {
    name: "The University of Melbourne",
    logo: "/assets/logos/unimelb.svg",
    initials: "UoM",
  },
  stemsisters: {
    name: "STEM Sisters",
    logo: "/assets/logos/stemsisters.png" as string | undefined,
    initials: "SS",
  },
} as const;

export type Volunteering = {
  role: string;
  orgKey: keyof typeof volunteerOrgs;
  /** The faculty or programme within the organisation, where there is one. */
  unit?: string;
  /** Shown as written. */
  period: string;
  summary: string;
  body: string[];
  /** The programme's own page. */
  link: string;
  linkLabel: string;
};

/**
 * Grouped by organisation — the University of Melbourne's three roles together,
 * then STEM Sisters — and newest first within each, so the timeline across the
 * list is deliberately not strict.
 *
 * The prose frames what each role involved; it does not claim numbers — how
 * many students, how many sessions — because those are Pooja's to supply and a
 * portfolio is the wrong place to estimate them.
 */
export const volunteering: Volunteering[] = [
  {
    role: "Career and Industry Mentor",
    orgKey: "unimelb",
    period: "Feb 2026 — present",
    summary: "Mentoring current students through the university's industry and alumni programme.",
    body: [
      "The programme pairs current students with working graduates and professionals across STEM, business, law, education and the arts. I mentor on the engineering side.",
      "Most of what a student needs at that point is not technical. It is knowing which parts of a degree carry into a first job, how to read a job description written for someone more senior, and what the first two years of working actually look like. Those are the questions no subject covers, and they are far easier to answer than to find.",
    ],
    link: "https://mentoring.unimelb.edu.au/",
    linkLabel: "The mentoring programme",
  },
  {
    role: "Student Ambassador",
    orgKey: "unimelb",
    unit: "Faculty of Engineering and IT",
    period: "Mar 2021 — Nov 2022",
    summary:
      "Representing the Faculty of Engineering and Information Technology to its students.",
    body: [
      "I worked with the faculty to help students through their time in the department — prospective students deciding whether to come, and current ones working out how to navigate it once they had.",
      "Doing it for nearly two years while studying meant answering, from the other side, the same questions I had been asking a year earlier. That turns out to be the most useful vantage point there is for the job.",
    ],
    link: "https://education.unimelb.edu.au/study/current-students/enrich-your-studies/graduate-education-ambassador-program",
    linkLabel: "The ambassador program",
  },
  {
    role: "STEM Mentor",
    orgKey: "unimelb",
    period: "Mar 2021 — Nov 2021",
    summary: "Mentoring young girls considering a career in STEM.",
    body: [
      "Worked with school-age girls on what careers in STEM actually involve day to day, and on finding which part of it they were drawn to rather than treating it as one undifferentiated choice.",
      "Encouragement in general does very little at that age. What lands is one specific person doing one specific job, described plainly enough that it stops sounding like someone else's life.",
    ],
    link: "https://students.unimelb.edu.au/careers/get-advice/career-mentoring/stem-mentoring-program",
    linkLabel: "The STEM mentoring program",
  },
  {
    role: "Ambassador",
    orgKey: "stemsisters",
    period: "Jul 2023 — Jun 2024",
    summary: "Supporting the mission to empower women of colour in STEM.",
    body: [
      "STEM Sisters works to make science and technology careers reachable for women of colour in Australia.",
      "A good deal of what decides whether someone stays in this field never gets written down — who to ask, what is normal to find hard, which doors are genuinely open. It travels through networks, and it reaches people unevenly. An ambassador's job is to put some of it in front of the people those networks were never going to reach.",
    ],
    link: "https://stemsisters.org.au/",
    linkLabel: "STEM Sisters",
  },
];

export const recognition = [
  {
    title: "Deloitte Award for Professional IS Consulting",
    org: "Faculty of Engineering and Information Technology, University of Melbourne",
  },
  {
    title: "Standout Submission — “Undefined”",
    org: "UMSU Creative Arts, University of Melbourne",
    href: "https://umsu.unimelb.edu.au/news/article/7860/Pooja-Goel-Undefined/",
  },
];

/* ---------------------------------------------------------------- studio */

export const studioIntro = {
  lede: "Face paint, portraits on commission, Indian dance on festival stages, and four years of teaching. None of it is a break from the engineering — it is the same attention paid to a different surface, and it is where the colour on this site comes from.",
  /** The photograph beside the page's name at the top. */
  image: {
    src: "/assets/images/facepaint-lion.webp",
    alt: "A lion design with a painted muzzle and tongue",
    w: 361,
    h: 640,
  },
};

export type StudioBand = {
  slug: string;
  /** Glyph and one-liner used by the jump tiles at the top of the page. */
  icon: IconName;
  blurb: string;
  eyebrow: string;
  title: string;
  body: string[];
  images: { src: string; alt: string; caption?: string; w: number; h: number }[];
  /** Which side the images sit on at desktop width. */
  side?: "left" | "right";
  /** A drawn figure for a band that has no photographs and expects none. */
  figure?: "tutoring";
  /** True for bands whose photographs are still to come, so the layout keeps a slot for them. */
  awaitsImages?: boolean;
  /** True when the images run full width under the prose rather than beside it. */
  gallery?: boolean;
  links?: { label: string; href: string }[];
  note?: { label: string; body: string };
  pullQuote?: string;
  needsDetail?: boolean;
};

export const studioBands: StudioBand[] = [
  {
    slug: "face-painting",
    icon: "palette" as const,
    blurb: "Face paint and balloon twisting, at events",
    eyebrow: "Colourzone Melbourne",
    title: "Face painting",
    body: [
      "I run Colourzone Melbourne — face painting and balloon twisting at events. Which means working fast, on a surface that will not hold still, for someone who is going to look in a mirror the moment you finish and tell you exactly what they think.",
      ...(DEV ? ["// TODO — the story: how it started, what you love about working on a face rather than paper, the thing people do not expect about it."] : []),
      ...(DEV ? ["// TODO — the facts a visitor should actually learn: years doing it, events worked, how long a design takes, the paints you use, what you will not paint."] : []),
    ],
    images: [
      { src: "/assets/images/facepaint-tiger-cub.webp", alt: "A toddler painted as a tiger cub", w: 360, h: 640 },
      { src: "/assets/images/facepaint-lion.webp", alt: "A lion design with a painted muzzle and tongue", w: 361, h: 640 },
      { src: "/assets/images/facepaint-peacock-face.webp", alt: "A peacock design in green and gold across one side of the face", w: 361, h: 640 },
      { src: "/assets/images/facepaint-crown.webp", alt: "A blue and gold crown design across the brow", w: 360, h: 640 },
      { src: "/assets/images/facepaint-spider.webp", alt: "A spider design on the cheek, lit in purple", w: 360, h: 640 },
      { src: "/assets/images/facepaint-skull.webp", alt: "A skull design painted for Halloween", w: 360, h: 640 },
    ],
    gallery: true,
    side: "right",
    links: [{ label: site.instagramHandle, href: site.instagram }],
    pullQuote: "No second attempt, no undo, and the client is five years old.",
    needsDetail: true,
  },
  {
    slug: "portraiture",
    icon: "frame" as const,
    blurb: "Portraits and commissioned pieces",
    eyebrow: "Portraiture & commissions",
    title: "Commission work",
    body: [
      "I draw portraits, and I take commissions — pieces made for a particular person, for a particular wall.",
      "One of them, a portrait called Undefined, was selected as a Standout Submission by UMSU Creative Arts at the University of Melbourne. I named it that because there was no tag I could put on her: beauty, elegance, grace, royalty, every majestic attribute possible, and still not reducible to any of them. She represents no one but herself, and cannot be like anyone else.",
      ...(DEV ? ["// TODO — medium, what a typical commission is, roughly how long a piece takes, and how someone starts one."] : []),
    ],
    images: [
      {
        src: "/assets/images/artwork-peacock.webp",
        alt: "A commissioned painting of a peacock and a kiwi in ink and colour",
        w: 361,
        h: 536,
        caption: "A commissioned pair — a peacock and a kiwi.",
      },
    ],
    side: "left",
    links: [
      { label: site.instagramHandle, href: site.instagram },
      {
        label: "Read it on UMSU Creative Arts",
        href: "https://umsu.unimelb.edu.au/news/article/7860/Pooja-Goel-Undefined/",
      },
    ],
    note: {
      label: "Standout Submission",
      body: "UMSU Creative Arts, University of Melbourne",
    },
    needsDetail: true,
  },
  {
    slug: "dance",
    icon: "note" as const,
    blurb: "Indian classical and folk, on festival stages",
    eyebrow: "Stage",
    title: "Dance",
    body: [
      "Indian classical and folk dance, which in Australia has meant festival stages rather than studio recitals — Diwali: Festival of Lights at Federation Square, the routine carried on a screen several storeys high above a crowd that filled the square, and Ente Keralam in full Kerala costume under stage lighting.",
      "Group choreography is an odd kind of engineering. Six people, one count, and a routine that only holds together if everybody keeps their own timing while watching everyone else's.",
      ...(DEV ? ["// TODO — which years, which forms specifically, the group you perform with, and any other events worth naming."] : []),
    ],
    images: [
      {
        src: "/assets/images/dance-stage.webp",
        alt: "Pooja and her group mid-routine in Kerala costume on a lit stage",
        w: 1500,
        h: 1000,
        caption: "Ente Keralam.",
      },
    ],
    side: "right",
    needsDetail: true,
  },
  {
    slug: "tutoring",
    icon: "book" as const,
    figure: "tutoring" as const,
    blurb: "Four years of it, at the University of Melbourne",
    eyebrow: "The University of Melbourne",
    title: "Tutoring",
    body: [
      "For nearly four years I tutored Professional IS Consulting at the University of Melbourne, on weeknights and weekends, while working full time on production databases.",
      "The subject sits where technology meets the people paying for it: scoping work, reading a client properly, turning an ambiguous problem into something a team can actually deliver. Students arrived good at systems and uncertain about everything surrounding them.",
      "What four years of that teaches you is diagnostic. You stop explaining the thing and start finding the specific place where someone's understanding breaks — because the explanation that works is almost never the one you prepared.",
      "It is the same instinct the database work runs on. An internal knowledge assistant is only useful if it meets someone where their confusion actually is. A post-mortem is only worth writing if the next person understands it. Documentation, standards, onboarding, incident reviews — all of it is teaching with a different audience.",
      ...(DEV ? ["// TODO — what the subject actually covered week to week, and roughly how many students across the four years."] : []),
    ],
    images: [],
    side: "left",
    pullQuote:
      "The explanation that works is almost never the one you prepared.",
    needsDetail: true,
  },
];

/* -------------------------------------------------------- recommendations */

/**
 * LinkedIn recommendations, shown at the foot of the Work page.
 *
 * The section renders nothing at all while this array is empty, so there is
 * never a half-finished block on the site. Paste each one as written on
 * LinkedIn; do not paraphrase someone else's words.
 */
export type Recommendation = {
  /**
   * The line shown before anyone clicks — their words, not a summary of them.
   * Quoting is fine; paraphrasing someone else's recommendation is not.
   */
  highlight: string;
  /** The rest of it. Omitted when the highlight is the whole thing. */
  quote?: string[];
  name: string;
  /** Their title when they wrote it. */
  role: string;
};

/**
 * Written by colleagues and managers. Lightly trimmed, never reworded, and
 * every trim marked with an ellipsis. Two deliberate omissions, both noted
 * where they occur: an internal compliance matter, and a company value whose
 * name does not belong on a public page. Internal system names are cut the
 * same way — an ellipsis where one sat inline, and the whole parenthetical
 * where it was an aside.
 */
export const recommendations: Recommendation[] = [
  {
    name: "May Lozano",
    role: "Engineering Manager, Data Services · PointsBet",
    highlight:
      "Pooja consistently demonstrates deep technical ownership, attention to detail and problem-solving mindset.",
    quote: [
      "A long overdue shoutout to Pooja Goel who took full ownership of … prep works in the DB space. She not only identified queries that would have been pain points during busy AFL and race days but she came up with recommendations/tweaks and worked closely with Value Streams to address the risks.",
      "She also proactively seeks out ways to eliminate recurring and mundane tasks such as archiving … data to improve performance, and she did this by identifying and implementing robust, long-term solutions. Pooja consistently demonstrates deep technical ownership, attention to detail and problem-solving mindset.",
    ],
  },
  {
    name: "Praveen Kumar",
    role: "Head of Data, Technology · PointsBet",
    highlight:
      "The level of planning she demonstrated ensured a seamless upgrade with zero impact on the operations.",
    quote: [
      "Shoutout to Pooja Goel for the upgrade of SQL Server and PostgreSQL flexible servers to latest and greatest version of each database platform. … Despite the hurdles that came with unsupported features from version gaps and dependencies on application deployment, she took all necessary precautions and spent hours in preparation to cover all cases that can go wrong with the upgrade. The level of planning she demonstrated ensured a seamless upgrade with zero impact on the operations.",
      "Synergy With Other Teams — she exemplified this value through collaboration and communication with other teams, making it instrumental for the ifs and buts across all parties to transpire resulting to No Surprises during the activities.",
    ],
  },
  {
    name: "Hung Vu",
    role: "Engineering Manager, Technology · PointsBet",
    highlight:
      "Not only did the introduction of TTL on the documents address the throttling issue on the container, it also improved the back-end performance.",
    quote: [
      "Shoutout to Pooja Goel for the optimization work she did on casino data store. Not only did the introduction of TTL (time to live) on the documents address the throttling issue on the container, it also improved the back-end performance which calculates the trending and popular casino games.",
    ],
  },
  {
    name: "Tulika Kalra",
    role: "Strategic Human Resource Professional · Gap Inc.",
    highlight: "You will be a great asset to any team & to any organization.",
    quote: [
      "This goes out to the most awesome team member. All the best! Rise and Shine!! You will be a great asset to any team & to any organization.",
    ],
  },
  {
    name: "Neha Chopra",
    role: "Managing Director · Great Place to Work India",
    highlight: "Proactive, Inspiring, Energetic, Compassionate — an amazing intern in Pooja Goel.",
  },
];

/* --------------------------------------------------------------- journey */

export type JourneyEntry = {
  title: string;
  meta: string;
  /** The organisation's logo, for the history entries that have one. */
  logo?: string;
  body?: string;
  points?: string[];
  /** Singapore only: what the market needs, then what she brings to it. */
  market?: string;
  fit?: string;
};

export type JourneyGroup = {
  title: string;
  entries: JourneyEntry[];
};

export type JourneyStop = {
  key: "india" | "australia" | "singapore";
  label: string;
  years: string;
  heading: string;
  lede: string;
  /**
   * Two groups for the places she has lived — education beside work. Singapore
   * has one, because it is about what that market is working through rather
   * than a history. A single group renders without its title.
   */
  groups: JourneyGroup[];
};

/**
 * `roles` and `education` stay the single source for the history: the map
 * reads them rather than restating them, so the two cannot drift apart.
 * `roles` is already newest-first, which is the order wanted here — the
 * current PointsBet role leads.
 */
const rolesIn = (place: string): JourneyEntry[] =>
  roles
    .filter((role) => role.place === place)
    .map((role) => ({
      title: role.title,
      meta: `${role.org} · ${role.period}`,
      logo: orgLogos[role.org],
      points: role.points,
    }));

const educationIn = (place: string): JourneyEntry[] =>
  education
    .filter((item) => item.place === place)
    .map((item) => ({
      title: item.title,
      meta: `${item.org} · ${item.period}`,
      logo: orgLogos[item.org],
      points: item.notes,
    }));

export const journey: JourneyStop[] = [
  {
    key: "india",
    label: "India",
    years: "2016 — 2022",
    heading: "Where the engineering started",
    lede: "Four years of computer science and engineering, and a first stint holding a delivery schedule together.",
    groups: [
      { title: "Education", entries: educationIn("India") },
      { title: "Work", entries: rolesIn("India") },
    ],
  },
  {
    key: "australia",
    label: "Australia",
    years: "2021 — present",
    heading: "Where it became production work",
    lede: "A master's in Melbourne, then over four years running database services for a licensed wagering platform — where a slow query is a lost customer and an outage is a regulatory conversation.",
    groups: [
      { title: "Education", entries: educationIn("Australia") },
      { title: "Work", entries: rolesIn("Australia") },
    ],
  },
  {
    key: "singapore",
    label: "Singapore",
    years: "Based here",
    heading: "What the market here is solving for",
    lede: "Singapore is working through the same combination I have spent over four years inside: regulated data, cloud migration under real constraints, and AI that has to run on operational systems rather than in a demo.",
    groups: [
      {
        title: "Where the work lands",
        entries: [
          {
            title: "Legacy estates that have to reach the cloud intact",
            meta: "Cloud migration",
            market: "Modernisation here is gated less by appetite than by the risk of moving systems that cannot stop.",
            fit: "I have already made that move: six-plus production databases from on-premises to Azure with business continuity held throughout, and eleven more consolidated through two acquisitions with integrity and compliance intact.",
          },
          {
            title: "AI that is limited by the data underneath it",
            meta: "AI enablement",
            market: "The national AI programmes have pushed adoption into ordinary enterprises, which makes data quality, lineage and access control the constraint rather than the model.",
            fit: "That data-to-AI join is exactly what I built for the hackathon: wiring Databricks into Azure AI Foundry so the AI layer read governed, intact data.",
          },
          {
            title: "Regulated workloads where the operator stays accountable",
            meta: "Governance",
            market: "Two regimes point the same way. The PDPA makes an organisation accountable for personal data it holds however many processors sit underneath, and the financial sector's rules treat cloud as outsourcing, so oversight and recoverability stay with the institution whoever runs the hardware. Both come down to knowing where data sits and who touched it.",
            fit: "Licensed wagering taught me exactly that discipline: tested restores, rehearsed failovers, auditable access, and changes that can be reversed.",
          },
          {
            title: "Availability measured as a commercial number",
            meta: "Reliability",
            market: "Trading hours, settlement windows and peak events do not negotiate, so high availability, replication, disaster recovery and honest RTO and RPO targets are an ongoing discipline rather than a project with an end date.",
            fit: "That is already my day job: 99.99% availability across 13 production environments, and 100% server uptime through peak wagering periods.",
          },
        ],
      },
    ],
  },
];
