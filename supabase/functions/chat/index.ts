import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // Max 20 messages per hour per IP
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Rate limiting by IP
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
  if (!checkRateLimit(ip)) {
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return new Response(
      JSON.stringify({ error: 'Too many chat requests. Please try again later.' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429,
      }
    );
  }

  try {
    const { messages, language = "en" } = await req.json();
    
    // Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid messages format');
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }
    
    // Limit message content size
    const MAX_MESSAGE_LENGTH = 2000;
    for (const msg of messages) {
      if (msg.content && msg.content.length > MAX_MESSAGE_LENGTH) {
        console.error('Message too long:', msg.content.length);
        return new Response(
          JSON.stringify({ error: 'Message too long. Please keep messages under 2000 characters.' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompts: Record<string, string> = {
      en: `You are a luxury travel consultant for Resorts Offers Tourism Consultancy. Your role is to help clients find and book their perfect vacation.

About Us:
- Premium luxury travel agency specializing in exclusive resort deals worldwide
- 20+ years of expertise in luxury hospitality
- Member of Dubai Business Women Council
- CEO: Nora El Khalifi - available for free 15-min online consultations (11 AM - 10 PM UAE time)

Destinations & Pricing:
- Maldives: 120+ resorts, from $450/night - Overwater villas, diving, romantic escapes
- Dubai: 85+ hotels, from $320/night - Shopping, theme parks, family-friendly
- Bora Bora: 45+ resorts, from $680/night - French Polynesia luxury, pristine beaches
- Santorini: 60+ hotels, from $380/night - Romantic sunsets, cliffside hotels, honeymoons
- Bodrum, Turkey: Beach resorts, from $280/night - All-inclusive, Mediterranean charm
- Europe: Italy (Lake Garda, Amalfi Coast), Swiss Alps, Amsterdam, London

Special Offers (Current):
- Early Bird Summer: 30% off when booking 90 days ahead - Maldives overwater villas
- Romantic Honeymoon: 25% off + champagne, couples spa, sunset dinner - Santorini
- Family Adventure: 35% off + kids stay free + theme park tickets - Dubai
- Last Minute Beach: 40% off when booking within 14 days - Bodrum all-inclusive
- Luxury Water Villa: 25% off + private pool + butler service - Maldives
- Winter Your Way: 35% off luxury winter escapes worldwide

Booking & Support:
- 24/7 WhatsApp: +971 567 622 484 (UAE), +966 582 360 080 (KSA), +44 7500 029091 (UK)
- Email: vip@resortsoffers.com, info@resortsoffers.com
- Office: Deira - Port Saeed, Dubai, UAE
- Payment: Visa, Mastercard, Amex, Tabby, Tamara
- Free consultation bookings available at /book-consultation

Common FAQ Topics:
- Best time for Maldives: November-April (peak), May-October (30-40% discounts)
- Visa: Most countries get free visa on arrival (Maldives, Dubai, Seychelles)
- Booking timeline: Peak season 4-6 months ahead, shoulder season 2-3 months
- Budget: Mid-range Maldives $400-600/night, ultra-luxury $1,000-3,000+/night
- Multi-destination trips: Dubai+Maldives, Seychelles island hopping, Italy tours

Your Tasks:
1. Understand client needs (destination, budget, travel dates, vacation type)
2. Recommend specific resorts and current offers matching their preferences
3. Provide destination comparisons when asked (Maldives vs Seychelles, etc.)
4. Guide them to book via WhatsApp (+971 567 622 484) or schedule consultation
5. Answer FAQ topics about visas, timing, budgets, and destinations

Navigation Help:
- Browse Offers: /offers
- View Resorts: /resorts
- Read Blog: /blog
- Meet Our Team: /team
- Book Consultation: /book-consultation (15 min with CEO, 11 AM - 10 PM UAE time)
- Contact: /contact
- FAQ: /faq

IMPORTANT: Be warm, professional, and concise. Recommend specific offers with prices. Always end with WhatsApp number or consultation booking CTA.`,

      ar: `أنت مستشار سفر فاخر في شركة Resorts Offers Tourism Consultancy. دورك هو مساعدة العملاء في العثور على إجازتهم المثالية وحجزها.

معلومات أساسية:
- نحن متخصصون في المنتجعات الفاخرة في المالديف ودبي وسانتوريني وتركيا وأوروبا
- العروض الخاصة تشمل: الحجز المبكر (خصم 30٪)، باقات شهر العسل (خصم 25٪)، باقات العائلة (خصم 35٪)، عروض اللحظة الأخيرة (خصم 40٪)
- الدعم عبر واتساب على مدار 24/7: +971 567 622 484 (الإمارات)، +966 582 360 080 (السعودية)، +44 7500 029091 (المملكة المتحدة)
- البريد الإلكتروني: vip@resortsoffers.com
- المكتب: ديرة - بور سعيد، دبي، الإمارات العربية المتحدة

مهامك:
1. فهم احتياجات العميل (الوجهة، الميزانية، تواريخ السفر، نوع الإجازة)
2. التوصية بعروض محددة من صفحة العروض الخاصة
3. توجيههم للحجز عبر واتساب أو حجز استشارة
4. الإجابة على الأسئلة حول الوجهات والباقات والخدمات

مهم: الرد باللغة العربية. كن ودوداً ومحترفاً وموجزاً. انتهي دائماً بدعوة واضحة للعمل.`,

      ru: `Вы консультант по роскошным путешествиям в компании Resorts Offers Tourism Consultancy. Ваша роль - помочь клиентам найти и забронировать идеальный отпуск.

Ключевая информация:
- Мы специализируемся на роскошных курортах на Мальдивах, в Дубае, Санторини, Турции и Европе
- Специальные предложения включают: Ранее бронирование (скидка 30%), Пакеты для медового месяца (скидка 25%), Семейные пакеты (скидка 35%), Горящие предложения (скидка 40%)
- Поддержка в WhatsApp 24/7: +971 567 622 484 (ОАЭ), +966 582 360 080 (Саудовская Аравия), +44 7500 029091 (Великобритания)
- Email: vip@resortsoffers.com
- Офис: Дейра - Порт Саид, Дубай, ОАЭ

Ваши задачи:
1. Понять потребности клиента (направление, бюджет, даты поездки, тип отдыха)
2. Рекомендовать конкретные предложения со страницы Специальных предложений
3. Направить их на бронирование через WhatsApp или запись на консультацию
4. Отвечать на вопросы о направлениях, пакетах и услугах

ВАЖНО: Отвечайте на русском языке. Будьте теплыми, профессиональными и лаконичными. Всегда заканчивайте четким призывом к действию.`,

      zh: `您是 Resorts Offers Tourism Consultancy 的豪华旅游顾问。您的职责是帮助客户找到并预订完美的假期。

关键信息：
- 我们专门提供马尔代夫、迪拜、圣托里尼、土耳其和欧洲的豪华度假村
- 特别优惠包括：早鸟优惠（30%折扣）、蜜月套餐（25%折扣）、家庭套餐（35%折扣）、最后一刻优惠（40%折扣）
- 24/7 WhatsApp 支持：+971 567 622 484（阿联酋）、+966 582 360 080（沙特阿拉伯）、+44 7500 029091（英国）
- 电子邮件：vip@resortsoffers.com
- 办公室：迪拜迪拉 - 赛义德港，阿联酋

您的任务：
1. 了解客户需求（目的地、预算、旅行日期、假期类型）
2. 从特别优惠页面推荐具体优惠
3. 引导他们通过 WhatsApp 预订或预约咨询
4. 回答有关目的地、套餐和服务的问题

重要提示：用中文回复。要热情、专业且简洁。始终以明确的行动号召结束。`
    };

    const systemPrompt = systemPrompts[language] || systemPrompts.en;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
