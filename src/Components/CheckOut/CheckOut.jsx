import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/cartContext";



export default function CheckOut() {

  let {checkOut,cartId}=useContext(CartContext);
  

  async function handleCheckOut(cartId,url) {

    let response = await checkOut(cartId,url,formik.values);
    //console.log(response.data.session.url);
    window.location.href=response.data.session.url;
    
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city:""
    },
    onSubmit: ()=>handleCheckOut(cartId,"http://localhost:5173"),
  });

  return (
    <>

      <h1 className="text-emerald-600 text-center text-[40px] font-bold pt-6">Check Out</h1>

      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto py-5">


        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your details
          </label>

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="Phone"
            id="Phone"
            value={formik.values.Phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="Phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="City"
            id="City"
            value={formik.values.City}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="City"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your City
          </label>

        </div>


        <div className="flex flex-wrap md:flex-nowrap  justify-start items-center">
          <div className="w-[100%] md:w-auto">
            <button
            type="submit"
            className=" text-white  bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            CheckOut
          </button>

          </div>

        </div>
      </form>
    </>
  );
}
