import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Grid,
  TrendingUp,
  Sparkles,
  X,
  Bot,
  Lightbulb,
  AlertTriangle,
  Pin,
  MessageSquare,
  Bell
} from "lucide-react";

export default function TeacherDashboard() {
  // AI Assistant Modal Visibility & Tab Tracking
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState("insights");

  // --- STATS CARDS DATA (From Screenshot 2026-06-05 144304.png) ---
  const metrics = [
    {
      id: 1,
      title: "Total Classes",
      sub: "This Semester",
      value: "4",
      trend: "0%",
      isPositive: true,
      icon: <BookOpen className="text-[#4E36E2]" size={20} />,
      bgColor: "bg-indigo-50"
    },
    {
      id: 2,
      title: "Total Students",
      sub: "vs last semester",
      value: "15",
      trend: "5%",
      isPositive: true,
      icon: <Users className="text-[#4E36E2]" size={20} />,
      bgColor: "bg-indigo-50"
    },
    {
      id: 3,
      title: "Avg Attendance",
      sub: "vs last month",
      value: "86",
      trend: "3%",
      isPositive: true,
      icon: <Grid className="text-[#4E36E2]" size={20} />,
      bgColor: "bg-indigo-50"
    },
    {
      id: 4,
      title: "Pending Tasks",
      sub: "vs Yesterday",
      value: "3",
      trend: "1%",
      isPositive: false,
      icon: <TrendingUp className="text-[#4E36E2]" size={20} />,
      bgColor: "bg-indigo-50"
    }
  ];

  // --- TIMETABLE SCHEDULE DATA (From Screenshot 2026-06-05 144342.png & 144352.png) ---
  const schedule = [
    { id: 1, time: "8.00AM", duration: "1h", subject: "Mathematics", detail: "Class 10-A Room 201", type: "Lecture", color: "border-indigo-600 bg-indigo-50/40 text-indigo-700" },
    { id: 2, time: "10.00AM", duration: "1h", subject: "Advanced Algebra", detail: "Class 10-c Room 105", type: "Lab", color: "border-purple-500 bg-purple-50/40 text-purple-700" },
    { id: 3, time: "12.00AM", duration: "30m", isBreak: true, label: "Lunch Break" },
    { id: 4, time: "1.00AM", duration: "1h", subject: "Mathematics", detail: "Class 10-B Room 202", type: "Lecture", color: "border-indigo-600 bg-indigo-50/40 text-indigo-700" },
    { id: 5, time: "3.00AM", duration: "1h", subject: "Statistics", detail: "Class 10-D Room 106", type: "Lecture", color: "border-indigo-600 bg-indigo-50/40 text-indigo-700" }
  ];

  // --- RECENT ACTIVITIES (From Screenshot 2026-06-05 144342.png) ---
  const activities = [
    { id: 1, text: "Emma Rodriguez submitted Assignment #4", time: "10 minutes ago", isPin: true },
    { id: 2, text: "Attendance marked for class 10-A", time: "1 hour ago", isPin: true },
    { id: 3, text: "Marks published for unit 3 exam 10-B", time: "2 hour ago", isPin: true },
    { id: 4, text: "New message from david johnson ( parent of Noah)", time: "3 hour ago", isChat: true }
  ];

  // --- NOTIFICATIONS (From Screenshot 2026-06-05 144352.png) ---
  const systemNotifications = [
    { id: 1, text: "Isabella Davis Attendance below 70% threshold", color: "bg-amber-500" },
    { id: 2, text: "Parent teacher conference scheduled for friday", color: "bg-blue-500" },
    { id: 3, text: "Exam results for class 10A approved by Admin", color: "bg-emerald-500" }
  ];

  // --- ATTENDANCE CHART POINTS (From Screenshot 2026-06-05 144320.png) ---
  const attendanceChartData = [
    { month: "Jan", rate: 86, x: 10, y: 35 },
    { month: "Feb", rate: 82, x: 23, y: 43 },
    { month: "Mar", rate: 89, x: 36, y: 28 },
    { month: "Apr", rate: 80, x: 49, y: 48 },
    { month: "May", rate: 87, x: 62, y: 32 },
    { month: "Jun", rate: 91, x: 75, y: 22 },
    { month: "July", rate: 85, x: 88, y: 37 },
    { month: "Aug", rate: 88, x: 100, y: 30 }
  ];

  // --- PERFORMANCE BARS DATA (From Screenshot 2026-06-05 144320.png) ---
  const barChartData = [
    { month: "Jan", avg: 72, top: 88 },
    { month: "Feb", avg: 75, top: 90 },
    { month: "Mar", avg: 68, top: 85 },
    { month: "Apr", avg: 78, top: 92 },
    { month: "May", avg: 80, top: 95 },
    { month: "Jun", avg: 82, top: 96 },
    { month: "July", avg: 77, top: 91 },
    { month: "Aug", avg: 84, top: 92 }
  ];

  return (
    <div className="flex-1 bg-[#F4F7FE] p-6 md:p-8 relative min-h-screen font-sans antialiased overflow-x-hidden">
      
      {/* --- TOP BRAND HEADER BAR --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1B2559] tracking-tight">Welcome Back, Sarah!</h1>
          <p className="text-base font-medium text-gray-500 mt-1">Here's what's happening in your classes today - Saturday April 11</p>
        </div>
        
        {/* FLOAT FLOATING INTERACTIVE AI ASSISTANT INITIATOR */}
        <button
          onClick={() => setIsAiOpen(true)}
          className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-40 bg-[#4E36E2] hover:bg-[#3b25ca] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-base transition-all transform hover:scale-105 active:scale-95"
        >
          <Sparkles size={18} fill="currentColor" />
          <span>AI Assistant</span>
        </button>
      </div>

      {/* --- GRID ROW 1: CORE ANALYTIC CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map((m) => (
          <div key={m.id} className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center justify-between shadow-xs relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4E36E2]"></div>
            <div className="flex items-center gap-4 pl-2">
              <div className={`w-12 h-12 rounded-2xl ${m.bgColor} flex items-center justify-center`}>
                {m.icon}
              </div>
              <div>
                <span className="text-3xl font-black text-[#1B2559] tracking-tight">{m.value}</span>
                <p className="text-xs font-bold text-gray-700 mt-0.5">{m.title}</p>
                <p className="text-[11px] font-medium text-gray-400">{m.sub}</p>
              </div>
            </div>
            <div className={`text-xs font-black px-2 py-1 rounded-lg ${m.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"} flex items-center gap-0.5`}>
              <span>{m.isPositive ? "▲" : "▼"}</span>
              <span>{m.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- GRID ROW 2: GRAPHICAL ANALYTICS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* ATTENDANCE OVERVIEW AREA CHART */}
        <div className="bg-white rounded-[32px] p-6 shadow-xs border border-gray-100 flex flex-col">
          <div>
            <h3 className="text-xl font-extrabold text-[#1B2559]">Attendance overview</h3>
            <p className="text-sm font-bold text-gray-400 mt-0.5">Monthly attendance rate %</p>
          </div>
          <div className="mt-6 flex-1 min-h-[220px] relative">
            <svg viewBox="0 0 110 60" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0DBFF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#E0DBFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Reference Grid lines */}
              {[0, 15, 30, 45, 60].map((v, i) => (
                <line key={i} x1="5" y1={v} x2="105" y2={v} stroke="#F1F3F9" strokeWidth="0.3" strokeDasharray="1 1" />
              ))}
              {/* Area path */}
              <path
                d={`M 10 60 L 10 35 L 23 43 L 36 28 L 49 48 L 62 32 L 75 22 L 88 37 L 100 30 L 100 60 Z`}
                fill="url(#areaGrad)"
              />
              {/* Connecting line */}
              <path
                d={`M 10 35 L 23 43 L 36 28 L 49 48 L 62 32 L 75 22 L 88 37 L 100 30`}
                fill="none"
                stroke="#8A74FF"
                strokeWidth="0.8"
              />
              {/* Interactive nodes */}
              {attendanceChartData.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="0.9" fill="#8A74FF" stroke="#FFFFFF" strokeWidth="0.3" />
              ))}
            </svg>
            {/* Chart X Labels */}
            <div className="flex justify-between text-[11px] font-bold text-gray-400 mt-2 px-1">
              {attendanceChartData.map((pt, i) => <span key={i}>{pt.month}</span>)}
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-bold text-indigo-600">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 border border-white inline-block"></span>
            <span>rate</span>
          </div>
        </div>

        {/* PERFORMANCE SIDE-BY-SIDE BAR CHART */}
        <div className="bg-white rounded-[32px] p-6 shadow-xs border border-gray-100 flex flex-col">
          <div>
            <h3 className="text-xl font-extrabold text-[#1B2559]">Student Performance</h3>
            <p className="text-sm font-bold text-gray-400 mt-0.5">Avg vs Top Performers</p>
          </div>
          <div className="mt-6 flex-1 min-h-[220px] flex flex-col justify-between">
            <div className="flex-1 w-full flex items-end justify-between gap-2 px-2 border-b border-gray-100 pb-2">
              {barChartData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group">
                  <div className="w-full flex items-end justify-center gap-1 max-w-[40px] h-40">
                    <div style={{ height: `${data.avg}%` }} className="w-1/2 bg-[#8A74FF] rounded-t-sm transition-all duration-300"></div>
                    <div style={{ height: `${data.top}%` }} className="w-1/2 bg-[#FF9F9F] rounded-t-sm transition-all duration-300"></div>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 mt-2 block">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-indigo-500">
                <span className="w-3 h-3 rounded-xs bg-[#8A74FF] block"></span>
                <span>Avg</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-3 rounded-xs bg-[#FF9F9F] block"></span>
                <span>Top</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- GRID ROW 3: TIMETABLE, LOGS & NOTIFICATIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: TIMETABLE BLOCKS */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-6 shadow-xs border border-gray-100">
          <h3 className="text-xl font-extrabold text-[#1B2559] mb-6">Today's Timetable</h3>
          <div className="space-y-3">
            {schedule.map((item, idx) => (
              item.isBreak ? (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-dashed border-gray-200">
                  <div className="w-20 text-right">
                    <p className="text-sm font-black text-gray-700">{item.time}</p>
                    <span className="text-xs font-bold text-gray-400 block">{item.duration}</span>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <p className="text-sm font-black text-gray-500 tracking-wide">{item.label}</p>
                </div>
              ) : (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-20 text-right shrink-0">
                    <p className="text-sm font-black text-[#1B2559]">{item.time}</p>
                    <span className="text-xs font-bold text-gray-400 block">{item.duration}</span>
                  </div>
                  <div className="w-1.5 h-12 rounded-full bg-indigo-600 shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-black text-[#1B2559] truncate">{item.subject}</h4>
                    <p className="text-xs font-bold text-gray-400 mt-0.5 truncate">{item.detail}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${item.color} shrink-0`}>
                    {item.type}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVITIES & NOTIFICATIONS BLOCK */}
        <div className="space-y-6">
          
          {/* RECENT ACTIVITY CARD */}
          <div className="bg-white rounded-[32px] p-6 shadow-xs border border-gray-100">
            <h3 className="text-xl font-extrabold text-[#1B2559] mb-5">Recent Activity</h3>
            <div className="space-y-4.5">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3.5">
                  <div className="mt-0.5 shrink-0">
                    {act.isPin ? (
                      <Pin size={16} className="text-rose-500 rotate-45" fill="currentColor" />
                    ) : (
                      <MessageSquare size={16} className="text-blue-500" fill="currentColor" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 leading-snug">{act.text}</p>
                    <span className="text-xs font-medium text-gray-400 block mt-0.5">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NOTIFICATIONS CONTAINER CARD */}
          <div className="bg-white rounded-[32px] p-6 shadow-xs border border-gray-100">
            <h3 className="text-xl font-extrabold text-[#1B2559] mb-4">Notifications</h3>
            <div className="space-y-3">
              {systemNotifications.map((notif) => (
                <div key={notif.id} className="flex items-center gap-3 p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100/50">
                  <span className={`w-3 h-3 rounded-full ${notif.color} shrink-0`}></span>
                  <p className="text-sm font-bold text-gray-700 leading-tight">{notif.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
         --- OVERLAY PANEL COMPONENT: AI TEACHING ASSISTANT ---
         ========================================================================= */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-[36px] shadow-2xl overflow-hidden border border-amber-100/30 transform transition-all flex flex-col max-h-[90vh]">
            
            {/* HEADER METABLOCK AREA */}
            <div className="bg-[#6349E2] p-6 text-white relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">AI Teaching Assistant</h3>
                  <p className="text-xs font-medium text-white/70">Powered by classroom analytics</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* TAB SELECTOR SYSTEM */}
            <div className="flex items-center border-b border-gray-100 bg-white px-6">
              <button
                onClick={() => setActiveAiTab("insights")}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                  activeAiTab === "insights" ? "border-[#6349E2] text-[#6349E2]" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                <TrendingUp size={16} />
                <span>Insights</span>
              </button>
              <button
                onClick={() => setActiveAiTab("suggestions")}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                  activeAiTab === "suggestions" ? "border-[#6349E2] text-[#6349E2]" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                <Lightbulb size={16} />
                <span>Suggestions</span>
              </button>
              <button
                onClick={() => setActiveAiTab("alerts")}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                  activeAiTab === "alerts" ? "border-[#6349E2] text-[#6349E2]" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                <AlertTriangle size={16} />
                <span>Alerts</span>
              </button>
            </div>

            {/* MODAL INTERACTIVE CONTENT PANEL */}
            <div className="p-6 overflow-y-auto space-y-4 bg-gray-50/50 flex-1">
              
              {/* INSIGHTS VIEW PANEL (Screenshot 2026-06-05 144404.png) */}
              {activeAiTab === "insights" && (
                <>
                  <div className="p-4 rounded-2xl bg-[#E6F9F3] border border-[#BFF3E3] flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                      <Users size={16} />
                    </div>
                    <p className="text-sm font-bold text-emerald-900 leading-snug">
                      Class 10-A shows 12% improvement in algebra scores this month compared to last month
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF9E6] border border-[#FFE8A3] flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
                      <AlertTriangle size={16} />
                    </div>
                    <p className="text-sm font-bold text-amber-950 leading-snug">
                      3 Students in class 10 C are scoring below 60%. Early intervention recommended
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E6F9F3] border border-[#BFF3E3] flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                      <Users size={16} />
                    </div>
                    <p className="text-sm font-bold text-emerald-900 leading-snug">
                      Assignment Submission rate increased to 94% across all classes.
                    </p>
                  </div>
                </>
              )}

              {/* SUGGESTIONS VIEW PANEL (Screenshot 2026-06-05 144450.png) */}
              {activeAiTab === "suggestions" && (
                <>
                  <div className="p-4 rounded-2xl bg-[#E6F9F3] border border-[#BFF3E3] flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                      <Users size={16} />
                    </div>
                    <p className="text-sm font-bold text-emerald-900 leading-snug">
                      Consider peer tutoring sessions for class 10c high performance can mentor struggling students,
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E6F9F3] border border-[#BFF3E3] flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                      <Users size={16} />
                    </div>
                    <p className="text-sm font-bold text-emerald-900 leading-snug">
                      Introduce visual aids for statistics lessons. Data shows 15% better comprehension with graph based teaching.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E6F9F3] border border-[#BFF3E3] flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                      <Users size={16} />
                    </div>
                    <p className="text-sm font-bold text-emerald-900 leading-snug">
                      Weekly quick quizzes 5-10min could improve retention by reinforcing key concepts.
                    </p>
                  </div>
                </>
              )}

              {/* ALERTS VIEW PANEL (Screenshot 2026-06-05 144458.png) */}
              {activeAiTab === "alerts" && (
                <>
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex gap-4 items-center">
                    <span className="text-xs font-black uppercase text-rose-600 bg-white px-2 py-1 rounded-md shadow-xs shrink-0 tracking-wider">High</span>
                    <p className="text-sm font-bold text-rose-950 leading-snug">
                      Isabela Davis attendance at 68% below required 75% threshold. Parental contact advised.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex gap-4 items-center">
                    <span className="text-xs font-black uppercase text-amber-600 bg-white px-2 py-1 rounded-md shadow-xs shrink-0 tracking-wider">Medium</span>
                    <p className="text-sm font-bold text-amber-950 leading-snug">
                      Assignment #5 has 8 pending submissions due tomorrow. Send reminder.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-4 items-center">
                    <span className="text-xs font-black uppercase text-blue-600 bg-white px-2 py-1 rounded-md shadow-xs shrink-0 tracking-wider">Low</span>
                    <p className="text-sm font-bold text-blue-950 leading-snug">
                      3 students in 10-D haven't logged in this week. Check engagement.
                    </p>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}