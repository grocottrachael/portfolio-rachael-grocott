/* Experience, skills and the things around the work, from Rachael's CV */

export type Role = {
  company: string;
  what: string;
  dates: string;
  highlight?: string;
  body: string;
  introduced?: string[];
  current?: boolean;
  /* a case study about this role */
  study?: string;
};

export const roles: Role[] = [
  {
    company: 'Graphy',
    what: 'AI graph maker, SDK and Agents',
    dates: 'Apr 2021 – now',
    highlight: 'Took the design from web app to SDK',
    body: 'Leading all of design in a small startup, working closely with the founders. Day to day I code interactive explorations and work with engineers to ship production-quality work. I also make demos, SDK playgrounds and sales materials with our go-to-market team, and use data like adoption and retention to decide what’s next. I like moving fast and wearing a lot of hats.',
    current: true,
    study: 'graphy',
  },
  {
    company: 'Trint',
    what: 'Voice to text transcription for journalists',
    dates: 'Dec 2020 – Apr 2021',
    highlight: 'Led a native app redesign',
    body: 'Design lead for the Enterprise, Growth and Mobile teams. Led a rethink of the native app with a Google design sprint, grounding choices in user research and business analytics, and built a habit of measuring every shipped feature against user sentiment and conversion.',
    introduced: ['Design system', 'Design principles', 'Critiques', 'Shape Up'],
    study: 'trint',
  },
  {
    company: 'Geckoboard',
    what: 'TV dashboards for real-time KPIs',
    dates: 'Aug 2018 – Dec 2020',
    highlight: 'Introduced the design system',
    body: 'Worked in a product trio, sharing accountability for outcomes. Defined and tracked success measures, and used the evidence to decide when to iterate, change direction or move on.',
    introduced: ['Design system', 'Component library (front end)', 'Design crits', 'Design pairing'],
    study: 'geckoboard',
  },
  {
    company: 'UVD',
    what: 'Product design and build agency',
    dates: 'Jul 2013 – Aug 2018',
    highlight: 'A trading platform for major banks',
    body: 'Designed complex products for startups and global companies: a trading platform used by the world’s major banks, a web app councils use to control street lighting, and a real-estate database for landlords.',
  },
];

export const coreSkills = [
  'AI design',
  'AI prototyping',
  'First-principles thinking',
  'Outcome-driven design',
  'User research',
  'User testing',
  'Product thinking',
  'Wireframing',
  'Agile working',
  'Visual polish',
  'DX',
  'Clear IA',
];

export const softSkills = ['Coaching and mentoring', 'Communication', 'Storytelling', 'Collaboration', 'Adaptability', 'Empathy'];

export const beyond: { title: string; body: string }[] = [
  { title: 'Founded Triangirls', body: 'A community for women in tech that I founded and ran for years, growing it past 2,000 members.' },
  { title: 'Talks & workshops', body: 'I’ve spoken for companies like Samsung, and I run sessions like How to give and receive feedback.' },
  { title: 'In the press', body: 'Interviewed by VICE, and wrote regularly for Netmag (RIP).' },
  { title: 'Mentoring', body: 'I mentor designers through ADP List, trained with The Creative Mentor Network, and coached the brilliant women who helped me run Triangirls.' },
];

export const education = [
  { where: 'Northumbria University, School of Design', what: 'Interactive Media Design, BA (Hons) 2:1' },
  { where: 'The Creative Mentor Network', what: 'Mentor training' },
];

export const interests = ['Product strategy', 'Public speaking', 'Diversity & inclusion', 'Running', 'Travel', 'Gigs & festivals', 'Crafting'];
