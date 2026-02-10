import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchUserThunk, getAllUserThunk } from "../../store/features/search/search.thunk";
import { toast } from "react-hot-toast";
import { setFilterSemester } from "../../store/features/search/search.slice";



export const UserSearchBar = () => {
  const [searchString, setSearchString] = useState("");


  const dispatch = useDispatch();

  function handleUserSearch(e) {
    e.preventDefault();
    if (searchString.length === 0){
      dispatch(getAllUserThunk({page:1}));
      return;
    }

    if(searchString.length == 1 || searchString.length == 2) {
      toast.error("Search string must be at least 3 characters long.", {duration: 1000, position: "top right"});
      return;
    }
    if(searchString.length > 30) {
      toast.error("Search string cannot be more than 30 characters long.", {duration: 1000, position: "top right"});
      return;
    }

    dispatch(searchUserThunk(searchString));
  }

  function handleSemesterFilter(e) {
    const semester = e.target.value;
    dispatch(setFilterSemester(semester));            // set semester filter in the state...
  }




  return (
    <form
      onSubmit={handleUserSearch}
      className="w-full max-w-100 p-5 bg-blue-100/20 border border-black/20 mx-auto mt-2 rounded-md flex flex-col items-end overflow-hidden shadow relative"
    >
      {/* Search bar and login button... */}
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={searchString}
          autoFocus={true}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search by name, college or address..."
          className="flex-1 bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-2 focus:outline-blue-400"
        />
        <button
          type="submit"
          className="px-2 bg-blue-200 rounded text-xs sm:text-sm border border-black/20 hover-scale"
        >
          {searchString.length > 0 ? "Search" : "Get All Users"}
        </button>

      </div>

          {/* Option for slecting Semester... */}
          <select 
          onChange={handleSemesterFilter}
          className="w-30 flex-end mt-3">
            <option value="" selected={true}>All Semester</option>
            <option value="1">1 semester</option>
            <option value="2">2 semester</option>
            <option value="3">3 semester</option>
            <option value="4">4 semester</option>
            <option value="5">5 semester</option>
            <option value="6">6 semester</option>
            <option value="7">7 semester</option>
            <option value="8">8 semester</option>
          </select>

    </form>
  );
};
