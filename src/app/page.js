import Main from "@/components/Main";
import About from "@/components/About";
import Review from "@/components/Reviews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Main />
      <About />
      <Review />
      <Footer />
    </div>
  );
}
