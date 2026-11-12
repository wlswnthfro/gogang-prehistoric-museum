import React, { useState } from 'react';
import { GameId } from '../../types/game';
import { useGame } from '../../context/GameContext';
import {
  PotteryThumbnail,
  StoneKnifeThumbnail,
  EscapeRoomThumbnail,
  CustomBowThumbnail
} from './CuteThumbnails';
import { CuteGuideModal } from '../modals/CuteGuideModal';
import { CustomCodeModal } from '../games/CustomCodeModal';
import {
  Volume2,
  VolumeX,
  Maximize,
  Code2,
  Sparkles,
  Play,
  HelpCircle,
  Award
} from 'lucide-react';

interface CuteLobbyProps {
  onStartGame: (id: GameId) => void;
}

export const CuteLobby: React.FC<CuteLobbyProps> = ({ onStartGame }) => {
  const { soundEnabled, toggleSound, toggleFullscreen, stamps, playSound } = useGame();
  const [guideGameId, setGuideGameId] = useState<GameId | null>(null);
  const [codeSettingGameId, setCodeSettingGameId] = useState<GameId | null>(null);

  const gamesList: {
    id: GameId;
    title: string;
    badge: string;
    badgeColor: string;
    thumbnail: React.ReactNode;
  }[] = [
    {
      id: 'pottery-3d',
      title: '3D 토기 조각 맞추기',
      badge: '인기 1위',
      badgeColor: 'bg-[#EF4444]',
      thumbnail: <PotteryThumbnail />
    },
    {
      id: 'stone-knife',
      title: '반달돌칼 게임',
      badge: '추천!',
      badgeColor: 'bg-[#F59E0B]',
      thumbnail: <StoneKnifeThumbnail />
    },
    {
      id: 'escape-room',
      title: '방탈출 게임',
      badge: '미스터리',
      badgeColor: 'bg-[#EC4899]',
      thumbnail: <EscapeRoomThumbnail />
    },
    {
      id: 'custom-bow',
      title: '커스텀 활게임',
      badge: 'NEW',
      badgeColor: 'bg-[#10B981]',
      thumbnail: <CustomBowThumbnail />
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between max-w-6xl w-full mx-auto select-none p-2 sm:p-4">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between gap-3 bg-[#FFFDF9] px-4 py-3 rounded-3xl border-3 border-[#DECDB8] shadow-sm mb-4">
        {/* Cute Cartoon Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#FBBF24] flex items-center justify-center text-white text-2xl shadow-md border-2 border-[#C2410C]">
            🦕
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-jua tracking-tight text-[#C2410C] title-cartoon flex items-center gap-2">
              고강선사유적체험관
            </h1>
          </div>
        </div>

        {/* Top 4 Game Quick Pills (Single-line for tablet touch) */}
        <div className="hidden lg:flex items-center gap-2 bg-[#F7F1E5] p-1.5 rounded-2xl border-2 border-[#DECDB8]">
          {gamesList.map(g => (
            <button
              key={g.id}
              onClick={() => {
                playSound('click');
                onStartGame(g.id);
              }}
              className="px-3 py-1.5 text-xs font-bold font-jua rounded-xl text-[#543415] hover:bg-[#FFFDF9] hover:text-[#C2410C] transition-all cursor-pointer whitespace-nowrap"
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Right Tools (Sound, Fullscreen, Code Drop-in Slot) */}
        <div className="flex items-center gap-2">
          {/* Quick Code Slot Setting */}
          <button
            onClick={() => setCodeSettingGameId('pottery-3d')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#B45309] hover:bg-[#8D3B03] rounded-2xl transition-all shadow-xs cursor-pointer font-jua"
            title="준비해오신 코드 넣기"
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">내 코드 넣기</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-2xl bg-[#EFE6D5] text-[#543415] hover:bg-[#E2D5C0] transition-colors cursor-pointer"
            title={soundEnabled ? '효과음 켜짐' : '효과음 꺼짐'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-[#C2410C]" /> : <VolumeX className="w-5 h-5 text-stone-400" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-2xl bg-[#EFE6D5] text-[#543415] hover:bg-[#E2D5C0] transition-colors cursor-pointer"
            title="태블릿 전체화면"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main 4 Games Grid (Visible all at once on tablet screen!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 flex-1 items-stretch">
        {gamesList.map(game => {
          const isStamped = stamps[game.id];

          return (
            <div
              key={game.id}
              className="card-kids flex flex-col overflow-hidden relative group"
            >
              {/* Badge (NEW, 인기 1위 등) */}
              <div className="absolute top-3 left-3 z-20">
                <span className={`px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold font-jua shadow-sm ${game.badgeColor}`}>
                  {game.badge}
                </span>
              </div>

              {/* Completed Stamp */}
              {isStamped && (
                <div className="absolute top-3 right-3 z-20 bg-[#16A34A] text-white px-2 py-0.5 rounded-full text-[10px] font-bold font-jua shadow-sm flex items-center gap-1">
                  ✓ 완료
                </div>
              )}

              {/* Thumbnail Illustration Area */}
              <div
                onClick={() => onStartGame(game.id)}
                className="h-44 sm:h-48 w-full border-b-3 border-[#DECDB8] cursor-pointer"
              >
                {game.thumbnail}
              </div>

              {/* Card Footer: Title & Wooden Buttons */}
              <div className="p-3.5 bg-[#FFFDF9] flex-1 flex flex-col justify-between items-center text-center">
                <h3 className="text-lg font-bold font-jua text-[#3C2E22] group-hover:text-[#C2410C] transition-colors my-1">
                  {game.title}
                </h3>

                {/* Stacked Wooden Buttons (Like in the reference flash game screenshot!) */}
                <div className="w-full space-y-2 mt-2">
                  <button
                    onClick={() => onStartGame(game.id)}
                    className="w-full py-2.5 text-base text-white btn-wood rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>게임시작</span>
                  </button>

                  <button
                    onClick={() => setGuideGameId(game.id)}
                    className="w-full py-1.5 text-xs text-[#FFF9E6] btn-wood rounded-xl opacity-90 hover:opacity-100 active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>게임방법</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Modal */}
      <CuteGuideModal
        gameId={guideGameId}
        onClose={() => setGuideGameId(null)}
        onStartGame={id => {
          setGuideGameId(null);
          onStartGame(id);
        }}
      />

      {/* Code Insertion Modal */}
      {codeSettingGameId && (
        <CustomCodeModal
          gameId={codeSettingGameId}
          isOpen={true}
          onClose={() => setCodeSettingGameId(null)}
        />
      )}
    </div>
  );
};
