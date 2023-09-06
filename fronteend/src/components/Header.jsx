import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate ao invés de useHistory

const Header = () => {
    const navigate = useNavigate(); // Instancie o useNavigate

    const navigateToRotas = () => {
        navigate('/rotas'); // use navigate ao invés de history.push
    }

    return (
        <AppBar position="static" style={{ backgroundColor: '#A1CF6B' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Cata-Sucata
                </Typography>
                <Button color="inherit" onClick={navigateToRotas}>API Publica</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
