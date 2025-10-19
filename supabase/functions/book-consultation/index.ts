import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  datetime: string;
  consultationType: 'video' | 'phone';
  message?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();
    
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
