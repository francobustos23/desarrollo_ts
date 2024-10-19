import { createRoot } from 'react-dom/client'
import { LoginPage } from './pages/Login';
import './assets/index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/Landing';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/landing" element={<LandingPage/>} />
    </Routes>
  </BrowserRouter>,
)
