import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchUserThunk } from "../../store/features/search/search.thunk";

export const UserSearchBar = () => {
  const [searchString, setSearchString] = useState("");
  const [filters, setFilters] = useState(false);

  const dispatch = useDispatch();

  function handleUserSearch(e) {
    e.preventDefault();
    if (searchString.length === 0) return;

    dispatch(searchUserThunk(searchString));
  }

  return (
    <form
      onSubmit={handleUserSearch}
      className="w-full max-w-100 p-5 bg-blue-100/20 border border-black/20 mx-auto mt-2 rounded-md flex flex-col items-start overflow-hidden shadow"
    >
      {/* Search bar and login button... */}
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={searchString}
          autoFocus={true}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Ur Search String Here..."
          className="w-8/10 bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-2 focus:outline-blue-400"
        />
        <button
          type="button"
          onClick={handleUserSearch}
          className="flex-1 bg-blue-200 rounded text-md border-1 border-black/20 hover-scale"
        >
          Search
        </button>
      </div>

      {/* Filters Options... */}
      {false && (
        <div className="w-full mt-2 flex items-center gap-2 justify-end">
          <input onChange={() => setFilters((prev) => !prev)} type="checkbox" />
          <h2 className="text-md font-semibold text-gray-700 ">Filters:</h2>
        </div>
      )}

      {/* Show the filters options only when user want to apply filters.... */}
      {filters && (
        <div className="w-full flex gap-2 mt-2 mb-3">
          {/* Option for slecting Semester... */}
          <select>
            <option value="1">1 sem</option>
            <option value="2">2 sem</option>
            <option value="3">3 sem</option>
            <option value="4">4 sem</option>
            <option value="5">5 sem</option>
            <option value="6">6 sem</option>
            <option value="7">7 sem</option>
            <option value="8">8 sem</option>
            <option value="" disabled={true} selected={true}>
              Semester
            </option>
          </select>

          {/* Options for slecting Colleges... */}
          <select>
            <option value="FWU">FWU</option>
            <option value="KMC">KMC</option>
            <option value="" disabled={true} selected={true}>
              Colleges
            </option>
          </select>

          {/* Options for slecting Location... */}
          <select>
            <option value="Mahendranagar">Mahendranagar</option>
            <option value="Dhangadi">Dhangadi</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="" disabled={true} selected={true}>
              location
            </option>
          </select>
        </div>
      )}
    </form>
  );
};
