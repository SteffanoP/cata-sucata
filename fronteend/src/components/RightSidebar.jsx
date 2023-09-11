import React, { useState } from 'react';
import { Drawer, List, ListItem, TextField, Divider, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useFavorites } from './FavoritesContext'; // Atualize este caminho

const RightSidebar = () => {
  const [search, setSearch] = useState('');
  const [favoritedBins, setFavoritedBins] = useState({});
  
  const { colectAreas, addFavorite, removeFavorite, showAreaLocation, setZoomLevel, getSensorsColectArea, getStatusSensors } = useFavorites(); // Utilize o hook aqui

  const toggleFavorite = (bin) => {
    setFavoritedBins(prev => ({
      ...prev,
      [bin.id]: !prev[bin.id]
    }));

    if (favoritedBins[bin.id]) {
      removeFavorite(bin);
    } else {
      addFavorite(bin);
    }
  };

  const handleLocation = (area) => {
    showAreaLocation(area);
    getStatusSensors();
    getSensorsColectArea(area); // Essa função pega a área clicada e mostra as lixeiras disponíceis nela
    setZoomLevel(21); // Este é apenas um exemplo de nível de zoom, ajuste conforme a necessidade.
};

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <TextField 
        label="Pesquisar área" 
        variant="outlined"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ margin: 15 }}
      />
      <Divider />
      <List>
        {colectAreas.map((item) => (  // Alterado de colectArea para colectAreas
          <ListItem key={item.id} onClick={() => handleLocation(item)}>
            {item.nome}
            <IconButton onClick={() => toggleFavorite(item)}>
              {colectAreas.some(fav => fav.id === item.id) ? <StarIcon color="primary" /> : <StarBorderIcon />} 
              {/* Alterado de favorites para colectAreas */}
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default RightSidebar;