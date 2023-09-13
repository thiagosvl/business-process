'use client';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux';
import store from '../store';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Áreas e Processos',
  description: 'CRUD para gerenciamento de áreas e processos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
