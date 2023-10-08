import { test, expect } from 'vitest'
import { formatRank } from '@utils/formatters/card-formatter'

test('formatRank', () => {
    expect(formatRank(-1)).toBe('000')
    expect(formatRank(0)).toBe('001')
    expect(formatRank(1)).toBe('002')
})