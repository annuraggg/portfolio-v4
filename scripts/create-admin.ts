/**
 * Script to create an admin user
 * Usage: npm run create-admin
 */

import { getTursoClient } from '../lib/db/turso-client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdmin() {
  console.log('=== Create Admin User ===\n');

  const username = await question('Enter admin username: ');
  const password = await question('Enter admin password: ');

  if (!username || !password) {
    console.error('Username and password are required');
    rl.close();
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters long');
    rl.close();
    process.exit(1);
  }

  try {
    const client = getTursoClient();

    // Check if admin already exists
    const existing = await client.execute({
      sql: 'SELECT * FROM admin WHERE username = ?',
      args: [username],
    });

    if (existing.rows.length > 0) {
      console.error(`Admin user "${username}" already exists`);
      rl.close();
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin
    await client.execute({
      sql: 'INSERT INTO admin (username, password) VALUES (?, ?)',
      args: [username, hashedPassword],
    });

    console.log(`\n✓ Admin user "${username}" created successfully!`);
    console.log('You can now log in to the admin panel at /admin/login\n');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createAdmin();
