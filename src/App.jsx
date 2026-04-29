import { useState } from 'react';
import LoginPage from './components/LoginPage';
import GamePage from './components/GamePage';
import { mockUser } from './data/mockData';
import './index.css';

export default function App() {
  const [user, setUser] = useState(null);

  function handleLogin(credentials) {
    setUser({ ...mockUser, name: credentials.name, phone: credentials.phone });
  }

  if (!user) return <LoginPage onLogin={handleLogin} />;
  return <GamePage user={user} onLogout={() => setUser(null)} />;
}
