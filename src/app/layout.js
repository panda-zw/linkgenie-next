"use client";

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>linkgenie</title>
      </head>
      <body className="bg-gray-900">
        {children}
      </body>
    </html>
  );
}