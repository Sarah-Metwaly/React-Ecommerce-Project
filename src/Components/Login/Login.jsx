import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {

  let {UserLogin,SetUserLogin}=useContext(UserContext);

  let navigate = useNavigate();
  const [ApiError, SetApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  async function handleLogin(values) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        setIsLoading(false);
        if(res.data.message=="success"){
          localStorage.setItem("userToken",res.data.token);
          SetUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        SetApiError(res.response.data.message);
        setIsLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Not a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password min length is 6")
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-400 text-white font-bold rounded p-4 text-center">
          {ApiError}
        </div>
      ) : null}

      <h1 className="text-emerald-600 text-center text-[40px] font-bold pt-6">Login Now</h1>

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

          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 mt-2 border border-red-900"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 mt-2 border border-red-900"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>


        <div className="flex flex-wrap md:flex-nowrap  justify-between items-center">
        <div className="w-[100%] md:w-auto">
              <Link to="/forgotpassword" className="underline text-blue-600">Forgot your password?</Link>

          </div>
          <div className="w-[100%] md:w-auto">
              <Link to="/register" className="underline text-blue-600">Don't have an account?</Link>

          </div>
          <div className="w-[100%] md:w-auto">

            <button
            type="submit"
            className=" text-white  bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {IsLoading ? <i className="fas fa-spinner fa-spin"></i> :"Login"}
          </button>

          </div>

        </div>
      </form>
    </>
  );
}
