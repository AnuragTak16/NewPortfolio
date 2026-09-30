import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export function Marquee() {
  const root = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const rootEl = root.current
    const track = trackRef.current
    if (!rootEl || !track) return

    const ctx = gsap.context(() => {
      const half = track.scrollWidth / 2
      const tween = gsap.to(track, {
        x: -half,
        duration: 30,
        ease: 'none',
        repeat: -1,
      })

      const skewTo = gsap.quickTo(track, 'skewX', {
        duration: 0.45,
        ease: 'power3.out',
      })

      ScrollTrigger.create({
        trigger: rootEl,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity()
          skewTo(gsap.utils.clamp(-10, 10, velocity / 400))
          const boost = 1 + Math.min(Math.abs(velocity) / 2000, 1.8)
          tween.timeScale(self.direction === -1 ? -boost : boost)
        },
      })

      ScrollTrigger.addEventListener('scrollEnd', () => skewTo(0))
    }, rootEl)

    return () => ctx.revert()
  }, [])

  const row = [...skills, ...skills]

  return (
    <section
      ref={root}
      aria-label="Stack"
      className="relative overflow-hidden border-y border-heading/10 bg-mist py-10 sm:py-12"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-mist to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-mist to-transparent sm:w-20" />

      <div
        ref={trackRef}
        className="relative flex w-max items-center will-change-transform"
      >
        {row.map((skill, i) => (
          <div
            key={`${skill}-${i}`}
            className="flex shrink-0 items-center px-5 sm:px-8"
          >
            <span className="font-heading text-[clamp(1.85rem,4.5vw,3rem)] font-semibold tracking-[-0.035em] text-heading/75">
              {skill}
            </span>
            <span className="ml-5 size-1.5 shrink-0 rotate-45 bg-signal sm:ml-8" />
          </div>
        ))}
      </div>
    </section>
  )
}
