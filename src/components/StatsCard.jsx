function maskPhone(phone) {
  return phone.replace(/(\d{4})\d{3}(\d{3})/, '$1***$2');
}

export default function StatsCard({ user }) {
  const winRate = Math.round((user.referrals.length / user.totalSlots) * 100);

  return (
    <div className="game-card stats-card bg-gradient-to-br from-red-900 to-red-800 border border-yellow-700/40 rounded-3xl shadow-lg">
      <div className="stats-grid grid grid-cols-2">
        <div className="stat-tile bg-red-950/50 rounded-2xl">
          <p className="text-yellow-400/70 text-xs mb-1">姓名</p>
          <p className="text-white font-bold truncate">{user.name}</p>
        </div>
        <div className="stat-tile bg-red-950/50 rounded-2xl">
          <p className="text-yellow-400/70 text-xs mb-1">手機</p>
          <p className="text-white font-mono text-sm">{maskPhone(user.phone)}</p>
        </div>
        <div className="stat-tile bg-red-950/50 rounded-2xl">
          <p className="text-yellow-400/70 text-xs mb-1">介紹成交</p>
          <p className="text-yellow-400 font-bold text-xl">{user.referrals.length} <span className="text-white text-sm font-normal">人</span></p>
        </div>
        <div className="stat-tile bg-red-950/50 rounded-2xl">
          <p className="text-yellow-400/70 text-xs mb-1">中獎機率</p>
          <p className="text-green-400 font-bold text-xl">{winRate}<span className="text-white text-sm font-normal">%</span></p>
        </div>
      </div>
    </div>
  );
}
