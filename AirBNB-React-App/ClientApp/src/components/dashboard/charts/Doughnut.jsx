import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import randomColors from "../../../helpers/randomColors";

const DoughnutChart = ({labels, data}) => {
    const chart = {
        labels: labels ? labels : [],
        responsive: true,
        datasets: [
            {
                data: data ? data : [],
                backgroundColor: randomColors(data?.length),
                borderWidth: 1,
            },
        ],
    };
    
    return <Doughnut data={chart}/>
}

export default DoughnutChart;