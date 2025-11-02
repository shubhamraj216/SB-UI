import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DrawerProvider } from '@/context/DrawerContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CandidateDrawer from '@/components/CandidateDrawer';

export const metadata: Metadata = {
  title: 'Scholar Bharat - Technical Hiring Made Simple',
  description: 'Save your engineering bandwidth. We screen, assess and interview technical candidates — so your engineers can focus on shipping.',
  keywords: 'technical hiring, interview as a service, AI screening, job board, tech recruitment',
  openGraph: {
    title: 'Scholar Bharat - Technical Hiring Made Simple',
    description: 'Save your engineering bandwidth with AI-powered screening and expert interviews.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <DrawerProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <CandidateDrawer />
          </DrawerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

