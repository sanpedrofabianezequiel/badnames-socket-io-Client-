import { Chart ,registerables} from 'chart.js';
import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

    Chart.register(...registerables);
    let myChart;
    const {socket} = useContext(SocketContext)


    useEffect(() => {
        socket.on('current-bands',(bands)=>{
            crearGrafica(bands);
        });
    }, [socket])


    const crearGrafica = (data = [])=>{
        const ctx = document.getElementById('myChart');
        if(myChart){
            myChart.destroy();
        }
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map( x=> x.name),
                datasets: [{
                    label: '# of Votes',
                    data: data.map( x=> x.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis:'y',
                scales: {
                    x: {
                        stacked: false
                    },
                    y: {
                        stacked: false
                    }
                }
            }
        });
    }
   
    return (
       <canvas id="myChart"> </canvas>
    )
}
