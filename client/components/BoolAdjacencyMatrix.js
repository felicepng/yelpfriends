import React, { useState } from 'react'
import BackendAPI from '../service/BackendAPI';
import { BsFillPlayCircleFill, BsPlayFill } from 'react-icons/bs'

const BoolAdjacencyMatrix = (props) => {
    const { userId, setFirstDegree, setSecondDegree } = props;
    const [loaded, setLoaded] = useState(false);
    const [firstDegData, setFirstDegData] = useState(false);

    const load = () => {
        setFirstDegree([])
        setSecondDegree([])
        const response = BackendAPI.buildBoolAdjMat();
        props.startTimer(4);
        response.then((res) => {
            props.endTimer()
            console.log(res)
            setLoaded(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getFirstDegree = (userId) => {
        setSecondDegree([])
        const response = BackendAPI.getBoolAdjFirstDegree(userId);
        props.startTimer(5);
        response.then((res) => {
            props.endTimer()
            console.log(res)
            setFirstDegree(res.data)
            setFirstDegData(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getSecondDegree = (userId) => {
        const response = BackendAPI.getBoolAdjSecondDegree(userId);
        props.startTimer(6);
        response.then((res) => {
            props.endTimer()
            console.log(res)
            setSecondDegree(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="grid grid-cols-4 gap-x-4">
            <div className="flex items-center pr-12 text-sm text-gray-500 font-semibold">
                Boolean Adjacency Matrix
            </div>
            <div onClick={() => load()} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl flex-col">
                {
                    props.loadTime === "0.0"
                        ?
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                        :
                        <div className="flex flex-col items-center">
                            <span className="text-xl text-gray-400 font-semibold">{props.loadTime !== "0.00" && props.loadTime}s</span>
                            <BsPlayFill className="h-5 w-5 text-secondary" />
                        </div>
                }
            </div>
            {
                loaded
                    ?
                    <div onClick={() => getFirstDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer  flex-col rounded-2xl">
                        {
                            props.firstDegTime === "0.00"
                                ?
                                <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                                :
                                <div className="flex flex-col items-center">
                                    <span className="text-xl text-gray-400 font-semibold">{props.firstDegTime !== "0.00" && props.firstDegTime}s</span>
                                    <BsPlayFill className="h-5 w-5 text-secondary" />
                                </div>
                        }
                    </div>
                    :
                    <div className="flex opacity-40 items-center justify-center bg-white shadow cursor-not-allowed rounded-2xl">
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                    </div>
            }
            {
                firstDegData ?
                    <div onClick={() => getSecondDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer  flex-col rounded-2xl">
                        {
                            props.secondDegTime === "0.00"
                                ?
                                <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                                :
                                <div className="flex flex-col items-center">
                                    <span className="text-xl text-gray-400 font-semibold">{props.secondDegTime !== "0.00" && props.secondDegTime}s</span>
                                    <BsPlayFill className="h-5 w-5 text-secondary" />
                                </div>
                        }
                    </div>
                    :
                    <div className="flex opacity-40 items-center justify-center bg-white shadow cursor-not-allowed rounded-2xl">
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                    </div>
            }
        </div>
    )
}

export default BoolAdjacencyMatrix