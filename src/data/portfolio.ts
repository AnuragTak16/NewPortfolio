export const site = {
  name: 'Anurag Tak',
  role: 'Frontend Engineer',
  email: 'hello@anuragtak.dev',
  location: 'India',
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
  'GSAP',
  'Tailwind',
  'Node.js',
  'Design Systems',
  'Motion Design',
  'Vite',
  'UI Craft',
]

export const stackGroups = [
  {
    label: 'Interface',
    items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS'],
  },
  {
    label: 'Motion',
    items: ['GSAP', 'ScrollTrigger', 'Lenis', 'Framer Motion', 'CSS'],
  },
  {
    label: 'Systems',
    items: ['Storybook', 'Design Tokens', 'Radix', 'shadcn/ui', 'Figma'],
  },
  {
    label: 'Delivery',
    items: ['Node.js', 'REST', 'Git', 'Vercel', 'Performance'],
  },
]

export const projects = [
  {
    id: '01',
    title: 'Orbit Analytics',
    year: '2025',
    category: 'Product UI',
    description:
      'A realtime insights dashboard with kinetic charts and calm information hierarchy.',
    stack: ['React', 'TypeScript', 'D3'],
    hue: 'from-[#0a7a6c]/35 to-[#0b1220]/15',
  },
  {
    id: '02',
    title: 'Northline Studio',
    year: '2024',
    category: 'Brand Site',
    description:
      'A scroll-driven studio site where typography and pacing carry the narrative.',
    stack: ['Vite', 'GSAP', 'Tailwind'],
    hue: 'from-[#3d5a80]/40 to-[#0b1220]/12',
  },
  {
    id: '03',
    title: 'Pulse Commerce',
    year: '2024',
    category: 'E-commerce',
    description:
      'A conversion-focused storefront with tactile micro-interactions and fast browsing.',
    stack: ['Next.js', 'Stripe', 'CMS'],
    hue: 'from-[#7a8fa6]/45 to-[#0b1220]/12',
  },
  {
    id: '04',
    title: 'Atlas Docs',
    year: '2023',
    category: 'Design System',
    description:
      'Component library and docs that keep product teams shipping consistent UI.',
    stack: ['Storybook', 'React', 'Tokens'],
    hue: 'from-[#0b1220]/30 to-[#d8f0eb]/45',
  },
]

export const experience = [
  {
    period: '2024 — Present',
    role: 'Senior Frontend Engineer',
    company: 'Studio Current',
    detail:
      'Leading interface architecture, motion systems, and performance for product launches.',
    stack: ['React', 'GSAP', 'TypeScript', 'Design Systems'],
  },
  {
    period: '2022 — 2024',
    role: 'Frontend Engineer',
    company: 'Northwave Labs',
    detail:
      'Shipped design systems, marketing experiences, and complex SPA workflows.',
    stack: ['Next.js', 'Tailwind', 'Node.js', 'Storybook'],
  },
  {
    period: '2020 — 2022',
    role: 'UI Engineer',
    company: 'Freelance',
    detail:
      'Partnered with founders and agencies on brand sites, dashboards, and prototypes.',
    stack: ['Vite', 'React', 'Figma', 'CSS'],
  },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X', href: 'https://x.com' },
]

export const aboutStats = [
  { label: 'Years shipping', value: '05+' },
  { label: 'Products launched', value: '30+' },
  { label: 'Motion systems', value: '12' },
]
