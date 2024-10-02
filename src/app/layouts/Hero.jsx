"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { alt } from '@/doc/alt'
import Logo from '../../../public/assets/logoHero.svg'
import HeroPhoto from '../../../public/assets/hero.jpg'
import Link from 'next/link'
import { Asap, Lexend } from "next/font/google";

const asap = Asap({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax effect calculations for the hero image
  const scaleImage = 1 + scrollY * 0.0002; // Enlarge the image slightly when scrolling
  const brightnessImage = 1 + scrollY * 0.00011; // Increase brightness while scrolling
  const scaleText = 1 + scrollY * 0.0001; // Enlarge the image slightly when scrolling
  const opacity = 1 - scrollY * 0.0019 ; // Increase brightness while scrolling


  return (
    <div className='flex relative  pl-[5vw] pr-[5vw] w-full bg-slate-200 min-h-[calc(100vh_-_3.6rem)]'>
      <div className='flex flex-col   items-center justify-center w-2/4'>
        <div style={{ transform: `scale(${scaleText})`, filter: `opacity(${opacity})`}}  className='flex z-10  flex-col gap-10 '>
          <div> 
            <Image className='2xl:min-w-[300px]' src={Logo} alt={alt.alt} /> 
          </div> 
          <div  className='flex flex-col gap-2 2xl:gap-3'>  
            <div><p className='text-xl 2xl:text-3xl'>Lorem ipsum dolor sit amet</p></div> 
            <div className='max-w-[500px] 2xl:max-w-[700px]'>
              <h1 className={`${"text-3xl 2xl:text-5xl font-semibold"} ${asap.className}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h1>
            </div>
          </div>
          <div>
            <button className={lexend.className}><Link href="/kontakt">elérhetőség</Link></button>
          </div> 
        </div>
      </div>

      <div className='w-2/4 h-full'>
        {/* Empty for layout purposes */}
      </div>
      
      {/* Hero image with scaling and brightness effect */}
      <Image 
        className='absolute h-full object-cover z-0 left-0' 
        src={HeroPhoto} 
        alt={alt.alt} 
        style={{ 
          transform: `scale(${scaleImage})`, 
          filter: `brightness(${brightnessImage})` // Adjust brightness dynamically based on scroll
        }}
      />
    </div>
  );
}

export default Hero;
