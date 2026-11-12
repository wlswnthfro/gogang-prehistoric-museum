import React from 'react';
import { CuteDinosaur } from './CuteDinosaur';

export const GrassLandscape: React.FC = () => {
  return (
    <div className="w-full h-16 sm:h-20 relative overflow-visible pointer-events-none select-none flex items-end">
      {/* 1. Prehistoric Dinosaurs Layer (Nestled in the landscape) */}
      <div className="absolute inset-x-0 bottom-0 h-full overflow-visible pointer-events-none z-10">
        {/* Dinosaur 1: Mother Sauropod (Green, roaming slowly mid-left) */}
        <div className="animate-dino-roam-1 bottom-1 drop-shadow-xs">
          <div className="animate-dino-step">
            <CuteDinosaur
              color="green"
              width={92}
              height={80}
              flipX={false}
            />
          </div>
        </div>

        {/* Dinosaur 2: Playful Baby Sauropod (Warm Amber, trotting center) */}
        <div className="animate-dino-roam-2 bottom-1 drop-shadow-xs">
          <div className="animate-dino-step">
            <CuteDinosaur
              color="amber"
              width={58}
              height={50}
              flipX={false}
            />
          </div>
        </div>

        {/* Dinosaur 3: Curious Mini Sauropod (Soft Periwinkle Blue, roaming right) */}
        <div className="animate-dino-roam-3 bottom-1 drop-shadow-xs">
          <div className="animate-dino-step">
            <CuteDinosaur
              color="blue"
              width={46}
              height={40}
              flipX={false}
            />
          </div>
        </div>
      </div>

      {/* 2. Ground baseline */}
      <div className="absolute bottom-0 inset-x-0 h-2 bg-[#D8C7B0] border-t-2 border-[#BFAEA0] z-20" />

      {/* 3. Foreground Cartoon Grass Blades (Overlapping dinosaur feet and baseline) */}
      <div className="w-full flex items-end justify-between -mb-0.5 px-0.5 z-25 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 200 65"
            className="h-8 sm:h-10 flex-1 max-w-[130px] drop-shadow-xs"
            preserveAspectRatio="none"
          >
            {/* Outer Grass Layer */}
            <path
              d="M 10 55 
                 C 15 35, 18 20, 24 14
                 C 26 22, 28 35, 34 50
                 C 38 35, 42 22, 46 20
                 C 50 28, 52 42, 58 52
                 C 62 38, 66 22, 70 20
                 C 74 30, 78 44, 82 52
                 C 86 32, 92 14, 98 12
                 C 102 24, 104 42, 108 52
                 C 112 34, 116 16, 122 14
                 C 126 26, 128 42, 134 52
                 C 138 36, 142 22, 148 20
                 C 152 30, 156 42, 162 52
                 C 166 32, 172 16, 178 14
                 C 182 28, 186 42, 192 55
                 Z"
              fill="#A3D487"
              stroke="#2C3E50"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Inner Darker Blades */}
            <path
              d="M 22 55 
                 C 28 40, 32 30, 38 28
                 C 42 36, 44 48, 50 55
                 C 56 42, 60 32, 68 30
                 C 72 38, 76 48, 84 55
                 C 90 42, 96 28, 104 26
                 C 108 36, 112 48, 118 55
                 C 124 40, 130 30, 138 28
                 C 142 38, 146 48, 154 55
                 C 160 40, 166 30, 174 28
                 C 178 38, 182 48, 188 55
                 Z"
              fill="#86BD64"
              stroke="#2C3E50"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};
