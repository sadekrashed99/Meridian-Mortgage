import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, Bot, HelpCircle, Calendar, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  options?: string[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "bot",
      text: "Hi there! 👋 Welcome to Meridian Mortgage Brokers & Property Advisors. How can we help you secure your property goals today?",
      options: [
        "What is my borrowing power? 💰",
        "Our Melbourne & Sydney Offices 📍",
        "What is the Meridian Advantage? 🌟",
        "I need a Conveyancing Solicitor ⚖️",
        "Book a free strategy call! 📞"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsgId = `u-${Date.now()}`;
    const newMsg: Message = { id: userMsgId, sender: "user", text };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      let replyText = "";
      let options: string[] = [];

      const query = text.toLowerCase();

      if (query.includes("borrow") || query.includes("power") || query.includes("limit") || query.includes("money")) {
        replyText = "Our professional mortgage brokers calculate your borrowing capacity based on your income, deposit size, expenses, and current interest rates (including stress-test APRA buffers of 3%). You can use our interactive Loan Calculator (click the Calculator icon) or click below to schedule a detailed assessment!";
        options = ["Use Repayment Calculator 🧮", "Book free strategy call 📞", "Back to Menu 📋"];
      } else if (query.includes("office") || query.includes("location") || query.includes("address") || query.includes("where")) {
        replyText = "We are headquartered in Richmond, Melbourne (Level 4, 22 River St). We also have dedicated professional hubs in Sydney, Brisbane, Geelong, Byron Bay, and the Mornington Peninsula to assist you locally or remotely.";
        options = ["Contact details 📞", "Back to Menu 📋"];
      } else if (query.includes("advantage") || query.includes("meridian")) {
        replyText = "The 'Meridian Advantage' is our integrated service model. Under one roof, you get elite Mortgage Brokers, Buyer's Advocates, Asset Financiers, and Legal Conveyancing working together as your single, unified representative. We collaborate so you get better deals, save weeks of stress, and make fully informed decisions.";
        options = ["Read about our services 📖", "Book free strategy call 📞", "Back to Menu 📋"];
      } else if (query.includes("legal") || query.includes("conveyancing") || query.includes("solicitor")) {
        replyText = "Yes! Meridian Legal is our licensed legal firm. Our expert property lawyers handle document reviews, contract drafting, and seamless title transfers for residential and commercial purchases Australia-wide.";
        options = ["Book legal advice ⚖️", "Back to Menu 📋"];
      } else if (query.includes("book") || query.includes("call") || query.includes("strategy") || query.includes("talk") || query.includes("chat")) {
        replyText = "Fantastic! We'd love to chat. We offer 100% free, confidential mortgage and property strategy consultations. Would you like to schedule a session?";
        options = ["Schedule Strategy Call Now 📅", "Back to Menu 📋"];
      } else if (query.includes("calculator")) {
        replyText = "To access our calculators, simply click the 'Loan Calculators' button in our Services panel, or close this chat and click 'Loan Calculators' in the upper menu.";
        options = ["Back to Menu 📋"];
      } else {
        replyText = "I'm the Meridian Assistant. I can help with mortgage calculations, our boutique service model, property advisory, and legal conveyancing. What would you like to explore?";
        options = [
          "What is my borrowing power? 💰",
          "What is the Meridian Advantage? 🌟",
          "Book a free strategy call! 📞",
          "Our Melbourne & Sydney Offices 📍"
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: replyText,
          options
        }
      ]);
    }, 850);
  };

  const handleOptionClick = (option: string) => {
    if (option.includes("Use Repayment Calculator")) {
      // Dispatch custom event to trigger calculator
      window.dispatchEvent(new CustomEvent("open-calculator", { detail: { tab: "repayments" } }));
      setIsOpen(false);
      return;
    }
    if (option.includes("Book free strategy call") || option.includes("Schedule Strategy Call Now") || option.includes("Book a free strategy call!")) {
      window.dispatchEvent(new CustomEvent("open-booking", { detail: { service: "finance" } }));
      setIsOpen(false);
      return;
    }
    if (option.includes("Book legal advice") || option.includes("Conveyancing Solicitor")) {
      window.dispatchEvent(new CustomEvent("open-booking", { detail: { service: "legal" } }));
      setIsOpen(false);
      return;
    }
    if (option.includes("Contact details") || option.includes("Offices")) {
      // Scroll to footer
      const footer = document.getElementById("footer-contact");
      if (footer) footer.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      return;
    }
    if (option.includes("Back to Menu")) {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "What else would you like to explore?",
          options: [
            "What is my borrowing power? 💰",
            "Our Melbourne & Sydney Offices 📍",
            "What is the Meridian Advantage? 🌟",
            "I need a Conveyancing Solicitor ⚖️",
            "Book a free strategy call! 📞"
          ]
        }
      ]);
      return;
    }

    handleSend(option);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group bg-brand-gold hover:bg-yellow-600 text-brand-charcoal p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-brand-green animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <MessageSquare className="h-6 w-6 stroke-[2px]" />
          <span className="absolute right-14 bg-brand-charcoal text-white text-[11px] px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-semibold border border-brand-neutral shadow-lg">
            Need help? Chat with us! 💬
          </span>
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[9px] h-5 w-5 rounded-full flex items-center justify-center border border-white">
            1
          </span>
        </button>
      )}

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="w-[360px] h-[480px] bg-white rounded-xl shadow-2xl flex flex-col border border-brand-green/20 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-brand-green text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 bg-brand-gold rounded-full flex items-center justify-center text-brand-charcoal font-bold text-xs shadow-inner">
                MB
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide">Meridian Broker Bot</h3>
                <span className="text-[10px] text-brand-neutral/80 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online • Independent Advice
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F9FA]">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div className={`flex items-start gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs ${
                    msg.sender === "user" ? "bg-brand-gold text-brand-charcoal" : "bg-brand-green"
                  }`}>
                    {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div className={`max-w-[75%] rounded-lg p-3 text-xs leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-brand-gold text-brand-charcoal font-medium"
                      : "bg-white text-brand-charcoal border border-gray-100"
                  }`}>
                    {msg.text}
                  </div>
                </div>

                {/* Optional response chips */}
                {msg.sender === "bot" && msg.options && (
                  <div className="pl-9 flex flex-wrap gap-1.5 pt-1">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        className="bg-white hover:bg-brand-neutral text-brand-green text-[10px] font-semibold py-1.5 px-2.5 border border-brand-green/25 rounded-full shadow-sm transition-all text-left flex items-center gap-1 hover:border-brand-green"
                      >
                        {opt}
                        <ArrowRight className="h-2.5 w-2.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-gray-100 bg-white flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green text-brand-charcoal"
            />
            <button
              type="submit"
              className="bg-brand-green hover:bg-brand-green-hover text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
