// app/layout.js
"use client"; // This line makes this file a client component

import { SessionProvider } from "next-auth/react";
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <title>linkgenie</title>
        </head>
        <body className="bg-gray-900">
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </body>
      </html>
    </SessionProvider>
  );
}