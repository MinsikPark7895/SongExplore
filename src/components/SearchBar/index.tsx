import { useSearchStore } from "../../store/useSearchStore";
import "./index.css";

function SearchBar() {
  const { query, setQuery } = useSearchStore();

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <div className="search-bar__icon">🔍</div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="노래 제목이나 가수를 검색하세요..."
          className="search-bar__input"
        />
        {query && (
          <button 
            className="search-bar__clear"
            onClick={() => setQuery('')}
            title="검색어 지우기"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
