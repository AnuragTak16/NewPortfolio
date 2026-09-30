import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Marquee } from '@/components/sections/marquee'
import { Projects } from '@/components/sections/projects'
import { Experience } from '@/components/sections/experience'
import { Stack } from '@/components/sections/stack'
import { Connect } from '@/components/sections/connect'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <Projects />
      <Experience />
      <Stack />
      <Connect />
    </>
  )
}
