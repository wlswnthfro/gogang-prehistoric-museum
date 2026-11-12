import React, { useRef, useEffect, useState } from 'react';
import { CustomCodeConfig, GameId } from '../../types/game';
import { RefreshCw, ExternalLink, Code2, AlertCircle } from 'lucide-react';

interface CustomCodeRunnerProps {
  gameId: GameId;
  config: CustomCodeConfig;
  onOpenEditor: () => void;
}

export const CustomCodeRunner: React.FC<CustomCodeRunnerProps> = ({
  gameId,
  config,
  onOpenEditor
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="w-full h-full min-h-[520px] flex flex-col bg-[#FAF7F2] rounded-2xl border border-[#E3D9C8] overflow-hidden">
      {/* Top Runner Utility Bar */}
      <div className="px-4 py-2.5 bg-[#F2ECE1] border-b border-[#DACBB9] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-[#3B2C1F]">
            사용자 커스텀 코드 실행 샌드박스
          </span>
          <span className="text-[11px] text-[#7A6652] hidden sm:inline">
            ({config.sourceType === 'iframe-url' ? '외부 URL 임베드' : 'HTML/JS 직접 렌더링'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="p-1.5 text-xs text-[#594635] hover:bg-[#E2D6C5] rounded-md transition-colors border border-[#DACBB9] flex items-center gap-1"
            title="새로고침"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">다시 로드</span>
          </button>
          <button
            onClick={onOpenEditor}
            className="px-2.5 py-1 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A4204] rounded-md transition-colors flex items-center gap-1 shadow-xs"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>코드 편집/교체</span>
          </button>
        </div>
      </div>

      {/* Runner Stage */}
      <div className="flex-1 relative bg-white">
        {config.sourceType === 'iframe-url' ? (
          config.iframeUrl ? (
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={config.iframeUrl}
              className="w-full h-full border-0"
              title="Custom Game Frame"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2]">
              <div className="w-12 h-12 rounded-full bg-[#FCE8D5] text-[#B45309] flex items-center justify-center mb-3">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#3B2C1F] mb-1">
                연결된 외부 URL이 없습니다
              </h4>
              <p className="text-xs text-[#705D4A] max-w-sm mb-4">
                상단의 [코드 편집/교체] 버튼을 눌러 연동하실 웹 게임의 URL 주소를 입력해주세요.
              </p>
              <button
                onClick={onOpenEditor}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#B45309] rounded-lg shadow-xs"
              >
                URL 입력하기
              </button>
            </div>
          )
        ) : (
          <iframe
            key={iframeKey}
            ref={iframeRef}
            srcDoc={config.htmlCode}
            className="w-full h-full border-0"
            title="Custom HTML Game Frame"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        )}
      </div>
    </div>
  );
};
