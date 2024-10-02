import React from 'react'
import Image from 'next/image'
import Buza from '../../../public/assets/buza.png'
import BioLogo from '../../../public/assets/bioLogo.png'

import { alt } from '@/doc/alt'

const Termeny = () => {
  return (
    <div className='flex z-10'>
       
        <div className='w-1/2 overflow-hidden relative'>
            <Image className='object-cover top-0 left-0 absolute min-h-full 2xl:max-h-[1000px] ' src={Buza} alt={alt.alt} /> 
        </div>
       
       
        {/* Right side with content */}
       
    <div className='w-1/2  z-10 flex flex-col items-center bg-section-gradient pl-[90px] pb-[90px] pt-[60px] 2xl:pt-[100px] pr-[90px]'>
       <div>
        <div className='flex gap-[10px]'>
         
          <div>
            <p className='text-xl 2xl:text-3xl text-[#BCBCBC] font-bold '>1.</p>
          </div>
         
          <div>
            <h1 className='text-xl 2xl:text-3xl font-bold '> Terménykereskedelem</h1>
            <p className='text-l 2xl:text-xl mb-10'>Bio és konvencionális termények</p>
          </div>
         
        </div>
      

        {/* Regular products */}
        <h2 className='text-lg 2xl:text-xl mb-2'>Szokvány termények</h2>
        <ul className='grid font-semibold  2xl:text-lg grid-cols-4 whitespace-nowrap grid-rows-4 gap-y-2 mb-4'>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Búza</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Árpa</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Kukorica</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Napraforgó</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Zab</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Szója</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Triticalé</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Repce</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Rozs</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Durum</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Tönköly</li>
        </ul>

        {/* Special products */}
        <h2 className='text-lg 2xl:text-xl mb-2'>Speciális termények</h2>
        <ul className='grid font-semibold   2xl:text-lg grid-cols-4 whitespace-nowrap fit-mody grid-rows-4 gap-y-2 mb-4'>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Borsó</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Sörárpa</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Popcorn</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Csíkos napraforgó</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Kömény</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Fénymag</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Köles</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Lenmag</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Mák</li>
          <li><span className='text-[#004E1B] mr-[7.5px]'>▪️</span>Piros kukorica</li>
        </ul>

        {/* Bio products */}
        <h2 className='text-lg 2xl:text-xl mb-2'>BIO termények</h2>
        <ul className='mb-10 font-semibold  2xl:text-lg'>
          <li>▪️ Terményeink biovariánsai</li>
        </ul>

        {/* Footer section */}
        <p className='mb-10 2xl:text-lg '>
          A MirAgro Kft.-nél széles termékpalettával, rugalmas hozzáállással, egyénre szabott fizetési feltételekkel és kiemelt logisztikai támogatással várjuk ügyfeleinket!
        </p>

        {/* Bio Garancia logo */}
        <Image src={BioLogo} alt='Bio Garancia logo' width={70} height={70} />
             </div>
        </div>
        </div>
  )
}

export default Termeny