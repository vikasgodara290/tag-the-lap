import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Red_Hat_Display} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets : ['latin']
});
const redHatDisplay = Red_Hat_Display({
  variable: "--font-redHatDisplay",
  subsets: ['latin']
})

console.log('from layout: ', inter)
export const metadata: Metadata = {
  title: "Log The Day",
  description: "Help you track your entire day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body
        className={`font-sans antialiased select-none`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
