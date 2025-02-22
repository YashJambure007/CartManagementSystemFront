/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const Cart = ({ cartAllProduct, setCartAllProduct }) => {
  console.log("cartAllProduct", cartAllProduct);

  const handleIncrement = (id) => {
    setCartAllProduct((prevCart) =>
      prevCart.map((item) =>
        item?.id === id ? { ...item, count: item?.count + 1 } : item
      )
    );
  };
  const handleDecrement = (id) => {
    setCartAllProduct((prevCart) =>
      prevCart.map((item) =>
        item?.id === id && item.count > 1
          ? { ...item, count: item?.count - 1 }
          : item
      )
    );
  };
  const handleDeleteItem = (id) => {
    // eslint-disable-next-line react/prop-types
    const filteredItem = cartAllProduct?.filter((item) => item?.id !== id);
    setCartAllProduct(filteredItem);
  };

  return (
    <div className="container-fluid">
      <div className="row p-3 gap-3">
        {cartAllProduct?.map((product) => {
          return (
            <div
              className="col-8 border rounded d-flex gap-3"
              key={product?.id}
            >
              <div className="p-1">
                <img
                  src={product?.img}
                  alt={product?.model}
                  className="cart-product-size"
                />
              </div>
              <div className="p-1 d-flex gap-3">
                <div>
                  <h3 className="text-hiding m-0">
                    {product?.model?.toUpperCase()}
                  </h3>
                  <p className="m-0 fs-5">
                    <span className="font-bold ">₹</span> {product?.price}
                  </p>
                  <p className="m-0 font-size-12 font-bold">{product?.space}</p>
                  <p className="m-0 font-size-12 font-bold">
                    {product?.camera}
                  </p>
                  <div className="d-flex gap-3 mt-1">
                    <p
                      className="m-0 border p-0 px-2 py-1 rounded cursor-pointer"
                      onClick={() => handleDecrement(product?.id)}
                    >
                      -
                    </p>
                    <p className="mt-1 ">{product?.count}</p>
                    <p
                      className="m-0 border p-0 px-2 py-1 rounded cursor-pointer"
                      onClick={() => handleIncrement(product?.id)}
                    >
                      +
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-col relative">
                  <div className="d-flex mt-2">
                    <p>{product?.description}</p>
                    <p onClick={() => handleDeleteItem(product?.id)}>
                      <i className="fa-solid fa-trash text-danger pointer text-[1.2rem] mt-1"></i>
                    </p>
                
                  </div>
                  <button className="border rounded-md p-1 w-[20%] absolute bottom-3">Buy Now</button>
                </div>
               
              </div>
            </div>
          );
        })}

        {cartAllProduct.length == 0 && (
          <div className="col-12">
            <h1 className="text-center fs-3">No Products Availabe in Cart</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;