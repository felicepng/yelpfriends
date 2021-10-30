import React from 'react'
import BackendAPI from '../service/BackendAPI'

const LoadData = () => {

  const initialLoad = () => {
    const response = BackendAPI.initialLoad();
    response.then(() => {
      console.log('Success')
    }).catch((error) => {
      console.log('Failed')
      console.log(error)
    })
  }

  return (
    <div className="border px-4 py-2 bg-white shadow rounded-full cursor-pointer hover:bg-gray-200" onClick={() => initialLoad()}>
      Initial Load
    </div>
  )
}

export default LoadData
