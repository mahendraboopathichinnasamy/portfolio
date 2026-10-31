import {
  Profile,
  StatItem,
  SocialLink,
  Skill,
  Project,
  EducationItem,
  CertificationItem,
} from '@/types/portfolio';

export const profileData: Profile = {
  name: 'Mahendra Boopathi.C',
  titles: [
    'Junior Application Developer',
    'Flutter & Ionic Mobile Developer',
    'Full Stack Web Developer',
    'Python Programmer & Data Analyst',
  ],
  role: 'Junior Application Developer',
  tagline:
    'Building cross-platform mobile applications with Flutter & Ionic, responsive full-stack web solutions, and Python software.',
  summary:
    'Junior Application Developer and B.Com (Computer Applications) graduate with hands-on expertise in cross-platform mobile app development (Flutter, Ionic), full-stack web engineering (HTML, CSS, JavaScript, Node.js), and Python programming. Holds industry certifications in Advanced Python (GUVI) and Full Stack Web Development (Udemy) with a solid foundation in data visualization (Power BI, Tableau) and AI tools.',
  email: 'mahendraboopathichinnasamy@gmail.com',
  phone: '+919345260331',
  phoneDisplay: '+91 93452 60331',
  location: 'Thirumoorthi nager, Udumalpet, Tamil Nadu, India',
  availability: 'Available for Full-time Roles & Projects',
  resumeDownloadUrl: '#contact',
};

export const heroStats: StatItem[] = [
  {
    id: 'certifications',
    value: '2+',
    label: 'Industry Certifications',
    sublabel: 'GUVI & Udemy Certified',
    icon: 'Award',
  },
  {
    id: 'projects',
    value: '12+',
    label: 'App & Web Implementations',
    sublabel: 'Mobile, Full Stack & Python',
    icon: 'Layers',
  },
  {
    id: 'skills',
    value: '10+',
    label: 'Core Technologies',
    sublabel: 'Flutter, Ionic, Web & Python',
    icon: 'Cpu',
  },
  {
    id: 'academic',
    value: '83%',
    label: 'Academic Merit',
    sublabel: 'Higher Secondary Distinction',
    icon: 'GraduationCap',
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    platform: 'GitHub',
    url: 'https://github.com',
    icon: 'Github',
    ariaLabel: 'Visit GitHub Profile of Mahendra Boopathi',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'Linkedin',
    ariaLabel: 'Connect on LinkedIn with Mahendra Boopathi',
  },
  {
    id: 'email',
    platform: 'Email',
    url: 'mailto:mahendraboopathichinnasamy@gmail.com',
    icon: 'Mail',
    ariaLabel: 'Send an Email to Mahendra Boopathi',
  },
  {
    id: 'phone',
    platform: 'Phone',
    url: 'tel:+919345260331',
    icon: 'Phone',
    ariaLabel: 'Call Mahendra Boopathi',
  },
];

export const skillsData: Skill[] = [
  {
    id: 'mobile-dev',
    name: 'Mobile App Architecture',
    category: 'mobile',
    level: 'Advanced',
    percentage: 88,
    icon: 'Layers',
    color: '#38BDF8',
    description: 'State management, offline caching, REST API mobile integration, and touch gesture UI/UX.',
    yearsOfExperience: '1+ Years',
    relatedProjects: ['PulseSync Mobile', 'FocusBoard Mobile View'],
    shortNote: 'Implemented smooth touch interactions, secure local storage, and background sync logic.',
  },
  {
    id: 'fullstack-web',
    name: 'Fullstack web development',
    category: 'backend',
    level: 'Advanced',
    percentage: 86,
    icon: 'Server',
    color: '#00E5FF',
    description: 'Full-stack web applications, REST APIs, Node.js, Express, frontend integration, and database connectivity.',
    yearsOfExperience: '1.5+ Years',
    relatedProjects: ['FocusBoard Daily Planner', 'Student Backend Service'],
    shortNote: 'Engineered end-to-end web architectures connecting responsive frontends to RESTful backend endpoints.',
  },
  {
    id: 'python',
    name: 'Python Programming',
    category: 'backend',
    level: 'Advanced',
    percentage: 90,
    icon: 'Terminal',
    color: '#00E5FF',
    description: 'Data structures, algorithms, modular programming & CLI automation (GUVI Certified).',
    yearsOfExperience: '2+ Years',
    relatedProjects: ['Student Result Management', 'Data Analytics Engine'],
    shortNote: 'Mastered loops, dictionary data models, and automated cohort result computations.',
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'frontend',
    level: 'Expert',
    percentage: 92,
    icon: 'Layout',
    color: '#00E5FF',
    description: 'Semantic markup, Flexbox/Grid, mobile-first responsive UI & glassmorphism styling.',
    yearsOfExperience: '2+ Years',
    relatedProjects: ['FocusBoard UI', 'Portfolio Site', 'Web Templates'],
    shortNote: 'Engineered pixel-perfect WCAG accessible layouts with dark mode cyan aesthetic.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    level: 'Advanced',
    percentage: 88,
    icon: 'Code2',
    color: '#22D3EE',
    description: 'Dynamic DOM manipulation, async/await, modern modular programming & interactive app logic.',
    yearsOfExperience: '2+ Years',
    relatedProjects: ['FocusBoard Daily Planner', 'Aura AI Copilot'],
    shortNote: 'Crafted dynamic event-driven frontends with async REST API communication and validation.',
  },
  {
    id: 'powerbi-tableau',
    name: 'Power BI & Tableau',
    category: 'data',
    level: 'Advanced',
    percentage: 84,
    icon: 'BarChart3',
    color: '#38BDF8',
    description: 'Visual storytelling, KPI dashboards, interactive charts & performance tracking.',
    yearsOfExperience: '1+ Years',
    relatedProjects: ['Executive Sales & BI Suite', 'Student Academic Portal'],
    shortNote: 'Designed executive dashboards tracking revenue ($1.2M), conversion funnels, and geo-maps.',
  },
  {
    id: 'flutter',
    name: 'Flutter & Dart',
    category: 'mobile',
    level: 'Advanced',
    percentage: 88,
    icon: 'Smartphone',
    color: '#00E5FF',
    description: 'Cross-platform Android & iOS development, reactive widget trees, and smooth animations.',
    yearsOfExperience: '1+ Years',
    relatedProjects: ['PulseSync Mobile App', 'TaskFlow UI'],
    shortNote: 'Engineered 60fps responsive mobile layouts with custom widgets and offline-first state handling.',
  },
];

export const projectsData: Project[] = [
  {
    id: 'pulsemobile-app',
    title: 'PulseSync — Mobile Activity & Wellness App',
    subtitle: 'Cross-Platform Mobile Application (Flutter & Ionic)',
    category: 'Cross-Platform Mobile Application',
    techCategory: 'mobile',
    description:
      'A fluid cross-platform mobile app built with Flutter and Ionic featuring mood tracking, daily task scheduling, real-time activity charts, and offline-first persistence.',
    longDescription:
      'Engineered a high-performance cross-platform mobile application combining Flutter widget architecture and Ionic hybrid development principles. The app delivers a modern dark cyber UI with mood-based check-ins, interactive weekly analytics graphs, dynamic task management, and seamless offline data caching.',
    highlights: [
      'Built with Flutter and Dart delivering 60fps smooth gestures and reactive state updates',
      'Leveraged Ionic Framework and Capacitor for hybrid mobile deployment and cross-device testing',
      'Engineered offline-first local data persistence with background REST API synchronization',
      'Designed responsive dark cyber mobile UI with mood-based logging and health progress rings',
      'Tested across both Android and iOS screen resolutions and native hardware profiles',
    ],
    tags: ['Flutter', 'Dart', 'Ionic Framework', 'Capacitor', 'Mobile UI/UX', 'REST API', 'Cross-Platform'],
    image: '/images/mobile-app.jpg',
    metrics: 'Cross-Platform Android & iOS · 60fps Fluid Motion · Offline Persistence',
    demoUrl: '#mobile-preview',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'focusboard',
    title: 'FocusBoard — Smart Daily Planner',
    subtitle: 'Full Stack Web Application',
    category: 'Full Stack Web Application',
    techCategory: 'web',
    description:
      'A full-stack daily planner application featuring mood-based task prioritization and responsive glassmorphism UI.',
    longDescription:
      'Designed and developed a complete smart daily planner that dynamically shifts task prioritization based on user mood (Energetic, Calm, Focused). Engineered a robust Node.js and Express.js REST API with file/JSON-based data persistence, delivering intuitive end-to-end task workflow management.',
    highlights: [
      'Engineered backend REST API using Node.js and Express.js with JSON-based persistence',
      'Built a complete responsive frontend using Vanilla HTML, CSS & JavaScript with intuitive UI/UX',
      'Implemented full CRUD operations for task lifecycle management',
      'Engineered dynamic mood-based filtering logic on the client side',
      'Demonstrates end-to-end software development capability from UI design to API integration',
    ],
    tags: ['Node.js', 'Express.js', 'JavaScript', 'HTML5 & CSS3', 'REST API', 'JSON Persistence'],
    image: '/images/focusboard.jpg',
    metrics: 'Mood-Based Prioritization · RESTful CRUD API · Responsive Glass UI',
    demoUrl: '#focusboard-preview',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'student-result-management',
    title: 'Student Result Management System',
    subtitle: 'Python Academic Computing Engine',
    category: 'Python Application & Analytics',
    techCategory: 'python',
    description:
      'A command-line academic processing system for managing, calculating, and presenting student performance metrics and grade distributions.',
    longDescription:
      'Developed a comprehensive Python command-line engine to automate academic result processing. The system collects student data, computes aggregate marks, calculates accurate percentages/averages, and assigns grade classifications with automated pass/fail cohort reports.',
    highlights: [
      'Developed command-line application to manage, calculate, and display student academic results',
      'Implemented features for student details entry, marks computation, and grade classification',
      'Applied core Python concepts: loops, conditionals, functions, lists, and dictionaries for data management',
      'Generated cleanly formatted result summaries with pass/fail status for multiple students',
      'Optimized algorithmic data lookups and validation checks',
    ],
    tags: ['Python 3', 'Data Structures', 'CLI Application', 'Algorithms', 'Academic Analytics'],
    image: '/images/student-management.jpg',
    metrics: '94%+ Pass Analytics · Multi-Student Batch Computation',
    demoUrl: '#student-preview',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'bi-analytics-suite',
    title: 'Executive Sales & BI Analytics Suite',
    subtitle: 'Data Visualization & Intelligence Dashboard',
    category: 'Business Intelligence & Data Visualization',
    techCategory: 'data',
    description:
      'Interactive executive analytics dashboard built with Power BI and Tableau methodologies for multi-dimensional business KPI analysis.',
    longDescription:
      'Crafted an interactive business intelligence suite turning multi-channel sales and operational data into clear strategic insights. Features real-time conversion doughnuts, revenue forecasting graphs, and regional geographic maps.',
    highlights: [
      'Engineered multi-metric KPI tracking for revenue ($1.2M), conversion rates, and order values',
      'Designed interactive trend forecasting graphs spanning 12-month fiscal periods',
      'Implemented regional drill-downs and customer segmentation filters',
      'Grounded in industry-standard Power BI & Tableau data modeling methodologies',
    ],
    tags: ['Power BI', 'Tableau', 'Data Visualization', 'Python', 'KPI Dashboards'],
    image: '/images/bi-analytics.jpg',
    metrics: 'Real-time KPI Tracking · 12-Month Forecasting · Visual Drill-Downs',
    demoUrl: '#bi-preview',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'aura-dev-workspace',
    title: 'Aura Workspace — Task Orchestrator & Console',
    subtitle: 'Full-Stack Next.js & TypeScript Cloud Console',
    category: 'Cloud Workspace & Full Stack',
    techCategory: 'web',
    description:
      'Full-stack developer workspace featuring real-time task orchestration, modular architecture, glassmorphic UI, and developer tools.',
    longDescription:
      'Built a cutting-edge developer productivity console utilizing Next.js, TypeScript, and modern component architectures. Delivers instant code navigation, context-aware command panels, and high-performance interactive modules.',
    highlights: [
      'Integrated command palette shortcuts and terminal output panels',
      'Architected responsive glassmorphism interface styled with cyan glowing borders',
      'Built with Next.js App Router, TypeScript, and Framer Motion micro-interactions',
      'Modular state architecture and responsive mobile layout',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Developer Tools', 'Framer Motion'],
    image: '/images/ai-copilot.jpg',
    metrics: 'Task Orchestration · Glassmorphism Design · Zero-Latency UI',
    demoUrl: '#aura-preview',
    githubUrl: 'https://github.com',
    featured: true,
  },
];

export const educationData: EducationItem[] = [
  {
    id: 'degree',
    institution: 'Sree Saraswathi Thyagaraja College',
    degree: 'B.Com (Computer Application)',
    score: '76%',
    year: '2026 Graduating',
    details: 'Comprehensive study of computer applications, mobile application principles, web technologies, and business computing.',
  },
  {
    id: 'hsc',
    institution: 'R.V.G Higher Secondary School',
    degree: 'Higher Secondary Certificate (HSC - 12th Grade)',
    score: '83%',
    year: '2023',
    details: 'Achieved strong academic distinction with excellent foundation in mathematics and analytical problem solving.',
  },
  {
    id: 'sslc',
    institution: 'R.V.G Higher Secondary School',
    degree: 'Secondary School Leaving Certificate (SSLC - 10th Grade)',
    score: '83%',
    year: '2021',
    details: 'First-class academic record demonstrating consistency and disciplined problem solving.',
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: 'guvi-python',
    title: 'Advanced Python Programming',
    issuer: 'GUVI Online Course',
    type: 'Professional Certification',
    description:
      'Successfully completed comprehensive training covering advanced Python concepts, object-oriented principles, algorithmic problem solving, and complex data structures.',
    skillsAcquired: ['Advanced Python', 'Data Structures', 'Algorithm Design', 'Modular Programming'],
  },
  {
    id: 'udemy-fullstack',
    title: 'Full Stack Web Development',
    issuer: 'Udemy Online Course',
    type: 'Professional Certification',
    description:
      'Completed end-to-end full stack development training spanning frontend technologies (HTML5, CSS3, JavaScript ES6+), backend architecture (Node.js, Express.js), RESTful APIs, and database fundamentals.',
    skillsAcquired: ['Full Stack Architecture', 'Node.js & Express', 'REST APIs', 'Modern JavaScript'],
  },
];

export const interestsAndLanguages = {
  languages: [
    { name: 'Tamil' },
    { name: 'English' },
  ],
  interests: [
    'Cross-Platform Mobile App Engineering (Flutter & Ionic)',
    'Full Stack Web Development and Responsive User Interfaces',
    'Programming and Algorithmic Problem Solving in Python',
    'Leveraging AI Tools to Automate and Enhance Development Workflows',
    'Building Practical Software that Solves Real-World Problems',
  ],
};
