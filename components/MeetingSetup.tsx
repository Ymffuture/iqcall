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

  if (callTimeNotArrived)
    return (
      <Alert title={`Your Meeting is scheduled for ${callStartsAt.toLocaleString()}`} />
    );

  if (callHasEnded)
    return (
      <Alert title="The call has ended." iconUrl="/icons/call-ended.svg" />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#f8f9fa] px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Get Ready</h1>

      {/* Video Preview Section */}
      <div className="w-full max-w-xl rounded-xl overflow-hidden shadow-lg border border-gray-300 bg-white">
        <VideoPreview />
      </div>

      {/* Controls */}
      <div className="mt-6 flex w-full max-w-xl items-center justify-between px-2">
        {/* Toggle */}
        <label className="flex items-center gap-3 text-sm text-gray-700 font-medium">
          <span>Join with mic/cam off</span>
          <div className="relative inline-block w-11 h-6">
            <input
              type="checkbox"
              id="micCamToggle"
              className="opacity-0 w-0 h-0 peer"
              checked={isMicCamToggled}
              onChange={(e) => setIsMicCamToggled(e.target.checked)}
            />
            <div className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all peer-checked:translate-x-5"></div>
          </div>
        </label>

        {/* Device Settings */}
        <DeviceSettings />
      </div>

      {/* Join Button */}
      <Button
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
        className="mt-6 bg-[#1A73E8] hover:bg-[#0F59C9] text-white font-medium px-6 py-3 rounded-md shadow-md transition-all"
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;

