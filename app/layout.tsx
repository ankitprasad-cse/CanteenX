import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "../src/context/AppProviders";

export const metadata: Metadata = {
  title: "Campus Canteen",
  description: "A faster way to order and collect food on campus.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
