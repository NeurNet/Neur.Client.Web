import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ModelList from './pages/ModelList';
import Chat from './pages/Chat';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ModelList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
