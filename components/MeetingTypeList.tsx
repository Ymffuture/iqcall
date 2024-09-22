/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';

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
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `https://iqcall.vercel.app/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
return (
  <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-4">
    <HomeCard
      img="/icons/add-meeting.svg"
      title="New Meeting"
      description="Start an instant meeting"
      className="transform transition-transform hover:scale-105 shadow-lg rounded-lg p-5 bg-white dark:bg-gray-800"
      handleClick={() => setMeetingState('isInstantMeeting')}
    />
    <HomeCard
      img="/icons/join-meeting.svg"
      title="Join Meeting"
      description="via invitation link"
      className="bg-blue-500 hover:bg-blue-600 transition-colors transform hover:scale-105 shadow-lg rounded-lg p-5 text-white"
      handleClick={() => setMeetingState('isJoiningMeeting')}
    />
    <HomeCard
      img="/icons/schedule.svg"
      title="Schedule Meeting"
      description="Plan your meeting"
      className="bg-purple-500 hover:bg-purple-600 transition-colors transform hover:scale-105 shadow-lg rounded-lg p-5 text-white"
      handleClick={() => setMeetingState('isScheduleMeeting')}
    />
    <HomeCard
      img="/icons/recordings.svg"
      title="View Recordings"
      description="Meeting Recordings"
      className="bg-yellow-500 hover:bg-yellow-600 transition-colors transform hover:scale-105 shadow-lg rounded-lg p-5 text-white"
      handleClick={() => router.push('/recordings')}
    />

    {!callDetail ? (
      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={createMeeting}
        className="bg-white rounded-lg p-6 shadow-xl"
      >
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-gray-700">
            Add a description
          </label>
          <Textarea
            className="border-none bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-gray-700">
            Select Date and Time
          </label>
          <ReactDatePicker
            selected={values.dateTime}
            onChange={(date) => setValues({ ...values, dateTime: date! })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </MeetingModal>
    ) : (
      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({ title: 'Link Copied' });
        }}
        image={'/icons/checked.svg'}
        buttonIcon="/icons/copy.svg"
        className="text-center bg-white rounded-lg p-6 shadow-xl"
        buttonText="Copy Meeting Link"
      />
    )}

    <MeetingModal
      isOpen={meetingState === 'isJoiningMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Type the link here"
      className="text-center bg-white rounded-lg p-6 shadow-xl"
      buttonText="Join Meeting"
      handleClick={() => router.push(values.link)}
    >
return (
  <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-4">
    <HomeCard
      img="/icons/add-meeting.svg"
      title="New Meeting"
      description="Start an instant meeting"
      className="transform transition-transform hover:scale-105 shadow-lg rounded-lg p-5 bg-white dark:bg-gray-800"
      handleClick={() => setMeetingState('isInstantMeeting')}
    />
    <HomeCard
      img="/icons/join-meeting.svg"
      title="Join Meeting"
      description="via invitation link"
      className="bg-blue-500 hover:bg-blue-600 transition-colors transform hover:scale-105 shadow-lg rounded-lg p-5 text-white"
      handleClick={() => setMeetingState('isJoiningMeeting')}
    />
    <HomeCard
      img="/icons/schedule.svg"
      title="Schedule Meeting"
      description="Plan your meeting"
      className="bg-purple-500 hover:bg-purple-600 transition-colors transform hover:scale-105 shadow-lg rounded-lg p-5 text-white"
      handleClick={() => setMeetingState('isScheduleMeeting')}
    />
    <HomeCard
      img="/icons/recordings.svg"
      title="View Recordings"
      description="Meeting Recordings"
      className="bg-yellow-500 hover:bg-yellow-600 transition-colors transform hover:scale-105 shadow-lg rounded-lg p-5 text-white"
      handleClick={() => router.push('/recordings')}
    />

    {!callDetail ? (
      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={createMeeting}
        className="bg-white rounded-lg p-6 shadow-xl"
      >
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-gray-700">
            Add a description
          </label>
          <Textarea
            className="border-none bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-gray-700">
            Select Date and Time
          </label>
          <ReactDatePicker
            selected={values.dateTime}
            onChange={(date) => setValues({ ...values, dateTime: date! })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </MeetingModal>
    ) : (
      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({ title: 'Link Copied' });
        }}
        image={'/icons/checked.svg'}
        buttonIcon="/icons/copy.svg"
        className="text-center bg-white rounded-lg p-6 shadow-xl"
        buttonText="Copy Meeting Link"
      />
    )}

    <MeetingModal
      isOpen={meetingState === 'isJoiningMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Type the link here"
      className="text-center bg-white rounded-lg p-6 shadow-xl"
      buttonText="Join Meeting"
      handleClick={() => router.push(values.link)}
    >
      <Input
        placeholder="Meeting link"
        onChange={(e) => setValues({ ...values, link: e.target.value })}
        className="border-none bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </MeetingModal>

    <MeetingModal
      isOpen={meetingState === 'isInstantMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Start an Instant Meeting"
      className="text-center bg-white rounded-lg p-6 shadow-xl"
      buttonText="Start Meeting"
      handleClick={createMeeting}
    />
  </section>
);


export default MeetingTypeList;
