'use client'

import React, { useEffect, useState } from 'react';

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


    return (
        <div className='flex flex-col mt-3 ml-3 min-h-screen'>
            <h1 className="text-3xl text-cyan-500 underline text-center pb-5 tracking-wider uppercase">Patient Medical Information</h1>
            {
                patient ? (
                    <div className='grid grid-cols-1 gap-6'>
                        <div key={patient.name} className='bg-gray-100 p-4 shadow-lg hover:shadow-2xl rounded-lg transition'>
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
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No patient data found</p>
                )
            }
            
        </div>
    );
};
