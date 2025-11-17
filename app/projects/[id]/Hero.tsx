"use client";
import { Project } from "@/data/projects";
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
    <div className="px-48 flex gap-20 relative">
      <div className="flex-1 max-w-[30vw]">
        <p className="dark:0text-zinc-300 text-sm mb-2">{project.date}</p>
        <h1 className="text-5xl font-semibold">{project.title}</h1>
        <p className="mt-4">{project.summary}</p>
        <Links project={project} />
        <Rating
          avgRating={rating ?? 0}
          totalRatings={totalRatings}
          userRating={userRating}
          onSubmitRating={(val) => rate(val)}
        />
      </div>

      <div className="absolute -right-60 top-8 translate-x-20 w-[70vw]">
        <Safari imageSrc={project.cover!} url={project.links?.demo} />
      </div>
    </div>
  );
};

export default Hero;
