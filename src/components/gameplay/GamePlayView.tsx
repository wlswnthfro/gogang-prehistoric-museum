import React, { useState } from 'react';
import { GameId } from '../../types/game';
import { useGame } from '../../context/GameContext';
import { Pottery3DGame } from '../games/Pottery3DGame';
import { StoneKnifeGame } from '../games/StoneKnifeGame';
import { EscapeRoomGame } from '../games/EscapeRoomGame';
import { CustomBowGame } from '../games/CustomBowGame';
import { CustomCodeRunner } from '../games/CustomCodeRunner';
import { CustomCodeModal } from '../games/CustomCodeModal';
import { ArrowLeft, Code2 } from 'lucide-react';

interface GamePlayViewProps {
  gameId: GameId;
  onBackToLobby: () => void;
}

export const GamePlayView: React.FC<GamePlayViewProps> = ({
  gameId,
  onBackToLobby
}) => {
  const { customConfigs } = useGame();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const config = customConfigs[gameId];
  const isCustomMode = config?.sourceType !== 'built-in';

  const getGameTitle = () => {
    switch (gameId) {
      case 'pottery-3d': return '3D 토기 조각 맞추기';
      case 'stone-knife': return '벼 수확하기게임';
      case 'escape-room': return '방탈출게임';
      case 'custom-bow': return '커스텀 활게임';
      default: return '고강선사유적 체험 게임';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full mx-auto select-none font-round">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-[#FFFDF9] rounded-2xl border-2 border-[#DECDB8] shadow-xs mb-2.5 shrink-0">
        {/* Back to Lobby Wooden Button */}
        <button
          onClick={onBackToLobby}
          className="btn-wood px-4 py-2 text-sm text-white rounded-xl flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>처음으로 (목록)</span>
        </button>

        {/* Current Game Title */}
        <div className="text-lg sm:text-xl font-extrabold text-[#3C2E22] flex items-center gap-2">
          {getGameTitle()}
        </div>

        {/* Right Area: Minimal code slot button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditorOpen(true)}
            className="p-2 rounded-xl bg-[#EFE6D5] text-[#543415] hover:bg-[#E2D5C0] transition-colors cursor-pointer"
            title="코드 설정"
          >
            <Code2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Surface */}
      <div className="flex-1 w-full min-h-[460px] relative overflow-hidden flex flex-col rounded-2xl">
        {isCustomMode ? (
          <CustomCodeRunner
            gameId={gameId}
            config={config}
            onOpenEditor={() => setIsEditorOpen(true)}
          />
        ) : (
          <div className="h-full w-full flex-1">
            {gameId === 'pottery-3d' && <Pottery3DGame />}
            {gameId === 'stone-knife' && <StoneKnifeGame />}
            {gameId === 'escape-room' && <EscapeRoomGame />}
            {gameId === 'custom-bow' && <CustomBowGame />}
          </div>
        )}
      </div>

      {/* Code Injection Modal */}
      <CustomCodeModal
        gameId={gameId}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
};
