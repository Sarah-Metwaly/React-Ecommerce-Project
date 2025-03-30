import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import WishListContextProvider from "./Context/wishlistContext";
import WishList from "./Components/WishList/WishList";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import RecentProducts from "./Components/RecentProducts/RecentProducts";
import CartContextProvider from "./Context/cartContext";

let x = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <RecentProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "verifycode", element: <VerifyCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

let query = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster />
          </WishListContextProvider>
        </CartContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
