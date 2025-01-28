'use client'

import React, { useEffect, useState } from 'react';

const BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

let username = 'coalition';
let password = 'skills-test';
let authToken = btoa(`${username}:${password}`);
const requestAcces = {
    headers: {
        'authorization': `Basic ${authToken}`
    }
}

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
    const [patients, setPatients] = useState<PATIENT[]>([])

    useEffect(() => {
        const Fetchpatients = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}`, requestAcces);
                const patients = await response.json();
                setPatients(patients);
            } catch (e:any) {
                setError(e);
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
  return (
    <div className='flex flex-col mt-3 ml-3 min-h-screen'>
        <h1 className="text-3xl text-cyan-500 underline text-center pb-5 tracking-wider uppercase">Patients Medical Information</h1>
        <ul className='grid grid-cols-2 gap-6'>
            {
                patients.map((patient) => {
                    return <li key={patient.name} className='bg-white p-4 shadow-md hover:shadow-2xl rounded-lg transition'>
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
                        <p className="text-gray-100 text-center">
                            <strong>Insurance:</strong> {patient.insurance_type}
                        </p>
                    </li>
                })
            }
        </ul>
    </div>
  )
}
