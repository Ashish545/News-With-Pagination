import "./App.css";
import { useGlobalContext } from "./Context";

function Search() {
  const { query, searchPost } = useGlobalContext();

  return (
    <>
      <h1>Tech News📰 Search The Latest News 🔎 Regarding Tech</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            placeholder="Search Here🔎"
            value={query}
            onChange={(e) => searchPost(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Search;
