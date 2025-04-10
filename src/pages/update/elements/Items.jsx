import React from 'react';

const Items = ({ data, remove, list, text, }) => {
  

  
  const isValidData = Array.isArray(data) && data?.every(item => {
    if (typeof item === 'string') {
      return false;
    } else if (typeof item === 'object' && item !== null) {
      return true;
    }
  });
  
  return (
    <ul>
      {isValidData ? (
       
        data?.map((item, index) => (
          <li key={index} className={item.fadeOut ? "fadeOut hidden" : "fadeOut"} onClick={() => remove(index)}>
            {list ? (
              <p>  Title: {item.Icontitle} ,<br/> 
            Icon: {item.icon} </p>
            ):(

              <p> title:{item.title} ,<br/> 
            desc: {item.desc} </p>

            )}
          
            <span><div className="x">X</div></span>
          </li>
        ))
      ) : (
        // If data is invalid, render the list with raw items
        data?.map((item, index) => (
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
