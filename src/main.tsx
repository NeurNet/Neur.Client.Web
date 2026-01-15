import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthProvider from './contexts/AuthContext/AuthProvider.tsx';
import './index.css';
import '@fontsource-variable/montserrat';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
