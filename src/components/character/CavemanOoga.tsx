import React, { useState, useEffect } from 'react';

interface CavemanOogaProps {
  bubblePosition?: 'left' | 'right' | 'top';
  isWalking?: boolean;
  className?: string;
}

export const CavemanOoga: React.FC<CavemanOogaProps> = ({
  bubblePosition = 'top',
  isWalking = true,
  className = ''
}) => {
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const [imgError, setImgError] = useState<boolean>(false);

  // 3-second cycle for the speech bubble
  useEffect(() => {
    const timer = setInterval(() => {
      setShowBubble(prev => !prev);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`select-none pointer-events-none flex flex-col items-center ${
        isWalking ? 'animate-caveman-patrol' : 'relative'
      } ${className}`}
    >
      {/* 1. Speech bubble: Centered above the caveman so it is never reversed or clipped */}
      <div
        className={`transition-all duration-300 transform mb-1 z-30 ${
          showBubble
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-75 translate-y-2'
        }`}
      >
        <div className="bubble-speech-top px-3 py-1 text-xs whitespace-nowrap shadow-md">
          <span className="font-extrabold tracking-tight text-[#451A03]">우가우가!</span>
        </div>
      </div>

      {/* 2. Walking & Direction-Turning Caveman Container */}
      <div className={`relative flex items-end ${isWalking ? 'animate-caveman-turn' : ''}`}>
        {/* Step Waddling wrapper */}
        <div className={`relative flex items-end ${isWalking ? 'animate-caveman-step' : ''}`}>
          {/* Background Prehistoric Bush */}
          <div className="absolute -bottom-1 -left-2 -right-2 z-0 pointer-events-none opacity-90">
            <svg viewBox="0 0 120 50" className="w-full h-8 drop-shadow-xs">
              <path
                d="M 5 45 C 5 22, 24 12, 45 18 C 55 8, 75 8, 85 18 C 96 12, 115 22, 115 45 Z"
                fill="#5B8E3D"
                stroke="#2C3E50"
                strokeWidth="2.5"
              />
              <path
                d="M 18 45 C 22 28, 38 22, 52 28 C 60 18, 78 18, 86 28 C 98 26, 106 32, 108 45 Z"
                fill="#74AC4C"
              />
            </svg>
          </div>

          {/* The Caveman Figure */}
          <div className="relative z-10">
            {!imgError ? (
              <img
                src="/assets/aistudio/image_f60b75ee.png"
                alt="우가우가 원시인"
                onError={() => setImgError(true)}
                className="w-24 sm:w-28 h-24 sm:h-28 object-contain drop-shadow-md select-none"
              />
            ) : (
              /* Cute SVG Caveman Fallback holding a wooden club */
              <div className="w-24 sm:w-28 h-24 sm:h-28 flex items-center justify-center">
                <svg width="80" height="90" viewBox="0 0 100 110" className="drop-shadow-md">
                  {/* Wooden Club */}
                  <path
                    d="M 18 30 C 14 20, 26 12, 34 22 L 32 65 C 32 70, 24 70, 24 65 Z"
                    fill="#854D0E"
                    stroke="#451A03"
                    strokeWidth="2.5"
                  />
                  {/* Body / Leopard Pelt */}
                  <path
                    d="M 35 55 L 75 55 L 70 95 L 35 95 Z"
                    fill="#A16207"
                    stroke="#451A03"
                    strokeWidth="2.5"
                  />
                  <circle cx="45" cy="70" r="2.5" fill="#451A03" />
                  <circle cx="62" cy="78" r="2.5" fill="#451A03" />
                  {/* Legs */}
                  <rect x="42" y="94" width="8" height="12" fill="#FBBF24" stroke="#451A03" strokeWidth="2" rx="3" />
                  <rect x="58" y="94" width="8" height="12" fill="#FBBF24" stroke="#451A03" strokeWidth="2" rx="3" />
                  {/* Head & Wild Beard */}
                  <path
                    d="M 30 45 C 25 20, 75 15, 80 45 C 85 70, 65 75, 55 75 C 45 75, 25 70, 30 45 Z"
                    fill="#5C381E"
                    stroke="#2C180B"
                    strokeWidth="2.5"
                  />
                  {/* Face */}
                  <ellipse cx="55" cy="46" rx="14" ry="11" fill="#FBBF24" />
                  {/* Eyes */}
                  <circle cx="50" cy="44" r="2.5" fill="#2C180B" />
                  <circle cx="60" cy="44" r="2.5" fill="#2C180B" />
                  {/* Big Nose */}
                  <ellipse cx="55" cy="49" rx="3" ry="2" fill="#B45309" />
                  {/* Mouth */}
                  <path d="M 52 54 Q 55 58 58 54" fill="none" stroke="#2C180B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>

          {/* Foreground Grass Tuft around feet */}
          <div className="absolute -bottom-1 -left-2 -right-2 z-20 pointer-events-none">
            <svg viewBox="0 0 120 40" className="w-full h-7 drop-shadow-xs">
              <path
                d="M 5 38 
                   C 10 22, 14 12, 20 8
                   C 23 16, 26 26, 32 38
                   C 36 24, 40 14, 46 12
                   C 50 18, 54 28, 58 38
                   C 62 20, 68 8, 76 6
                   C 80 18, 84 28, 88 38
                   C 92 24, 98 14, 104 12
                   C 108 20, 112 28, 116 38
                   Z"
                fill="#A3D487"
                stroke="#2C3E50"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <path
                d="M 15 38
                   C 20 26, 24 18, 28 16
                   C 32 22, 34 30, 38 38
                   C 44 26, 48 18, 54 16
                   C 58 22, 60 30, 66 38
                   C 72 26, 76 16, 82 14
                   C 86 22, 90 30, 96 38
                   C 100 28, 104 20, 108 18
                   Z"
                fill="#86BD64"
                stroke="#2C3E50"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="18" r="2.5" fill="#FACC15" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
