import React, { useState } from 'react'
import LoadData from './LoadData';

const UserIdInput = (props) => {

    const { userId, setUserId } = props;

    const [tempId, setTempId] = useState("");

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-x-4 items-center">
                <LoadData />
                <input className="focus:outline-none border rounded-full px-6 py-2 w-96 shadow" placeholder="Enter your user ID" value={tempId} onChange={(e) => setTempId(e.target.value)} />
                <div className="border px-4 py-2 bg-white shadow rounded-full cursor-pointer hover:bg-gray-200" onClick={() => setUserId(tempId)}>
                    Log in
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-600">Current user ID: {userId}</p>
        </div>
    )
}

export default UserIdInput
