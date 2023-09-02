import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Drawer, List, ListItem, TextField, Divider, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const RightSidebar = () => {
  const [search, setSearch] = useState('');
  const [colectArea, setColectArea] = useState([]);
  const [favoritedBins, setFavoritedBins] = useState({});

  useEffect(() => {
    async function getColectArea(){
      try {
        let response = await axios.get('https://cata-sucata.azure-api.net/preview/list-areacoleta');
        setColectArea(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log("Erro ao buscar dados: ", error);
      }
    }
    getColectArea();
  }, []);
  
  // const bins = [
  //   'Cordeiro',
  //   'Torrões',
  //   // ... Adicione quantas lixeiras precisar.
  // ];

  // const filteredBins = bins.filter(bin => bin.toLowerCase().includes(search.toLowerCase()));

  const toggleFavorite = binName => {
    setFavoritedBins(prev => ({
      ...prev,
      [binName]: !prev[binName]
    }));
  };

  // Essa função deve se comunicar com a função LOCATION encontrada no arquivo NewMapArea.jsx,
  // pois dessa forma LOCATION poderá receber as coordenadas da área de coleta e mostrar no mapa.
  function handleAreaView(latitude, longitude) {
    console.log("Funcionou!", latitude, "e", longitude);
  }

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
        {/* {filteredBins.map(binName => (
          <ListItem key={binName}>
            {binName}
            <IconButton onClick={() => toggleFavorite(binName)}>
              {favoritedBins[binName] ? <StarIcon color="primary" /> : <StarBorderIcon />}
            </IconButton>
          </ListItem>
        ))} */}
        {colectArea.map((item) => (
          <ListItem key={item.id} onClick={() => handleAreaView(item.latitude, item.longitude)}>
            {item.nome}
            <IconButton onClick={() => toggleFavorite(item.nome)}>
              {favoritedBins[item.nome] ? <StarIcon color="primary" /> : <StarBorderIcon />}
            </IconButton>
            {/* TODO: Tem um detalhe aqui: quando coloquei 'item.nome' na função que faz a pesquisa acima, 
              ela parou de funionar... */}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default RightSidebar;
