import React, { useState } from 'react'
import BackendAPI from '../service/BackendAPI'
import { BsFillPlayCircleFill, BsPlayFill } from 'react-icons/bs'

const AdjacencyMatrix = (props) => {
    const { userId, setFirstDegree, setSecondDegree } = props;
    const [loaded, setLoaded] = useState(false);
    const [firstDegData, setFirstDegData] = useState(false);
    const [clickFirstDeg, setClickFirstDeg] = useState(false);
    const [clickSecondDeg, setClickSecondDeg] = useState(false);

    const load = () => {
        setFirstDegree([])
        setSecondDegree([])
        const response = BackendAPI.buildAdjMatrix();
        props.startTimer(1);
        response.then((res) => {
            props.endTimer();
            // console.log(res)
            setLoaded(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getFirstDegree = (userId) => {
        setSecondDegree([])
        const response = BackendAPI.getAdjMatrixFirstDegree(userId);
        props.startTimer(2);
        setClickFirstDeg(true)
        response.then((res) => {
            props.endTimer()
            // console.log(res)
            setFirstDegree(res.data)
            setFirstDegData(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getSecondDegree = (userId) => {
        const response = BackendAPI.getAdjMatrixSecondDegree(userId);
        props.startTimer(3)
        setClickSecondDeg(true)
        response.then((res) => {
            props.endTimer()
            // console.log(res.data["0AF4FMEq9kzzHbEjEk9Geg"])
            setSecondDegree(res.data)
            setSecondDegData(true)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="h-20 grid grid-cols-4 gap-x-4">
            <div className="flex items-center pr-12 text-sm text-gray-500 font-semibold">
                String Adjacency Matrix
            </div>
            <div onClick={() => load()} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl flex-col">
                {
                    props.loadTime === "0.0"
                        ?
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                        :
                        <div className="flex flex-col items-center">
                            <span className="text-xl text-gray-400 font-semibold">{props.loadTime}s</span>
                            <BsPlayFill className="h-5 w-5 text-secondary" />
                        </div>
                }
            </div>
            {
                loaded
                    ?
                    <div onClick={() => getFirstDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer  flex-col rounded-2xl">
                        {
                            !clickFirstDeg
                                ?
                                <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                                :
                                <div className="flex flex-col items-center">
                                    <span className="text-xl text-gray-400 font-semibold">{props.firstDegTime}s</span>
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
                            !clickSecondDeg
                                ?
                                <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                                :
                                <div className="flex flex-col items-center">
                                    <span className="text-xl text-gray-400 font-semibold">{props.secondDegTime}s</span>
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

export default AdjacencyMatrix
