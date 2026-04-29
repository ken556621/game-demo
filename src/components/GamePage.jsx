import { useState } from 'react';
import SpinWheel from './SpinWheel';
import ResultModal from './ResultModal';
import StatsCard from './StatsCard';
import HistoryTable from './HistoryTable';
import { mockHistory } from '../data/mockData';

export default function GamePage({ user, onLogout }) {
  const [spinsRemaining, setSpinsRemaining] = useState(user.spinsRemaining);
  const [lastResult, setLastResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState(mockHistory);
  const [winCount, setWinCount] = useState(mockHistory.filter(h => h.won).length);

  function handleSpinComplete(slot) {
    setSpinsRemaining(s => Math.max(0, s - 1));
    setLastResult(slot);
    setShowModal(true);

    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id: Date.now(),
      date: today,
      result: slot.isNamed ? slot.label : '未中獎',
      prize: slot.isNamed ? '購物金 $500' : '—',
      won: slot.isNamed,
    };
    setHistory(prev => [newEntry, ...prev]);
    if (slot.isNamed) setWinCount(c => c + 1);
  }

  const winRate = Math.round((user.referrals.length / user.totalSlots) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-red-900 to-yellow-950">
      {/* Header */}
      <header className="relative bg-red-950/80 backdrop-blur border-b border-yellow-700/30 px-5 py-4 flex items-center justify-end sticky top-0 z-20">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <span className="text-2xl">🎡</span>
          <span className="text-yellow-400 font-bold text-lg">幸運轉盤</span>
        </div>
        <button
          onClick={onLogout}
          className="text-yellow-400/70 text-sm hover:text-yellow-300 transition"
        >
          登出
        </button>
      </header>

      <main className="game-main">
        {/* Stats Card */}
        <StatsCard user={{ ...user, winCount }} />

        {/* Wheel section */}
        <div className="game-card wheel-card bg-gradient-to-br from-red-900 to-red-800 border border-yellow-700/40 rounded-3xl shadow-xl">
          <SpinWheel
            referrals={user.referrals}
            spinsRemaining={spinsRemaining}
            onSpinComplete={handleSpinComplete}
          />

          {/* Info below wheel */}
          <div className="wheel-info text-center">
            <p className="text-white text-sm">
              剩餘抽獎次數：
              <span className={`font-bold text-lg ml-1 ${spinsRemaining > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
                {spinsRemaining}
              </span>
              <span className="text-gray-300"> 次</span>
            </p>
            <p className="text-gray-300 text-sm">
              已介紹成交：
              <span className="text-yellow-400 font-bold"> {user.referrals.length} </span>
              人（共 {user.totalSlots} 格，中獎機率
              <span className="text-green-400 font-bold"> {winRate}% </span>）
            </p>
            {spinsRemaining === 0 && (
              <p className="notice-pill text-orange-400 text-xs bg-orange-900/30 rounded-xl inline-block">
                抽獎次數已用完，介紹更多朋友可獲得額外抽獎機會！
              </p>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="legend-card flex flex-wrap justify-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-yellow-600 border border-yellow-400 inline-block"></span>
            <span className="text-yellow-200">已介紹好友格位</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-red-700 inline-block"></span>
            <span className="text-yellow-200">空白格位</span>
          </div>
        </div>

        {/* History */}
        <HistoryTable history={history} />

        <p className="text-center text-red-900/50 text-xs pt-1 pb-4">© 2026 幸運轉盤活動</p>
      </main>

      {/* Modal */}
      {showModal && (
        <ResultModal
          result={lastResult}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
