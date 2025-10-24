import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatWidget = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(i18n.language || "en");
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPromptsMap: Record<string, string[]> = {
    en: [
      "Find me a honeymoon package",
      "Best family resorts in Maldives",
      "Last minute deals under $500",
      "What's included in Early Bird offers?",
      "Book a consultation",
    ],
    ar: [
      "ابحث لي عن باقة شهر العسل",
      "أفضل منتجعات العائلات في المالديف",
      "عروض اللحظة الأخيرة أقل من 500 دولار",
      "ما المتضمن في عروض الحجز المبكر؟",
      "احجز استشارة",
    ],
    ru: [
      "Найдите мне пакет для медового месяца",
      "Лучшие семейные курорты на Мальдивах",
      "Горящие предложения до $500",
      "Что входит в предложения раннего бронирования?",
      "Забронировать консультацию",
    ],
    zh: [
      "为我找一个蜜月套餐",
      "马尔代夫最佳家庭度假村",
      "低于500美元的最后一刻优惠",
      "早鸟优惠包括什么？",
      "预约咨询",
    ],
  };

  const welcomeMessages: Record<string, { greeting: string; bullets: string[] }> = {
    en: {
      greeting: "👋 Hello! I'm your AI travel assistant. I can help you:",
      bullets: [
        "Find perfect resort deals",
        "Compare destinations",
        "Book consultations",
        "Answer travel questions"
      ]
    },
    ar: {
      greeting: "👋 مرحباً! أنا مساعدك السياحي بالذكاء الاصطناعي. يمكنني مساعدتك في:",
      bullets: [
        "العثور على أفضل عروض المنتجعات",
        "مقارنة الوجهات",
        "حجز الاستشارات",
        "الإجابة على أسئلة السفر"
      ]
    },
    ru: {
      greeting: "👋 Здравствуйте! Я ваш AI-помощник по путешествиям. Я могу помочь вам:",
      bullets: [
        "Найти идеальные предложения курортов",
        "Сравнить направления",
        "Забронировать консультации",
        "Ответить на вопросы о путешествиях"
      ]
    },
    zh: {
      greeting: "👋 您好！我是您的AI旅行助手。我可以帮助您：",
      bullets: [
        "找到完美的度假村优惠",
        "比较目的地",
        "预订咨询",
        "回答旅行问题"
      ]
    }
  };

  const quickPrompts = quickPromptsMap[language] || quickPromptsMap.en;
  const welcome = welcomeMessages[language] || welcomeMessages.en;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages, language }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to start stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try contacting us via WhatsApp at +971 567 622 484",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    streamChat(input);
  };

  const handleQuickPrompt = (prompt: string) => {
    streamChat(prompt);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-[60]"
              size="icon"
              aria-label="Live AI Chat"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Live AI Chat
          </TooltipContent>
        </Tooltip>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 left-4 md:left-auto md:right-6 md:w-96 max-w-md h-[600px] shadow-2xl z-[60] flex flex-col animate-scale-in mx-auto md:mx-0">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Travel Assistant</h3>
                  <p className="text-xs opacity-90">Powered by AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <Select value={language} onValueChange={(val) => { setLanguage(val); setMessages([]); }}>
                <SelectTrigger className="h-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-3">
                    {welcome.greeting}
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    {welcome.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {language === "ar" ? "اقتراحات سريعة:" : language === "ru" ? "Быстрые подсказки:" : language === "zh" ? "快速提示：" : "Quick prompts:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleQuickPrompt(prompt)}
                      >
                        {prompt}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, i) => (
              <div
                key={i}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;
