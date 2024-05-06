
'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import store from "@/public/about-us/2.png"
import product from "@/public/about-us/3.png"
import service from "@/public/about-us/4.png"
import security from "@/public/about-us/5.png"
import { Button } from '@nextui-org/react'
import { LuChevronRightCircle } from "react-icons/lu";
import { useAppSelector } from '@/redux/hooks'




export default function page() {


  const scrollToSection = (section: string) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <main className='w-full bg-green-100 p-16 '>
      <section className='md:max-w-screen-lg mx-auto mt-8  rounded-lg'>
        <div className='space-y-4 mb-4'>


        <p className='text-lg text-center '>Our Journey, Our Impact</p>
          <h1 className='text-5xl font-bold text-center uppercase '>Learn More About Hupe!</h1>



          
        </div>

        <div className='flex flex-wrap justify-center mt-12'>


          <div className='bg-blue-10  relative w-[240px] h-[240px] ' >
            <div className='absolute top-4 left-4 '>
              <p className='text-3xl font-semibold text-black'>Our Store</p>
              <p className='text-sm font-normal'>Discover convenience and quality in every visit.</p>
              <LuChevronRightCircle size={24} className='mt-4' onClick={() => scrollToSection('store')} />

            </div>
            
            <Image src={store} alt='store' width={160} height={160} className='absolute right-0 bottom-0'/>
          </div>


          <div className='bg-green-10 relative flex items-end justify-end w-[240px] h-[240px] '>
            <div className='absolute top-4 left-4 text-3xl  '> <p className="text-3xl font-semibold text-black">Our Product</p>
              <p className='text-sm font-normal'>Experience innovation tailored to your needs.</p>
              <LuChevronRightCircle size={24} className='mt-4' onClick={() => scrollToSection('product')} />
            </div>
              
              <Image src={product} alt='store' width={160} height={160}  />
              
            
          </div>

          <div className='bg-orange-10 relative flex items-end justify-end w-[240px] h-[240px] ' >
            <div className='absolute top-4 left-4 text-3xl font-semibold text-black '>
              <p className="text-3xl font-semibold text-black">Our Service</p>
              <p className='text-sm font-normal'>Personalized support at every step of your journey</p>
              <LuChevronRightCircle size={24} className='mt-4' onClick={() => scrollToSection('service')} /></div>
            <Image src={service} alt='store' width={160} height={160} />
          </div>

          <div className='bg-yellow-10  relative flex items-end justify-end w-[240px] h-[240px] '>
            <div className='absolute top-4 left-4 text-3xl font-semibold text-black '>  <p className="text-3xl font-semibold text-black">Your Privacy</p>  <p className='text-sm font-normal'>Your security is our top priority.</p>
            <LuChevronRightCircle size={24} className='mt-4' onClick={() => scrollToSection('privacy')} /></div>
            <Image src={security} alt='store' width={160} height={160} />
          </div>

        </div>

        

      {/* section group */}
        
          <div id="store" className='md:my-16 my-8 md:p-16 p-8 bg-slate-50 rounded-xl '>
            <h2 className='md:text-2xl text-xl font-bold  uppercase text-center mb-4'>Our Store</h2>
            <p>In Phnom Penh, 2022, hupe ignited a spark. Discover, not just a store, but a style portal. Clothing, jewelry, bags - treasures waiting. A generation resonated, seeking expression, not outfits. Discover became a haven for the bold and diverse. Today, Discover empowers everyone to find their unique style. A testament to hupe is inclusivity. Discover: Your style story unfolds.</p>
          </div>

          <div id="product" className='md:my-16 my-8  md:p-16 p-8 bg-slate-50 rounded-xl'>
            <h2 className='md:text-2xl text-xl font-bold  uppercase text-center mb-4'>Our Product</h2>
            <p>Discover doesn't compromise on quality. We use carefully selected materials and expert craftsmanship to ensure our clothing, jewelry, and bags are built to last.</p>
          </div>


          <div id="service" className='md:my-16 my-8 md:p-16 p-8 bg-slate-50 rounded-xl'>
            <h2 className='md:text-2xl text-xl font-bold  uppercase text-center mb-4'>Our Service</h2>
            <p>From the moment you place your order at Discover, you're in control. Track your package every step of the way with our convenient tracking system and enjoy the peace of mind of knowing exactly when your new treasures will arrive.</p>
          </div>


          <div id="privacy" className='md:my-16 my-8 md:p-16 p-8 bg-slate-50 rounded-xl'>
            <h2 className='md:text-2xl text-xl font-bold  uppercase text-center mb-4'>Your Privacy</h2>
            <p>we take a proactive approach to ensuring the safety and security of our clients and their assets. We understand that the peace of mind that comes from knowing your security is safe with us is invaluable. Our team is dedicated to implementing the latest security measures and protocols, ensuring that we provide a secure environment for all our clients. We are committed to staying current with best practices in security management, regularly attending security conferences and workshops to enhance our skills and stay informed about the latest security technologies and trends.</p>
          </div>


      

      </section>




    </main>

  )
}
