export const site = {
  name: 'Anurag Tak',
  role: 'Full Stack Developer',
  email: 'anuragtak16@gmail.com',
  location: 'Bengaluru, India',
  phone: '+91 9340392268',
  summary:
    'Full Stack Developer with 2+ years of experience building and shipping production-grade web applications — strong in Node.js, Express, TypeScript, MongoDB, and Python backends, comfortable owning features end-to-end.',
}

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#connect', label: "Let's Connect" },
] as const

export const skills = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Express',
  'Python',
  'FastAPI',
  'MongoDB',
  'PostgreSQL',
  'Socket.IO',
  'Stripe',
  'Docker',
  'AWS',
  'Tailwind CSS',
]

export const stackGroups = [
  {
    label: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'REST APIs', 'Socket.IO', 'JWT'],
  },
  {
    label: 'Data',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Kafka', 'SQLAlchemy'],
  },
  {
    label: 'Delivery',
    items: ['Docker', 'GitHub Actions', 'AWS', 'Azure', 'Nginx', 'Vercel'],
  },
]

export const projects = [
  {
    id: '01',
    title: 'Dance Studio Platform',
    year: '2025',
    category: 'SaaS · MERN',
    description:
      'Multi-tenant dance studio management — student profiles, enrollment workflows, attendance views, and Stripe subscription billing.',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    hue: 'from-[#e24a2c]/35 to-[#0b1f3a]/15',
  },
  {
    id: '02',
    title: 'Restaurant Waitlist',
    year: '2024',
    category: 'Realtime · Backend',
    description:
      'US restaurant reservation platform with capacity-based seating, waitlists, atomic booking, and live table status over Socket.IO.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Socket.IO'],
    hue: 'from-[#3d5a80]/40 to-[#0b1f3a]/12',
  },
]

export const experience = [
  {
    period: 'Jul 2024 — Present',
    role: 'Full Stack Developer',
    company: 'DAAS – Developer-as-a-Service',
    detail:
      'Owning end-to-end features across Python, Node.js, Express, React, and MongoDB — schema design, REST APIs, JWT auth, and frontend integration. Shipped 15+ API endpoints and reusable React/Tailwind components for production workflows.',
    stack: ['Python', 'Node.js', 'React', 'MongoDB', 'JWT'],
  },
  {
    period: '2020 — 2024',
    role: 'B.Tech CSE (AI & ML)',
    company: 'Acropolis Institute of Technology and Research',
    detail:
      'Computer Science Engineering with AI & ML focus. CGPA 8.3. Built foundations in data structures, systems design, and full-stack product work.',
    stack: ['DSA', 'AI/ML', 'Web', 'Systems'],
  },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/AnuragTak16' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anurag-tak' },
  { label: 'Email', href: 'mailto:anuragtak16@gmail.com' },
]

export const aboutStats = [
  { label: 'Years shipping', value: '02+' },
  { label: 'REST APIs shipped', value: '15+' },
  { label: 'CGPA', value: '8.3' },
]
