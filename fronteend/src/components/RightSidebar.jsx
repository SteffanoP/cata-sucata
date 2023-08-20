import React, { useState } from 'react';
import { Drawer, List, ListItem, TextField, Divider, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const RightSidebar = () => {
  const [search, setSearch] = useState('');
  const [favoritedBins, setFavoritedBins] = useState({});
  
  const bins = [
    'Cordeiro',
    'Torrões',
    // ... Adicione quantas lixeiras precisar.
  ];

  const filteredBins = bins.filter(bin => bin.toLowerCase().includes(search.toLowerCase()));

  const toggleFavorite = binName => {
    setFavoritedBins(prev => ({
      ...prev,
      [binName]: !prev[binName]
    }));
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
        {filteredBins.map(binName => (
          <ListItem key={binName}>
            {binName}
            <IconButton onClick={() => toggleFavorite(binName)}>
              {favoritedBins[binName] ? <StarIcon color="primary" /> : <StarBorderIcon />}
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default RightSidebar;
