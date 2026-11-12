import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Award, Sparkles, Scissors, Info, Wheat } from 'lucide-react';
import { PlantRow1 } from '../character/PrehistoricPlants';

interface RiceTarget {
  id: number;
  x: number; // percentage
  ripe: boolean;
  cut: boolean;
  quality: 'perfect' | 'great' | 'good';
}

export const StoneKnifeGame: React.FC = () => {
  const { awardStamp, playSound } = useGame();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [harvestKg, setHarvestKg] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ text: string; color: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [bladeAngle, setBladeAngle] = useState<number>(0);
  const [knifePosition, setKnifePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Floating ripe rice targets
  const [targets, setTargets] = useState<RiceTarget[]>([]);
  const targetCounter = useRef<number>(0);
  const requestRef = useRef<number>(0);

  // Spawn ripe grain targets
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setTargets(prev => {
        if (prev.length >= 6) return prev;
        targetCounter.current += 1;
        const newTarget: RiceTarget = {
          id: targetCounter.current,
          x: Math.floor(Math.random() * 75) + 12,
          ripe: true,
          cut: false,
          quality: 'great'
        };
        return [...prev, newTarget];
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver]);

  // Countdown timer
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isGameOver, harvestKg]);

  const handleGameFinish = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    awardStamp('stone-knife');
    playSound('success');
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const startGame = () => {
    setScore(0);
    setHarvestKg(0);
    setCombo(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setIsPlaying(true);
    setTargets([]);
    playSound('click');
  };

  const handleCutTarget = (id: number) => {
    if (!isPlaying || isGameOver) return;

    setTargets(prev =>
      prev.map(t => {
        if (t.id === id && !t.cut) {
          // calculate score
          playSound('click');
          const addedKg = 5;
          setHarvestKg(curr => {
            const nextKg = curr + addedKg;
            if (nextKg >= 60 && !isGameOver) {
              // early win condition reached!
            }
            return nextKg;
          });
          setScore(curr => curr + 150 + combo * 20);
          setCombo(c => c + 1);

          setFeedback({
            text: combo >= 3 ? `${combo + 1} 연속 수확 콤보!` : '깔끔한 볏이삭 수확!',
            color: '#B45309'
          });

          setTimeout(() => {
            setFeedback(null);
          }, 800);

          setBladeAngle(prev => (prev === 15 ? -15 : 15));
          return { ...t, cut: true };
        }
        return t;
      })
    );
  };

  const handleFieldTouch = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isPlaying) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setKnifePosition({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[560px] gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9C8]">
      {/* Main Harvest Stage */}
      <div
        className="flex-1 flex flex-col relative rounded-xl bg-gradient-to-b from-[#F2EAE0] via-[#EADBCA] to-[#C9BAA3] border border-[#D5C6B5] overflow-hidden min-h-[420px] select-none"
        onMouseMove={handleFieldTouch}
        onTouchMove={handleFieldTouch}
      >
        {/* Sky & Field Atmosphere */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FAF4EC] to-transparent pointer-events-none" />

        {/* Top HUD */}
        <div className="relative z-10 p-3.5 flex items-center justify-between bg-[#FAF7F2]/85 backdrop-blur-xs border-b border-[#D8C7B5]">
          <div className="flex items-center gap-3">
            <div className="bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#DACBB9] text-xs">
              <span className="text-[#7A6652]">남은 시간:</span>{' '}
              <span className="font-bold text-[#A74C13] font-mono text-sm">{timeLeft}초</span>
            </div>
            <div className="bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#DACBB9] text-xs">
              <span className="text-[#7A6652]">수확량:</span>{' '}
              <span className="font-bold text-[#3D2F22] font-mono text-sm">{harvestKg} kg</span>
            </div>
            {combo > 1 && (
              <div className="bg-[#F9EAD6] text-[#B45309] font-bold text-xs px-2.5 py-1 rounded-md border border-[#EACBB0] animate-pulse">
                {combo} COMBO!
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-[10px] text-[#85715E]">수확 점수</div>
              <div className="text-base font-extrabold text-[#A74C13] font-mono">{score}점</div>
            </div>
          </div>
        </div>

        {/* Feedback Floating Banner */}
        {feedback && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-white/95 text-[#A74C13] border border-[#E2CEB9] px-4 py-1.5 rounded-full font-bold text-xs shadow-md animate-bounce pointer-events-none">
            {feedback.text}
          </div>
        )}

        {/* Interactive Grain Field Area */}
        <div className="flex-1 relative overflow-hidden flex items-end justify-center p-6">
          {/* Background Prehistoric Hill Silhouettes */}
          <div className="absolute bottom-16 left-0 right-0 h-24 bg-[#BFAA92]/20 rounded-[50%] blur-sm pointer-events-none" />

          {/* Ripe Grain Targets */}
          {targets.map(target => (
            <div
              key={target.id}
              onClick={() => handleCutTarget(target.id)}
              onTouchStart={() => handleCutTarget(target.id)}
              style={{ left: `${target.x}%` }}
              className={`absolute bottom-12 cursor-pointer transition-transform duration-200 select-none ${
                target.cut ? 'opacity-30 scale-75' : 'hover:scale-110 active:scale-95'
              }`}
            >
              {/* Rice Ear SVG */}
              <div className="flex flex-col items-center group">
                <div
                  className={`w-14 h-24 rounded-full flex flex-col items-center justify-center p-2 shadow-sm transition-all border ${
                    target.cut
                      ? 'bg-stone-300 border-stone-400'
                      : 'bg-gradient-to-t from-[#D9A74A] to-[#E9C369] border-[#B8872E] animate-bounce'
                  }`}
                  style={{ animationDuration: '2s' }}
                >
                  <Wheat className="w-8 h-8 text-[#543E19]" />
                  <span className="text-[10px] font-bold text-[#423112] mt-1">
                    {target.cut ? '수확됨' : '터치!'}
                  </span>
                </div>
                {/* Stem */}
                <div className="w-1.5 h-16 bg-[#8F9460] rounded-full mt-1" />
              </div>
            </div>
          ))}

          {/* 1이미지: 수풀 배경 (바닥에 배치) */}
          <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none opacity-90">
            <PlantRow1 height={42} />
          </div>

          {/* Player Hand & Crescent Stone Knife (반달돌칼) follows touch/mouse */}
          {isPlaying && (
            <div
              className="absolute pointer-events-none transition-transform duration-75 z-20"
              style={{
                left: `${knifePosition.x}%`,
                top: `${knifePosition.y}%`,
                transform: `translate(-50%, -50%) rotate(${bladeAngle}deg)`
              }}
            >
              <div className="relative">
                {/* Crescent Stone Knife SVG Asset */}
                <svg width="110" height="60" viewBox="0 0 110 60" className="drop-shadow-lg">
                  {/* Crescent Stone Blade */}
                  <path
                    d="M 5 50 Q 55 5 105 50 Q 55 35 5 50 Z"
                    fill="#7C7365"
                    stroke="#4E473D"
                    strokeWidth="2"
                  />
                  {/* Polished Blade Edge */}
                  <path
                    d="M 5 50 Q 55 35 105 50"
                    fill="none"
                    stroke="#D6CEBE"
                    strokeWidth="2.5"
                  />
                  {/* Two Cord Holes for Fingers (반달돌칼 끈 구멍 2개) */}
                  <circle cx="42" cy="30" r="4.5" fill="#3D372F" stroke="#B8A995" strokeWidth="1.5" />
                  <circle cx="68" cy="30" r="4.5" fill="#3D372F" stroke="#B8A995" strokeWidth="1.5" />
                  {/* Hemp String loops */}
                  <path d="M 42 30 Q 55 18 68 30" fill="none" stroke="#C49A54" strokeWidth="2.5" strokeDasharray="2 1" />
                </svg>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#3D2F22] text-[#F3EBE1] text-[9px] px-2 py-0.5 rounded-full font-mono whitespace-nowrap">
                  반달돌칼 (손가락 장착)
                </div>
              </div>
            </div>
          )}

          {/* Start Screen Overlay */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 bg-[#FAF7F2]/80 backdrop-blur-xs flex items-center justify-center p-6 z-30">
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#D5C4B0] shadow-xl max-w-sm text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5EAD7] text-[#A74C13] flex items-center justify-center mb-3">
                  <Wheat className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#3B2C1F] mb-1 font-serif-kr">
                  청동기 반달돌칼 수확 체험
                </h3>
                <p className="text-xs text-[#6E5C4A] mb-4 leading-relaxed">
                  화면에 나타나는 잘 익은 볏이삭을 반달돌칼로 재빠르게 터치해 수확하세요!
                  제한시간 30초 동안 마을의 가을 수확량을 채워보세요.
                </p>
                <button
                  onClick={startGame}
                  className="w-full py-3 px-5 text-sm font-bold text-white bg-[#A74C13] hover:bg-[#8B3B09] rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  수확 게임 시작하기
                </button>
              </div>
            </div>
          )}

          {/* Game Over / Win Modal */}
          {isGameOver && (
            <div className="absolute inset-0 bg-[#2C241D]/60 backdrop-blur-xs flex items-center justify-center p-6 z-30">
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#B45309] shadow-2xl max-w-md text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FCE8D5] text-[#B45309] flex items-center justify-center mb-3">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#3B2C1F] mb-1 font-serif-kr">
                  풍요로운 가을 수확 성공!
                </h3>
                <div className="my-3 py-2.5 px-4 bg-[#F2E8DB] rounded-xl border border-[#DFCEBD] flex justify-around items-center">
                  <div>
                    <div className="text-[11px] text-[#786552]">총 수확량</div>
                    <div className="text-lg font-extrabold text-[#3B2C1F]">{harvestKg} kg</div>
                  </div>
                  <div className="w-px h-8 bg-[#D4C3AF]" />
                  <div>
                    <div className="text-[11px] text-[#786552]">최종 점수</div>
                    <div className="text-lg font-extrabold text-[#A74C13]">{score}점</div>
                  </div>
                </div>
                <p className="text-xs text-[#705D4A] mb-4 leading-relaxed">
                  청동기시대 사람들은 반달돌칼을 이용해 곡식을 이삭째 따서 겨울을 날 양식을 비축했습니다.
                  스탬프 투어에 반달돌칼 인증 스탬프가 찍혔습니다!
                </p>
                <button
                  onClick={startGame}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#A74C13] hover:bg-[#8F3F0B] rounded-xl transition-colors shadow-sm"
                >
                  다시 도전하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Relic Guide & Method Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-3">
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DFD3C2]">
          <h3 className="text-sm font-bold text-[#3D2F22] flex items-center gap-1.5 mb-2 font-serif-kr">
            <span className="w-2 h-2 rounded-full bg-[#854D0E]"></span>
            반달돌칼의 비밀과 사용법
          </h3>
          <p className="text-xs text-[#7A6753] leading-relaxed mb-3">
            반달돌칼(半月形石刀)은 돌을 갈아 반달 또는 물고기 모양으로 만든 청동기시대의 대표적인 농기구입니다.
          </p>

          <div className="p-3 bg-[#F4ECE0] rounded-lg border border-[#DFD3C2] space-y-2 text-xs text-[#5C4A3A]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#A74C13] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              <span>가운데 구멍에 끈을 꿰어 둘째 손가락을 끼웁니다.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#A74C13] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              <span>날카로운 날 부분을 엄지손가락 쪽으로 향하게 쥡니다.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#A74C13] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              <span>볏이삭을 엄지로 누르며 꺾어 따서 바구니에 담습니다.</span>
            </div>
          </div>
        </div>

        {/* Historic Insight */}
        <div className="bg-[#F4ECE0] p-3.5 rounded-xl border border-[#DFD3C2] text-xs text-[#594635] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#854D0E] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-[#3D2E20]">고강동 선사유적지 출토 유물</strong>
            <p className="text-[11px] text-[#695644] mt-0.5">
              부천 고강동 청룡산 일대 환구유적 및 주거지에서는 다수의 반달돌칼과 간돌검, 돌도끼가 출토되어 청동기 농경과 제사 의례가 활발했음을 보여줍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
