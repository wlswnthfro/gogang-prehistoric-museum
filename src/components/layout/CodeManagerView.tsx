import React, { useState } from 'react';
import { GAMES_DATA } from '../../data/games';
import { useGame } from '../../context/GameContext';
import { GameId } from '../../types/game';
import { CustomCodeModal } from '../games/CustomCodeModal';
import {
  Code2,
  FileCode,
  Layers,
  Sparkles,
  ExternalLink,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Info
} from 'lucide-react';

export const CodeManagerView: React.FC = () => {
  const { customConfigs, setActiveTab, resetCustomConfig, playSound } = useGame();
  const [editingGameId, setEditingGameId] = useState<GameId | null>(null);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const getComponentFilePath = (id: GameId) => {
    switch (id) {
      case 'pottery-3d':
        return '/src/components/games/Pottery3DGame.tsx';
      case 'stone-knife':
        return '/src/components/games/StoneKnifeGame.tsx';
      case 'escape-room':
        return '/src/components/games/EscapeRoomGame.tsx';
      case 'custom-bow':
        return '/src/components/games/CustomBowGame.tsx';
    }
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedFile(path);
    playSound('click');
    setTimeout(() => setCopiedFile(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E3D9C8] shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FCE8D5] text-[#B45309] flex items-center justify-center shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[#2C241D] font-serif-kr">
              내 코드 연동 & 슬롯 관리소
            </h2>
            <p className="text-xs text-[#705E4D] leading-relaxed max-w-3xl">
              &ldquo;코드는 다 짜와서 그냥 넣으면 되는데 기본적인 틀을 작성하고 싶다&rdquo;는 요청에 맞추어 마련된 통합 연동 센터입니다.
              준비해오신 웹 게임 코드를 2가지 방법 중 편한 방식으로 즉시 넣으실 수 있습니다.
            </p>
          </div>
        </div>

        {/* 2 Ways to Plug In Code Banner */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#F4ECE0] rounded-xl border border-[#DFD3C2] space-y-1.5">
            <div className="font-bold text-[#3B2C1F] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#B45309] text-white flex items-center justify-center text-[10px]">1</span>
              <span>브라우저에서 직접 붙여넣기 (HTML/JS/iframe)</span>
            </div>
            <p className="text-[11px] text-[#695644] leading-relaxed">
              아래 각 게임 슬롯의 <strong>&apos;코드 편집&apos;</strong> 버튼을 눌러 준비해오신 HTML, Three.js 스크립트 또는 외부 웹 링크를 붙여넣으시면 즉시 태블릿 프레임에서 돌아갑니다.
            </p>
          </div>

          <div className="p-4 bg-[#F4ECE0] rounded-xl border border-[#DFD3C2] space-y-1.5">
            <div className="font-bold text-[#3B2C1F] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#B45309] text-white flex items-center justify-center text-[10px]">2</span>
              <span>React 컴포넌트 파일 직접 교체</span>
            </div>
            <p className="text-[11px] text-[#695644] leading-relaxed">
              작성해오신 코드가 React 컴포넌트라면 각 슬롯에 안내된 <code>/src/components/games/...</code> 파일의 본문을 준비하신 코드로 그대로 덮어쓰시면 완벽 호환됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Slots Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#2C241D] font-serif-kr px-1">
          고강선사유적 4개 게임 슬롯 현황
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GAMES_DATA.map((game, index) => {
            const config = customConfigs[game.id];
            const isCustom = config.sourceType !== 'built-in';
            const filePath = getComponentFilePath(game.id);

            return (
              <div
                key={game.id}
                className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E3D9C8] hover:border-[#BA9A7C] transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Slot Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#8C765F] font-bold">
                      SLOT 0{index + 1}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      isCustom
                        ? 'bg-[#B45309] text-white border-[#974204]'
                        : 'bg-[#EDE5D8] text-[#6B5948] border-[#DACBB9]'
                    }`}>
                      {isCustom ? '커스텀 코드 적용 중' : '기본 내장 템플릿'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#2C241D] font-serif-kr mb-1">
                    {game.title}
                  </h4>
                  <p className="text-xs text-[#6B5A49] mb-3">
                    {game.shortDesc}
                  </p>

                  {/* Direct File Path for React drop-in */}
                  <div className="p-2.5 bg-[#F2ECE1] rounded-xl border border-[#DFD3C2] flex items-center justify-between gap-2 mb-4">
                    <div className="truncate font-mono text-[11px] text-[#786653]">
                      📁 {filePath}
                    </div>
                    <button
                      onClick={() => copyPath(filePath)}
                      className="px-2 py-1 text-[10px] font-medium text-[#4A3B2C] bg-white hover:bg-[#FAF7F2] rounded border border-[#DACBB9] shrink-0 flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedFile === filePath ? '복사됨!' : '경로 복사'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#EDE4D5]">
                  <button
                    onClick={() => setActiveTab(game.id)}
                    className="flex-1 py-2 px-3 bg-[#B45309] hover:bg-[#974204] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>게임 화면 열기</span>
                  </button>

                  <button
                    onClick={() => setEditingGameId(game.id)}
                    className="py-2 px-3 bg-[#EFE8DC] hover:bg-[#E2D6C5] text-[#4B3929] rounded-xl text-xs font-semibold border border-[#D8C7B4] transition-colors flex items-center gap-1"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>코드 편집</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for editing a specific slot */}
      {editingGameId && (
        <CustomCodeModal
          gameId={editingGameId}
          isOpen={true}
          onClose={() => setEditingGameId(null)}
        />
      )}
    </div>
  );
};
