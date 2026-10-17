export const pluralRules = {
  'ru': (value: number) => (value === 1 ? 0 : value > 0 && value <= 4 ? 1 : 2),
  'en': (value: number) => (value === 1 ? 0 : 1),
}
