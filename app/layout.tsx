"use client";

import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import { Grid, Theme } from "@radix-ui/themes";
import { Nunito } from "next/font/google";
import { Provider } from "jotai";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SessionProvider } from "next-auth/react";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="title" content="Daily Checkmate" />
        <meta
          name="description"
          content="Simple productivity app for for quick and easy daily planning"
        />
      </head>
      <body className={nunito.variable}>
        <SessionProvider>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Theme className="h-screen">
                {children}
                <Toaster />
              </Theme>
            </ThemeProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
