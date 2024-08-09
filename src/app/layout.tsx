import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./../styles/globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/provider";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Todo list",
  description: "Organize your everyday workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
