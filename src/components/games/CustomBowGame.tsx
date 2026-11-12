import React, { useState, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';
import { Target, Sparkles, Wind, RotateCcw, Crosshair, Award, Settings2, Info } from 'lucide-react';
import { PlantRow2 } from '../character/PrehistoricPlants';

interface BowPart {
  id: string;
  name: string;
  material: string;
  bonusPower: number;
  bonusAccuracy: number;
  color: string;
}

export const CustomBowGame: React.FC = () => {
  const { awardStamp, playSound } = useGame();

  // Mode: 'craft' (custom bow assembly) vs 'shooting' (archery range)
  const [activeMode, setActiveMode] = useState<'craft' | 'shooting'>('craft');

  // Custom Choices
  const woodOptions: BowPart[] = [
    { id: 'oak', name: '단단한 참나무 (Oak)', material: '참나무', bonusPower: 15, bonusAccuracy: 5, color: '#78350F' },
    { id: 'ash', name: '탄력있는 물푸레나무 (Ash)', material: '물푸레나무', bonusPower: 10, bonusAccuracy: 15, color: '#A16207' },
    { id: 'bamboo', name: '유연한 산대나무 (Bamboo)', material: '대나무', bonusPower: 8, bonusAccuracy: 20, color: '#4D7C0F' },
  ];

  const stringOptions: BowPart[] = [
    { id: 'sinew', name: '사슴 힘줄 시위 (Deer Sinew)', material: '사슴 힘줄', bonusPower: 20, bonusAccuracy: 10, color: '#B45309' },
    { id: 'hemp', name: '삼줄기 꼬임 시위 (Twisted Hemp)', material: '삼줄기', bonusPower: 12, bonusAccuracy: 12, color: '#D97706' },
  ];

  const arrowheadOptions: BowPart[] = [
    { id: 'polished_stone', name: '간돌화살촉 (Polished Stone)', material: '마제석기', bonusPower: 15, bonusAccuracy: 15, color: '#57534E' },
    { id: 'obsidian', name: '흑요석 촉 (Obsidian)', material: '흑요석', bonusPower: 25, bonusAccuracy: 5, color: '#1C1917' },
  ];

  const [selectedWood, setSelectedWood] = useState<BowPart>(woodOptions[1]);
  const [selectedString, setSelectedString] = useState<BowPart>(stringOptions[0]);
  const [selectedArrowhead, setSelectedArrowhead] = useState<BowPart>(arrowheadOptions[0]);

  // Shooting states
  const [arrowsLeft, setArrowsLeft] = useState<number>(5);
  const [score, setScore] = useState<number>(0);
  const [lastHitScore, setLastHitScore] = useState<number | null>(null);
  const [wind, setWind] = useState<number>(() => Math.floor(Math.random() * 7) - 3); // -3 to +3
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [arrowInFlight, setArrowInFlight] = useState<boolean>(false);
  const [arrowLandingPos, setArrowLandingPos] = useState<{ x: number; y: number } | null>(null);

  const totalPower = 50 + selectedWood.bonusPower + selectedString.bonusPower + selectedArrowhead.bonusPower;
  const totalAccuracy = 50 + selectedWood.bonusAccuracy + selectedString.bonusAccuracy + selectedArrowhead.bonusAccuracy;

  const handleShoot = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (arrowInFlight || arrowsLeft <= 0 || isGameOver) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Relative to target area (center is (50, 50))
    const rawX = ((clientX - rect.left) / rect.width) * 100;
    const rawY = ((clientY - rect.top) / rect.height) * 100;

    // Apply wind drift and accuracy factor
    const accuracyDrift = (100 - totalAccuracy) * 0.12 * (Math.random() - 0.5);
    const finalX = Math.max(5, Math.min(95, rawX + wind * 4 + accuracyDrift));
    const finalY = Math.max(5, Math.min(95, rawY + accuracyDrift * 0.7));

    // Calculate distance from center (50, 50)
    const dist = Math.sqrt(Math.pow(finalX - 50, 2) + Math.pow(finalY - 50, 2));

    let hitPoints = 0;
    if (dist <= 8) hitPoints = 10;
    else if (dist <= 18) hitPoints = 8;
    else if (dist <= 28) hitPoints = 6;
    else if (dist <= 40) hitPoints = 4;
    else hitPoints = 1;

    playSound('shoot');
    setArrowInFlight(true);
    setArrowLandingPos({ x: finalX, y: finalY });

    setTimeout(() => {
      setArrowInFlight(false);
      setLastHitScore(hitPoints);
      playSound(hitPoints >= 8 ? 'success' : 'click');
      const nextScore = score + hitPoints;
      setScore(nextScore);
      const nextArrows = arrowsLeft - 1;
      setArrowsLeft(nextArrows);

      // New wind
      setWind(Math.floor(Math.random() * 7) - 3);

      if (nextArrows <= 0) {
        setIsGameOver(true);
        if (nextScore >= 25) {
          awardStamp('custom-bow');
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    }, 400);
  };

  const handleRestartShooting = () => {
    playSound('click');
    setArrowsLeft(5);
    setScore(0);
    setLastHitScore(null);
    setIsGameOver(false);
    setArrowLandingPos(null);
    setWind(Math.floor(Math.random() * 7) - 3);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[560px] gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9C8]">
      {/* Main Arena */}
      <div className="flex-1 flex flex-col relative rounded-xl bg-gradient-to-b from-[#F2EFE8] via-[#EAE3D6] to-[#D5C9B7] border border-[#D5C7B6] overflow-hidden min-h-[420px]">
        {/* Top Mode Navigation */}
        <div className="p-3 bg-[#FAF7F2]/90 backdrop-blur-xs border-b border-[#DACBB9] flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 p-1 bg-[#EAE2D3] rounded-lg border border-[#D6C7B3]">
            <button
              onClick={() => {
                playSound('click');
                setActiveMode('craft');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeMode === 'craft'
                  ? 'bg-white text-[#854D0E] shadow-xs'
                  : 'text-[#6E5B49] hover:text-[#3B2C1F]'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              1. 나만의 활 제작소
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveMode('shooting');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeMode === 'shooting'
                  ? 'bg-white text-[#2D6A4F] shadow-xs'
                  : 'text-[#6E5B49] hover:text-[#3B2C1F]'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              2. 과녁 사격장
            </button>
          </div>

          {activeMode === 'shooting' && (
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#D9C8B5]">
                <Wind className="w-3.5 h-3.5 text-[#5B7B88]" />
                <span className="text-[#6D5946]">바람:</span>
                <span className="font-bold text-[#3B2C1F] font-mono">
                  {wind === 0 ? '바람 없음' : wind > 0 ? `→ ${wind}m/s 우측` : `← ${Math.abs(wind)}m/s 좌측`}
                </span>
              </div>
              <div className="bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#D9C8B5]">
                <span className="text-[#6D5946]">남은 화살:</span>{' '}
                <span className="font-bold text-[#B45309] font-mono">{arrowsLeft}발</span>
              </div>
              <div className="bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#D9C8B5]">
                <span className="text-[#6D5946]">총 점수:</span>{' '}
                <span className="font-extrabold text-[#2D6A4F] font-mono text-sm">{score}점</span>
              </div>
            </div>
          )}
        </div>

        {/* Mode 1: Bow Crafting Workshop */}
        {activeMode === 'craft' && (
          <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
            {/* Visual Preview of Custom Bow */}
            <div className="bg-white/80 rounded-2xl p-6 border border-[#DACBB9] flex flex-col items-center justify-center relative shadow-xs">
              <span className="text-[11px] font-semibold text-[#8C765F] uppercase tracking-wider mb-2">
                나만의 고강선사 목궁 (현재 조립 상태)
              </span>

              {/* Bow Graphic SVG */}
              <div className="relative w-64 h-36 flex items-center justify-center my-2">
                <svg width="220" height="120" viewBox="0 0 220 120" className="drop-shadow-md">
                  {/* Bow Stave Arc */}
                  <path
                    d="M 20 60 Q 110 5 200 60"
                    fill="none"
                    stroke={selectedWood.color}
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Bow String */}
                  <line
                    x1="20"
                    y1="60"
                    x2="200"
                    y2="60"
                    stroke={selectedString.id === 'sinew' ? '#92400E' : '#B45309'}
                    strokeWidth="2.5"
                    strokeDasharray={selectedString.id === 'hemp' ? '3 2' : 'none'}
                  />
                  {/* Arrow Placed */}
                  <line
                    x1="110"
                    y1="60"
                    x2="110"
                    y2="20"
                    stroke="#57534E"
                    strokeWidth="3"
                  />
                  {/* Arrowhead */}
                  <polygon
                    points="110,10 104,22 116,22"
                    fill={selectedArrowhead.id === 'obsidian' ? '#171717' : '#78716C'}
                  />
                  {/* Fletching */}
                  <polygon points="107,55 110,60 107,63" fill="#D97706" />
                  <polygon points="113,55 110,60 113,63" fill="#D97706" />
                </svg>
              </div>

              {/* Live Spec Gauges */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-3">
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#DFD3C2]">
                  <div className="flex justify-between text-xs font-semibold text-[#5A4736] mb-1">
                    <span>추진력 (Power)</span>
                    <span className="font-mono text-[#B45309] font-bold">{totalPower}</span>
                  </div>
                  <div className="w-full bg-[#E5DACB] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#B45309] h-full transition-all" style={{ width: `${Math.min(100, totalPower)}%` }} />
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#DFD3C2]">
                  <div className="flex justify-between text-xs font-semibold text-[#5A4736] mb-1">
                    <span>정확도 (Accuracy)</span>
                    <span className="font-mono text-[#2D6A4F] font-bold">{totalAccuracy}</span>
                  </div>
                  <div className="w-full bg-[#E5DACB] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2D6A4F] h-full transition-all" style={{ width: `${Math.min(100, totalAccuracy)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 1. Wood Selection */}
              <div className="bg-white/90 p-3 rounded-xl border border-[#DFD3C2]">
                <span className="text-xs font-bold text-[#3B2C1F] block mb-2">1. 활대 목재 선택</span>
                <div className="space-y-1.5">
                  {woodOptions.map(wood => (
                    <button
                      key={wood.id}
                      onClick={() => {
                        setSelectedWood(wood);
                        playSound('click');
                      }}
                      className={`w-full p-2 text-left rounded-lg text-xs font-medium border transition-all ${
                        selectedWood.id === wood.id
                          ? 'bg-[#FAF0E1] border-[#B45309] text-[#78350F] font-bold shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E5DACB] text-[#695644] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {wood.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Bowstring Selection */}
              <div className="bg-white/90 p-3 rounded-xl border border-[#DFD3C2]">
                <span className="text-xs font-bold text-[#3B2C1F] block mb-2">2. 활시위(줄) 선택</span>
                <div className="space-y-1.5">
                  {stringOptions.map(str => (
                    <button
                      key={str.id}
                      onClick={() => {
                        setSelectedString(str);
                        playSound('click');
                      }}
                      className={`w-full p-2 text-left rounded-lg text-xs font-medium border transition-all ${
                        selectedString.id === str.id
                          ? 'bg-[#FAF0E1] border-[#B45309] text-[#78350F] font-bold shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E5DACB] text-[#695644] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {str.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Arrowhead Selection */}
              <div className="bg-white/90 p-3 rounded-xl border border-[#DFD3C2]">
                <span className="text-xs font-bold text-[#3B2C1F] block mb-2">3. 화살촉 재질 선택</span>
                <div className="space-y-1.5">
                  {arrowheadOptions.map(tip => (
                    <button
                      key={tip.id}
                      onClick={() => {
                        setSelectedArrowhead(tip);
                        playSound('click');
                      }}
                      className={`w-full p-2 text-left rounded-lg text-xs font-medium border transition-all ${
                        selectedArrowhead.id === tip.id
                          ? 'bg-[#FAF0E1] border-[#B45309] text-[#78350F] font-bold shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E5DACB] text-[#695644] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {tip.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch to Shooting Range Button */}
            <div className="mt-4 pt-2 flex justify-center">
              <button
                onClick={() => {
                  playSound('click');
                  setActiveMode('shooting');
                  handleRestartShooting();
                }}
                className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#24543E] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                이 활로 과녁 사격장 입장하기!
              </button>
            </div>
          </div>
        )}

        {/* Mode 2: Shooting Range Target */}
        {activeMode === 'shooting' && (
          <div
            onClick={handleShoot}
            onTouchStart={handleShoot}
            className="flex-1 relative cursor-crosshair select-none flex items-center justify-center p-6 overflow-hidden"
          >
            {/* Target Rings Graphic */}
            <div className="relative w-72 h-72 rounded-full border-4 border-[#8B7864] shadow-2xl flex items-center justify-center bg-white">
              {/* Ring 4: 4 points */}
              <div className="w-full h-full rounded-full bg-[#EFE9DF] border-4 border-stone-300 flex items-center justify-center">
                {/* Ring 3: 6 points */}
                <div className="w-52 h-52 rounded-full bg-[#3B82F6]/20 border-4 border-sky-400 flex items-center justify-center">
                  {/* Ring 2: 8 points */}
                  <div className="w-36 h-36 rounded-full bg-[#EF4444]/20 border-4 border-rose-400 flex items-center justify-center">
                    {/* Ring 1: 10 points (Bullseye) */}
                    <div className="w-16 h-16 rounded-full bg-[#EAB308] border-4 border-amber-500 flex items-center justify-center shadow-inner">
                      <span className="text-xs font-bold text-[#713F12]">10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crosshair Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-0.5 bg-stone-700" />
                <div className="h-full w-0.5 bg-stone-700 absolute" />
              </div>
            </div>

            {/* 2이미지: 뾰족한 잔디/초원 (사격장 하단에 배치) */}
            <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none opacity-85">
              <PlantRow2 height={44} />
            </div>

            {/* Hit Arrow Placement */}
            {arrowLandingPos && (
              <div
                className="absolute pointer-events-none transition-all duration-150 z-20"
                style={{
                  left: `${arrowLandingPos.x}%`,
                  top: `${arrowLandingPos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-rose-600 ring-4 ring-rose-300 animate-ping absolute" />
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-700 shadow-sm" />
                  {lastHitScore !== null && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2C241D] text-amber-300 text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
                      +{lastHitScore}점!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Aim Instruction overlay */}
            {!isGameOver && arrowsLeft > 0 && (
              <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
                <span className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-xs">
                  🎯 과녁의 원하는 위치를 터치하여 조준 발사하세요! (바람 세기 주의)
                </span>
              </div>
            )}

            {/* Game Over Screen */}
            {isGameOver && (
              <div className="absolute inset-0 bg-[#2C241D]/65 backdrop-blur-xs flex items-center justify-center p-6 z-30">
                <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#2D6A4F] shadow-2xl max-w-sm text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#E5F3EB] text-[#2D6A4F] flex items-center justify-center mb-3">
                    <Award className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#3B2C1F] mb-1 font-serif-kr">
                    사격 종료!
                  </h3>
                  <div className="my-3 py-2 px-4 bg-[#EDE5D8] rounded-xl text-center">
                    <span className="text-xs text-[#705D4A]">최종 사격 득점</span>
                    <div className="text-2xl font-extrabold text-[#2D6A4F] font-mono">{score}점 / 50점 만점</div>
                  </div>
                  <p className="text-xs text-[#6E5C4A] mb-4 leading-relaxed">
                    {score >= 25
                      ? '뛰어난 명사수입니다! 선사시대 수렵 인증 스탬프가 지급되었습니다.'
                      : '아쉽게도 명중률이 조금 부족했습니다. 다시 조준해 도전해보세요!'}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleRestartShooting}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#2D6A4F] hover:bg-[#22533D] rounded-xl transition-all shadow-sm"
                    >
                      다시 사격하기
                    </button>
                    <button
                      onClick={() => setActiveMode('craft')}
                      className="px-4 py-2 text-xs font-medium text-[#574433] bg-[#E8DFD1] hover:bg-[#DBD1C2] rounded-xl transition-all"
                    >
                      활 개조하러 가기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Relic Guide & Archery Insight */}
      <div className="w-full lg:w-80 flex flex-col gap-3">
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DFD3C2]">
          <h3 className="text-sm font-bold text-[#3D2F22] flex items-center gap-1.5 mb-2 font-serif-kr">
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F]"></span>
            선사시대 활과 화살촉 (간돌화살촉)
          </h3>
          <p className="text-xs text-[#7A6753] leading-relaxed mb-3">
            신석기시대부터 발달한 활과 화살은 인류가 사냥감과 거리를 두고 안전하게 사냥할 수 있게 만든 획기적인 무기였습니다.
          </p>

          <div className="p-3 bg-[#F4ECE0] rounded-lg border border-[#DFD3C2] text-xs text-[#5C4A3A] space-y-1.5">
            <strong className="block font-semibold text-[#3B2C1F]">간돌화살촉 (磨製石鏃)</strong>
            <p className="text-[11px] text-[#715E4C] leading-relaxed">
              점판암이나 혈암 등을 숫돌에 정교하게 갈아 촉끝을 날카롭게 세우고, 활대 자루에 단단히 결합할 수 있도록 슴베(뿌리)를 만들었습니다.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#F4ECE0] p-3.5 rounded-xl border border-[#DFD3C2] text-xs text-[#594635] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-[#3D2E20]">사격 팁</strong>
            <p className="text-[11px] text-[#695644] mt-0.5">
              바람의 세기와 방향이 화살의 궤적을 바꿉니다. 바람이 우측으로 불면 과녁의 살짝 왼쪽을 노리는 것이 요령입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
