/**
 * Database client for Cloudflare D1
 * This module provides utilities to interact with the D1 database
 */

export interface Rating {
  id: number;
  project_id: string;
  rating: number;
  user_identifier: string;
  created_at: string;
}

export interface RatingStats {
  project_id: string;
  total_ratings: number;
  average_rating: number;
}

/**
 * Get rating statistics for a specific project
 */
export async function getProjectRatingStats(
  projectId: string
): Promise<RatingStats | null> {
  try {
    const response = await fetch(`/api/ratings/${projectId}/stats`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch rating stats: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching project rating stats:', error);
    return null;
  }
}

/**
 * Submit a rating for a project
 */
export async function submitRating(
  projectId: string,
  rating: number,
  userIdentifier: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/ratings/${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, userIdentifier }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to submit rating' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting rating:', error);
    return { success: false, error: 'Failed to submit rating' };
  }
}

/**
 * Check if a user has already rated a project
 */
export async function hasUserRated(
  projectId: string,
  userIdentifier: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/ratings/${projectId}/check?userId=${encodeURIComponent(userIdentifier)}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.hasRated || false;
  } catch (error) {
    console.error('Error checking user rating:', error);
    return false;
  }
}
