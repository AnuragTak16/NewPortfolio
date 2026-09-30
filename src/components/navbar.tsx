import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { navLinks, site } from '@/data/portfolio'
import { scrollToId } from '@/hooks/use-smooth-scroll'

type NavHref = (typeof navLinks)[number]['href']

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function scrambleTo(el: HTMLElement, next: string) {
  const from = el.textContent ?? ''
  const length = Math.max(from.length, next.length)
  const state = { frame: 0 }
  const total = 12

  gsap.to(state, {
    frame: total,
    duration: 0.55,
    ease: 'none',
    onUpdate: () => {
      const progress = state.frame / total
      let out = ''
      for (let i = 0; i < length; i += 1) {
        if (i < Math.floor(progress * next.length)) {
          out += next[i] ?? ''
        } else {
          out += glyphs[Math.floor(Math.random() * glyphs.length)]
        }
      }
      el.textContent = out
    },
    onComplete: () => {
      el.textContent = next
    },
  })
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<NavHref>('#home')
  const [progress, setProgress] = useState(0)
  const navRef = useRef<HTMLElement>(null)
  const chipRef = useRef<HTMLSpanElement>(null)
  const scrambleRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const activeLabel =
    navLinks.find((link) => link.href === active)?.label ?? 'Home'

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)

      const line = window.innerHeight * 0.28
      let current: NavHref = '#home'
      for (const link of navLinks) {
        const section = document.querySelector(link.href)
        if (!section) continue
        if (section.getBoundingClientRect().top <= line) current = link.href
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    if (!scrambleRef.current) return
    scrambleTo(scrambleRef.current, activeLabel.toUpperCase())
  }, [activeLabel])

  useLayoutEffect(() => {
    const nav = navRef.current
    const chip = chipRef.current
    const index = navLinks.findIndex((link) => link.href === active)
    const link = linkRefs.current[index]
    if (!nav || !chip || !link) return

    const move = () => {
      const navBox = nav.getBoundingClientRect()
      const box = link.getBoundingClientRect()
      gsap.to(chip, {
        x: box.left - navBox.left,
        width: box.width,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    move()
    window.addEventListener('resize', move)
    return () => window.removeEventListener('resize', move)
  }, [active])

  useLayoutEffect(() => {
    if (!ringRef.current) return
    const length = 2 * Math.PI * 14
    gsap.set(ringRef.current, { strokeDasharray: length })
    gsap.to(ringRef.current, {
      strokeDashoffset: length * (1 - progress),
      duration: 0.2,
      ease: 'none',
      overwrite: 'auto',
    })
  }, [progress])

  useLayoutEffect(() => {
    gsap.from('.nav-in', {
      y: 14,
      autoAlpha: 0,
      duration: 0.55,
      stagger: 0.04,
      ease: 'power3.out',
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      gsap.fromTo(
        '.mobile-link',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.4, ease: 'power3.out' },
      )
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onLinkMove = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    const link = linkRefs.current[index]
    if (!link) return
    const rect = link.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    gsap.to(link, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.3,
      ease: 'power3.out',
    })
  }

  const onLinkLeave = (index: number) => {
    gsap.to(linkRefs.current[index], {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.45)',
    })
  }

  const go = (href: string) => {
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-ink/10 bg-[#f7f8fa]/92 text-ink backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-5 px-5 sm:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            go('#home')
          }}
          className="nav-in flex items-center gap-3"
        >
          <span className="relative grid size-9 place-items-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 size-9 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="rgba(11,18,32,0.12)"
                strokeWidth="2"
              />
              <circle
                ref={ringRef}
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#0a7a6c"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-heading text-[10px] font-semibold">
              {String(Math.round(progress * 100)).padStart(2, '0')}
            </span>
          </span>
          <span className="hidden font-heading text-base font-semibold tracking-tight sm:block">
            {site.name.split(' ')[0]}
          </span>
        </a>

        <div className="nav-in hidden h-7 items-center overflow-hidden border-l border-ink/15 pl-4 md:flex">
          <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-ink/40">
            Now
          </span>
          <span
            ref={scrambleRef}
            className="font-heading text-sm font-semibold tracking-[0.08em] text-[#0a7a6c]"
          >
            HOME
          </span>
        </div>

        <nav
          ref={navRef}
          className="relative ml-auto hidden h-full items-center md:flex"
        >
          <span
            ref={chipRef}
            className="pointer-events-none absolute top-1/2 left-0 h-8 -translate-y-1/2 rounded-full bg-ink"
          />
          {navLinks.map((link, index) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(node) => {
                  linkRefs.current[index] = node
                }}
                onMouseMove={(event) => onLinkMove(event, index)}
                onMouseLeave={() => onLinkLeave(index)}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href)
                }}
                className="nav-in relative z-10 flex h-full items-center px-3"
              >
                <span
                  className={cn(
                    'text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-mist' : 'text-ink/55 hover:text-ink',
                  )}
                >
                  {link.label}
                </span>
              </a>
            )
          })}
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex size-10 items-center justify-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-40 bg-[#f7f8fa] md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <nav className="flex flex-col px-6 pt-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                go(link.href)
              }}
              className={cn(
                'mobile-link border-b border-ink/10 py-4 font-heading text-3xl font-semibold',
                active === link.href ? 'text-[#0a7a6c]' : 'text-ink',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
