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
        <link rel="icon" href="/favicon/favicon.png" type="image/x-icon" />
        <meta property="og:title" content="LinkGenie" />
        <meta property="og:description" content="Craft eye-catching LinkedIn posts in seconds using our AI with no writing skills necessary. Want to project authority and find new clients? Let’s make it happen!" />
        <meta property="og:image" content="https://www.linkgenie.one/landing/genie.png" />
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
