import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { skills } from '@/data/portfolio'

export function Marquee() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.marquee-a', {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
      gsap.to('.marquee-b', {
        xPercent: 50,
        duration: 34,
        ease: 'none',
        repeat: -1,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const row = [...skills, ...skills]

  return (
    <section
      ref={root}
      aria-label="Skills"
      className="overflow-hidden border-y border-border/70 bg-ink py-4 text-mist"
    >
      <div className="marquee-a flex w-max gap-10 whitespace-nowrap will-change-transform">
        {row.map((skill, i) => (
          <span
            key={`a-${skill}-${i}`}
            className="font-heading text-sm font-semibold uppercase tracking-[0.18em] sm:text-base"
          >
            {skill}
            <span className="ml-10 inline-block size-1.5 translate-y-[-1px] bg-signal" />
          </span>
        ))}
      </div>
      <div className="marquee-b mt-3 flex w-max -translate-x-1/2 gap-10 whitespace-nowrap will-change-transform opacity-45">
        {[...row].reverse().map((skill, i) => (
          <span
            key={`b-${skill}-${i}`}
            className="font-heading text-sm font-semibold uppercase tracking-[0.18em] sm:text-base"
          >
            {skill}
            <span className="ml-10 inline-block size-1.5 translate-y-[-1px] bg-signal" />
          </span>
        ))}
      </div>
    </section>
  )
}
