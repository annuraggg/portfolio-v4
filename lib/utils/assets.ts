/**
 * Utility to get asset URLs from R2 storage
 */

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || '';

/**
 * Get the full URL for an asset in R2
 * If R2_PUBLIC_URL is not set, falls back to local path for development
 */
export function getAssetUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If R2 URL is configured, use it; otherwise fall back to local path
  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/${cleanPath}`;
  }
  
  // Fall back to local path (useful for development)
  return `/${cleanPath}`;
}
