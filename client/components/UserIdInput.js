import React from 'react'

const UserIdInput = (props) => {

    const {userId, setUserId} = props;

    return (
        <div className="flex ">
            <p>User Id: </p>
            <input value={userId} onChange={(e) => {setUserId(e.target.value)}}/>
        </div>
    )
}

export default UserIdInput
