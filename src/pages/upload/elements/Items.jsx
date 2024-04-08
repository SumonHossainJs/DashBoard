import React from 'react'

const Items = ({ data, remove }) => {
  return (
    <ul>
                {data.map((item, index) => (
                  <li key={index} className={item.fadeOut ? "fadeOut hidden" : "fadeOut"} onClick={() => remove(index)}>
                  title: {item.title},<br/> description: {item.desc} <span><div className="x">X</div></span>
                </li>
                ))}
              </ul>
  )
}

export default Items