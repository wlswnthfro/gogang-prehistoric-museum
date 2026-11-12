import React from 'react';
import { useGame } from '../../context/GameContext';
import { TabId } from '../../types/game';
import {
  Compass,
  Maximize,
  Volume2,
  VolumeX,
  Code2,
  Award,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface HeaderProps {
  onOpenStampModal: () => void;
  onOpenGuideModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenStampModal, onOpenGuideModal }) => {
  const {
    activeTab,
    setActiveTab,
    toggleFullscreen,
    soundEnabled,
    toggleSound,
    stamps
  } = useGame();

  const totalStamps = Object.values(stamps).filter(Boolean).length;

  const navTabs: { id: TabId; label: string; icon?: string }[] = [
    { id: 'all', label: '전체 체험' },
    { id: 'pottery-3d', label: '3D 토기 조각 맞추기', icon: '🏺' },
    { id: 'stone-knife', label: '반달돌칼 게임', icon: '🌾' },
    { id: 'escape-room', label: '방탈출 게임', icon: '🛖' },
    { id: 'custom-bow', label: '커스텀 활게임', icon: '🏹' },
    { id: 'code-manager', label: '내 코드 연결', icon: '🛠️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2] border-b border-[#E3D9C8] shadow-xs select-none">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div
          onClick={() => setActiveTab('all')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B45309] to-[#78350F] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-[#FCECD8]" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-[#2C241D] font-serif-kr flex items-center gap-2">
              고강선사유적체험관
              <span className="hidden lg:inline-block text-[10px] font-sans font-semibold text-[#8C765F] border border-[#DACBB9] px-2 py-0.5 rounded-full bg-[#F4ECE0]">
                태블릿 키오스크 포털
              </span>
            </h1>
            <p className="text-[11px] text-[#786653] hidden sm:block">
              부천 고강동 선사유적 인터랙티브 체험 플랫폼
            </p>
          </div>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Stamp Tour Button */}
          <button
            onClick={onOpenStampModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#713F12] bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FCD34D] rounded-xl transition-all shadow-xs"
            title="스탬프 투어 및 수료증"
          >
            <Award className="w-4 h-4 text-[#B45309]" />
            <span className="hidden sm:inline">스탬프 여권</span>
            <span className="font-mono bg-[#B45309] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {totalStamps}/4
            </span>
          </button>

          {/* Guide Modal Trigger */}
          <button
            onClick={onOpenGuideModal}
            className="p-2 text-xs text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl border border-[#D8C7B4] transition-colors"
            title="체험관 이용 안내"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 text-xs text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl border border-[#D8C7B4] transition-colors"
            title={soundEnabled ? '효과음 켜짐' : '효과음 음소거'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#B45309]" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {/* Tablet Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-xs text-[#594635] bg-[#EFE8DC] hover:bg-[#E2D6C5] rounded-xl border border-[#D8C7B4] transition-colors"
            title="전체화면"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Bar (Scrollable for tablet touch) */}
      <div className="bg-[#F2ECE1] border-t border-[#E3D9C8] overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 py-1.5">
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#B45309] text-white shadow-xs'
                    : 'text-[#63503E] hover:text-[#2C241D] hover:bg-[#E6DEC\-C]'
                }`}
              >
                {tab.icon && <span>{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
