import type React from "react"
import type { Metadata } from "next"
import { Pacifico, Orbitron } from "next/font/google"
import "./globals.css"

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
})

const orbitron = Orbitron({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pacifico.variable} ${orbitron.variable} font-[family-name:var(--font-pacifico)] antialiased`}>
        {children}
      </body>
    </html>
  )
}
