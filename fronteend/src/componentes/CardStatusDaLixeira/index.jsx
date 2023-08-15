import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CardStatusDaLixeira() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          "Status da Lixeira"
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Alguma informação adicional (?)
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}