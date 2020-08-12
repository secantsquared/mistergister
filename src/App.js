import React, { useEffect, useState } from 'react'
import { request } from '@octokit/request'
import { BASE_URL } from './constants'

import './App.css'

export default function App() {
  const [gists, setGists] = useState([])

  useEffect(() => {
    const authedRequest = request.defaults({
      headers: {
        authorization: `token ${process.env.API_TOKEN}`
      }
    })

    authedRequest(`${BASE_URL}/gists`)
      .then(({ data }) => {
        setGists(data)
      })
      .catch(err => console.error(err))
  }, [])

  console.log(gists)

  return (
    <div className="App">
      <div className="title">
        <p>Mister Gister!</p>
        <div className="gists">
          {gists.map(gist => (
            <a href={gist.html_url} key={gist.id}>
              {gist.description}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
