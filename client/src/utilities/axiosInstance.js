import axios from "axios"

export const axiosInstance = axios.create({
     baseURL:import.meta.env.VITE_SERVER_URL,
     withCredentials:true,
   
     /**
      * Dont include content-Type while using axios. Because axios automatically sets content_Type based on content.
      * Important -> In case when we send photo, the photo is not uploaded in backend if we manually set....
      *  */ 
     // headers:{
     //      "Content-Type":"application/json",
     // }
})