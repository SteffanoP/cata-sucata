import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";

const Header = () => {

    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    return (
        <AppBar position="static" style={{backgroundColor: '#A1CF6B'}} >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Cata-Sucata
                </Typography>
                
            </Toolbar>
        </AppBar>
    );
}

export default Header;
