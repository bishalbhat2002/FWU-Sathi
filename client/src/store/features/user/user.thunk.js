import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUserThunk = createAsyncThunk("/user/register", async({object})=>{
     try {
          const response = await axiosInstance.post("/user/register", {object})
          console.log(response)
          return response.data;

     } catch (error) {
          console.log("Error from Register User Thunk: ",error)
     }
})


export const loginUserThunk = createAsyncThunk("/user/login", async({email, password})=>{
     try {
          const response = await axiosInstance.post("/user/register", {email, password})
          console.log(response)
          return response.data;
          
     } catch (error) {
          console.log("Error from Register User Thunk: ",error)
     }
})