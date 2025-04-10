
import { useState } from "react";
import "./detail.css";

const Detail = () => {
  const [imgOpen, setImgOpen] = useState(false);


  return (
    <div className="detail">
      <div className="user">
        <img src={"/assets/noavatar.png"} alt="" />
        <h2>Lyenda hafman</h2>
        <p>Order: PS5 new versions</p>
      </div>
      <div className="info">
        
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/assets/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="/assets/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src={ !imgOpen ? "/assets/arrowUp.png": "/assets/arrowDown.png"} alt="" onClick={()=>setImgOpen(!imgOpen)}/>
          </div>
          <div className={`photos ${imgOpen && "open"}`}>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/assets/download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/assets/download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/assets/download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="assets/download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="/assets/arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
