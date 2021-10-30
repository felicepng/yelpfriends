import React, { useState } from 'react'
import BackendAPI from '../service/BackendAPI';

const AdjacencyList = (props) => {

    const {userId} = props;

    const [firstDegree, setFirstDegree] = useState([]);

    const load = () => {
        const response = BackendAPI.buildAdjList();
        console.log(response);
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
        <div>
            <h1 className="text-2xl font-bold">Adjacency List</h1>
            <div className="flex gap-x-4">
                <button className="border px-2"
                onClick={()=>{load()}}>Build Adjacency List</button>
                <button className="border px-2"
                onClick={()=>{getFirstDegree(userId)}}>First Degree Friends</button>
                <button className="border px-2"
                onClick={()=>{getSecondDegree(userId)}}>Second Degree Friends</button>
            </div>
        </div>
    )
}

export default AdjacencyList