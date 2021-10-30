import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import AdjacencyList from '../components/AdjacencyList'
import AdjacencyMatrix from '../components/AdjacencyMatrix'
import LoadData from '../components/LoadData'
import UserIdInput from '../components/UserIdInput'

export default function Home() {

  const [userId, setUserId] = useState("q_QQ5kBBwlCcbL1s4NVK3g");

  return (
    <div>
      <Head>
        <title>YelpFriends!</title>
        <meta name="description" content="YelpFriends: find new friends through mutual connections" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className="w-screen h-80 justify-between flex items-center flex-col">
        <h1 className="text-2xl font-bold">Hello, welcome to YelpFriends</h1>
        <LoadData />
        <UserIdInput {...{userId, setUserId}}/>
        <AdjacencyMatrix {...{userId}}/>
        <AdjacencyList {...{userId}}/>
        </div>

    </div>
  )
}
