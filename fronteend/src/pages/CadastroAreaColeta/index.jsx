import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import {Container} from '@mui/material';
import {Paper} from '@mui/material';
import {Typography} from '@mui/material';
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Grid} from '@mui/material';
import {Box} from '@mui/material';
import axios from 'axios';


export const CadastroAreaColeta = () => {
  const [areaColeta, setAreaColeta] = useState({
    nome: '', latitude: '', longitude: '', tamanho: ''
  })

  const [lixeira, setLixeira] = useState({
    nomeAreaColeta: ''
  })

  const [successMessage, setSuccessMessage] = useState('')

  const handleAreaColetaChange = (event) => {
    const { name, value } = event.target
    setAreaColeta({
      ...areaColeta, [name]: value
    })
  }

  const handleLixeiraChange = (event) => {
    const { name, value } = event.target;
    setLixeira({
      ...lixeira, [name]: value
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

  const handleLixeiraSubmit = () => {
    axios
      .post('https://cata-sucata.azure-api.net/preview/', {
        ...lixeira,categoria: lixeira.categoria }).then((response) => {
        console.log(response.data);
        setSuccessMessage(`Lixeira cadastrada na área de coleta: ${lixeira.nomeAreaColeta}`)
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
                Cadastrar lixeira em área de coleta existente
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="nome"
                    label="Nome da área de coleta existente"
                    fullWidth
                    value={lixeira.nome}
                    onChange={handleLixeiraChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      name="categoria"
                      marginTop="20px"
                      value={lixeira.categoria}
                      onChange={handleLixeiraChange}
                    >
                      <MenuItem value="Pública">Pública</MenuItem>
                      <MenuItem value="Privada">Privada</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <p />
              <Button variant="contained" color="success" onClick={handleLixeiraSubmit}>
                Cadastrar
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