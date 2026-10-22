/*
 * Custom plural pickers for the Slavic locales (three forms: one / few / many).
 * vue-i18n passes the number and how many forms the message has; a message
 * written with fewer forms gets the last one it has. en and es use the default
 * two-form rule.
 */
function pick(index: number, choicesLength: number) {
  return Math.min(index, choicesLength - 1)
}

export const pluralRules = {
  ru: (value: number, choicesLength: number) =>
    pick(value === 1 ? 0 : value > 0 && value <= 4 ? 1 : 2, choicesLength),
  cs: (value: number, choicesLength: number) =>
    pick(value === 1 ? 0 : value >= 2 && value <= 4 ? 1 : 2, choicesLength),
  sr: (value: number, choicesLength: number) => {
    const mod10 = value % 10
    const mod100 = value % 100

    if (mod10 === 1 && mod100 !== 11) {
      return pick(0, choicesLength)
    }

    return pick(mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 1 : 2, choicesLength)
  },
  en: (value: number) => (value === 1 ? 0 : 1),
  // French counts 0 as singular; de / it / es / pt use the default two-form rule.
  fr: (value: number) => (value <= 1 ? 0 : 1),
}
