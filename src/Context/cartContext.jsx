import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let CartContext = createContext();

export default function CartContextProvider(props) {

  const[cartId,setCartId]=useState(null);

let {UserLogin}=useContext(UserContext);



  let headers = {
    token: UserLogin
  };

  function addProductToCart(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId },
      { headers }
    )
    .then((res)=> res)
    .catch((err)=> err);
  }

  function getLoggedUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    .then((res)=>{ 
      setCartId(res.data.data._id)
      return res;
    }).catch((err)=>err);
  }

  function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((res)=>res).catch((err)=>err);
  }

  function updateCartProductQuantity(productId, newCount){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount} ,{headers})
    .then((res)=> res).catch((res)=>res);
  }

  function deleteCartItem( productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
    .then((res)=> res).catch((res)=>res);
    
  }


  function checkOut( cartId,url,formData){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{ shippingAddress : formData} , {headers})
    .then((res)=> res).catch((res)=>res);
    
  }

  useEffect(()=>{
    getLoggedUserCart();
  },[]);

  return (
    <CartContext.Provider value={{ addProductToCart  , getLoggedUserCart,updateCartProductQuantity , deleteCartItem ,clearCart , checkOut , cartId}}>
      {props.children}
    </CartContext.Provider>
  );
}
