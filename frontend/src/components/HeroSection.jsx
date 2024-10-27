import React from 'react'
import { FaGithub } from 'react-icons/fa';
import logo from "../assets/kavach.png";
import Arrow from "../assets/Home/Arrow.svg";
import '../styles/animations.css';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-start pb-5 gap-10 px-18 md:flex-row md:gap-14 md:text-left xl:gap-40 ">
      <div className="py-4 pl-4 self-stretch flex flex-col items-start flex-[1_0_0] md:pl-32">
        <div className="py-4 flex flex-col items-start gap-4 md:py-0 pl-4">
          <div
          >
            <a href="/chatbot"><div className="flex py-1 px-2 items-start gap-2.5 rounded-[2.3125rem] border-2 border-blue-500 bg-white">
              <p className="font-normal pl-2">Chatbot</p>
              <div className="zoom-in"><figure><img src={Arrow} /></figure></div>
            </div></a>
          </div>
          <h1
            className="font-bold text-4xl leading-[3rem] tracking-[-0.06rem] md:leading-[3.75rem] 2xl:leading-[4.5rem] 2xl:text-6xl md:text-5xl">
            Discover the Platform where you belong
          </h1>
          <p
            className="text-slate-600 font-normal"><i>Kavach</i> streamlines disaster response, helping responders allocate resources efficiently to protect communities.</p>
        </div>
        <div
        className="flex flex-row gap-4 py-1 pl-4 md:py-4">
          <button className="py-2.5 px-5 rounded-lg bg-white border border-[#D0D5DD]"><a href="https://github.com/GDSC-CRCE/paypal-mafia-final" target='_blank'><div className='flex gap-3'><div className='zoom-in'><figure className='pt-1'><FaGithub /></figure></div><div>Github</div></div></a></button>
          <button className="py-2.5 px-5 rounded-lg bg-blue-500 text-white hover:text-black hover:bg-white hover:border-[#D0D5DD]"><a href="/add-issue">Add Issue</a></button>
        </div>
      </div>
      {/* <img className='w-[20rem] h-[20rem] xs:w-[25rem] xs:h-[25rem] sm:w-[35rem] sm:h-[35rem]' src={logo} alt="" /> */}
      <div
        className='w-[20rem] h-[20rem] m-auto md:ml-0 md:mb-0 md:mt-0 md:mr-40 overflow-hidden rounded-[5rem] border-solid border-[8px] border-blue-500'>
        <div className='zoom-in'>
          <figure><img className='w-full h-full' src={logo} alt="" /></figure>
        </div>
      </div>
    </div>
  )
}