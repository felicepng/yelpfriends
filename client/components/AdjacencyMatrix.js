import React, { useEffect, useState } from 'react'
import BackendAPI from '../service/BackendAPI'

const AdjacencyMatrix = (props) => {
  const { userId, setFirstDegree, setSecondDegree } = props;
  const [start, setStart] = useState(0);
  const [timer, setTimer] = useState(0);

  const load = () => {
    setFirstDegree([])
    setSecondDegree([])
    const response = BackendAPI.buildAdjMatrix();
    props.startTimer();
    response.then((res) => {
      props.endTimer();
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  const getFirstDegree = (userId) => {
    const response = BackendAPI.getAdjMatrixFirstDegree(userId);
    props.startTimer();
    response.then((res) => {
      props.endTimer()
      console.log(res)
      setFirstDegree(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const getSecondDegree = (userId) => {
    const response = BackendAPI.getAdjMatrixSecondDegree(userId);
    props.startTimer()
    response.then((res) => {
      props.endTimer()
      console.log(res.data["0AF4FMEq9kzzHbEjEk9Geg"])
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
      <div onClick={() => load()} className="grid items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
        <img src="/playButton.png" className="h-7" />
        <p>{timer.toFixed(1)}</p>
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
