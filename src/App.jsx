import { useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import "./App.css";
import Cart from "./Component/Cart";
import { Route, Routes } from "react-router-dom";
import productList from "./Component/data";

const App = () => {
  const [productId, setProudctId] = useState("");
  const [cartAllProduct, setCartAllProduct] = useState([]);

  useEffect(() => {

    const filteredObject = productList.filter(
      (product) => product.id == productId
    );
    setCartAllProduct([...cartAllProduct, ...filteredObject]);

  }, [productId]);

  return (
    <>
      
        <Navbar cartAllProduct={cartAllProduct}/>
        <Routes>
          <Route
            path="/"
            element={<Home setProductId={setProudctId} />}
          ></Route>
          <Route
            path="/cart"
            element={<Cart cartAllProduct={cartAllProduct} setCartAllProduct={setCartAllProduct}/>}
          ></Route>
        </Routes>
      
    </>
  );
};

export default App;