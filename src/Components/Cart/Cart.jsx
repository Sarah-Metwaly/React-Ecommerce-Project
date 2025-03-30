import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/cartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getLoggedUserCart , updateCartProductQuantity,deleteCartItem,clearCart} = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    //console.log(response.data.data);
    if(response?.data?.status == "success"){
      setCartDetails(response.data.data);
    }
    else
    {
      console.log(response);
    }
    
  }

  async function updateProducts(id,count){

      let response =await updateCartProductQuantity(id,count);
      //console.log(response);
      if(response.data.status=="success"){
      setCartDetails(response.data.data);
    }
  }


  async function deleteItem(productId){
    let response =await deleteCartItem(productId);
    if(response.data.status=="success"){
      setCartDetails(response.data.data);
    }
  }

  async function clearUserCart() {
    let response=await clearCart();
    setCartDetails();
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
    <h2 className="text-4xl text-emerald-600 font-semibold text-center">My Cart</h2>
    {CartDetails?.products?.length > 0 ? <> <div className="flex justify-between w-[70%] my-2 mx-auto">
        <h2 className="text-center text-2xl font-bold text-emerald-600 p-1">Total Price : {CartDetails?.totalCartPrice}</h2>
        <button onClick={()=>clearUserCart()} className="bg-emerald-600 text-white rounded-lg p-3 text-md "><i className="fa fa-trash"></i> Clear Cart</button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  w-[70%] mx-auto py-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {CartDetails?.products.map((product)=><tr key={product.product.id} className= " flex  flex-wrap md:justify-between items-center  bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4 w-full md:w-1/5 ">
                              <img
                                src={product.product.imageCover}
                                className="w-full"
                                alt={product.product.title}
                              />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white w-1/2 md:w-1/5 flex justify-center">
                              {product.product.title}
                            </td>
                            <td className="px-6 py-4 w-1/2 md:w-1/5 flex justify-center">
                              <div className="flex items-center">
                                <button
                                  onClick={()=>updateProducts(product.product.id , product.count-1)}
                                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                >
                                  <span className="sr-only">Quantity button</span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <div>
                                  {product.count}
                                </div>
                                <button
                                  onClick={()=>updateProducts(product.product.id , product.count+1)}
                                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                >
                                  <span className="sr-only">Quantity button</span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white w-1/2 md:w-1/5 flex justify-center">
                              {product.price} EGP
                            </td>
                            <td className="px-6 py-4 w-1/2 md:w-1/5 flex justify-center">
                              <span onClick={()=> deleteItem(product.product.id )}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                              >
                                <i className="fa fa-trash"></i> Remove
                              </span>
                            </td>
                          </tr>
            )}

          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link to="/checkout">
          <button className="w-[70%] mt-2 bg-emerald-600 rounded-lg p-2 text-lg text-white">Check Out</button>
        </Link>
      </div>
      </> :<h1 className="text-2xl text-center font-bold text-emerald-600 ">THE CART IS EMPTY</h1>}

    </>
  );
}
