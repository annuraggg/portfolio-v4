'use client';

import { useState, useEffect } from 'react';
import Rating from './Rating';
import { submitRating, getProjectRatingStats } from '@/lib/db/ratings';
import type { RatingStats } from '@/lib/db/ratings';
import { toast } from 'sonner';

interface RatingContainerProps {
  projectId: string;
}

export default function RatingContainer({ projectId }: RatingContainerProps) {
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Generate a user identifier (could be improved with actual user authentication)
  const getUserIdentifier = () => {
    if (typeof window === 'undefined') return '';
    
    let identifier = localStorage.getItem('userIdentifier');
    if (!identifier) {
      identifier = `user_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('userIdentifier', identifier);
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
        // Set default stats if no ratings exist
        setStats({
          project_id: projectId,
          total_ratings: 0,
          average_rating: 0,
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set default stats on error
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
        `/api/ratings/${projectId}/check?userId=${encodeURIComponent(userIdentifier)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        // If user has rated, we could fetch their specific rating
        // For now, we just know they've rated
        if (data.hasRated) {
          // We don't have the specific rating value in the current implementation
          // This could be enhanced to fetch the actual user's rating
          setUserRating(0); // Placeholder
        }
      }
    } catch (error) {
      console.error('Error checking user rating:', error);
    }
  };

  const handleSubmitRating = async (rating: number) => {
    try {
      const userIdentifier = getUserIdentifier();
      if (!userIdentifier) {
        toast.error('Unable to identify user');
        return;
      }

      const result = await submitRating(projectId, rating, userIdentifier);

      if (result.success) {
        toast.success('Thank you for rating!');
        setUserRating(rating);
        await loadStats();
      } else {
        toast.error(result.error || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
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
