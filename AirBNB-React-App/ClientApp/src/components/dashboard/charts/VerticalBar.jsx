import React from 'react';
import {Bar} from 'react-chartjs-2';
import randomColors from "../../../helpers/randomColors";

const VerticalBar = ({labels, data}) => {
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const chart = {
        labels: labels ? labels : [],
        datasets: [
            {
                label: '[Chart] Average price',
                data: data ? data : [],
                backgroundColor: randomColors(data?.length),
                borderWidth: 1,
            },
             {
                type: 'line',
                label: '[Line] Average price',
                data: data ? data : [],
            }
        ],
    };

    return (<div className="h-50"><Bar data={chart} options={options} height={100}/></div>);
}

export default VerticalBar;