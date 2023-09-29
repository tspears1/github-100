import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//  get the top 100 most starred Github repositories
//  display the list of repositories in a table
//  each row should contain the repository name, description, number of stars, open issues count, and the owner name

import { Octokit } from 'octokit'

const octokit = new Octokit({ auth: import.meta.env.GITHUB_PERSONAL_ACCESS_TOKEN })
const { data } = await octokit.request('GET /search/repositories', {
  q: 'stars:>1000',
  sort: 'stars',
  order: 'desc',
  page: 1,
  per_page: 100,
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>First Result: { data?.items?.length ?? 0 }</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
