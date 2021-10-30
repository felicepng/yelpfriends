import React, { useState } from 'react'

const UserIdInput = (props) => {

    const {userId, setUserId} = props;

    const [tempId, setTempId] = useState("");

    return (
        <div className="">
            <p>User Id: {userId}</p>
            <input className="border" value={tempId} onChange={(e) => {setTempId(e.target.value)}}/>
            <button className="border px-2 ml-4" onClick={()=>{setUserId(tempId)}}>Log in</button>
        </div>
    )
}

export default UserIdInput
