'use client'

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, LinearScale, PointElement, Title, Tooltip, Legend, CategoryScale, LineElement } from 'chart.js'

const BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

let username = 'coalition';
let password = 'skills-test';
let authToken = btoa(`${username}:${password}`);
//Allows access to the API endpoint otherwise a fetch error.
const requestAcces = {
    headers: {
        'authorization': `Basic ${authToken}`
    }
}

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale);
interface PATIENT {
    name: string;
    gender: string;
    age: number;
    profile_picture: string;
    date_of_birth: string;
    phone_number: string;
    emergency_contact: number;
    insurance_type: string;
    diagnosis_history: DiagnosisHistory[];
}

interface DiagnosisHistory{
    month: string;
    year: number;
    blood_pressure: BloodPressure;
    heart_rate: {value:number, levels: string};
    respiratory_rate: {value:number, levels: string};
    temperature: {value:number, levels: string};
}

interface BloodPressure {
    systolic:{value:number, levels:string};
    diastolic: {value:number, levels: string};
}


export default function FetchData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [patient, setPatient] = useState<PATIENT | null>(null) //Expect single patients information

    useEffect(() => {
        const Fetchpatients = async () => {
            setIsLoading(true);
            //Fetch data from an API inside a try-catch block
            try {
                const response = await fetch(`${BASE_URL}`, requestAcces);
                const patients: PATIENT[] = await response.json();
                const patientJessica = patients.find((p) => p.name === 'Jessica Taylor'); //Filter Jessica Taylor form the data
                if (!patientJessica) {
                    throw new Error('Jessica Taylor is not found in the data!')
                }
                setPatient(patientJessica); // Set Jessica Taylor's data to state
            } catch (e:any) {
                setError(e.message || 'An expected error occurred!');
            } finally {
                setIsLoading(false);
            }
        }
        Fetchpatients();
    }, []);

    if (isLoading) {
        return <div className=" flex mt-5 ml-5 text-red-500 text-2xl">Loading...</div>
    }

    if(error) {
        return <div className="flex mt-5 ml-5 text-red-500 text-2xl">Something went wrong, consider trying again later!</div>
    }

    //Displaying patient data in a graph to show the blood pressure over time
    const chartData = patient ? {
        labels: patient.diagnosis_history.map((history) => `${history.month}, ${history.year}`),
        datasets: [
            {
                label: 'Systolic',
                data: patient.diagnosis_history.map((history) => history.blood_pressure.systolic.value),
                borderColor: '#E57373',
                backgroundColor: 'rgba(100, 181, 246, 0.5',
                tension: 0.4,
            },
            {
                label: 'Diastolic',
                data: patient.diagnosis_history.map((history) => history.blood_pressure.diastolic.value),
                borderColor: 'rgba(100, 181, 246, 0.5',
                backgroundColor: '#64B5F6',
                tension: 0.4,
            }
        ],
    } : null;

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top as const',
            },
            title: {
                display: true,
                text: 'Blodd Pressure Over Time'
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Blood Pressure (mmHg'
                },
                min: 0,
                max: 200,
            },
        },
    }

    return (
        <div className='flex flex-col mt-3 ml-3 min-h-screen mx-auto'>
            <h1 className="text-3xl text-cyan-500 underline text-center pb-5 tracking-wider uppercase">Patient Medical Information</h1>
            {
                patient ? (
                    <div className='grid grid-cols-2 gap-6 shadow-lg hover:shadow-2xl p-4 rounded-lg transition bg-gray-100'>
                        <div key={patient.name} className='mt-5'>
                            <img src={patient.profile_picture} alt={`${patient.name}'s Profile`} className='w-24 h-24 rounded-full mx-auto mb-4'/>
                            <h2 className="text-xl font-semibold text-center">
                                {patient.name}
                            </h2>
                            <p className="text-gray-600 text-center">
                                <strong>Age:</strong> {patient.age}
                            </p>
                            <p className="text-gray-600 text-center">
                                <strong>Phone No:</strong> {patient.phone_number}
                            </p>
                            <p className="text-gray-400 text-center">
                                <strong>Insurance:</strong> {patient.insurance_type}
                            </p>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-xl font-semibold">Diagnosis History:</h3>
                            <div className="my-6">
                                {
                                    chartData && <Line data={chartData} options={chartOptions} />
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No patient data found</p>
                )
            }
            
        </div>
    );
};
