"use client";

import { AuthProvider } from '@/Provider';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";
import 'sweetalert2/dist/sweetalert2.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>LinkGenie - Magical Link Management</title>
        <link rel="icon" href="/favicon/favicon.png" type="image/x-icon" />
        <meta property="og:title" content="LinkGenie - Create Professional LinkedIn Content at the Click of a Button with AI." />
        <meta property="og:description" content="Effortlessly create engaging LinkedIn posts that showcase your unique style. With just one single click, our AI-powered tool generates content tailored to your voice, helping you stand out and make a lasting impression." />
        <meta property="og:image" content="/landing/genie.png" />
      </head>
      <body className='bg-custom-radial'>
        <AuthProvider>
          {children}
          <Analytics />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
