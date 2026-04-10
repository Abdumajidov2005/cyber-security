import React, { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, Settings
} from 'lucide-react';
import { usePlayer } from '../../hooks/usePlayer';
import { formatDuration } from '../../utils/formatDuration';
import { cn } from '../../utils/cn';

export function VideoPlayer({ lesson, onComplete }) {
  const {
    videoRef, isPlaying, currentTime, duration, volume,
    isMuted, isFullscreen, progress, buffered,
    togglePlay, seek, changeVolume, toggleMute, toggleFullscreen,
  } = usePlayer();

  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showCompletedAnim, setShowCompletedAnim] = useState(false);
  const controlsTimer = useRef(null);
  const progressRef = useRef(null);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(controlsTimer.current);
  }, [isPlaying, currentTime]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    if (isPlaying) {
      controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  // Lesson complete detection
  useEffect(() => {
    if (duration > 0 && currentTime >= duration - 0.5 && !completed) {
      setCompleted(true);
      setShowCompletedAnim(true);
      onComplete?.();
      setTimeout(() => setShowCompletedAnim(false), 3000);
    }
  }, [currentTime, duration, completed, onComplete]);

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  const bufferedPercent = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      className="relative bg-black w-full aspect-video group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element — using a placeholder since no real video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        playsInline
      />

      {/* Placeholder when no video src */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface to-bg cursor-pointer"
        onClick={togglePlay}
      >
        <div className="font-display text-4xl text-white/10 tracking-widest text-center px-8">
          {lesson?.title}
        </div>
        <div className="mt-4 text-muted text-xs uppercase tracking-widest">
          Demo Video Player
        </div>
      </div>

      {/* Play/Pause center button */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300',
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        )}
      >
        <button
          className="pointer-events-auto w-16 h-16 border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group/btn"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause size={20} className="text-text group-hover/btn:text-accent transition-colors" />
          ) : (
            <Play size={20} className="text-text group-hover/btn:text-accent transition-colors ml-1" />
          )}
        </button>
      </div>

      {/* Lesson complete overlay */}
      {showCompletedAnim && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <div className="text-center">
            <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto mb-4">
              <circle cx="30" cy="30" r="28" fill="none" stroke="#c8b97a" strokeWidth="1.5" />
              <path
                d="M18 30 L26 38 L42 22"
                fill="none"
                stroke="#c8b97a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset="0"
                style={{ animation: 'drawCheck 0.6s ease forwards' }}
              />
            </svg>
            <p className="font-display text-xl tracking-widest text-accent">DARS TUGADI</p>
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 transition-opacity duration-300',
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="relative h-1 bg-white/10 cursor-pointer mb-3 group/progress"
          onClick={handleProgressClick}
        >
          {/* Buffered */}
          <div
            className="absolute inset-y-0 left-0 bg-white/20"
            style={{ width: `${bufferedPercent}%` }}
          />
          {/* Progress */}
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-none"
            style={{ width: `${progress}%` }}
          />
          {/* Scrubber */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
            style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="text-text hover:text-accent transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={() => seek(Math.max(0, currentTime - 10))}
            className="text-muted hover:text-text transition-colors"
          >
            <SkipBack size={14} />
          </button>
          <button
            onClick={() => seek(Math.min(duration, currentTime + 10))}
            className="text-muted hover:text-text transition-colors"
          >
            <SkipForward size={14} />
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-muted hover:text-text transition-colors">
              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-16 h-1 accent-accent"
            />
          </div>

          {/* Time */}
          <span className="text-muted text-xs ml-1">
            {formatDuration(currentTime)} / {formatDuration(duration || 0)}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button className="text-muted hover:text-text transition-colors">
              <Settings size={14} />
            </button>
            <button onClick={toggleFullscreen} className="text-muted hover:text-text transition-colors">
              {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
