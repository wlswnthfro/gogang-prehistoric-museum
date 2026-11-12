import React from 'react';

export type DinosaurColor = 'green' | 'amber' | 'blue' | 'pink';

interface CuteDinosaurProps {
  color?: DinosaurColor;
  className?: string;
  width?: number;
  height?: number;
  flipX?: boolean;
  style?: React.CSSProperties;
}

export const CuteDinosaur: React.FC<CuteDinosaurProps> = ({
  color = 'green',
  className = '',
  width = 110,
  height = 95,
  flipX = false,
  style = {}
}) => {
  // Color themes adapted to match KidsZzang warm aesthetic
  const palette = {
    green: {
      body: '#42AB58',
      shadowBody: '#318F45',
      belly: '#FAF4D0',
      spots: '#348B47',
      outline: '#1F3F24',
      bellyOutline: '#8DAF77',
      eye: '#1C2E1F',
      cheek: '#F87171'
    },
    amber: {
      body: '#F59E0B',
      shadowBody: '#D97706',
      belly: '#FFFBEB',
      spots: '#D97706',
      outline: '#78350F',
      bellyOutline: '#DDA260',
      eye: '#451A03',
      cheek: '#FB7185'
    },
    blue: {
      body: '#38BDF8',
      shadowBody: '#0284C7',
      belly: '#F0F9FF',
      spots: '#0284C7',
      outline: '#0C4A6E',
      bellyOutline: '#7DD3FC',
      eye: '#082F49',
      cheek: '#FDA4AF'
    },
    pink: {
      body: '#F472B6',
      shadowBody: '#DB2777',
      belly: '#FFF1F2',
      spots: '#DB2777',
      outline: '#831843',
      bellyOutline: '#F9A8D4',
      eye: '#4C0519',
      cheek: '#F43F5E'
    }
  }[color];

  return (
    <div
      className={`inline-block select-none pointer-events-none transition-transform duration-300 ${className}`}
      style={{
        width,
        height,
        transform: flipX ? 'scaleX(-1)' : undefined,
        ...style
      }}
    >
      <svg
        viewBox="0 0 170 145"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background / Far-side Legs (Darker shade for depth) */}
        {/* Back Far Leg */}
        <path
          d="M 108 90 L 108 114 C 108 119 119 119 119 114 L 119 92 Z"
          fill={palette.shadowBody}
          stroke={palette.outline}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Front Far Leg */}
        <path
          d="M 62 90 L 62 114 C 62 119 72 119 72 114 L 72 94 Z"
          fill={palette.shadowBody}
          stroke={palette.outline}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Main Dinosaur Body & Tail & Head */}
        <path
          d="M 112 88
             C 122 88, 136 78, 148 64
             C 152 59, 154 57, 154 57
             C 152 64, 142 84, 132 96
             C 126 102, 118 103, 110 102
             L 100 102
             C 86 102, 70 100, 60 96
             C 48 92, 40 76, 36 60
             C 34 54, 30 48, 25 46
             C 20 44, 18 36, 22 30
             C 25 25, 33 24, 38 27
             C 41 24, 46 24, 49 27
             C 54 24, 60 26, 62 33
             C 64 40, 60 48, 56 56
             C 52 65, 54 75, 62 82
             C 72 80, 88 80, 102 82
             C 106 84, 110 86, 112 88
             Z"
          fill={palette.body}
          stroke={palette.outline}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Cream Belly & Throat Patch */}
        <path
          d="M 36 60
             C 34 54, 30 48, 25 46
             C 23 45, 23 48, 25 50
             C 29 55, 35 68, 38 78
             C 42 88, 52 98, 66 100
             C 78 102, 95 102, 110 100
             C 118 99, 126 95, 132 96
             C 126 92, 116 88, 104 88
             C 90 88, 76 88, 66 84
             C 56 80, 48 70, 44 58
             L 36 60
             Z"
          fill={palette.belly}
          stroke={palette.outline}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Subtle spots on the back */}
        <ellipse cx="82" cy="83" rx="4.5" ry="2.2" fill={palette.spots} opacity="0.8" />
        <ellipse cx="94" cy="84" rx="4.8" ry="2.2" fill={palette.spots} opacity="0.8" />
        <ellipse cx="106" cy="86" rx="4" ry="2" fill={palette.spots} opacity="0.8" />

        {/* Foreground Near Legs */}
        {/* Front Near Leg */}
        <path
          d="M 68 93 L 68 116 C 68 121 80 121 80 116 L 80 96 Z"
          fill={palette.body}
          stroke={palette.outline}
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        {/* Back Near Leg */}
        <path
          d="M 100 93 L 100 116 C 100 121 112 121 112 116 L 112 96 Z"
          fill={palette.body}
          stroke={palette.outline}
          strokeWidth="3.8"
          strokeLinejoin="round"
        />

        {/* Toe Details on Near Legs */}
        <path d="M 72 116 L 72 112" stroke={palette.outline} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 76 116 L 76 112" stroke={palette.outline} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 104 116 L 104 112" stroke={palette.outline} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 108 116 L 108 112" stroke={palette.outline} strokeWidth="2.5" strokeLinecap="round" />

        {/* Nostrils */}
        <ellipse cx="26" cy="36" rx="1.8" ry="2.5" fill={palette.eye} />
        <ellipse cx="32" cy="36" rx="1.8" ry="2.5" fill={palette.eye} />

        {/* Big Cute Eye */}
        <circle cx="51" cy="36" r="4.8" fill={palette.eye} />
        {/* Shiny Catchlight */}
        <circle cx="52.8" cy="34.2" r="1.8" fill="#FFFFFF" />

        {/* Friendly Smiling Mouth */}
        <path
          d="M 28 44 Q 38 48 44 42"
          fill="none"
          stroke={palette.outline}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Cheek Crease */}
        <path
          d="M 44 40 Q 45 42 43 44"
          fill="none"
          stroke={palette.outline}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Soft Rosy Cheek Blush */}
        <ellipse cx="44" cy="45" rx="3.5" ry="2" fill={palette.cheek} opacity="0.45" />

        {/* Ground shadow beneath feet */}
        <ellipse cx="90" cy="120" rx="42" ry="3" fill="#B4A08A" opacity="0.4" />
      </svg>
    </div>
  );
};
