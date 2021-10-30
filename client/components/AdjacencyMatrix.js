import React, { useEffect, useState } from 'react'
import BackendAPI from '../service/BackendAPI'

const AdjacencyMatrix = (props) => {

    const {userId} = props;

    const [firstDegree, setFirstDegree] = useState([]);

    const load = () => {
        const response = BackendAPI.buildAdjMatrix();
        console.log(response);
    }

    const getFirstDegree = (userId) => {
        const response = BackendAPI.getAdjMatrixFirstDegree(userId);
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getSecondDegree = (userId) => {
        const response = BackendAPI.getAdjMatrixSecondDegree(userId);
        response.then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }



    return (
        <div>
            <h1>Adjacency Matrix</h1>
            <div className="border border-black">
                <button className="flex mx-auto"
                onClick={()=>{load()}}>Build Adjacency Matrix</button>
                <button className="flex mx-auto"
                onClick={()=>{getFirstDegree(userId)}}>First Degree Friends</button>
                <button className="flex mx-auto"
                onClick={()=>{getSecondDegree(userId)}}>Second Degree Friends</button>
            </div>
        </div>
    )
}

export default AdjacencyMatrix
