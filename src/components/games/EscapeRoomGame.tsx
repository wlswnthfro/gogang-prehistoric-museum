import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';
import { Flame, Key, Lock, Unlock, HelpCircle, Check, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { PlantRow3 } from '../character/PrehistoricPlants';

type EscapeStage = 1 | 2 | 3 | 4;

export const EscapeRoomGame: React.FC = () => {
  const { awardStamp, playSound } = useGame();
  const [currentStage, setCurrentStage] = useState<EscapeStage>(1);
  const [hintOpen, setHintOpen] = useState<boolean>(false);

  // Stage 1: Fire Sparks
  const [sparksCount, setSparksCount] = useState<number>(0);
  const [fireLit, setFireLit] = useState<boolean>(false);

  // Stage 2: Petroglyph Sequence (Desired order: 태양 -> 사슴 -> 물고기 -> 멧돼지)
  const glyphsList = [
    { id: 'sun', label: '태양', hint: '낮' },
    { id: 'deer', label: '사슴', hint: '사슴을 쫓고' },
    { id: 'fish', label: '물고기', hint: '강가' },
    { id: 'boar', label: '멧돼지', hint: '숲속' },
  ];
  const [selectedSequence, setSelectedSequence] = useState<string[]>([]);
  const [glyphError, setGlyphError] = useState<boolean>(false);

  // Stage 3: Wooden Latch Notches (Target: 3 - 1 - 4)
  const [pins, setPins] = useState<number[]>([1, 1, 1]);

  const handleSparkClick = () => {
    playSound('shoot');
    const next = sparksCount + 1;
    setSparksCount(next);
    if (next >= 5) {
      setFireLit(true);
      playSound('success');
      setTimeout(() => {
        setCurrentStage(2);
      }, 1200);
    }
  };

  const handleGlyphClick = (id: string) => {
    if (selectedSequence.includes(id)) return;
    playSound('click');
    const newSeq = [...selectedSequence, id];
    setSelectedSequence(newSeq);

    if (newSeq.length === 4) {
      if (
        newSeq[0] === 'sun' &&
        newSeq[1] === 'deer' &&
        newSeq[2] === 'fish' &&
        newSeq[3] === 'boar'
      ) {
        playSound('success');
        setTimeout(() => {
          setCurrentStage(3);
        }, 1000);
      } else {
        setGlyphError(true);
        setTimeout(() => {
          setSelectedSequence([]);
          setGlyphError(false);
        }, 1200);
      }
    }
  };

  const handleAdjustPin = (index: number) => {
    playSound('click');
    setPins(prev => {
      const copy = [...prev];
      copy[index] = copy[index] >= 5 ? 1 : copy[index] + 1;
      // Check if matches 3 - 1 - 4
      if (copy[0] === 3 && copy[1] === 1 && copy[2] === 4) {
        playSound('success');
        setTimeout(() => {
          setCurrentStage(4);
          awardStamp('escape-room');
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.55 }
          });
        }, 800);
      }
      return copy;
    });
  };

  const handleResetGame = () => {
    playSound('click');
    setCurrentStage(1);
    setSparksCount(0);
    setFireLit(false);
    setSelectedSequence([]);
    setPins([1, 1, 1]);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[560px] gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9C8]">
      {/* Escape Room Main Interactive Chamber */}
      <div className="flex-1 flex flex-col relative rounded-xl bg-gradient-to-b from-[#2B231D] via-[#3A3027] to-[#1E1712] border border-[#524438] overflow-hidden text-[#EADBCC] min-h-[440px]">
        {/* Stage Progress Header */}
        <div className="p-3.5 bg-black/40 backdrop-blur-xs border-b border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#D5B895]">움집 탈출 단계:</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] ${currentStage === 1 ? 'bg-[#C2410C] text-white font-bold' : currentStage > 1 ? 'bg-[#2D6A4F] text-white' : 'bg-white/10 text-stone-400'}`}>
                1. 불씨 피우기
              </span>
              <span className="text-stone-500">→</span>
              <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] ${currentStage === 2 ? 'bg-[#C2410C] text-white font-bold' : currentStage > 2 ? 'bg-[#2D6A4F] text-white' : 'bg-white/10 text-stone-400'}`}>
                2. 암각화 암호
              </span>
              <span className="text-stone-500">→</span>
              <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] ${currentStage === 3 ? 'bg-[#C2410C] text-white font-bold' : currentStage > 3 ? 'bg-[#2D6A4F] text-white' : 'bg-white/10 text-stone-400'}`}>
                3. 빗장 열기
              </span>
            </div>
          </div>

          <button
            onClick={() => setHintOpen(!hintOpen)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-[#E3D4C3] bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>단서 힌트</span>
          </button>
        </div>

        {/* Dynamic Clue Card */}
        {hintOpen && (
          <div className="bg-[#42352B] p-3 text-xs border-b border-white/10 text-[#F5EDE3] leading-relaxed">
            <span className="font-bold text-[#EAA16E]">💡 선사시대 탈출 일지:</span>{' '}
            {currentStage === 1 && '차가운 부싯돌 두 개를 빠르게 부딪혀 불꽃 5번을 튀기면 마른 억새풀에 불씨가 붙습니다.'}
            {currentStage === 2 && '바닥에 새겨진 단서: "태양(낮) 아래 사슴을 쫓고, 강가에서 물고기를 잡은 뒤 숲속 멧돼지를 만나 제사를 지냈다." 순서대로 그림을 누르세요.'}
            {currentStage === 3 && '움집 기둥에 새겨진 빗금 표시: "/// | / | ////" -> 숫자로 3, 1, 4 로 홈을 맞추면 빗장이 풀립니다.'}
            {currentStage === 4 && '축하합니다! 문이 열렸습니다.'}
          </div>
        )}

        {/* Stage Content */}
        <div className="flex-1 flex items-center justify-center p-6 relative">
          {/* Stage 1: Flint Fire */}
          {currentStage === 1 && (
            <div className="max-w-md w-full text-center space-y-5">
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <div className={`w-28 h-28 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center ${fireLit ? 'border-amber-500 bg-amber-500/20 scale-110' : 'border-[#9E8B7A] bg-[#332A22]'}`}>
                  <Flame className={`w-14 h-14 transition-all ${fireLit ? 'text-amber-400 animate-bounce' : 'text-stone-500'}`} />
                </div>
                {fireLit && (
                  <div className="absolute inset-0 bg-radial from-amber-400/40 to-transparent blur-md pointer-events-none" />
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-[#FAF3EA] mb-1 font-serif-kr">
                  {fireLit ? '화덕에 따뜻한 불씨가 피어올랐습니다!' : '1단계: 부싯돌로 불씨 피우기'}
                </h3>
                <p className="text-xs text-[#BFAEA0]">
                  {fireLit
                    ? '움집 안이 밝아지며 숨겨진 벽면의 암각화가 드러납니다...'
                    : '부싯돌 버튼을 연속해서 터치하여 화덕에 불꽃을 튀겨보세요!'}
                </p>
              </div>

              {!fireLit && (
                <div className="space-y-3">
                  <div className="w-48 mx-auto bg-stone-700 h-2.5 rounded-full overflow-hidden border border-stone-600">
                    <div
                      className="bg-[#C2410C] h-full transition-all duration-200"
                      style={{ width: `${(sparksCount / 5) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={handleSparkClick}
                    className="px-6 py-3 bg-[#8C5D36] hover:bg-[#A36E41] active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg border border-[#B38054] transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    부싯돌 쾅 부딪히기 ({sparksCount}/5)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Stage 2: Petroglyph Puzzle */}
          {currentStage === 2 && (
            <div className="max-w-md w-full text-center space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#FAF3EA] mb-1 font-serif-kr">
                  2단계: 벽면 암각화 의례 암호 해독
                </h3>
                <p className="text-xs text-[#C5B3A3]">
                  바닥에 적힌 고대 사냥 의례 순서에 맞추어 암각화 문양을 순서대로 선택하세요.
                </p>
              </div>

              {/* Sequence Display Box */}
              <div className="flex justify-center gap-2 py-2">
                {[0, 1, 2, 3].map(idx => {
                  const selectedId = selectedSequence[idx];
                  const item = glyphsList.find(g => g.id === selectedId);
                  return (
                    <div
                      key={idx}
                      className={`w-14 h-12 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                        selectedId
                          ? 'bg-[#504033] border-[#C27D48] text-[#FBD7B0] shadow-sm'
                          : 'bg-black/30 border-white/10 text-stone-600'
                      }`}
                    >
                      {item ? item.label : idx + 1}
                    </div>
                  );
                })}
              </div>

              {glyphError && (
                <div className="text-xs font-bold text-rose-400 animate-shake">
                  순서가 올바르지 않습니다! 다시 시도하세요.
                </div>
              )}

              {/* Glyph Buttons */}
              <div className="grid grid-cols-2 gap-2.5 max-w-xs mx-auto">
                {glyphsList.map(glyph => {
                  const isChosen = selectedSequence.includes(glyph.id);
                  return (
                    <button
                      key={glyph.id}
                      onClick={() => handleGlyphClick(glyph.id)}
                      disabled={isChosen}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        isChosen
                          ? 'opacity-40 bg-stone-800 border-stone-700 cursor-not-allowed'
                          : 'bg-[#473B30] hover:bg-[#5C4D3E] border-[#786452] active:scale-95 shadow-md cursor-pointer'
                      }`}
                    >
                      <span className="text-xs font-extrabold text-[#FCD34D]">{glyph.label} 문양</span>
                      <span className="text-[10px] text-[#D1C2B0]">({glyph.hint})</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] text-[#A69383] bg-black/20 p-2 rounded-lg border border-white/5">
                단서: 낮의 <strong>태양</strong> 아래 <strong>사슴</strong>을 쫓고, 강가 <strong>물고기</strong> 후 숲의 <strong>멧돼지</strong>
              </div>
            </div>
          )}

          {/* Stage 3: Wooden Latch Notches */}
          {currentStage === 3 && (
            <div className="max-w-md w-full text-center space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#FAF3EA] mb-1 font-serif-kr">
                  3단계: 움집 나무 빗장 풀기
                </h3>
                <p className="text-xs text-[#C5B3A3]">
                  각 나무 핀의 홈 개수를 터치해 변경하여 빗장 암호(3 - 1 - 4)에 맞추세요.
                </p>
              </div>

              {/* Pin Adjusters */}
              <div className="flex justify-center items-center gap-4 py-4">
                {pins.map((pinVal, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] text-stone-400 font-mono">핀 {idx + 1}</span>
                    <button
                      onClick={() => handleAdjustPin(idx)}
                      className="w-16 h-20 rounded-xl bg-gradient-to-b from-[#694F38] to-[#453323] hover:from-[#7C5F44] border-2 border-[#947455] text-amber-200 font-bold text-2xl shadow-lg flex flex-col items-center justify-center active:scale-95 transition-all"
                    >
                      <span>{pinVal}</span>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: pinVal }).map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-amber-400 rounded-full" />
                        ))}
                      </div>
                    </button>
                    <span className="text-[10px] text-amber-200/70">터치 시 변경</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[#A69383] bg-black/20 p-2.5 rounded-lg border border-white/5 max-w-xs mx-auto">
                기둥 각인 힌트: /// (3) - / (1) - //// (4)
              </div>
            </div>
          )}

          {/* Stage 4: Escape Complete! */}
          {currentStage === 4 && (
            <div className="max-w-md w-full text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border-2 border-amber-500/50">
                <Unlock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#FBF6EE] font-serif-kr">
                움집 탈출 대성공!
              </h3>
              <p className="text-xs text-[#D8C7B5] leading-relaxed">
                빗장이 풀리며 고강선사유적공원의 눈부신 햇살이 쏟아져 들어옵니다!
                선사시대 지혜로 불씨를 피우고 암각화와 빗장을 모두 풀어냈습니다.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetGame}
                  className="px-5 py-2.5 text-xs font-semibold text-[#2C241D] bg-[#FAF3EA] hover:bg-white rounded-xl transition-all shadow-md"
                >
                  처음부터 다시 탈출하기
                </button>
              </div>
            </div>
          )}

          {/* 3이미지: 하단 둥근 관목 숲/움집 수풀 (바닥에 배치) */}
          <div className="absolute bottom-0 inset-x-0 z-0 pointer-events-none opacity-60">
            <PlantRow3 height={44} />
          </div>
        </div>
      </div>

      {/* Relic Guide & Historical Pit House Info */}
      <div className="w-full lg:w-80 flex flex-col gap-3">
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DFD3C2]">
          <h3 className="text-sm font-bold text-[#3D2F22] flex items-center gap-1.5 mb-2 font-serif-kr">
            <span className="w-2 h-2 rounded-full bg-[#C2410C]"></span>
            고강동 선사시대 움집 주거지
          </h3>
          <p className="text-xs text-[#7A6753] leading-relaxed mb-3">
            움집(竪穴住居)은 땅을 50~100cm 정도 깊이 파고 기둥을 세운 뒤 짚이나 억새로 지붕을 덮은 선사시대 주거 형태입니다.
          </p>

          <div className="space-y-2 text-xs text-[#5C4A3A]">
            <div className="p-2.5 bg-[#F4ECE0] rounded-lg border border-[#DFD3C2]">
              <strong className="block font-semibold text-[#3D2E20] mb-0.5">화덕자리 (爐址)</strong>
              <p className="text-[11px] text-[#715E4C]">
                움집 중앙에 강자갈을 둘러 불을 피우고 난방과 취사를 해결했습니다.
              </p>
            </div>
            <div className="p-2.5 bg-[#F4ECE0] rounded-lg border border-[#DFD3C2]">
              <strong className="block font-semibold text-[#3D2E20] mb-0.5">저장 구덩이</strong>
              <p className="text-[11px] text-[#715E4C]">
                식량과 종자를 서늘하게 보관하기 위해 바닥 모서리에 구덩이를 파고 빗살무늬토기를 묻어두었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Escape Mission Status */}
        <div className="bg-[#F4ECE0] p-3.5 rounded-xl border border-[#DFD3C2] text-xs text-[#594635] flex items-start gap-2.5">
          <Compass className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-[#3D2E20]">체험관 미션 안내</strong>
            <p className="text-[11px] text-[#695644] mt-0.5">
              탈출 완료 시 스탬프북에 &lsquo;선사 움집 생존가&rsquo; 스탬프가 찍힙니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
