import type { Metadata } from "next";
import "./globals.css";
import {ApolloWrapper} from "@/app/ApolloWrapper";
import {ThemeProvider} from "next-themes";
import React from "react";

export const metadata: Metadata = {
  title: "Simple VR Train Tracker",
  description: "VR Trains on a map with live data",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
    <ApolloWrapper>{children}</ApolloWrapper>
    </ThemeProvider>
    </body>
    </html>
  );
}
