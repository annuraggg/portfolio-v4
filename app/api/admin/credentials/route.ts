/**
 * Admin API: Credentials CRUD
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/helpers';
import { 
  getAllCredentials, 
  createCredential, 
  updateCredential, 
  deleteCredential,
  type Credential 
} from '@/lib/db/credentials';

// GET all credentials
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const credentials = await getAllCredentials();
    return NextResponse.json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credentials' },
      { status: 500 }
    );
  }
}

// POST new credential
export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const credential: Omit<Credential, 'id'> = await request.json();
    const id = await createCredential(credential);
    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating credential:', error);
    return NextResponse.json(
      { error: 'Failed to create credential' },
      { status: 500 }
    );
  }
}

// PUT update credential
export async function PUT(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id, ...credential }: Partial<Credential> & { id: number } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Credential ID is required' },
        { status: 400 }
      );
    }

    await updateCredential(id, credential);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating credential:', error);
    return NextResponse.json(
      { error: 'Failed to update credential' },
      { status: 500 }
    );
  }
}

// DELETE credential
export async function DELETE(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Credential ID is required' },
        { status: 400 }
      );
    }

    await deleteCredential(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting credential:', error);
    return NextResponse.json(
      { error: 'Failed to delete credential' },
      { status: 500 }
    );
  }
}
