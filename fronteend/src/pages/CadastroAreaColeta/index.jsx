import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export const CadastroAreaColeta = () => {
  const [areaColeta, setAreaColeta] = useState({
    nome: "",
    latitude: "",
    longitude: "",
    tamanho: "",
  });

  const [lixeira, setLixeira] = useState({
    latitude: "",
    longitude: "",
    gateway: "",
    id: "",
  });

  const [gatewayAreaColeta, setGatewayAreaColeta] = useState({
    areacoleta: "",
    gateway: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [dataPermission, setDataPermission] = useState("");

  const handleAreaColetaChange = (event) => {
    const { name, value } = event.target;
    setAreaColeta({
      ...areaColeta,
      [name]: value,
    });
  };

  const handleLixeiraChange = (event) => {
    const { name, value } = event.target;
    setLixeira({
      ...lixeira,
      [name]: value,
    });
  };

  const handleGatewayAreaChange = (event) => {
    const { name, value } = event.target;
    setGatewayAreaColeta({
      ...gatewayAreaColeta,
      [name]: value,
    });
  };

  const handleAreaColetaSubmit = () => {
    axios
      .post(
        "https://cata-sucata.azure-api.net/preview/create-areacoleta",
        areaColeta
      )
      .then((response) => {
        //console.log(response.data);
        setSuccessMessage("Área de coleta cadastrada com sucesso!");
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleLixeiraSubmit = () => {
    axios
      .post(
        "https://cata-sucata.azure-api.net/preview/upsert-sensor",
        lixeira
      )
      .then((response) => {
        setSuccessMessage("Lixeira cadastrada com sucesso!");
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleGatewaySubmit = () => {
    axios
      .post(
        "https://cata-sucata.azure-api.net/preview/attach-sensor",
        gatewayAreaColeta
      )
      .then((response) => {
        
        setSuccessMessage(
          `Gateway cadastrada na área de coleta: ${gatewayAreaColeta.areacoleta}`
        );
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Função que envia a permissão ou não da liberação dos dados ao público
  const handlePostDataPermission = () => {
    
    axios
      .post("https://cata-sucata.azure-api.net/preview/set_properties", {
        id: "gerente_de_coleta",
        prop: "gerente",
        is_public: dataPermission,
      })
      .then((response) => {
       
        setSuccessMessage("Permissão alterada com sucesso!");
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Função que requisita qual a permissão dada para a liberação dos dados
  useEffect(() => {
    async function getDataPermission() {
      axios
        .get("https://cata-sucata.azure-api.net/preview/get-properties", {
          params: {
            id: "gerente_de_coleta",
            prop: "gerente",
          },
        })
        .then((response) => {
          //console.log(response.data.is_public);
          setDataPermission(response.data.is_public);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getDataPermission();
  }, []);

  return (
    <Container style={{ marginTop: "3%", marginBottom: "3%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box width="70%">
            <Paper
              elevation={3}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
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
              <Button
                variant="contained"
                color="success"
                onClick={handleAreaColetaSubmit}
              >
                Cadastrar
              </Button>
            </Paper>

            <Paper
              elevation={3}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Typography variant="h5" gutterBottom>
                Cadastrar Lixeira
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="latitude"
                    label="Latitude"
                    fullWidth
                    value={lixeira.latitude}
                    onChange={handleLixeiraChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="longitude"
                    label="Longitude"
                    fullWidth
                    value={lixeira.longitude}
                    onChange={handleLixeiraChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="gateway"
                    label="Gateway"
                    fullWidth
                    value={lixeira.gateway}
                    onChange={handleLixeiraChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="id"
                    label="ID do sensor"
                    fullWidth
                    value={lixeira.id}
                    onChange={handleLixeiraChange}
                  />
                </Grid>
              </Grid>
              <p />
              <Button
                variant="contained"
                color="success"
                onClick={handleLixeiraSubmit}
              >
                Cadastrar
              </Button>
            </Paper>

            <Paper elevation={3} style={{ padding: "20px", marginTop: "40px" }}>
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
              <Button
                variant="contained"
                color="success"
                onClick={handleGatewaySubmit}
              >
                Cadastrar
              </Button>
            </Paper>

            <Paper elevation={3} style={{ padding: "20px", marginTop: "40px" }}>
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
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Sim"
                        onChange={(e) => setDataPermission(e.target.value)}
                        checked={dataPermission === "true"}
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Não"
                        onChange={(e) => setDataPermission(e.target.value)}
                        checked={dataPermission === "false"}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <p />
              <Button
                variant="contained"
                color="success"
                onClick={handlePostDataPermission}
              >
                Enviar
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {successMessage && (
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            marginTop: "20px",
            width: "20%",
            marginLeft: "150px",
          }}
        >
          {successMessage}
        </Paper>
      )}
    </Container>
  );
};
