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

      <div className="w-screen justify-between flex items-center flex-col">
        <div className="w-screen h-40 flex flex-col items-center justify-center bg-red-50">
          <div className="mb-4 gap-x-1 flex items-center">
            <img src="/logo.png" className="h-11" />
            <h1 className="text-4xl font-bold">friends</h1>
          </div>

          {/* <LoadData /> */}
          <UserIdInput {...{ userId, setUserId }} />
        </div>

        {/* <AdjacencyMatrix {...{ userId }} />
        <AdjacencyList {...{ userId }} /> */}
        <div className="p-8 w-screen">
          <div className="grid grid-cols-4 gap-x-8">
            <div className="p-4 bg-gray-50 rounded-3xl col-span-2 grid grid-rows-4 gap-y-4">
              <div className="grid grid-cols-4 gap-x-4">
                <div />
                <div className="px-4 text-center">
                  Populate data
                </div>
                <div className="px-4 text-center">
                  Get 1st degree friends
                </div>
                <div className="px-4 text-center">
                  Get 2nd degree friends
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-4">
                <div>
                  Using Adjacency Matrix
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-4">
                <div>
                  Using Adjacency List
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-4">
                <div>
                  Using Tree
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
                <div className="bg-white rounded-2xl">
                  Button
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl col-span-1">
              1st Degree Friends
            </div>

            <div className="bg-gray-50 rounded-3xl col-span-1">
              2nd Degree Friends
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
