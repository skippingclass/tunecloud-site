import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'TuneCloud — твоя музыка. Твои правила.',
  description: 'Преврати свою коллекцию в личный стриминг. Красивый плеер, синхронная лирика, умная очередь и OpenSubsonic. На твоём сервере.',
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'TuneCloud — твоя музыка. Твои правила.', description: 'Личный музыкальный стриминг, который принадлежит тебе.', images: ['/media/home.webp'] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><body>{children}</body></html>;
}
