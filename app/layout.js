import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App -- Find weather any where in the world ",
  description: "Find weather any where in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen max-h-[130vh] flex flex-col items-center justify-center w-screen bg-gradient-to-tl to-purple-600 from-purple-200">
          {children}
        </main>
      </body>
    </html>
  );
}
