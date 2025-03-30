import React, { useContext, useState } from 'react';
import style from "./RecentProducts.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/wishlistContext';
import WishList from './../WishList/WishList';


export default function RecentProducts() {

  let {addProductToCart}=useContext(CartContext);
  let {addToWish,wishListDetails,removeFromWish}=useContext(WishListContext);

  const[loading,setloading]=useState(false);
  const[currentId,setCurrentId]=useState();

  async function addToWishList(prodId){
      await addToWish(prodId);
      //console.log(response);
      
  }

  async function removeFromWishList(prodId) {
    await removeFromWish(prodId);
  }


  async function handleWishList(prodId){
    const productInWishList = wishListDetails?.some(item => item.id == prodId);

    if(productInWishList){
      //function to remove product from wishlist
      console.log("remove");
      removeFromWishList(prodId);
    }
    else{
      //add product to wish list
      console.log("add");
      addToWishList(prodId);
    }
  }

  async function addToCart(id){
    setCurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    //console.log(response.data);

    if(response.data.status=="success"){
      setloading(false);
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

  let {data,isLoading,isError,error}=useProducts();

  if(isLoading ){
    return  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
  } 

  

  // if(isError){
  //   return(<h3 className='bg-red-800'>{error}</h3>); 
  // }


  // const[products,setProducts]=useState([]);

  // function getProducts(){
  //   axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //   .then((res)=>{setProducts(res.data.data)})
  //   .catch((res)=>{});
  // }

  // useEffect(()=>{
  //   getProducts();
  // },[]);

  return (
    <>
    <div className="row mx-5 md:mx-10 lg:mx-28">

      {data?.data?.data.map((product)=>(<div key={product._id} className='w-full md:w-1/2  lg:w-1/4 my-2 px-2'>
        <div className="product group hover:shadow-lg hover:shadow-emerald-600 p-3 transition-all duration-500 rounded-md">

          <Link to={`productdetails/${product.id}`}>
            <img src={product.imageCover} className='w-full' alt="" />
            <h3 className='text-emerald-600'>{product.category.name}</h3>
            <h3 className='font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
            <div className='flex justify-between p-3'>
              <span>{product.price} EGP</span>
              <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
            </div>
          </Link>


            <div className='flex justify-between items-center'>
            <button onClick={()=> addToCart(product.id)} className='bg-emerald-500 text-white w-3/4 opacity-0 translate-y-52 group-hover:opacity-100  group-hover:translate-y-0 transition-all duration-500 rounded-lg p-2'>{loading && currentId==product.id ? <i className='fas fa-spinner fa-spin'></i> :"+Add"}</button>
            

            <span onClick={() => handleWishList(product.id)}>
                {/* Conditionally render heart icon based on whether the product is in the wishlist */}
                {wishListDetails?.some(item => item.id === product.id) ? (
                  <i className='fas fa-heart text-2xl pe-3 text-red-700 cursor-pointer'></i>
                ) : (
                  <i className='fas fa-heart text-2xl pe-3 cursor-pointer'></i>
                )}
              </span>

            
            </div>
        </div>
      </div>) )}

    </div>
    </>
  );
}
