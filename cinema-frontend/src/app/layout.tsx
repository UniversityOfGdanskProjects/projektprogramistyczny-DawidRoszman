import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import ThemeProvider from "@/components/theme/ThemeContext";
import TokenProvider from "./components/TokenContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinema",
  description: "Cinema application created for university project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <body className={inter.className}>
        <CookiesProvider>
          <TokenProvider>{children}</TokenProvider>
        </CookiesProvider>
      </body>
    </ThemeProvider>
  );
}
