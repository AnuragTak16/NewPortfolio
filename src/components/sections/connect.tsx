import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { Magnetic } from '@/components/motion'
import { site, socials } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export function Connect() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const panel = root.current?.querySelector('.connect-panel')
      if (!panel) return

      gsap.set(panel, { clipPath: 'inset(0 100% 0 0)' })
      gsap.set('.connect-line', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.connect-rise', { y: 48, autoAlpha: 0 })
      gsap.set('.connect-social', { x: -24, autoAlpha: 0 })
      gsap.set('.connect-marquee', { xPercent: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
        },
      })

      tl.to('.connect-ghost', {
        xPercent: -18,
        autoAlpha: 0.15,
        ease: 'none',
        duration: 0.55,
      })
        .to(
          panel,
          { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 0.85 },
          0.15,
        )
        .to(
          '.connect-rise',
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            ease: 'none',
            duration: 0.45,
          },
          0.45,
        )
        .to(
          '.connect-line',
          { scaleX: 1, ease: 'none', duration: 0.4 },
          0.55,
        )
        .to(
          '.connect-social',
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.08,
            ease: 'none',
            duration: 0.35,
          },
          0.65,
        )
        .to(
          '.connect-marquee',
          { xPercent: -35, ease: 'none', duration: 0.7 },
          0.35,
        )

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    mm.add('(max-width: 767px)', () => {
      gsap.set('.connect-panel', { clipPath: 'inset(0 0% 0 0)' })
      gsap.set('.connect-ghost', { autoAlpha: 0.12 })

      gsap.from('.connect-rise', {
        y: 28,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
      gsap.from('.connect-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      gsap.from('.connect-social', {
        x: -16,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 68%' },
      })
    })

    return () => mm.revert()
  }, [])

  const ticker = [
    'Open to opportunities',
    'Full-stack delivery',
    'APIs · UI · Data',
    site.location,
    'Remote · Hybrid · On-site',
  ]

  return (
    <section id="connect" ref={root} className="relative bg-mist">
      <div className="relative flex min-h-svh items-center overflow-hidden">
        <p className="connect-ghost pointer-events-none absolute inset-x-0 top-[18%] select-none text-center font-heading text-[clamp(4.5rem,17vw,15rem)] font-semibold leading-none tracking-[-0.065em] text-heading/[0.08]">
          Hire me.
        </p>

        <div className="connect-panel absolute inset-0 flex flex-col justify-between bg-heading text-mist">
          <div className="connect-marquee overflow-hidden border-b border-white/10 py-3">
            <div className="flex w-max gap-10 whitespace-nowrap will-change-transform">
              {[...ticker, ...ticker, ...ticker].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-mist/45"
                >
                  {item}
                  <span className="ml-10 inline-block size-1.5 translate-y-[-1px] bg-signal" />
                </span>
              ))}
            </div>
          </div>

          <div className="section-pad mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 py-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="connect-rise text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-signal-soft">
                / 05 Contact
              </p>
              <h2 className="connect-rise mt-5 font-heading text-[clamp(3.2rem,8.5vw,7rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
                Hire me.
                <span className="block text-signal">Let&apos;s build.</span>
              </h2>
              <div className="connect-line mt-8 h-px w-28 bg-signal" />
              <p className="connect-rise mt-8 max-w-sm text-[0.95rem] leading-relaxed text-mist/60 sm:text-base">
                Full-stack developer open to joining a team — APIs, data, and UI
                that ship clean.
              </p>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${site.email}`}
                  className="connect-rise group inline-flex items-center gap-3 border border-white/20 px-6 py-4 text-base transition-colors hover:border-signal hover:text-signal-soft sm:text-lg"
                >
                  {site.email}
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>

              <ul className="mt-10 space-y-0">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="connect-social group flex items-center justify-between border-t border-white/10 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-mist/55 transition-colors hover:text-mist"
                    >
                      {social.label}
                      <ArrowUpRight className="size-4 opacity-0 transition-all group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="section-pad border-t border-white/10 py-5">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-mist/40">
              <span>{site.name}</span>
              <span>Bengaluru · Remote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
