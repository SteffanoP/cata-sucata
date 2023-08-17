import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function CardStatusDaLixeira({statusCode}) {

  const [status, setStatus] = useState([]);
  //const [sensorQtd, setSensorQtd] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStatus() {
      try {
        let response = await axios.get('https://cata-sucata.azure-api.net/preview/status-preview'//, {
        //   headers: {
        //     'Ocp-Apim-Subscription-Key': 'e7eae6903fc041bd8dfdda70214d9fd4'
        //   }
        // }
        );
        //console.log(response.data.devices_info.number_devices);
        setStatus(response.data.status_trash);
        //setSensorQtd(response.data.devices_info);
        setLoading(false);
      } catch (error) {
        console.log('Erro ao buscar dados:', error);
      }
    }
    getStatus();
  }, []);
  //console.log(sensorQtd.number_devices);
  //console.log(status.empty);

  return (
    <Card sx={{ maxWidth: 305 }}>
      <CardMedia
        sx={{ height: 10 }}
        // image="/static/images/cards/contemplative-reptile.jpg"
        // title="green iguana"
      />
      {statusCode === '1' && (
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h6" component="div">
              Lixeiras cheias
            </Typography>
            <Typography color="text.secondary" gutterBottom variant="h5">
              <p>{status.full}</p>
            </Typography>
          </Box>
        </CardContent>
      )}
      {statusCode === '2' && (
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h6" component="div">
              Lixeiras médias
            </Typography>
            <Typography color="text.secondary" gutterBottom variant="h5">
              <p>{status.medium}</p>
            </Typography>
          </Box>
        </CardContent>
      )}
      {statusCode === '3' && (
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h6" component="div">
              Lixeiras vazias
            </Typography>
            <Typography color="text.secondary" gutterBottom variant="h5">
              <p>{status.empty}</p>
            </Typography>
          </Box>
        </CardContent>
      )}
      {/* {statusCode === '4' && (
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h6" component="div">
              Sensores Ativos
            </Typography>
            <Typography color="text.secondary" gutterBottom variant="h5">
              <p>{sensorQtd.number_devices}</p>
            </Typography>
          </Box>
        </CardContent>
      )} */}
    </Card>
  );
}