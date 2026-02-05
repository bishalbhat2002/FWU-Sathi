import { User } from "./User";
import { useSelector } from "react-redux";

export const SearchedUsers = () => {
  const searchedUsers = useSelector(
    (state) => state.searchReducer.searchedUsers,
  );
  console.log(searchedUsers);

  return (
    <div
      className="w-full max-w-350 min-h-[70vh] mx-auto p-5 mt-2 rounded-md overflow-y-scroll hide-scrollbar grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center place-content-start"
    >
      {searchedUsers?.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
};
