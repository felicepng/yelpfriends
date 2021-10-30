import React, { useState } from 'react'

const UserIdInput = (props) => {

  const { userId, setUserId } = props;

  const [tempId, setTempId] = useState("");

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-x-4 items-center">
        <input className="focus:outline-none border rounded-full px-6 py-2 w-96 shadow" placeholder="Enter your user ID" value={tempId} onChange={(e) => setTempId(e.target.value)} />
        <div className="border px-4 py-2 bg-white shadow rounded-full cursor-pointer hover:bg-gray-200" onClick={() => setUserId(tempId)}>
          Log in
        </div>
      </div>
      {/* <p>User Id: {userId}</p> */}
    </div>
  )
}

export default UserIdInput
