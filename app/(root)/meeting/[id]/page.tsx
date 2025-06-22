'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const isUserAllowed =
    call?.type !== 'invited' ||
    (user && call?.state?.members?.some((m) => m.user.id === user.id));

  // ===========================
  // LOADING STATE
  // ===========================
  if (!isLoaded || isCallLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D1117] text-white">
        <div className="flex flex-col items-center justify-center gap-3 animate-pulse">
          <Loader className="w-10 h-10 text-[#1877F2]" />
          <p className="text-lg font-medium">Preparing your meeting...</p>
        </div>
      </div>
    );
  }

  // ===========================
  // CALL NOT FOUND
  // ===========================
  if (!call) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D1117] text-white">
        <div className="rounded-lg bg-[#1E1E2E] px-6 py-4 shadow-xl">
          <p className="text-2xl font-bold">🚫 Call Not Found</p>
          <p className="text-sm text-gray-400 mt-2">Double-check your invite or meeting ID.</p>
        </div>
      </div>
    );
  }

  // ===========================
  // PERMISSION DENIED
  // ===========================
  if (!isUserAllowed) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D1117]">
        <Alert title="🚷 You are not allowed to join this meeting" />
      </div>
    );
  }

  // ===========================
  // MAIN MEETING CONTENT
  // ===========================
  return (
    <main className="h-screen w-full bg-[#0D1117] text-white overflow-hidden">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;

