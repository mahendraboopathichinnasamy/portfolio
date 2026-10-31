import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mahendra Boopathi | Junior Application Developer (Flutter, Ionic, Full Stack)',
  description:
    'Portfolio of Mahendra Boopathi C - Junior Application Developer proficient in cross-platform mobile app development with Flutter & Ionic, full-stack web architectures (HTML, CSS, JavaScript, Node.js), and Python programming with GUVI & Udemy certifications.',
  keywords: [
    'Mahendra Boopathi',
    'Junior Application Developer',
    'Flutter Developer',
    'Mobile App Developer',
    'Full Stack Web Developer',
    'Python Programmer',
    'Node.js Developer',
    'Power BI & Tableau',
  ],
  authors: [{ name: 'Mahendra Boopathi C' }],
  openGraph: {
    title: 'Mahendra Boopathi | Junior Application Developer (Flutter, Ionic, Full Stack)',
    description:
      'Dark futuristic cyan-glow developer portfolio showcasing mobile apps (Flutter, Ionic), full-stack web projects, technical skills, and certifications.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
    shortcut: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "scroll-smooth", inter.variable, "font-sans", geist.variable)}>
      <head>
        <meta name="theme-color" content="#050B14" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="min-h-screen bg-[#050B14] text-slate-100 antialiased selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
        {children}
      </body>
    </html>
  );
}
