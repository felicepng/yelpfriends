import React from 'react'
import UserCard from './UserCard';

const SecondDegree = (props) => {

    const {secondDegree} = props;
    // const allKeys = Object.keys(secondDegree)

    return (
        <div className="p-6 bg-gray-50 rounded-3xl col-span-1">
            <div className="flex items-center text-gray-500 font-semibold">
                2nd Degree Friends
            </div>
            <div className="mt-6 mb-2 h-96 overflow-y-scroll scrollbar-hide">
                {
                    secondDegree?.map((value,index) => {
                        const keys = Object.keys(value);
                        console.log(keys[0])
                        return (
                            <UserCard key={index} userId={keys[0]} mutualFriends={value[keys[0]]} />
                        )
                    })
                }
                {
                    secondDegree.length == 0 && 
                    <div className="flex text-gray-500 font-semibold items-center h-full text-center">
                        Get 2nd degree connections using any of the implementations!
                    </div>
                }
            </div>
        </div>
    )
}

export default SecondDegree
