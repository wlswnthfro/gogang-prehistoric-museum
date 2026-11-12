import React from 'react';
import { GameId } from '../../types/game';
import { X, Play } from 'lucide-react';

interface CuteGuideModalProps {
  gameId: GameId | null;
  onClose: () => void;
  onStartGame: (id: GameId) => void;
}

export const CuteGuideModal: React.FC<CuteGuideModalProps> = ({
  gameId,
  onClose,
  onStartGame,
}) => {
  if (!gameId) return null;

  const getGuideContent = () => {
    switch (gameId) {
      case 'pottery-3d':
        return {
          title: '3D 토기 조각 맞추기',
          icon: '🏺',
          tag: '신석기 빗살무늬토기',
          tip: '깨진 토기 조각을 터치해서 원래 모양대로 알맞게 맞춰보세요! 360도로 돌려보며 완성할 수 있어요.',
          color: '#B45309'
        };
      case 'stone-knife':
        return {
          title: '반달돌칼 게임',
          icon: '🌾',
          tag: '청동기 가을 수확',
          tip: '가운데 구멍에 손가락을 쏙 끼우고! 황금빛 볏이삭이 익었을 때 싹둑 잘라 바구니에 담아보세요.',
          color: '#D97706'
        };
      case 'escape-room':
        return {
          title: '방탈출 게임',
          icon: '🛖',
          tag: '선사시대 움집 탈출',
          tip: '부싯돌을 부딪쳐 따뜻한 불씨를 피우고, 벽에 그려진 동물 암각화 암호를 풀어 빗장을 여세요!',
          color: '#E11D48'
        };
      case 'custom-bow':
        return {
          title: '커스텀 활게임',
          icon: '🏹',
          tag: '나만의 활 & 과녁 사격',
          tip: '좋아하는 나무와 화살촉을 골라 나만의 멋진 활을 만든 뒤, 바람을 계산해서 과녁 정중앙을 맞추세요!',
          color: '#16A34A'
        };
    }
  };

  const content = getGuideContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FFFDF9] rounded-3xl border-4 border-[#B5804C] shadow-2xl max-w-sm w-full p-6 text-center relative select-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#EFE6D5] text-[#543415] hover:bg-[#E2D5C0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Cute Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FEF3C7] border-3 border-[#F59E0B] flex items-center justify-center text-4xl shadow-md mb-3">
          {content.icon}
        </div>

        {/* Title */}
        <div className="inline-block px-3 py-0.5 rounded-full bg-[#EFE6D5] text-[11px] font-bold text-[#705D4C] mb-1 font-jua">
          {content.tag}
        </div>
        <h3 className="text-2xl font-bold font-jua text-[#3C2E22] mb-3">
          {content.title}
        </h3>

        {/* Playful Instruction Box */}
        <div className="bg-[#F7F1E5] p-4 rounded-2xl border-2 border-[#DECDB8] mb-5 text-[#4A3B2C] text-sm font-medium leading-relaxed">
          {content.tip}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onStartGame(gameId)}
            className="flex-1 py-3 text-base font-bold text-white btn-wood rounded-2xl flex items-center justify-center gap-1.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>게임시작</span>
          </button>
        </div>
      </div>
    </div>
  );
};
