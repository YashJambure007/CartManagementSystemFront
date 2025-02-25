/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const Navbar = ({ cartAllProduct }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 bg-blue-500 flex justify-between px-[3rem]">
          <ul className="flex gap-[3rem] text-white font-bold align-center m-0 py-[1rem] ">
            <NavLink
              to="/"
              className="list-none p-0 cursor-pointer decoration-0"
            >
              HOME
            </NavLink>
            <li className="list-none font-bold p-0 cursor-pointer">ABOUT</li>
            <li className="list-none font-bold p-0 cursor-pointer">CONTACT</li>
          </ul>
          <ul className="m-0 p-0 py-[1rem] relative">
            <NavLink
              to="/cart"
              className="list-none text-white p-0 cursor-pointer relative"
            >
               <i className="fa-solid fa-cart-shopping text-2xl absolute top-3 right-4"></i>
            </NavLink>
            <span
              className="decoration-0 count rounded-[50%] text-black absolute"
              style={{backgroundColor: "orange", right:'-45%' }}
            >
              {cartAllProduct?.length}
            </span>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;