import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AdjacencyList from '../components/AdjacencyList'
import AdjacencyMatrix from '../components/AdjacencyMatrix'
import LoadData from '../components/LoadData'
import UserIdInput from '../components/UserIdInput'
import Tree from '../components/Tree'
import FirstDegree from '../components/FirstDegree'
import SecondDegree from '../components/SecondDegree'
import { Modal, Tooltip } from 'antd';
import { BsFillQuestionCircleFill } from 'react-icons/bs'

export default function Home() {

  const [userId, setUserId] = useState("q_QQ5kBBwlCcbL1s4NVK3g");
  const [firstDegree, setFirstDegree] = useState([]);
  const [secondDegree, setSecondDegree] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, [])

  return (
    <div>
      <Head>
        <title>YelpFriends!</title>
        <meta name="description" content="YelpFriends: find new friends through mutual connections" />
        <link rel="icon" href="/yelp_burst.png" />
      </Head>

      <div className="w-screen justify-between flex items-center flex-col">
        <Modal title="How to use" visible={isModalOpen} centered closeable footer={null} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
          <div>Instructions...</div>
          <div>Instructions...</div>
          <div>Instructions...</div>
          <div>Instructions...</div>
        </Modal>
        <div className="w-screen h-40 flex flex-col items-center justify-center bg-theme">
          <div className="mb-4 flex justify-center items-center gap-x-4">
            <div className="flex items-center" >
              <img src="/logo.png" className="h-16" />
            </div>
            <Tooltip placement="right" title="Need help?">
              <BsFillQuestionCircleFill className="h-8 w-8 text-gray-900 hover:text-red-600 cursor-pointer" onClick={() => setIsModalOpen(true)} />
            </Tooltip>
          </div>
          <div className="flex gap-x-4">
            <LoadData />
            <UserIdInput {...{ userId, setUserId }} />
          </div>
        </div>

        <div className="p-8 w-screen">
          <div className="grid grid-cols-5 gap-x-8">
            <div className="p-6 bg-gray-50 rounded-3xl col-span-2 gap-y-4">
              <div className="grid grid-cols-4 gap-x-4 mb-3">
                <div />
                <div className="text-sm text-gray-400 font-semibold text-center">
                  Populate data
                </div>
                <div className="text-sm text-gray-400 font-semibold text-center">
                  Get 1st degree friends
                </div>
                <div className="text-sm text-gray-400 font-semibold text-center">
                  Get 2nd degree friends
                </div>
              </div>
              <div className="grid grid-rows-3 gap-y-4">
                <AdjacencyMatrix {...{ userId, setFirstDegree, setSecondDegree }} />
                <AdjacencyList {...{ userId, setFirstDegree, setSecondDegree }} />
                <Tree {...{ userId, setFirstDegree, setSecondDegree }} />
              </div>

              <div className="border-t-2 pt-5 mt-6 grid grid-cols-4 gap-x-4">
                <div className="flex items-center text-sm text-gray-500 font-semibold">
                  Fastest
                </div>
                <div className="h-14 flex items-center justify-center bg-white shadow rounded-2xl" />
                <div className="flex items-center justify-center bg-white shadow rounded-2xl" />
                <div className="flex items-center justify-center bg-white shadow rounded-2xl" />
              </div>
            </div>

            <div className="col-span-3 grid grid-cols-2 gap-x-8">
              <FirstDegree {...{ firstDegree }} />
              <SecondDegree {...{ secondDegree }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}