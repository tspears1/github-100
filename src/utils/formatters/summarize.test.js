import { test, expect } from 'vitest'
import { summarize } from '@utils/formatters/summarize'

test('summarize', () => {
    const longParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
    const shortParagraph = 'Lorem ipsum dolor sit amet.'
    const longNumber = '1234567890'

    expect(summarize(longParagraph, 5, true)).toBe('Lorem...')
    expect(summarize(shortParagraph, 30, true)).toBe('Lorem ipsum dolor sit amet.')
    expect(summarize(longNumber, 5)).toBe('12345')
})
