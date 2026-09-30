import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight } from 'lucide-react'
import { Magnetic } from '@/components/motion'
import { site } from '@/data/portfolio'
import { scrollToId } from '@/hooks/use-smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  'Designing digital',
  'products that feel',
  'calm, clear, and alive.',
]

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from('.hero-kicker', { autoAlpha: 0, y: 14, duration: 0.55 })
        .from(
          '.hero-line-inner',
          {
            yPercent: 110,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.15',
        )
        .from(
          '.hero-aside',
          { autoAlpha: 0, y: 18, stagger: 0.1, duration: 0.65 },
          '-=0.45',
        )
        .from(
          '.hero-cta',
          { autoAlpha: 0, y: 14, stagger: 0.08, duration: 0.5 },
          '-=0.3',
        )

      gsap.to('.hero-wash', {
        xPercent: 6,
        yPercent: -5,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-rule', {
        scaleX: 1.08,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-shift', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32"
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(155deg,var(--hero-a)_0%,var(--hero-b)_46%,var(--hero-c)_100%)]" />
        <div className="hero-wash absolute -right-[18%] top-[-10%] h-[75vmin] w-[75vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_22%,transparent),transparent_68%)]" />
        <div className="hero-wash absolute -left-[20%] bottom-[-25%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--heading)_7%,transparent),transparent_70%)]" />
        <div className="hero-shift hero-rule absolute left-[-5%] top-[38%] h-px w-[70%] origin-left bg-gradient-to-r from-transparent via-heading/20 to-transparent" />
        <div className="hero-shift absolute right-[8%] top-[22%] hidden h-40 w-px bg-gradient-to-b from-signal/50 to-transparent lg:block" />
      </div>

      <div className="section-pad relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="hero-kicker text-sm font-semibold uppercase tracking-[0.22em] text-signal">
            {site.role} · {site.location}
          </p>

          <h1 className="mt-6 font-heading text-[clamp(2.6rem,6.8vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-heading">
            {lines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line-inner inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId('#projects')}
                className="hero-cta inline-flex items-center bg-heading px-6 py-3.5 text-base font-medium text-mist transition-colors hover:bg-signal"
              >
                View selected work
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={() => scrollToId('#connect')}
                className="hero-cta inline-flex items-center gap-2 border border-heading/15 px-6 py-3.5 text-base font-medium text-heading transition-colors hover:border-signal hover:text-signal"
              >
                Start a project
                <ArrowDownRight className="size-4" />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="hero-aside lg:col-span-4 lg:pb-2">
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg lg:ml-auto lg:text-right">
            Frontend craft with intentional motion, sharp hierarchy, and product
            polish that holds up after the first scroll.
          </p>
          <button
            type="button"
            onClick={() => scrollToId('#about')}
            className="hero-aside mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-heading transition-colors hover:text-signal lg:ml-auto"
          >
            Explore
            <ArrowDownRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
