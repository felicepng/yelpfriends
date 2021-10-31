import React from 'react'

const SecondDegree = (props) => {

    const {secondDegree} = props;

    return (
        <div className="p-6 bg-gray-50 rounded-3xl col-span-1">
            <div className="flex items-center text-gray-500 font-semibold">
                2nd Degree Friends
            </div>
            <div className="mt-6 mb-2 h-96 overflow-y-scroll">
                {
                    // secondDegree. ((value, key) => {
                    //     console.log(value);
                    //     return (
                    //         <UserCard key={key}/>
                    //     )
                    // }
                    // )
                    // secondDegree?.map(value => {
                    //     console.log(value);
                    // })
                }
                {
                    secondDegree === {} &&
                    <div className="flex text-gray-500 font-semibold items-center h-full text-center">
                        Get 2nd degree connections using any of the implementations!
                    </div>
                }
            </div>
        </div>
    )
}

export default SecondDegree
