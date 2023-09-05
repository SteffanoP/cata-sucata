import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/';
import './App.css';
import PageMap from './pages/Map/map';
import Login from './pages/Login/Login';
import { NotificationsProvider } from './components/NotificationsContext';
import { FavoritesProvider } from "./components/FavoritesContext";
import { CadastroAreaColeta } from './pages/CadastroAreaColeta';

function App() {
  return (
    <FavoritesProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={ <Dashboard/> } path='/dashboard'/>
            <Route element={ <Login/> } path='/login'/>
            <Route element={ <Login/> } path='/'/>
            <Route element={ <PageMap/> } path='/map'/>
            <Route element={ <CadastroAreaColeta/> } path='/settings'/>
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </FavoritesProvider>
  );
}
export default App;
