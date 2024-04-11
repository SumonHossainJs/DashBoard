import { Link } from "react-router-dom";
import "./Menu.scss";
import { menu } from "../../data";
import { useEffect, useState } from "react";

const Menu = () => {
  

  useEffect(() => {
    const color1 = '#' + Math.floor(Math.random()*16777215).toString(16); // Random hex color
    const color2 = '#' + Math.floor(Math.random()*16777215).toString(16); // Random hex color
    const gradient = `linear-gradient(to bottom, ${color1}, ${color2})`;
    const thumb = document.querySelector('.scrollable-container')?.querySelector('.scrollable-container::-webkit-scrollbar-thumb') as HTMLElement;
    if (thumb) {
      thumb.style.background = gradient;
    }
  }, []);

  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
