import { useLayoutEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/portfolio'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateY: x * 10,
      rotateX: y * -8,
      transformPerspective: 900,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out',
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('h-full w-full [transform-style:preserve-3d]', className)}
    >
      {children}
    </div>
  )
}

function OrbitStage() {
  return (
    <div className="relative h-full overflow-hidden bg-ink text-mist">
      <div className="orbit-spin absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-[color:var(--signal-soft)]" />
      </div>
      <span className="orbit-ring absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--signal-soft)]/80" />
      <span className="orbit-ring absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mist/25" />
      <span className="orbit-ring absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--signal)]" />
      <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.22em] text-mist/70">
        Kinetic charts
      </span>
    </div>
  )
}

function NorthStage() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-4 overflow-hidden bg-[#e7eef5] px-8">
      <span className="north-scan pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      {['w-[92%]', 'w-[70%]', 'w-[84%]', 'w-[46%]', 'w-[78%]'].map((width) => (
        <span key={width} className={cn('north-line h-3 origin-left bg-ink', width)} />
      ))}
      <span className="north-line h-3 w-[30%] origin-left bg-signal" />
    </div>
  )
}

function PulseStage() {
  const heights = ['42%', '78%', '55%', '92%', '36%', '70%', '48%', '84%', '60%']
  return (
    <div className="relative flex h-full items-end justify-between gap-3 overflow-hidden bg-signal px-8 pb-0 pt-16">
      {heights.map((height) => (
        <span
          key={height}
          className="pulse-bar w-full origin-bottom bg-mist/90"
          style={{ height }}
        />
      ))}
    </div>
  )
}

function AtlasStage() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-3 bg-[#d5dee8] p-6">
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="atlas-cell border border-ink/20 bg-transparent"
        />
      ))}
    </div>
  )
}

const stages = [OrbitStage, NorthStage, PulseStage, AtlasStage]

export function Projects() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.orbit-spin', {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to('.north-scan', {
        xPercent: 520,
        duration: 2.8,
        repeat: -1,
        ease: 'none',
      })

      gsap.to('.pulse-bar', {
        scaleY: 0.25,
        duration: 0.85,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.12, yoyo: true, repeat: -1 },
      })

      const cells = gsap.utils.toArray<HTMLElement>('.atlas-cell')
      if (cells.length) {
        const hop = gsap.timeline({ repeat: -1 })
        cells.forEach((cell, i) => {
          hop
            .to(cells, { backgroundColor: 'transparent', duration: 0.15 }, i * 0.42)
            .to(cell, { backgroundColor: 'var(--signal)', duration: 0.3 }, i * 0.42)
        })
      }

      gsap.utils.toArray<HTMLElement>('.work-piece').forEach((piece, i) => {
        const stage = piece.querySelector('.work-stage')
        const copy = piece.querySelector('.work-copy')
        const fromLeft = i % 2 === 0

        if (stage) {
          gsap.from(stage, {
            clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
            duration: 1.15,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: piece, start: 'top 80%' },
          })
        }

        if (copy) {
          gsap.from(copy, {
            x: fromLeft ? -48 : 48,
            autoAlpha: 0,
            duration: 0.9,
            delay: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: piece, start: 'top 80%' },
          })
        }

        gsap.to(piece.querySelector('.work-shift'), {
          y: fromLeft ? -36 : 36,
          ease: 'none',
          scrollTrigger: {
            trigger: piece,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={root} className="section-pad py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
          Projects
        </p>
        <h2 className="mt-4 max-w-xl font-heading text-4xl font-semibold tracking-tight text-heading sm:text-6xl">
          Four tempos. One scroll.
        </h2>

        <div className="mt-20 flex flex-col gap-24 sm:gap-32">
          {projects.map((project, index) => {
            const Stage = stages[index] ?? OrbitStage
            const flip = index % 2 === 1

            return (
              <article key={project.id} className="work-piece grid items-center lg:grid-cols-12">
                <div
                  className={cn(
                    'work-copy relative z-10 bg-mist px-1 py-6 sm:px-2 lg:col-span-5 lg:px-8 lg:py-10',
                    flip ? 'lg:col-start-8 lg:-ml-10' : 'lg:col-start-1 lg:-mr-10 lg:row-start-1',
                  )}
                >
                  <p className="font-heading text-sm text-signal">
                    {project.id}
                    <span className="px-3 text-border">/</span>
                    <span className="text-muted-foreground">{project.year}</span>
                  </p>
                  <h3 className="mt-3 font-heading text-[clamp(2.4rem,4vw,4.2rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-heading">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm uppercase tracking-[0.16em] text-signal">
                    {project.category}
                  </p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-6 text-sm text-ink">{project.stack.join('  ·  ')}</p>
                </div>

                <div
                  className={cn(
                    'work-shift h-80 sm:h-[26rem] lg:col-span-8 lg:row-start-1 lg:h-[30rem]',
                    flip ? 'lg:col-start-1' : 'lg:col-start-5',
                  )}
                >
                  <div className="work-stage h-full overflow-hidden shadow-[0_30px_80px_-40px_rgba(11,18,32,0.45)]">
                    <Tilt>
                      <Stage />
                    </Tilt>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
