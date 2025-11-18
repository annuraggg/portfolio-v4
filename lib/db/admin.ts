/**
 * Database queries for admin
 */

import { queryFirst } from './turso-client';

export interface Admin {
  id: number;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get admin by username
 */
export async function getAdminByUsername(username: string): Promise<Admin | null> {
  const admin = await queryFirst<Admin>(
    'SELECT * FROM admin WHERE username = ?',
    [username]
  );
  return admin;
}
