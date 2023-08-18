import React from 'react';
import { Drawer, CssBaseline, List, ListItem, ListItemText } from '@mui/material';
import GoogleMapComponent from './components/MapArea'; 
import Sidebar from './components/Sidebar'; 
import RightSidebar from './components/RightSidebar';

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />  

      <main style={{ flexGrow: 1, padding: '16px' }}>
        <GoogleMapComponent />
      </main>
      <RightSidebar />
    </div>
  );
}

export default App;

