import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <div className="bg-gray-900">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>

  );
}