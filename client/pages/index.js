import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
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
        <AdjacencyMatrix {...{userId, setUserId}}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
