import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {


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
