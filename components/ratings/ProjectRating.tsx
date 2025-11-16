'use client';

import { useState, useEffect } from 'react';
import { submitRating, getProjectRatingStats } from '@/lib/db/ratings';
import type { RatingStats } from '@/lib/db/ratings';
import { toast } from 'sonner';

interface ProjectRatingProps {
  projectId: string;
}

export default function ProjectRating({ projectId }: ProjectRatingProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  // Generate a user identifier (could be improved with actual user authentication)
  const getUserIdentifier = () => {
    let identifier = localStorage.getItem('userIdentifier');
    if (!identifier) {
      identifier = `user_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('userIdentifier', identifier);
    }
    return identifier;
  };

  useEffect(() => {
    loadStats();
    checkIfUserRated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const loadStats = async () => {
    const data = await getProjectRatingStats(projectId);
    if (data) {
      setStats(data);
    }
  };

  const checkIfUserRated = async () => {
    try {
      const userIdentifier = getUserIdentifier();
      const response = await fetch(
        `/api/ratings/${projectId}/check?userId=${encodeURIComponent(userIdentifier)}`
      );
      if (response.ok) {
        const data = await response.json();
        setHasRated(data.hasRated);
      }
    } catch (error) {
      console.error('Error checking rating:', error);
    }
  };

  const handleRatingClick = async (selectedRating: number) => {
    if (hasRated) {
      toast.info('You have already rated this project');
      return;
    }

    setIsSubmitting(true);
    setRating(selectedRating);

    try {
      const userIdentifier = getUserIdentifier();
      const result = await submitRating(projectId, selectedRating, userIdentifier);

      if (result.success) {
        toast.success('Thank you for rating!');
        setHasRated(true);
        await loadStats();
      } else {
        toast.error(result.error || 'Failed to submit rating');
        setRating(0);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">Rate this project</h3>
        
        {/* Rating Stars */}
        <div className="flex items-center gap-2">
          <div className="rating rating-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name={`rating-${projectId}`}
                className={`mask mask-star-2 ${
                  star <= displayRating ? 'bg-orange-400' : 'bg-gray-300'
                } ${hasRated || isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                checked={rating === star}
                onChange={() => handleRatingClick(star)}
                onMouseEnter={() => !hasRated && !isSubmitting && setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={hasRated || isSubmitting}
                aria-label={`Rate ${star} stars`}
              />
            ))}
          </div>
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </div>

        {hasRated && (
          <p className="text-sm text-muted-foreground">
            You have already rated this project
          </p>
        )}
      </div>

      {/* Rating Statistics */}
      {stats && stats.total_ratings > 0 && (
        <div className="flex flex-col gap-1 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">
              {stats.average_rating.toFixed(1)}
            </span>
            <div className="flex flex-col">
              <div className="rating rating-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name={`avg-rating-${projectId}`}
                    className={`mask mask-star-2 ${
                      star <= Math.round(stats.average_rating)
                        ? 'bg-orange-400'
                        : 'bg-gray-300'
                    } pointer-events-none`}
                    checked={star === Math.round(stats.average_rating)}
                    readOnly
                    aria-label={`${star} star`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.total_ratings} {stats.total_ratings === 1 ? 'rating' : 'ratings'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
