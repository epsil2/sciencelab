import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'ScienceLab — Le laboratoire des jeunes', description: 'Un laboratoire scientifique virtuel guidé pour les 10–16 ans.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr"><body>{children}</body></html>; }
