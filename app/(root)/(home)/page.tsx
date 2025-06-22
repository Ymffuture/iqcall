'use client';

import { useState, useEffect } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';
import CallList from '@/components/CallList';

const Home = () => {
  const [dateTime, setDateTime] = useState({
    time: new Date().toLocaleTimeString('en-UK', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    date: new Intl.DateTimeFormat('en-UK', { dateStyle: 'full' }).format(new Date()),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime({
        time: now.toLocaleTimeString('en-UK', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        date: new Intl.DateTimeFormat('en-UK', { dateStyle: 'full' }).format(now),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col gap-8 px-4 py-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 text-white">
      {/* Clock and Upcoming Call Card */}
      <div className="relative h-[320px] w-full rounded-3xl bg-gradient-to-tr from-[#1E90FF] via-blue-500 to-[#32CD32] shadow-xl overflow-hidden">
        <div className="flex h-full flex-col justify-between p-6 sm:p-10 lg:p-12 backdrop-blur-md">
          {/* Upcoming Meeting Title */}
          <div className="self-start rounded-md px-4 py-2 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white tracking-wide uppercase">
            Upcoming Meeting
          </div>

          {/* CallList Inside Gradient Card */}
          <div className="absolute top-20 right-6 w-[250px] max-h-[120px] overflow-y-auto rounded-xl bg-white/10 p-3 backdrop-blur-md shadow-md">
            <CallList type="upcoming" />
          </div>

          {/* Time and Date */}
          <div className="mt-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold">{dateTime.time}</h1>
            <p className="text-lg sm:text-xl text-blue-100 font-medium">{dateTime.date}</p>
          </div>
        </div>
      </div>

      {/* Meeting Type List */}
      <div className="mt-4">
        <MeetingTypeList />
      </div>
    </section>
  );
};

export default Home;

