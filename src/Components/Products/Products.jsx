import React from 'react';
import style from "./Products.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useProducts from './../../Hooks/useProducts';


export default function Products() {

  let {data,isLoading,isError,error}=useProducts();

  if(isLoading ){
    console.log("yes");
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
            <button className='bg-emerald-500 text-white w-3/4 opacity-0 translate-y-52 group-hover:opacity-100  group-hover:translate-y-0 transition-all duration-500 rounded-lg p-2'>+Add</button>
            <i className='fas fa-heart text-2xl pe-3'></i>
            </div>
        </div>
      </div>) )}

    </div>
    </>
  );
}
