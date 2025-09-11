"use client";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StickyScroll } from "@/components/StickyScrollReveal";
import Image from "next/image";
import projects from "@/data/projects";

const content = projects
  .filter((project) => !!project.cover)
  .slice(0, 5)
  .map((project) => ({
    title: project.title,
    description: project.summary,
    content: (
      <Image
        src={project.cover!}
        width={500}
        height={300}
        className="min-w-[50vw]"
        alt={project.title}
      />
    ),
  }));

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  // 👇 track if section is in view
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const ref2 = useRef(null);
  const inView2 = useInView(ref2, { amount: 0.2 });

  return (
    <div>
      <div className="">
        <div className="flex flex-col items-center justify-center h-[85vh] gap-10 relative">
          <h2
            className="text-7xl inline-block pb-3 font-semibold
           bg-[repeating-linear-gradient(to_right,#3f3f46_0,#3f3f46_12px,transparent_4px,transparent_20px)]
           bg-[length:auto_2px] bg-no-repeat bg-bottom"
          >
            I craft digital experiences that
          </h2>
          <h2 className="relative p-0 group text-7xl inline-block pb-4 font-semibold text-white transition-colors duration-1000">
            <span
              className="relative z-10"
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            >
              people love.
            </span>
            <span
              className={`absolute left-0 bottom-0 w-full h-[12px]
            bg-[url('/wave.svg')] bg-[length:28px_12px] bg-repeat-x bg-bottom
            ${isHovered ? "animate-wave" : ""}`}
            />
          </h2>
        </div>

        <div className="flex justify-end w-[calc(100%-50px)]">
          <ScrollIndicator />
        </div>
      </div>

      <div className=" h-screen flex flex-col items-center justify-center">
        <motion.h2
          className="mt-20 px-60"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <p>ABOUT ME</p>
            <div className="flex gap-20 mt-10">
              <h2 className="text-5xl font-bold">
                Coding to me, isnt just a skill; it is my language of
                expression, a medium to breathe life into ideas.
              </h2>

              <div>
                <p>
                  With each line of code, I shape my perspective into digital
                  reality, creating a unique and dynamic online presence. In the
                  world of bits and pixels, I am the storyteller, weaving
                  narratives through the language of the web.
                </p>

                <p className="mt-10">
                  In July 2022, I completed my Diploma in Information
                  Technology. From a young age, I have been captivated by the
                  world of coding and have spent the past years honing my skills
                  in web development. In 2025, I successfully completed my
                  Bachelors degree in Information Technology.
                </p>
              </div>
            </div>
          </div>
        </motion.h2>
      </div>

      <div className=" h-screen flex flex-col items-center justify-center">
        <motion.h2
          className="mt-20 w-full"
          ref={ref2}
          initial={{ opacity: 0, y: 50 }}
          animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <div>
              <h2 className="text-5xl font-bold px-40">Explore My Projects</h2>
            </div>
            <StickyScroll content={content} />
          </div>
        </motion.h2>
      </div>
    </div>
  );
}
