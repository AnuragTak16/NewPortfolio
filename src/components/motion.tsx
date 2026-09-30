import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type MouseEvent,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function splitWords(text: string) {
  return text.split(' ').filter(Boolean)
}

/** Line/word clip reveal — common Awwwards-style entrance */
export function RevealText({
  text,
  as: Tag = 'h1',
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.rw')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, rotate: 4, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1,
          stagger,
          delay,
          ease: 'power4.out',
        },
      )
    })
    return () => ctx.revert()
  }, [text, delay, stagger])

  const Comp = Tag as 'h1'

  return (
    <Comp ref={ref as never} className={cn(className)}>
      {splitWords(text).map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
          <span className="rw inline-block will-change-transform">{word}&nbsp;</span>
        </span>
      ))}
    </Comp>
  )
}

export function useScrollReveal(
  selector = '.reveal',
  options?: { y?: number; stagger?: number; start?: string },
) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector)
      if (!targets.length) return
      gsap.fromTo(
        targets,
        { y: options?.y ?? 56, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: options?.stagger ?? 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: options?.start ?? 'top 78%',
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [selector, options?.y, options?.stagger, options?.start])

  return root
}

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' })
  }

  return (
    <div
      ref={ref}
      className={cn('inline-flex will-change-transform', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

export function PageShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      )
    })
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={cn('min-h-svh', className)}>
      {children}
    </div>
  )
}

export function useParallax(strength = 40) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: strength,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [strength])

  return ref
}

export function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const move = (e: globalThis.MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' })
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' })
    }

    const down = () => gsap.to(ring.current, { scale: 0.7, duration: 0.2 })
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3 })

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal md:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/25 md:block"
      />
    </>
  )
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-transparent">
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-signal"
      />
    </div>
  )
}
