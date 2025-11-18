/**
 * Database queries for credentials
 */

import { queryAll } from './turso-client';

export interface Credential {
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
    title: row.title,
    date: row.date,
    link: row.link,
    organization: row.organization,
  }));
}
