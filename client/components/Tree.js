import React from 'react'
import BackendAPI from '../service/BackendAPI';

const Tree = (props) => {

    const { userId } = props;

    const load = (userId) => {
        const response = BackendAPI.buildTree(userId);
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getFirstDegree = (userId) => {
        const response = BackendAPI.getTreeFirstDegree(userId);
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getSecondDegree = (userId) => {
        const response = BackendAPI.getTreeSecondDegree(userId);
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="grid grid-cols-4 gap-x-4">
            <div className="flex items-center text-sm text-gray-500 font-semibold">
                Using Tree
            </div>
            <div onClick={() => load(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
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

export default Tree
