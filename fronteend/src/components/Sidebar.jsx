import React from 'react';
import { Drawer, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import cataSucataIcon from '../assets/cata-sucata.png';  // Ajuste o caminho se necessário
import MapIcon from '@mui/icons-material/Map';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#7ac74f',
          color: 'white'
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <img src={cataSucataIcon} alt="Cata-Sucata Logo" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, m: 2 }}>
          Cata-Sucata
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/map">
          <ListItemIcon><MapIcon /></ListItemIcon>
          <ListItemText primary="Mapa" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
