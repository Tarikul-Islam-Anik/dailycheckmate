"use client";

import { Provider } from "jotai";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "@/components/shared/theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Theme className="h-screen">{children}</Theme>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
