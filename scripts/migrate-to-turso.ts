/**
 * Migration Script - JSON to Turso Database
 * 
 * This script migrates all portfolio data from TypeScript/JSON files
 * to the Turso database.
 * 
 * Usage:
 *   npm run migrate
 * 
 * Environment Variables:
 *   TURSO_DATABASE_URL - URL to your Turso database
 *   TURSO_AUTH_TOKEN - Authentication token for Turso
 */

import { getTursoClient, initializeSchema } from '../lib/db/turso-client';
import projects from '../data/projects';
import experience from '../data/experience';
import { credentials } from '../data/credentials';
import { skillsData } from '../data/skills';

async function migrateProjects() {
  const client = getTursoClient();
  console.log('\n📦 Migrating projects...');
  
  for (const project of projects) {
    try {
      await client.execute({
        sql: `
          INSERT OR REPLACE INTO projects (
            id, title, date, cover, role, timeline, waiter,
            summary, description, problem, solution,
            highlights, technologies, screenshots, links,
            development, group_name
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          project.id,
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
        ],
      });
      console.log(`  ✓ Migrated project: ${project.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to migrate project ${project.title}:`, error);
    }
  }
  
  console.log(`✓ Migrated ${projects.length} projects`);
}

async function migrateExperience() {
  const client = getTursoClient();
  console.log('\n💼 Migrating experience...');
  
  for (const exp of experience) {
    try {
      await client.execute({
        sql: `
          INSERT INTO experience (title, date, description, role)
          VALUES (?, ?, ?, ?)
        `,
        args: [exp.title, exp.date, exp.description, exp.role],
      });
      console.log(`  ✓ Migrated experience: ${exp.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to migrate experience ${exp.title}:`, error);
    }
  }
  
  console.log(`✓ Migrated ${experience.length} experience entries`);
}

async function migrateCredentials() {
  const client = getTursoClient();
  console.log('\n🎓 Migrating credentials...');
  
  for (const cred of credentials) {
    try {
      await client.execute({
        sql: `
          INSERT INTO credentials (title, date, link, organization)
          VALUES (?, ?, ?, ?)
        `,
        args: [cred.title, cred.date, cred.link, cred.organization],
      });
      console.log(`  ✓ Migrated credential: ${cred.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to migrate credential ${cred.title}:`, error);
    }
  }
  
  console.log(`✓ Migrated ${credentials.length} credentials`);
}

async function migrateSkills() {
  const client = getTursoClient();
  console.log('\n🛠️  Migrating skills...');
  
  for (const skill of skillsData) {
    try {
      await client.execute({
        sql: `
          INSERT INTO skills (title, progress)
          VALUES (?, ?)
        `,
        args: [skill.title, skill.progress || null],
      });
      console.log(`  ✓ Migrated skill: ${skill.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to migrate skill ${skill.title}:`, error);
    }
  }
  
  console.log(`✓ Migrated ${skillsData.length} skills`);
}

async function main() {
  console.log('🚀 Starting database migration...\n');
  console.log('================================================');
  
  try {
    // Initialize schema first
    console.log('📋 Initializing database schema...');
    await initializeSchema();
    console.log('✓ Database schema initialized\n');
    
    // Run migrations
    await migrateProjects();
    await migrateExperience();
    await migrateCredentials();
    await migrateSkills();
    
    console.log('\n================================================');
    console.log('✅ Migration completed successfully!');
    console.log('\nSummary:');
    console.log(`  - ${projects.length} projects`);
    console.log(`  - ${experience.length} experience entries`);
    console.log(`  - ${credentials.length} credentials`);
    console.log(`  - ${skillsData.length} skills`);
    console.log('================================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
