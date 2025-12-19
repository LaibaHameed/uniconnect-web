import Providers from '@/redux/provider';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import RouteGuard from '@/components/common/RouteGuard';

export const metadata = {
  title: 'UniConnect',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <RouteGuard>
          <Header />
          {children}
          <Footer />
          </RouteGuard>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
