import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameId, TabId, CustomCodeConfig } from '../types/game';

interface GameContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  stamps: Record<GameId, boolean>;
  awardStamp: (id: GameId) => void;
  resetStamps: () => void;
  customConfigs: Record<GameId, CustomCodeConfig>;
  updateCustomConfig: (id: GameId, config: Partial<CustomCodeConfig>) => void;
  resetCustomConfig: (id: GameId) => void;
  isKioskFullscreen: boolean;
  toggleFullscreen: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: 'click' | 'success' | 'stamp' | 'shoot') => void;
}

const DEFAULT_CONFIGS: Record<GameId, CustomCodeConfig> = {
  'pottery-3d': {
    sourceType: 'built-in',
    htmlCode: `<!-- 3D 토기 조각 맞추기 커스텀 코드 슬롯 -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; background: #FAF7F2; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; color: #5B4734; }
    .box { text-align: center; padding: 30px; border: 2px dashed #CBBBA6; border-radius: 16px; background: white; max-width: 500px; }
    h2 { margin-top: 0; color: #8A532B; }
    p { line-height: 1.6; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🏺 3D 토기 조각 맞추기 커스텀 슬롯</h2>
    <p>준비하신 토기 맞추기 코드(HTML / Three.js / iframe)를 이곳에 붙여넣으시면 이 자리에서 실시간으로 실행됩니다!</p>
  </div>
</body>
</html>`,
    iframeUrl: ''
  },
  'stone-knife': {
    sourceType: 'built-in',
    htmlCode: `<!-- 반달돌칼 게임 커스텀 코드 슬롯 -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; background: #F8F4EC; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; color: #4A3B2C; }
    .box { text-align: center; padding: 30px; border: 2px dashed #D1C3B2; border-radius: 16px; background: white; max-width: 500px; }
    h2 { margin-top: 0; color: #854D0E; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🌾 반달돌칼 게임 커스텀 슬롯</h2>
    <p>준비하신 반달돌칼 게임 코드를 붙여넣으시면 즉시 연동됩니다.</p>
  </div>
</body>
</html>`,
    iframeUrl: ''
  },
  'escape-room': {
    sourceType: 'built-in',
    htmlCode: `<!-- 방탈출 게임 커스텀 코드 슬롯 -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; background: #2A241F; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; color: #EDE5D8; }
    .box { text-align: center; padding: 30px; border: 2px dashed #8C6D46; border-radius: 16px; background: #38302A; max-width: 500px; }
    h2 { margin-top: 0; color: #E08442; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🛖 방탈출 게임 커스텀 슬롯</h2>
    <p>준비하신 방탈출 게임 코드를 이곳에 넣어보세요.</p>
  </div>
</body>
</html>`,
    iframeUrl: ''
  },
  'custom-bow': {
    sourceType: 'built-in',
    htmlCode: `<!-- 커스텀 활게임 커스텀 코드 슬롯 -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; background: #F4EFE6; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; color: #2C241D; }
    .box { text-align: center; padding: 30px; border: 2px dashed #93A899; border-radius: 16px; background: white; max-width: 500px; }
    h2 { margin-top: 0; color: #2D6A4F; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🏹 커스텀 활게임 커스텀 슬롯</h2>
    <p>준비하신 활 쏘기 / 커스텀 게임 코드를 붙여넣으시면 동작합니다.</p>
  </div>
</body>
</html>`,
    iframeUrl: ''
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<TabId>('all');

  // Clear hash on mount to prevent getting trapped in a game screen
  useEffect(() => {
    if (window.location.hash) {
      try {
        history.replaceState(null, '', window.location.pathname);
      } catch {
        window.location.hash = '';
      }
    }
  }, []);

  const [stamps, setStamps] = useState<Record<GameId, boolean>>(() => {
    try {
      const saved = localStorage.getItem('gogang_stamps');
      return saved ? JSON.parse(saved) : {
        'pottery-3d': false,
        'stone-knife': false,
        'escape-room': false,
        'custom-bow': false,
      };
    } catch {
      return {
        'pottery-3d': false,
        'stone-knife': false,
        'escape-room': false,
        'custom-bow': false,
      };
    }
  });

  const [customConfigs, setCustomConfigs] = useState<Record<GameId, CustomCodeConfig>>(() => {
    try {
      const saved = localStorage.getItem('gogang_custom_configs');
      return saved ? { ...DEFAULT_CONFIGS, ...JSON.parse(saved) } : DEFAULT_CONFIGS;
    } catch {
      return DEFAULT_CONFIGS;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isKioskFullscreen, setIsKioskFullscreen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('gogang_stamps', JSON.stringify(stamps));
    } catch {
      // ignore
    }
  }, [stamps]);

  useEffect(() => {
    try {
      localStorage.setItem('gogang_custom_configs', JSON.stringify(customConfigs));
    } catch {
      // ignore
    }
  }, [customConfigs]);

  const setActiveTab = (tab: TabId) => {
    setActiveTabState(tab);
    try {
      if (tab === 'all') {
        history.replaceState(null, '', window.location.pathname);
      } else {
        window.location.hash = tab;
      }
    } catch {
      // ignore
    }
    playSound('click');
  };

  const awardStamp = (id: GameId) => {
    setStamps(prev => {
      if (prev[id]) return prev;
      playSound('stamp');
      return { ...prev, [id]: true };
    });
  };

  const resetStamps = () => {
    setStamps({
      'pottery-3d': false,
      'stone-knife': false,
      'escape-room': false,
      'custom-bow': false,
    });
    playSound('click');
  };

  const updateCustomConfig = (id: GameId, config: Partial<CustomCodeConfig>) => {
    setCustomConfigs(prev => ({
      ...prev,
      [id]: { ...prev[id], ...config }
    }));
  };

  const resetCustomConfig = (id: GameId) => {
    setCustomConfigs(prev => ({
      ...prev,
      [id]: DEFAULT_CONFIGS[id]
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsKioskFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsKioskFullscreen(false);
    }
    playSound('click');
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const playSound = (type: 'click' | 'success' | 'stamp' | 'shoot') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'stamp' || type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.08); // C#5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.16); // E5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.24);    // A5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } else if (type === 'shoot') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch {
      // AudioContext may be restricted by browser before user interaction
    }
  };

  return (
    <GameContext.Provider
      value={{
        activeTab,
        setActiveTab,
        stamps,
        awardStamp,
        resetStamps,
        customConfigs,
        updateCustomConfig,
        resetCustomConfig,
        isKioskFullscreen,
        toggleFullscreen,
        soundEnabled,
        toggleSound,
        playSound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
