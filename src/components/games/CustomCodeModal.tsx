import React, { useState } from 'react';
import { GameId, CustomCodeConfig } from '../../types/game';
import { useGame } from '../../context/GameContext';
import { GAMES_DATA } from '../../data/games';
import { X, Check, Code2, Link, RotateCcw, FileCode, Sparkles } from 'lucide-react';

interface CustomCodeModalProps {
  gameId: GameId;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomCodeModal: React.FC<CustomCodeModalProps> = ({
  gameId,
  isOpen,
  onClose
}) => {
  const { customConfigs, updateCustomConfig, resetCustomConfig, playSound } = useGame();
  const currentConfig = customConfigs[gameId];
  const gameMeta = GAMES_DATA.find(g => g.id === gameId);

  const [sourceType, setSourceType] = useState(currentConfig?.sourceType || 'built-in');
  const [htmlCode, setHtmlCode] = useState(currentConfig?.htmlCode || '');
  const [iframeUrl, setIframeUrl] = useState(currentConfig?.iframeUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    playSound('stamp');
    updateCustomConfig(gameId, {
      sourceType,
      htmlCode,
      iframeUrl
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    playSound('click');
    resetCustomConfig(gameId);
    setSourceType('built-in');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#D8C7B5] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#2C241D]">
        {/* Header */}
        <div className="p-4 bg-[#F2EAE0] border-b border-[#DACBB9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E7D6C3] text-[#7A4B22] flex items-center justify-center font-bold">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#3B2C1F] font-serif-kr">
                [{gameMeta?.title}] 커스텀 코드 연결 설정
              </h3>
              <p className="text-[11px] text-[#7D6B5A]">
                준비해 오신 게임 코드를 이 탭 슬롯에 직접 연동합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-[#E5DACB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Source Type Selector */}
          <div>
            <label className="font-bold text-[#3B2C1F] block mb-2">실행 방식 선택</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSourceType('built-in')}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  sourceType === 'built-in'
                    ? 'bg-white border-[#B45309] shadow-xs ring-1 ring-[#B45309]'
                    : 'bg-[#F2ECE1] border-[#DACBB9] hover:bg-white'
                }`}
              >
                <span className="font-bold text-[#3B2C1F] flex items-center justify-between">
                  기본 내장 템플릿
                  {sourceType === 'built-in' && <Check className="w-3.5 h-3.5 text-[#B45309]" />}
                </span>
                <span className="text-[11px] text-[#786653]">
                  완성된 고품질 기본 인터랙티브 게임 실행
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType('html-code')}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  sourceType === 'html-code'
                    ? 'bg-white border-[#B45309] shadow-xs ring-1 ring-[#B45309]'
                    : 'bg-[#F2ECE1] border-[#DACBB9] hover:bg-white'
                }`}
              >
                <span className="font-bold text-[#3B2C1F] flex items-center justify-between">
                  HTML/JS 직접 입력
                  {sourceType === 'html-code' && <Check className="w-3.5 h-3.5 text-[#B45309]" />}
                </span>
                <span className="text-[11px] text-[#786653]">
                  작성해오신 웹 게임 코드를 복사해 붙여넣기
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType('iframe-url')}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  sourceType === 'iframe-url'
                    ? 'bg-white border-[#B45309] shadow-xs ring-1 ring-[#B45309]'
                    : 'bg-[#F2ECE1] border-[#DACBB9] hover:bg-white'
                }`}
              >
                <span className="font-bold text-[#3B2C1F] flex items-center justify-between">
                  외부 URL 연동
                  {sourceType === 'iframe-url' && <Check className="w-3.5 h-3.5 text-[#B45309]" />}
                </span>
                <span className="text-[11px] text-[#786653]">
                  별도로 호스팅된 웹앱/게임 링크 연결
                </span>
              </button>
            </div>
          </div>

          {/* Conditional Input depending on sourceType */}
          {sourceType === 'html-code' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#3B2C1F] flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#B45309]" />
                  HTML / CSS / JavaScript 코드 붙여넣기
                </label>
                <span className="text-[11px] text-[#8C765F]">브라우저 내 로컬 저장 지원</span>
              </div>
              <textarea
                value={htmlCode}
                onChange={e => setHtmlCode(e.target.value)}
                placeholder="<!DOCTYPE html><html>... 준비하신 코드를 여기에 붙여넣으세요</html>"
                rows={10}
                className="w-full p-3 font-mono text-[11px] bg-[#1E1E1E] text-[#D4D4D4] rounded-xl border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#B45309] resize-none"
              />
            </div>
          )}

          {sourceType === 'iframe-url' && (
            <div className="space-y-2">
              <label className="font-bold text-[#3B2C1F] flex items-center gap-1.5">
                <Link className="w-4 h-4 text-[#B45309]" />
                웹 게임 URL 주소
              </label>
              <input
                type="url"
                value={iframeUrl}
                onChange={e => setIframeUrl(e.target.value)}
                placeholder="https://example.com/my-prehistoric-game"
                className="w-full px-3.5 py-2.5 bg-white border border-[#DACBB9] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#B45309]"
              />
            </div>
          )}

          {/* React Component Drop-in Guide */}
          <div className="p-3.5 bg-[#F2EAE0] rounded-xl border border-[#DFD3C2] space-y-1.5">
            <div className="font-semibold text-[#4A392B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B45309]" />
              <span>React 컴포넌트로 직접 교체하고 싶으신가요?</span>
            </div>
            <p className="text-[11px] text-[#695644] leading-relaxed">
              본 프로젝트는 모듈식 구조로 설계되어 있습니다. 프로젝트 내 파일{' '}
              <code className="px-1.5 py-0.5 bg-white rounded border border-[#DACBB9] text-[#A74C13] font-mono text-[11px]">
                /src/components/games/
                {gameId === 'pottery-3d'
                  ? 'Pottery3DGame.tsx'
                  : gameId === 'stone-knife'
                  ? 'StoneKnifeGame.tsx'
                  : gameId === 'escape-room'
                  ? 'EscapeRoomGame.tsx'
                  : 'CustomBowGame.tsx'}
              </code>
              의 내용을 준비하신 React 컴포넌트로 그대로 덮어쓰시면 즉시 반영됩니다!
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F2EAE0] border-t border-[#DACBB9] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-[#6B5A4B] hover:text-[#3B2C1F] flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            초기 상태로 되돌리기
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#594635] bg-[#E8DEC\-C] hover:bg-[#DDD3C2] rounded-xl"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-[#B45309] hover:bg-[#964204] rounded-xl shadow-xs flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  저장 완료!
                </>
              ) : (
                '설정 저장 및 적용'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
