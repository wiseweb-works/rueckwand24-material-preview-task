import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/theme/ThemeProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Material Design Studio',
    description: 'Interactive material design and circle placement tool',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider>
                    <div id="skip-link" className="sr-only">
                        <a
                            href="#main-content"
                            className="absolute top-0 left-0 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-br-lg focus:not-sr-only"
                        >
                            Zum Hauptinhalt springen
                        </a>
                    </div>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
