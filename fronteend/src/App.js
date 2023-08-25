import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/';
import './App.css';
import PageMap from './pages/Map/map';
import Signup from './pages/Initial/Signup';
import Login from './pages/Initial/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Signup/> } path='/signup'/>
        <Route element={ <Dashboard/> } path='/dashboard'/>
        <Route element={ <Login/> } path='/login'/>
        <Route element={ <PageMap/> } path='/map'/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;