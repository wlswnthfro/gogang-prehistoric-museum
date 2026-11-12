import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { GAMES_DATA } from '../../data/games';
import { X, Award, CheckCircle2, RotateCcw, Printer, Sparkles } from 'lucide-react';

interface StampPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StampPassportModal: React.FC<StampPassportModalProps> = ({
  isOpen,
  onClose
}) => {
  const { stamps, resetStamps, playSound } = useGame();
  const [visitorName, setVisitorName] = useState<string>('어린이 탐험가');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalStamps = Object.values(stamps).filter(Boolean).length;
  const isAllCompleted = totalStamps === 4;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#D8C7B5] shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#2C241D]">
        {/* Header */}
        <div className="p-4 bg-[#F2EAE0] border-b border-[#DACBB9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FCE8D5] text-[#B45309] flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#3B2C1F] font-serif-kr">
                고강선사유적체험관 탐험 여권 & 수료증
              </h3>
              <p className="text-[11px] text-[#7D6B5A]">
                4가지 선사체험을 완료하고 공식 수료증을 발급받으세요.
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {!showCertificate ? (
            <>
              {/* Progress Tracker Card */}
              <div className="bg-[#F4ECE0] p-4 rounded-xl border border-[#DFD3C2] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#7A6652]">현재 모은 스탬프</span>
                  <div className="text-xl font-extrabold text-[#B45309] font-serif-kr mt-0.5">
                    {totalStamps} / 4 개 완료
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${isAllCompleted ? 'bg-[#D1E7DD] text-[#0F5132] border-[#BADBCC]' : 'bg-white text-[#8C765F] border-[#DACBB9]'}`}>
                    {isAllCompleted ? '수료증 발급 가능!' : '진행 중'}
                  </span>
                </div>
              </div>

              {/* 4 Stamp Slots */}
              <div className="grid grid-cols-2 gap-3">
                {GAMES_DATA.map((game, index) => {
                  const isDone = stamps[game.id];
                  return (
                    <div
                      key={game.id}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between min-h-[110px] transition-all ${
                        isDone
                          ? 'bg-white border-[#B45309] shadow-xs'
                          : 'bg-[#F2ECE1]/60 border-dashed border-[#DACBB9] opacity-75'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#8C765F]">0{index + 1}</span>
                        {isDone ? (
                          <span className="w-6 h-6 rounded-full bg-[#D1E7DD] text-[#0F5132] flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400">미완료</span>
                        )}
                      </div>

                      <div className="my-1">
                        <h4 className="text-xs font-bold text-[#3B2C1F] truncate">
                          {game.title}
                        </h4>
                        <span className="text-[10px] text-[#786653]">
                          {game.relic}
                        </span>
                      </div>

                      {/* Official Archaeological Stamp graphic if done */}
                      {isDone ? (
                        <div className="py-1 px-2 rounded-md bg-[#FAF0E1] border border-[#E8D4BE] text-center">
                          <span className="text-[10px] font-extrabold text-[#B45309] tracking-wider">
                            ★ 체험 인증 완료 ★
                          </span>
                        </div>
                      ) : (
                        <div className="text-center py-1 text-[10px] text-[#A69383]">
                          체험 완료 시 도장이 찍힙니다
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Certificate Input Area */}
              <div className="p-4 bg-white rounded-xl border border-[#DFD3C2] space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#3B2C1F] block mb-1">
                    탐험가 이름 입력 (수료증에 표기됩니다)
                  </label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={e => setVisitorName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DACBB9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B45309]"
                  />
                </div>

                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#B45309] hover:bg-[#974204] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>명예 고고학자 수료증 보기</span>
                </button>
              </div>
            </>
          ) : (
            /* Certificate View */
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-b from-[#FFFDF9] to-[#F7F2E8] rounded-xl border-4 border-double border-[#A74C13] text-center relative shadow-md">
                {/* Vintage Prehistoric Watermark */}
                <div className="text-xs tracking-widest text-[#8C765F] font-mono uppercase mb-2">
                  제 2026-고강선사-{Math.floor(1000 + Math.random() * 9000)}호
                </div>

                <h2 className="text-2xl font-extrabold text-[#3B2C1F] font-serif-kr mb-4">
                  명예 고고학자 수료증
                </h2>

                <div className="text-base font-bold text-[#A74C13] mb-4">
                  탐험가: {visitorName || '고강동 탐험가'}
                </div>

                <p className="text-xs text-[#5C4A3A] leading-relaxed max-w-md mx-auto mb-6">
                  위 사람은 부천 고강선사유적체험관에서 실시한 3D 빗살무늬토기 복원, 청동기 반달돌칼 수확, 움집 미스터리 방탈출, 선사 활 제작 및 사격 체험을 훌륭히 이수하였으므로 이 증서를 수여합니다.
                </p>

                <div className="flex justify-between items-end pt-4 border-t border-[#DFD3C2] text-xs text-[#705E4D]">
                  <div className="text-left font-mono text-[10px]">
                    고강동 선사유적지<br />
                    청룡산 유적공원
                  </div>
                  <div className="font-serif-kr font-extrabold text-sm text-[#3B2C1F]">
                    고강선사유적체험관장
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-red-700 text-red-700 flex items-center justify-center text-[10px] font-bold rotate-12">
                    고강인
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCertificate(false)}
                  className="flex-1 py-2 text-xs font-medium text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl transition-colors"
                >
                  ← 스탬프 목록으로
                </button>
                <button
                  onClick={handlePrint}
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#B45309] hover:bg-[#974204] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  수료증 인쇄/저장
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F2EAE0] border-t border-[#DACBB9] flex justify-between items-center text-xs">
          <button
            onClick={resetStamps}
            className="text-[11px] text-[#7A6753] hover:text-[#3B2C1F] flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            스탬프 초기화
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#594635] bg-[#E2D6C5] hover:bg-[#D6C7B2] rounded-lg"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
