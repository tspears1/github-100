import { test, expect } from 'vitest'
import { formatCommitDate, formatCommitData } from '@utils/formatters/commit-formatter'

test('formatCommitDate', () => {
    const now = new Date()
    const tenMinutesAgo = new Date(now.getTime() - 600000)
    const tenHoursAgo = new Date(now.getTime() - 36000000)
    expect(formatCommitDate(now)).toBe('just now')
    expect(formatCommitDate(tenMinutesAgo)).toBe('10 minutes ago')
    expect(formatCommitDate(tenHoursAgo)).toBe('10 hours ago')
})

test('formatCommitData', () => {
    const unfilteredData = {
        items: [
            {
                "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "node_id": "MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==",
                "html_url": "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "comments_url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
                "commit": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "author": {
                        "name": "Monalisa Octocat",
                        "email": "support@github.com",
                        "date": "2011-04-14T16:00:49Z"
                    },
                    "committer": {
                        "name": "Monalisa Octocat",
                        "email": "support@github.com",
                        "date": "2011-04-14T16:00:49Z"
                    },
                    "message": "Fix all the bugs",
                    "tree": {
                        "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                        "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                    },
                    "comment_count": 0,
                    "verification": {
                        "verified": false,
                        "reason": "unsigned",
                        "signature": null,
                        "payload": null
                    }
                },
                "author": {
                    "login": "octocat",
                    "id": 1,
                    "node_id": "MDQ6VXNlcjE=",
                    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/octocat",
                    "html_url": "https://github.com/octocat",
                    "followers_url": "https://api.github.com/users/octocat/followers",
                    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
                    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
                    "organizations_url": "https://api.github.com/users/octocat/orgs",
                    "repos_url": "https://api.github.com/users/octocat/repos",
                    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/octocat/received_events",
                    "type": "User",
                    "site_admin": false
                },
                "committer": {
                    "login": "octocat",
                    "id": 1,
                    "node_id": "MDQ6VXNlcjE=",
                    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/octocat",
                    "html_url": "https://github.com/octocat",
                    "followers_url": "https://api.github.com/users/octocat/followers",
                    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
                    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
                    "organizations_url": "https://api.github.com/users/octocat/orgs",
                    "repos_url": "https://api.github.com/users/octocat/repos",
                    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/octocat/received_events",
                    "type": "User",
                    "site_admin": false
                },
                "parents": [
                    {
                        "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                        "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                    }
                ]
            }
        ]
    }
    const formatted = formatCommitData(unfilteredData)
    expect(formatted[0].author).toBe('octocat')
    expect(formatted[0].avatar).toBe('https://github.com/images/error/octocat_happy.gif')
    expect(formatted[0].date).toBe('2011-04-14T16:00:49Z')
    expect(formatted[0].hours).toBe(formatCommitDate(formatted[0].date))
    expect(formatted[0].message).toBe('Fix all the bugs')
    expect(formatted[0].sha).toBe('6dcb09b5b57875f334f61aebed695e2e4193db5e')
    expect(formatted[0].shortSha).toBe('6dcb09b')
    expect(formatted[0].url).toBe('https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e')
})