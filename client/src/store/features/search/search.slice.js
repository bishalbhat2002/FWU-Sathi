import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getAllUserThunk, searchUserThunk } from "./search.thunk";


const initialState = {
  searchedUsers: [],
  filterSemester: "",       // filter for semester

  // Loaders
  loader: false,
  success: false, // State to redirect to different pages on any operation success.
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
      console.log("success:", action.payload);
    },
    setFilterSemester: (state, action) => {
      state.filterSemester = action.payload;
      // console.log("semester filter:", action.payload);
    }
  },

  // All the asynchronous operations are put into extraReducers.
  extraReducers: (builder) => {
    // code for searching users...
    builder.addCase(getAllUserThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(getAllUserThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.searchedUsers = action?.payload?.users;
     //  console.log(action?.payload);
    });

    builder.addCase(getAllUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload);                          // comment this when in production
    });


    // code for searching users...
    builder.addCase(searchUserThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(searchUserThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.searchedUsers = action.payload?.users;
      //  toast.success(action.payload?.message);               // comment this when in production
    });

    builder.addCase(searchUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);
      toast.error(action.payload);                          // comment this when in production
    });
  },
});

export const { setSuccess, setFilterSemester } = searchSlice.actions;
export default searchSlice.reducer;
