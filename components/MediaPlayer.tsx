
import React from 'react';
import { MediaItem, MediaType } from '../types';

interface MediaPlayerProps {
  item: MediaItem;
  onClose: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ item, onClose }) => {
  const renderContent = () => {
    switch (item.type) {
      case MediaType.YOUTUBE:
        const youtubeId = item.url.includes('v=') 
          ? item.url.split('v=')[1].split('&')[0] 
          : item.url.split('/').pop();
        return (
          <iframe
            className="w-full aspect-video rounded-xl shadow-2xl"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      case MediaType.VIDEO:
        return (
          <video
            className="w-full rounded-xl shadow-2xl"
            controls
            autoPlay
            src={item.url}
          >
            Your browser does not support the video tag.
          </video>
        );
      case MediaType.AUDIO:
        return (
          <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl flex flex-col items-center">
            <div className="w-48 h-48 bg-zinc-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-20 h-20 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <audio controls className="w-full" src={item.url} autoPlay />
          </div>
        );
      default:
        return <p>Unsupported media type</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {renderContent()}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          {item.description && <p className="text-zinc-400 mt-2">{item.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
