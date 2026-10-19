import { describe, expect, it } from 'vitest'
import { getRandomInt } from '../../app/libs/App/functions/useRandomUtils'

describe('getRandomInt', () => {
  it('returns an integer within the inclusive range', () => {
    for (let i = 0; i < 100; i++) {
      const n = getRandomInt(1, 20)
      expect(Number.isInteger(n)).toBe(true)
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(20)
    }
  })
})
