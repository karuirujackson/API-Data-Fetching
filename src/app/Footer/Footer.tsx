import React from 'react';
import Image from 'next/image';
import XLogo from '../assets/X.svg';
import Instagram from '../assets/Instagram.svg';

function Footer() {
  return (
    <section className='relative top-28'>
        <footer className="flex flex-col items-center justify-center px-4 gap-8">
            <div className="flex gap-6">
                <Image src={Instagram} alt='Instagram-Logo' />
                <Image src={XLogo} alt='X-Logo' />
            </div>
            <span className=" flex items-center justify-center leading-6 font-normal text-[#9CA3AF] text-base">© 2024 Along With, Inc. All rights reserved.</span>
        </footer>
    </section>
  )
}

export default Footer