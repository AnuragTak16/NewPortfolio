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

/** Dance studio — Enrollio product shot */
function StudioStage() {
  return (
    <div className="relative h-full overflow-hidden bg-[#f4f1ea]">
      <img
        src="/projects/class-registration-hero.webp"
        alt="Enrollio dance studio platform — student classes and enrollment UI"
        className="studio-img absolute inset-0 h-full w-full object-cover object-left-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heading/25 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
          Enrollio
        </p>
        <p className="text-[10px] uppercase tracking-[0.16em] text-mist/70">
          Studio SaaS
        </p>
      </div>
    </div>
  )
}

/** Restaurant — floor plan with live table statuses */
function WaitlistStage() {
  const tables = [
    { id: 'T1', status: 'seated', seats: 2 },
    { id: 'T2', status: 'free', seats: 4 },
    { id: 'T3', status: 'wait', seats: 2 },
    { id: 'T4', status: 'seated', seats: 6 },
    { id: 'T5', status: 'free', seats: 4 },
    { id: 'T6', status: 'free', seats: 2 },
    { id: 'T7', status: 'wait', seats: 4 },
    { id: 'T8', status: 'seated', seats: 2 },
  ] as const

  const waitlist = [
    { name: 'Garcia · 4', eta: '12m' },
    { name: 'Chen · 2', eta: '8m' },
    { name: 'Patel · 6', eta: '18m' },
  ]

  return (
    <div className="relative flex h-full overflow-hidden bg-[#e8ebe7]">
      <div className="flex flex-1 flex-col border-r border-heading/10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-signal">
              Floor plan
            </p>
            <p className="mt-1 font-heading text-lg font-semibold text-heading">
              Dining room
            </p>
          </div>
          <span className="table-pulse flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-heading/55">
            <span className="size-1.5 rounded-full bg-signal" />
            Socket live
          </span>
        </div>

        <div className="mt-5 grid flex-1 grid-cols-4 gap-2.5 content-start">
          {tables.map((table) => (
            <div
              key={table.id}
              className={cn(
                'table-cell flex aspect-square flex-col items-center justify-center border',
                table.status === 'free' && 'border-heading/20 bg-mist text-heading',
                table.status === 'seated' && 'border-heading/30 bg-heading text-mist',
                table.status === 'wait' && 'border-signal/40 bg-signal-soft text-heading',
              )}
            >
              <span className="font-heading text-sm font-semibold">{table.id}</span>
              <span className="mt-0.5 text-[10px] opacity-70">{table.seats}p</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-[42%] flex-col bg-mist p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-signal">
          Waitlist
        </p>
        <div className="mt-4 flex-1 space-y-2.5">
          {waitlist.map((party) => (
            <div
              key={party.name}
              className="wait-row flex items-center justify-between border-b border-heading/10 pb-2.5"
            >
              <span className="text-sm font-medium text-heading">{party.name}</span>
              <span className="text-xs text-signal">{party.eta}</span>
            </div>
          ))}
        </div>
        <p className="mt-auto pt-3 text-[10px] uppercase tracking-[0.16em] text-heading/45">
          FastAPI · Postgres
        </p>
      </div>
    </div>
  )
}

const stages = [StudioStage, WaitlistStage]

export function Projects() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.studio-img',
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.studio-img',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      const tableTl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
      const cells = gsap.utils.toArray<HTMLElement>('.table-cell')
      if (cells.length) {
        cells.forEach((cell, i) => {
          tableTl.to(
            cell,
            {
              boxShadow: '0 0 0 2px color-mix(in oklab, var(--signal) 55%, transparent)',
              duration: 0.25,
              yoyo: true,
              repeat: 1,
            },
            i * 0.35,
          )
        })
      }

      gsap.to('.table-pulse span:first-child', {
        opacity: 0.25,
        duration: 0.7,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      gsap.fromTo(
        '.wait-row',
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: { trigger: '.wait-row', start: 'top 92%' },
        },
      )

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
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-signal">
          / 02 Selected work
        </p>
        <h2 className="mt-5 max-w-2xl font-heading text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-heading">
          Real projects. Real production.
        </h2>
        <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
          Built, shipped, and maintained — not demos.
        </p>

        <div className="mt-20 flex flex-col gap-28 sm:gap-36">
          {projects.map((project, index) => {
            const Stage = stages[index] ?? StudioStage
            const flip = index % 2 === 1

            return (
              <article
                key={project.id}
                className="work-piece relative grid items-center gap-6 lg:grid-cols-12 lg:gap-0"
              >
                <div
                  className={cn(
                    'work-shift order-1 h-72 sm:h-[24rem] lg:col-span-8 lg:h-[32rem]',
                    flip ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-5 lg:row-start-1',
                  )}
                >
                  <div className="work-stage h-full overflow-hidden shadow-[0_28px_70px_-36px_rgba(11,31,58,0.42)]">
                    <Tilt>
                      <Stage />
                    </Tilt>
                  </div>
                </div>

                <div
                  className={cn(
                    'work-copy relative z-20 order-2 border border-border/60 bg-mist px-6 py-8 sm:px-8 sm:py-10 lg:col-span-5 lg:row-start-1 lg:shadow-[0_24px_60px_-28px_rgba(11,31,58,0.22)]',
                    flip
                      ? 'lg:col-start-8 lg:-ml-16'
                      : 'lg:col-start-1 lg:-mr-16',
                  )}
                >
                  <p className="font-heading text-[0.8rem] text-signal">
                    {project.id}
                    <span className="px-3 text-heading/25">/</span>
                    <span className="text-muted-foreground">{project.year}</span>
                  </p>
                  <h3 className="mt-3 font-heading text-[clamp(2.4rem,4.2vw,4rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-heading">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-signal">
                    {project.category}
                  </p>
                  <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                    {project.description}
                  </p>
                  <p className="mt-7 text-[0.8rem] uppercase tracking-[0.12em] text-heading/70">
                    {project.stack.join('  ·  ')}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
