import React, { useState } from "react";
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  Image, 
  Smile, 
  Sparkles, 
  X,
  MessageSquare,
  Sparkle
} from "lucide-react";

// --- MOCK DATA FROM FIGMA SCREENSHOTS ---
const initialChats = [
  {
    id: 1,
    name: "Sarah Smith",
    role: "parent",
    subtext: "Parent (Alice Freeman)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    lastMessage: "That's wonderful news! Thank you for the update and your continued support.",
    time: "10:42 AM",
    unreadCount: 0,
    online: true,
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "parent",
    subtext: "Parent (Leo Johnson)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    lastMessage: "Can we schedule a meeting for next week to discuss...",
    time: "09:15 AM",
    unreadCount: 2,
    online: false,
  },
  {
    id: 3,
    name: "David Martinez",
    role: "student",
    subtext: "Student - Grade 11",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    lastMessage: "I have submitted my assignment through the portal.",
    time: "Yesterday",
    unreadCount: 0,
    online: true,
  },
  {
    id: 4,
    name: "Emma Chen",
    role: "student",
    subtext: "Student - Grade 10",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    lastMessage: "Thank you for the feedback on my chemistry lab report.",
    time: "Yesterday",
    unreadCount: 0,
    online: false,
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "student",
    subtext: "Student - Grade 12",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    lastMessage: "Sir, could you please explain question number 4 again?",
    time: "Mon",
    unreadCount: 1,
    online: true,
  },
];

const initialMessages = {
  1: [
    { id: 101, sender: "me", text: "Good morning Mrs. Smith! I wanted to give you a quick update on Alice's performance in class lately.", time: "09:35 AM" },
    { id: 102, sender: "them", text: "Good morning Mr. Fox! Oh, I'd love to hear about it. How is she doing?", time: "09:40 AM" },
    { id: 103, sender: "me", text: "She is doing fantastically. She just scored a 92% on her mid-term physics exam! Her practical work has also improved significantly.", time: "09:41 AM" },
    { id: 104, sender: "them", text: "That's wonderful news! Thank you for the update and your continued support. She has been studying very hard.", time: "10:42 AM" },
  ],
  2: [
    { id: 201, sender: "them", text: "Hello, Can we schedule a meeting for next week to discuss Leo's progress?", time: "09:15 AM" }
  ],
  3: [
    { id: 301, sender: "them", text: "I have submitted my assignment through the portal. Please review it.", time: "Yesterday" }
  ],
  4: [
    { id: 401, sender: "them", text: "Thank you for the feedback on my chemistry lab report.", time: "Yesterday" }
  ],
  5: [
    { id: 501, sender: "them", text: "Sir, could you please explain question number 4 again?", time: "Mon" }
  ]
};

const aiSuggestionsByChat = {
  1: [
    "You're very welcome! Alice's dedication is clearly paying off. Let's keep this momentum going.",
    "Absolutely! If she ever needs help with upcoming advanced modules, I am always here to assist.",
    "Thank you, Sarah. I will continue to monitor her practical project benchmarks next week as well."
  ],
  2: [
    "Hello! Sure, I am free on Tuesday afternoon at 3:00 PM. Would that time slot work for you?",
    "I would be glad to meet. Let me check my schedule and get back to you with some open slots."
  ],
  3: [
    "Great job, David. I'll grade it tonight and provide comprehensive notes on your submission.",
    "Got it, thanks for confirming! I will check the student portal directory shortly."
  ]
};

export default function TeacherMessages() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [activeTab, setActiveTab] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessageText, setNewMessageText] = useState("");
  
  // AI Sidebar State
  const [isAiOpen, setIsAiOpen] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const currentChatMessages = messages[activeChatId] || [];

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          chat.subtext.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === "students") return chat.role === "student";
    if (activeTab === "parents") return chat.role === "parent";
    return true;
  });

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!newMessageText.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: newMessageText.trim(),
      time: timestamp,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg],
    }));

    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === activeChatId
          ? { ...c, lastMessage: newMessageText, time: timestamp }
          : c
      )
    );

    setNewMessageText("");
  };

  const applyAiSuggestion = (suggestion) => {
    setNewMessageText(suggestion);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans pb-12 relative">
      
      {/* --- HEADER STAGE ROW --- */}
      <div className="flex items-center justify-between px-8 py-6 bg-transparent">
        <h1 className="text-3xl font-bold text-slate-800">Messages</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setChats(prev => prev.map(c => ({ ...c, unreadCount: 0 })))}
            className="px-5 py-2.5 bg-white text-slate-700 font-semibold text-sm rounded-xl border border-slate-200/80 shadow-xs hover:bg-slate-50 transition-colors"
          >
            Mark all as read
          </button>
          <button className="px-5 py-2.5 bg-[#523ae4] text-white font-semibold text-sm rounded-xl shadow-sm hover:bg-[#432ec4] transition-all flex items-center gap-2">
            <MessageSquare size={16} />
            <span>New Message</span>
          </button>
        </div>
      </div>

      {/* --- CONTENT MATRIX --- */}
      <div className="flex flex-col lg:flex-row gap-6 px-8 items-start">
        
        {/* --- INBOX SIDEBAR (LEFT PANE) --- */}
        <div className="w-full lg:w-85 bg-white rounded-3xl border border-slate-200/60 shadow-xs flex flex-col">
          
          {/* Search Contacts */}
          <div className="p-4 pb-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f4f3ff] border-none rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 transition-all"
              />
            </div>
          </div>

          {/* Filter Navigation Tabs */}
          <div className="flex border-b border-slate-100 px-4 gap-6 text-sm font-semibold text-slate-500">
            {["all", "students", "parents"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 capitalize transition-all relative ${
                  activeTab === tab ? "text-[#523ae4]" : "hover:text-slate-800"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#523ae4] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Chat Target Items List */}
          <div className="p-2 space-y-1">
            {filteredChats.map((chat) => {
              const isSelected = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unreadCount: 0 } : c));
                  }}
                  className={`w-full flex gap-3 p-3 rounded-2xl transition-all text-left ${
                    isSelected ? "bg-[#f0edff]" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-xs" />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{chat.name}</h4>
                      <span className="text-[11px] font-semibold text-slate-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium truncate leading-normal">
                      {chat.lastMessage}
                    </p>
                  </div>

                  {chat.unreadCount > 0 && (
                    <div className="self-center shrink-0 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {chat.unreadCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- MAIN CHAT THREAD (RIGHT PANE) --- */}
        <div className="flex-1 w-full bg-white rounded-3xl border border-slate-200/60 shadow-xs flex flex-col overflow-hidden">
          
          {/* Header Contact Layout */}
          <div className="px-6 h-20 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-11 h-11 rounded-full object-cover shadow-xs border border-slate-100" />
              <div>
                <h3 className="text-base font-bold text-slate-800 leading-tight">{activeChat.name}</h3>
                <span className="text-xs font-semibold text-slate-400 block mt-0.5">{activeChat.subtext}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-slate-400">
              <button className="p-2.5 hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all"><Phone size={20} /></button>
              <button className="p-2.5 hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all"><Video size={20} /></button>
              <button className="p-2.5 hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all"><Info size={20} /></button>
            </div>
          </div>

          {/* Dialogue Message Container Streams */}
          <div className="p-6 space-y-6 bg-[#fcfbfe]">
            <div className="text-center my-2">
              <span className="text-xs font-bold text-slate-400 bg-slate-200/40 rounded-lg px-3 py-1">
                Today, 09:30 AM
              </span>
            </div>

            {currentChatMessages.map((msg) => {
              const isMe = msg.sender === "me";
              return (
                <div key={msg.id} className={`flex items-start gap-3 ${isMe ? "justify-end" : "justify-start"}`}>
                  {!isMe && (
                    <img src={activeChat.avatar} alt={activeChat.name} className="w-8 h-8 rounded-full object-cover shadow-xs border border-slate-100 mt-1" />
                  )}
                  
                  <div className={`max-w-[65%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`px-5 py-3.5 rounded-[22px] text-sm font-medium leading-relaxed ${
                      isMe 
                        ? "bg-[#523ae4] text-white rounded-tr-none shadow-sm" 
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-200/70 shadow-xs"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-1.5 px-1">
                      {msg.time}
                    </span>
                  </div>

                  {isMe && (
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" alt="Teacher Avatar" className="w-8 h-8 rounded-full object-cover shadow-xs border border-slate-100 mt-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Message Type Input Action Footer */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-[#f4f3ff] border border-slate-200/30 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#523ae4]/20 transition-all">
              <div className="flex items-center text-slate-400 pl-1">
                <button type="button" className="p-2 hover:bg-slate-200/40 rounded-xl hover:text-slate-600 transition-colors"><Paperclip size={18} /></button>
                <button type="button" className="p-2 hover:bg-slate-200/40 rounded-xl hover:text-slate-600 transition-colors"><Image size={18} /></button>
              </div>

              <input
                type="text"
                placeholder="Type your message here..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 bg-transparent border-none py-2 px-2 text-sm font-medium text-slate-700 focus:outline-none placeholder-slate-400"
              />

              <div className="flex items-center text-slate-400 pr-1">
                <button type="button" className="p-2 hover:bg-slate-200/40 rounded-xl hover:text-slate-600 transition-colors"><Smile size={18} /></button>
                <button
                  type="submit"
                  disabled={!newMessageText.trim()}
                  className={`p-2.5 rounded-xl transition-all ${
                    newMessageText.trim()
                      ? "bg-[#523ae4] text-white hover:bg-[#432ec4] cursor-pointer"
                      : "bg-transparent text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <Send size={16} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* --- ✨ FLOATING AI ASSISTANT BUTTON --- */}
      <button 
        onClick={() => setIsAiOpen(!isAiOpen)}
        className="fixed bottom-10 right-12 bg-[#523ae4] hover:bg-[#432ec4] text-white font-bold text-base px-6 py-4 rounded-full shadow-xl shadow-indigo-200 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 z-40"
      >
        <Sparkles size={20} className="fill-white/20" />
        <span>AI Assistant</span>
      </button>

      {/* --- AI ASSISTANT SIDE PANEL DRAWER --- */}
      {isAiOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs transition-opacity z-40"
          onClick={() => setIsAiOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-slate-100 z-50 flex flex-col transform transition-transform duration-300 ease-out p-6 ${
        isAiOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#f0edff] rounded-xl text-[#523ae4]">
              <Sparkle size={20} className="fill-[#523ae4]/20" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Smart AI Assistant</h3>
              <p className="text-xs text-slate-400 font-medium">Contextual reply suggestions</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAiOpen(false)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          <div className="bg-[#f4f3ff] rounded-2xl p-4 border border-[#523ae4]/10">
            <span className="text-[10px] font-bold text-[#523ae4] uppercase tracking-wider block mb-1">Active Thread Context</span>
            <p className="text-xs font-semibold text-slate-700 leading-normal">
              Analyzing latest response metrics from <strong className="font-bold text-slate-900">{activeChat.name}</strong> to draft conversational suggestions.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Suggested Quick Replies</h4>
            
            {(aiSuggestionsByChat[activeChat.id] || [
              "Hello! Let me review that parameter and send over detailed records later today.",
              "Thank you for reaching out! I will look into this right away."
            ]).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  applyAiSuggestion(suggestion);
                  setIsAiOpen(false); 
                }}
                className="w-full bg-white border border-slate-200/80 hover:border-[#523ae4]/40 hover:bg-[#f4f3ff]/30 text-slate-700 font-medium text-xs text-left p-4 rounded-xl shadow-2xs leading-relaxed transition-all block"
              >
                <span className="block mb-2 text-[10px] font-bold text-slate-400">Option {idx + 1}</span>
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-semibold">
            Selecting a prompt updates the text bar. You can edit before hitting send.
          </p>
        </div>
      </div>

    </div>
  );
}