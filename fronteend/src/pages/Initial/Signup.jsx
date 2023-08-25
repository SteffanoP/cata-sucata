import React from 'react';
import { Link, Grid, TextField, Button, Typography, Box, Paper, Divider } from '@mui/material';
import Header from '../../components/Header';
import formLogo from './signup.svg';

function Signup(){

    return(
        <div style={{height: '100vh' }}>
            <Header/>

            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                        <img src={formLogo} alt='form-logo' style={{ maxWidth: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} style={{ padding: '32px', backgroundColor: '#A1CF6B' }}>
                            <Typography variant="h4" gutterBottom style={{ color: '#E87461' }}>
                                Cadastre-se
                                <Divider style={{ backgroundColor: '#E87461', height: '3px', marginTop: '8px' }} />
                            </Typography>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Primeiro nome" variant="outlined" required style={{ backgroundColor: 'white' }} placeholderTextColor="#E0C879"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Segundo nome" variant="outlined" required style={{ backgroundColor: 'white' }} placeholderTextColor="#E0C879"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Função" variant="outlined" required style={{ backgroundColor: 'white' }} placeholderTextColor="#E0C879"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Email" variant="outlined" required style={{ backgroundColor: 'white' }} placeholderTextColor="#E0C879"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth type="password" label="Senha" variant="outlined" required style={{ backgroundColor: 'white' }} placeholderTextColor="#E0C879"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" style={{ backgroundColor: '#7AC74F' }} hoverColor="#E87461">
                                            Cadastrar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Typography variant="body1" style={{ marginTop: '16px' }}>
                                <Link to='/login' style={{ color: '#E87461' }}>Já possui uma conta? Faça login aqui!</Link>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Signup;
