import productList from "./data";
import toast, { Toaster } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Home = ({ setProductId }) => {
  const handleAddToCart = (id) => {
    setProductId(id);
    toast.success("Product Added Successfully !");
  };

  return (
    <div className="container-fluid px-[3rem]">
      <div className="row gap-[1.5rem] justify-center">
        <Toaster />
        {productList?.map((product) => {
          return (
            <div className="col-2 border rounded mt-[0.5rem]" key={product?.id}>
              <div className="flex justify-center p-[0.5rem]">
                <img src={product?.img} alt="" className="product-size" />
              </div>
              <div className="py-[0.5rem]">
                <div className="flex justify-between px-[0.5rem]">
                  <p className="m-0 text-b
                   text-[0.8rem]">{product?.brand}</p>
                  <p className="m-0 font-bold text-[0.8rem">{product?.model}</p>
                </div>
                <div className=" px-[0.5rem]">
                  <p className="m-0">
                    <span className="font-bold">₹</span> {product?.price}
                  </p>
                  <p className="m-0 text-hiding">{product?.space}</p>
                </div>
                <div className="px-[0.5rem] mt-[0.25rem]">
                <button
                    className="btn btn-primary p-1 w-100"
                    onClick={() => handleAddToCart(product?.id)}
                  >
                    AddToCart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;