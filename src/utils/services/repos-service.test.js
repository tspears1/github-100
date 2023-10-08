import { expect, expectTypeOf, test } from 'vitest'
import { getRepos } from '@utils/services/repos-service'

test('getRepos', async () => {
    const repos = await getRepos()
    expectTypeOf(repos).toEqualTypeOf([])
    expect(repos.length).toBe(100)
    expect(repos[0]).toMatchInlineSnapshot({
        avatar: expect.any(String),
        commits: null,
        description: expect.any(String),
        fullname: expect.any(String),
        id: expect.any(Number),
        index: 0,
        name: expect.any(String),
        owner: expect.any(String),
        stars: expect.any(Number),
        url: expect.any(String),
    }, `
      {
        "avatar": Any<String>,
        "commits": null,
        "description": Any<String>,
        "fullname": Any<String>,
        "id": Any<Number>,
        "index": 0,
        "name": Any<String>,
        "owner": Any<String>,
        "stars": Any<Number>,
        "url": Any<String>,
      }
    `)
})

