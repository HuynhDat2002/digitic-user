import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "reac-toastify";
import { authService } from "./userService";
export const registerUser = createAsyncThunk("auth/register",async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
); 
export const getUserProductWislist = createAsyncThunk(
    "auth/wishlist",
    async (thunkAPI) => {
        try {
            return await authService.getUserWislist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addProdToCart = createAsyncThunk(
    "user/cart/add",
    async (cartData, thunkAPI) => {
        try {
            return await authService.addToCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async (thunkAPI) => {
        try {
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async (cartItemId, thunkAPI) => {
        try {
            return await authService.removeProductFromCart(cartItemId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async (cartDetail, thunkAPI) => {
        try {
            return await authService.updateProductFromCart(cartDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const getCustomerfromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdUser = action.payload;
            if (state.isSuccess === true) {
                toast.info("User Created Successfully");
            }
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.error(action.error);
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser, fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if (state.isSuccess === true) { 
                toast.info("User Logged In Successfully");
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
            toast.error(action.error);
            }
        })
        .addCase(getUserProductWislist.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserProductWislist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        })
        .addCase(getUserProductWislist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addProdToCart.pending, (state) => {
            state.isLoading =true;
        }).addCase(addProdToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProduct = action.payload;
            if (state.isSuccess) {
                toast.success("Product Added to Cart")
            }
        }).addCase(addProdToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getUserCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProducts = action.payload;
        }).addCase(getUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteCartProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCartProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deleteCartProduct = action.payload;
            if(state.isSuccess) {
                toast.success("Prouct Deleted From Cart Successfully!")
            }
        }).addCase(deleteCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess===false) {
                toast.error("Something Went Wrong!")
            }
        })
        .addCase(updateCartProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCartProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updateCartProduct = action.payload;
            if(state.isSuccess) {
                toast.success("Prouct Update From Cart Successfully!")
            }
        }).addCase(updateCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess===false) {
                toast.error("Something Went Wrong!")
            }
        })
    },
    });
 
export default authSlice.reducer;
