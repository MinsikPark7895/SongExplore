import { useState, useEffect } from "react";
import SongItem from "../SongItem";
import type { Song } from "../types";
import { useSearchStore } from "../../store/useSearchStore";

interface SongListProps {
  list: Song[];
}

function SongList({ list }: SongListProps) {
  const { query } = useSearchStore();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Local Storage에서 찜한 노래 목록 불러오기
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteSongs');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 찜하기 토글 함수
  const toggleFavorite = (songNo: string) => {
    const newFavorites = favorites.includes(songNo)
      ? favorites.filter(no => no !== songNo)
      : [...favorites, songNo];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSongs', JSON.stringify(newFavorites));
  };

  // 검색 필터링
  const filteredSongs = list.filter(song => 
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.singer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="SongList">
      {filteredSongs.map((song) => (
        <SongItem 
          key={song.no} 
          {...song} 
          isFavorite={favorites.includes(song.no)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default SongList;
