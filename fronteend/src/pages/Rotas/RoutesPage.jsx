import React from "react";
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const RoutesPage = () => {
  const navigate = useNavigate();

  const routes = [
    { method: "GET", description: "/list-areacoleta-public: Lista todas as áreas de coleta" },
    { method: "GET", description: "/list-sensor-public: Lista todos os sensores" },
    { method: "GET", description: "/list-sensordata-public: Lista todo o histórico de leituras" },
    { method: "GET", description: "/list-sensordata-public-days: Lista o histórico de leituras entre duas datas" },
  ];

  const returnToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />

      <Container style={{ marginTop: "5%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={returnToHome}
          style={{ marginBottom: "20px" }}
        >
          Retornar à página inicial
        </Button>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h2" align="center" gutterBottom>
            Documentação
          </Typography>
          <Typography variant="h4" align="center" gutterBottom>
            Rotas Disponiveis
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <List>
            {routes.map((route, index) => (
              <ListItem 
              key={index} 
              style={{ 
                display: 'flex', 
                justifyContent: "left",
                backgroundColor: '#A1CF6B',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '10px'
              }}>
              <Typography variant="h4" style={{ marginRight: "30px" }}>
                {route.method}:
              </Typography>
              <Typography variant="h5">{route.description}</Typography>
            </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default RoutesPage;
