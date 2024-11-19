import Link from 'next/link';
import React from 'react';
import Footer from './Footer/Footer';

function Home() {
  return (
    <div>
      <Link href='/footer'><Footer /></Link>
    </div>
  )
}

export default Home;