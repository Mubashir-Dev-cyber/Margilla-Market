import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Margilla Market | Islamabad Marketplace",
  description: "Discover useful products from a marketplace made for Islamabad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
