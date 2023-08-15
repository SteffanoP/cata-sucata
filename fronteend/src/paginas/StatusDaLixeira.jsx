import React from 'react'
import CardStatusDaLixeira from '../componentes/CardStatusDaLixeira'
import Navbar from '../componentes/Navbar'
import { Container, Grid } from '@mui/material'
import MiniDrawer from '../componentes/Drawer'

export const StatusDaLixeira = () => {
  return (
    <div >
        <MiniDrawer/>
        {/* <Navbar/>
            <Container maxWidth='lg' >
                <Grid container spacing={{ lg: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 10 }}>
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
            </Container> */}
    </div>
  )
}