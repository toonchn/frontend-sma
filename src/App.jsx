// src/App.jsx
import Router from './router';
import { isAuthenticated } from './services/authService';

function App() {
  const isAuth = isAuthenticated();

  return <Router isAuthenticated={isAuth} />;
}

export default App;
