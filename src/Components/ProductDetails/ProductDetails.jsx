import React, { useEffect, useState } from 'react';
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";


export default function ProductDetails() {
  let {id}=useParams();
  const[product,setProduct]=useState(null);

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed:1000,
    
  };

  function getproduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      setProduct(res.data.data);
    })
    .catch((res)=>{})
  }

  useEffect(()=>{
    getproduct(id)
  },[]);

  return (
    <>
        <div className='md:flex w-full  :w-[90%] mx-auto justify-center items-center my-6'>
          <div className='w-full md:w-1/4 p-2'>
          <Slider {...settings}>
              {product?.images.map((src)=> <img src={src} className='w-full' alt="" /> )}
            </Slider>
          </div>

          <div className='w-full lg:w-3/4 p-2'>
            <div className='font-semibold text-xl p-2'>{product?.title}</div>
            <div className='text-gray-500 text-sm p-3'>{product?.description}</div>
            <div className='text-gray-600 p-3'>{product?.category.name}</div>

            <div className='flex justify-between p-3'>
              <span>{product?.price} EGP</span>
              <span>{product?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
            </div>


            <div className='flex justify-between items-center'>
            <button className='bg-emerald-500 text-white w-full rounded-lg p-2'>+Add</button>            
            <i className='fas fa-heart text-2xl px-3'></i>
            </div>


          </div>
        </div>
    </>
  );
}
