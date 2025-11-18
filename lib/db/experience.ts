/**
 * Database queries for experience
 */

import { queryAll, execute } from './turso-client';

export interface Experience {
  id?: number;
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
    id: row.id,
    title: row.title,
    date: row.date,
    description: row.description,
    role: row.role,
  }));
}

/**
 * Create a new experience entry
 */
export async function createExperience(experience: Omit<Experience, 'id'>): Promise<number> {
  const result = await execute(
    'INSERT INTO experience (title, date, description, role) VALUES (?, ?, ?, ?)',
    [experience.title, experience.date, experience.description, experience.role]
  );
  return result.lastInsertRowid as number;
}

/**
 * Update an experience entry
 */
export async function updateExperience(id: number, experience: Partial<Experience>): Promise<void> {
  const fields: string[] = [];
  const values: any[] = [];

  if (experience.title !== undefined) {
    fields.push('title = ?');
    values.push(experience.title);
  }
  if (experience.date !== undefined) {
    fields.push('date = ?');
    values.push(experience.date);
  }
  if (experience.description !== undefined) {
    fields.push('description = ?');
    values.push(experience.description);
  }
  if (experience.role !== undefined) {
    fields.push('role = ?');
    values.push(experience.role);
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await execute(
    `UPDATE experience SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
}

/**
 * Delete an experience entry
 */
export async function deleteExperience(id: number): Promise<void> {
  await execute('DELETE FROM experience WHERE id = ?', [id]);
}
