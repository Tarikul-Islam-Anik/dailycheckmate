"use client";

import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import { Nunito } from "next/font/google";
import { Provider } from "jotai";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { ModeToggle } from "@/components/shared/mode-toggle";
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
              <Theme>
                <ModeToggle />
                <Container size="4" p="9">
                  {children}
                </Container>
                <Toaster />
              </Theme>
            </ThemeProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
