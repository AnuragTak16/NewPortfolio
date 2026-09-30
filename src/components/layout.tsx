import type { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import { CursorGlow, ScrollProgress } from '@/components/motion'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { site } from '@/data/portfolio'

export function Layout({ children }: { children: ReactNode }) {
  useSmoothScroll()

  return (
    <div className="relative min-h-svh overflow-x-hidden">
      <div className="noise-overlay" aria-hidden />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>{children}</main>
      <footer className="section-pad border-t border-border/70 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-heading text-sm font-semibold text-heading">{site.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{site.role}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Full-stack portfolio · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
