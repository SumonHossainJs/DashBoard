
import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../../data";
import "./searchm.scss";


const ProductSearchModal = (props) => {
  const getProducts = products;
  const [productQuery, setProductQuery] = useState([]);

  const SearchInputHandler = (inputValue) => {
    if (inputValue.length > 0) {
      let matchingData = getProducts.filter((product) =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setProductQuery(matchingData);
    } else {
      setProductQuery([]);
    }
  };

  return (
    <>
      <div className={`header-search-modal ${props.toggler ? "open" : ""}`}>
        <button
          className="card-close sidebar-close"
          onClick={props.toggleHandler}
        >
          <i className="fas fa-times" />
        </button>
        <div className="header-search-wrap">
          <div className="card-header">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Write Something...."
                onChange={(e) => SearchInputHandler(e.target.value)}
              />
              <button className="axil-btn btn-bg-primary">
                <i className="far fa-search" />
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="search-result-header">
              <h6 className="title">{productQuery.length} Result Found</h6>
              <Link href="/shop">View All</Link>
            </div>
            <div className="psearch-results">
              {productQuery &&
                productQuery.map((data) => (
                  <Link to={`/products/${data.id}`} className="axil-product-list" key={data.id} onClick={props.toggleHandler}>
                    <img src={data.img} alt="" />
                    <div className="info">
                      <h4>{data.title}</h4>
                      <span>Producer:  {data.producer}</span>
                      <span>Price:{data.price}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      {props.toggler ? (
        <div className="closeMask" onClick={props.toggleHandler}></div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductSearchModal;
