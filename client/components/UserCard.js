const UserCard = (props) => {
  return (
    <div className="bg-white shadow rounded-2xl h-16 mb-4 px-4 w-full flex justify-between items-center">
      <div className="flex items-center">
        <img src={`/users/${Math.floor(Math.random() * 10)}.png`} className="h-11 mr-3" />
        <div>
          <div className="text-gray-500 text-xs font-bold">USER ID</div>
          <div className="text-gray-500 text-sm">{props.userId}</div>
        </div>
      </div>
      <div className="flex items-center bg-theme rounded-full text-white pb-1 px-2 cursor-pointer hover:bg-gray-400">
        <img src="/users/addButton.png" className="h-5" />
      </div>
    </div>
  )
}

export default UserCard;