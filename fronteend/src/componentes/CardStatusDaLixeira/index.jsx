import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function CardStatusDaLixeira() {
  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Quantidade de lixeiras
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h5">
            vazia/média/cheia
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
      </CardActions>
    </Card>
  );
}