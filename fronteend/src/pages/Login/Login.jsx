import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Header from "../../components/Header";
import { ReactComponent as YourSvg } from "./login.svg";  // Substitua pelo caminho do seu arquivo SVG

const LoginPage = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Container
        component="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <YourSvg style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                minHeight: '400px',  // Ajuste essa altura para combinar com o SVG
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Cata-Sucata Login
              </Typography>
              <div style={{ width: "100%", marginTop: "20px" }}>
                {isAuthenticated ? (
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "#AD9D8F", marginTop: "10px" }}
                    onClick={() => {
                      instance.logoutPopup({
                        postLogoutRedirectUri: "/",
                        mainWindowRedirectUri: "/",
                      });
                    }}
                  >
                    Sair
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "#3F88C5", marginTop: "10px" }}
                    onClick={() => {
                      instance.loginPopup(loginRequest).catch((e) => {
                        console.log(e);
                      });
                    }}
                  >
                    Entrar pela Azure
                  </Button>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: "#A1CF6B", marginTop: "10px" }}
                  onClick={() => navigate("/dashboard")}
                >
                  Entrar no Cata-Sucata
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
