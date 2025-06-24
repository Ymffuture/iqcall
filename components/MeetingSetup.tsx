
'use client';

import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

import {
  Video,
  VideoOff,
  Mic,
  MicOff
} from 'lucide-react';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();

  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();
  if (!call) throw new Error('useStreamCall must be used within a StreamCall component.');

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived) {
    return <Alert title={`Your Meeting is scheduled for ${callStartsAt.toLocaleString()}`} />;
  }

  if (callHasEnded) {
    return <Alert title="The call has ended." iconUrl="/icons/call-ended.svg" />;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] px-4 py-8 text-gray-800">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-6">Setup Your Meeting</h1>

      {/* Video Preview */}
      <div className="w-full max-w-xl rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-2xl p-2 backdrop-blur-md">
        <VideoPreview />
      </div>

      {/* Toggle & Device Settings */}
      <div className="mt-6 flex w-full max-w-xl items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsMicCamToggled(!isMicCamToggled)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 shadow-md transition-all bg-white hover:bg-gray-100 text-sm font-medium"
          >
            {isMicCamToggled ? (
              <>
                <VideoOff className="text-red-500" size={18} />
                <MicOff className="text-red-500" size={18} />
                <span className="text-red-500">Mic & Cam Off</span>
              </>
            ) : (
              <>
                <Video className="text-green-600" size={18} />
                <Mic className="text-green-600" size={18} />
                <span className="text-green-600">Mic & Cam On</span>
              </>
            )}
          </button>
        </div>

        <DeviceSettings />
      </div>

      {/* Join Button */}
      <Button
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
        className="mt-8 rounded-md bg-[#1a73e8] px-6 py-3 text-white hover:bg-[#1558d6] transition-all font-semibold text-sm shadow-lg"
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
