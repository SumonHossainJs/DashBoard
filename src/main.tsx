import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { Providers } from './store/provider.js';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store,persistor } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
    </Providers>
  </React.StrictMode>,
)
