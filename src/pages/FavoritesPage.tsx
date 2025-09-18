import { useState, useEffect } from "react";
import SongItem from "../components/SongItem";
import type { Song } from "../components/types";

function FavoritesPage() {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [favoriteNos, setFavoriteNos] = useState<string[]>([]);

  // Local Storage에서 찜한 노래 번호 목록 불러오기
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteSongs');
    if (storedFavorites) {
      const nos = JSON.parse(storedFavorites);
      setFavoriteNos(nos);
    }
  }, []);

  // 찜하기 토글 함수
  const toggleFavorite = (songNo: string) => {
    const newFavorites = favoriteNos.filter(no => no !== songNo);
    setFavoriteNos(newFavorites);
    localStorage.setItem('favoriteSongs', JSON.stringify(newFavorites));
    
    // 찜한 노래 목록에서도 제거
    setFavoriteSongs(prev => prev.filter(song => song.no !== songNo));
  };

  return (
    <div className="page-container">
      <div className="favorites-header">
        <h1>찜한 노래</h1>
        <div className="favorites-count">
          {favoriteNos.length}곡
        </div>
      </div>
      
      {favoriteNos.length > 0 ? (
        <div className="favorites-list">
          {favoriteNos.map((no) => (
            <div key={no} className="favorite-item">
              <div className="favorite-item__content">
                <div className="favorite-item__left">
                  <button 
                    className="favorite-item__remove-btn"
                    onClick={() => toggleFavorite(no)}
                    title="찜 해제"
                  >
                    ❤️
                  </button>
                  <div className="favorite-item__info">
                    <div className="favorite-item__title">
                      노래 번호: {no}
                    </div>
                    <div className="favorite-item__subtitle">
                      상세 정보를 불러오는 중...
                    </div>
                  </div>
                </div>
                <div className="favorite-item__number">
                  {no}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-container">
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>🤍</div>
          <h2>찜한 노래가 없습니다</h2>
          <p>검색 페이지에서 마음에 드는 노래를 찜해보세요!</p>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
