import Hero from "./home/Hero";
import About from "./home/About";
import Estimate from "./home/Estimate";
import FAQ from "./home/FAQ";
import Skills from "./home/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Estimate />
      <FAQ />
    </main>
  );
}
