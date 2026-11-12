import React from 'react';

// 1이미지: 상단 노란 꽃/열매 수풀 (벼 수확게임에 적용)
export const PlantRow1: React.FC<{ className?: string; height?: number | string }> = ({
  className = '',
  height = 42
}) => {
  return (
    <div
      className={`w-full overflow-hidden relative select-none pointer-events-none ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div
        className="w-full h-full bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: "url('/assets/aistudio/image_677edd98.png')",
          backgroundSize: '100% 320%',
          backgroundPosition: 'center 4%',
        }}
      />
    </div>
  );
};

// 2이미지: 중간 뾰족한 잔디/초원 (커스텀 활게임에 적용)
export const PlantRow2: React.FC<{ className?: string; height?: number | string }> = ({
  className = '',
  height = 42
}) => {
  return (
    <div
      className={`w-full overflow-hidden relative select-none pointer-events-none ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div
        className="w-full h-full bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: "url('/assets/aistudio/image_677edd98.png')",
          backgroundSize: '100% 330%',
          backgroundPosition: 'center 50%',
        }}
      />
    </div>
  );
};

// 3이미지: 하단 둥근 관목 숲/움집 수풀 (방탈출 게임에 적용)
export const PlantRow3: React.FC<{ className?: string; height?: number | string }> = ({
  className = '',
  height = 42
}) => {
  return (
    <div
      className={`w-full overflow-hidden relative select-none pointer-events-none ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div
        className="w-full h-full bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage: "url('/assets/aistudio/image_677edd98.png')",
          backgroundSize: '100% 320%',
          backgroundPosition: 'center 96%',
        }}
      />
    </div>
  );
};
