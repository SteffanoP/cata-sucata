import React, { useEffect, useState } from 'react';
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from 'axios'; 
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Chart from '../../components/Chart';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Dashboard = () => {
  const [sensorQtd, setSensorQtd] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    async function getStatus() {
      try {
        let response = await axios.get(
          "https://cata-sucata.azure-api.net/preview/status-preview"
        );
        //console.log(response.data.status_trash);
        setStatus(response.data.status_trash);
        setSensorQtd(response.data.devices_info);
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    }
    getStatus();

    const interval = setInterval(() => {
      //console.log("Requisição!");
      getStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, []);
  //console.log(status.full);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar/>
      <Navbar/>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ lg: 6, md: 3 }}
            columns={{ xs: 3, sm: 8, md: 10 }}
            alignItems='center'
          >
            {/* Status das lixeiras */}
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 305, maxHeight: 100, borderTop: 5, borderTopColor: "#E87461" }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Lixeiras cheias
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h6"
                    >
                      <p>{status.full}</p>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card sx={{ maxWidth: 305, maxHeight: 100, borderTop: 5, borderTopColor: "#E0C879" }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Lixeiras médias
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h6"
                    >
                      <p>{status.medium}</p>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card sx={{ maxWidth: 305, maxHeight: 100, borderTop: 5, borderTopColor: "#A1CF6B" }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Lixeiras vazias
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h6"
                    >
                      <p>{status.empty}</p>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Dados Diários */}
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 305, maxHeight: 100, borderTop: 5, borderTopColor: "#D5D887" }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Sensores
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h6"
                    >
                      <p>{sensorQtd.number_devices}</p>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card sx={{ maxWidth: 305, maxHeight: 100, borderTop: 5, borderTopColor: "#D5D887"}}>
                <CardMedia
                  sx={{ height: 10 }}
                />
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Volume
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h6"
                    >
                      70 m³
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card sx={{ maxWidth: 305, maxHeight: 100, borderTop: 5, borderTopColor: "#D5D887" }}>
                <CardMedia
                  sx={{ height: 10 }}
                />
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Peso
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h6"
                    >
                      120 kg
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Chart/>
        </Container>
      </Box>
    </Box>
  )
}