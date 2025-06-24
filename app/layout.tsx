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
  title: "Chat",
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
            logoImageUrl: "/icons/logo.svg",
          },
          variables: {
            colorText: "#333",                   // Facebook text gray
            colorPrimary: "#1877F2",                // Facebook blue
            colorBackground: "#fff",             // Dark background
            colorInputBackground: "#fff",        // FB Messenger dark input
            colorInputText: "#E4E6EB",              // Input readability
            colorTextSecondary: "#555",          // Light gray secondary
            colorDanger: "#F02849",                 // Facebook red for danger
            borderRadius: "0.1rem",                 // Rounded inputs/buttons
          },
        }}
      >
        <body
          className={`${inter.className} bg-[#fff] text-[#333] min-h-screen antialiased selection:bg-[#1877F2]/70 selection:text-white`}
        >
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}

