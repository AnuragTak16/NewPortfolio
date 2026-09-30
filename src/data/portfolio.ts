export const site = {
  name: 'Anurag Tak',
  role: 'Full Stack Developer',
  email: 'anuragtak16@gmail.com',
  location: 'Bengaluru, India',
  phone: '+91 9340392268',
  summary:
    'Full-stack developer with 2+ years shipping production web apps — Node.js, Express, TypeScript, MongoDB, and Python  owning features from schema to UI.',
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
    label: 'DataBase',
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
    category: 'SaaS · MERN · TypeScript',
    description:
      'Multi-tenant studio ops — students, enrollment, attendance, and Stripe billing in one product.',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    image: '/projects/enrollio.png',
    hue: 'from-[#e24a2c]/35 to-[#0b1f3a]/15',
  },
  {
    id: '02',
    title: 'Restaurant Waitlist',
    year: '2024',
    category: 'Realtime · Backend',
    description:
      'Capacity-aware seating, waitlists, atomic booking, and live table status over Socket.IO.',
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
      'End-to-end features across Python, Node, Express, React, and MongoDB — schema, REST APIs, JWT, and UI. Shipped 15+ endpoints and reusable React/Tailwind components.',
    stack: ['Python', 'Node.js', 'React', 'MongoDB', 'JWT'],
  },
  {
    period: '2020 — 2024',
    role: 'B.Tech CSE (AI & ML)',
    company: 'Acropolis Institute of Technology and Research',
    detail:
      'CSE with AI & ML focus. CGPA 8.3. Foundations in DSA, systems, and full-stack product work.',
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
  { label: 'APIs shipped', value: '15+' },
  { label: 'Degree CGPA', value: '8.3' },
]
