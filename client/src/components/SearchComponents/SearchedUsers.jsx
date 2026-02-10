import { User } from "./User";
import { useSelector } from "react-redux";

export const SearchedUsers = () => {
  const searchedUsers = useSelector((state) => state.searchReducer.searchedUsers);

  const filterSemester = useSelector((state) => state.searchReducer.filterSemester);

  // Apply semester filter if selected
  const filteredUsers = filterSemester
    ? searchedUsers.filter(
        (user) => String(user.semester) === String(filterSemester)
      )
    : searchedUsers;

  return (
    <div
      className="w-full max-w-350 min-h-[70vh] mx-auto p-5 mt-2 rounded-md overflow-y-scroll hide-scrollbar grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center place-content-start"
    >
      {filteredUsers?.map((user) => (
        <User key={user._id} user={user} />
      ))}

      {/* If no user found... */}
      {filteredUsers?.length === 0 && (
        <div className="w-full h-40 flex flex-col items-center justify-center gap-2  md:col-span-2 lg:col-span-3 xl:col-span-4 mt-10">
          <h2 className="text-lg font-medium text-zinc-700">No user found!</h2>
          <p className="text-sm text-zinc-500">
            Try different search keywords or remove filters.
            </p>
        </div>
      )}
    </div>
  );
};
