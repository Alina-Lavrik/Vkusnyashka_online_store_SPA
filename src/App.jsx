import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import StatsPage from './pages/StatsPage';
import AuthPage from './pages/AuthPage';

function App() {

  return (
      <BrowserRouter>
        <div className="container img_back white">
          <div className="top">
          <Navigation />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/stats' element={<StatsPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          </div>
        </div>
    </BrowserRouter> 
  );
  
}

export default App;
