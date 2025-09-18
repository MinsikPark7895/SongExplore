import SearchBar from "../components/SearchBar";
import SongList from "../components/SongList";
import { useQuery } from "@tanstack/react-query";
import { useSearchStore } from "../store/useSearchStore";

function SearchPage() {
  const { query } = useSearchStore();
  
  const { data, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      return fetch(`https://api.manana.kr/karaoke/song/rain.json`).then((res) =>
        res.json()
      );
    },
  });

  if (isLoading) {
    return (
      <div className="page-container">
        <SearchBar />
        <div className="loading-container">
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎵</div>
          <h2>노래를 불러오는 중...</h2>
          <p>잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  // 검색어가 없을 때
  if (!query.trim()) {
    return (
      <div className="page-container">
        <SearchBar />
        <div className="empty-container">
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>🔍</div>
          <h2>노래를 검색해보세요</h2>
          <p>제목이나 가수를 입력하여 원하는 노래를 찾아보세요</p>
        </div>
      </div>
    );
  }

  // 검색 결과가 없을 때
  const filteredSongs = data?.filter((song: any) => 
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.singer.toLowerCase().includes(query.toLowerCase())
  ) || [];

  if (filteredSongs.length === 0) {
    return (
      <div className="page-container">
        <SearchBar />
        <div className="empty-container">
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>😔</div>
          <h2>검색 결과가 없습니다</h2>
          <p>다른 검색어로 시도해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <SearchBar />
      <div className="search-results">
        <div className="search-results__header">
          <h3>검색 결과 ({filteredSongs.length}곡)</h3>
        </div>
        <SongList list={data} />
      </div>
    </div>
  );
}

export default SearchPage;
