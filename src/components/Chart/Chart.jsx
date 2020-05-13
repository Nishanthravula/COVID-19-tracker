import React, {useState,useEffect} from 'react';
import { fetchDailyData} from '../../api'
import {Line,Bar,horizontalBar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data:{confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);


    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        
        fetchAPI();

    } , []);
    const lineChart = (
        dailyData.length 
        ? (
        <Line
            data = {{
                labels:dailyData.map(({date}) => date),
                datasets: [{
                    data : dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: 'Blue',
                    
                    fill: true,
                },
                 {
                    data : dailyData.map(({deaths}) => deaths),
                    label: 'Infected',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                 }]
            }}
        />) : null

    );
    // 

    const barChart = (
        confirmed
        ?(
            <Bar
                
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor:[
                            'rgb(0,0,255,0.5)',
                            'rgba(0, 255, 21,0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data :[confirmed.value,recovered.value,deaths.value]
                    }]

                }}
                options={{
                    legend: {display:false},
                    title:{display:true,text:`current state in ${country}`},
                }}
            />
        ) : null
    );

    // const radarChart = (
        //     confirmed
        //     ?(
        //         <Radar 
        //             data={{
        //                 labels: ['Infected','Recovered','Deaths'],
        //                 datasets: [{
        //                     label: 'People',
        //                     backgroundColor:[
        //                         'rgb(0,0,255,0.5)',
        //                         'rgba(0, 255, 21,0.5)',
        //                         'rgba(255, 0, 0, 0.5)',
        //                     ],
        //                     data :[confirmed.value,recovered.value,deaths.value]
        //                 }]
    
        //             }}
        //             options={{
        //                 legend: {display:false},
        //                 title:{display:true,text:`current state in ${country}`},
        //             }}
        //         />
                
    
        //     ) : null
    
        // );
    return (
       <div className = {styles.container}>

           {country ? barChart : lineChart}
       </div>
    )
}
export default Chart;