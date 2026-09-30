import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-head', {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })

      gsap.utils.toArray<HTMLElement>('.exp-block').forEach((block, i) => {
        const line = block.querySelector('.exp-line')
        const body = block.querySelectorAll('.exp-fade')

        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        )

        gsap.from(body, {
          y: 36,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.09,
          delay: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from(block.querySelector('.exp-index'), {
          x: i % 2 === 0 ? -24 : 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={root}
      className="relative overflow-hidden bg-mist section-pad py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -right-[20%] top-0 h-[50%] w-[50%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_14%,transparent),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-heading/10 pb-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="exp-head text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-signal">
              / 03 Experience
            </p>
            <h2 className="exp-head mt-5 font-heading text-[clamp(2.8rem,5.8vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-heading">
              Two chapters. One craft.
            </h2>
          </div>
          <p className="exp-head max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base lg:justify-self-end lg:text-right">
            Shipping full-stack product work remotely — and the degree that
            started it.
          </p>
        </div>

        <div className="mt-6 divide-y divide-heading/10">
          {experience.map((item, index) => (
            <article
              key={item.company}
              className="exp-block grid gap-8 py-14 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3">
                <p className="exp-index font-heading text-[clamp(3.5rem,8vw,5.5rem)] font-semibold leading-none tracking-[-0.055em] text-heading/10">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="exp-fade mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-signal">
                  {item.period}
                </p>
              </div>

              <div className="lg:col-span-9">
                <div className="exp-line mb-8 h-px origin-left bg-signal" />
                <h3 className="exp-fade font-heading text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-heading">
                  {item.role}
                </h3>
                <p className="exp-fade mt-3 text-base text-heading/55 sm:text-lg">
                  {item.company}
                </p>
                <p className="exp-fade mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                  {item.detail}
                </p>

                <div className="exp-fade mt-8 flex flex-wrap gap-3">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border-b border-signal/40 pb-0.5 font-heading text-[0.85rem] font-semibold tracking-tight text-heading"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
