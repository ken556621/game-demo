import Confetti from './Confetti';

export default function ResultModal({ result, onClose }) {
  if (!result) return null;

  const won = result.isNamed;

  return (
    <>
      <Confetti active={won} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}>
        <div className="modal-pop bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
          {/* Header banner */}
          <div className={`py-6 px-4 text-center ${won ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-gray-400 to-gray-600'}`}>
            <div className="text-6xl mb-2">{won ? '🎉' : '😢'}</div>
            <h2 className={`text-2xl font-bold ${won ? 'text-red-900' : 'text-white'}`}>
              {won ? '恭喜中獎！' : '很遺憾，未中獎'}
            </h2>
          </div>

          {/* Body */}
          <div className="p-6 text-center">
            {won ? (
              <>
                <p className="text-gray-600 text-sm mb-2">您透過以下好友的推薦獲得獎勵</p>
                <div className="inline-block bg-yellow-50 border-2 border-yellow-400 rounded-xl px-6 py-3 mb-4">
                  <p className="text-2xl font-bold text-yellow-700">{result.label}</p>
                  <p className="text-xs text-yellow-600 mt-0.5">推薦碼：{result.code}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 mb-4">
                  <p className="text-red-700 font-semibold text-sm">🎁 獎項：購物金 $500</p>
                </div>
                <p className="text-gray-500 text-xs">獎項將於 3 個工作天內發放至您的帳戶</p>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  繼續加油！介紹更多朋友<br />提升中獎機率！
                </p>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 text-sm">目前有 3 個好友格位 = 30% 中獎機率</p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all active:scale-95 ${
                won
                  ? 'bg-gradient-to-r from-red-700 to-yellow-600 text-white hover:from-red-600 hover:to-yellow-500'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {won ? '太棒了！' : '下次繼續加油'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
