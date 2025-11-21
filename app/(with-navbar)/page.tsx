import Hero from "./home/Hero";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const About = dynamic(() => import("./home/About"));
const Estimate = dynamic(() => import("./home/Estimate"));
const FAQ = dynamic(() => import("./home/FAQ"));
const Skills = dynamic(() => import("./home/Skills"));

export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <Estimate />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <FAQ />
      </Suspense>
    </main>
  );
}
