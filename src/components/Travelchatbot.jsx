import React, { useState, useRef, useEffect } from "react";
import {
  Plane,
  Hotel,
  TrainFront,
  Package,
  Send,
  X,
  MapPin,
  Calendar,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Voyo — A travel-booking chat assistant with custom SVG avatar implementation
// Signature element: Boarding-pass styled results for actionable cards.
// ---------------------------------------------------------------------------

const QUICK_ACTIONS = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "trains", label: "Trains", icon: TrainFront },
  { id: "packages", label: "Holiday packages", icon: Package },
];

const FLIGHT_RESULTS = [
  {
    id: "f1",
    airline: "IndiGo",
    code: "6E 204",
    from: "BLR",
    to: "GOI",
    depart: "06:40",
    arrive: "07:55",
    duration: "1h 15m",
    stops: "Non-stop",
    price: "4,120",
  },
  {
    id: "f2",
    airline: "Air India",
    code: "AI 507",
    from: "BLR",
    to: "GOI",
    depart: "14:10",
    arrive: "15:30",
    duration: "1h 20m",
    stops: "Non-stop",
    price: "3,860",
  },
  {
    id: "f3",
    airline: "Vistara",
    code: "UK 861",
    from: "BLR",
    to: "GOI",
    depart: "19:05",
    arrive: "20:35",
    duration: "1h 30m",
    stops: "Non-stop",
    price: "4,540",
  },
];

const HOTEL_RESULTS = [
  {
    id: "h1",
    name: "Calangute Bay Resort",
    area: "Calangute, Goa",
    rating: "4.3",
    nights: "3 nights",
    price: "8,970",
  },
  {
    id: "h2",
    name: "Palm Grove Villas",
    area: "Candolim, Goa",
    rating: "4.6",
    nights: "3 nights",
    price: "11,250",
  },
];

// ---------------------------------------------------------------------------
// VoyoAvatar — inline SVG robot avatar with a waving hand and gentle blink.
// Replaces the old <img src="/voyo-avatar.webp" /> so nothing external
// needs to be hosted — it's fully self-contained.
// ---------------------------------------------------------------------------
function VoyoAvatar({ size = 44 }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timeoutId;
    const scheduleBlink = () => {
      const nextIn = 2400 + Math.random() * 2600; // 2.4s – 5s, feels natural
      timeoutId = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        scheduleBlink();
      }, nextIn);
    };
    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{ width: size, height: size }} className="shrink-0">
      <style>{`
        @keyframes voyo-head-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes voyo-wave {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-8deg); }
          20% { transform: rotate(28deg); }
          30% { transform: rotate(4deg); }
          40% { transform: rotate(28deg); }
          50% { transform: rotate(4deg); }
          60% { transform: rotate(20deg); }
          70%, 100% { transform: rotate(0deg); }
        }
        @keyframes voyo-arm-rest {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .voyo-head-bob {
          animation: voyo-head-bob 2.6s ease-in-out infinite;
        }
        .voyo-wave-arm {
          animation: voyo-wave 2.6s ease-in-out infinite;
          transform-origin: 168px 158px;
        }
        .voyo-rest-arm {
          animation: voyo-arm-rest 3s ease-in-out infinite;
          transform-origin: 50% 0%;
        }
        .voyo-eye {
          transition: transform 90ms ease-in-out;
          transform-origin: 50% 50%;
        }
        .voyo-eye-blink {
          transform: scaleY(0.08);
        }
      `}</style>
      <svg
        viewBox="0 0 240 260"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="voyoBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c7ccd6" />
          </linearGradient>
          <linearGradient id="voyoHead" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d7dbe3" />
          </linearGradient>
          <radialGradient id="voyoScreen" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#1B1F3B" />
            <stop offset="100%" stopColor="#0d0f1f" />
          </radialGradient>
          <radialGradient id="voyoEyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd8c2" />
            <stop offset="100%" stopColor="#FF6B35" />
          </radialGradient>
        </defs>

        {/* Resting left arm (viewer's left) */}
        <g className="voyo-rest-arm">
          <ellipse cx="40" cy="185" rx="20" ry="46" fill="url(#voyoBody)" />
        </g>

        {/* Body */}
        <path
          d="M120 140
             C 168 140 188 170 188 210
             C 188 255 158 260 120 260
             C 82 260 52 255 52 210
             C 52 170 72 140 120 140 Z"
          fill="url(#voyoBody)"
        />

        {/* Waving right arm (viewer's right), pivoting at the shoulder */}
        <g className="voyo-wave-arm">
          <ellipse cx="200" cy="185" rx="20" ry="46" fill="url(#voyoBody)" />
        </g>

        {/* Head group bobs gently */}
        <g className="voyo-head-bob">
          {/* Ears */}
          <ellipse cx="42" cy="70" rx="12" ry="17" fill="#d7dbe3" />
          <ellipse cx="198" cy="70" rx="12" ry="17" fill="#d7dbe3" />

          {/* Antenna */}
          <rect x="108" y="4" width="12" height="16" rx="6" fill="#eef0f4" />
          <circle cx="114" cy="6" r="8" fill="#FF6B35" />

          {/* Head */}
          <rect x="34" y="24" width="160" height="110" rx="42" fill="url(#voyoHead)" />

          {/* Screen / face */}
          <rect x="52" y="42" width="124" height="76" rx="24" fill="url(#voyoScreen)" />

          {/* Eyes */}
          <g className={`voyo-eye ${blink ? "voyo-eye-blink" : ""}`}>
            <path d="M84 82 q10 -15 20 0 q-10 8 -20 0 Z" fill="url(#voyoEyeGlow)" />
          </g>
          <g className={`voyo-eye ${blink ? "voyo-eye-blink" : ""}`}>
            <path d="M136 82 q10 -15 20 0 q-10 8 -20 0 Z" fill="url(#voyoEyeGlow)" />
          </g>

          {/* Smile */}
          <path d="M100 98 q14 12 28 0 q-6 14 -28 0 Z" fill="#FF6B35" />
        </g>
      </svg>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8FB5] animate-bounce [animation-delay:-0.3s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8FB5] animate-bounce [animation-delay:-0.15s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8FB5] animate-bounce" />
    </div>
  );
}

function BoardingPassCard({ children, stubLabel, onSelect, footer }) {
  return (
    <div className="flex rounded-xl overflow-hidden shadow-sm border border-[#E7E4DC] bg-white my-1 max-w-[280px]">
      <div className="flex-1 p-3">{children}</div>
      <div className="relative w-14 shrink-0 flex flex-col items-center justify-center bg-[#FF6B35] text-white">
        {/* Perforation Notches */}
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#F7F5F2]" />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#F7F5F2]" />
        <div className="absolute inset-y-0 left-0 border-l-2 border-dashed border-white/60" />
        <button
          onClick={onSelect}
          className="flex flex-col items-center gap-1 text-[10px] font-bold tracking-widest [writing-mode:vertical-rl] py-2 hover:opacity-90 transition"
        >
          {stubLabel}
        </button>
      </div>
      {footer}
    </div>
  );
}

function FlightCard({ flight, onSelect }) {
  return (
    <BoardingPassCard stubLabel="SELECT ↑" onSelect={() => onSelect(flight)}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-semibold text-[#1B1F3B]">
          {flight.airline}
        </span>
        <span className="text-[10px] text-[#8A8FB5]">{flight.code}</span>
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="text-center">
          <p className="text-sm font-bold text-[#1B1F3B] leading-none">
            {flight.depart}
          </p>
          <p className="text-[10px] text-[#8A8FB5] mt-0.5">{flight.from}</p>
        </div>
        <div className="flex-1 flex flex-col items-center px-1">
          <span className="text-[9px] text-[#8A8FB5]">{flight.duration}</span>
          <div className="w-full h-px bg-[#E7E4DC] relative my-1">
            <Plane className="w-3 h-3 text-[#FF6B35] absolute -top-1.5 right-0 rotate-90" />
          </div>
          <span className="text-[9px] text-[#2EC4B6] font-medium">
            {flight.stops}
          </span>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#1B1F3B] leading-none">
            {flight.arrive}
          </p>
          <p className="text-[10px] text-[#8A8FB5] mt-0.5">{flight.to}</p>
        </div>
      </div>
      <p className="text-base font-extrabold text-[#1B1F3B]">
        ₹{flight.price}
        <span className="text-[10px] font-normal text-[#8A8FB5]"> /person</span>
      </p>
    </BoardingPassCard>
  );
}

// Stays / Accommodation UI Component
function HotelCard({ hotel, onSelect }) {
  return (
    <BoardingPassCard stubLabel="BOOK ↑" onSelect={() => onSelect(hotel)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold text-[#1B1F3B] leading-tight">
          {hotel.name}
        </span>
      </div>
      <p className="text-[10px] text-[#8A8FB5] mb-1.5 flex items-center gap-1">
        <MapPin className="w-3 h-3" /> {hotel.area}
      </p>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-bold bg-[#2EC4B6]/10 text-[#2EC4B6] px-1.5 py-0.5 rounded">
          ★ {hotel.rating}
        </span>
        <span className="text-[10px] text-[#8A8FB5]">{hotel.nights}</span>
      </div>
      <p className="text-base font-extrabold text-[#1B1F3B]">
        ₹{hotel.price}
        <span className="text-[10px] font-normal text-[#8A8FB5]"> total</span>
      </p>
    </BoardingPassCard>
  );
}

function QuickReplies({ options, onPick }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onPick(opt)}
          className="flex items-center gap-1.5 text-xs font-medium bg-white border border-[#E7E4DC] text-[#1B1F3B] px-3 py-1.5 rounded-full hover:border-[#FF6B35] hover:text-[#FF6B35] transition"
        >
          {opt.icon && <opt.icon className="w-3.5 h-3.5" />}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

let uid = 0;
const nextId = () => `m${Date.now()}_${uid++}`;

export default function TravelChatbot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: nextId(),
      sender: "bot",
      type: "text",
      text: "Hi, I'm Voyo ✈️ Tell me where you're headed and I'll sort flights, stays, or a full trip for you.",
    },
    {
      id: nextId(),
      sender: "bot",
      type: "quickReplies",
      options: QUICK_ACTIONS,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState("idle");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function pushBot(msg, delay = 700) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { id: nextId(), sender: "bot", ...msg }]);
    }, delay);
  }

  function pushUser(text) {
    setMessages((m) => [
      ...m,
      { id: nextId(), sender: "user", type: "text", text },
    ]);
  }

  function handleQuickReply(opt) {
    pushUser(opt.label);
    if (opt.id === "flights") {
      setStage("awaiting_route_flight");
      pushBot({
        type: "text",
        text: "Great, flights it is. Which route — try something like “Bangalore to Goa”.",
      });
    } else if (opt.id === "hotels") {
      setStage("awaiting_route_hotel");
      pushBot({
        type: "text",
        text: "Sure — which city are you staying in? Try “Hotels in Goa”.",
      });
    } else if (opt.id === "trains") {
      pushBot({
        type: "text",
        text: "Train search is boarding soon 🚆 — for now I can help with flights, hotels, or a holiday package.",
      });
    } else if (opt.id === "packages") {
      pushBot({
        type: "text",
        text: "Love that. A 4N/5D Goa package with flights + stay + breakfast starts around ₹18,500/person. Want me to hold two seats?",
      });
    }
  }

  function handleFlightSelect(flight) {
    pushUser(`Book ${flight.airline} ${flight.code}`);
    pushBot({
      type: "confirm",
      text: `Locked in — ${flight.airline} ${flight.code}, ${flight.from} → ${flight.to} at ${flight.depart}, for ₹${flight.price}. Want to add a hotel in Goa too?`,
    });
    setStage("post_flight");
  }

  function handleHotelSelect(hotel) {
    pushUser(`Book ${hotel.name}`);
    pushBot({
      type: "confirm",
      text: `You're set — ${hotel.name} for ${hotel.nights}, ₹${hotel.price} total. I've sent the itinerary to your email.`,
    });
  }

  function handleSend(text) {
    const value = (text ?? input).trim();
    if (!value) return;
    pushUser(value);
    setInput("");

    const lower = value.toLowerCase();
    if (stage === "awaiting_route_flight" || lower.includes("to")) {
      setStage("results_flight");
      pushBot({
        text: `Searching flights for “${value}”…`,
        type: "text",
      });
      setTimeout(() => {
        pushBot(
          {
            type: "cards",
            cardType: "flight",
            items: FLIGHT_RESULTS,
            text: "Here's what's flying that route — best fares first:",
          },
          900
        );
      }, 750);
      return;
    }
    if (stage === "awaiting_route_hotel" || lower.includes("hotel")) {
      setStage("results_hotel");
      pushBot({ text: `Checking stays for “${value}”…`, type: "text" });
      setTimeout(() => {
        pushBot(
          {
            type: "cards",
            cardType: "hotel",
            items: HOTEL_RESULTS,
            text: "Found a couple of well-rated stays:",
          },
          900
        );
      }, 750);
      return;
    }
    if (stage === "post_flight" && lower.includes("yes")) {
      setStage("results_hotel");
      pushBot({
        type: "cards",
        cardType: "hotel",
        items: HOTEL_RESULTS,
        text: "Here are stays near your Goa flight:",
      });
      return;
    }

    pushBot({
      type: "text",
      text: "I can help with flights, hotels, trains, or holiday packages — just say the word, or pick one below.",
    });
    pushBot({ type: "quickReplies", options: QUICK_ACTIONS }, 1100);
  }

  return (
    <div className="fixed inset-0 pointer-events-none font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Sora', sans-serif; }
      `}</style>

      {/* Persistent App Launcher Switch — just the avatar itself, no circle backdrop */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto absolute bottom-6 right-6 w-24 h-24 flex items-center justify-center hover:scale-105 transition drop-shadow-xl"
          aria-label="Open Voyo chat"
        >
          <VoyoAvatar size={96} />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF6B35] flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </span>
        </button>
      )}

      {/* Main Chat Interface Window Panel */}
      {isOpen && (
        <div className="pointer-events-auto absolute bottom-6 right-6 w-[380px] max-w-[92vw] h-[600px] max-h-[85vh] flex flex-col">
          {/* Avatar breaks out above the window — sits outside the clipped card so it can overflow freely */}
          <div className="absolute -top-9 left-5 z-20">
            <div className="relative w-[108px] h-[108px]">
              <div className="absolute inset-0 rounded-full bg-[#FF6B35]/25 blur-md scale-110" />
              <VoyoAvatar size={108} />
            </div>
          </div>

          <div className="relative flex-1 bg-[#F7F5F2] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#E7E4DC]">
            {/* Custom Modern Header Element — extra left padding clears space for the avatar poking out above it */}
            <div className="bg-[#1B1F3B] pl-24 pr-4 pt-7 pb-3 flex items-center gap-3 shrink-0">
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-white text-sm">
                  Voyo
                </p>
                <p className="text-[11px] text-[#8A8FB5] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] animate-pulse" />
                  Online · ready to plan your trip
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8A8FB5] hover:text-white transition"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          {/* Dynamic Message Logs Display Scroll-Zone */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.type === "text" && (
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-snug rounded-2xl ${
                      m.sender === "user"
                        ? "bg-[#1B1F3B] text-white rounded-br-sm"
                        : "bg-white text-[#1B1F3B] border border-[#E7E4DC] rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                )}

                {m.type === "confirm" && (
                  <div className="max-w-[80%] px-3.5 py-2.5 text-sm leading-snug rounded-2xl rounded-bl-sm bg-[#2EC4B6]/10 border border-[#2EC4B6]/30 text-[#1B1F3B] flex gap-2">
                    <Check className="w-4 h-4 text-[#2EC4B6] shrink-0 mt-0.5" />
                    <span>{m.text}</span>
                  </div>
                )}

                {m.type === "quickReplies" && (
                  <QuickReplies options={m.options} onPick={handleQuickReply} />
                )}

                {m.type === "cards" && (
                  <div className="max-w-[85%]">
                    <p className="text-xs text-[#8A8FB5] mb-1.5 px-1">
                      {m.text}
                    </p>
                    <div className="space-y-2">
                      {m.items.map((item) =>
                        m.cardType === "flight" ? (
                          <FlightCard
                            key={item.id}
                            flight={item}
                            onSelect={handleFlightSelect}
                          />
                        ) : (
                          <HotelCard
                            key={item.id}
                            hotel={item}
                            onSelect={handleHotelSelect}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E7E4DC] rounded-2xl rounded-bl-sm">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Control Form Input Bar Console */}
          <div className="border-t border-[#E7E4DC] bg-white px-3 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about flights, hotels, trips…"
                className="flex-1 text-sm bg-[#F7F5F2] rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#FF6B35]/40 text-[#1B1F3B] placeholder:text-[#8A8FB5]"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-[#FF6B35] text-white flex items-center justify-center disabled:opacity-40 hover:brightness-105 transition shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-[#8A8FB5]">
              <Calendar className="w-3 h-3" />
              <span>Try “Bangalore to Goa” or “Hotels in Goa”</span>
              <ArrowRight className="w-3 h-3 ml-auto opacity-0" />
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}