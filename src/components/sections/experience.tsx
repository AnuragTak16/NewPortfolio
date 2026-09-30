import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const stage = root.current?.querySelector('.exp-stage')
      const cards = gsap.utils.toArray<HTMLElement>('.exp-card')
      const numbers = gsap.utils.toArray<HTMLElement>('.exp-num')
      const progress = root.current?.querySelector('.exp-progress')
      if (!stage || !cards.length) return

      gsap.set(cards, { autoAlpha: 0, y: 80, rotateX: 12, scale: 0.96 })
      gsap.set(cards[0], { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 })
      gsap.set(numbers, { color: 'rgba(11,18,32,0.25)' })
      gsap.set(numbers[0], { color: '#0a7a6c' })
      if (progress) gsap.set(progress, { scaleX: 1 / cards.length })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${cards.length * 90}%`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to({}, { duration: 0.35 })
          return
        }

        tl.to(
          cards[i - 1],
          {
            autoAlpha: 0,
            y: -60,
            rotateX: -10,
            scale: 0.94,
            duration: 0.55,
            ease: 'power2.inOut',
          },
          '>',
        )
          .fromTo(
            card,
            { autoAlpha: 0, y: 80, rotateX: 12, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.55,
              ease: 'power2.inOut',
            },
            '<0.08',
          )
          .fromTo(
            card.querySelectorAll('.exp-tag'),
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.4, ease: 'power3.out' },
            '<0.2',
          )
          .to(
            numbers,
            { color: 'rgba(11,18,32,0.25)', duration: 0.25, stagger: 0 },
            '<',
          )
          .to(numbers[i], { color: '#0a7a6c', duration: 0.25 }, '<')

        if (progress) {
          tl.to(
            progress,
            { scaleX: (i + 1) / cards.length, duration: 0.55, ease: 'none' },
            '<',
          )
        }

        tl.to({}, { duration: 0.3 })
      })

      const tags = cards[0]?.querySelectorAll('.exp-tag')
      if (tags?.length) {
        gsap.fromTo(
          tags,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: stage, start: 'top 80%' },
          },
        )
      }

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    mm.add('(max-width: 767px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.exp-card-mobile')
      gsap.set(cards, { autoAlpha: 0, y: 50 })

      cards.forEach((card) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })

        const tags = card.querySelectorAll('.exp-tag')
        gsap.fromTo(
          tags,
          { y: 16, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.45,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => mm.revert()
  }, [])

  return (
    <section id="experience" ref={root} className="relative bg-[#eef2f6]">
      <div className="exp-stage relative hidden h-svh md:block" style={{ perspective: '1200px' }}>
        <div className="section-pad mx-auto flex h-full max-w-7xl flex-col py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
                Experience
              </p>
              <h2 className="mt-3 max-w-xl font-heading text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
                Roles where craft met shipping speed.
              </h2>
            </div>
            <div className="flex gap-4">
              {experience.map((item, index) => (
                <span
                  key={item.company}
                  className="exp-num font-heading text-2xl font-semibold"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>

          <div className="exp-progress mt-6 h-1 origin-left scale-x-0 bg-signal" />

          <div className="relative mt-8 flex-1">
            {experience.map((item, index) => (
              <article
                key={item.company + item.period}
                className="exp-card absolute inset-x-0 top-0 border border-ink/10 bg-white p-8 shadow-[0_24px_60px_-40px_rgba(11,18,32,0.35)] lg:p-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <p className="font-heading text-sm font-semibold tracking-tight text-signal">
                    {item.period}
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Role {String(index + 1).padStart(2, '0')}
                  </p>
                </div>
                <h3 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
                  {item.role}
                </h3>
                <p className="mt-2 text-lg text-ink/70">{item.company}</p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="exp-tag border border-ink/15 bg-[#eef2f6] px-3 py-1.5 text-xs font-medium text-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="section-pad mx-auto max-w-7xl py-20 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
          Experience
        </p>
        <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-ink">
          Roles where craft met shipping speed.
        </h2>
        <div className="mt-10 space-y-5">
          {experience.map((item, index) => (
            <article
              key={item.company + item.period}
              className="exp-card-mobile border border-ink/10 bg-white p-6"
            >
              <p className="text-sm font-semibold text-signal">{item.period}</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-ink">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-ink/70">{item.company}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <li
                    key={tech}
                    className="exp-tag border border-ink/15 px-3 py-1.5 text-xs text-ink"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
