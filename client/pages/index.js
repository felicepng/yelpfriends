import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import AdjacencyList from "../components/AdjacencyList";
import AdjacencyMatrix from "../components/AdjacencyMatrix";
import LoadData from "../components/LoadData";
import UserIdInput from "../components/UserIdInput";
import Tree from "../components/Tree";
import FirstDegree from "../components/FirstDegree";
import SecondDegree from "../components/SecondDegree";
import { Tooltip } from "antd";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import InstructionsModal from "../components/InstructionsModal";
import BoolAdjacencyMatrix from "../components/BoolAdjacencyMatrix";

export default function Home() {
    const [userId, setUserId] = useState("q_QQ5kBBwlCcbL1s4NVK3g");
    const [firstDegree, setFirstDegree] = useState([]);
    const [secondDegree, setSecondDegree] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadAdjMatTimer, setLoadAdjMatTimer] = useState(0);
    const [loadAdjListTimer, setLoadAdjListTimer] = useState(0);
    const [loadTreeTimer, setLoadTreeTimer] = useState(0);
    const [loadBoolAdjTimer, setLoadBoolAdjMatTimer] = useState(0);
    const [firstAdjMatTimer, setFirstAdjMatTimer] = useState(0);
    const [firstAdjListTimer, setFirstAdjListTimer] = useState(0);
    const [firstTreeTimer, setFirstTreeTimer] = useState(0);
    const [firstBoolAdjTimer, setFirstBoolAdjMatTimer] = useState(0);
    const [secondAdjMatTimer, setSecondAdjMatTimer] = useState(0);
    const [secondAdjListTimer, setSecondAdjListTimer] = useState(0);
    const [secondTreeTimer, setSecondTreeTimer] = useState(0);
    const [secondBoolAdjTimer, setSecondBoolAdjMatTimer] = useState(0);
    const increment = useRef(null);

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    const startTimer = (position) => {
        clearInterval(increment.current);
        switch (position) {
            case 1:
                setLoadAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setLoadAdjMatTimer(
                        (loadAdjMatTimer) => loadAdjMatTimer + 1
                    );
                }, 100);
                break;

            case 2:
                setFirstAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setFirstAdjMatTimer(
                        (firstAdjMatTimer) => firstAdjMatTimer + 1
                    );
                }, 100);
                break;

            case 3:
                setSecondAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setSecondAdjMatTimer(
                        (secondAdjMatTimer) => secondAdjMatTimer + 1
                    );
                }, 100);
                break;
            case 4:
                setLoadBoolAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setLoadBoolAdjMatTimer(
                        (loadBoolAdjTimer) => loadBoolAdjTimer + 1
                    );
                }, 100);
                break;
            case 5:
                setFirstBoolAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setFirstBoolAdjMatTimer(
                        (firstBoolAdjTimer) => firstBoolAdjTimer + 1
                    );
                }, 100);
                break;
            case 6:
                setSecondBoolAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setSecondBoolAdjMatTimer(
                        (secondBoolAdjTimer) => secondBoolAdjTimer + 1
                    );
                }, 100);
                break;
            case 7:
                setLoadAdjListTimer(0);
                increment.current = setInterval(() => {
                    setLoadAdjListTimer(
                        (loadAdjListTimer) => loadAdjListTimer + 1
                    );
                }, 100);
                break;
            case 8:
                setFirstAdjListTimer(0);
                increment.current = setInterval(() => {
                    setFirstAdjListTimer(
                        (firstAdjListTimer) => firstAdjListTimer + 1
                    );
                }, 100);
                break;
            case 9:
                setSecondAdjListTimer(0);
                increment.current = setInterval(() => {
                    setSecondAdjListTimer(
                        (secondAdjListTimer) => secondAdjListTimer + 1
                    );
                }, 100);
                break;
            case 10:
                setLoadTreeTimer(0);
                increment.current = setInterval(() => {
                    setLoadTreeTimer((loadTreeTimer) => loadTreeTimer + 1);
                }, 100);
                break;
            case 11:
                setFirstTreeTimer(0);
                increment.current = setInterval(() => {
                    setFirstTreeTimer((firstTreeTimer) => firstTreeTimer + 1);
                }, 100);
                break;
            case 12:
                setSecondTreeTimer(0);
                increment.current = setInterval(() => {
                    setSecondTreeTimer(
                        (secondTreeTimer) => secondTreeTimer + 1
                    );
                }, 100);
                break;
        }
    };

    const endTimer = () => {
        clearInterval(increment.current);
    };

    return (
        <div>
            <Head>
                <title>YelpFriends!</title>
                <meta
                    name="description"
                    content="YelpFriends: find new friends through mutual connections"
                />
                <link rel="icon" href="/yelp_burst.png" />
            </Head>

            <div className="w-screen justify-between flex items-center flex-col">
                <InstructionsModal {...{ isModalOpen, setIsModalOpen }} />
                <div className="w-screen flex flex-col items-center justify-between py-4 bg-primary">
                    <div className="mt-1 mb-5 flex justify-center items-center gap-x-4">
                        <div className="flex items-center">
                            <img src="/logo.png" className="h-16" />
                        </div>
                        <Tooltip placement="right" title="Need help?">
                            <BsFillQuestionCircleFill
                                className="h-7 w-7 text-gray-600 hover:text-tertiary cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            />
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
                                <AdjacencyMatrix
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                />
                                <BoolAdjacencyMatrix
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                />
                                <AdjacencyList
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                />
                                <Tree
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                />
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
                <div className="flex-col flex justify-center">
                    <div className = "flex flex-col items-center">
                        {`${(loadAdjListTimer / 10).toFixed(1)}`}
                        {`${(loadAdjMatTimer / 10).toFixed(1)}`}
                        {`${(loadTreeTimer / 10).toFixed(1)}`}
                        {`${(loadBoolAdjTimer / 10).toFixed(1)}`}
                        {`${(firstAdjListTimer / 10).toFixed(1)}`}
                        {`${(firstAdjMatTimer / 10).toFixed(1)}`}
                        {`${(firstTreeTimer / 10).toFixed(1)}`}
                        {`${(firstBoolAdjTimer / 10).toFixed(1)}`}
                        {`${(secondAdjListTimer / 10).toFixed(1)}`}
                        {`${(secondAdjMatTimer / 10).toFixed(1)}`}
                        {`${(secondTreeTimer / 10).toFixed(1)}`}
                        {`${(secondBoolAdjTimer / 10).toFixed(1)}`}
                    </div>

                    <button onClick={() => startTimer()}>Start Timer</button>
                    <button onClick={() => endTimer()}>End Timer</button>
                </div>
            </div>
        </div>
    );
}
