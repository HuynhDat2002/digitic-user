<<<<<<< HEAD
import { configureStore  } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/blogs/blogSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        blog: blogReducer,
        contact: contactReducer
=======
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        product: productReducer,
        blog: blogReducer,
>>>>>>> 5ec7a760a3378ee9574827f0042e27f34b63bcbb
    },
});