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

/** Dance studio — class schedule + enrollment roster UI */
function StudioStage() {
  const classes = [
    { name: 'Contemporary', time: '09:00', seats: '12/16' },
    { name: 'Hip-Hop Batch A', time: '11:30', seats: '18/20' },
    { name: 'Ballet Foundations', time: '16:00', seats: '08/14' },
  ]
  const students = ['Asha K.', 'Rohan M.', 'Priya S.', 'Dev P.']

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-heading text-mist">
      <div className="studio-glow pointer-events-none absolute -right-16 top-0 size-56 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--signal)_40%,transparent),transparent_70%)]" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-signal-soft">
            Studio admin
          </p>
          <p className="mt-1 font-heading text-lg font-semibold">Today&apos;s classes</p>
        </div>
        <span className="studio-pulse rounded-full bg-signal px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
          Live
        </span>
      </div>

      <div className="relative z-10 flex-1 space-y-3 overflow-hidden px-5 py-5">
        {classes.map((item) => (
          <div
            key={item.name}
            className="studio-row flex items-center justify-between border border-white/10 bg-white/5 px-4 py-3"
          >
            <div>
              <p className="font-heading text-sm font-semibold">{item.name}</p>
              <p className="mt-1 text-xs text-mist/55">{item.time}</p>
            </div>
            <p className="text-xs text-signal-soft">{item.seats}</p>
          </div>
        ))}

        <div className="studio-row mt-2 border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-mist/45">
            Enrollment
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {students.map((name) => (
              <span
                key={name}
                className="studio-chip border border-white/15 bg-white/5 px-2.5 py-1 text-xs"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.16em] text-mist/50">
        <span>Stripe billing</span>
        <span className="text-signal-soft">MERN · JWT</span>
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
        '.studio-row',
        { autoAlpha: 0, x: -16 },
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.studio-row', start: 'top 90%' },
        },
      )

      gsap.to('.studio-pulse', {
        scale: 1.06,
        duration: 1.1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      gsap.to('.studio-glow', {
        x: 18,
        y: 12,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">
          Projects
        </p>
        <h2 className="mt-4 max-w-xl font-heading text-4xl font-semibold tracking-tight text-heading sm:text-6xl">
          Work that shipped to production.
        </h2>

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
                  <p className="font-heading text-sm text-signal">
                    {project.id}
                    <span className="px-3 text-heading/25">/</span>
                    <span className="text-muted-foreground">{project.year}</span>
                  </p>
                  <h3 className="mt-3 font-heading text-[clamp(2.2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-heading">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
                    {project.category}
                  </p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-7 text-sm text-heading/80">
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
