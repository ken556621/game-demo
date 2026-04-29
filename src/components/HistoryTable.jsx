export default function HistoryTable({ history }) {
  return (
    <div className="game-card history-card bg-gradient-to-br from-red-900 to-red-800 border border-yellow-700/40 rounded-3xl shadow-lg">
      <h3 className="history-title text-yellow-400 font-bold text-base flex items-center">
        <span>📋</span> 抽獎紀錄
      </h3>
      {history.length === 0 ? (
        <p className="empty-history text-gray-400 text-sm text-center">尚無紀錄</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="history-table w-full text-sm">
            <thead>
              <tr className="border-b border-yellow-700/30">
                <th className="text-yellow-400/70 font-medium text-left">日期</th>
                <th className="text-yellow-400/70 font-medium text-left">結果</th>
                <th className="text-yellow-400/70 font-medium text-left">獎項</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.id} className="border-b border-red-800/50 last:border-0">
                  <td className="text-gray-300 whitespace-nowrap">{row.date}</td>
                  <td>
                    <span className={`result-pill inline-flex items-center rounded-full text-xs font-medium ${
                      row.won ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      {row.won ? '🎉' : '😢'} {row.result}
                    </span>
                  </td>
                  <td className={`font-medium ${row.won ? 'text-green-400' : 'text-gray-500'}`}>
                    {row.prize}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
