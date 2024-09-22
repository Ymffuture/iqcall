"use client";

import { useEffect, useState } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const updateTime = () => {
    const now = new Date();
    setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setDate(new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now));
  };

  useEffect(() => {
    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="bg-opacity-70 bg-black rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: {time}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-yellow-300 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
