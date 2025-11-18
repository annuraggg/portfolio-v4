/**
 * Admin API: Projects CRUD
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/helpers';
import { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  type Project 
} from '@/lib/db/projects';

// GET all projects
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const project: Omit<Project, 'id'> = await request.json();
    const id = await createProject(project);
    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id, ...project }: Partial<Project> & { id: string } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    await updateProject(id, project);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
