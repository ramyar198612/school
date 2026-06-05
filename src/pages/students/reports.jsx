import React, { useState, useRef } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  Download, 
  Upload,
  Search, 
  Bell,
  BookOpen,
  DollarSign,
  Users,
  TrendingDown,
  Info,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('academic');
  const fileInputRef = useRef(null);

  // --- HOVER TRACKERS FOR INTERACTIVE CHARTS ---
  const [hoveredSubjectIndex, setHoveredSubjectIndex] = useState(null);
  const [hoveredFinancialMonth, setHoveredFinancialMonth] = useState(null);
  const [hoveredAttendanceMonth, setHoveredAttendanceMonth] = useState(null);
  const [hoveredClassIndex, setHoveredClassIndex] = useState(null);
  const [hoveredWeekDayIndex, setHoveredWeekDayIndex] = useState(null);

  // --- ACADEMIC STATE ---
  const [dashboardStats, setDashboardStats] = useState({
    overallAverage: "81.2%",
    overallAverageTrend: "2.3% increased vs last term",
    passRate: "92.6%",
    passRateTrend: "1.8% increased vs last term",
    topScoreName: "Olivia W.",
    topScoreAvg: "Avg 96.4%",
    riskStudentsCount: "14",
    riskStudentsTrend: "Below 60% avg"
  });

  const [subjectData, setSubjectData] = useState([
    { name: 'Maths', avg: 78, max: 100 },
    { name: 'English', avg: 72, max: 100 },
    { name: 'History', avg: 65, max: 100 },
    { name: 'Arts', avg: 88, max: 100 },
    { name: 'PE', py: 92, avg: 92, max: 100 },
    { name: 'Science', avg: 82, max: 100 },
  ]);

  const [gradeData, setGradeData] = useState([
    { grade: 'Grade 3', pass: 95, fail: 5 },
    { grade: 'Grade 4', pass: 91, fail: 9 },
    { grade: 'Grade 5', pass: 94, fail: 6 },
    { grade: 'Grade 6', pass: 89, fail: 11 },
    { grade: 'Grade 7', pass: 87, fail: 13 },
    { grade: 'Grade 8', pass: 93, fail: 7 },
  ]);

  // --- FINANCIAL STATE ---
  const [financialStats, setFinancialStats] = useState({
    totalCollected: "$525k",
    totalCollectedTrend: "8.2% vs last year",
    pendingDues: "$48k",
    pendingDuesCount: "24 students",
    overdueAmount: "$25k",
    overdueCount: "12 Overdue"
  });

  const [monthlyCollectionData, setMonthlyCollectionData] = useState([
    { month: 'Jan', amount: 40 },
    { month: 'Feb', amount: 67 },
    { month: 'Mar', amount: 60 },
    { month: 'Apr', amount: 45 },
    { month: 'May', amount: 89 },
    { month: 'Jun', amount: 48 },
    { month: 'July', amount: 64 },
    { month: 'Aug', amount: 58 },
    { month: 'Sep', amount: 86 },
    { month: 'Oct', amount: 67 },
    { month: 'Nov', amount: 67 },
    { month: 'Dec', amount: 79 },
  ]);

  const feeCategoryData = [
    { name: 'Tuition', percentage: 68, color: '#8A94EF' },
    { name: 'Transport', percentage: 14, color: '#FFA3A3' },
    { name: 'Activity', percentage: 8, color: '#4EC1E2' },
    { name: 'Library', percentage: 6, color: '#FFB54A' },
    { name: 'Other', percentage: 4, color: '#4A76FF' }
  ];

  // --- ATTENDANCE STATE (Derived from Screenshots) ---
  const [attendanceStats, setAttendanceStats] = useState({
    overallAttendance: "91.2%",
    overallAttendanceTrend: "1.5% vs last month",
    presentRate: "75%",
    presentRateSubtext: "Avg across all classes",
    absentRate: "12%",
    absentRateTrend: "0.8% vs last month",
    lateArrivals: "8%",
    lateArrivalsSubtext: "Flagged this term"
  });

  const [monthlyStudentVsStaffData, setMonthlyStudentVsStaffData] = useState([
    { month: 'Aug', students: 88, staff: 85 },
    { month: 'Sep', students: 84, staff: 81 },
    { month: 'Oct', students: 89, staff: 87 },
    { month: 'Nov', students: 81, staff: 79 },
    { month: 'Dec', students: 76, staff: 73 },
    { month: 'Jan', students: 90, staff: 88 },
    { month: 'Feb', students: 86, staff: 83 },
    { month: 'Mar', students: 88, staff: 85 },
    { month: 'Apr', students: 85, staff: 82 },
  ]);

  const [attendanceRateByClass, setAttendanceRateByClass] = useState([
    { className: 'Grade 3', rate: 92 },
    { className: 'Grade 4', rate: 86 },
    { className: 'Grade 5', rate: 90 },
    { className: 'Grade 6', rate: 88 },
    { className: 'Grade 7', rate: 82 },
    { className: 'Grade 8', rate: 93 },
  ]);

  const [weeklyDistributionData, setWeeklyDistributionData] = useState([
    { day: 'Mon', active: 52, maximum: 90 },
    { day: 'Tue', active: 55, maximum: 88 },
    { day: 'Wed', active: 78, maximum: 92 },
    { day: 'Thu', active: 62, maximum: 85 },
    { day: 'Fri', active: 70, maximum: 89 },
    { day: 'Sat', active: 68, maximum: 91 },
    { day: 'Sun', active: 75, maximum: 87 },
  ]);

  const attendanceCategoryData = [
    { name: 'Present', color: '#8A94EF' },
    { name: 'Absent', color: '#FFA3A3' },
    { name: 'Late', color: '#4EC1E2' },
    { name: 'Excuse', color: '#FFB54A' }
  ];

  // --- IMPORT/EXPORT HANDLERS ---
  const handleExportExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === 'academic') {
      csvContent += "REPORT SUMMARY (ACADEMIC)\n";
      csvContent += `Overall Average,${dashboardStats.overallAverage}\n`;
      subjectData.forEach(row => { csvContent += `${row.name},${row.avg}%\n`; });
    } else if (activeTab === 'financial') {
      csvContent += "REPORT SUMMARY (FINANCIAL)\n";
      csvContent += `Total Collected,${financialStats.totalCollected}\n`;
      monthlyCollectionData.forEach(row => { csvContent += `${row.month},${row.amount}k\n`; });
    } else {
      csvContent += "REPORT SUMMARY (ATTENDANCE)\n";
      csvContent += `Overall Attendance,${attendanceStats.overallAttendance}\n`;
      attendanceRateByClass.forEach(row => { csvContent += `${row.className},${row.rate}%\n`; });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      alert("Spreadsheet data successfully mapped to " + activeTab + " datasets!");
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full p-8 overflow-y-auto bg-[#F4F7FE] text-slate-800 font-sans min-h-screen">
      <input type="file" ref={fileInputRef} onChange={handleImportExcel} accept=".csv" className="hidden" />

      {/* Top Header Row */}
      <header className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input 
            type="text" 
            placeholder="Search......" 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white rounded-xl border border-gray-200 relative text-gray-600 hover:bg-gray-50">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white font-bold">R</div>
        </div>
      </header>

      {/* Page Title Row */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2559]">Report & Analysis</h1>
          <p className="text-sm text-gray-500 mt-0.5">Comprehensive school performance insights and tools</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 shadow-sm font-medium text-sm hover:bg-gray-50 transition-all active:scale-95"
          >
            <Upload className="h-4 w-4 text-gray-500" /> Import Excel
          </button>
          <button 
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 shadow-sm font-medium text-sm hover:bg-gray-50 transition-all active:scale-95"
          >
            <Download className="h-4 w-4 text-gray-500" /> Export Excel
          </button>
        </div>
      </section>

      {/* Tabs Filter Row */}
      <div className="flex gap-2 p-1 bg-[#E0E5F2] w-max rounded-xl mb-8 text-sm font-semibold">
        <button 
          onClick={() => setActiveTab('academic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'academic' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <BookOpen className="h-4 w-4" /> Academic Reports
        </button>
        <button 
          onClick={() => setActiveTab('financial')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'financial' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <DollarSign className="h-4 w-4" /> Financial Reports
        </button>
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'attendance' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <Users className="h-4 w-4" /> Attendance Analysis
        </button>
      </div>

      {/* --- PANEL INTERFACE GENERATION --- */}
      {activeTab === 'academic' ? (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-600 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><TrendingUp className="h-6 w-6" /></div>
              <div>
                <div className="text-2xl font-bold text-[#1B2559]">{dashboardStats.overallAverage}</div>
                <div className="text-xs font-semibold text-gray-400">Overall Average</div>
                <div className="text-[11px] text-green-500 font-medium mt-0.5">{dashboardStats.overallAverageTrend}</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-indigo-600 flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><BarChart3 className="h-6 w-6" /></div>
              <div>
                <div className="text-2xl font-bold text-[#1B2559]">{dashboardStats.passRate}</div>
                <div className="text-xs font-semibold text-gray-400">Pass Rate</div>
                <div className="text-[11px] text-green-500 font-medium mt-0.5">{dashboardStats.passRateTrend}</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-purple-600 flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Award className="h-6 w-6" /></div>
              <div>
                <div className="text-2xl font-bold text-[#1B2559]">{dashboardStats.topScoreName}</div>
                <div className="text-xs font-semibold text-gray-400">Top Score</div>
                <div className="text-[11px] text-gray-500 font-medium mt-0.5">{dashboardStats.topScoreAvg}</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-red-500 flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl"><AlertTriangle className="h-6 w-6" /></div>
              <div>
                <div className="text-2xl font-bold text-[#1B2559]">{dashboardStats.riskStudentsCount}</div>
                <div className="text-xs font-semibold text-gray-400">Risk students</div>
                <div className="text-[11px] text-red-400 font-medium mt-0.5">{dashboardStats.riskStudentsTrend}</div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-[#1B2559] mb-8">Subject Wise Average performance</h3>
              <div className="relative h-[260px] w-full flex items-end justify-between gap-2 px-2 border-b border-gray-200 pb-2">
                <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none text-[10px] text-gray-400">
                  {['100', '80', '60', '40', '20'].map(val => (
                    <div key={val} className="w-full border-t border-dashed border-gray-100 pt-1">{val}</div>
                  ))}
                  <div></div>
                </div>
                {subjectData.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex-1 h-full flex flex-col justify-end items-center group relative z-10 cursor-pointer"
                    onMouseEnter={() => setHoveredSubjectIndex(index)}
                    onMouseLeave={() => setHoveredSubjectIndex(null)}
                  >
                    {hoveredSubjectIndex === index && (
                      <div className="absolute bottom-[90%] mb-2 bg-white border border-gray-200 px-3 py-2 rounded-xl shadow-lg text-center z-30 pointer-events-none min-w-[110px]">
                        <div className="text-xs font-semibold text-gray-800">{item.name}</div>
                        <div className="text-xs font-bold text-gray-900">Average: {item.avg}%</div>
                        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-200 rotate-45"></div>
                      </div>
                    )}
                    <div className={`w-full max-w-[36px] rounded-t-xl transition-all duration-300 ${hoveredSubjectIndex === index ? 'bg-[#6C79E8]' : 'bg-[#8A94EF]'}`} style={{ height: `${item.avg}%` }}></div>
                    <span className="text-xs text-gray-500 mt-2 font-medium absolute -bottom-7">{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-2 mt-10 text-xs font-semibold text-gray-600">
                <span className="w-3 h-3 bg-[#8A94EF] rounded-sm"></span> Avg
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-[#1B2559] mb-8">Pass/Fail rate by grade</h3>
              <div className="relative h-[260px] w-full flex items-end justify-between gap-2 px-2 border-b border-gray-200 pb-2">
                <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none text-[10px] text-gray-400">
                  {['100', '80', '60', '40', '20'].map(val => (
                    <div key={val} className="w-full border-t border-dashed border-gray-200 pt-1">{val}</div>
                  ))}
                  <div></div>
                </div>
                {gradeData.map((item, index) => (
                  <div key={index} className="flex-1 h-full flex flex-col justify-end items-center group relative z-10">
                    <div className="w-full max-w-[36px] flex flex-col justify-end h-full">
                      <div className="bg-[#FFA3A3] w-full rounded-t-xl" style={{ height: `${item.fail}%` }}></div>
                      <div className="bg-[#8A94EF] w-full rounded-b-xl border-t-2 border-white" style={{ height: `${item.pass}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 font-medium whitespace-nowrap absolute -bottom-7">{item.grade}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-6 mt-10 text-xs font-semibold text-gray-600">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#8A94EF] rounded-sm"></span> Pass</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FFA3A3] rounded-sm"></span> Fail</div>
              </div>
            </div>
          </section>
        </>
      ) : activeTab === 'financial' ? (
        <>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-[#05CD99] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#E6F9F4] text-[#05CD99] rounded-xl font-bold text-lg w-12 h-12 flex items-center justify-center">$</div>
                <div>
                  <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight">{financialStats.totalCollected}</div>
                  <div className="text-xs font-bold text-gray-400 mt-0.5">Total Collected</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#05CD99] bg-[#E6F9F4] px-2 py-1 rounded-md">{financialStats.totalCollectedTrend}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-[#EEB902] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFF9E6] text-[#EEB902] rounded-xl w-12 h-12 flex items-center justify-center"><Info className="h-6 w-6" /></div>
                <div>
                  <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight">{financialStats.pendingDues}</div>
                  <div className="text-xs font-bold text-gray-400 mt-0.5">Pending dues</div>
                </div>
              </div>
              <div className="text-right text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{financialStats.pendingDuesCount}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-[#EE5D50] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FEEFEE] text-[#EE5D50] rounded-xl w-12 h-12 flex items-center justify-center"><TrendingDown className="h-6 w-6" /></div>
                <div>
                  <div className="text-3xl font-extrabold text-[#1B2559] tracking-tight">{financialStats.overdueAmount}</div>
                  <div className="text-xs font-bold text-gray-400 mt-0.5">Overdue Amounts</div>
                </div>
              </div>
              <div className="text-right text-xs font-bold text-[#EE5D50] bg-[#FEEFEE] px-2 py-1 rounded-md">{financialStats.overdueCount}</div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
              <h3 className="text-xl font-extrabold text-[#1B2559] mb-8">Monthly collection Fee 2026</h3>
              <div className="relative h-[260px] w-full flex items-end justify-between gap-1.5 px-6 border-b border-gray-200 pb-2">
                <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none text-xs text-gray-400 px-1">
                  {['100', '80', '60', '40', '20', '0'].map((val, i) => (
                    <div key={i} className="w-full flex items-center gap-2">
                      <span className="w-6 text-right pr-1">{val}</span>
                      {val !== '0' && <div className="flex-1 border-t border-dashed border-gray-200"></div>}
                    </div>
                  ))}
                </div>
                {monthlyCollectionData.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex-1 h-full flex flex-col justify-end items-center group relative z-10 pl-6 cursor-pointer"
                    onMouseEnter={() => setHoveredFinancialMonth(index)}
                    onMouseLeave={() => setHoveredFinancialMonth(null)}
                  >
                    {hoveredFinancialMonth === index && (
                      <div className="absolute bottom-[90%] mb-2 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-lg text-center z-30 pointer-events-none min-w-[90px]">
                        <div className="text-xs font-bold text-gray-800">{item.month}</div>
                        <div className="text-xs font-extrabold text-blue-600">${item.amount}k</div>
                        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-200 rotate-45"></div>
                      </div>
                    )}
                    <div className={`w-full max-w-[28px] rounded-t-xl transition-all duration-300 ${hoveredFinancialMonth === index ? 'bg-[#7581E6]' : 'bg-[#8A94EF]'}`} style={{ height: `${item.amount}%` }}></div>
                    <span className="text-xs text-gray-400 mt-2 font-bold absolute -bottom-6">{item.month}</span>
                  </div>
                ))}
              </div>
              <div className="h-4"></div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-[#1B2559] mb-6">Fee by Category</h3>
                <div className="flex justify-center items-center my-6 relative">
                  <div className="w-44 h-44 rounded-full shadow-inner relative flex items-center justify-center" style={{
                    background: 'conic-gradient(#8A94EF 0% 68%, #FFA3A3 68% 82%, #4EC1E2 82% 90%, #FFB54A 90% 96%, #4A76FF 96% 100%)'
                  }}>
                    <div className="w-[68%] h-[68%] bg-white rounded-full flex flex-col justify-center items-center shadow-sm">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tuition</span>
                      <span className="text-xl font-black text-[#1B2559]">68%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 px-2">
                {feeCategoryData.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between text-sm font-bold text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      <span className="text-gray-500 font-semibold">{cat.name}</span>
                    </div>
                    <span className="text-[#1B2559]">{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* =========================================================================
              --- ATTENDANCE ANALYSIS VIEW PANELS (Screenshot 2026-06-05 065240.png) ---
              ========================================================================= */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Overall Attendance */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-600 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold text-[#1B2559]">{attendanceStats.overallAttendance}</div>
                  <div className="text-xs font-bold text-gray-400">Overall Attendance</div>
                  <div className="text-[11px] text-green-500 font-medium mt-0.5">{attendanceStats.overallAttendanceTrend}</div>
                </div>
              </div>
            </div>

            {/* Present Rate */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-indigo-600 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><CheckCircle2 className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold text-[#1B2559]">{attendanceStats.presentRate}</div>
                  <div className="text-xs font-bold text-gray-400">Present Rate</div>
                  <div className="text-[11px] text-gray-400 font-medium mt-0.5">{attendanceStats.presentRateSubtext}</div>
                </div>
              </div>
            </div>

            {/* Absent Rate */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-xl"><AlertCircle className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold text-[#1B2559]">{attendanceStats.absentRate}</div>
                  <div className="text-xs font-bold text-gray-400">Absent Rate</div>
                  <div className="text-[11px] text-red-400 font-medium mt-0.5">{attendanceStats.absentRateTrend}</div>
                </div>
              </div>
            </div>

            {/* Late Arrivals */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-800 rounded-xl"><Clock className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold text-[#1B2559]">{attendanceStats.lateArrivals}</div>
                  <div className="text-xs font-bold text-gray-400">Late Arrivals</div>
                  <div className="text-[11px] text-gray-400 font-medium mt-0.5">{attendanceStats.lateArrivalsSubtext}</div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================================================
              --- MONTHLY TREND AREA CHART & ATTENDANCE BREAKDOWN CHARTS (Screenshot 2026-06-05 065336.png) ---
              ========================================================================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Student vs Staff Spline/Area Area Chart Context */}
            <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
              <h3 className="text-xl font-bold text-[#1B2559] mb-6">Monthly Attendance Students vs Staff</h3>
              
              <div className="relative h-[250px] w-full border-b border-gray-200 pb-2 px-4 flex items-end justify-between">
                {/* Horizontal grid layout guides */}
                <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none text-[11px] text-gray-400">
                  {['100', '80', '60', '40', '20', '0'].map((val, i) => (
                    <div key={i} className="w-full flex items-center gap-2">
                      <span className="w-6 text-right">{val}</span>
                      {val !== '0' && <div className="flex-1 border-t border-dashed border-gray-100"></div>}
                    </div>
                  ))}
                </div>

                {/* SVG Spline/Trend Fill Simulation Layers */}
                <div className="absolute inset-0 left-8 right-4 top-4 bottom-8 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 900 200" preserveAspectRatio="none">
                    {/* Students Gradient & Area Spline */}
                    <defs>
                      <linearGradient id="studentGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8A94EF" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8A94EF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M 50,40 Q 150,55 250,35 T 450,75 T 650,25 T 850,45 L 850,200 L 50,200 Z" fill="url(#studentGrad)" />
                    <path d="M 50,40 Q 150,55 250,35 T 450,75 T 650,25 T 850,45" fill="none" stroke="#8A94EF" strokeWidth="3" />
                    
                    {/* Staff Trend Spline */}
                    <path d="M 50,50 Q 150,65 250,45 T 450,85 T 650,35 T 850,55" fill="none" stroke="#FFA3A3" strokeWidth="2.5" strokeDasharray="1" />
                  </svg>
                </div>

                {/* Dynamic Mouse Tracker Points */}
                {monthlyStudentVsStaffData.map((item, index) => (
                  <div 
                    key={index}
                    className="flex-1 h-full flex flex-col justify-end items-center group relative z-10 cursor-pointer"
                    onMouseEnter={() => setHoveredAttendanceMonth(index)}
                    onMouseLeave={() => setHoveredAttendanceMonth(null)}
                  >
                    {hoveredAttendanceMonth === index && (
                      <div className="absolute top-4 bg-white border border-gray-200 p-2.5 rounded-xl shadow-xl text-left z-30 min-w-[120px]">
                        <div className="text-xs font-bold text-gray-800 mb-1">{item.month} Performance</div>
                        <div className="text-[11px] text-[#8A94EF] font-bold">Students: {item.students}%</div>
                        <div className="text-[11px] text-[#FFA3A3] font-bold">Staff: {item.staff}%</div>
                      </div>
                    )}
                    
                    {/* Dynamic node indicators alignable to line peak estimation */}
                    <div className="absolute w-2 h-2 rounded-full border-2 border-white bg-[#8A94EF] shadow-sm transition-transform group-hover:scale-150" style={{ bottom: `${item.students}%` }}></div>
                    <div className="absolute w-2 h-2 rounded-full border-2 border-white bg-[#FFA3A3] shadow-sm transition-transform group-hover:scale-150" style={{ bottom: `${item.staff}%` }}></div>

                    <span className="text-xs text-gray-400 font-bold mt-2 absolute -bottom-6">{item.month}</span>
                  </div>
                ))}
              </div>

              {/* Chart Meta Legends */}
              <div className="flex justify-center items-center gap-6 mt-10 text-xs font-bold text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-[#8A94EF] bg-white"></span> Students
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-[#FFA3A3] bg-white"></span> Staff
                </div>
              </div>
            </div>

            {/* Attendance Breakdown Donut Ring Structure */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1B2559] mb-4">Attendance breakdown</h3>
                <div className="flex justify-center items-center my-6 relative">
                  {/* Conic Gradient ring mimicking nested 3D metric fields */}
                  <div className="w-44 h-44 rounded-full relative flex items-center justify-center bg-gray-50" style={{
                    background: 'conic-gradient(#8A94EF 0% 75%, #FFA3A3 75% 87%, #4EC1E2 87% 95%, #FFB54A 95% 100%)'
                  }}>
                    <div className="w-[74%] h-[74%] bg-white rounded-full flex flex-col justify-center items-center shadow-md">
                      <span className="text-3xl font-black text-[#1B2559]">100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                {attendanceCategoryData.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <span>{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===============================================================================================================
              --- ATTENDANCE RATE BY CLASS & WEEKLY ATTENDANCE PEAKS (Screenshot 2026-06-05 065414.png / 065431.png) ---
              =============================================================================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Attendance Rate By Class Bar Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-[#1B2559] mb-8">Attendance Rate by class</h3>
              
              <div className="relative h-[250px] w-full flex items-end justify-between gap-2 px-2 border-b border-gray-200 pb-2">
                <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none text-[10px] text-gray-400">
                  {['100', '80', '60', '40', '20', '0'].map((val, idx) => (
                    <div key={idx} className="w-full border-t border-dashed border-gray-100 pt-1">{val}</div>
                  ))}
                </div>

                {attendanceRateByClass.map((item, index) => (
                  <div 
                    key={index}
                    className="flex-1 h-full flex flex-col justify-end items-center group relative z-10 cursor-pointer"
                    onMouseEnter={() => setHoveredClassIndex(index)}
                    onMouseLeave={() => setHoveredClassIndex(null)}
                  >
                    {/* Updated dynamic tooltip matching exact: Attendance: value structure requested */}
                    {hoveredClassIndex === index && (
                      <div className="absolute bottom-[90%] mb-2 bg-[#1B2559] text-white px-3 py-1.5 rounded-xl shadow-xl text-center z-30 min-w-[110px]">
                        <div className="text-xs font-semibold text-gray-200">{item.className}</div>
                        <div className="text-xs font-bold">Attendance: {item.rate}%</div>
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1B2559] rotate-45"></div>
                      </div>
                    )}
                    
                    {/* High Fidelity Bar Container */}
                    <div className="w-full max-w-[34px] bg-[#B4BDFF] rounded-t-lg relative overflow-hidden h-full flex flex-col justify-end">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-500 ${hoveredClassIndex === index ? 'bg-[#707DEB]' : 'bg-[#8A94EF]'}`}
                        style={{ height: `${item.rate}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 font-bold mt-2 absolute -bottom-7 whitespace-nowrap">{item.className}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 mt-10 text-xs font-bold text-gray-500">
                <span className="w-3 h-3 bg-[#8A94EF] rounded-sm"></span> Attendance
              </div>
            </div>

            {/* Weekly Attendance Distribution (Triangular Pyramid Shape Shaders) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-[#1B2559] mb-8">Weekly Attendance distribution</h3>
              
              <div className="relative h-[250px] w-full flex items-end justify-between gap-1 px-4 border-b border-gray-200 pb-2">
                <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none text-[10px] text-gray-400">
                  {['100', '80', '60', '40', '20', '0'].map((val, idx) => (
                    <div key={idx} className="w-full border-t border-dashed border-gray-100 pt-1">{val}</div>
                  ))}
                </div>

                {/* Custom Vector Shape Distribution Framework */}
                {weeklyDistributionData.map((item, index) => (
                  <div 
                    key={index}
                    className="flex-1 h-full flex flex-col justify-end items-center group relative z-10 cursor-pointer"
                    onMouseEnter={() => setHoveredWeekDayIndex(index)}
                    onMouseLeave={() => setHoveredWeekDayIndex(null)}
                  >
                    {/* Updated dynamic tooltip matching exact: Present: value structure requested */}
                    {hoveredWeekDayIndex === index && (
                      <div className="absolute bottom-[90%] mb-2 bg-[#1B2559] text-white px-3 py-1.5 rounded-xl shadow-xl text-center z-30 min-w-[95px]">
                        <div className="text-xs font-semibold text-gray-200">{item.day}</div>
                        <div className="text-xs font-bold">Present: {item.active}%</div>
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1B2559] rotate-45"></div>
                      </div>
                    )}
                    
                    {/* Triangular distribution vector geometry mask simulated via absolute clips */}
                    <div className="w-full max-w-[50px] h-full relative flex items-end justify-center">
                      {/* Peak Triangle Background Track */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 100" preserveAspectRatio="none">
                        <polygon points="25,10 50,100 0,100" fill="#E6F0FF" opacity="0.6" />
                        <polygon points="25,25 50,100 0,100" fill="#8A94EF" opacity={hoveredWeekDayIndex === index ? "0.95" : "0.7"} />
                      </svg>
                    </div>

                    <span className="text-xs text-gray-400 font-bold mt-2 absolute -bottom-7">{item.day}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 mt-10 text-xs font-bold text-gray-500">
                <span className="w-3 h-3 bg-[#8A94EF] rounded-sm"></span> Present
              </div>
            </div>

          </section>
        </>
      )}
    </div>
  );
}