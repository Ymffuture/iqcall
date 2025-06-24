"use client";

import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

const InfiniteHorizontalScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    };

    container.addEventListener('wheel', handleWheel);
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto gap-3 no-scrollbar px-4 py-2 max-w-full"
    >
      {children}
    </div>
  );
};

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout pageSize={6} />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <>
    <Head>
        <title>Meeting setup Room Live</title>
        <meta name="description" content="Join your personal video meeting room." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <section className="relative h-screen w-full overflow-hidden bg-[#0b0f1a] text-white">
      

      <div className="relative flex size-full items-center justify-center">
        <div className="flex h-full w-full max-w-[1200px] items-center justify-center px-2">
          <CallLayout />
        </div>

        <div
          className={cn(
            'absolute right-0 top-0 h-full w-[320px] transition-transform duration-300 z-30 bg-[#111827] shadow-xl border-l border-[#1f2937]',
            showParticipants ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 w-[95%] md:w-auto">
        <InfiniteHorizontalScroll>
          <div className="flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 shadow-md ring-1 ring-white/10">
            <CallControls onLeave={() => router.push(`/`)} />

            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full bg-[#1f2937] p-2 hover:bg-[#374151] transition-all">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none bg-[#1f2937] text-white shadow-md">
                {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      className="hover:bg-[#2563eb] hover:text-white transition-colors"
                      onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                    >
                      {item}
                    </DropdownMenuItem>
                    {index < 2 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <CallStatsButton />

            <button
              onClick={() => setShowParticipants((prev) => !prev)}
              className="rounded-full bg-[#1f2937] p-2 hover:bg-[#374151] transition-all"
            >
              <Users size={20} className="text-white" />
            </button>

            {!isPersonalRoom && <EndCallButton />}
          </div>
        </InfiniteHorizontalScroll>
      </div>
    </section>
    </>
  );
};

export default MeetingRoom;

