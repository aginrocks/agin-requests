import { Inter, Poppins } from 'next/font/google';
import "./globals.css";
import Head from 'next/head';
import { Metadata } from 'next';
import { Navbar } from '@/lib/components/Navbar';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
    title: 'Agin Requests',
    description: 'Simplify API and real-time testing in VS Code',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </Head>
            <body className={`${poppins.variable} ${inter.variable}`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}