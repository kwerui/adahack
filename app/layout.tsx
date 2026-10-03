import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Greener by Postcode | Good things grow together',
 description: 'Explore your local air, green spaces and electricity. Join your neighbours in small actions for a greener community.',
 icons: { icon: '/icon.svg' },
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
