import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuLateral() {
  const [state, setState] = React.useState({
    //top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div style={{backgroundColor: "green"}}>
        <Box >
        <List style={{backgroundColor: "green"}}>
          {['Dashboard', 'Rotas', 'Perfil', 'Configurações'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton style={{color: "white"}}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <List style={{backgroundColor: "green"}}>
          {['Sair'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton style={{color: "white"}}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
    
  );
  

  return (
    <div>
      {/*

      <MenuIcon teste/>
      {[teste].map((anchor) => (  DESCOBRIR PQ NÃO FUNCIONA
      
      */} 

      {/*{['Menu'].map((anchor) => (  DO EXEMPLO*/}
      {['_'].map((anchor) => (
        <React.Fragment key={anchor} style={{backgroundColor: "green"}}>
          <MenuIcon></MenuIcon>
          <Button onClick={toggleDrawer(anchor, true)}>
            {anchor}
            </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}