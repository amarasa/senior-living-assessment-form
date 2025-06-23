import type { Metadata } from "next";
import { Nunito_Sans, Martel } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

const martel = Martel({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-martel",
});

export const metadata: Metadata = {
  title: "Kensington Senior Living - Care Assessment Tool",
  description: "Find the right senior living community for your loved one with our personalized care assessment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${martel.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
