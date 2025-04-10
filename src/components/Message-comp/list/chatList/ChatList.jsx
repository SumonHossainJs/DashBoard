import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useState } from "react";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  

  const chatList = [
    {
      isSeen: true,
      receiverId: "D6n3QniBk5NncZ0aDOrg7OL6MCZ2",
      updatedAt: 1730900099427,
      chatId: "pctUjmMGw2bL1j2ZMNBW",
      lastMessage: "ghghghg",
      user: {
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV2p_t4tG-gZoNgPaOFe80kxzRcJ8mG9GTaVpV82kekzSZwZgjA&s",
        id: "D6n3QniBk5NncZ0aDOrg7OL6MCZ2",
        username: "sm",
        email: "sum56onhosainrakib@gmail.com",
        blocked: [],
      },
    },
    {
      updatedAt: 1730898795156,
      chatId: "t9MK7h8UDZQaADxRVXf0",
      lastMessage: "",
      receiverId: "D6n3QniBk5NncZ0aDOrg7OL6MCZ2",
      isSeen: true,
      user: {
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV2p_t4tG-gZoNgPaOFe80kxzRcJ8mG9GTaVpV82kekzSZwZgjA&s",
        id: "D6n3QniBk5NncZ0aDOrg7OL6MCZ2",
        username: "sm",
        email: "sum56onhosainrakib@gmail.com",
        blocked: [],
      },
    },
  ];

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chatList.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img src={"./avatar.png"} alt="" />
          <div className="texts">
            <span>
              
               User
               
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
