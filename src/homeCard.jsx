// eslint-disable-next-line
import React, { useState } from 'react';
import './index.css';
import './design.css';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function HomeCard() {
  const [selected, setSelected] = useState('regular');
  const [ticket, setTicket] = useState(1);
  const navigate = useNavigate();

const handleNext = () => {
  const ticketData = {
    ticketType: selected,
    numOfTickets: ticket
  };
     localStorage.setItem('ticketData', JSON.stringify(ticketData));
  navigate("/attendeeForm");
};
  const handleSelect = (type) => {
    setSelected(type);
  
  }
  const handleTicketNum = (e) => {
    setTicket(e.target.value);
  };
   
  return (
    <>
    <div className="flex justify-center mt-7 text-white">
      <div class="p-2 m-2 rounded-3xl h-[650px] w-[400px] md:w-[600px] border border-[#0e464f] bg-[#07363e]">
      <div class="text-white text-[32px] font-normal font-['JejuMyeongjo'] pl-4">Ticket Selection</div>
      <div>
      <svg className='mx-auto m-4 w-[360px] md:w-[550px]' width="550" height="4" viewBox="0 0 604 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_5_2229)">
    <path d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H602C603.105 0.00012207 604 0.895553 604 2.00012C604 3.10469 603.105 4.00012 602 4.00012H2.00001C0.895441 4.00012 0 3.10469 0 2.00012Z" fill="#0E464F"/>
    <path d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H120C121.105 0.00012207 122 0.895553 122 2.00012C122 3.10469 121.105 4.00012 120 4.00012H2.00001C0.895436 4.00012 0 3.10469 0 2.00012Z" fill="#24A0B5"/>
  </g>
  <defs>
    <clipPath id="clip0_5_2229">
      <path d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H602C603.105 0.00012207 604 0.895553 604 2.00012C604 3.10469 603.105 4.00012 602 4.00012H2.00001C0.895441 4.00012 0 3.10469 0 2.00012Z" fill="white"/>
    </clipPath>
  </defs>
</svg>
</div>
            <div className="w-full md:w-[95%] rounded-3xl mx-auto bg-[#041E23] border-[1px] border-1-2 border-solid border-[#197686]">
        <div className="flex justify-center">
          <section
            id="sec-1"
            className="mt-6 w-[92%] bg-[#23a0b5] rounded-3xl border-l-2 border-r-2 border-b-2 border-[#07363e] backdrop-blur-[14px] flex justify-center"
          >
            <div className="mx-auto text-center">
            <p className="text-center text-neutral-50 font-roadRage text-[62px] font-normal font- leading-[62px]">Techember Fest ”25</p>
              <p>Join us for an unforgettable experience at</p>
              <p>StanxParty!! Secure your spot now</p>
              <p>Location || February 11, 2025</p>
            </div>
          </section>
        </div>

     
        <div className="mx-auto w-[90%] h-[2px] bg-[#197686] my-4"></div>

     
        <h2 className="text-sm pl-5 font-semibold mb-4 text-center md:text-left">
          Select Ticket Type:
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row justify-around p-2 rounded-2xl w-[90%] bg-[#0E464F] text-white">
       
            <div
              className={`p-2 border-2 border-solid border-[#197686] rounded-lg cursor-pointer mb-4 md:mb-0 ${
                selected === 'Regular' ? 'bg-[#197686]' : ''
              }`}
              onClick={() => handleSelect('Regular')}
            >
              <p className='text-lg font-bold'>Free</p>
              <p className='text-sm'>REGULAR ACCESS</p>
              <p className='text-xs'>20/52</p>
            </div>

      
            <div
              className={`py-4 px-6 border-2 border-solid border-[#197686] rounded-lg cursor-pointer mb-4 md:mb-0 ${
                selected === 'VIP' ? 'bg-[#197686]' : ''
              }`}
              onClick={() => handleSelect('VIP')}
            >
              <p className="text-lg font-bold">$150</p>
              <p className="text-sm">VIP ACCESS</p>
              <p className="text-xs">20/52</p>
            </div>

            <div
              className={`py-4 px-6 border-2 border-solid border-[#197686] rounded-lg cursor-pointer ${
                selected === 'VVIP' ? 'bg-[#197686]' : ''
              }`}
              onClick={() => handleSelect('VVIP')}
            >
              <p className="text-lg font-bold">$300</p>
              <p className="text-sm">VVIP ACCESS</p>
              <p className="text-xs">20/52</p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm pl-5 md:text-left mt-4">Number of tickets</p>
        <div className="flex justify-center mt-2">
          <select
            value={ticket}
            onChange={handleTicketNum}
            className="mx-auto w-[90%] p-3 rounded-lg bg-[#02191D] border border-solid border-[#197686]"
          >
           <option value='1'>1</option>
            <option value='2'>2</option>
             <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option> 
            <option value='6'>6</option>
          </select>
        </div>

      
        <div className="flex pb-7 flex-col md:flex-row justify-around my-6">
          <button className=" w-[90%] mx-auto md:w-[100%] py-2 rounded-md border border-solid border-[#197686] mb-4 md:mb-0">
            Cancel
          </button>
          <button 
               onClick={handleNext}
          className="bg-[#197686] rounded-md w-[90%] mx-auto md:w-[100%] py-2">Next</button>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}

export default HomeCard;
