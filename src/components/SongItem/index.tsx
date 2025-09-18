import type { Song } from "../types";
import "./index.css";

interface SongItemProps {
  title: Song["title"];
  singer: Song["singer"];
  no: Song["no"];
  isFavorite?: boolean;
  onToggleFavorite?: (no: string) => void;
}

function SongItem({ title, singer, no, isFavorite = false, onToggleFavorite }: SongItemProps) {
  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(no);
    }
  };

  return (
    <div className="song-item">
      <div className="song-item__content">
        <div className="song-item__left">
          {onToggleFavorite && (
            <button 
              className={`song-item__favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={handleToggleFavorite}
              title={isFavorite ? '찜 해제' : '찜하기'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
          <div className="song-item__info">
            <div className="song-item__title">{title}</div>
            <div className="song-item__singer">{singer}</div>
          </div>
        </div>
        <div className="song-item__number">{no}</div>
      </div>
    </div>
  );
}

export default SongItem;
