import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function CardStatusDaLixeira({statusCode}) {

  const[status, setStatus] = useState([]);

  useEffect(() => {
    async function getStatus() {
      let response = await axios.get('/preview/status-preview', { 
        headers: {
          'Ocp-Apim-Subscription-Key': 'fb3b51c48ae843aca4d099c759a732f9'
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      })
      console.log(response); // a response está resultando em 'undefined'
      //setStatus(response.status_trash); 
    }
    getStatus();
  }, []);
  //console.log(status.status_trash);

  return (
    <Card sx={{ maxWidth: 335 }} >
      <CardMedia
        sx={{ height: 50 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
        />
      {statusCode === '1' ?
      (<CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            Cheia
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h5">
            10
          </Typography>
        </Box>
      </CardContent>) : <></>}
      {statusCode === '2' ? (
        <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
           Média
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h5">
            5
          </Typography>
        </Box>
      </CardContent>
      ) : <></>}
      {statusCode === '3' ? (
        <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
           Vazia
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h5">
            8
          </Typography>
        </Box>
      </CardContent>
      ) : <></>}

      <CardActions>
      </CardActions>
    </Card>
  );
}