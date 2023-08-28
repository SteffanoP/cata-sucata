import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/';
import './App.css';
import PageMap from './pages/Map/map';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Dashboard/> } path='/dashboard'/>
        <Route element={ <Login/> } path='/login'/>
        <Route element={ <Login/> } path='/'/>
        <Route element={ <PageMap/> } path='/map'/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;