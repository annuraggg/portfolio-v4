"use client";

import { useState, useEffect } from "react";
import Rating from "./Rating";
import { submitRating, getProjectRatingStats } from "@/lib/db/ratings";
import type { RatingStats } from "@/lib/db/ratings";
import { toast } from "sonner";

interface RatingContainerProps {
  projectId: string;
}

export default function RatingContainer({ projectId }: RatingContainerProps) {
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const getUserIdentifier = () => {
    if (typeof window === "undefined") return "";

    let identifier = localStorage.getItem("userIdentifier");
    if (!identifier) {
      identifier = `user_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("userIdentifier", identifier);
    }
    return identifier;
  };

  useEffect(() => {
    loadStats();
    checkUserRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const loadStats = async () => {
    try {
      const data = await getProjectRatingStats(projectId);
      if (data) {
        setStats(data);
      } else {
        setStats({
          project_id: projectId,
          total_ratings: 0,
          average_rating: 0,
        });
      }
    } catch (error) {
      console.error("Error loading stats:", error);

      setStats({
        project_id: projectId,
        total_ratings: 0,
        average_rating: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserRating = async () => {
    try {
      const userIdentifier = getUserIdentifier();
      if (!userIdentifier) return;

      const response = await fetch(
        `/api/ratings/${projectId}/check?userId=${encodeURIComponent(
          userIdentifier
        )}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.hasRated) {
          setUserRating(0);
        }
      }
    } catch (error) {
      console.error("Error checking user rating:", error);
    }
  };

  const handleSubmitRating = async (rating: number) => {
    try {
      const userIdentifier = getUserIdentifier();
      if (!userIdentifier) {
        toast.error("Unable to identify user");
        return;
      }

      const result = await submitRating(projectId, rating, userIdentifier);

      if (result.success) {
        toast.success("Thank you for rating!");
        setUserRating(rating);
        await loadStats();
      } else {
        toast.error(result.error || "Failed to submit rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    }
  };

  if (isLoading || !stats) {
    return null;
  }

  return (
    <Rating
      avgRating={stats.average_rating}
      totalRatings={stats.total_ratings}
      userRating={userRating}
      onSubmitRating={handleSubmitRating}
    />
  );
}
