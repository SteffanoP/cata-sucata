import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Chart from "../../components/Chart";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

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
  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        "https://cata-sucata.azure-api.net/preview/status-preview"
      );
      setStatus(response.data.status_trash);
      setSensorQtd(response.data.devices_info);

      const novasNotificações = [];

      if (response.data.status_trash.full > 0) {
        const qtdDeLixeiras = response.data.status_trash.full;
        novasNotificações.push(
          `Temos ${qtdDeLixeiras} lixeira(s) cheia(s)! Solicitar a coleta o quanto antes!`
        );
      }

      if (response.data.status_trash.unknown > 0) {
        novasNotificações.push("Temos um dispositivo com defeito!");
      }

      if (response.data.status_trash.medium > 0) {
        const qtdDeLixeiras = response.data.status_trash.medium;
        novasNotificações.push(`Temos ${qtdDeLixeiras} lixeira(s) com capacidade média. Em breve solicitar coleta.`);
      }

      setNotifications(novasNotificações);
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AuthenticatedTemplate>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Navbar notifications={notifications}/>

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Container maxWidth="lg">
              <Grid
                container
                spacing={{ lg: 6, md: 3 }}
                columns={{ xs: 3, sm: 8, md: 10 }}
                alignItems="center"
              >
                {/* Status das lixeiras */}
                <Grid item xs={3}>
                  <Card
                    sx={{
                      maxWidth: 305,
                      maxHeight: 100,
                      borderTop: 5,
                      borderTopColor: "#E87461",
                    }}
                  >
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
                  <Card
                    sx={{
                      maxWidth: 305,
                      maxHeight: 100,
                      borderTop: 5,
                      borderTopColor: "#E0C879",
                    }}
                  >
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
                  <Card
                    sx={{
                      maxWidth: 305,
                      maxHeight: 100,
                      borderTop: 5,
                      borderTopColor: "#A1CF6B",
                    }}
                  >
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
                  <Card
                    sx={{
                      maxWidth: 305,
                      maxHeight: 100,
                      borderTop: 5,
                      borderTopColor: "#D5D887",
                    }}
                  >
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
                  <Card
                    sx={{
                      maxWidth: 305,
                      maxHeight: 100,
                      borderTop: 5,
                      borderTopColor: "#D5D887",
                    }}
                  >
                    <CardMedia sx={{ height: 10 }} />
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
                  <Card
                    sx={{
                      maxWidth: 305,
                      maxHeight: 100,
                      borderTop: 5,
                      borderTopColor: "#D5D887",
                    }}
                  >
                    <CardMedia sx={{ height: 10 }} />
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

              <Chart />
            </Container>
          </Box>
        </Box>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h5>
          <center>Please sign-in to see your profile information.</center>
        </h5>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </UnauthenticatedTemplate>
    </div>
  );
};