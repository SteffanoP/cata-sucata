import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" style={{backgroundColor: '#A1CF6B'}} >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Cata-Sucata
                </Typography>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Cadastro</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;