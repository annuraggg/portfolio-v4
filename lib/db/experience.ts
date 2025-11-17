/**
 * Database queries for experience
 */

import { queryAll } from './turso-client';

export interface Experience {
  title: string;
  date: string;
  description: string;
  role: string;
}

interface ExperienceRow {
  id: number;
  title: string;
  date: string;
  description: string;
  role: string;
}

/**
 * Get all experience entries
 */
export async function getAllExperience(): Promise<Experience[]> {
  const rows = await queryAll<ExperienceRow>(
    'SELECT * FROM experience ORDER BY id ASC'
  );
  return rows.map(row => ({
    title: row.title,
    date: row.date,
    description: row.description,
    role: row.role,
  }));
}
