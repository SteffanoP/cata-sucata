import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import {Container} from '@mui/material';
import {Paper} from '@mui/material';
import {Typography} from '@mui/material';
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import {Grid} from '@mui/material';
import {Box} from '@mui/material';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export const CadastroAreaColeta = () => {
  const [areaColeta, setAreaColeta] = useState({
    nome: '', latitude: '', longitude: '', tamanho: ''
  })

  const [gatewayAreaColeta, setGatewayAreaColeta] = useState({
    areacoleta: '', gateway: ''
  })

  const [successMessage, setSuccessMessage] = useState('')

  const handleAreaColetaChange = (event) => {
    const { name, value } = event.target
    setAreaColeta({
      ...areaColeta, [name]: value
    })
  }

  const handleGatewayAreaChange = (event) => {
    const { name, value } = event.target;
    setGatewayAreaColeta({
      ...gatewayAreaColeta, [name]: value
    })
  }

  const handleAreaColetaSubmit = () => {
    axios
      .post('https://cata-sucata.azure-api.net/preview/create-areacoleta', areaColeta).then((response) => {
        console.log(response.data);
        setSuccessMessage('Área de coleta cadastrada com sucesso!');

      }).catch((error) => {
        console.error(error);
      });
      
  
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleGatewaySubmit = () => {
    console.log(gatewayAreaColeta)
    axios
      .post('https://cata-sucata.azure-api.net/preview/attach-sensor', gatewayAreaColeta).then((response) => {
        console.log(response.data);
        setSuccessMessage(`Gateway cadastrada na área de coleta: ${gatewayAreaColeta.areacoleta}`)
      }).catch((error) => {
        console.error(error);
      });
  
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  

  return (
    <Container style={{ marginTop: '5%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box width="70%">
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h5" gutterBottom>
                Cadastrar área de coleta
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="nome"
                    label="Nome da área de coleta"
                    fullWidth
                    value={areaColeta.nome}
                    onChange={handleAreaColetaChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="latitude"
                    label="Latitude"
                    fullWidth
                    value={areaColeta.latitude}
                    onChange={handleAreaColetaChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="longitude"
                    label="Longitude"
                    fullWidth
                    value={areaColeta.longitude}
                    onChange={handleAreaColetaChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="tamanho"
                    label="Tamanho da área em km²"
                    fullWidth
                    value={areaColeta.tamanho}
                    onChange={handleAreaColetaChange}
                  />
                </Grid>
              </Grid>
              <p />
              <Button variant="contained" color="success" onClick={handleAreaColetaSubmit}>
                 Cadastrar
              </Button>
            </Paper>

            <Paper elevation={3} style={{ padding: '20px', marginTop: '40px' }}>
              <Typography variant="h5" gutterBottom>
                Associar gateway a uma área de coleta existente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="areacoleta"
                    label="Nome da área de coleta existente"
                    fullWidth
                    value={gatewayAreaColeta.nome}
                    onChange={handleGatewayAreaChange}
                  />
                </Grid>
                <Grid item xs={6}>
                <TextField
                  name="gateway"
                  label="Nome do Gateway"
                  fullWidth
                  value={gatewayAreaColeta.gateway}
                  onChange={handleGatewayAreaChange}
                />

                </Grid>
              </Grid>
              <p />
              <Button variant="contained" color="success" onClick={handleGatewaySubmit}>
                Cadastrar
              </Button>
              
            </Paper>

            <Paper elevation={3} style={{ padding: '20px', marginTop: '40px' }}>
              <Typography variant="h5" gutterBottom>
               Permissão para a liberação de dados
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                        <FormControlLabel value="Não" control={<Radio />} label="Não" />
                      </RadioGroup>
                    </FormControl>
                </Grid>
              </Grid>
              <p />
              <Button variant="contained" color="success" onClick={handleGatewaySubmit}>
                Enviar
              </Button>
              
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {successMessage && (
        <Paper elevation={3} style={{ padding: '10px', marginTop: '20px', width: '20%', marginLeft: '150px' }}>
          {successMessage}
        </Paper>
      )}
    </Container>
  );
};