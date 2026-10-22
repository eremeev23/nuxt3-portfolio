export function useReducedMotion() {
  const preferred = usePreferredReducedMotion()
  const forced = useState<boolean | null>('reduced-motion', () => null) // manual override; null follows the OS setting
  const reducedMotion = computed(() => forced.value ?? preferred.value === 'reduce')
  return {
    reducedMotion,
    reduceMotion: () => (forced.value = true),
    activateMotion: () => (forced.value = false),
  }
}
