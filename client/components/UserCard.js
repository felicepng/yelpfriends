const UserCard = () => {
  return (
    <div className="bg-white shadow rounded-2xl h-14 mb-4 px-4 w-full flex justify-between items-center">
      <div className="flex items-center">
        <img src={`/users/${Math.floor(Math.random() * 10)}.png`} className="h-10 mr-2" />
        <div className="text-gray-500 text-sm">Name 1</div>
      </div>
      <div className="flex items-center bg-theme rounded-full text-white p-1 cursor-pointer hover:bg-gray-400">
        <img src="/users/addButton.png" className="h-5" />
      </div>
    </div>
  )
}

export default UserCard;