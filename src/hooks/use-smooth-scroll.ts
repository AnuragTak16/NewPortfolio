import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
    })

    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisInstance = null
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

export function scrollToId(id: string) {
  const el = document.querySelector(id)
  if (!el) return

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: -8 })
    return
  }

  el.scrollIntoView({ behavior: 'smooth' })
}
