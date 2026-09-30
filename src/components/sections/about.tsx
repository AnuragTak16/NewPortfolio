import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutStats, site } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const MUTED = '#b0aaa2'
const HEADING = '#0b1f3a'
const BODY = '#5f6570'
const SIGNAL = '#e24a2c'

export function About() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleWords = gsap.utils.toArray<HTMLElement>('.about-title-word')
      const bodyCopy = gsap.utils.toArray<HTMLElement>('.about-body')
      const meta = gsap.utils.toArray<HTMLElement>('.about-meta')
      const stats = gsap.utils.toArray<HTMLElement>('.about-stat-value')

      gsap.set(titleWords, { color: MUTED })
      gsap.set(bodyCopy, { color: MUTED })
      gsap.set(meta, { color: MUTED })
      gsap.set(stats, { color: MUTED })

      // Enter from hero → colors activate
      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 85%',
          end: 'top 35%',
          scrub: 0.65,
        },
      })

      enter
        .to(meta, { color: SIGNAL, stagger: 0.04, ease: 'none', duration: 0.4 }, 0)
        .to(
          titleWords,
          { color: HEADING, stagger: 0.06, ease: 'none', duration: 0.55 },
          0.05,
        )
        .to(
          bodyCopy,
          { color: BODY, stagger: 0.08, ease: 'none', duration: 0.5 },
          0.15,
        )
        .to(
          stats,
          { color: HEADING, stagger: 0.08, ease: 'none', duration: 0.45 },
          0.25,
        )

      // Leave toward below → colors fade back
      const leave = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'bottom 70%',
          end: 'bottom 20%',
          scrub: 0.65,
        },
      })

      leave
        .to(titleWords, { color: MUTED, stagger: 0.04, ease: 'none', duration: 0.5 }, 0)
        .to(bodyCopy, { color: MUTED, stagger: 0.05, ease: 'none', duration: 0.45 }, 0.05)
        .to(meta, { color: MUTED, ease: 'none', duration: 0.4 }, 0.08)
        .to(stats, { color: MUTED, stagger: 0.05, ease: 'none', duration: 0.4 }, 0.1)

      gsap.from('.about-rise', {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })

      gsap.from('.about-rail', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const title = 'Your product, one engineer — schema to UI.'

  return (
    <section
      id="about"
      ref={root}
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--mist)_0%,#ebe6df_45%,var(--mist)_100%)] section-pad py-24 sm:py-32"
    >
      <div className="about-rail absolute left-0 top-0 hidden h-full w-1.5 bg-signal md:block" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-20">
          <div>
            <p className="about-rise about-meta text-[0.65rem] font-semibold uppercase tracking-[0.28em]">
              / 01 About
            </p>
            <h2 className="about-rise mt-6 font-heading text-[clamp(2.9rem,5.6vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              {title.split(' ').map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="about-title-word mr-[0.28em] inline-block"
                >
                  {word}
                </span>
              ))}
            </h2>
            <p className="about-rise about-meta mt-7 max-w-sm text-[0.7rem] uppercase tracking-[0.2em]">
              {site.role}
              <span className="mx-2 text-signal">/</span>
              {site.location}
            </p>
          </div>

          <div className="space-y-7">
            <p className="about-rise about-body text-[1.35rem] leading-[1.45] sm:text-[1.65rem] sm:leading-[1.4]">
              {site.summary}
            </p>
            <p className="about-rise about-body max-w-xl text-[0.95rem] leading-relaxed sm:text-base">
              Schema design, REST APIs, JWT, sockets, and React — owned end to
              end in remote, fast-paced teams.
            </p>
          </div>
        </div>

        <div className="about-stats mt-20 grid gap-10 border-t border-heading/10 pt-12 sm:grid-cols-3">
          {aboutStats.map((stat) => (
            <div key={stat.label} className="about-rise">
              <p className="about-stat-value font-heading text-[clamp(2.8rem,5vw,4rem)] font-semibold tracking-[-0.04em]">
                {stat.value}
              </p>
              <p className="about-meta mt-3 text-[0.65rem] uppercase tracking-[0.22em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
