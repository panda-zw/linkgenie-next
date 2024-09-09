"use client";

import { AuthProvider } from '@/Provider';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>linkgenie</title>
      </head>
      <body className="bg-gray-900">
        <AuthProvider>
          {children}
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
