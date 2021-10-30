const UserCard = () => {
  return (
    <div className="bg-white shadow rounded-2xl h-14 mb-4 px-4 w-full flex justify-between items-center">
      <div className="flex items-center">
        <img src="/users/1.png" className="h-10 mr-2" />
        <div className="text-gray-500">Name 1</div>
      </div>
      <div className="flex items-center bg-theme rounded-full text-white py-1 px-3 cursor-pointer hover:bg-gray-300">
        <img src="/users/addButton.png" className="h-5 mr-1" />
        <div className="text-sm">Add</div>
      </div>
    </div>
  )
}

export default UserCard;