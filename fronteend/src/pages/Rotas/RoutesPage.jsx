import React from "react";
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Container,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const RoutesPage = () => {
  const navigate = useNavigate();

  const routes = [
  { method: "GET", description: "/list-areacoleta-public: Lista todas as áreas de coleta" },
  { method: "GET", description: "/list-sensor-public: Lista todos os sensores" },
  { method: "GET", description: "/list-sensordata-public: Lista todo o histórico de leituras" },
  { method: "GET", description: "/list-sensordata-public-days: Lista o histórico de leituras entre duas datas" },
  { method: "GET", description: "/list-sensordata-public-areacoleta: Lista as leituras das lixeiras em uma área de coleta" },
  ];

  const returnToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <IconButton 
  style={{ marginLeft: '20px', marginTop: '10px' }}
  onClick={() => navigate("/")} 
  color="black"
>
  <ArrowBackIcon fontSize="large" />
</IconButton>
      <Container maxWidth="md" style={{ marginTop: "5%" }}>
        
        <Paper elevation={3} style={{ padding: "15px" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Rotas Disponíveis
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <List>
            {routes.map((route, index) => (
              <ListItem key={index} style={{ backgroundColor: '#A1CF6B', margin: '10px 0', padding: '10px', borderRadius: '10px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h4">
                      {route.method}:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5">{route.description}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default RoutesPage;
