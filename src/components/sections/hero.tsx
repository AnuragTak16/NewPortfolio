import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight } from 'lucide-react'
import { Magnetic } from '@/components/motion'
import { site } from '@/data/portfolio'
import { scrollToId } from '@/hooks/use-smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  'Full-stack developer.',
  'I take products from',
  'database to browser',
  'and ship them.',
]

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from('.hero-kicker', { autoAlpha: 0, y: 8, duration: 0.28 })
        .from(
          '.hero-line-inner',
          {
            yPercent: 110,
            duration: 0.45,
            stagger: 0.045,
            ease: 'power4.out',
          },
          '-=0.1',
        )
        .from(
          '.hero-cta',
          { autoAlpha: 0, y: 10, stagger: 0.04, duration: 0.28 },
          '-=0.15',
        )
        .from('.hero-aside', { autoAlpha: 0, y: 10, duration: 0.28 }, '-=0.2')

      gsap.to('.hero-wash', {
        xPercent: 6,
        yPercent: -5,
        duration: 10,
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
      className="relative flex min-h-svh items-end overflow-hidden pb-10 pt-24 sm:pb-12 sm:pt-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(155deg,var(--hero-a)_0%,var(--hero-b)_46%,var(--hero-c)_100%)]" />
        <div className="hero-wash absolute -right-[18%] top-[-10%] h-[75vmin] w-[75vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_22%,transparent),transparent_68%)]" />
        <div className="hero-wash absolute -left-[20%] bottom-[-25%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--heading)_7%,transparent),transparent_70%)]" />
        <div className="hero-shift absolute right-[8%] top-[18%] hidden h-44 w-px bg-gradient-to-b from-signal/55 to-transparent lg:block" />
      </div>

      <div className="section-pad relative z-10 mx-auto flex w-full max-w-[100rem] flex-col gap-8">
        <p className="hero-kicker text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-signal sm:text-[0.7rem]">
          {site.role} · {site.location}
        </p>

        <h1 className="font-heading text-[clamp(2.6rem,9.2vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-heading">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="hero-line-inner inline-block pb-[0.03em]">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="flex flex-col gap-8 border-t border-heading/10 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollToId('#projects')}
                className="hero-cta inline-flex items-center bg-heading px-6 py-3.5 text-[0.95rem] font-medium text-mist transition-colors hover:bg-signal sm:text-base"
              >
                Selected work
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={() => scrollToId('#connect')}
                className="hero-cta inline-flex items-center gap-2 border border-heading/20 px-6 py-3.5 text-[0.95rem] font-medium text-heading transition-colors hover:border-signal hover:text-signal sm:text-base"
              >
                Hire me
                <ArrowDownRight className="size-4" />
              </button>
            </Magnetic>
          </div>

          <div className="hero-aside flex max-w-sm flex-col sm:items-end sm:text-right">
            <p className="text-sm leading-[1.65] text-muted-foreground">
              {site.summary}
            </p>
            <button
              type="button"
              onClick={() => scrollToId('#about')}
              className="mt-5 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-heading/70 transition-colors hover:text-signal"
            >
              Scroll
              <ArrowDownRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
