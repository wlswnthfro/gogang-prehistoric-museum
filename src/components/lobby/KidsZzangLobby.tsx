import React, { useState, useRef, useEffect } from 'react';
import { GameId } from '../../types/game';
import { useGame } from '../../context/GameContext';
import {
  PotteryThumbnail,
  RealVsFakeRelicThumbnail,
  StoneKnifeThumbnail,
  MemoryMatchThumbnail,
  EscapeRoomThumbnail,
  CustomBowThumbnail,
  UmjipBuilderThumbnail,
  RockArtThumbnail
} from './CuteThumbnails';
import { CavemanOoga } from '../character/CavemanOoga';
import { GrassLandscape } from '../character/GrassLandscape';
import { GamePlayView } from '../gameplay/GamePlayView';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

// SVG Cloud Component (No emojis!)
const VectorCloud: React.FC<{ className?: string; width?: number; height?: number; opacity?: number }> = ({
  className = '',
  width = 54,
  height = 32,
  opacity = 0.8
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 40"
    fill="none"
    className={`pointer-events-none select-none drop-shadow-xs ${className}`}
    style={{ opacity }}
  >
    <path
      d="M 18 36 L 46 36 C 54 36 60 30 60 22 C 60 15 54 10 48 10 C 47 10 45 10 44 11 C 41 5 34 2 27 2 C 18 2 11 8 10 16 C 4 17 0 22 0 28 C 0 33 5 36 12 36 Z"
      fill="#FFFFFF"
    />
  </svg>
);

interface KidsZzangLobbyProps {
  onStartGame?: (id: GameId) => void;
  onOpenStampModal?: () => void;
}

interface GameCardItem {
  id: GameId;
  title: string;
  badge: string;
  badgeColor: string;
  thumbnail: React.ReactNode;
}

export const KidsZzangLobby: React.FC<KidsZzangLobbyProps> = ({ onStartGame }) => {
  const { playSound } = useGame();

  // Currently Playing Game ID (null = showing the 4-card horizontal lobby)
  const [playingGameId, setPlayingGameId] = useState<GameId | null>(null);

  // Active page for the 4-games view (0-indexed: Page 1 = 0, Page 2 = 1)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 8 Prehistoric Games arranged in 2 pages of 4 games each
  const allGameCards: GameCardItem[] = [
    // Page 1 (The 4 core games requested by user)
    {
      id: 'pottery-3d',
      title: '토기 조각 맞추기',
      badge: '인기 1위',
      badgeColor: 'bg-[#EA580C]',
      thumbnail: <PotteryThumbnail />
    },
    {
      id: 'stone-knife',
      title: '벼 수확하기게임',
      badge: '추천!',
      badgeColor: 'bg-[#D97706]',
      thumbnail: <StoneKnifeThumbnail />
    },
    {
      id: 'escape-room',
      title: '방탈출게임',
      badge: '미스터리',
      badgeColor: 'bg-[#E11D48]',
      thumbnail: <EscapeRoomThumbnail />
    },
    {
      id: 'custom-bow',
      title: '커스텀 활게임',
      badge: '도전!',
      badgeColor: 'bg-[#16A34A]',
      thumbnail: <CustomBowThumbnail />
    },
    // Page 2 (Scrolled/flipped horizontally: 4 additional games)
    {
      id: 'pottery-3d',
      title: '진짜유물 가짜 유물 찾기',
      badge: '탐구!',
      badgeColor: 'bg-[#4F46E5]',
      thumbnail: <RealVsFakeRelicThumbnail />
    },
    {
      id: 'escape-room',
      title: '고강선사유적 기억 찾기',
      badge: '기억력!',
      badgeColor: 'bg-[#0891B2]',
      thumbnail: <MemoryMatchThumbnail />
    },
    {
      id: 'stone-knife',
      title: '신석기 움집 짓기',
      badge: '체험!',
      badgeColor: 'bg-[#B45309]',
      thumbnail: <UmjipBuilderThumbnail />
    },
    {
      id: 'custom-bow',
      title: '선사 암각화 그리기',
      badge: '창작!',
      badgeColor: 'bg-[#64748B]',
      thumbnail: <RockArtThumbnail />
    }
  ];

  // Group games into pages of 4
  const pageSize = 4;
  const totalPages = Math.ceil(allGameCards.length / pageSize);
  const pages: GameCardItem[][] = [];
  for (let i = 0; i < allGameCards.length; i += pageSize) {
    pages.push(allGameCards.slice(i, i + pageSize));
  }

  // Handle manual or automatic scrolling updates
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth > 0) {
      const pageIndex = Math.round(scrollLeft / clientWidth);
      if (pageIndex !== currentPage && pageIndex >= 0 && pageIndex < totalPages) {
        setCurrentPage(pageIndex);
      }
    }
  };

  const scrollToPage = (pageIndex: number) => {
    playSound('click');
    if (!scrollContainerRef.current) return;
    const targetLeft = pageIndex * scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
    setCurrentPage(pageIndex);
  };

  const handleTitleClick = () => {
    playSound('click');
    setPlayingGameId(null);
    scrollToPage(0);
  };

  const handleCardClick = (gameId: GameId) => {
    playSound('click');
    setPlayingGameId(gameId);
    if (onStartGame) {
      onStartGame(gameId);
    }
  };

  // Re-sync scroll on resize
  useEffect(() => {
    const handleResize = () => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.scrollTo({
        left: currentPage * scrollContainerRef.current.clientWidth,
        behavior: 'instant' as ScrollBehavior
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage]);

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden flex flex-col bg-[#F7F3EB] select-none relative font-round">
      {/* 1. Playful Top Header Bar (No sidebar!) */}
      <header className="w-full bg-[#FFFDF9] border-b-2 border-[#E5D7C3] px-3 sm:px-6 py-2.5 flex items-center justify-between z-30 shrink-0 shadow-xs">
        {/* Title: Clickable to return to beginning / Page 1 */}
        <div
          onClick={handleTitleClick}
          className="flex items-center gap-2.5 cursor-pointer group select-none transition-transform active:scale-95"
          title="처음으로 돌아가기 (1페이지)"
        >
          {/* Cute Umjip/House Icon Badge */}
          <div className="w-9 h-9 rounded-xl bg-[#F59E0B] border-2 border-[#78350F] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-[#5C3212] group-hover:text-[#C2410C] transition-colors leading-tight flex items-center gap-1.5">
              <span>고강선사유적체험관</span>
              <span className="text-[#C2410C] group-hover:underline">게임</span>
            </h1>
            <span className="text-[11px] text-[#8C6239] font-bold hidden sm:inline">
              부천 고강동 선사유적지 인터랙티브 놀이터
            </span>
          </div>
        </div>

        {/* Right Controls: Carousel navigation & Page indicator (when in lobby mode) */}
        {!playingGameId && (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs text-[#8C6239] font-bold hidden md:inline">
              옆으로 넘겨서 다른 게임 확인하기
            </span>

            {/* Left Page Arrow */}
            <button
              onClick={() => scrollToPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed bg-[#EAE0D2] text-[#8C7A68]'
                  : 'btn-wood text-white shadow-xs active:scale-90 hover:brightness-105'
              }`}
              title="이전 게임 목록"
            >
              <ChevronLeft className="w-5 h-5 stroke-[3]" />
            </button>

            {/* Page Dots / Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE6D5] border border-[#DECDB8]">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToPage(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    currentPage === idx
                      ? 'w-5 h-2.5 bg-[#C2410C]'
                      : 'w-2.5 h-2.5 bg-[#BFAEA0] hover:bg-[#8C7A68]'
                  }`}
                  title={`${idx + 1} 페이지로 이동`}
                />
              ))}
            </div>

            {/* Right Page Arrow */}
            <button
              onClick={() => scrollToPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                currentPage === totalPages - 1
                  ? 'opacity-30 cursor-not-allowed bg-[#EAE0D2] text-[#8C7A68]'
                  : 'btn-wood text-white shadow-xs active:scale-90 hover:brightness-105'
              }`}
              title="다음 게임 목록"
            >
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}
      </header>

      {/* 2. Main Stage Surface */}
      <main className="flex-1 h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-[#EAF4FB] via-[#F7F4ED] to-[#EFE7D8]">
        {playingGameId ? (
          /* Game Playing Mode: Full width expansive game screen */
          <div className="w-full h-full p-2 sm:p-4 overflow-y-auto flex flex-col">
            <GamePlayView
              gameId={playingGameId}
              onBackToLobby={() => {
                playSound('click');
                setPlayingGameId(null);
              }}
            />
          </div>
        ) : (
          /* Lobby Mode: 4 Games visible at a time, horizontally scrollable, Caveman on left, Dinosaurs on grass */
          <div className="w-full h-full flex flex-col justify-between relative overflow-hidden">
            {/* Soft Floating Vector Clouds */}
            <VectorCloud className="absolute top-4 left-32 cloud-drift-1" width={68} height={40} opacity={0.8} />
            <VectorCloud className="absolute top-6 right-20 cloud-drift-2" width={80} height={46} opacity={0.85} />
            <VectorCloud className="absolute top-14 right-72 cloud-drift-3" width={52} height={30} opacity={0.7} />
            <VectorCloud className="absolute top-12 left-16 cloud-drift-4" width={54} height={32} opacity={0.65} />
            <VectorCloud className="absolute top-24 right-48 cloud-drift-5" width={42} height={26} opacity={0.6} />

            {/* Horizontal Scroll / Carousel Container for 4 cards per page */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 w-full flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth items-center z-10 my-auto pb-18 sm:pb-22"
            >
              {pages.map((pageGames, pageIdx) => (
                <div
                  key={pageIdx}
                  className="min-w-full w-full shrink-0 snap-center flex flex-col items-center justify-center px-3 sm:px-6 md:px-10 py-1"
                >
                  {/* 2x2 Grid of 4 Cards: Maximize size to fill the screen generously */}
                  <div className="grid grid-cols-2 gap-x-5 sm:gap-x-8 md:gap-x-12 lg:gap-x-14 gap-y-3 sm:gap-y-4 md:gap-y-6 w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl justify-center items-center">
                    {pageGames.map((card, cardIdx) => (
                      <div
                        key={cardIdx}
                        onClick={() => handleCardClick(card.id)}
                        className="flex flex-col items-center cursor-pointer group w-full"
                      >
                        {/* 1. Large Generous Card Thumbnail Box */}
                        <div
                          className="card-spacious w-full relative overflow-hidden flex items-center justify-center bg-[#FFFDF9] transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg h-36 sm:h-44 md:h-52 lg:h-56 xl:h-62"
                        >
                          <div className="w-full h-full flex items-center justify-center p-1 sm:p-2">
                            {card.thumbnail}
                          </div>

                          {/* Top Badge */}
                          <span
                            className={`absolute top-2.5 left-2.5 text-white text-xs sm:text-sm font-extrabold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs ${card.badgeColor}`}
                          >
                            {card.badge}
                          </span>
                        </div>

                        {/* 2. Bold Game Title in Cute Rounded Bounding Box Capsule */}
                        <div className="mt-2 sm:mt-3 title-capsule px-5 sm:px-8 py-1.5 sm:py-2 text-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-[#451A03] tracking-tight">
                            {card.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Left / Right Arrow Guides on Stage for extra clarity */}
            {currentPage > 0 && (
              <button
                onClick={() => scrollToPage(currentPage - 1)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-25 w-11 h-11 rounded-full btn-wood text-white flex items-center justify-center shadow-lg active:scale-90 cursor-pointer hidden md:flex hover:brightness-105"
                title="이전 4개 게임 보기"
              >
                <ChevronLeft className="w-7 h-7 stroke-[3]" />
              </button>
            )}

            {currentPage < totalPages - 1 && (
              <button
                onClick={() => scrollToPage(currentPage + 1)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-25 w-11 h-11 rounded-full btn-wood text-white flex items-center justify-center shadow-lg active:scale-90 cursor-pointer hidden md:flex hover:brightness-105"
                title="다음 게임 더 보기"
              >
                <ChevronRight className="w-7 h-7 stroke-[3]" />
              </button>
            )}

            {/* Bottom Prehistoric Ground with Grass Landscape & 3 Slowly Roaming Dinosaurs */}
            <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 z-20 pointer-events-none overflow-visible">
              <GrassLandscape />
            </div>

            {/* Walking Caveman ("원시인") strolling across the meadow */}
            <div className="absolute bottom-1 inset-x-0 h-24 sm:h-28 z-30 pointer-events-none overflow-visible">
              <CavemanOoga isWalking={true} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
