import Hero from "./home/Hero";
import About from "./home/About";
import Estimate from "./home/Estimate";
import Projects from "./home/Projects";
import FAQ from "./home/FAQ";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Estimate />
      <Projects />
      <FAQ />
    </div>
  );
}
