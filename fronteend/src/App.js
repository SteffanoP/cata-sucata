import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatusDaLixeira } from './pages/Dashboard/StatusDaLixeira';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <StatusDaLixeira/> } path='/'/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;