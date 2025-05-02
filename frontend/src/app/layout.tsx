import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme";
import { ThemeToggle } from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rivals Pizza - A melhor pizzaria",
  description: "A melhor pizzaria da America",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster 
        position="bottom-right"
        toastOptions={{style:{backgroundColor:"#f1f1f1",
          color: "#131313",
          borderColor: "rgba(255, 255, 255, 0.53)",
        }}}/>
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
