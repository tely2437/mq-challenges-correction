import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';
import { ThemeProvider } from './context/ThemeContext';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ hashed: false }}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);
