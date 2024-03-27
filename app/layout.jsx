import Layout from '@/app/layout/default';
import '../app/globals.css';

export const metadata = {
  title: 'ARCHIVES2Ks',
  description: 'The site that sends you straight to 2000 🚀',
  icons: {
    icon: [
      {
        url: '/images/favicons/favicon.png',
        href: '/images/favicons/favicon.png',
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>

      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
