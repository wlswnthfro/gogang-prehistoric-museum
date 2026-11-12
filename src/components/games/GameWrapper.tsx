import React, { useState } from 'react';
import { GameId } from '../../types/game';
import { GAMES_DATA } from '../../data/games';
import { useGame } from '../../context/GameContext';
import { Pottery3DGame } from './Pottery3DGame';
import { StoneKnifeGame } from './StoneKnifeGame';
import { EscapeRoomGame } from './EscapeRoomGame';
import { CustomBowGame } from './CustomBowGame';
import { CustomCodeRunner } from './CustomCodeRunner';
import { CustomCodeModal } from './CustomCodeModal';
import { ArrowLeft, Code2, Maximize, Volume2, VolumeX, Sparkles, SlidersHorizontal, BookOpen } from 'lucide-react';

interface GameWrapperProps {
  gameId: GameId;
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ gameId }) => {
  const {
    setActiveTab,
    customConfigs,
    updateCustomConfig,
    toggleFullscreen,
    soundEnabled,
    toggleSound,
    stamps
  } = useGame();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const gameMeta = GAMES_DATA.find(g => g.id === gameId);
  const currentConfig = customConfigs[gameId];
  const isCustomMode = currentConfig?.sourceType !== 'built-in';
  const hasStamp = stamps[gameId];

  if (!gameMeta) return null;

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Game Stage Top Navigation Header */}
      <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E3D9C8] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Left: Return to Lobby + Game Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#4B3929] bg-[#EFE7D8] hover:bg-[#E3D8C6] active:scale-95 rounded-xl border border-[#D8C7B4] transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>로비로 돌아가기</span>
          </button>

          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-[#2C241D] font-serif-kr">
              {gameMeta.title}
            </h2>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium bg-[#E8DDD0] text-[#634E3C] rounded-md border border-[#D5C5B3]">
              {gameMeta.era}
            </span>
            {hasStamp && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E6F4EA] text-[#1E7E34] rounded-md border border-[#C3E6CB] flex items-center gap-1">
                ✓ 체험 스탬프 획득
              </span>
            )}
          </div>
        </div>

        {/* Right: Engine Mode Switcher & Tools */}
        <div className="flex items-center gap-2">
          {/* Quick Engine Switcher: Built-in vs Custom */}
          <div className="flex items-center p-0.5 bg-[#EFE8DC] rounded-xl border border-[#D8C7B4]">
            <button
              onClick={() => updateCustomConfig(gameId, { sourceType: 'built-in' })}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isCustomMode
                  ? 'bg-white text-[#B45309] shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241D]'
              }`}
            >
              기본 템플릿
            </button>
            <button
              onClick={() => updateCustomConfig(gameId, { sourceType: 'html-code' })}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isCustomMode
                  ? 'bg-white text-[#B45309] shadow-xs'
                  : 'text-[#6B5A4B] hover:text-[#2C241D]'
              }`}
            >
              내 코드 연동
            </button>
          </div>

          {/* Code Injector Drawer trigger */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#974204] rounded-xl transition-all shadow-xs"
            title="커스텀 코드 붙여넣기 및 설정"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">코드 연결 설정</span>
          </button>

          {/* Guide Modal Trigger */}
          <button
            onClick={() => setShowGuideModal(true)}
            className="p-2 text-xs text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl border border-[#D8C7B4] transition-colors"
            title="체험 안내 & 유물 정보"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 text-xs text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl border border-[#D8C7B4] transition-colors"
            title={soundEnabled ? '음소거' : '소리 켜기'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#B45309]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Fullscreen Kiosk Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-xs text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl border border-[#D8C7B4] transition-colors"
            title="태블릿 전체화면 모드"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Surface */}
      <div className="flex-1 w-full min-h-[560px]">
        {isCustomMode ? (
          <CustomCodeRunner
            gameId={gameId}
            config={currentConfig}
            onOpenEditor={() => setIsEditorOpen(true)}
          />
        ) : (
          <>
            {gameId === 'pottery-3d' && <Pottery3DGame />}
            {gameId === 'stone-knife' && <StoneKnifeGame />}
            {gameId === 'escape-room' && <EscapeRoomGame />}
            {gameId === 'custom-bow' && <CustomBowGame />}
          </>
        )}
      </div>

      {/* Code Settings Modal */}
      <CustomCodeModal
        gameId={gameId}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* Educational Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#D8C7B5] shadow-2xl max-w-lg w-full p-6 text-[#2C241D]">
            <h3 className="text-lg font-bold text-[#3B2C1F] mb-1 font-serif-kr">
              {gameMeta.title} 안내
            </h3>
            <p className="text-xs text-[#705D4A] mb-4">
              고강선사유적체험관 인터랙티브 체험 가이드
            </p>
            <div className="p-3.5 bg-[#F2ECE1] rounded-xl border border-[#D8C7B4] space-y-2 text-xs text-[#594635] mb-5">
              <div>
                <strong>시대 및 주요 유물:</strong> {gameMeta.era} · {gameMeta.relic}
              </div>
              <div>
                <strong>체험 설명:</strong> {gameMeta.description}
              </div>
              <div>
                <strong>추천 연령:</strong> {gameMeta.targetAge}
              </div>
            </div>
            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#B45309] hover:bg-[#974204] rounded-xl shadow-xs"
            >
              확인하고 체험 계속하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
