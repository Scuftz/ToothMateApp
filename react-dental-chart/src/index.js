import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles.css';
import App from './App';
import { Provider as AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
