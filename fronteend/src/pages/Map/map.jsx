import React from 'react';
import { Drawer, CssBaseline, List, ListItem, ListItemText } from '@mui/material';
import GoogleMapComponent from '../../components/MapArea';
import RightSidebar from '../../components/RightSidebar';
import Sidebar from '../../components/Sidebar';

const PageMap = () => {
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

export default PageMap;

