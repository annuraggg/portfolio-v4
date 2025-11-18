/**
 * Database queries for projects
 */

import { queryAll, queryFirst } from './turso-client';

export interface Project {
  id: string;
  title: string;
  date: string;
  cover?: string;
  role: string;
  timeline: string;
  waiter?: string;
  summary: string;
  description: string;
  problem?: string;
  solution?: string;
  highlights: {
    title: string;
    desc: string;
  }[];
  technologies: string[];
  screenshots?: string[];
  links?: {
    github?: string[];
    demo?: string;
  };
  development?: boolean;
  group?: string;
}

interface ProjectRow {
  id: string;
  title: string;
  date: string;
  cover: string | null;
  role: string;
  timeline: string;
  waiter: string | null;
  summary: string;
  description: string;
  problem: string | null;
  solution: string | null;
  highlights: string;
  technologies: string;
  screenshots: string | null;
  links: string | null;
  development: number;
  group_name: string | null;
}

/**
 * Convert database row to Project object
 */
function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    cover: row.cover || undefined,
    role: row.role,
    timeline: row.timeline,
    waiter: row.waiter || undefined,
    summary: row.summary,
    description: row.description,
    problem: row.problem || undefined,
    solution: row.solution || undefined,
    highlights: JSON.parse(row.highlights),
    technologies: JSON.parse(row.technologies),
    screenshots: row.screenshots ? JSON.parse(row.screenshots) : undefined,
    links: row.links ? JSON.parse(row.links) : undefined,
    development: row.development === 1,
    group: row.group_name || undefined,
  };
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const rows = await queryAll<ProjectRow>(
    'SELECT * FROM projects ORDER BY date DESC'
  );
  return rows.map(rowToProject);
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const row = await queryFirst<ProjectRow>(
    'SELECT * FROM projects WHERE id = ?',
    [id]
  );
  return row ? rowToProject(row) : null;
}

/**
 * Get projects with their average ratings
 */
export async function getProjectsWithRatings(): Promise<(Project & { 
  avgRating?: number; 
  totalRatings?: number;
})[]> {
  const rows = await queryAll<ProjectRow & { 
    avg_rating: number | null;
    total_ratings: number | null;
  }>(`
    SELECT 
      p.*,
      AVG(r.rating) as avg_rating,
      COUNT(r.id) as total_ratings
    FROM projects p
    LEFT JOIN ratings r ON p.id = r.project_id
    GROUP BY p.id
    ORDER BY p.date DESC
  `);

  return rows.map(row => ({
    ...rowToProject(row),
    avgRating: row.avg_rating !== null ? row.avg_rating : undefined,
    totalRatings: row.total_ratings !== null ? row.total_ratings : undefined,
  }));
}

/**
 * Get a project with its average rating
 */
export async function getProjectWithRating(id: string): Promise<(Project & { 
  avgRating?: number; 
  totalRatings?: number;
}) | null> {
  const row = await queryFirst<ProjectRow & { 
    avg_rating: number | null;
    total_ratings: number | null;
  }>(`
    SELECT 
      p.*,
      AVG(r.rating) as avg_rating,
      COUNT(r.id) as total_ratings
    FROM projects p
    LEFT JOIN ratings r ON p.id = r.project_id
    WHERE p.id = ?
    GROUP BY p.id
  `, [id]);

  if (!row) {
    return null;
  }

  return {
    ...rowToProject(row),
    avgRating: row.avg_rating !== null ? row.avg_rating : undefined,
    totalRatings: row.total_ratings !== null ? row.total_ratings : undefined,
  };
}
