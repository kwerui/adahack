import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "GreenStreet",
  description: "Make your postcode greener, together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
