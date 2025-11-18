/**
 * Database queries for skills
 */

import { queryAll, execute } from './turso-client';

export interface Skill {
  id?: number;
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
    id: row.id,
    title: row.title,
    progress: row.progress || undefined,
  }));
}

/**
 * Create a new skill
 */
export async function createSkill(skill: Omit<Skill, 'id'>): Promise<number> {
  const result = await execute(
    'INSERT INTO skills (title, progress) VALUES (?, ?)',
    [skill.title, skill.progress || null]
  );
  return result.lastInsertRowid as number;
}

/**
 * Update a skill
 */
export async function updateSkill(id: number, skill: Partial<Skill>): Promise<void> {
  const fields: string[] = [];
  const values: (string | null)[] = [];

  if (skill.title !== undefined) {
    fields.push('title = ?');
    values.push(skill.title);
  }
  if (skill.progress !== undefined) {
    fields.push('progress = ?');
    values.push(skill.progress || null);
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await execute(
    `UPDATE skills SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
}

/**
 * Delete a skill
 */
export async function deleteSkill(id: number): Promise<void> {
  await execute('DELETE FROM skills WHERE id = ?', [id]);
}
