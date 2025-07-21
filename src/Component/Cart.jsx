/* eslint-disable react/prop-types */
import { loadStripe } from "@stripe/stripe-js";


const Cart = ({ cartAllProduct, setCartAllProduct }) => {
  const handleIncrement = (id) => {
    setCartAllProduct((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartAllProduct((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    const filteredItem = cartAllProduct.filter((item) => item.id !== id);
    setCartAllProduct(filteredItem);
  };

  const totalPriceItem = cartAllProduct.map(
    (product) => product.price * product.count
  );
  const totalPrice = totalPriceItem.reduce((acc, curr) => acc + curr, 0);



  const handleCheckout = async () => {

  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51RmXF7Q7LO6b0ZmrJq87GutlVCx5aoMHVjLV95SGyIM2w0gwKEVhIwthDKMeJL8cVmgPKTwVMeTs2kwp56lvGrFT00oV3GfQav");

  const response = await fetch("https://cartmanagementsystem.onrender.com/api/makepayment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartAllProduct),
      });

      const sessionData = await response.json();

      stripe.redirectToCheckout({
        sessionId: sessionData?.id,
      });
  };

  return (
    <div className="container-fluid">
      <div className="flex p-3 gap-3">
        <div className="col-12 w-[70%]">
          {cartAllProduct.map((product) => (
            <div
              className="col-8 border w-[95%] rounded flex gap-3 p-2 mb-2"
              key={product.id}
            >
              <div className="p-1">
                <img
                  src={product.img}
                  alt={product.model}
                  className="cart-product-size"
                />
              </div>
              <div className="p-1 flex gap-3">
                <div>
                  <h3 className="text-hiding m-0 font-semibold">
                    {product.model.toUpperCase()}
                  </h3>
                  <p className="m-0 text-[2rem]">
                    <span className="font-bold">₹</span> {product.price}
                  </p>
                  <p className="m-0 font-size-12 font-bold">
                    {product.space}
                  </p>
                  <p className="m-0 font-size-12 font-bold">
                    {product.camera}
                  </p>
                  <div className="flex gap-3 mt-1">
                    <p
                      className="m-0 border px-2 py-1 rounded cursor-pointer"
                      onClick={() => handleDecrement(product.id)}
                    >
                      -
                    </p>
                    <p className="mt-1">{product.count}</p>
                    <p
                      className="m-0 border px-2 py-1 rounded cursor-pointer"
                      onClick={() => handleIncrement(product.id)}
                    >
                      +
                    </p>
                  </div>
                </div>
                <div className="flex flex-col relative">
                  <div className="flex mt-2 ms-3">
                    <p>{product.description}</p>
                    <p onClick={() => handleDeleteItem(product.id)}>
                      <i className="fa-solid fa-trash text-danger pointer text-[1.3rem] mt-1 ms-3"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartAllProduct.length > 0 && (
          <div className="col-3">
            <div className="row">
              <div className="col-12">
                <div className="row border rounded-xl">
                  <div className="col-12 p-0">
                    <h6 className="m-0 w-full rounded-t-xl py-3 px-4 text-white bg-slate-600">
                      PRICE DETAILS
                    </h6>
                  </div>
                  <div className="flex justify-between bg-white py-2 px-4">
                    <p>TOTAL ITEMS</p>
                    <p>{cartAllProduct.length}</p>
                  </div>
                  <div className="flex justify-between bg-white py-2 px-4">
                    <p>TOTAL AMOUNT</p>
                    <p>
                      {totalPrice.toLocaleString("en-IN", {
                        maximumFractionDigits: 1,
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between bg-white py-2 px-4">
                    <p>DELIVERY CHARGES</p>
                    <p>
                      <span className="line-through">
                        ₹{cartAllProduct.length * 20}
                      </span>
                      <span className="text-success ms-1"> FREE</span>
                    </p>
                  </div>
                  <div className="my-3 bg-white px-4">
                    <button
                      className="btn btn-success w-full"
                      onClick={handleCheckout}
                    >
                      CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {cartAllProduct.length === 0 && (
          <div className="col-12">
            <h1 className="text-center fs-3">No Products Available in Cart</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
