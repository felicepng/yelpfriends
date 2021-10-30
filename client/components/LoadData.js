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
        <div>
            <button className="border px-2" onClick={()=>initialLoad()}>Initial Load</button>
        </div>
    )
}

export default LoadData
