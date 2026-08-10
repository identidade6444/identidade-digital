import { useLenis } from 'lenis/react'

const HEADER_OFFSET = -84

export function useAnchorScroll() {
  const lenis = useLenis()

  return (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return

    event.preventDefault()

    if (lenis) {
      lenis.scrollTo(href, { offset: HEADER_OFFSET })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    if (history.pushState) {
      history.pushState(null, '', href)
    }
  }
}
