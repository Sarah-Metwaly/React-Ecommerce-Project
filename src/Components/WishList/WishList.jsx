import React, {useContext, useEffect, useState } from 'react';
import useProducts from '../../Hooks/useProducts';
import { WishListContext } from '../../Context/wishlistContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export default function WishList() {

  let {getWishList,wishListDetails,setWishListDetails ,removeFromWish}=useContext(WishListContext);
  let {addProductToCart}=useContext(CartContext)

  async function addToCart(id){
    let response = await addProductToCart(id);
    //console.log(response.data);

    if(response.data.status=="success"){
      toast.success(response.data.message ,{
        position:"top-right", 
        style :{   
          color:"#fff",
          background: "#10B981"
        },
      })
    }
    else{
      setloading(false);
        //console.log("no");
    }
  }

  async function getList(){
    let response=await getWishList();
    //setWishListDetails(response.data.data);
    console.log(response.data.data);
  }

  async function removeItem(prodId){
    await removeFromWish(prodId);
    getList();
  }

  useEffect(()=>{
      getList();
  },[])


  return (
    <>
    <h2 className='text-4xl font-semibold text-emerald-600 w-[80%] mx-auto my-2 text-center'>My WishList</h2>
    {wishListDetails?.length>0 ? <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mx-auto">
        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

          <tbody>
            {wishListDetails?.map((product)=><tr key={product.id} className="flex flex-wrap justify-between items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4 w-full md:w-1/5">
                              <img
                                src={product.imageCover}
                                className="w-full"
                                alt={product.title}
                              />
                            </td>

                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white w-1/2 md:w-1/3">
                              <span className='text-lg text-black'>
                              {product.title} 
                              </span>
                              <br />
                              <span className='text-emerald-600'>{product.price} EGP</span>
                              <br />

                              <span
                                onClick={()=>removeItem(product.id)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer block mt-2"
                              >
                                <i className='fas fa-trash pe-2'></i>Remove
                              </span>
                              
                            </td>

                            <td className="px-6 py-4 w-1/2 md:w-1/3">
                            <button onClick={()=> addToCart(product.id)} className='bg-emerald-500 text-white  rounded-lg p-2'>+Add to cart</button>

                            </td>
                          </tr>
            )}

          </tbody>
        </table>
      </div>
    
    </>
       :<h1 className="text-2xl text-center font-bold text-emerald-600  p-[100px] mt-16">THE LIST IS EMPTY</h1>}
    </>
  );
}
