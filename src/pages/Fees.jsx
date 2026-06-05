// src/pages/Fees.jsx
import { useState, useMemo } from "react";
import { 
  FaUpload, 
  FaSearch, 
  FaPlus, 
  FaRegEdit, 
  FaRegTrashAlt, 
  FaCheckCircle, 
  FaRegTimesCircle,
  FaTimes,
  FaBell
} from "react-icons/fa";

export default function Fees() {
  // Navigation & Filtering States
  const [activeSubTab, setActiveSubTab] = useState("pending"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Configuration States
  const [newFeeName, setNewFeeName] = useState("");
  const [newFeeGrade, setNewFeeGrade] = useState("Grade 3-5");
  const [newFeeAmount, setNewFeeAmount] = useState("");
  const [newFeeType, setNewFeeType] = useState("Annual");

  // --- DATASETS ---
  const [feeCategories, setFeeCategories] = useState([
    { id: 1, name: "Tution Fee", grade: "Grade 3-5", amount: 5200, period: "Annual" },
    { id: 2, name: "Activity Fee", grade: "Grade 3-8", amount: 800, period: "Annual" },
    { id: 3, name: "Transport Fee", grade: "Grade 3-8", amount: 1200, period: "Annual" },
    { id: 4, name: "Library Fee", grade: "Grade 3-8", amount: 400, period: "Annual" },
    { id: 5, name: "Lab Fee", grade: "Grade 6-8", amount: 600, period: "Annual" },
    { id: 6, name: "Sports Fee", grade: "Grade 3-8", amount: 350, period: "Quarterly" }
  ]);

  const [paymentsData] = useState([
    { id: "STD-10231", name: "Liam smith", gradeSection: "Grade 5 - A", feeType: "Tuition", receipt: "REC-8821", amount: 2500, date: "15 Oct 2024", status: "Paid", method: "Online", month: "October", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { id: "STD-10245", name: "John Smith", gradeSection: "Grade 6- B", feeType: "Transport", receipt: "-", amount: 450, date: "-", status: "Pending", method: "-", month: "February", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { id: "STD-10262", name: "Ethan jones", gradeSection: "Grade 6 - A", feeType: "Tuition", receipt: "-", amount: 2200, date: "-", status: "Overdue", method: "-", month: "January", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
    { id: "STD-10262", name: "Ava davis", gradeSection: "Grade 8 - A", feeType: "Activity", receipt: "REC-8841", amount: 2200, date: "07 Oct 2024", status: "Paid", method: "Bank transfer", month: "October", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
    { id: "STD-10262", name: "Mason Garcia", gradeSection: "Grade 8 - A", feeType: "Tuition", receipt: "REC-8841", amount: 2200, date: "07 Oct 2024", status: "Paid", method: "Online", month: "October", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
    { id: "STD-10262", name: "Emily brown", gradeSection: "Grade 8 - A", feeType: "Library", receipt: "-", amount: 2200, date: "07 Oct 2024", status: "Paid", method: "Cash", month: "October", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
    { id: "STD-10274", name: "Omar Hassan", gradeSection: "Grade 12 - B", feeType: "Lab Fee", receipt: "REC-8844", amount: 3200, date: "-", status: "Pending", method: "-", month: "February", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" }
  ]);

  const [pendingDuesData] = useState([
    { id: "STD-10245", name: "John Smith", gradeSection: "Grade 6- B", feeType: "Transport", dueAmount: 6200, daysOverdue: "-", dueDate: "2026-04-15", status: "Pending", month: "April", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { id: "STD-10258", name: "Michael Chang", gradeSection: "Grade 4 - C", feeType: "Exam", dueAmount: 5400, daysOverdue: "44D", dueDate: "2026-03-15", status: "Overdue", month: "March", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150" },
    { id: "STD-10262", name: "Ethan jones", gradeSection: "Grade 6 - A", feeType: "Tuition", dueAmount: 5800, daysOverdue: "38D", dueDate: "2026-03-15", status: "Overdue", month: "March", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
    { id: "STD-10274", name: "Omar Hassan", gradeSection: "Grade 12 - B", feeType: "Lab Fee", dueAmount: 1200, daysOverdue: "$320", dueDate: "2026-04-20", status: "Pending", month: "April", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" }
  ]);

  const totalCollected = "$25,200";
  const totalPendingPartial = "$11,800";
  const totalOverdue = "$6,6000";

  // --- FILTERING PIPELINES ---
  const filteredPayments = useMemo(() => {
    return paymentsData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.includes(searchQuery);
      const matchesMonth = selectedMonth === "All" || item.month === selectedMonth;
      return matchesSearch && matchesMonth;
    });
  }, [paymentsData, searchQuery, selectedMonth]);

  const filteredPendingDues = useMemo(() => {
    return pendingDuesData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.includes(searchQuery);
      const matchesMonth = selectedMonth === "All" || item.month === selectedMonth;
      return matchesSearch && matchesMonth;
    });
  }, [pendingDuesData, searchQuery, selectedMonth]);

  // --- DYNAMIC TARGETED EXCEL EXPORTER PIPELINE ---
  const runExportToExcelPipeline = () => {
    let headingsRowHeader = "";
    let dataBuffer = "";
    let filename = "";

    if (activeSubTab === "payments") {
      headingsRowHeader = "Student Name\tStudent ID\tGrade & Section\tFee Type\tReceipt No.\tAmount\tPaid Date\tStatus\tMethod\n";
      filteredPayments.forEach(row => {
        dataBuffer += `${row.name}\t${row.id}\t${row.gradeSection}\t${row.feeType}\t${row.receipt}\t$${row.amount}\t${row.date}\t${row.status}\t${row.method}\n`;
      });
      filename = "Payment_Records_Report";
    } 
    else if (activeSubTab === "pending") {
      headingsRowHeader = "Student Name\tStudent ID\tGrade & Section\tFee Type\tDue Amount\tDays Overdue\tDue Date\tStatus\n";
      filteredPendingDues.forEach(row => {
        dataBuffer += `${row.name}\t${row.id}\t${row.gradeSection}\t${row.feeType}\t$${row.dueAmount}\t${row.daysOverdue}\t${row.dueDate}\t${row.status}\n`;
      });
      filename = "Pending_Dues_Report";
    } 
    else if (activeSubTab === "structure") {
      headingsRowHeader = "Fee Category Name\tTarget Grades\tAmount\tBilling Term Schedule\n";
      feeCategories.forEach(row => {
        dataBuffer += `${row.name}\t${row.grade}\t$${row.amount}\t${row.period}\n`;
      });
      filename = "Fee_Structure_Config";
    }

    // Creating secure download blob
    const fileBlob = new Blob([headingsRowHeader + dataBuffer], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = URL.createObjectURL(fileBlob);
    downloadAnchor.setAttribute("download", `${filename}_${selectedMonth}.xls`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const handleSendReminder = (studentName, id) => {
    alert(`Reminder notification successfully broadcasted to ${studentName} (${id}).`);
  };

  const handleCreateCategorySubmit = (e) => {
    e.preventDefault();
    if (!newFeeName || !newFeeAmount) return;
    setFeeCategories([...feeCategories, {
      id: Date.now(),
      name: newFeeName,
      grade: newFeeGrade,
      amount: parseFloat(newFeeAmount),
      period: newFeeType
    }]);
    setNewFeeName("");
    setNewFeeAmount("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-[#F4F9F9] xl:my-3 xl:mr-3 xl:rounded-[32px] p-8 shadow-inner overflow-y-auto flex flex-col space-y-6 relative">
      
      {/* Top Header Component Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Fee Management</h1>
          <p className="text-gray-400 font-medium mt-1">Track fees structure, payments and pending.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={runExportToExcelPipeline}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm px-5 py-2.5 rounded-2xl shadow-sm flex items-center gap-2 transition cursor-pointer"
          >
            <FaUpload className="text-gray-400 text-xs" /> Export Excel
          </button>
          {activeSubTab === "structure" && (
            <button onClick={() => setIsModalOpen(true)} className="bg-[#3B44F6] hover:bg-blue-700 text-white font-extrabold text-sm px-5 py-2.5 rounded-2xl transition shadow-sm flex items-center gap-2 cursor-pointer">
              <FaPlus className="text-xs" /> Add Category
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] border-l-[6px] border-l-[#10B981]">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center text-lg"><FaCheckCircle /></div>
          <div>
            <div className="text-2xl font-black text-gray-950">{totalCollected}</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Total collected</div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] border-l-[6px] border-l-[#F59E0B]">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center text-lg font-black">₹</div>
          <div>
            <div className="text-2xl font-black text-gray-950">{totalPendingPartial}</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Pending/Partial</div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] border-l-[6px] border-l-[#EF4444]">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EF4444] flex items-center justify-center text-lg"><FaRegTimesCircle /></div>
          <div>
            <div className="text-2xl font-black text-gray-950">{totalOverdue}</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Total overdue</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#E9ECEF]/60 p-1.5 rounded-2xl w-fit gap-1">
        <button onClick={() => setActiveSubTab("structure")} className={`px-5 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${activeSubTab === "structure" ? "bg-white text-gray-900 shadow-xs border border-gray-100" : "text-gray-500 hover:text-gray-900"}`}>📖 Fee Structure</button>
        <button onClick={() => setActiveSubTab("payments")} className={`px-5 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${activeSubTab === "payments" ? "bg-white text-gray-900 shadow-xs border border-gray-100" : "text-gray-500 hover:text-gray-900"}`}>💵 Payments</button>
        <button onClick={() => setActiveSubTab("pending")} className={`px-5 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${activeSubTab === "pending" ? "bg-white text-gray-900 shadow-xs border border-gray-100" : "text-gray-500 hover:text-gray-900"}`}>📥 Pending dues</button>
      </div>

      {/* Global Filter Strip */}
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Student or roll no......"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
          />
          <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
        </div>

        {/* 12-Month Selector Options Dropdown Menu */}
        <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5 min-w-[160px]">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full bg-transparent text-gray-800 font-bold text-sm outline-none pr-6 appearance-none cursor-pointer"
          >
            <option value="All">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <span className="absolute right-3 pointer-events-none text-gray-500 text-[10px]">▼</span>
        </div>
      </div>

      {/* SUBTAB RENDERING VIEW: Pending Dues */}
      {activeSubTab === "pending" && (
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-black text-gray-950">Pending Dues</h2>
            <p className="text-sm text-gray-500 font-bold mt-0.5">
              {filteredPendingDues.length} outstanding records: Total Due <span className="text-gray-950 font-black">$18,500</span>
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.005)]">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-[#F8FAFC] text-gray-400 text-[11px] font-bold tracking-wider uppercase border-b border-gray-100">
                    <th className="py-4 px-6">Student</th>
                    <th className="py-4 px-6">Grade & Section</th>
                    <th className="py-4 px-6">Fee Type</th>
                    <th className="py-4 px-6">Due Amount</th>
                    <th className="py-4 px-6">Days Overdue</th>
                    <th className="py-4 px-6">Due Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                  {filteredPendingDues.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/40 transition">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                        <div className="flex flex-col">
                          <span className="font-extrabold text-gray-900 text-sm">{item.name}</span>
                          <span className="text-[11px] font-mono text-gray-400 mt-0.5">{item.id}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-medium">{item.gradeSection}</td>
                      <td className="py-4 px-6 text-gray-600">{item.feeType}</td>
                      <td className="py-4 px-6 text-gray-950 font-black">${item.dueAmount.toLocaleString()}</td>
                      <td className={`py-4 px-6 font-bold ${item.daysOverdue !== '-' ? 'text-red-600' : 'text-gray-400'}`}>
                        {item.daysOverdue}
                      </td>
                      <td className="py-4 px-6 text-gray-400 font-medium">{item.dueDate}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                          item.status === 'Overdue' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => handleSendReminder(item.name, item.id)}
                          className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-2 mx-auto transition cursor-pointer"
                        >
                          <FaBell className="text-gray-400 text-[10px]" /> Remainder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB RENDERING VIEW: Payments Registry */}
      {activeSubTab === "payments" && (
        <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-lg font-black text-gray-900">Student Payment Records</h2>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#F8FAFC] text-gray-500 text-[12px] font-bold tracking-wider border-b border-gray-100">
                  <th className="py-4 px-6">Student</th>
                  <th className="py-4 px-6">Grade & Section</th>
                  <th className="py-4 px-6">Fee Type</th>
                  <th className="py-4 px-6">Receipt No.</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Paid Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                {filteredPayments.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 transition">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                      <div className="flex flex-col">
                        <span className="font-extrabold text-gray-900 text-sm">{item.name}</span>
                        <span className="text-[11px] font-mono text-gray-400 mt-0.5">{item.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{item.gradeSection}</td>
                    <td className="py-4 px-6 text-gray-600">{item.feeType}</td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-500">{item.receipt}</td>
                    <td className="py-4 px-6 text-gray-950 font-extrabold">${item.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-400 font-medium">{item.date}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                        item.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Overdue' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-medium">{item.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB RENDERING VIEW: Fee Categories Structure Cards Grid */}
      {activeSubTab === "structure" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feeCategories.map((fee) => (
            <div key={fee.id} className="bg-white border border-gray-100 rounded-[22px] p-6 shadow-xs flex flex-col justify-between group hover:border-indigo-100 transition">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50/70 rounded-xl flex items-center justify-center text-lg">🗂️</div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base">{fee.name}</h3>
                    <p className="text-xs text-gray-400 font-bold mt-0.5">{fee.grade}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end mt-8">
                <span className="text-2xl font-black text-gray-950">${fee.amount.toLocaleString()}</span>
                <span className="text-[11px] font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">{fee.period}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD NEW CATEGORY MODAL BUILDER DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-[#F8FCFC] border border-white/60 rounded-[28px] w-full max-w-lg p-7 shadow-2xl flex flex-col space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-950">Add New Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 bg-white shadow-xs p-1.5 rounded-full border border-gray-100 transition cursor-pointer">
                <FaTimes size={14} />
              </button>
            </div>
            <form onSubmit={handleCreateCategorySubmit} className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700">Grade Scope</label>
                  <select value={newFeeGrade} onChange={(e) => setNewFeeGrade(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-800 outline-none">
                    <option value="Grade 3-5">Grade 3-5</option>
                    <option value="Grade 3-8">Grade 3-8</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700">Schedule Term</label>
                  <select value={newFeeType} onChange={(e) => setNewFeeType(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-800 outline-none">
                    <option value="Annual">Annual</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700">Fee Category Title</label>
                <input type="text" required placeholder="e.g. Exam Fee" value={newFeeName} onChange={(e) => setNewFeeName(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700">Value Amount ($)</label>
                <input type="number" required placeholder="e.g. 1000" value={newFeeAmount} onChange={(e) => setNewFeeAmount(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800" />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-extrabold text-sm rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#3B44F6] text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer">Create Structure</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}