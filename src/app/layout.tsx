import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Nav from './nav'


const queryClient = new QueryClient()
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
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <div className="h-[93%]">
              {children}
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

