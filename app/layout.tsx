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
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/logo.png",
          },
          variables: {
  colorText: "#F0F0F0",             // Light text color for contrast
  colorPrimary: "#FF6B30",          // Vibrant primary color for buttons
  colorBackground: "#1E1E2E",       // Darker background for depth
  colorInputBackground: "#2D2F4D",  // Softer dark background for inputs
  colorInputText: "#FFFFFF",        // White text in inputs for readability
},
        }}
      >
        <body className={`${inter.className} bg-dark-3`}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
