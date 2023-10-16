"use client";

import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import { Nunito } from "next/font/google";
import { Provider } from "jotai";
import { Toaster } from "sonner";

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
    <html lang="en">
      <head>
        <meta name="title" content="Daily Checkmate" />
        <meta
          name="description"
          content="Simple productivity app for for quick and easy daily planning"
        />
      </head>
      <body className={nunito.variable}>
        <Provider>
          <Theme appearance="light" accentColor="blue" radius="small">
            <Container size="4" p="9">
              {children}
            </Container>
            <Toaster />
          </Theme>
        </Provider>
      </body>
    </html>
  );
}
