export default function HistoryTable({ history }) {
  return (
    <div className="bg-gradient-to-br from-red-900 to-red-800 border border-yellow-700/40 rounded-3xl p-5 shadow-lg">
      <h3 className="text-yellow-400 font-bold text-base mb-4 flex items-center gap-2.5">
        <span>📋</span> 抽獎紀錄
      </h3>
      {history.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">尚無紀錄</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-yellow-700/30">
                <th className="text-yellow-400/70 font-medium text-left py-2 pr-4">日期</th>
                <th className="text-yellow-400/70 font-medium text-left py-2 pr-4">結果</th>
                <th className="text-yellow-400/70 font-medium text-left py-2">獎項</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.id} className="border-b border-red-800/50 last:border-0">
                  <td className="text-gray-300 py-3 pr-4 whitespace-nowrap">{row.date}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.won ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      {row.won ? '🎉' : '😢'} {row.result}
                    </span>
                  </td>
                  <td className={`py-3 font-medium ${row.won ? 'text-green-400' : 'text-gray-500'}`}>
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
