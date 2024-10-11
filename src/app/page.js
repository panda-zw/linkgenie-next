import Main from "@/components/Main";
import About from "@/components/About";
import Review from "@/components/Reviews";
// import Pricing from "@/components/Pricing";
import Navbar from "@/components/Navbar";
import Team from "@/components/Team";
import Customer from "@/components/Customer";
import Footer from "@/components/Footer";


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Main />
      <About />
      <Review />
      <Team />
      {/* <Pricing /> */}
      <Customer />
      <Footer />
    </div>
  );
}

