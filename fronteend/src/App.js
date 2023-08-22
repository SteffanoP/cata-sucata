import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/';
import './App.css';
import PageMap from './pages/Map/map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Dashboard/> } path='/'/>
        <Route element={ <PageMap/> } path='/map'/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;