/**
 * Database queries for skills
 */

import { queryAll } from './turso-client';

export interface Skill {
  title: string;
  progress?: string;
}

interface SkillRow {
  id: number;
  title: string;
  progress: string | null;
}

/**
 * Get all skills
 */
export async function getAllSkills(): Promise<Skill[]> {
  const rows = await queryAll<SkillRow>(
    'SELECT * FROM skills ORDER BY title ASC'
  );
  return rows.map(row => ({
    title: row.title,
    progress: row.progress || undefined,
  }));
}
