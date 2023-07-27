"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../redux/Provider";
import { store } from "../redux/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <ThemeProvider theme={theme}>
        <Providers>
          <body
            style={{
              backgroundColor: "#f1f1f1",

              height: "100vh",
            }}
          >
            {children}
          </body>
        </Providers>
      </ThemeProvider>
    </html>
  );
}
