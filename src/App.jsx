import Home from "./pages/home/Home.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users.jsx";
import Products from "./pages/products/Products.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Menu from "./components/menu/Menu.jsx";
import Login from "./pages/login/Login.jsx";
import "./styles/global.scss";
import User from "./pages/user/User.jsx";
import Product from "./pages/product/Product.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Upload from "./pages/upload/Upload.jsx";
import { useEffect, useState } from "react";
import Order from "./pages/Order/Order.jsx";
import Message from "./pages/Message/Message.jsx";
import PageElemets from "./pages/pageElements/PageElemets.jsx";
import Update from "./pages/update/Update.jsx";
import SingleOrder from "./pages/SingleOrder/SingleOrder.jsx";
import Features from "./pages/Features/Features.jsx";
import Offers from "./pages/Offers/Offers.jsx";
import Porders from "./pages/productOrders/Porder.jsx";
import UploadWorks from "./pages/upload-works/UploadWorks.jsx";
import UpdateWorks from "./pages/update/UpdateWorks.jsx";
import WorksView from "./pages/products/WorksView.jsx";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(true);
    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        setIsMenuVisible(screenWidth >= 440); 
      };
  
      handleResize(); 
  
      window.addEventListener('resize', handleResize); // 
  
      return () => {
        window.removeEventListener('resize', handleResize); 
      };
    }, []); 

    const toggleMenu = () => {
      setIsMenuVisible(!isMenuVisible);
    };
    return (
      <div className="main">
        <Navbar toggleMenu={toggleMenu} isMenuVisible={isMenuVisible} />
        <div className={`container ${!isMenuVisible? "hidden":"visible"  }`}>
        <div className={`menuContainer ${isMenuVisible ? 'visible' : ''}`}>
          <img className="expand-btn" src="/assets/expand.svg" alt=""  onClick={toggleMenu}/>
        <Menu />
      </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/upload",
          element: <Upload />,
        },
        {
          path: "/upload-works",
          element: <UploadWorks />,
        },
        {
          path: "/update/:id",
          element: <Update />,
        },
        {
          path: "/update-works/:id",
          element: <UpdateWorks />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/Works",
          element: <WorksView />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/order/:id",
          element: <SingleOrder />,
        },
        {
          path: "/messages",
          element: <Message />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/page-elements",
          element: <PageElemets />,
        },
        {
          path: "/h-features",
          element: <Features />,
        },
        {
          path: "/offers",
          element: <Offers />,
        },
        {
          path: "/productOrder",
          element: <Porders />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
