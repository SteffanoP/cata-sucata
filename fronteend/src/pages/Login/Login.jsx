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


const LoginPage = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      {/* <Grid item xs={6}>
        <img
          src={formLogo}
          alt="form-logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Grid> */}
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
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
                color="primary"
                fullWidth
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
                color="primary"
                fullWidth
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
              color="secondary"
              fullWidth
              style={{ marginTop: "10px" }}
              onClick={() => navigate("/dashboard")}
            >
              Entrar no Cata-Sucata
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
