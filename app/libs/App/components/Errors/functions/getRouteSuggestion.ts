/*
 * The section a mistyped URL most likely meant: `/en/blogs` → `/blog`,
 * `/projetcs/foo` → `/projects`. Pure on purpose (no composables), so the
 * caller localizes the result and it can be unit-tested.
 *
 * Only the first path segment is compared, after dropping a locale prefix;
 * a section matches when one is a prefix of the other or they are at most
 * two edits apart. The home path `/` is never suggested.
 */
export function getRouteSuggestion(
  wrongPath: string | undefined,
  paths: string[],
  localeCodes: readonly string[] = [],
): string | undefined {
  const segments = (wrongPath ?? '').split(/[?#]/)[0]!.split('/').filter(Boolean)

  if (segments[0] && localeCodes.includes(segments[0])) {
    segments.shift()
  }

  const wrong = segments[0]?.toLowerCase()

  if (!wrong) {
    return undefined
  }

  return paths.find(path => {
    const section = path.split('/').filter(Boolean)[0]

    return !!section
      && (wrong.startsWith(section) || section.startsWith(wrong) || distance(wrong, section) <= 2)
  })
}

// Levenshtein distance.
function distance(a: string, b: string) {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)

  for (let i = 1; i <= a.length; i++) {
    const current = [i]

    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        previous[j]! + 1,
        current[j - 1]! + 1,
        previous[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }

    previous = current
  }

  return previous[b.length]!
}
