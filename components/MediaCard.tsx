
import React from 'react';
import { MediaItem, MediaType } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
  onRemove: (id: string) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onClick, onRemove }) => {
  const getThumbnail = () => {
    if (item.type === MediaType.YOUTUBE) {
      const youtubeId = item.url.includes('v=') 
        ? item.url.split('v=')[1].split('&')[0] 
        : item.url.split('/').pop();
      return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    }
    return `https://picsum.photos/seed/${item.id}/400/225`;
  };

  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-indigo-500 transition-all duration-300">
      <div 
        className="aspect-video relative cursor-pointer overflow-hidden"
        onClick={() => onClick(item)}
      >
        <img 
          src={getThumbnail()} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-medium uppercase tracking-wider text-indigo-400">
          {item.type}
        </div>
      </div>
      
      <div className="p-4 flex justify-between items-start">
        <div className="flex-1 min-w-0 mr-4">
          <h3 className="font-semibold text-zinc-100 truncate group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {item.description || "No description provided"}
          </p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
          className="text-zinc-600 hover:text-red-400 transition-colors p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
