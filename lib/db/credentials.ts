/**
 * Database queries for credentials
 */

import { queryAll, execute } from './turso-client';

export interface Credential {
  id?: number;
  title: string;
  date: string;
  link: string;
  organization: string;
}

interface CredentialRow {
  id: number;
  title: string;
  date: string;
  link: string;
  organization: string;
}

/**
 * Get all credentials
 */
export async function getAllCredentials(): Promise<Credential[]> {
  const rows = await queryAll<CredentialRow>(
    'SELECT * FROM credentials ORDER BY date DESC'
  );
  return rows.map(row => ({
    id: row.id,
    title: row.title,
    date: row.date,
    link: row.link,
    organization: row.organization,
  }));
}

/**
 * Create a new credential
 */
export async function createCredential(credential: Omit<Credential, 'id'>): Promise<number> {
  const result = await execute(
    'INSERT INTO credentials (title, date, link, organization) VALUES (?, ?, ?, ?)',
    [credential.title, credential.date, credential.link, credential.organization]
  );
  return result.lastInsertRowid as number;
}

/**
 * Update a credential
 */
export async function updateCredential(id: number, credential: Partial<Credential>): Promise<void> {
  const fields: string[] = [];
  const values: any[] = [];

  if (credential.title !== undefined) {
    fields.push('title = ?');
    values.push(credential.title);
  }
  if (credential.date !== undefined) {
    fields.push('date = ?');
    values.push(credential.date);
  }
  if (credential.link !== undefined) {
    fields.push('link = ?');
    values.push(credential.link);
  }
  if (credential.organization !== undefined) {
    fields.push('organization = ?');
    values.push(credential.organization);
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await execute(
    `UPDATE credentials SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
}

/**
 * Delete a credential
 */
export async function deleteCredential(id: number): Promise<void> {
  await execute('DELETE FROM credentials WHERE id = ?', [id]);
}
