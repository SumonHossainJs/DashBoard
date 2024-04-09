import React from 'react';

const Items = ({ data, remove }) => {
  console.log(data);

  
  const isValidData = Array.isArray(data) && data.every(item => {
    if (typeof item === 'string') {
      return false;
    } else if (typeof item === 'object' && item !== null) {
      return true;
    }
  });
  
  return (
    <ul>
      {isValidData ? (
        // If data is valid, render the list with formatted items
        data.map((item, index) => (
          <li key={index} className={item.fadeOut ? "fadeOut hidden" : "fadeOut"} onClick={() => remove(index)}>
            {item.title ? "Title" : "Icon"}: {item.title ? item.title : item.icon},<br/> 
            {item.desc ? "Description" : "IconTitle"}: {item.Icontitle ? item.Icontitle : item.desc} 
            <span><div className="x">X</div></span>
          </li>
        ))
      ) : (
        // If data is invalid, render the list with raw items
        data.map((item, index) => (
          <li key={index} className={item.fadeOut ? "fadeOut hidden" : "fadeOut"} onClick={() => remove(index)}>
            {item} 
            <span><div className="x">X</div></span>
          </li>
        ))
      )}
    </ul>
  );
};

export default Items;
