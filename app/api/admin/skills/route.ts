/**
 * Admin API: Skills CRUD
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/helpers';
import { 
  getAllSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill,
  type Skill 
} from '@/lib/db/skills';

// GET all skills
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const skills = await getAllSkills();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST new skill
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const skill: Omit<Skill, 'id'> = await request.json();
    const id = await createSkill(skill);
    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

// PUT update skill
export async function PUT(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id, ...skill }: Partial<Skill> & { id: number } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      );
    }

    await updateSkill(id, skill);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE skill
export async function DELETE(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      );
    }

    await deleteSkill(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
