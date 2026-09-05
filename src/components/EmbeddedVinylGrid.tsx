import React, { useState, useEffect } from 'react';
import { FEATURED_SONGS, musicPlayer, type SongData } from '../utils/musicPlayer';
import { Play, Pause, Disc, Volume2 } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const EmbeddedVinylGrid: React.FC = () => {
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ current: number; total: number }>({ current: 0, total: 100 });

  useEffect(() => {
    musicPlayer.setOnTimeUpdate((current, total) => {
      setProgress({ current, total });
    });
  }, []);

  const handleTogglePlay = (song: SongData) => {
    if (activeSongId === song.id && isPlaying) {
      musicPlayer.stop();
      setIsPlaying(false);
      setActiveSongId(null);
    } else {
      soundFX.playSparkle();
      setActiveSongId(song.id);
      setIsPlaying(true);
      musicPlayer.playSong(song, () => {
        setIsPlaying(false);
        setActiveSongId(null);
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="mt-6 pt-5 border-t-2 border-black">
      <div className="mb-4">
        <h4 className="font-hpChapter font-bold text-sm sm:text-base uppercase tracking-wider text-black">
          ✦ The Soundtrack of Us: 4 Essential Vinyl Records
        </h4>
        <p className="font-hpEngraved italic text-xs sm:text-sm text-gray-600">
          Click any vinyl record below to spin the disc and listen.
        </p>
      </div>

      {/* 2 by 2 Embedded Vinyl Record Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FEATURED_SONGS.map((song) => {
          const isCurrentPlaying = activeSongId === song.id && isPlaying;
          const progressPercent = isCurrentPlaying && progress.total > 0
            ? (progress.current / progress.total) * 100
            : 0;

          return (
            <div
              key={song.id}
              className={`border border-black p-4 bg-white transition-all ${
                isCurrentPlaying ? 'bg-gray-50 ring-1 ring-black' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Vinyl Record Disc + Official Album Artwork */}
                <div
                  className="relative group flex-shrink-0 cursor-pointer"
                  onClick={() => handleTogglePlay(song)}
                >
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black border-2 border-black flex items-center justify-center shadow transition-transform duration-700 ${
                      isCurrentPlaying ? 'animate-spin' : 'group-hover:scale-105'
                    }`}
                    style={{ animationDuration: '4s' }}
                  >
                    {/* Inner Grooves */}
                    <div className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-white relative flex items-center justify-center bg-gray-900">
                        <img
                          src={song.coverUrl}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="w-1.5 h-1.5 rounded-full bg-white absolute" />
                      </div>
                    </div>
                  </div>

                  {/* Play Overlay */}
                  <button
                    type="button"
                    className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center shadow hover:scale-110 transition-transform"
                  >
                    {isCurrentPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Metadata & Progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Disc className={`w-3.5 h-3.5 text-black ${isCurrentPlaying ? 'animate-spin' : ''}`} />
                    <span className="font-hpChapter text-[10px] uppercase tracking-wider text-gray-500 font-bold truncate">
                      {song.album} ({song.year})
                    </span>
                  </div>

                  <h5 className="font-hpChapter font-bold text-sm sm:text-base text-black truncate tracking-wide">
                    {song.title}
                  </h5>
                  <p className="font-hpEngraved italic text-xs text-gray-700 mb-2 truncate">
                    {song.artist}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 border border-black overflow-hidden relative">
                      <div
                        className="h-full bg-black transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-600">
                      <span>{isCurrentPlaying ? formatTime(progress.current) : '0:00'}</span>
                      <span className="flex items-center gap-1">
                        {isCurrentPlaying && <Volume2 className="w-3 h-3 text-black animate-pulse" />}
                        {song.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
