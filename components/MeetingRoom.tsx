'use client';
import {Helmet} from 'react-helmet' ;
import { useState } from 'react';
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
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0b0f1a] text-white">
      {/* Main video display area */}
      <Helmet >
      <title >Metting Room setup</title >
      </Helmet>
      <div className="relative flex size-full items-center justify-center">
        <div className="flex h-full w-full max-w-[1200px] items-center justify-center px-2">
          <CallLayout />
        </div>

        {/* Participants Panel - Slide In */}
        <div
          className={cn(
            'absolute right-0 top-0 h-full w-[320px] transition-transform duration-300 z-30 bg-[#111827] shadow-xl border-l border-[#1f2937]',
            showParticipants ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Bottom Controls Dock */}
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 flex items-center justify-center gap-4 rounded-full bg-white/10 backdrop-blur-md px-6 py-3 shadow-lg ring-1 ring-white/10">
        <CallControls onLeave={() => router.push(`/`)} />

        {/* Layout Dropdown */}
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

        {/* Stats */}
        <CallStatsButton />

        {/* Participants Button */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="rounded-full bg-[#1f2937] p-2 hover:bg-[#374151] transition-all"
        >
          <Users size={20} className="text-white" />
        </button>

        {/* End Call (non-personal) */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;

