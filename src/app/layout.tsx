import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Nav from "./nav";
import { Toaster } from "@/components/ui/sonner";
import { logout, validateSession } from "@/lib/authService";

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
            <Nav logoutAction={logout} validateSession={validateSession} />
            <div className="h-[95%]">{children}</div>
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
