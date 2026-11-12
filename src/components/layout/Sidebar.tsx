import React from 'react';
import { useGame } from '../../context/GameContext';
import { TabId } from '../../types/game';
import {
  Compass,
  Sparkles,
  Award,
  Layers,
  Code2,
  Calendar,
  MapPin,
  ChevronRight,
  Flame,
  Wheat,
  Target
} from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenStampModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenStampModal
}) => {
  const { activeTab, setActiveTab, stamps } = useGame();

  const totalStamps = Object.values(stamps).filter(Boolean).length;

  const categories = [
    { id: 'all', label: '전체 선사체험', icon: '🏛️', count: 4 },
    { id: 'neolithic', label: '신석기 시대 유물', icon: '🏺', count: 2 },
    { id: 'bronze', label: '청동기 시대 유물', icon: '🌾', count: 2 },
    { id: 'puzzle', label: '복원 & 탈출 퍼즐', icon: '🧩', count: 2 },
    { id: 'action', label: '수확 & 사격 액션', icon: '🏹', count: 2 },
    { id: 'custom-slot', label: '내 코드 연결 슬롯', icon: '🛠️', count: 4 },
  ];

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-3 select-none">
      {/* Category Box (Inspired by the Kids portal sidebar in user image) */}
      <div className="bg-[#FAF7F2] rounded-2xl border border-[#E3D9C8] overflow-hidden shadow-xs">
        {/* Category Header */}
        <div className="p-3 bg-gradient-to-r from-[#B45309] to-[#8C430B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-200" />
            <h3 className="text-xs font-bold font-serif-kr">체험 카테고리</h3>
          </div>
          <span className="text-[10px] text-amber-100 font-mono">고강선사체험</span>
        </div>

        {/* Category Items */}
        <div className="p-2 space-y-1">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id && activeTab === 'all';
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'custom-slot') {
                    setActiveTab('code-manager');
                  } else {
                    setActiveTab('all');
                    onSelectCategory(cat.id);
                  }
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#EFE5D7] text-[#B45309] font-bold shadow-xs border border-[#DFCEBD]'
                    : 'text-[#63503E] hover:bg-[#F2ECE1] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-mono text-[#9C8A78] group-hover:text-[#B45309]">
                    {cat.count}
                  </span>
                  <ChevronRight className="w-3 h-3 text-[#BFAEA0] group-hover:text-[#B45309] transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stamp Progress Widget */}
      <div
        onClick={onOpenStampModal}
        className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E3D9C8] hover:border-[#BA9A7C] transition-all cursor-pointer shadow-xs group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#B45309]" />
            <span className="text-xs font-bold text-[#3B2C1F] font-serif-kr">
              선사 탐험 스탬프 여권
            </span>
          </div>
          <span className="text-xs font-bold text-[#B45309] font-mono">
            {totalStamps} / 4 완료
          </span>
        </div>

        <div className="w-full bg-[#EAE0D1] h-2 rounded-full overflow-hidden mb-3">
          <div
            className="bg-[#B45309] h-full transition-all duration-500"
            style={{ width: `${(totalStamps / 4) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${stamps['pottery-3d'] ? 'bg-[#D1E7DD] border-[#BADBCC] text-[#0F5132]' : 'bg-[#F2ECE1] border-[#DFD3C2] text-stone-400'}`}>
            🏺 토기
          </div>
          <div className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${stamps['stone-knife'] ? 'bg-[#D1E7DD] border-[#BADBCC] text-[#0F5132]' : 'bg-[#F2ECE1] border-[#DFD3C2] text-stone-400'}`}>
            🌾 돌칼
          </div>
          <div className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${stamps['escape-room'] ? 'bg-[#D1E7DD] border-[#BADBCC] text-[#0F5132]' : 'bg-[#F2ECE1] border-[#DFD3C2] text-stone-400'}`}>
            🛖 움집
          </div>
          <div className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${stamps['custom-bow'] ? 'bg-[#D1E7DD] border-[#BADBCC] text-[#0F5132]' : 'bg-[#F2ECE1] border-[#DFD3C2] text-stone-400'}`}>
            🏹 활
          </div>
        </div>

        <div className="mt-2 text-center text-[10px] text-[#786653] group-hover:text-[#B45309]">
          4개 모두 모으면 명예 고고학자 수료증 발급 →
        </div>
      </div>

      {/* Relic Site Info Card */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E3D9C8] text-xs text-[#5C4A39] shadow-xs">
        <h4 className="font-bold text-[#3B2C1F] flex items-center gap-1.5 mb-2 font-serif-kr">
          <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
          고강동 선사유적지 안내
        </h4>
        <p className="text-[11px] text-[#715E4C] leading-relaxed mb-3">
          경기도 부천시 고강동 청룡산 정상부에 위치한 선사 유적으로, 한반도 중부지방의 청동기시대 대규모 제사 유적인 적석환구유구가 최초로 발견된 곳입니다.
        </p>
        <div className="text-[10px] text-[#8C765F] space-y-1 bg-[#F4ECE0] p-2.5 rounded-xl border border-[#DFD3C2]">
          <div>📍 위치: 부천시 오정구 고강동 산90-1</div>
          <div>⏱️ 운영: 화~일 09:30 - 17:30</div>
          <div>🎫 입장: 무료 (태블릿 체험 자유 이용)</div>
        </div>
      </div>
    </aside>
  );
};
