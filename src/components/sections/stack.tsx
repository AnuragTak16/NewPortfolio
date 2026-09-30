import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Magnetic } from '@/components/motion'
import { stackGroups } from '@/data/portfolio'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function Stack() {
  const root = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const ribbonRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useLayoutEffect(() => {
    activeRef.current = active
  }, [active])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const pin = pinRef.current
      if (!pin) return

      const st = ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        end: () => `+=${stackGroups.length * 100}%`,
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(
            stackGroups.length - 1,
            Math.floor(self.progress * stackGroups.length),
          )
          gsap.set('.stack-meter', { scaleX: self.progress })
          if (next !== activeRef.current) {
            activeRef.current = next
            setActive(next)
          }
        },
      })

      progressRef.current = st
      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        st.kill()
        progressRef.current = null
      }
    })

    mm.add('(max-width: 767px)', () => {
      // Mobile: snap sections stacked — scroll through each group block
      gsap.utils.toArray<HTMLElement>('.stack-mobile-block').forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      })
    })

    return () => mm.revert()
  }, [])

  useLayoutEffect(() => {
    const ribbon = ribbonRef.current
    if (!ribbon) return

    const half = ribbon.scrollWidth / 2
    const tween = gsap.to(ribbon, {
      x: -half,
      duration: 22,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [active])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { overwrite: 'auto' } })

      tl.fromTo(
        '.stack-cat',
        { yPercent: 110, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.75,
          ease: 'power4.out',
        },
      ).fromTo(
        '.stack-tool',
        { yPercent: 120, autoAlpha: 0, rotate: 3 },
        {
          yPercent: 0,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power4.out',
        },
        0.1,
      )
    }, root)

    return () => ctx.revert()
  }, [active])

  const scrollToGroup = (index: number) => {
    const st = progressRef.current
    if (!st) {
      setActive(index)
      activeRef.current = index
      return
    }
    const start = st.start
    const end = st.end
    const target =
      start + ((index + 0.5) / stackGroups.length) * (end - start)
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const group = stackGroups[active]
  const ribbonItems = [...group.items, ...group.items, ...group.items]

  return (
    <section
      id="stack"
      ref={root}
      className="relative overflow-hidden bg-heading text-mist"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[95vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/20"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklab,var(--signal)_18%,transparent),transparent_55%)]" />

      {/* Desktop: pinned scroll stages */}
      <div ref={pinRef} className="hidden min-h-svh md:block">
        <div className="section-pad relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal-soft">
                Stack
              </p>
              <div className="mt-5 overflow-hidden">
                <h2 className="stack-cat font-heading text-[clamp(3.5rem,10vw,8rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-mist">
                  {group.label}
                </h2>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist/50">
                Scroll to move through Frontend, Backend, Data, and Delivery.
              </p>
            </div>

            <nav className="flex flex-row flex-wrap gap-3 lg:flex-col lg:items-end lg:gap-2">
              {stackGroups.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToGroup(index)}
                  className={cn(
                    'group flex items-center gap-3 font-heading text-sm font-semibold tracking-tight transition-colors',
                    active === index
                      ? 'text-signal'
                      : 'text-mist/70 hover:text-mist',
                  )}
                >
                  <span className="text-[10px] tracking-[0.2em]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg sm:text-xl">{item.label}</span>
                  <span
                    className={cn(
                      'hidden h-px w-8 origin-right transition-transform lg:block',
                      active === index
                        ? 'scale-x-100 bg-signal'
                        : 'scale-x-0 bg-mist/40 group-hover:scale-x-100',
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 h-px w-full bg-white/10">
            <div className="stack-meter h-px origin-left scale-x-0 bg-signal" />
          </div>

          <div className="mt-14 flex min-h-[14rem] flex-wrap content-center items-center gap-x-4 gap-y-3 sm:min-h-[18rem] sm:gap-x-6 sm:gap-y-5">
            {group.items.map((item) => (
              <Magnetic key={`${group.label}-${item}`} strength={0.4}>
                <span className="stack-tool inline-block font-heading text-[clamp(2rem,5.5vw,4.2rem)] font-semibold leading-none tracking-[-0.045em] text-mist transition-colors hover:text-signal">
                  {item}
                </span>
              </Magnetic>
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden border-t border-white/10 py-6 sm:mt-20 sm:py-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-heading to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-heading to-transparent sm:w-24" />
            <div
              ref={ribbonRef}
              className="flex w-max items-center will-change-transform"
            >
              {ribbonItems.map((item, i) => (
                <span
                  key={`${item}-ribbon-${i}`}
                  className="flex items-center px-6 sm:px-10"
                >
                  <span
                    className={
                      i % 2 === 0
                        ? 'font-heading text-2xl font-semibold tracking-tight text-mist/70 sm:text-3xl'
                        : 'font-heading text-2xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(243,242,239,0.35)] sm:text-3xl'
                    }
                  >
                    {item}
                  </span>
                  <span className="ml-6 size-1.5 rotate-45 bg-signal sm:ml-10" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: natural scroll through each group */}
      <div className="section-pad relative z-10 mx-auto max-w-7xl py-20 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal-soft">
          Stack
        </p>
        <div className="mt-10 space-y-20">
          {stackGroups.map((item, index) => (
            <div key={item.label} className="stack-mobile-block">
              <p className="font-heading text-sm tracking-[0.2em] text-signal">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-heading text-5xl font-semibold tracking-tight text-mist">
                {item.label}
              </h3>
              <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-3">
                {item.items.map((tool) => (
                  <li
                    key={tool}
                    className="font-heading text-2xl font-semibold tracking-tight text-mist/85"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
