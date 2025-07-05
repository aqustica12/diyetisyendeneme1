
import { NextResponse } from 'next/server';
import { sendWhatsAppReminders } from '@/ai/flows/whatsapp-reminder-flow';

// This ensures the route is always executed dynamically
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Cron job started: Running sendWhatsAppReminders...');
    const result = await sendWhatsAppReminders();
    console.log('Cron job finished. Result:', result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error running cron job:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
