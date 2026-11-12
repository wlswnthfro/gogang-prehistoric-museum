/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { KidsZzangLobby } from './components/lobby/KidsZzangLobby';
import { StampPassportModal } from './components/layout/StampPassportModal';

const MainAppContent: React.FC = () => {
  const [isStampModalOpen, setIsStampModalOpen] = useState(false);

  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col select-none">
      <KidsZzangLobby
        onOpenStampModal={() => setIsStampModalOpen(true)}
      />

      {/* Stamp Passport Modal */}
      <StampPassportModal
        isOpen={isStampModalOpen}
        onClose={() => setIsStampModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainAppContent />
    </GameProvider>
  );
}
