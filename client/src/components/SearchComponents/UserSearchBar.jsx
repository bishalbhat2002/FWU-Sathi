import { useState } from "react";

export const UserSearchBar = () => {
  const [searchString, setSearchString] = useState("");
  const [filters, setFilters] = useState(false)

  function handleUserSearch(e) {
     e.preventDefault();
    alert("Api call....");
  }

  return (
    <form onSubmit={handleUserSearch} className="w-full max-w-100 p-5 pb-2 bg-blue-100 border-1 border-black/20 mx-auto mt-2 rounded-md flex flex-col items-start overflow-hidden shadow">
      {/* Search bar and login button... */}
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={searchString}
          autoComplete={false}
          autoFocus={true}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Ur Search String Here..."
          className="w-8/10 bg-white-900 border-none input-shadow p-2 text-zinc-700 rounded-sm text-sm sm:text-md focus:outline-blue-400"
        />
        <button type="submit" className="flex-1 bg-blue-200 rounded text-md border-1 border-black/20">
          Search
        </button>
      </div>

      {/* Filters Options... */}
      <div className="w-full mt-2 flex items-center gap-2 justify-end">
      <input 
      onChange={()=>setFilters(prev=>!prev)}
      type="checkbox" />
      <h2 className="text-md font-semibold text-gray-700 ">Filters:</h2>
      </div>

      {/* Show the filters options only when user want to apply filters.... */}
      {filters &&
      <div className="w-full flex gap-2 mt-2 mb-3">
        {/* Option for slecting Semester... */}
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="" disabled={true} selected={true}>Semester</option>
        </select>

        {/* Options for slecting Colleges... */}
        <select>
          <option value="FWU">FWU</option>
          <option value="KMC">KMC</option>
          <option value="" disabled={true} selected={true}>Colleges</option>
        </select>

        {/* Options for slecting Location... */}
        <select>
          <option value="Mahendranagar">Mahendranagar</option>
          <option value="Dhangadi">Dhangadi</option>
          <option value="Kathmandu">Kathmandu</option>
          <option value="" disabled={true} selected={true}>location</option>
        </select>
      </div>
     }
    </form>
  );
};
