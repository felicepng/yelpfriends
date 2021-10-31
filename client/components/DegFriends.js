import UserCard from "./UserCard";

const DegFriends = (props) => {
  return (
    <div className="p-6 bg-gray-50 rounded-3xl col-span-1">
      <div className="flex items-center text-gray-500 font-semibold">
        {props.title}
      </div>
      <div className="mt-6 mb-2 h-96 overflow-y-scroll scrollbar-hide">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  )
}

export default DegFriends;