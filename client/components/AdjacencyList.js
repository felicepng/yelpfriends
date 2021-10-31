import React, { useState } from 'react'
import BackendAPI from '../service/BackendAPI';

const AdjacencyList = (props) => {
    const { userId } = props;
    const [firstDegree, setFirstDegree] = useState([]);

    const load = () => {
        const response = BackendAPI.buildAdjList();
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getFirstDegree = (userId) => {
        const response = BackendAPI.getAdjListFirstDegree(userId);
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getSecondDegree = (userId) => {
        const response = BackendAPI.getAdjListSecondDegree(userId);
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="grid grid-cols-7 gap-x-4">
            <div className="flex items-center pr-12 text-sm text-gray-500 font-semibold">
                Using Adjacency List
            </div>
            <div onClick={() => load()} className="flex col-span-2 items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
                <img src="/playButton.png" className="h-7" />
            </div>
            <div onClick={() => getFirstDegree(userId)} className="flex col-span-2 items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
                <img src="/playButton.png" className="h-7" />
            </div>
            <div onClick={() => getSecondDegree(userId)} className="flex col-span-2 items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
                <img src="/playButton.png" className="h-7" />
            </div>
        </div>
    )
}

export default AdjacencyList