import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { Magnetic, RevealText } from '@/components/motion'
import { site } from '@/data/portfolio'
import { scrollToId } from '@/hooks/use-smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      intro
        .from('.hero-brand', {
          yPercent: 110,
          duration: 1,
        })
        .from(
          '.hero-role',
          {
            autoAlpha: 0,
            x: -20,
            duration: 0.7,
          },
          '-=0.45',
        )
        .from(
          '.hero-rule',
          {
            scaleX: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '-=0.5',
        )
        .from(
          '.hero-cta',
          {
            autoAlpha: 0,
            y: 18,
            stagger: 0.1,
            duration: 0.65,
          },
          '-=0.2',
        )
        .from(
          '.hero-foot',
          {
            autoAlpha: 0,
            y: 12,
            stagger: 0.08,
            duration: 0.55,
          },
          '-=0.35',
        )

      gsap.to('.hero-orb-a', {
        x: 40,
        y: -50,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-orb-b', {
        x: -30,
        y: 35,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-grid', {
        backgroundPosition: '40px 40px',
        duration: 18,
        repeat: -1,
        ease: 'none',
      })
      gsap.to('.hero-scroll-line', {
        scaleY: 0.35,
        transformOrigin: 'top',
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      gsap.to('.hero-content', {
        y: 80,
        autoAlpha: 0.15,
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
      className="relative flex min-h-svh flex-col justify-end overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-32"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#eef2f6_0%,#dde8f0_48%,#c5ddd6_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(11,18,32,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(11,18,32,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="hero-orb-a absolute -right-[10%] top-[4%] h-[68vmin] w-[68vmin] rounded-full bg-[radial-gradient(circle_at_center,rgb(10_122_108/0.32),transparent_64%)]" />
        <div className="hero-orb-b absolute -left-[14%] bottom-[-8%] h-[58vmin] w-[58vmin] rounded-full bg-[radial-gradient(circle_at_center,rgb(61_90_128/0.22),transparent_64%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#eef2f6] via-[#eef2f6]/70 to-transparent" />
      </div>

      <div className="hero-content section-pad mx-auto w-full max-w-7xl">
        <div className="overflow-hidden">
          <p className="hero-brand font-heading text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-ink">
            {site.name}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <p className="hero-role text-xs font-semibold uppercase tracking-[0.24em] text-signal sm:text-sm">
            {site.role}
          </p>
          <span className="hero-rule h-px w-16 origin-left bg-signal sm:w-24" />
        </div>

        <RevealText
          text="Interfaces with rhythm and clarity."
          className="mt-8 max-w-4xl font-heading text-[clamp(1.8rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
          delay={0.35}
        />

        <p className="hero-foot mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Frontend engineer crafting scroll-led product experiences with
          precise type and intentional motion.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToId('#projects')}
              className="hero-cta inline-flex items-center bg-ink px-6 py-3.5 text-sm font-medium text-mist transition-colors hover:bg-signal"
            >
              View projects
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={() => scrollToId('#connect')}
              className="hero-cta inline-flex items-center border border-ink/20 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Let&apos;s connect
            </button>
          </Magnetic>
        </div>

        <div className="mt-14 flex items-end justify-between gap-6">
          <p className="hero-foot text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Based in {site.location}
          </p>
          <button
            type="button"
            onClick={() => scrollToId('#about')}
            className="hero-foot group inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground"
            aria-label="Scroll to about"
          >
            <span>Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-ink/15">
              <span className="hero-scroll-line absolute inset-x-0 top-0 h-full bg-signal" />
            </span>
            <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
