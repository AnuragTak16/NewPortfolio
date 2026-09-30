import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stackGroups } from '@/data/portfolio'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function Stack() {
  const root = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useLayoutEffect(() => {
    activeRef.current = active
  }, [active])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const stage = root.current?.querySelector('.stack-stage')
      if (!stage) return

      gsap.from('.stack-heading > *', {
        autoAlpha: 0,
        filter: 'blur(8px)',
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'center center',
          end: () => `+=${stackGroups.length * 85}%`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(
              stackGroups.length - 1,
              Math.floor(self.progress * stackGroups.length),
            )
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress })
            }
            if (next !== activeRef.current) {
              activeRef.current = next
              setActive(next)
            }
          },
        },
      })

      tl.to('.stack-orbit-a', { rotate: 40, ease: 'none', duration: 1 }, 0)
        .to('.stack-orbit-b', { rotate: -55, ease: 'none', duration: 1 }, 0)
        .to('.stack-glow', { autoAlpha: 0.55, ease: 'none', duration: 1 }, 0)

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    mm.add('(max-width: 767px)', () => {
      gsap.from('.stack-heading > *', {
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
      gsap.from('.stack-stage', {
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stack-stage', start: 'top 85%' },
      })
    })

    return () => mm.revert()
  }, [])

  useLayoutEffect(() => {
    const tabs = tabsRef.current
    const marker = markerRef.current
    const button = tabRefs.current[active]
    if (tabs && marker && button) {
      const tabsBox = tabs.getBoundingClientRect()
      const box = button.getBoundingClientRect()
      gsap.to(marker, {
        x: box.left - tabsBox.left,
        width: box.width,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const label = root.current?.querySelector('.stack-label')
    const chips = gsap.utils.toArray<HTMLElement>('.stack-chip')
    const count = root.current?.querySelector('.stack-count')

    const swap = gsap.timeline({ defaults: { overwrite: 'auto' } })

    if (label) {
      swap.fromTo(
        label,
        { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0.4 },
        {
          clipPath: 'inset(0 0% 0 0)',
          autoAlpha: 1,
          duration: 0.55,
          ease: 'power3.inOut',
        },
      )
    }

    if (chips.length) {
      swap.fromTo(
        chips,
        { autoAlpha: 0, scale: 0.78, rotate: -4 },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.42,
          stagger: 0.055,
          ease: 'back.out(1.4)',
        },
        '-=0.25',
      )
    }

    if (count) {
      swap.fromTo(
        count,
        { autoAlpha: 0.3 },
        { autoAlpha: 1, duration: 0.3 },
        0,
      )
    }
  }, [active])

  const group = stackGroups[active]

  const goTo = (index: number) => {
    setActive(index)
    activeRef.current = index
  }

  return (
    <section id="stack" ref={root} className="section-pad py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="stack-heading flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
              Stack
            </p>
            <h2 className="mt-4 max-w-xl font-heading text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
              Tools that stay in motion.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Scroll to cycle the groups. The stage stays pinned while the set
            swaps in place.
          </p>
        </div>

        <div className="stack-stage relative mt-14 overflow-hidden border border-border/70 bg-ink px-5 py-12 text-mist sm:px-10 sm:py-14">
          <div className="stack-glow pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_40%,transparent),transparent_68%)] opacity-30" />
          <div className="stack-orbit-a pointer-events-none absolute -left-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full border border-white/10" />
          <div className="stack-orbit-b pointer-events-none absolute -right-20 top-8 size-[22rem] rounded-full border border-[color:var(--signal)]/45" />

          <div
            ref={tabsRef}
            className="relative z-10 flex flex-wrap gap-2"
          >
            <span
              ref={markerRef}
              className="pointer-events-none absolute top-0 left-0 hidden h-9 bg-[color:var(--signal-soft)] md:block"
            />
            {stackGroups.map((item, index) => (
              <button
                key={item.label}
                type="button"
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                onClick={() => goTo(index)}
                className={cn(
                  'relative z-10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors',
                  active === index
                    ? 'text-ink md:text-ink'
                    : 'text-mist/55 hover:text-mist',
                  active === index && 'bg-[color:var(--signal-soft)] md:bg-transparent',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative z-10 mt-4 h-px w-full bg-white/10">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-signal"
            />
          </div>

          <div className="relative z-10 mt-10 grid min-h-[14rem] content-start">
            <p className="stack-label font-heading text-5xl font-semibold tracking-tight text-mist sm:text-6xl">
              {group.label}
            </p>

            <ul className="mt-8 flex flex-wrap content-start gap-3">
              {group.items.map((item, i) => (
                <li
                  key={`${group.label}-${item}`}
                  className="stack-chip border border-white/15 bg-white/5 px-5 py-3 font-heading text-lg text-mist sm:text-xl"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="stack-count relative z-10 mt-10 text-xs uppercase tracking-[0.18em] text-mist/45">
            {String(active + 1).padStart(2, '0')} /{' '}
            {String(stackGroups.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  )
}
