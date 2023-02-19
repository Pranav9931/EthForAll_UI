import React, { Component, useState } from 'react'

// Importing the types of charts/graph that we will be using in this component.
import { Bar, Doughnut, Line } from 'react-chartjs-2'

// Importing the required components from chart.js
import { Chart, registerables } from 'chart.js';

import { useStateContext } from '../context';

import { utils } from 'ethers';

import "./graph.component.css"
import { Loader } from '../assets';

// Register the registrables to the chart.
// They are basically {barElement, lineElement, etc}, scale factors and the chart controllers. 
Chart.register(...registerables);

// The BarChart component
export function TransactionGraph() {
    // Constructor
    // constructor(props: any) {
    //     super(props);
    // };


    const [navTitle, setNavTitle, address, contract, connect, getTransactions] = useStateContext();

    const [transactions, setTransactions] = useState([] as any);

    const [isLoading, setIsLoading] = useState(false);

    const fetchTransactions = async () => {
        setIsLoading(true);
        const data = await getTransactions();

        setTransactions(() => data);
        setIsLoading(false);
    }
    React.useEffect(() => {
        if (contract) fetchTransactions();
    }, [contract, address])

    // Define labels for the Graph
    const labels = transactions.map((item: any, idx = 0) => {
        return (String(idx));
        idx++;
    });

    // Define the values for the graph
    const values = transactions.map((item: any) => {
        return (
            Number(item.amount)
        )
    })
    // console.log(labels);

    // Type of values to be inserted in the datasets.
    type dataValues = {
        label: string,
        data: [],
        borderColor: string,
        backgroundColor: string,
        fill: boolean
    }

    // Type for the values that are to be passed as the data to the chart.
    type Data = {
        labels: string[],
        datasets: dataValues[],
    }

    // Type for the 'options' that is passed to the chart Component.
    type OptionValues = {
        maintainAspectRatio: boolean;
        plugins: {
            title: {
                display: boolean;
                text: string;
            }
        },
        interaction: {
            intersect: boolean;
        },
        elements: {
            line: {
                cubicInterpolationMode: 'default' | 'monotone'
            },
        },
        scales: {
            x: {
                grid: {
                    display: boolean, // disable x grid
                },
                ticks: {
                    display: boolean, // disable x labels
                },
            },
            y: {
                min: number, // set custom minimum value
                max: number, // set custom maximum value
                grid: {
                    display: boolean, // disable y grid
                    color: string
                },
                ticks: {
                    display: boolean, // disable y labels
                },
            },
        },
    };

    // The chart data with labels.
    const chartData: Data = {

        labels,
        datasets: [
            {
                label: 'Dataset',
                data: values,
                borderColor: '#7b3ee4',
                backgroundColor: '#7b3ee430',
                fill: true
            }
        ]

    }

    // The option values for the chart.
    const option: OptionValues = {
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: false,
                text: "Transactions"
            }
        },
        interaction: {
            intersect: false,
        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone'
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, // disable x grid
                },
                ticks: {
                    display: true, // disable x labels
                },
            },
            y: {
                min: 0, // set custom minimum value
                max: Math.max(...values) + 0.5, // set custom maximum value
                grid: {
                    display: true, // disable y grid
                    color: "#f2f2f2"
                },
                ticks: {
                    display: false, // disable y labels
                },
            },
        },
    }

    return (
        <div className="statisticsChart">
            {labels.length < 1
                ?
                <div className="loader-container">
                    <img src={Loader} />
                </div>
                :
                <Line data={chartData}
                    height={300}
                    options={option}
                />}
        </div>
    )
}
