import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// /mkids is a standalone page. Everything else is the home page.
const MKidsPage = lazy(() => import('./components/MKidsPage.tsx'));
const isMKids = /^\/mkids\/?$/i.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isMKids ? (
      <Suspense fallback={null}>
        <MKidsPage />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
