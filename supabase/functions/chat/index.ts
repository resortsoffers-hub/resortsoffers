import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = "en" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompts: Record<string, string> = {
      en: `You are a luxury travel consultant for Resorts Offers Tourism Consultancy. Your role is to help clients find and book their perfect vacation.

Key Information:
- We specialize in luxury resorts in Maldives, Dubai, Santorini, Turkey, and Europe
- Special offers include Early Bird (30% off), Honeymoon packages (25% off), Family packages (35% off), Last Minute deals (40% off)
- We have 24/7 WhatsApp support: +971 567 622 484 (UAE), +966 582 360 080 (KSA), +44 7500 029091 (UK)
- Email: vip@resortsoffers.com
- Office: Deira - Port Saeed, Dubai, UAE

Your Tasks:
1. Understand client needs (destination, budget, travel dates, type of vacation)
2. Recommend specific offers from our Special Offers page
3. Guide them to book via WhatsApp or book a consultation
4. Answer questions about destinations, packages, and services

Navigation Help:
- Special Offers page: /offers
- Resort Partners: /resorts
- Consultancy Services: /consultancy
- Book Consultation: /book-consultation
- Contact Us: /contact

IMPORTANT: Respond in English. Be warm, professional, and concise. Always end with a clear call-to-action.`,

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
