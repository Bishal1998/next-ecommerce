import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Navbar from "@/components/component/Navbar";
import Footer from "@/components/component/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Euphoria - E-commerce Website",
  description: "Euphoria - Digital Platform for your shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className, roboto.className)}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
