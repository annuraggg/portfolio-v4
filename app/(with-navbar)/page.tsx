import Hero from "./home/Hero";
import About from "./home/About";
import Estimate from "./home/Estimate";
import Projects from "./home/Projects";
import FAQ from "./home/FAQ";
import Skills from "./home/Skills";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Estimate />
      <FAQ />
    </div>
  );
}
