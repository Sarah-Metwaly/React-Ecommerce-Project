import React, { useEffect, useState } from 'react';
//import style from "./CategoriesSlider.module.css";

import Slider from "react-slick";
import axios from 'axios';



export default function CategoriesSlider() {

  const[categories,setCategories]=useState([]);
  


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    //speed: 1000,
    responsive: [
      {
        breakpoint: 955,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 755,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 415,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1

        }
      }
    ]
  };


  function getCategories(){
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res)=>{
      setCategories(res.data.data);
    })
  }

  useEffect(()=>{
    getCategories();
  },[])

  return (
    <>
    <div className='w-full'>
    <Slider {...settings} className='w-full'>
       {categories?.map((category)=>(
          <div key={category._id}>
            <div className='w-full'>
              <img src={category.image} className='w-[100%] h-52 object-cover' alt="" />
          
            <h3 className='text-lg text-center font-bold'>{category.name}</h3>
            </div>
          </div>
       ))}
    </Slider>
    </div>
    </>
  );
}
