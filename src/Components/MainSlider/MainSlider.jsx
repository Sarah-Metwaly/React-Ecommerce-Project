import React from 'react';
import style from "./MainSlider.module.css";
import Slider from "react-slick";

import slider1 from "../../assets/slider-image-1.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";
import slide from "../../assets/grocery-banner-2.jpeg";



export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed:1000,
    
  };



  return (
    <>
      <div className='flex flex-wrap w-[90%] md:w-[50%] mx-auto my-16'> 
          <div className="w-full md:w-3/4">
            <Slider {...settings}>
              <img src={slider1} className='w-full object-cover h-[400px]' alt="" />
              <img src={slider2} className='w-full object-cover h-[400px]' alt="" />
              <img src={slider3} className='w-full object-cover h-[400px]' alt="" />
            </Slider>
          </div>
          <div className='w-full md:w-1/4'>
            <img src={slide} className='w-full h-[200px] object-cover' alt="" />
            <img src={slider1} className='w-full h-[200px] object-cover' alt="" />

          </div>
      </div>
    </>
  );
}
