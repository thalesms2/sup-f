import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Nav from '../components/nav'
import Providers from "../components/providers";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Support Facility",
  description: "Ferramenta para suporte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <Nav />
              <div className="h-[95%]">
                {children}
              </div>
              <Toaster />
            </Providers>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

