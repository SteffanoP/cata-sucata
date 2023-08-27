import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { Box } from "@mui/material";

function Chart() {
    return(
        <Box sx={{ display: 'flex' }}>
            <BarChart 
                xAxis={[
                    {
                        id: 'mes',
                        data: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEC'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [2, 5, 3, 6, 10, 8, 4, 5, 7, 6, 9, 11],
                        color: '#7AC747',
                    },
                ]}
                width={850}
                height={276}
            >
                <ChartsXAxis label="Peso Mensal dos Resíduos (kg)" position="bottom" axisId="mes" />
            </BarChart>
        </Box>
    );
}

export default Chart;