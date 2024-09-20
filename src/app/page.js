import Main from "@/components/Main";
import About from "@/components/About";
import Review from "@/components/Reviews";
import Navbar from "@/components/Navbar";
import Team from "@/components/Team";


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Main />
      <About />
      <Review />
      <Team />
    </div>
  );
}

