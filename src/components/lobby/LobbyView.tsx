import React, { useState } from 'react';
import { GAMES_DATA } from '../../data/games';
import { GameCard } from './GameCard';
import { GameId } from '../../types/game';
import { useGame } from '../../context/GameContext';
import {
  Sparkles,
  Search,
  Code2,
  Compass,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  PlusCircle
} from 'lucide-react';

interface LobbyViewProps {
  categoryFilter: string;
  onOpenCodeSettings: (id: GameId) => void;
  onOpenStampModal: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  categoryFilter,
  onOpenCodeSettings,
  onOpenStampModal
}) => {
  const { setActiveTab } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEraFilter, setActiveEraFilter] = useState<'all' | 'neolithic' | 'bronze'>('all');

  // Filter games based on search & category
  const filteredGames = GAMES_DATA.filter(game => {
    // text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchDesc = game.description.toLowerCase().includes(q);
      const matchRelic = game.relic.toLowerCase().includes(q);
      const matchTags = game.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchRelic && !matchTags) return false;
    }

    // era filter
    if (activeEraFilter === 'neolithic' && game.era !== '신석기 시대') return false;
    if (activeEraFilter === 'bronze' && game.era !== '청동기 시대') return false;

    // sidebar category
    if (categoryFilter === 'neolithic' && game.era !== '신석기 시대') return false;
    if (categoryFilter === 'bronze' && game.era !== '청동기 시대') return false;
    if (categoryFilter === 'puzzle' && !['pottery-3d', 'escape-room'].includes(game.id)) return false;
    if (categoryFilter === 'action' && !['stone-knife', 'custom-bow'].includes(game.id)) return false;

    return true;
  });

  return (
    <div className="space-y-5">
      {/* Featured Banner (Nostalgic game portal featured bar translated to museum style) */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#8C5D36] via-[#B45309] to-[#854D0E] text-white p-6 md:p-8 shadow-sm overflow-hidden border border-[#D5BFA8]">
        {/* Decorative Prehistoric background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs rounded-full border border-white/20">
              고강선사유적체험관 대표 체험
            </span>
            <span className="text-xs text-amber-100 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> 터치 인터랙티브 지원
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold font-serif-kr mb-2 text-[#FFF7ED]">
            선사시대로 떠나는 타임머신 인터랙티브
          </h2>

          <p className="text-xs md:text-sm text-amber-100 leading-relaxed mb-5 max-w-xl">
            고강동 선사유적에서 발굴된 빗살무늬토기 3D 복원부터 청동기 반달돌칼 수확, 움집 미스터리 방탈출과 나만의 활 제작까지 직접 만지고 체험해보세요!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('pottery-3d')}
              className="px-5 py-2.5 bg-white text-[#8C5D36] hover:bg-[#FFF7ED] rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 flex items-center gap-2"
            >
              <span>3D 토기 조각 맞추기 시작</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenStampModal}
              className="px-4 py-2.5 bg-black/20 hover:bg-black/30 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition-all border border-white/20 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>스탬프 여권 확인</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E3D9C8] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        {/* Era Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#EFE8DC] rounded-xl border border-[#D8C7B4] w-full sm:w-auto">
          <button
            onClick={() => setActiveEraFilter('all')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeEraFilter === 'all'
                ? 'bg-white text-[#B45309] shadow-xs'
                : 'text-[#63503E] hover:text-[#2C241D]'
            }`}
          >
            전체 유물
          </button>
          <button
            onClick={() => setActiveEraFilter('neolithic')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeEraFilter === 'neolithic'
                ? 'bg-white text-[#B45309] shadow-xs'
                : 'text-[#63503E] hover:text-[#2C241D]'
            }`}
          >
            신석기 시대
          </button>
          <button
            onClick={() => setActiveEraFilter('bronze')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeEraFilter === 'bronze'
                ? 'bg-white text-[#B45309] shadow-xs'
                : 'text-[#63503E] hover:text-[#2C241D]'
            }`}
          >
            청동기 시대
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E8B7A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="체험 유물 또는 키워드 검색..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#D8C7B4] rounded-xl text-xs text-[#2C241D] placeholder:text-[#9E8B7A] focus:outline-none focus:ring-2 focus:ring-[#B45309]"
          />
        </div>
      </div>

      {/* Activities Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#2C241D] font-serif-kr">
              선사 인터랙티브 체험 프로그램
            </h3>
            <span className="text-xs text-[#7A6753]">
              (총 {filteredGames.length}개 선택 가능)
            </span>
          </div>
          <span className="text-xs text-[#8C765F] hidden sm:inline">
            원하는 체험 카드를 터치하여 플레이하세요
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onOpenCodeSettings={onOpenCodeSettings}
            />
          ))}
        </div>
      </div>

      {/* Developer Drop-in Information Banner */}
      <div className="bg-[#FAF7F2] p-5 rounded-2xl border-2 border-dashed border-[#D8C7B4] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#EAE0D1] text-[#7A4B22] flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#3B2C1F] font-serif-kr flex items-center gap-1.5">
              준비해 오신 게임 코드를 바로 넣고 싶으신가요?
            </h4>
            <p className="text-xs text-[#6B5948] mt-1 leading-relaxed">
              각 체험 카드의 <code className="px-1.5 py-0.5 bg-white border border-[#D8C7B4] rounded font-mono text-[11px] text-[#A74C13]">&lt;/&gt;</code> 버튼이나 상단 <strong>&apos;내 코드 연결&apos;</strong> 탭을 누르면, 짜오신 HTML / JavaScript 코드를 붙여넣거나 외부 URL을 연동하여 태블릿 프레임 안에서 즉시 실행할 수 있습니다.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('code-manager')}
          className="px-4 py-2.5 text-xs font-bold text-white bg-[#8C5D36] hover:bg-[#784E2B] rounded-xl transition-all whitespace-nowrap shadow-xs shrink-0"
        >
          코드 연결 관리소 이동 →
        </button>
      </div>
    </div>
  );
};
