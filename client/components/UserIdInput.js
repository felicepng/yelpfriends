import React, { useState } from 'react'

const UserIdInput = (props) => {

    const {userId, setUserId} = props;

    const [tempId, setTempId] = useState("");

    return (
        <div className="">
            <p>User Id: {userId}</p>
            <input value={tempId} onChange={(e) => {setTempId(e.target.value)}}/>
            <button onClick={()=>{setUserId(tempId)}}>Log in</button>
        </div>
    )
}

export default UserIdInput
