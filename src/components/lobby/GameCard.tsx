import React from 'react';
import { GameMetadata } from '../../types/game';
import { useGame } from '../../context/GameContext';
import { Play, CheckCircle2, Code2, Sparkles } from 'lucide-react';

interface GameCardProps {
  game: GameMetadata;
  onOpenCodeSettings: (id: GameMetadata['id']) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onOpenCodeSettings }) => {
  const { setActiveTab, stamps, customConfigs } = useGame();
  const hasCompleted = stamps[game.id];
  const isCustomCode = customConfigs[game.id]?.sourceType !== 'built-in';

  // Aesthetic SVG thumbnail rendering for prehistoric relics
  const renderRelicGraphic = () => {
    switch (game.id) {
      case 'pottery-3d':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#F3EAE0] to-[#E3D3C1] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
              {/* Comb-pattern Pottery (빗살무늬토기) */}
              <path
                d="M 25 25 L 75 25 L 50 85 Z"
                fill="#C48247"
                stroke="#8A5123"
                strokeWidth="2.5"
              />
              {/* Incised chevron pattern lines */}
              <line x1="30" y1="35" x2="70" y2="35" stroke="#7A4215" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="34" y1="45" x2="66" y2="45" stroke="#7A4215" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="38" y1="55" x2="62" y2="55" stroke="#7A4215" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="42" y1="65" x2="58" y2="65" stroke="#7A4215" strokeWidth="1.5" strokeDasharray="3 2" />
              {/* Pointy base highlight */}
              <circle cx="50" cy="85" r="3" fill="#6B330B" />
            </svg>
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-[#8A5123] bg-white/80 px-2 py-0.5 rounded-md border border-[#D5C2AF]">
              3D Interactive
            </span>
          </div>
        );
      case 'stone-knife':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#F4EFE6] to-[#E5DEC\-D] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <svg width="130" height="80" viewBox="0 0 110 60" className="drop-shadow-md">
              {/* Crescent Stone Knife */}
              <path
                d="M 10 45 Q 55 10 100 45 Q 55 35 10 45 Z"
                fill="#786F62"
                stroke="#474138"
                strokeWidth="2"
              />
              <path d="M 10 45 Q 55 35 100 45" fill="none" stroke="#D1C7B7" strokeWidth="2.5" />
              <circle cx="42" cy="28" r="4" fill="#2E2A24" stroke="#B8A894" strokeWidth="1.5" />
              <circle cx="68" cy="28" r="4" fill="#2E2A24" stroke="#B8A894" strokeWidth="1.5" />
              <path d="M 42 28 Q 55 18 68 28" fill="none" stroke="#C49A54" strokeWidth="2" strokeDasharray="2 1" />
            </svg>
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-[#7A6348] bg-white/80 px-2 py-0.5 rounded-md border border-[#D5C2AF]">
              수확 리듬 게임
            </span>
          </div>
        );
      case 'escape-room':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#332A22] to-[#211A14] relative overflow-hidden group-hover:scale-105 transition-transform duration-300 text-amber-200">
            <svg width="120" height="90" viewBox="0 0 100 80" className="drop-shadow-lg">
              {/* Prehistoric Pit House (움집) */}
              <polygon points="50,15 15,65 85,65" fill="#5E4C3E" stroke="#3D3025" strokeWidth="2" />
              {/* Pit House Thatch Lines */}
              <line x1="50" y1="15" x2="30" y2="65" stroke="#7A6453" strokeWidth="1.5" />
              <line x1="50" y1="15" x2="70" y2="65" stroke="#7A6453" strokeWidth="1.5" />
              {/* Door opening with glowing fire */}
              <polygon points="50,42 40,65 60,65" fill="#1C150F" />
              <circle cx="50" cy="58" r="5" fill="#E65100" />
              <circle cx="50" cy="58" r="2.5" fill="#FFD54F" />
            </svg>
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-md border border-white/20">
              미스터리 방탈출
            </span>
          </div>
        );
      case 'custom-bow':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#F2EFE8] to-[#DCE5DF] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <svg width="130" height="90" viewBox="0 0 100 80" className="drop-shadow-md">
              {/* Wooden Bow & Stone Arrow */}
              <path d="M 20 65 Q 50 15 80 65" fill="none" stroke="#2D6A4F" strokeWidth="5" strokeLinecap="round" />
              <line x1="20" y1="65" x2="80" y2="65" stroke="#854D0E" strokeWidth="2" />
              <line x1="50" y1="65" x2="50" y2="25" stroke="#44403C" strokeWidth="2" />
              <polygon points="50,15 45,28 55,28" fill="#78716C" />
            </svg>
            <span className="absolute bottom-2 right-2 text-[10px] font-bold text-[#2D6A4F] bg-white/80 px-2 py-0.5 rounded-md border border-[#BAD5C6]">
              활 커스텀 & 사격
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAF7F2] rounded-2xl border border-[#E3D9C8] hover:border-[#BA9A7C] transition-all flex flex-col overflow-hidden shadow-xs hover:shadow-md group">
      {/* Top Graphic Showcase */}
      <div className="h-44 w-full relative overflow-hidden border-b border-[#E3D9C8]">
        {renderRelicGraphic()}

        {/* Era Tag */}
        <div className="absolute top-2.5 left-2.5 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#594635] text-[10px] font-bold px-2 py-1 rounded-md border border-[#D8C7B4]">
          {game.era}
        </div>

        {/* Stamp or Custom Code Badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
          {isCustomCode && (
            <span className="bg-[#B45309] text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Code2 className="w-3 h-3" /> 내 코드 연동됨
            </span>
          )}
          {hasCompleted && (
            <span className="bg-[#D1E7DD] text-[#0F5132] border border-[#BADBCC] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#0F5132]" /> 스탬프 완료
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-[#2C241D] group-hover:text-[#B45309] transition-colors font-serif-kr">
              {game.title}
            </h3>
            <span className="text-[11px] font-medium text-[#8C765F]">
              {game.difficulty}
            </span>
          </div>

          <p className="text-xs text-[#6B5A49] line-clamp-2 leading-relaxed mb-3">
            {game.shortDesc}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {game.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] text-[#786653] bg-[#F2EAE0] px-2 py-0.5 rounded-md border border-[#E3D7C7]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#EDE4D5]">
          <button
            onClick={() => setActiveTab(game.id)}
            className="flex-1 py-2.5 px-3 bg-[#B45309] hover:bg-[#974204] active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>체험 시작하기</span>
          </button>

          <button
            onClick={() => onOpenCodeSettings(game.id)}
            className="p-2.5 text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl border border-[#D8C7B4] transition-colors"
            title="이 게임 슬롯에 내 코드 넣기"
          >
            <Code2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
