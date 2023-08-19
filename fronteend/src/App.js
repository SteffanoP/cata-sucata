import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Dashboard/> } path='/'/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;