export type GameId = 'pottery-3d' | 'stone-knife' | 'escape-room' | 'custom-bow';

export type TabId = 'all' | GameId | 'code-manager' | 'stamp-tour' | 'guide';

export type CodeSourceType = 'built-in' | 'html-code' | 'iframe-url';

export interface CustomCodeConfig {
  sourceType: CodeSourceType;
  htmlCode: string;
  iframeUrl: string;
}

export interface GameMetadata {
  id: GameId;
  title: string;
  shortDesc: string;
  description: string;
  era: '신석기 시대' | '청동기 시대' | '선사 종합';
  relic: string; // 주요 유물 (예: 빗살무늬토기, 반달돌칼, 뗀석기, 간돌화살촉)
  targetAge: string;
  difficulty: '쉬움' | '보통' | '도전';
  color: string;
  thumbnailUrl: string;
  tags: string[];
}
