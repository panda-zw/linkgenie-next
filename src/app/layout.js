"use client";

import { AuthProvider } from '@/Provider';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>linkgenie</title>
      </head>
      <body className="bg-gray-900">
        < AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}