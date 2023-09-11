import React from 'react';
import {  CssBaseline,  } from '@mui/material';
import RightSidebar from '../../components/RightSidebar';
import {  ListItem, ListItemIcon, ListItemText,  } from '@mui/material';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Sidebar from '../../components/Sidebar';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  } from "@azure/msal-react";
import NewMapArea from '../../components/MapRotasColeta';

const PageMap = () => {
  return (
    
    <div>
      <AuthenticatedTemplate>
        <div style={{ display: "flex" }}>
          <CssBaseline />
          <Sidebar />

          <main style={{ flexGrow: 1, padding: "16px" }}>
            <NewMapArea/>
          </main>
          <RightSidebar />
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5>
          <center>Please sign-in to see your profile information.</center>
        </h5>
        <ListItem button component={Link} to="/">
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </UnauthenticatedTemplate>
    </div>
    );
  };
export default PageMap;

