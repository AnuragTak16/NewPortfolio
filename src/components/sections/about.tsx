import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutStats, site } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const statement = 'Building products people feel before they read.'

const principles = [
  {
    id: '01',
    title: 'Clarity',
    detail: 'Hierarchy first. Type, space, and pace do the talking.',
  },
  {
    id: '02',
    title: 'Pace',
    detail: 'Motion only when it helps the story move forward.',
  },
  {
    id: '03',
    title: 'Craft',
    detail: 'The small decisions you notice after the second visit.',
  },
]

export function About() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bio-word',
        { color: '#9a9088' },
        {
          color: '#0b1f3a',
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.bio-statement',
            start: 'top 78%',
            end: 'top 32%',
            scrub: true,
          },
        },
      )

      gsap.from('.bio-panel', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.15,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.bio-panel', start: 'top 85%' },
      })

      gsap.from('.bio-copy', {
        autoAlpha: 0,
        filter: 'blur(8px)',
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.bio-copy-wrap', start: 'top 80%' },
      })

      gsap.from('.bio-principle', {
        autoAlpha: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.bio-principles', start: 'top 82%' },
      })

      gsap.utils.toArray<HTMLElement>('.bio-count').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const suffix = el.dataset.suffix ?? ''
        const pad = Number(el.dataset.pad ?? 0)
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            const shown = Math.round(counter.val)
            el.textContent = `${String(shown).padStart(pad, '0')}${suffix}`
          },
        })
      })

      gsap.to('.bio-monogram', {
        y: -18,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const words = statement.split(' ')

  return (
    <section id="about" ref={root} className="section-pad py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em]">
          <span className="text-signal">About</span>
          <span className="text-muted-foreground">{site.location}</span>
        </div>

        <h2 className="bio-statement mt-8 max-w-5xl font-heading text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-heading">
          {words.map((word) => (
            <span key={word} className="bio-word mr-[0.28em] inline-block text-[#9a9088]">
              {word}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-12">
          <aside className="bio-panel relative flex min-h-80 flex-col justify-between overflow-hidden bg-ink px-7 py-8 text-mist lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.22em] text-signal-soft">Profile</p>
            <p className="bio-monogram font-heading text-[6.5rem] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(250,217,209,0.9)]">
              AT
            </p>
            <div>
              <p className="font-heading text-2xl font-semibold">{site.name}</p>
              <p className="mt-1 text-sm text-mist/65">{site.role}</p>
            </div>
          </aside>

          <div className="bio-copy-wrap flex flex-col justify-between lg:col-span-8">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p className="bio-copy">
                I&apos;m {site.name}, a {site.role.toLowerCase()} working between
                product engineering and art direction. Interfaces should feel
                considered before anyone reads a label.
              </p>
              <p className="bio-copy">
                I partner with founders and studios on design systems,
                marketing sites, and scroll-led stories that stay fast. Based
                in {site.location}, open to work that cares about craft.
              </p>
            </div>

            <div className="bio-principles mt-12 grid gap-6 sm:grid-cols-3" style={{ perspective: '800px' }}>
              {principles.map((item) => (
                <article key={item.id} className="bio-principle border-t border-border pt-4">
                  <p className="text-xs text-signal">{item.id}</p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-heading">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border/80 pt-10 sm:grid-cols-3">
          {aboutStats.map((stat) => {
            const match = stat.value.match(/^(\d+)(.*)$/)
            const value = match?.[1] ?? '0'
            const suffix = match?.[2] ?? ''
            return (
              <div key={stat.label}>
                <p
                  className="bio-count font-heading text-5xl font-semibold tracking-tight text-heading sm:text-6xl"
                  data-value={value}
                  data-suffix={suffix}
                  data-pad={value.startsWith('0') ? value.length : 0}
                >
                  00{suffix}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
