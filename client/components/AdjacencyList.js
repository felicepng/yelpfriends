import React, { useState } from 'react'
import BackendAPI from '../service/BackendAPI';
import { BsFillPlayCircleFill } from 'react-icons/bs'

const AdjacencyList = (props) => {
    const { userId, setFirstDegree, setSecondDegree } = props;
    const [loaded, setLoaded] = useState(false);
    const [firstDegData, setFirstDegData] = useState(false);

    const load = () => {
        setFirstDegree([])
        setSecondDegree([])
        const response = BackendAPI.buildAdjList();
        props.startTimer(7);
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
        const response = BackendAPI.getAdjListFirstDegree(userId);
        props.startTimer(8);
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
        const response = BackendAPI.getAdjListSecondDegree(userId);
        props.startTimer(9);
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
                Adjacency List
            </div>
            <div onClick={() => load()} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl flex-col">
                <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                <span>{props.loadTime}</span>
            </div>
            {
                loaded
                    ?
                    <div onClick={() => getFirstDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer  flex-col rounded-2xl">
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                        <span>{props.firstDegTime}</span>
                    </div>
                    :
                    <div className="flex opacity-40 items-center justify-center bg-white shadow cursor-not-allowed rounded-2xl">
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                    </div>
            }
            {
                firstDegData ?
                    <div onClick={() => getSecondDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer  flex-col rounded-2xl">
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                        <span>{props.secondDegTime}</span>
                    </div>
                    :
                    <div className="flex opacity-40 items-center justify-center bg-white shadow cursor-not-allowed rounded-2xl">
                        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
                    </div>
            }
        </div>
    )
}

export default AdjacencyList