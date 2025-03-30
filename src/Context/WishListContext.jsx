import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { resolveValue } from "./../../node_modules/react-hot-toast/src/core/types";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  const [wishListDetails, setWishListDetails] = useState([]);

  let { UserLogin } = useContext(UserContext);

  let headers = {
    token: UserLogin,
  };

  async function getWishList() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishListDetails(response.data.data || []);
    } finally {
      return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      });
    }
  }

  async function addToWish(prodId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: prodId },
        { headers }
      );

      // After adding, fetch the updated wishlist
      getWishList();
      return response.data; // Return the response data after successful addition
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      return error.response.data;
    }
  }

  async function removeFromWish(prodId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,
        { headers }
      );
      getWishList();
      return response.data;
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      return error.response.data;
    }
  }

  useEffect(() => {
    if (UserLogin) {
      getWishList();
    }
  }, [UserLogin]);

  return (
    <WishListContext.Provider
      value={{
        addToWish,
        getWishList,
        wishListDetails,
        setWishListDetails,
        removeFromWish,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
