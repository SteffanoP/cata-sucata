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
import Popover from '@mui/material/Popover';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
    "Temos 1 lixeira cheia! Por favor, solicite a coleta o quanto antes",
    "Notificação 2",
    "A coleta da lixeira 'Id' foi realizada com sucesso!"
  ]);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const isNotificationsOpen = Boolean(anchorEl);
  const notificationsId = isNotificationsOpen ? 'notifications-popover' : undefined;

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
              onClick={handleNotificationsClick}
            >
              <Badge badgeContent={notifications.length} color="error">
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
            <Popover
              id={notificationsId}
              open={isNotificationsOpen}
              anchorEl={anchorEl}
              onClose={handleNotificationsClose}
              anchorReference="anchorPosition"
              anchorPosition={{
                top: anchorEl ? anchorEl.getBoundingClientRect().bottom : 0,
                left: anchorEl ? anchorEl.getBoundingClientRect().left + anchorEl.getBoundingClientRect().width / 2 : 0
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {notifications.map((notification, index) => (
                <Typography key={index} sx={{ p: 2 }}>{notification}</Typography>
              ))}
            </Popover>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
