import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate} from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {

  let {UserLogin , SetUserLogin}=useContext(UserContext);
  let navigate=useNavigate();

  function signOut(){
    localStorage.removeItem("userToken");
    SetUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-slate-300 border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">


          <div className="flex items-center gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                width={"120px"}
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>

            {UserLogin !== null ? <ul className="flex gap-3 ">
              <li><Link className="text-slate-600" to="">Home</Link></li>
              <li><Link className="text-slate-600" to="cart">Cart</Link></li>
              <li><Link className="text-slate-600" to="wishlist">WishList</Link></li>
              <li><Link className="text-slate-600" to="products">Products</Link></li>
              <li><Link className="text-slate-600" to="categories">Categories</Link></li>
              <li><Link className="text-slate-600" to="brands">Brands</Link></li>
            </ul>  :null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-4">
              <li><i className="fab fa-facebook"></i></li>
              <li><i className="fab fa-youtube"></i></li>
              <li><i className="fab fa-instagram"></i></li>
              <li><i className="fab fa-linkedin"></i></li>
              <li><i className="fab fa-twitter"></i></li>

            </ul>

              {UserLogin !== null ? <ul className="flex gap-5"> <li><span className="cursor-pointer" onClick={signOut}>SignOut</span></li> </ul>:
              <ul className="flex gap-5"><li><Link to="login">Login</Link></li><li><Link to="register">Register</Link></li></ul>
              }
          </div>
        </div>
      </nav>
    </>
  );
}
