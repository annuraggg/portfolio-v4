/**
 * Admin API: Contact Messages
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/helpers';
import { getAllContactMessages, deleteContactMessage } from '@/lib/db/contact';

// GET all contact messages
export async function GET() {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const messages = await getAllContactMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// DELETE contact message
export async function DELETE(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    await deleteContactMessage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
