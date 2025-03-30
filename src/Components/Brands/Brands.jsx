import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Brands() {

  const[allBrands,setAllBrands]=useState(null);

  async function getAllBrands(){
    let response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    setAllBrands(response.data.data);
  }

  useEffect(()=>{
    getAllBrands();
  },[]);

  return (
    <> <h2 className='text-5xl font-semibold text-emerald-600 text-center my-5'>All Brands</h2>
    {allBrands?.length>0 ?     <div className='flex flex-wrap w-[70%] md:w-[85%] mx-auto'>
      {allBrands?.map((brand)=>
      <div className='p-3 w-full md:w-1/4'>
        <div className='shadow-md  rounded-md hover:shadow-lg hover:shadow-emerald-600 transition-all duration-500 border-2'>
          <div>
              <img className='w-full h-[200px] object-contain' src={brand.image} alt="" />
          </div> 
          <h2 className='text-center text-md  p-4'>{brand.name}</h2>
        </div>
      </div>
      )}
    </div> :<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
    </>
  );
}
