import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import "./globals.css";
import ThemeControls from "@/components/ThemeControls";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RIP Modern | Death Notices Ireland",
  description: "A modern approach to death notices in Ireland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${geist.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider attribute="class">
          <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className="text-xl font-semibold text-gray-900 dark:text-white">
                    MournHub
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeControls />
                  <a href="/search" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Search
                  </a>
                  <a href="/notices/new" className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                    Post Notice
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="pt-20 pb-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
