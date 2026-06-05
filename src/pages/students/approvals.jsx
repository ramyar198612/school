import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bell, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  UserCheck, 
  Building2, 
  Calendar, 
  XCircle,
  Check,
  X,
  SlidersHorizontal
} from 'lucide-react';

export default function Approvals() {
  // --- STATE MANAGEMENT: CORE REQUESTS DATABASE ---
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Sarah Connor',
      role: 'Teacher',
      type: 'Leave Request',
      description: 'Medical Leave request for 3 days',
      date: '2026-04-10',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'John Doe',
      role: 'Staff',
      type: 'Leave Request',
      description: 'Casual Leave request for 2 days',
      date: '2026-04-11',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Alex Mercer',
      role: 'Teacher',
      type: 'Leave Request',
      description: 'Duty Leave for Seminars',
      date: '2026-04-12',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Elena Gilbert',
      role: 'Staff',
      type: 'Leave Request',
      description: 'Personal Leave request',
      date: '2026-04-09',
      status: 'Approved'
    },
    {
      id: 5,
      name: 'Marcus Vance',
      role: 'Teacher',
      type: 'Leave Request',
      description: 'Sick Leave request extension',
      date: '2026-04-08',
      status: 'Rejected'
    }
  ]);

  // --- INTERACTION FILTERS AND LOOKUP SEARCH STATES ---
  const [activeFilterTab, setActiveFilterTab] = useState('all'); // 'all' or 'pending'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusDropdownFilter, setStatusDropdownFilter] = useState('All Status');

  // --- ACTION NOTIFICATION TIMEOUT ALERTS ---
  const [alert, setAlert] = useState(null);

  const triggerAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3500);
  };

  // --- DYNAMIC KPI METRICS EVALUATION SYSTEM ---
  const kpiStats = useMemo(() => {
    const approvedCount = requests.filter(r => r.status === 'Approved').length;
    const pendingCount = requests.filter(r => r.status === 'Pending').length;
    const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

    return {
      approved: approvedCount,
      pending: pendingCount,
      rejected: rejectedCount
    };
  }, [requests]);

  // --- HANDLERS: PROCESSING STATE APPROVALS/REJECTIONS ---
  const handleUpdateStatus = (id, targetStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: targetStatus };
      }
      return req;
    }));
    triggerAlert(`Request from worker has been successfully ${targetStatus}!`, targetStatus === 'Approved' ? 'success' : 'error');
  };

  // --- FILTER AND SEARCH ENGINE MATCH PROCESSING ---
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      // 1. Filter Tab logic ("All Request" vs "Pending")
      if (activeFilterTab === 'pending' && req.status !== 'Pending') return false;

      // 2. Dropdown Select Filter logic
      if (statusDropdownFilter !== 'All Status' && req.status !== statusDropdownFilter) return false;

      // 3. Text Query Matching Logic (Student/Teacher names, roles, description strings)
      const cleanQuery = searchQuery.toLowerCase().trim();
      if (cleanQuery) {
        return (
          req.name.toLowerCase().includes(cleanQuery) ||
          req.role.toLowerCase().includes(cleanQuery) ||
          req.description.toLowerCase().includes(cleanQuery)
        );
      }

      return true;
    });
  }, [requests, activeFilterTab, statusDropdownFilter, searchQuery]);

  return (
    <div className="w-full p-8 overflow-y-auto bg-[#F4F7FE] text-slate-800 font-sans min-h-screen relative">
      
      {/* Top Navigation Search/User Shell Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input 
            type="text" 
            placeholder="Search....../" 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white rounded-xl border border-gray-100 relative text-gray-600 hover:bg-gray-50">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white font-bold shadow-sm">R</div>
        </div>
      </header>

      {/* Primary Section Headers */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B2559]">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Configure school profile, permisson and integration</p>
      </section>

      {/* Action Notification Feed Feedback Bar */}
      {alert && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-bold transition-all duration-300 ${
          alert.type === 'success' ? 'bg-[#EBF7F2] text-[#34A853] border border-[#d3f2df]' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {alert.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          {alert.message}
        </div>
      )}

      {/* --- KPI SUMMARY BANNERS GRID SYSTEM --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-5xl">
        
        {/* Approved Stats Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border-l-[6px] border-[#10B981] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E6F4EA] text-[#10B981] rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#1B2559] block tracking-tight">{kpiStats.approved}</span>
              <span className="text-xs font-bold text-gray-400 block">Approve this week</span>
              <span className="text-[11px] font-bold text-[#10B981] mt-0.5 inline-flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12% vs last week
              </span>
            </div>
          </div>
        </div>

        {/* Pending Stats Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border-l-[6px] border-[#D97706] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFF3CD] text-[#D97706] rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#1B2559] block tracking-tight">{kpiStats.pending}</span>
              <span className="text-xs font-bold text-gray-400 block">Pending review</span>
              <span className="text-[11px] font-bold text-[#D97706] mt-0.5 block">3 new today</span>
            </div>
          </div>
        </div>

        {/* Rejected Stats Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border-l-[6px] border-[#EF4444] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FCE8E6] text-[#EF4444] rounded-2xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#1B2559] block tracking-tight">{kpiStats.rejected}</span>
              <span className="text-xs font-bold text-gray-400 block">Rejected this week</span>
              <span className="text-[11px] font-bold text-[#EF4444] mt-0.5 inline-flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> -5% vs last week
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* --- INTERACTION FILTER TABS AND SUBHEADER QUERY CONTROLS --- */}
      <div className="flex flex-col gap-4 mb-6">
        
        {/* Toggle Controls (All Request / Pending) */}
        <div className="flex gap-2 p-1.5 bg-[#E0E5F2]/60 w-max rounded-2xl text-sm font-bold text-[#1B2559]">
          <button 
            onClick={() => setActiveFilterTab('all')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${activeFilterTab === 'all' ? 'bg-white text-[#1B2559] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Building2 className="h-4 w-4" /> All Request
          </button>
          <button 
            onClick={() => setActiveFilterTab('pending')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${activeFilterTab === 'pending' ? 'bg-white text-[#1B2559] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Clock className="h-4 w-4" /> Pending
          </button>
        </div>

        {/* Dynamic Search Fields and Filter Configuration Menus */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Student or roll no......" 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold text-slate-700 placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <select 
              value={statusDropdownFilter}
              onChange={(e) => setStatusDropdownFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 pl-10 pr-10 py-2.5 rounded-xl text-xs font-bold text-[#1B2559] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
            >
              <option value="All Status">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>

      </div>

      {/* --- CONTENT DATALIST RECORD LAYOUT CONTAINER --- */}
      <div className="space-y-3 w-full max-w-5xl mt-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:border-gray-200 transition-all"
            >
              
              {/* Profile Block Elements */}
              <div className="flex items-center gap-4 min-w-[280px]">
                <div className="w-11 h-11 bg-[#F4F7FE] text-[#4318FF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1B2559] tracking-tight">
                    {item.name} <span className="text-gray-300 font-normal mx-1">•</span> <span className="text-xs font-bold text-gray-400">{item.role}</span>
                  </h4>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">{item.description}</p>
                </div>
              </div>

              {/* Central Metadata Categories */}
              <div className="flex flex-wrap items-center gap-6 md:gap-12">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B2559]">
                  <UserCheck className="w-4 h-4 text-gray-400" />
                  <span>{item.type}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Status Badge Indicators & Interactive Command Controllers */}
              <div className="flex items-center gap-3 justify-end min-w-[210px]">
                
                {/* Dynamically Styled Context Badge */}
                <span className={`px-4 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                  item.status === 'Pending' ? 'bg-[#FFF3CD] text-[#D97706]' :
                  item.status === 'Approved' ? 'bg-[#EBF7F2] text-[#34A853]' : 'bg-red-50 text-red-600'
                }`}>
                  {item.status}
                </span>

                {/* Conditional Operations Layout Configuration */}
                {item.status === 'Pending' && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleUpdateStatus(item.id, 'Approved')}
                      className="inline-flex items-center gap-1 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs px-4 py-1.5 rounded-xl transition-all shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(item.id, 'Rejected')}
                      className="inline-flex items-center gap-1 bg-white hover:bg-red-50 text-red-500 font-bold text-xs px-4 py-1.5 border border-red-200 rounded-xl transition-all shadow-sm"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                )}

              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
            <p className="text-sm font-bold text-gray-400">No requests match your current search options.</p>
          </div>
        )}
      </div>

    </div>
  );
}