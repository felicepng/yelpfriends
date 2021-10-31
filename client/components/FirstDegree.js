import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'

const FirstDegree = (props) => {

    const { firstDegree } = props;

    return (
        <div className="p-6 bg-gray-50 rounded-3xl col-span-1">
            <div className="flex items-center text-gray-500 font-semibold">
                1st Degree Friends
            </div>
            <div className="mt-6 mb-2 h-96 overflow-y-scroll">
                {
                    firstDegree?.map((friend, index) => {
                        // console.log(friend);
                        return (
                            <UserCard key={index} userId={friend} />
                        )
                    }
                    )
                }
                {
                    firstDegree.length == 0 &&
                    <div className="flex text-gray-500 font-semibold items-center h-full text-center">
                        Get 1st degree connections using any of the implementations!
                    </div>
                }
            </div>
        </div>
    )
}

export default FirstDegree
