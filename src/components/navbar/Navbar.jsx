import React, { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { notification, proifleLinks } from "../../data";
import ProductSearchModal from "../elements/ProductSearchModal";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";

const Navbar = ({ toggleMenu, isMenuVisible }) => {
  const [searchToggle, setSearchToggle] = useState(false);

  const searchBoxToggleHandler = () => {
    setSearchToggle((toggler) => !toggler);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    dispatch(logout())
    navigate("/auth");
  }

  return (
    <div className="navbar">
      <Link to={"/"} className="logo">
        <img src="/assets/logo.png" alt="" />
        <span>A4Code</span>
      </Link>
      <div className="icons">
        <img
          src="/assets/search.svg"
          alt=""
          className=""
          onClick={searchBoxToggleHandler}
        />
        <ProductSearchModal
          toggleHandler={searchBoxToggleHandler}
          toggler={searchToggle}
        />
        <img
          src={isMenuVisible ? "/assets/app.svg" : "/assets/expand.svg"}
          alt=""
          className="icon"
          onClick={toggleMenu}
        />
        <div className="notification">
          <img src="/assets/notifications.svg" alt="" />
          <span className="num">1</span>
          <div className="submenu">
            <div className="fix">
              {notification.map((data, index) => (
                <Link to={data.url} key={index} className="link">
                  <i className={data.icon}></i>
                  <div className="info">
                    <h4>{data.message}</h4>
                    <p>{data.time}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Jane</span>

          <div className="submenu">
            <div className="fix">
              {proifleLinks.map((data, index) => (
                <Link to={data.url} key={index} className="link">
                  {data.name}
                </Link>
              ))}
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
