import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import AdjacencyList from '../components/AdjacencyList'
import AdjacencyMatrix from '../components/AdjacencyMatrix'
import UserIdInput from '../components/UserIdInput'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [userId, setUserId] = useState("q_QQ5kBBwlCcbL1s4NVK3g");

  return (
    <div className={styles.container}>
      <Head>
        <title className="text-2xl ">YelpFriends!</title>
        <meta name="description" content="YelpFriends: find new friends through mutual connections" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Hello, welcome to YelpFriends</h1>
        <UserIdInput {...{userId, setUserId}}/>
        <AdjacencyMatrix {...{userId}}/>
        <AdjacencyList {...{userId}}/>
      </main>

    </div>
  )
}
