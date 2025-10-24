import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Server-side validation schema
const bookingSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^\+?[\d\s-()]+$/).min(8).max(20),
  datetime: z.string().datetime(),
  consultationType: z.enum(['video', 'phone']),
  message: z.string().trim().max(1000).optional(),
});

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  datetime: string;
  consultationType: 'video' | 'phone';
  message?: string;
}

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Max 3 requests per hour per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ error: 'Too many booking requests. Please try again later.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        },
      );
    }

    const rawBooking: BookingRequest = await req.json();
    
    // Server-side validation
    const validationResult = bookingSchema.safeParse(rawBooking);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid booking data', 
          details: validationResult.error.errors 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      );
    }
    
    const booking = validationResult.data;
    
    // Create Google Calendar event
    const calendarEvent = {
      summary: `Consultation with ${booking.name}`,
      description: `Free 15-minute consultation\nType: ${booking.consultationType}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nMessage: ${booking.message || 'N/A'}`,
      start: {
        dateTime: booking.datetime,
        timeZone: 'Asia/Dubai',
      },
      end: {
        dateTime: new Date(new Date(booking.datetime).getTime() + 15 * 60000).toISOString(),
        timeZone: 'Asia/Dubai',
      },
      attendees: [
        { email: booking.email },
        { email: 'nora@resortsoffers.com' }, // CEO's email
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 15 },
        ],
      },
    };

    // TODO: In production, you'll need to set up Google Calendar API credentials
    // For now, this is a placeholder that shows the structure
    console.log('Calendar event to create:', calendarEvent);

    // Send WhatsApp reminder
    const whatsappMessage = encodeURIComponent(
      `Hello ${booking.name}! 🌴\n\n` +
      `Your free 15-minute consultation with Nora El Khalifi, CEO of Resorts Offers, is confirmed!\n\n` +
      `📅 Date: ${new Date(booking.datetime).toLocaleDateString()}\n` +
      `⏰ Time: ${new Date(booking.datetime).toLocaleTimeString()}\n` +
      `📞 Type: ${booking.consultationType === 'video' ? 'Video Call' : 'Phone Call'}\n\n` +
      `You'll receive a calendar invite at ${booking.email}.\n\n` +
      `We look forward to helping you plan your perfect luxury getaway! ✨`
    );

    // In production, you'd send this via WhatsApp Business API
    // For now, we'll return the information
    console.log('WhatsApp message to send:', whatsappMessage);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Consultation booked successfully',
        calendarEvent,
        whatsappMessage: decodeURIComponent(whatsappMessage)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error booking consultation:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
