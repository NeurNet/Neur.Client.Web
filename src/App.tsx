import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModelList from './pages/ModelList';
import Chat from './pages/Chat';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ModelList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:chatId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
