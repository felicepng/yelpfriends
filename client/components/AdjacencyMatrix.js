import React, { useState } from 'react'
import BackendAPI from '../service/BackendAPI'
import { BsFillPlayCircleFill } from 'react-icons/bs'

const AdjacencyMatrix = (props) => {
  const { userId, setFirstDegree, setSecondDegree } = props;
  const [loaded, setLoaded] = useState(false);
  const [firstDegData, setFirstDegData] = useState(false);
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
      setLoaded(true)
    }).catch((error) => {
      console.log(error)
    })
  }

  const getFirstDegree = (userId) => {
    setSecondDegree([])
    const response = BackendAPI.getAdjMatrixFirstDegree(userId);
    props.startTimer();
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
        String Adjacency Matrix
      </div>
      <div onClick={() => load()} className="grid items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
        <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
        <p>{timer.toFixed(1)}</p>
      </div>
      {
        loaded
          ?
          <div onClick={() => getFirstDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
            <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
          </div>
          :
          <div className="flex opacity-40 items-center justify-center bg-white shadow cursor-not-allowed rounded-2xl">
            <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
          </div>
      }
      {
        firstDegData ?
          <div onClick={() => getSecondDegree(userId)} className="flex items-center justify-center bg-white shadow hover:bg-gray-200 cursor-pointer rounded-2xl">
            <BsFillPlayCircleFill className="h-7 w-7 text-secondary" />
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
