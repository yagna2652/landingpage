import { NextRequest, NextResponse } from 'next/server';

/**
 * Waitlist Email Normalization Layer
 * 
 * This route exists only to normalize and sanitize form data before forwarding
 * to Attio's incoming webhook. It does not implement business logic or persist data.
 * 
 * Responsibilities:
 * - Extract email from form submission
 * - Normalize email (trim, lowercase, validate)
 * - Forward clean payload to Attio webhook
 */

const ATTIO_WEBHOOK_URL = process.env.ATTIO_WEBHOOK_URL || 
  'https://hooks.attio.com/w/ce097ce8-def8-40ba-85e9-991f6866d857/8db59c88-df36-4b3b-9c78-11bdb90261b0';

function normalizeEmail(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return null;
  }

  // Trim whitespace and lowercase
  const normalized = email.trim().toLowerCase();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) {
    return null;
  }

  return normalized;
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const email = formData.get('email');

    // Normalize email
    const normalizedEmail = normalizeEmail(email as string);

    if (!normalizedEmail) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Forward to Attio webhook with minimal payload
    const attioResponse = await fetch(ATTIO_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: normalizedEmail }),
    });

    if (!attioResponse.ok) {
      console.error('Attio webhook error:', attioResponse.status, await attioResponse.text());
      return NextResponse.json(
        { success: false, message: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

