import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Providers } from './store/provider.jsx';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Providers>
  </React.StrictMode>
);
