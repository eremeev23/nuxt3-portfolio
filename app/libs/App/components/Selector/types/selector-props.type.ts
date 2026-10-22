export type SelectorProps<T extends string | number> = {
  options: SelectorOption<T>[]
  /** Accessible name for the trigger button. */
  ariaLabel?: string
  /** Classes for the trigger button (the selector itself only lays it out). */
  triggerClass?: string
  /** Open the options above the trigger (for a selector at the bottom of the screen). */
  dropUp?: boolean
  /** Which edge of the trigger the options line up with (`right` near the end of a row). */
  align?: 'left' | 'right'
}

export type SelectorOption<T extends string | number> = {
  value: T
  label: string
}
