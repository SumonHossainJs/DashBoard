import "./userInfo.css"


const Userinfo = () => {
const user ={
  avatar:"./avatar.png",
  username:"Sumon"
}
  

  return (
    <div className='userInfo'>
      <div className="user">
        <img src={user.avatar || "./avatar.png"} alt="" />
        <h2>{user.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  )
}

export default Userinfo