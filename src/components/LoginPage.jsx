import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = '請輸入姓名';
    if (!/^09\d{8}$/.test(phone)) e.phone = '請輸入有效手機號碼（09xxxxxxxx）';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onLogin({ name: name.trim(), phone });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-yellow-900 p-4">
      <div className="w-full max-w-sm">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-400 shadow-lg mb-4 text-4xl">
            🎡
          </div>
          <h1 className="text-3xl font-bold text-yellow-400 tracking-wide drop-shadow">幸運轉盤</h1>
          <p className="text-yellow-200 text-sm mt-1">介紹朋友，一起抽好禮！</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-red-800 mb-5 text-center">登入遊戲</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">姓名</label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                placeholder="請輸入您的姓名"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-yellow-500 transition"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">手機號碼</label>
              <input
                type="tel"
                value={phone}
                onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: '' })); }}
                placeholder="09xxxxxxxx"
                maxLength={10}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-yellow-500 transition"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-700 to-yellow-600 text-white font-bold py-3 rounded-xl text-lg shadow-md hover:from-red-600 hover:to-yellow-500 active:scale-95 transition-all"
            >
              進入遊戲 🎉
            </button>
          </form>
        </div>

        <p className="text-yellow-300 text-xs text-center mt-4 opacity-70">
          介紹朋友成交即可解鎖轉盤格位
        </p>
      </div>
    </div>
  );
}
