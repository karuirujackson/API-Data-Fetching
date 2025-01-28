import Link from 'next/link';
import React from 'react';
import Footer from './components/FetchData';

function Home() {
  return (
    <div>
      <Link href='/footer'><Footer /></Link>
    </div>
  )
}

export default Home;