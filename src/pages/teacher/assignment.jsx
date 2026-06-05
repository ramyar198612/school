import React, { useState } from "react";
import { Search, ChevronDown, Plus, Sparkles, X, Bot, TrendingUp, Lightbulb, AlertTriangle, CheckCircle, Calendar, FileText, CheckSquare, Clock } from "lucide-react";

export default function Assignments() {
  // --- STATE CONTROLLERS ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState("insights");
  
  // Modal Triggers
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Form Entry Submission State
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    classBadge: "Class 10-A",
    dueDate: "",
    description: ""
  });

  // --- CORE DATASET SEED ---
  const [assignments, setAssignments] = useState([
    { id: "ASM-902", title: "Quadratic Equations Homework", classBadge: "Class 10-A", dueDate: "2026-06-12", progress: 85, status: "Active" },
    { id: "ASM-903", title: "Trigonometry Basics Worksheet", classBadge: "Class 10-B", dueDate: "2026-06-08", progress: 40, status: "Active" },
    { id: "ASM-904", title: "Probability & Statistics Lab", classBadge: "Class 10-A", dueDate: "2026-06-02", progress: 100, status: "Pending Review" },
    { id: "ASM-905", title: "Geometry Theorem Proofs", classBadge: "Class 10-C", dueDate: "2026-05-28", progress: 100, status: "Completed" },
    { id: "ASM-906", title: "Algebra Mock Quiz 2", classBadge: "Class 10-A", dueDate: "2026-06-15", progress: 0, status: "Active" }
  ]);

  // --- DERIVED ANALYTICS METRICS ---
  const totalCount = assignments.length;
  const activeCount = assignments.filter(a => a.status === "Active").length;
  const pendingCount = assignments.filter(a => a.status === "Pending Review").length;
  const completedCount = assignments.filter(a => a.status === "Completed").length;

  // --- FILTER EXECUTION HANDLER ---
  const filteredAssignments = assignments.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "All" || item.classBadge === selectedClass;
    return matchesSearch && matchesClass;
  });

  // --- CREATE NEW ASSIGNMENT SUBMISSION PIPELINE ---
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.dueDate) {
      alert("Please populate all required fields.");
      return;
    }

    const createdRecord = {
      id: `ASM-${Math.floor(100 + Math.random() * 900)}`,
      title: newAssignment.title,
      classBadge: newAssignment.classBadge,
      dueDate: newAssignment.dueDate,
      progress: 0,
      status: "Active"
    };

    setAssignments([createdRecord, ...assignments]);
    
    // Clear out Form state container inputs
    setNewAssignment({ title: "", classBadge: "Class 10-A", dueDate: "", description: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] p-6 md:p-8 min-h-screen font-sans antialiased text-slate-800 relative">
      
      {/* --- TOP BANNER LAYOUT HEADER BLOCK --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1B2559]">Assignments</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">Manage, track progress, and review student curriculums</p>
        </div>
        
        {/* "+ Create Assignment" Launcher Action */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4E36E2] hover:bg-[#3b25ca] text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* --- STATISTICAL COUNTER OVERVIEW ROW --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-[#4E36E2]"><FileText size={20} /></div>
          <div>
            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Total</span>
            <span className="text-xl font-black text-[#1B2559] mt-0.5 block">{totalCount} Records</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500"><Clock size={20} /></div>
          <div>
            <span className="text-xs font-bold text-amber-500 block uppercase tracking-wider">Active</span>
            <span className="text-xl font-black text-[#1B2559] mt-0.5 block">{activeCount} Class Task</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-50 rounded-xl text-rose-500"><AlertTriangle size={20} /></div>
          <div>
            <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Pending Review</span>
            <span className="text-xl font-black text-[#1B2559] mt-0.5 block">{pendingCount} Submissions</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500"><CheckSquare size={20} /></div>
          <div>
            <span className="text-xs font-bold text-emerald-500 block uppercase tracking-wider">Completed</span>
            <span className="text-xl font-black text-[#1B2559] mt-0.5 block">{completedCount} Closed</span>
          </div>
        </div>
      </div>

      {/* --- FILTER CONTROL MODULE TOOLBAR --- */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-full sm:max-w-xs">
          <Search size={16} className="text-gray-400 mr-2.5 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by assignment title or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm font-medium w-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-xs min-w-[140px]"
          >
            <option value="All">All Classes</option>
            <option value="Class 10-A">Class 10-A</option>
            <option value="Class 10-B">Class 10-B</option>
            <option value="Class 10-C">Class 10-C</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* --- DATA SELECTION GRID TABLE MATRIX --- */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden mb-24">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50/50">
                <th className="py-4 px-6 min-w-[240px]">Assignment Details</th>
                <th className="py-4 px-6">Target Class</th>
                <th className="py-4 px-6 min-w-[180px]">Submission Tracker Progress</th>
                <th className="py-4 px-6">Due Date</th>
                <th className="py-4 px-6">Status Status</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-sm text-[#1B2559]">
              {filteredAssignments.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                  
                  {/* Title Info Header */}
                  <td className="py-4 px-6">
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{item.title}</h4>
                      <span className="text-xs font-semibold text-gray-400 block mt-0.5">{item.id}</span>
                    </div>
                  </td>

                  {/* Targeted Section Badge */}
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">
                      {item.classBadge}
                    </span>
                  </td>

                  {/* Submission Progression Slider Component */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${item.progress}%` }} 
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.progress === 100 ? "bg-emerald-500" : "bg-indigo-500"
                          }`}
                        />
                      </div>
                      <span className="text-xs font-black text-gray-600 min-w-[32px]">{item.progress}%</span>
                    </div>
                  </td>

                  {/* Deadlines Schedule Calendar Column */}
                  <td className="py-4 px-6 text-gray-500 text-xs font-bold">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-gray-400" />
                      <span>{item.dueDate}</span>
                    </div>
                  </td>

                  {/* Badged Condition Indicators */}
                  <td className="py-4 px-6">
                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full tracking-wide uppercase ${
                      item.status === "Active" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      item.status === "Pending Review" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                      "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Context Row Operation Button */}
                  <td className="py-4 px-6 text-center">
                    <button className="text-gray-400 hover:text-gray-600 text-xs font-extrabold px-2 py-1 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100">
                      Manage
                    </button>
                  </td>

                </tr>
              ))}
              {filteredAssignments.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center font-bold text-gray-400 text-sm">
                    No assignment records match your current filter settings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- AI ASSISTANT FLOATING HUD MODAL ACTIVATOR --- */}
      <button
        onClick={() => setIsAiOpen(true)}
        className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-40 bg-[#4E36E2] hover:bg-[#3b25ca] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-base transition-all transform hover:scale-105 active:scale-95"
      >
        <Sparkles size={16} fill="currentColor" />
        <span>AI Assistant</span>
      </button>

      {/* =========================================================================
         --- CREATE ASSIGNMENT POPUP POPUP MODAL (Screenshot 2026-06-05 154712.png) ---
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col transform transition-all scale-100">
            
            {/* Modal Heading Control Bar Container */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="text-lg font-black text-[#1B2559]">Create Assignment</h3>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Publish tasks across chosen student groups</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full bg-gray-200/60 hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Form Input Interface Module */}
            <form onSubmit={handleCreateAssignment} className="p-6 space-y-4">
              
              {/* Field: Curriculum Title Text Input */}
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider block mb-2">Assignment Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g., Intro to Linear Equations Quiz"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Grid Section for selectors fields grouping layout row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Field Input Option dropdown selector */}
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider block mb-2">Target Group Class</label>
                  <div className="relative">
                    <select
                      value={newAssignment.classBadge}
                      onChange={(e) => setNewAssignment({ ...newAssignment, classBadge: e.target.value })}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    >
                      <option value="Class 10-A">Class 10-A</option>
                      <option value="Class 10-B">Class 10-B</option>
                      <option value="Class 10-C">Class 10-C</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Field Option Calendar Input */}
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider block mb-2">Due Date Deadline *</label>
                  <input 
                    type="date"
                    required
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

              </div>

              {/* Field Option Block Area Note Description text area area */}
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider block mb-2">Instructions & Description Notes</label>
                <textarea 
                  rows="3"
                  placeholder="Provide instructions, reading links, or expectations context details..."
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Form Action Controls Buttons cluster */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-extrabold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#4E36E2] hover:bg-[#3b25ca] shadow-xs rounded-xl transition-all active:scale-95"
                >
                  Publish Task
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
         --- SLIDEOVER SIDEBAR DRAWER: TELEMETRY AI CONSOLE OVERLAY PANEL ---
         ========================================================================= */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-amber-100 flex flex-col max-h-[85vh]">
            
            <div className="bg-[#4E36E2] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-md font-black tracking-tight">AI Assistant</h3>
                </div>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* CHIPS TAB NAVIGATION SEGMENT SELECTORS */}
            <div className="flex items-center border-b border-gray-100 bg-white px-4">
              <button onClick={() => setActiveAiTab("insights")} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeAiTab === "insights" ? "border-b-transparent text-[#4E36E2] border-b-[#4E36E2]" : "text-gray-400"}`}>
                <TrendingUp size={14} />
                <span>Insights</span>
              </button>
              <button onClick={() => setActiveAiTab("suggestions")} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeAiTab === "suggestions" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400"}`}>
                <Lightbulb size={14} />
                <span>Suggestions</span>
              </button>
              <button onClick={() => setActiveAiTab("alerts")} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeAiTab === "alerts" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400"}`}>
                <AlertTriangle size={14} />
                <span>Alerts</span>
              </button>
            </div>

            {/* TAB DISPLAY SHEETS SCREEN PORT */}
            <div className="p-5 overflow-y-auto space-y-3.5 bg-gray-50/50 flex-1">
              
              {activeAiTab === "insights" && (
                <>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 items-start">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-bold text-emerald-950 leading-snug">Average course submission rate on mathematics modules is outperforming last month profiles by 6.4%.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3 items-start">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-bold text-amber-950 leading-snug">Worksheets due on Monday display higher rates of extended submission times.</p>
                  </div>
                </>
              )}

              {activeAiTab === "suggestions" && (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex gap-3 items-start">
                  <Lightbulb size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-bold text-indigo-950 leading-snug">Spreading sub-tasks into sequential bi-weekly checks can maximize student retention performance indexes.</p>
                </div>
              )}

              {activeAiTab === "alerts" && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex gap-4 items-center">
                  <span className="text-xs font-black uppercase text-rose-500 bg-white px-2 py-1 rounded shadow-2xs tracking-wider shrink-0">Review</span>
                  <p className="text-sm font-bold text-rose-950 leading-snug">3 submissions on Geometry Proofs are pending manual grade evaluation tasks.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}