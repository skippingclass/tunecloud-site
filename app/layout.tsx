import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TuneCloud — Your music. Your rules.',
  description: 'Self-hosted personal music streaming. Modern web player, synchronized lyrics, clean queue management, and OpenSubsonic API compatibility on your own server.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'TuneCloud — Your music. Your rules.',
    description: 'Self-hosted music streaming you truly own.',
    images: ['/media/home.webp'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

