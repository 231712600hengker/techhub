import { NextRequest, NextResponse } from 'next/server';
import { login, logout } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = login(body.username, body.password);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        user: { 
          username: result.user?.username, 
          role: result.user?.role 
        } 
      });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    logout();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in logout:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}