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
        <div className="w-screen h-40 flex flex-col items-center justify-center bg-theme">
          <div className="mb-4 gap-x-1 flex items-center">
            <img src="/logo.png" className="h-11" />
            <h1 className="text-4xl font-bold">friends</h1>
          </div>

          {/* <LoadData /> */}
          <UserIdInput {...{ userId, setUserId }} />
        </div>

        <div className="p-8 w-screen">
          <div className="grid grid-cols-4 gap-x-8">
            <div className="p-6 bg-gray-50 rounded-3xl col-span-2 gap-y-4">
              <div className="grid grid-cols-4 gap-x-4 mb-3">
                <div />
                <div className="text-sm text-gray-400 font-semibold px-4 text-center">
                  Populate data
                </div>
                <div className="text-sm text-gray-400 font-semibold px-4 text-center">
                  Get 1st degree friends
                </div>
                <div className="text-sm text-gray-400 font-semibold px-4 text-center">
                  Get 2nd degree friends
                </div>
              </div>
              <div className="grid grid-rows-3 gap-y-4">
                <AdjacencyMatrix {...{ userId }} />
                <AdjacencyList {...{ userId }} />
                <div className="grid grid-cols-4 gap-x-4">
                  <div className="flex items-center text-sm text-gray-500 font-semibold">
                    Using Tree
                  </div>
                  <div className="flex items-center justify-center bg-white shadow hover:bg-gray-100 cursor-pointer rounded-2xl">
                    <img src="/playButton.png" className="h-7" />
                  </div>
                  <div className="flex items-center justify-center bg-white shadow hover:bg-gray-100 cursor-pointer rounded-2xl">
                    <img src="/playButton.png" className="h-7" />
                  </div>
                  <div className="flex items-center justify-center bg-white shadow hover:bg-gray-100 cursor-pointer rounded-2xl">
                    <img src="/playButton.png" className="h-7" />
                  </div>
                </div>
              </div>

              <div className="border-t-2 pt-4 mt-5 grid grid-cols-4 gap-x-4">
                <div className="flex items-center text-sm text-gray-500 font-semibold">
                  Fastest
                </div>
                <div className="h-14 flex items-center justify-center bg-white shadow rounded-2xl" />
                <div className="flex items-center justify-center bg-white shadow rounded-2xl" />
                <div className="flex items-center justify-center bg-white shadow rounded-2xl" />
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