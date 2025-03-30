import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from './../../Context/UserContext';

export default function ResetPassword() {
  let {SetUserLogin}=useContext(UserContext);
  let navigate=useNavigate();
    const [IsLoading, setIsLoading] = useState(false);



  
  async function handleResetPassword(values) {
    //i want the user to be able to access his account after reseting his password without needing to login again
    async function login(values)
    {
      await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,{email:values.email , password:values.newPassword})
      .then((res) => {
        if(res.data.message=="success"){
          localStorage.setItem("userToken",res.data.token);
          SetUserLogin(res.data.token);
          navigate("/");
        }
      })
    }
    setIsLoading(true);
    await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    .then((res)=>{
      setIsLoading(false);
      login(values);
    })
    .catch((res)=>{
      setIsLoading(false);
    });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword:""
    },
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <h1 className="text-emerald-600 text-center text-[40px] font-bold pt-6">
        Reset Your Password
      </h1>
      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto py-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your New Password
          </label>

        </div>

        <button
            type="submit"
            className=" text-white  bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {IsLoading ? <i className="fas fa-spinner fa-spin"></i> :"Submit"}
          </button>
      </form>
    </>
  );
}
