import React from 'react';
import { PlantRow1, PlantRow2, PlantRow3 } from '../character/PrehistoricPlants';

// 1. 토기 조각 맞추기 썸네일 (빗살무늬토기 복원)
export const PotteryThumbnail: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#FFE8D1] via-[#FBD7B0] to-[#E9B889] select-none rounded-xl">
    {/* Floating puzzle tag */}
    <div className="absolute top-2 right-2 bg-[#D97706] text-white px-2 py-0.5 rounded-full border border-[#8B3E03] shadow-xs z-10">
      <span className="text-[10px] font-bold font-round">조각 맞추기</span>
    </div>

    {/* Subtle decorative circles */}
    <div className="absolute top-2.5 left-3 w-2 h-2 rounded-full bg-white/70" />
    <div className="absolute bottom-3 left-4 w-1.5 h-1.5 rounded-full bg-white/60" />
    <div className="absolute bottom-2 right-4 w-2.5 h-2.5 rounded-full bg-amber-400/50" />

    {/* Cute Pottery SVG with comb-pattern (빗살무늬) */}
    <div className="relative flex flex-col items-center justify-center z-10 w-full h-full p-2">
      <svg className="w-24 sm:w-32 md:w-40 lg:w-44 max-h-[80%] h-auto drop-shadow-md" viewBox="0 0 120 110">
        <path
          d="M 22 25 Q 60 20 98 25 L 82 82 Q 60 105 38 82 Z"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <line x1="30" y1="36" x2="90" y2="36" stroke="#92400E" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="36" y1="46" x2="84" y2="46" stroke="#92400E" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="42" y1="56" x2="78" y2="56" stroke="#92400E" strokeWidth="2" strokeDasharray="3 2" />

        <circle cx="48" cy="65" r="4" fill="#451A03" />
        <circle cx="72" cy="65" r="4" fill="#451A03" />
        <circle cx="46.5" cy="63.5" r="1.3" fill="#FFF" />
        <circle cx="70.5" cy="63.5" r="1.3" fill="#FFF" />
        <ellipse cx="40" cy="70" rx="3.5" ry="2" fill="#F87171" opacity="0.8" />
        <ellipse cx="80" cy="70" rx="3.5" ry="2" fill="#F87171" opacity="0.8" />
        <path d="M 54 70 Q 60 75 66 70" fill="none" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>

    {/* Subtle overlay vignette */}
    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
  </div>
);

// 2. 진짜유물 가짜 유물 찾기 썸네일
export const RealVsFakeRelicThumbnail: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#E0E7FF] via-[#C7D2FE] to-[#818CF8]/30 select-none rounded-2xl">
    <div className="absolute top-2 left-2 bg-[#4F46E5] text-white px-2 py-0.5 rounded-full shadow-xs z-10">
      <span className="text-[10px] font-bold font-round">유물 관찰</span>
    </div>

    <div className="absolute top-2 right-2 text-indigo-600">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>

    <div className="relative flex items-center justify-center gap-3 z-10">
      <div className="flex flex-col items-center">
        <div className="w-11 h-13 rounded-b-xl bg-[#D97706] border-2 border-[#78350F] flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
          진짜
        </div>
        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-extrabold mt-1 shadow-xs">
          O
        </div>
      </div>

      <span className="text-sm font-extrabold text-[#4F46E5] font-round">VS</span>

      <div className="flex flex-col items-center">
        <div className="w-11 h-13 rounded-b-lg bg-sky-200 border-2 border-sky-400 flex items-center justify-center text-sky-800 text-[11px] font-bold shadow-xs">
          가짜
        </div>
        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-extrabold mt-1 shadow-xs">
          X
        </div>
      </div>
    </div>
  </div>
);

// 3. 벼 수확하기게임 (반달돌칼) 썸네일 -> 1이미지 적용!
export const StoneKnifeThumbnail: React.FC = () => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#29221C] select-none rounded-xl group">
      {!imgError ? (
        <img
          src="/assets/thumbnails/rice_harvest_game.png"
          alt="벼 수확하기 게임"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      ) : (
        /* Cute Stone Knife SVG Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FEF3C7] to-[#F59E0B]/30">
          <svg width="105" height="65" viewBox="0 0 130 80" className="drop-shadow-md">
            <path
              d="M 12 55 Q 65 10 118 55 Q 65 40 12 55 Z"
              fill="#78716C"
              stroke="#44403C"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 12 55 Q 65 40 118 55" fill="none" stroke="#E7E5E4" strokeWidth="2.5" />
            <circle cx="50" cy="35" r="4.5" fill="#292524" stroke="#A8A29E" strokeWidth="1.8" />
            <circle cx="80" cy="35" r="4.5" fill="#292524" stroke="#A8A29E" strokeWidth="1.8" />
            <path d="M 50 35 Q 65 20 80 35" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Subtle overlay vignette for crisp card border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
    </div>
  );
};

// 4. 고강선사유적 기억 찾기 썸네일
export const MemoryMatchThumbnail: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#CFFAFE] via-[#A5F3FC] to-[#06B6D4]/30 select-none rounded-xl">
    <div className="absolute top-2 right-2 bg-[#0891B2] text-white px-2 py-0.5 rounded-full shadow-xs z-10">
      <span className="text-[10px] font-bold font-round">기억 카드</span>
    </div>

    <div className="flex items-center gap-2 z-10">
      <div className="w-10 h-14 rounded-xl bg-white border-2 border-[#0891B2] flex items-center justify-center shadow-md rotate-[-8deg] p-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#D97706" stroke="#78350F" strokeWidth="1.5">
          <path d="M5 5h14l-2 13a4 4 0 0 1-4 3h-2a4 4 0 0 1-4-3L5 5z" />
          <line x1="7" y1="9" x2="17" y2="9" stroke="#78350F" strokeWidth="1" />
        </svg>
      </div>
      <div className="w-10 h-14 rounded-xl bg-white border-2 border-[#0891B2] flex items-center justify-center shadow-md rotate-[8deg] p-1.5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#D97706" stroke="#78350F" strokeWidth="1.5">
          <path d="M5 5h14l-2 13a4 4 0 0 1-4 3h-2a4 4 0 0 1-4-3L5 5z" />
          <line x1="7" y1="9" x2="17" y2="9" stroke="#78350F" strokeWidth="1" />
        </svg>
      </div>
    </div>
  </div>
);

// 5. 방탈출게임 썸네일 -> 3이미지 적용!
export const EscapeRoomThumbnail: React.FC = () => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#241A16] select-none rounded-xl group">
      {!imgError ? (
        <img
          src="/assets/thumbnails/escape_room_game.png"
          alt="선사시대 방탈출"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      ) : (
        /* Cute Umjip SVG Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFE4E6] to-[#F43F5E]/20">
          <PlantRow3 height={30} />
        </div>
      )}

      {/* Subtle overlay vignette for crisp card border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
    </div>
  );
};

// 6. 커스텀 활게임 썸네일 -> 2이미지 적용!
export const CustomBowThumbnail: React.FC = () => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#1B2C1C] select-none rounded-xl group">
      {!imgError ? (
        <img
          src="/assets/thumbnails/custom_bow_game.png"
          alt="커스텀 활게임"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      ) : (
        /* Archery Target & Bow SVG Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#DCFCE7] to-[#22C55E]/20">
          <PlantRow2 height={28} />
        </div>
      )}

      {/* Subtle overlay vignette for crisp card border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
    </div>
  );
};

// 7. 신석기 움집 짓기 썸네일
export const UmjipBuilderThumbnail: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#D97706]/30 select-none rounded-xl">
    <div className="absolute top-2 right-2 bg-[#D97706] text-white px-2 py-0.5 rounded-full shadow-xs z-10">
      <span className="text-[10px] font-bold font-round">움집 짓기</span>
    </div>

    <div className="flex flex-col items-center z-10">
      <svg width="80" height="65" viewBox="0 0 100 80" className="drop-shadow-md">
        {/* Thatched roof */}
        <polygon points="50,10 10,70 90,70" fill="#B45309" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
        <line x1="50" y1="10" x2="30" y2="70" stroke="#78350F" strokeWidth="2" />
        <line x1="50" y1="10" x2="70" y2="70" stroke="#78350F" strokeWidth="2" />
        {/* Doorway */}
        <path d="M 42 70 L 42 45 Q 50 40 58 45 L 58 70 Z" fill="#292524" />
        {/* Fire glow in doorway */}
        <circle cx="50" cy="58" r="4" fill="#F97316" />
        {/* Cute smoke */}
        <circle cx="50" cy="6" r="2.5" fill="#E2E8F0" opacity="0.8" />
        <circle cx="54" cy="2" r="3.5" fill="#E2E8F0" opacity="0.6" />
      </svg>
    </div>

    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
  </div>
);

// 8. 선사 암각화 그리기 썸네일
export const RockArtThumbnail: React.FC = () => (
  <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] select-none rounded-xl">
    <div className="absolute top-2 right-2 bg-[#64748B] text-white px-2 py-0.5 rounded-full shadow-xs z-10">
      <span className="text-[10px] font-bold font-round">바위 그림</span>
    </div>

    <div className="flex items-center justify-center z-10">
      <svg width="85" height="65" viewBox="0 0 110 80" className="drop-shadow-md">
        {/* Rock texture */}
        <rect x="5" y="8" width="100" height="64" rx="10" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
        {/* Ochre deer/animal petroglyph */}
        <path
          d="M 30 35 Q 45 35 60 40 L 70 30 L 65 25 M 70 30 L 75 24 M 60 40 L 62 58 M 38 40 L 35 58 M 30 35 L 22 28"
          fill="none"
          stroke="#DC2626"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Spiral sun symbol */}
        <circle cx="85" cy="25" r="7" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 2" />
      </svg>
    </div>

    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
  </div>
);
