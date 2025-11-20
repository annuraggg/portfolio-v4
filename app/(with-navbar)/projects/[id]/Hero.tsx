"use client";
import { Project } from "@/lib/db/projects";
import React, { useEffect } from "react";
import Links from "./Links";
import { Safari } from "@/components/ui/safari";
import Rating from "./Rating";

interface Props {
  project: Project;
}

const Hero = ({ project }: Props) => {
  const [rating, setRating] = React.useState<number | undefined>(undefined);
  const [userRating, setUserRating] = React.useState<number | undefined>(
    undefined
  );
  const [totalRatings, setTotalRatings] = React.useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`/api/ratings/${project.id}/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-identifier": localStorage.getItem("userIdentifier") || "",
          },
        });
        const data = await response.json();
        console.log(data);
        setRating(data.average_rating);
        setTotalRatings(data.total_ratings);
        setUserRating(data.user_rating);
      } catch (error) {
        console.error("Error fetching rating stats:", error);
      } finally {
      }
    };

    fetchRatings();
  }, [project.id]);

  const rate = async (value: number) => {
    try {
      const identity = localStorage.getItem("userIdentifier");
      await fetch(`/api/ratings/${project.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: value, userIdentifier: identity }),
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 relative">
      <div className="w-full lg:flex-1 lg:max-w-[30vw]">
        <p className="dark:text-zinc-300 text-xs sm:text-sm mb-2">{project.date}</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">{project.title}</h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base">{project.summary}</p>
        <Links project={project} />
        <Rating
          avgRating={rating ?? 0}
          totalRatings={totalRatings}
          userRating={userRating}
          onSubmitRating={(val) => rate(val)}
        />
      </div>

      <div className="w-full lg:absolute lg:-right-60 lg:top-8 lg:translate-x-20 lg:w-[70vw] mt-8 lg:mt-0">
        <Safari imageSrc={process.env.NEXT_PUBLIC_R2_PUBLIC_URL! + project.cover!} url={project.links?.demo} pixelImage />
      </div>
    </div>
  );
};

export default Hero;
