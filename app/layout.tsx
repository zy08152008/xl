import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "国际玄龍體育總會 | International Xuan Long Sport Association",
  description:
    "3rd Anniversary of International Xuan Long Sport Association & 13th Anniversary of Malaysia Xuan Long Sport Association - Fundraising Dinner for New Headquarters",
  icons: {
    icon: "/images/xuan-long-logo-new.png",
    shortcut: "/images/xuan-long-logo-new.png",
    apple: "/images/xuan-long-logo-new.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/xuan-long-logo-new.png" type="image/png" />
        <link rel="shortcut icon" href="/images/xuan-long-logo-new.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/xuan-long-logo-new.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
