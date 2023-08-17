"use client";

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, LineController, PointElement, LineElement, CategoryScale, Tooltip, Title } from 'chart.js';

Chart.register(LinearScale, LineController, PointElement, LineElement, CategoryScale, Tooltip, Title);


import { GET } from "../../../../api/solar/route";

const GenerationPage: React.FC<{ params: { storeId: string } }> = ({ params }) => {
    const [monthlyOutput, setMonthlyOutput] = useState<string | null>(null);
    const [store, setStore] = useState(null);

    useEffect(() => {
        const fetchSolarOutput = async () => {

        const response = await fetch(`/api/stores/${params.storeId}`);
        console.log(response)
        const store = await response.json();

        setStore(store);

        if (!store) {
            return (
                <div>Store not found!</div>
            )
        }

        const inputData = {
            lat: store?.latitude,  
            lon: store?.longitude,  
            system_capacity: store?.systemCapacity,  
            azimuth: store?.azimuth,  
            tilt: store?.tilt,  
            array_type: store?.array_type,  
            module_type: store?.module_type, 
            losses: store?.losses  
          };

        try {
            const data = await GET(inputData);
            setMonthlyOutput(data.outputs.ac_monthly);
        } catch (error) {
            console.error('Failed to fetch data:');
        }
    }

    fetchSolarOutput();
    }, [params.storeId])

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: 'Solar Output (Monthly)',
                data: monthlyOutput,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            x: { 
                type: 'category',
                beginAtZero: true,
            },
            y: { 
                type: 'linear', 
                beginAtZero: true,
            }
        }, tooltips: {
            enabled: true,  // this is default
            mode: 'index',  // can be 'point', 'index', 'nearest', etc.
            intersect: false,  // if true, it will show tooltips when the pointer is over the item, otherwise it will show tooltips no matter where you are in the graph area.
            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // background color of the tooltip
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            borderColor: '#ddd',
            borderWidth: 1,
            // You can add more custom settings here.
        }, 
        plugins: {
            title: {
                display: true,
                text: 'Monthly Solar Energy Production (kWhac)',
                font: {
                    size: 24  // You can adjust this value for the font size.
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    } as any;
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
            {monthlyOutput && (
                    <Line data={data} options={options} />
                )}
            </div>
        </div>
    );
};

export default GenerationPage;