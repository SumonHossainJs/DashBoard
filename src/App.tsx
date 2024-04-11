import Home from "./pages/home/Home.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users.js";
import Products from "./pages/products/Products.js";
import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import Menu from "./components/menu/Menu.js";
import Login from "./pages/login/Login.js";
import "./styles/global.scss";
import User from "./pages/user/User.js";
import Product from "./pages/product/Product.js";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Upload from "./pages/upload/Upload.jsx";
import { useEffect, useState } from "react";


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
        <Navbar toggleMenu={toggleMenu} />
        <div className={`container ${!isMenuVisible? "hidden":"visible"  }`}>
        <div className={`menuContainer ${isMenuVisible ? 'visible' : ''}`}>
          <button className="expand-btn"><img src="/expand.svg" alt="" className="icon" /></button>
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
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
