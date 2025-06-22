'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import ReactDatePicker from 'react-datepicker';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import Loader from './Loader';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');

      const startsAt = values.dateTime.toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      });

      setCallDetail(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: 'Meeting Created Successfully' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `https://iqcall.vercel.app/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Cards */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-gradient-to-br from-blue-600 to-blue-400 hover:scale-105 transition-transform rounded-2xl p-6 text-white shadow-xl"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Use an invitation link"
        className="bg-gradient-to-br from-green-500 to-teal-400 hover:scale-105 transition-transform rounded-2xl p-6 text-white shadow-xl"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan a meeting ahead"
        className="bg-gradient-to-br from-purple-600 to-fuchsia-500 hover:scale-105 transition-transform rounded-2xl p-6 text-white shadow-xl"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Access your meeting history"
        className="bg-gradient-to-br from-yellow-500 to-orange-400 hover:scale-105 transition-transform rounded-2xl p-6 text-white shadow-xl"
        handleClick={() => router.push('/recordings')}
      />

      {/* Schedule Modal */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create a Scheduled Meeting"
          handleClick={createMeeting}
          className="rounded-xl p-6 bg-dark-2 shadow-2xl text-white"
        >
          <div className="flex flex-col gap-4">
            <label className="text-md font-semibold">Meeting Description</label>
            <Textarea
              placeholder="Team sync, stand-up, etc."
              className="bg-dark-3 text-white border border-dark-4 rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label className="text-md font-semibold">Date & Time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded-md bg-dark-3 text-white px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created Successfully"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
          className="rounded-xl p-6 text-center bg-dark-2 text-white shadow-xl"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Meeting link copied' });
          }}
        />
      )}

      {/* Join Modal */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Join with a Link"
        buttonText="Join Meeting"
        className="rounded-xl p-6 bg-dark-2 text-white shadow-xl"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Paste your meeting link"
          className="bg-dark-3 text-white border border-dark-4 rounded-md focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Now"
        className="rounded-xl p-6 text-center bg-dark-2 text-white shadow-xl"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;

