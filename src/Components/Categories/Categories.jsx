import React, { useEffect, useState } from 'react';
import style from "./Categories.module.css"
import axios from 'axios';

export default function Categories() {

  const[categories,setAllCategories]=useState(null);

  async function getAllCategories(){
    let response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    setAllCategories(response.data.data);
  }

  useEffect(()=>{
    getAllCategories();
  },[]);

  return (
    <>{categories?.length>0 ?     <div className='flex flex-wrap w-[70%] md:w-[85%] mx-auto'>
      {categories?.map((category)=>
      <div className='p-3 w-full md:w-1/3'>
        <div className='shadow-md  rounded-md hover:shadow-lg hover:shadow-emerald-600 transition-all duration-500'>
          <div>
              <img className='w-full h-[350px] object-cover' src={category.image} alt="" />
          </div> 
          <h2 className='text-center text-3xl font-semibold text-emerald-600 p-2'>{category.name}</h2>
        </div>
      </div>
      )}
    </div> :<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
    </>
  );
}
