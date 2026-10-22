import type { Variant } from '~/libs/App/components/BrutButton/types/brut-button-props.type.ts'

export const BASE = 'flex justify-center items-center gap-2 min-h-11 px-5 py-3.5 max-[520px]:px-4 '
  + 'max-[520px]:py-[13px] font-mono font-800 text-xs tracking-[.03em] '
  + 'uppercase no-underline cursor-pointer transition-colors text-center'

export const VARIANTS: Record<Variant, string> = {
  accent: 'bg-accent text-onAccent hover:brightness-108',
  line: 'brut text-muted hover:text-fg hover:border-fg',
  white: 'bw b-solid border-onAccent text-onAccent hover:bg-onAccent hover:text-accent',
}
