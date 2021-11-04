import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import AdjacencyList from "../components/AdjacencyList";
import AdjacencyMatrix from "../components/AdjacencyMatrix";
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
                }, 10);
                break;

            case 3:
                setSecondAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setSecondAdjMatTimer(
                        (secondAdjMatTimer) => secondAdjMatTimer + 1
                    );
                }, 10);
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
                }, 10);
                break;
            case 6:
                setSecondBoolAdjMatTimer(0);
                increment.current = setInterval(() => {
                    setSecondBoolAdjMatTimer(
                        (secondBoolAdjTimer) => secondBoolAdjTimer + 1
                    );
                }, 10);
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
                }, 10);
                break;
            case 9:
                setSecondAdjListTimer(0);
                increment.current = setInterval(() => {
                    setSecondAdjListTimer(
                        (secondAdjListTimer) => secondAdjListTimer + 1
                    );
                }, 10);
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
                }, 10);
                break;
            case 12:
                setSecondTreeTimer(0);
                increment.current = setInterval(() => {
                    setSecondTreeTimer(
                        (secondTreeTimer) => secondTreeTimer + 1
                    );
                }, 10);
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
                        <div className="p-7 bg-gray-50 rounded-3xl col-span-2 gap-y-4">
                            <div className="grid grid-cols-4 gap-x-6 mb-7">
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
                            <div className="grid grid-rows-4 gap-y-6">
                                <AdjacencyMatrix
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                    loadTime = {`${(loadAdjMatTimer / 10).toFixed(1)}`}
                                    firstDegTime = {`${(firstAdjMatTimer / 100).toFixed(2)}`}
                                    secondDegTime = {`${(secondAdjMatTimer / 100).toFixed(2)}`}
                                    
                                />
                                <BoolAdjacencyMatrix
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                    loadTime = {`${(loadBoolAdjTimer/ 10).toFixed(1)}`}
                                    firstDegTime = {`${(firstBoolAdjTimer / 100).toFixed(2)}`}
                                    secondDegTime = {`${(secondBoolAdjTimer / 100).toFixed(2)}`}
                                />
                                <AdjacencyList
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                    loadTime = {`${(loadAdjListTimer / 10).toFixed(1)}`}
                                    firstDegTime = {`${(firstAdjListTimer / 100).toFixed(2)}`}
                                    secondDegTime = {`${(secondAdjListTimer / 100).toFixed(2)}`}
                                />
                                <Tree
                                    {...{
                                        userId,
                                        setFirstDegree,
                                        setSecondDegree,
                                        startTimer,
                                        endTimer,
                                    }}
                                    loadTime = {`${(loadTreeTimer/ 10).toFixed(1)}`}
                                    firstDegTime = {`${(firstTreeTimer / 100).toFixed(2)}`}
                                    secondDegTime = {`${(secondTreeTimer / 100).toFixed(2)}`}
                                />
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
    );
}
