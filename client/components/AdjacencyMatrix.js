import React, { useState } from 'react'
import BackendAPI from '../service/BackendAPI'

const AdjacencyMatrix = (props) => {
    const { userId, setFirstDegree, setSecondDegree } = props;

    const load = () => {
        const response = BackendAPI.buildAdjMatrix();
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getFirstDegree = (userId) => {
        setFirstDegree([])
        const response = BackendAPI.getAdjMatrixFirstDegree(userId);
        response.then((res) => {
            console.log(res)
            setFirstDegree(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getSecondDegree = (userId) => {
        setSecondDegree([])
        const response = BackendAPI.getAdjMatrixSecondDegree(userId);
        response.then((res) => {
            console.log(res)
            setSecondDegree(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="h-20 grid grid-cols-4 gap-x-4">
            <div className="flex items-center pr-12 text-sm text-gray-500 font-semibold">
                Using Adjacency Matrix
            </div>
            <div onClick={() => load()} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
                <img src="/playButton.png" className="h-7" />
            </div>
            <div onClick={() => getFirstDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
                <img src="/playButton.png" className="h-7" />
            </div>
            <div onClick={() => getSecondDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
                <img src="/playButton.png" className="h-7" />
            </div>
        </div>
    )
}

export default AdjacencyMatrix
