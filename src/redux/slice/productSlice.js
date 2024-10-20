import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchProductData = createAsyncThunk("allProducts/fetchProductData",async()=>{
    const result = await axios.get("http://dummyjson.com/products")
    localStorage.setItem("products",JSON.stringify(result.data.products))
      return result.data.products
})

 const productSlice = createSlice({
    name:"allProducts",
    initialState:{
        products:[],
        productsDummy:[],
        loading:false,
        error:""
    },
    reducers:{
             searchProducts:(state,action)=>{
                state.products= state.productsDummy.filter(item=> item.title.toLowerCase().includes(action.payload))
             }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductData.pending,(state)=>{
             state.loading=true
        }),
        builder.addCase(fetchProductData.fulfilled,(state,action)=>{
            state.products = action.payload
            state.productsDummy = action.payload
            state.loading=false
        }),
        builder.addCase(fetchProductData.rejected,(state)=>{
            state.error="API Failed ... please try after some time"
            state.products=[]
            state.productsDummy=[]
            state.loading=false
        })

    }
    
 })
export const {searchProducts}=productSlice.actions
export default productSlice.reducer 

