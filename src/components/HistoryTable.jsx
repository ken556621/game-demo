export default function HistoryTable({ history }) {
  return (
    <div className="bg-gradient-to-br from-red-900 to-red-800 border border-yellow-700/40 rounded-2xl p-4 shadow-lg">
      <h3 className="text-yellow-400 font-bold text-base mb-3 flex items-center gap-2">
        <span>📋</span> 抽獎紀錄
      </h3>
      {history.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">尚無紀錄</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-yellow-700/30">
                <th className="text-yellow-400/70 font-medium text-left py-1.5 pr-3">日期</th>
                <th className="text-yellow-400/70 font-medium text-left py-1.5 pr-3">結果</th>
                <th className="text-yellow-400/70 font-medium text-left py-1.5">獎項</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.id} className="border-b border-red-800/50 last:border-0">
                  <td className="text-gray-300 py-2 pr-3 whitespace-nowrap">{row.date}</td>
                  <td className="py-2 pr-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.won ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      {row.won ? '🎉' : '😢'} {row.result}
                    </span>
                  </td>
                  <td className={`py-2 font-medium ${row.won ? 'text-green-400' : 'text-gray-500'}`}>
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
