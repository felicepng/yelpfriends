const UserLogo = () => {
  return (
    <img src={`/users/${Math.floor(Math.random() * 10)}.png`} className="h-10 mr-1" />
  )
}

export default UserLogo;