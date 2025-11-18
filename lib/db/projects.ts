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

/**
 * Admin functions for managing projects
 */
import { execute } from './turso-client';

export async function createProject(project: Omit<Project, 'id'>): Promise<string> {
  const id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  await execute(
    `INSERT INTO projects (
      id, title, date, cover, role, timeline, waiter, summary, description,
      problem, solution, highlights, technologies, screenshots, links, development, group_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      project.title,
      project.date,
      project.cover || null,
      project.role,
      project.timeline,
      project.waiter || null,
      project.summary,
      project.description,
      project.problem || null,
      project.solution || null,
      JSON.stringify(project.highlights),
      JSON.stringify(project.technologies),
      project.screenshots ? JSON.stringify(project.screenshots) : null,
      project.links ? JSON.stringify(project.links) : null,
      project.development ? 1 : 0,
      project.group || null,
    ]
  );

  return id;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  const fields: string[] = [];
  const values: any[] = [];

  if (project.title !== undefined) {
    fields.push('title = ?');
    values.push(project.title);
  }
  if (project.date !== undefined) {
    fields.push('date = ?');
    values.push(project.date);
  }
  if (project.cover !== undefined) {
    fields.push('cover = ?');
    values.push(project.cover || null);
  }
  if (project.role !== undefined) {
    fields.push('role = ?');
    values.push(project.role);
  }
  if (project.timeline !== undefined) {
    fields.push('timeline = ?');
    values.push(project.timeline);
  }
  if (project.waiter !== undefined) {
    fields.push('waiter = ?');
    values.push(project.waiter || null);
  }
  if (project.summary !== undefined) {
    fields.push('summary = ?');
    values.push(project.summary);
  }
  if (project.description !== undefined) {
    fields.push('description = ?');
    values.push(project.description);
  }
  if (project.problem !== undefined) {
    fields.push('problem = ?');
    values.push(project.problem || null);
  }
  if (project.solution !== undefined) {
    fields.push('solution = ?');
    values.push(project.solution || null);
  }
  if (project.highlights !== undefined) {
    fields.push('highlights = ?');
    values.push(JSON.stringify(project.highlights));
  }
  if (project.technologies !== undefined) {
    fields.push('technologies = ?');
    values.push(JSON.stringify(project.technologies));
  }
  if (project.screenshots !== undefined) {
    fields.push('screenshots = ?');
    values.push(project.screenshots ? JSON.stringify(project.screenshots) : null);
  }
  if (project.links !== undefined) {
    fields.push('links = ?');
    values.push(project.links ? JSON.stringify(project.links) : null);
  }
  if (project.development !== undefined) {
    fields.push('development = ?');
    values.push(project.development ? 1 : 0);
  }
  if (project.group !== undefined) {
    fields.push('group_name = ?');
    values.push(project.group || null);
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await execute(
    `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
}

export async function deleteProject(id: string): Promise<void> {
  await execute('DELETE FROM projects WHERE id = ?', [id]);
}
