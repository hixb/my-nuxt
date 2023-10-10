/**
 * Link association
 */
type Relation =
  'alternate'
  | 'author'
  | 'bookmark'
  | 'canonical'
  | 'dns-prefetch'
  | 'external'
  | 'help'
  | 'icon'
  | 'import'
  | 'license'
  | 'manifest'
  | 'modulepreload'
  | 'next'
  | 'nofollow'
  | 'noopener'
  | 'noreferrer'
  | 'opener'
  | 'pingback'
  | 'preconnect'
  | 'prefetch'
  | 'preload'
  | 'prerender'
  | 'prev'
  | 'search'
  | 'shortlink'
  | 'stylesheet'
  | 'tag'

/**
 * Sidebar switching parameters 0-switch 1-open 2-close
 */
type AsideAlways = 0 | 1 | 2

// Target
type Target = '_blank' | '_self' | 'target' | '_parent' | '_top'
