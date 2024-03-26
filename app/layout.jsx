import Layout from '@/app/layout/default';
import '../app/globals.css';

export const metadata = {
  title: 'ARCHIVES2Ks',
  description: 'The site that sends you straight to 2000 🚀',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{ height: '500vh' }}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
