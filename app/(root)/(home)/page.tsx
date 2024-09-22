'use client';

import { useState, useEffect } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';
import CallList from '@/components/CallList';

const Home = () => {
  // State to store current date and time
  const [dateTime, setDateTime] = useState({
    time: new Date().toLocaleTimeString('en-UK', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    }),
    date: new Intl.DateTimeFormat('en-UK', { dateStyle: 'full' }).format(new Date()),
  });

  // useEffect to update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime({
        time: now.toLocaleTimeString('en-UK', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // 24-hour format
        }),
        date: new Intl.DateTimeFormat('en-UK', { dateStyle: 'full' }).format(now),
      });
    }, 1000); // Updates every minute

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <section className="flex flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 shadow-xl">
        <div className="flex h-full flex-col justify-between p-5 lg:p-11">
          <h2 className="glassmorphism max-w-[300px] rounded py-2 text-center text-sm font-medium bg-white bg-opacity-20">
            Upcoming Meeting:
          </h2>
          <p className="h-[10%] absolute bg-hero"> <CallList type="upcoming"/> </p>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-6xl">{dateTime.time}</h1>
            <p className="text-lg font-semibold text-blue-200 lg:text-2xl">{dateTime.date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
