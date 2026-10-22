<script setup lang="ts">
/*
 * Pixel-art flags for the locale selector: a 20×12 grid of 1px cells,
 * rendered at exactly 20×12px with crisp edges. Each flag is a list of
 * rectangles; the Union Jack's diagonals are stepped pixel by pixel.
 * Decorative: the selector carries the language name as text.
 */
type Rect = [x: number, y: number, w: number, h: number, fill: string]

const props = defineProps<{
  code: string
}>()

const W = 20
const H = 12

// Flag colors are the flags' own, not theme tokens.
const c = {
  white: '#ffffff',
  ruBlue: '#0039a6',
  ruRed: '#d52b1e',
  czBlue: '#11457e',
  czRed: '#d7141a',
  rsRed: '#c6363c',
  rsBlue: '#0c4076',
  esRed: '#aa151b',
  esYellow: '#f1bf00',
  ukBlue: '#012169',
  ukRed: '#c8102e',
  deBlack: '#000000',
  deRed: '#dd0000',
  deGold: '#ffce00',
  itGreen: '#009246',
  itRed: '#ce2b37',
  frBlue: '#0055a4',
  frRed: '#ef4135',
  ptGreen: '#006600',
  ptRed: '#ff0000',
  ptYellow: '#ffcc00',
}

function tricolor(top: string, middle: string, bottom: string): Rect[] {
  return [[0, 0, W, 4, top], [0, 4, W, 4, middle], [0, 8, W, 4, bottom]]
}

// Vertical bands; 20 does not split in three, so 7 / 6 / 7.
function verticalTricolor(left: string, middle: string, right: string): Rect[] {
  return [[0, 0, 7, H, left], [7, 0, 6, H, middle], [13, 0, 7, H, right]]
}

// The Czech wedge reaches the middle of the flag, stepped row by row.
function czech(): Rect[] {
  const rects: Rect[] = [[0, 0, W, 6, c.white], [0, 6, W, 6, c.czRed]]

  for (let y = 0; y < H; y++) {
    const distance = Math.min(y, H - 1 - y) + 0.5
    rects.push([0, y, Math.round((distance / (H / 2)) * (W / 2)), 1, c.czBlue])
  }

  return rects
}

// Diagonals stepped along both corner-to-corner lines: white 3px, red 1px inside.
function unionJack(): Rect[] {
  const rects: Rect[] = [[0, 0, W, H, c.ukBlue]]

  for (let x = 0; x < W; x++) {
    const y = Math.floor((x / W) * H)
    rects.push([x, y - 1, 1, 3, c.white], [x, H - 2 - y, 1, 3, c.white])
  }

  for (let x = 0; x < W; x++) {
    const y = Math.floor((x / W) * H)
    rects.push([x, y, 1, 1, c.ukRed], [x, H - 1 - y, 1, 1, c.ukRed])
  }

  rects.push(
    [8, 0, 4, H, c.white],
    [0, 4, W, 4, c.white],
    [9, 0, 2, H, c.ukRed],
    [0, 5, W, 2, c.ukRed],
  )

  return rects
}

const flags: Record<string, () => Rect[]> = {
  ru: () => tricolor(c.white, c.ruBlue, c.ruRed),
  en: unionJack,
  cs: czech,
  // Coat of arms reduced to a pixel shield with a white cross.
  sr: () => [
    ...tricolor(c.rsRed, c.rsBlue, c.white),
    [5, 3, 3, 6, c.rsRed],
    [6, 3, 1, 6, c.white],
    [5, 5, 3, 1, c.white],
  ],
  // 1:2:1; the coat of arms reduced to a pixel crest.
  es: () => [
    [0, 0, W, 3, c.esRed],
    [0, 3, W, 6, c.esYellow],
    [0, 9, W, 3, c.esRed],
    [5, 4, 3, 1, c.esYellow],
    [5, 5, 3, 3, c.esRed],
  ],
  de: () => tricolor(c.deBlack, c.deRed, c.deGold),
  it: () => verticalTricolor(c.itGreen, c.white, c.itRed),
  fr: () => verticalTricolor(c.frBlue, c.white, c.frRed),
  // Green / red 2:3; the armillary sphere and shield reduced to a pixel ring on the seam.
  pt: () => [
    [0, 0, 8, H, c.ptGreen],
    [8, 0, 12, H, c.ptRed],
    [6, 3, 4, 6, c.ptYellow],
    [7, 4, 2, 4, c.white],
    [7, 5, 2, 2, c.ptRed],
  ],
}

const rects = computed(() => flags[props.code]?.() ?? [])
</script>

<template>
  <svg
    class="pixel-flag"
    :viewBox="`0 0 ${W} ${H}`"
    :width="W"
    :height="H"
    shape-rendering="crispEdges"
    aria-hidden="true"
  >
    <rect
      v-for="([x, y, w, h, fill], index) in rects"
      :key="index"
      :x="x"
      :y="y"
      :width="w"
      :height="h"
      :fill="fill"
    />
  </svg>
</template>

<style scoped>
/* A 1px frame so the white bands read on the cream light background. */
.pixel-flag {
  flex-shrink: 0;
  outline: 1px solid var(--line);
  image-rendering: pixelated;
}
</style>
