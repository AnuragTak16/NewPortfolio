import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Send } from 'lucide-react'
import { site, socials } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export function Connect() {
  const root = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    const revealForm = () => {
      gsap.fromTo(
        '.connect-letter',
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.03,
          ease: 'power4.out',
          scrollTrigger: { trigger: root.current, start: 'top 72%' },
        },
      )
      gsap.fromTo(
        '.connect-panel',
        { autoAlpha: 0, scale: 0.96, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 68%' },
        },
      )
    }

    mm.add('(min-width: 768px)', () => {
      const mask = root.current?.querySelector('.connect-mask')
      if (!mask) return

      gsap.set(mask, { clipPath: 'circle(0% at 50% 72%)' })
      gsap.set('.connect-letter', { yPercent: 110, autoAlpha: 0 })
      gsap.set('.connect-panel', { autoAlpha: 0, scale: 0.96 })
      gsap.set('.connect-ghost', { scale: 1.1, opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        mask,
        { clipPath: 'circle(0% at 50% 72%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none', duration: 1 },
      )
        .fromTo(
          '.connect-ghost',
          { scale: 1.1, opacity: 1 },
          { scale: 0.8, opacity: 0, ease: 'none', duration: 0.65 },
          0,
        )
        .fromTo(
          '.connect-letter',
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.025, ease: 'none', duration: 0.5 },
          0.35,
        )
        .fromTo(
          '.connect-panel',
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, ease: 'none', duration: 0.45 },
          0.5,
        )

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    mm.add('(max-width: 767px)', () => {
      gsap.set('.connect-mask', { clipPath: 'circle(150% at 50% 50%)' })
      gsap.set('.connect-ghost', { opacity: 0 })
      revealForm()
    })

    return () => mm.revert()
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const word = "Let's connect"

  return (
    <section id="connect" ref={root} className="relative bg-mist">
      <div className="connect-stage relative flex min-h-svh items-center overflow-hidden">
        <p className="connect-ghost pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-heading text-[clamp(3.2rem,12vw,10rem)] font-semibold leading-none tracking-[-0.05em] text-ink/10">
          Let&apos;s connect
        </p>

        <div
          className="connect-mask absolute inset-0 flex items-center bg-ink text-mist"
          style={{ clipPath: 'circle(0% at 50% 72%)' }}
        >
          <div className="section-pad mx-auto grid w-full max-w-7xl items-center gap-10 py-24 lg:grid-cols-[1fr_1fr]">
            <div style={{ perspective: '1200px' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal-soft">
                Contact
              </p>
              <h2 className="mt-4 font-heading text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
                {word.split(' ').map((part) => (
                  <span key={part} className="block overflow-hidden">
                    {part.split('').map((char, i) => (
                      <span
                        key={`${part}-${i}`}
                        className="connect-letter inline-block"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="group mt-8 inline-flex items-center gap-2 text-lg text-mist/80 transition-colors hover:text-signal-soft"
              >
                {site.email}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <ul className="mt-8 flex gap-6">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-mist/60 transition-colors hover:text-mist"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={onSubmit}
              className="connect-panel space-y-4 border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-mist/50">
                  Name
                </span>
                <input
                  required
                  name="name"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-mist outline-none focus:border-signal-soft"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-mist/50">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-mist outline-none focus:border-signal-soft"
                  placeholder="you@studio.com"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-mist/50">
                  Message
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-mist outline-none focus:border-signal-soft"
                  placeholder="Tell me about the project…"
                />
              </label>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-mist px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-signal-soft"
                >
                  Send
                  <Send className="size-4" />
                </button>
                {sent && (
                  <p className="text-sm text-signal-soft">Thanks — I&apos;ll reply soon.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
