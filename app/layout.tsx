import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: 'IgniStack Gallery ',
  description: 'Galería personal de álbumes y fotos',
  generator: '/IgniStack.ico',
  icons: {
    icon: [
      {
        url: '/IgniStack.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/IgniStack.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/IgniStack.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: '/IgniStack.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`bg-background ${_geist.variable} ${_geistMono.variable} ${_playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
