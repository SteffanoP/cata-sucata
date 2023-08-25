import { Link } from 'react-router-dom';
import { Grid, Box, Paper, Typography, TextField, Button, Divider } from '@mui/material';
import Header from '../../components/Header';
import formLogo from './login.svg';

function Login() {
    return (
        <div style={{ height: '100vh' }}>
            <Header/>

            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                        <img src={formLogo} alt='form-logo' style={{ maxWidth: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} style={{ padding: '32px', backgroundColor: '#A1CF6B' }}>
                            <Typography variant="h4" gutterBottom style={{ color: '#E87461' }}>
                                Login
                                <Divider style={{ backgroundColor: '#E87461', height: '3px', marginTop: '8px' }} />
                            </Typography>
                            <form noValidate autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Email" variant="outlined" required style={{ backgroundColor: 'white' }} placeholderTextColor="#E0C879"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth type="password" label="Senha" variant="outlined" required style={{ backgroundColor: 'white' }} placeholderTextColor="#E0C879"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" style={{ backgroundColor: '#7AC74F' }} hoverColor="#E87461" component={Link} to="/dashboard">
                                            Entrar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Typography variant="body1" style={{ marginTop: '16px' }}>
                                <Link to='/signup' style={{ color: '#E87461' }}>Não possui uma conta? Cadastre-se aqui!</Link>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Login;
