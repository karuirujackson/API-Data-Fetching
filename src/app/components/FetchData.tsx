import React, { useEffect } from 'react';

const BASE_URL = '';

let username = ''
let password = ''
let AuthToken = btoa(`${username}: ${password}`);

const requestAcces = {
    headers: {
        'authorization': `Basic ${AuthToken}`
    }
}

export default function FetchData() {

    useEffect(() => {
        const Fetchpatients = async () => {
            const response = await fetch(`${BASE_URL}`, requestAcces);
            const patients = await response.json();
            setpatients(patients);
        }
    }, [])
  return (
    <div>FetchData</div>
  )
}
