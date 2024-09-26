"use client";

import { AuthProvider } from '@/Provider';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>linkgenie</title>
        <link rel="icon" href="/favicon/favicon.png" type="image/x-icon" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Analytics />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
