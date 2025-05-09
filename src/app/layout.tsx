import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { KirbContextProvider } from "@/context/kirbe-store"
import { AuthProvider } from "@/context/auth-context"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Chads book club",
  description: "A simple book club",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <KirbContextProvider>
          <AuthProvider>
            <main className="min-h-screen p-10 max-w-7xl mx-auto">{children}</main>
          </AuthProvider>
        </KirbContextProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
