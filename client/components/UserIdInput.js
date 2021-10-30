import React, { useState } from 'react'

const UserIdInput = (props) => {

    const {userId, setUserId} = props;

    const [tempId, setTempId] = useState("");

    return (
        <div className="">
            {/* <p>User Id: {userId}</p> */}
            <input className="focus:outline-none border rounded-full px-6 py-2 w-96 shadow" placeholder="Enter your user ID" value={tempId} onChange={(e) => {setTempId(e.target.value)}}/>
            {/* <button className="border px-2 ml-4" onClick={()=>{setUserId(tempId)}}>Log in</button> */}
        </div>
    )
}

export default UserIdInput
