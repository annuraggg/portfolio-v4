import Hero from "./home/Hero";
import dynamic from "next/dynamic";

const About = dynamic(() => import("./home/About"));
const Estimate = dynamic(() => import("./home/Estimate"));
const FAQ = dynamic(() => import("./home/FAQ"));
const Skills = dynamic(() => import("./home/Skills"));

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
