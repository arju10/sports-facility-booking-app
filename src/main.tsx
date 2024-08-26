import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './slick-imports.css';
// Import Slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
