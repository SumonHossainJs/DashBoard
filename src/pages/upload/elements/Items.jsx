import React from 'react'

const Items = ({ data, remove }) => {
  return (
    <ul>
                {data.map((item, index) => (
                  <li key={index} className={item.fadeOut ? "fadeOut hidden" : "fadeOut"} onClick={() => remove(index)}>
                    {item.title? "Title" : "Icon"}
                    : {item.title? item.title : item.icon},<br/> {item.desc? "Description" : "IconTitle"}: {item.Icontitle? item.Icontitle : item.desc} <span><div className="x">X</div></span>
                </li>
                ))}
              </ul>
  )
}

export default Items