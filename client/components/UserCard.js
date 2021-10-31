import { useState } from "react";

const UserCard = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="bg-white shadow rounded-2xl h-14 mb-4 px-3 w-full flex justify-between items-center">
      <div className="flex items-center">
        <img src={`/users/${Math.floor(Math.random() * 10)}.png`} className="h-10 mr-1" />
        <div className="text-gray-500">q_QQ5kBBwlCcbL1s4NVK3g</div>
      </div>

      {
        clicked ?
          <div className="flex items-center rounded-full text-white pb-1 px-3 cursor-not-allowed bg-gray-200">
            <img src="/users/addButton.png" className="h-5" />
          </div>
          :
          <div className="flex items-center bg-theme rounded-full text-white pb-1 px-3 cursor-pointer hover:bg-gray-400" onClick={() => setClicked(true)}>
            <img src="/users/addButton.png" className="h-5" />
          </div>
      }

    </div>
  )
}

export default UserCard;