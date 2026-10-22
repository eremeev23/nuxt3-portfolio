import type { RouteLocationRaw } from 'vue-router'

export type Variant = 'accent' | 'line' | 'white'

export type BrutButtonProps = {
  label?: string
  prependIcon?: string
  appendIcon?: string
  variant?: Variant
  /** Renders a locale-aware link instead of a <button>. */
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
  sticky?: {
    enabled?: boolean
    maxTransform?: number
  }
  ui?: {
    buttonClass?: string
    labelClass?: string
  }
}
