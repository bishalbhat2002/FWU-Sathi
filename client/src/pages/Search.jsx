
import { SearchedUsers } from "../components/SearchComponents/SearchedUsers";
import { UserSearchBar } from "../components/SearchComponents/UserSearchBar";
import ScrollPageLayout from "../layouts/ScrollPageLayout";

const Search = () => {
  return (
    <ScrollPageLayout>
      {/* <div className="w-full  max-w-160 bg-blue-400 mx-auto mt-2 rounded-md flex flex-col items-start overflow-hidden shadow-2xl"> */}
        <UserSearchBar />
        <SearchedUsers />

    </ScrollPageLayout>
  );
};

export default Search;


