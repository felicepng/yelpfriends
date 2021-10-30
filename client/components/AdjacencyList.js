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
            <h1>Adjacency List</h1>
            <div className="border border-black">
                <button className="flex mx-auto"
                onClick={()=>{load()}}>Load Adjacency List</button>
                <button className="flex mx-auto"
                onClick={()=>{getFirstDegree(userId)}}>First Degree Friends</button>
                <button className="flex mx-auto"
                onClick={()=>{getSecondDegree(userId)}}>Second Degree Friends</button>
            </div>
        </div>
    )
}

export default AdjacencyList
