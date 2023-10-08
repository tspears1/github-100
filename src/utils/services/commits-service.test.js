import { expect, expectTypeOf, test } from 'vitest'
import { getCommits } from '@utils/services/commits-service'

test('getCommits', async () => {
    const commits = await getCommits('tspears1/github-100')
    expectTypeOf(commits).toEqualTypeOf([])
    if (commits.length > 0) {
        expect(commits[0]).toMatchInlineSnapshot(
            {
                author: expect.any(String),
                avatar: expect.any(String),
                date: expect.any(String),
                hours: expect.any(String),
                message: expect.any(String),
                sha: expect.any(String),
                shortSha: expect.any(String),
                url: expect.any(String),
            }, `
          {
            "author": Any<String>,
            "avatar": Any<String>,
            "date": Any<String>,
            "hours": Any<String>,
            "message": Any<String>,
            "sha": Any<String>,
            "shortSha": Any<String>,
            "url": Any<String>,
          }
        `)
    }
})

