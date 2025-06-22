import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IQchat",
  description: "Video Calling App - Powered by Quorvex institute ",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/logo.png",
          },
          variables: {
            colorText: "#F0F2F5",                   // Facebook text gray
            colorPrimary: "#1877F2",                // Facebook blue
            colorBackground: "#0D1117",             // Dark background
            colorInputBackground: "#1C1E21",        // FB Messenger dark input
            colorInputText: "#E4E6EB",              // Input readability
            colorTextSecondary: "#B0B3B8",          // Light gray secondary
            colorDanger: "#F02849",                 // Facebook red for danger
            borderRadius: "0.5rem",                 // Rounded inputs/buttons
          },
        }}
      >
        <body
          className={`${inter.className} bg-[#0D1117] text-[#F0F2F5] min-h-screen antialiased selection:bg-[#1877F2]/70 selection:text-white`}
        >
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}

