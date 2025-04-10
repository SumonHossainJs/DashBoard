import { useEffect, useRef, useState } from "react";
import "./chat.css";


import { format } from "timeago.js";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

 


  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
  //     setChat(res.data());
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [chatId]);

  // const handleEmoji = (e) => {
  //   setText((prev) => prev + e.emoji);
  //   setOpen(false);
  // };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

   
 const chats = {
    messages: [
        {
            senderId:true,
            createdAt: {
                seconds: 1730898831,
                nanoseconds: 153000000
            },
            text: "key10"
        },
        {
            senderId:false,
            createdAt: {
                seconds: 1730898859,
                nanoseconds: 546000000
            },
            text: "what is this ?"
        },
        {
            senderId: true,
            createdAt: {
                seconds: 1730898925,
                nanoseconds: 737000000
            },
            text: "🙂"
        },
        {
            senderId: false,
            text: "this is a message with imoji😀",
            createdAt: {
                seconds: 1730898961,
                nanoseconds: 163000000
            }
        },
        {
            senderId: true,
            text: "ghi",
            createdAt: {
                seconds: 1730899392,
                nanoseconds: 401000000
            }
        }
    ],
    createdAt: {
        seconds: 1730898786,
        nanoseconds: 704000000
    }
};


  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={"./avatar.png"} alt="" />
          <div className="texts">
            <span>A4code</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chats?.messages?.map((message,index) => (
          <div
            className={
              message.senderId  ? "message own" : "message"
            }
            key={index}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>67</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            "Type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          {/* <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div> */}
        </div>
        <button
          className="sendButton"
          // onClick={handleSend}
          
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
