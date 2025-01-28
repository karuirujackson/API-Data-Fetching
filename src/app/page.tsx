import React from 'react';
import FetchData from './components/FetchData';
import FetchSinglePatient from './components/FetchSinglePatient';

function Home() {
  return (
    <div>
      {/* <FetchData /> */}
      <FetchSinglePatient />
    </div>
  )
}

export default Home;