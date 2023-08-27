import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiAppBar from "@mui/material/AppBar";

export default function Navbar() {

  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    background: "none",
    color: "rgba(0, 0, 0, 0.54)",
    width: "82%",
    zIndex: theme.zIndex.drawer + 1,
    alignItems: "center",
    boxShadow: "none"
  }));

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ display: "flex" }} alignItems={"center"}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Hoje |
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            aria-label="mostra 3 notificações"
            color="inherit"
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}