/**
 * Database queries for contact messages
 */

import { queryAll, execute } from './turso-client';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

/**
 * Get all contact messages
 */
export async function getAllContactMessages(): Promise<ContactMessage[]> {
  const messages = await queryAll<ContactMessage>(
    'SELECT * FROM contact_messages ORDER BY created_at DESC'
  );
  return messages;
}

/**
 * Delete a contact message
 */
export async function deleteContactMessage(id: number): Promise<void> {
  await execute('DELETE FROM contact_messages WHERE id = ?', [id]);
}
