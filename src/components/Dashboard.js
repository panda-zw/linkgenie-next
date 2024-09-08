"use client"

import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

function Dashboard() {
    return (
        <div className='mt-5 flex flex-col items-center justify-center'>
            <div className="mt-6 to-black1 flex justify-between space-x-28">
                <div className="bg-green-600 hover:bg-green-500 rounded py-3 px-20 transition">
                    <p className="text-center text-white">Total Cases</p>
                    <h1 className="font-semi text-center text-2xl text-white">22</h1>
                </div>
                <div className="bg-green-600 hover:bg-green-500 rounded py-3 px-20 transition">
                    <p className="text-center text-white">Total Cases</p>
                    <h1 className="font-semi text-center text-2xl text-white">22</h1>
                </div>
                <div className="bg-green-600 hover:bg-green-500 rounded py-3 px-20 transition">
                    <p className="text-center text-white">Total Cases</p>
                    <h1 className="font-semi text-center text-2xl text-white">22</h1>
                </div>
                <div className="bg-green-600 hover:bg-green-500 rounded py-3 px-20 transition">
                    <p className="text-center text-white">Total Cases</p>
                    <h1 className="font-semi text-center text-2xl text-white">22</h1>
                </div>
            </div>
            <div className="mt-8 w-full">
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
        </div>
    )
}

export default Dashboard;
