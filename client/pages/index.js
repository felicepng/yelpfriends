import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import AdjacencyList from '../components/AdjacencyList'
import AdjacencyMatrix from '../components/AdjacencyMatrix'
import LoadData from '../components/LoadData'
import UserIdInput from '../components/UserIdInput'
import Tree from '../components/Tree'
import FirstDegree from '../components/FirstDegree'
import SecondDegree from '../components/SecondDegree'
import { Tooltip } from 'antd';
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import InstructionsModal from '../components/InstructionsModal'
import BoolAdjacencyMatrix from "../components/BoolAdjacencyMatrix";

export default function Home() {

    const [userId, setUserId] = useState("q_QQ5kBBwlCcbL1s4NVK3g");
    const [firstDegree, setFirstDegree] = useState([]);
    const [secondDegree, setSecondDegree] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timer, setTimer] = useState(0);
    const increment = useRef(null)

    useEffect(() => {
        setIsModalOpen(true);
    }, [])

    const startTimer = () => {
        clearInterval(increment.current)
        setTimer(0)
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 100)
    }

    const endTimer = () => {
        clearInterval(increment.current)
    }

    return (
        <div>
            <Head>
                <title>YelpFriends!</title>
                <meta name="description" content="YelpFriends: find new friends through mutual connections" />
                <link rel="icon" href="/yelp_burst.png" />
            </Head>

            <div className="w-screen justify-between flex items-center flex-col">
                <InstructionsModal {...{ isModalOpen, setIsModalOpen }} />
                <div className="w-screen flex flex-col items-center justify-between py-4 bg-primary">
                    <div className="mt-1 mb-5 flex justify-center items-center gap-x-4">
                        <div className="flex items-center" >
                            <img src="/logo.png" className="h-16" />
                        </div>
                        <Tooltip placement="right" title="Need help?">
                            <BsFillQuestionCircleFill className="h-7 w-7 text-gray-600 hover:text-tertiary cursor-pointer" onClick={() => setIsModalOpen(true)} />
                        </Tooltip>
                    </div>
                    <div className="-mb-3 flex gap-x-4">
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
                            <div className="grid grid-rows-4 gap-y-4">
                                <AdjacencyMatrix {...{ userId, setFirstDegree, setSecondDegree, startTimer, endTimer }} />
                                <BoolAdjacencyMatrix {...{ userId, setFirstDegree, setSecondDegree, startTimer, endTimer }} />
                                <AdjacencyList {...{ userId, setFirstDegree, setSecondDegree, startTimer, endTimer }} />
                                <Tree {...{ userId, setFirstDegree, setSecondDegree, startTimer, endTimer }} />
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
                <div className="flex-col flex items-center">
                    {`${(timer / 10).toFixed(1)}`}
                    <button onClick={() => startTimer()}>Start Timer</button>
                    <button onClick={() => endTimer()}>End Timer</button>
                </div>
            </div>
        </div>
    )
}