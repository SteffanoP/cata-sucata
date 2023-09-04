import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [colectAreas, setColectAreas] = useState([]); // novo estado
  const [selectedArea, setSelectedArea] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(14); 

  // Funções para gerenciar favoritos
  const addFavorite = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (item) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== item.id));
  };

  const showAreaLocation = (item) => {
    colectAreas.forEach((areaMatch) => {
      if(areaMatch.id === item.id){
        setSelectedArea(item);
      }
    });
  };
  console.log(selectedArea);

  // Função para buscar dados de colectAreas da API
  useEffect(() => {
    async function getColectArea(){
      try {
        let response = await axios.get('https://cata-sucata.azure-api.net/preview/list-areacoleta');
        setColectAreas(response.data);
      } catch (error) {
        console.log("Erro ao buscar dados: ", error);
      }
    }
    getColectArea();
  }, []);

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite,
        zoomLevel,
        setZoomLevel,
        colectAreas,
        setColectAreas,
        showAreaLocation,
        selectedArea
      }}
    >
      {children}
    </FavoritesContext.Provider>
);
};
