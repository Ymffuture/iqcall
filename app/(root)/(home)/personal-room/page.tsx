"use client";
import {Helmet} from "react-helmet" ;
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Table = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-4">
      <span className="text-sm font-semibold text-sky-400 xl:w-32">{title}:</span>
      <span className="text-sm font-medium text-white break-all">{description}</span>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);
  const meetingLink = `https://iqcall.vercel.app/meeting/${meetingId}?personal=true`;

  const startRoom = async () => {
    if (!client || !user) return;
    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({ title: "🔗 Invitation link copied!" });
  };

  return (
    <section className="flex w-full flex-col gap-10 text-white">
      <Helmet >
      <title >
      Personal room
      </title >
      </Helmet>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Personal Meeting Room</h1>
        <p className="text-sm text-gray-400">Manage your private room and send invites to friends or clients.</p>
      </header>

      <div className="w-full max-w-4xl space-y-5 rounded-lg bg-[#1E1E2E]/50 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-md">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          className="rounded-md bg-[#1877F2] hover:bg-[#166FE0] transition-colors px-6 py-2 text-white font-semibold"
          onClick={startRoom}
        >
          🚀 Start Meeting
        </Button>

        <Button
          variant="outline"
          className="border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors px-6 py-2"
          onClick={handleCopy}
        >
          📋 Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;

