import React from 'react'
import CardStatusDaLixeira from '../componentes/CardStatusDaLixeira'
import Navbar from '../componentes/Navbar'
import MenuLateral from '../componentes/MenuLateral'
import { Container, Grid } from '@mui/material'

export const StatusDaLixeira = () => {
  return (
    <div>
        <Navbar/>
        <Container maxWidth='xg'>
            <Grid container>
                <Grid item xs={3}>
                    <CardStatusDaLixeira/>
                </Grid>
                <Grid item xs={3}>
                    <CardStatusDaLixeira/>
                </Grid>
                <Grid item xs={3}>
                    <CardStatusDaLixeira/>
                </Grid>
            </Grid>
        </Container>

       

    </div>
  )
}