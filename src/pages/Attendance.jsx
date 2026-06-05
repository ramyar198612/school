// src/pages/Attendance.jsx
import { useState, useMemo } from "react";
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUpload, 
  FaGraduationCap, 
  FaBookOpen, 
  FaCheck, 
  FaTimes, 
  FaClock 
} from "react-icons/fa";

export default function Attendance() {
  // Master Section Active View State Tab Toggle
  const [activeTab, setActiveTab] = useState("student"); // Options: "student" | "staff"

  // Filter Configuration Substates
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGradeDept, setSelectedGradeDept] = useState("All");
  const [attendanceDate, setAttendanceDate] = useState("2026-04-14");

  // --- MOCK IN-MEMORY SYSTEM COMPREHENSIVE DATASETS ---
  const [studentsData, setStudentsData] = useState([
    { id: "STU-2001", name: "Aarav Sharma", dept: "Grade 10-A", role: "Student", status: "present", remarks: "" },
    { id: "STU-2002", name: "Ananya Iyer", dept: "Grade 10-B", role: "Student", status: "present", remarks: "" },
    { id: "STU-2003", name: "Chris Evans", dept: "Grade 11-A", role: "Student", status: "absent", remarks: "Medical leave" },
    { id: "STU-2004", name: "Divya Nair", dept: "Grade 12-C", role: "Student", status: "present", remarks: "" },
    { id: "STU-2005", name: "Ethan Hunt", dept: "Grade 10-A", role: "Student", status: "late", remarks: "Bus delayed" },
    { id: "STU-2006", name: "Fatima Khan", dept: "Grade 11-B", role: "Student", status: "present", remarks: "" },
    { id: "STU-2007", name: "Gaurav Kapoor", dept: "Grade 12-A", role: "Student", status: "present", remarks: "" }
  ]);

  const [staffData, setStaffData] = useState([
    { id: "EMP-1001", name: "James Anderson", dept: "Mathematics", role: "Senior Teacher", status: "present", remarks: "" },
    { id: "EMP-1002", name: "Priya Sharma", dept: "Science", role: "Head of department", status: "present", remarks: "" },
    { id: "EMP-1003", name: "Robert Hughes", dept: "English", role: "Teacher", status: "present", remarks: "" },
    { id: "EMP-1004", name: "Elena Rodriguez", dept: "History", role: "Teacher", status: "present", remarks: "" },
    { id: "EMP-1005", name: "Marcus Adebayo", dept: "Physical education", role: "Coach", status: "present", remarks: "" },
    { id: "EMP-1006", name: "Lin Wei", dept: "Administration", role: "School secretary", status: "present", remarks: "" },
    { id: "EMP-1007", name: "Martha Jones", dept: "IT", role: "IT manager", status: "present", remarks: "" },
    { id: "EMP-1008", name: "Tariq Al-Fayed", dept: "Counselling", role: "School counsellor", status: "absent", remarks: "" }
  ]);

  // Handle runtime active view dataset switching pointers
  const currentDataset = activeTab === "student" ? studentsData : staffData;
  const setTargetDataset = activeTab === "student" ? setStudentsData : setStaffData;

  // Extract unique filtering keys variants array for dropdown lists population
  const uniqueFilterOptions = useMemo(() => {
    const list = currentDataset.map(item => item.dept);
    return ["All", ...new Set(list)];
  }, [currentDataset]);

  // Live calculation metrics updates pipeline processor
  const processedRecordsPipeline = useMemo(() => {
    return currentDataset.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedGradeDept === "All" || item.dept === selectedGradeDept;
      return matchesSearch && matchesFilter;
    });
  }, [currentDataset, searchQuery, selectedGradeDept]);

  // Summarize counter badges layout parameters dynamically
  const metricsCountersSummary = useMemo(() => {
    let present = 0, absent = 0, late = 0;
    processedRecordsPipeline.forEach(rec => {
      if (rec.status === "present") present++;
      if (rec.status === "absent") absent++;
      if (rec.status === "late") late++;
    });
    return { present, absent, late };
  }, [processedRecordsPipeline]);

  // Live single row tracking modifications modifier updates trigger 
  const changeAttendanceStatus = (id, targetStatus) => {
    setTargetDataset(prev => prev.map(item => 
      item.id === id ? { ...item, status: targetStatus } : item
    ));
  };

  const handleRemarksInput = (id, textVal) => {
    setTargetDataset(prev => prev.map(item => 
      item.id === id ? { ...item, remarks: textVal } : item
    ));
  };

  // Switch context handler tab resets properties dispatch
  const handleTabViewSwitch = (targetView) => {
    setActiveTab(targetView);
    setSearchQuery("");
    setSelectedGradeDept("All");
  };

  // Mock batch persistence notification alert pipeline
  const commitBatchDataToDatabase = () => {
    const contextTitle = activeTab === "student" ? "Student Attendance" : "Staff Attendance";
    alert(`Success!\nAll active record metrics inside "${contextTitle}" updated successfully.`);
  };

  // Universal XLS binary blob exporter utility handler implementation
  const runExportToExcelPipeline = () => {
    const docTitle = activeTab === "student" ? "Student_Attendance" : "Staff_Attendance";
    let headingsRowHeader = activeTab === "student" 
      ? "Student Name\tRoll ID\tGrade Section\tRole\tAttendance Status\tRemarks\n"
      : "Staff Name\tEmployee ID\tDepartment\tRole\tAttendance Status\tRemarks\n";

    let tsvAccumulatorString = headingsRowHeader;
    currentDataset.forEach(row => {
      tsvAccumulatorString += `${row.name}\t${row.id}\t${row.dept}\t${row.role}\t${row.status.toUpperCase()}\t${row.remarks}\n`;
    });

    const fileBlob = new Blob([tsvAccumulatorString], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const downloadAnchor = document.createElement("a");
    const blobObjectUrl = URL.createObjectURL(fileBlob);
    
    downloadAnchor.href = blobObjectUrl;
    downloadAnchor.setAttribute("download", `${docTitle}_Export_2026.xls`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  return (
    <div className="flex-1 bg-[#F4F9F9] xl:my-3 xl:mr-3 xl:rounded-[32px] p-8 shadow-inner overflow-y-auto flex flex-col space-y-6">
      
      {/* Top Main Heading Title Grid Bar Row Component */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Attendance</h1>
          <p className="text-gray-400 font-medium mt-1">Track and manage student and staff attendance</p>
        </div>
        <button 
          onClick={runExportToExcelPipeline}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm px-5 py-2.5 rounded-2xl shadow-sm flex items-center gap-2 transition cursor-pointer"
        >
          <FaUpload className="text-gray-400 text-xs" /> Export Excel
        </button>
      </div>

      {/* Dynamic Navigation View Tabs Switcher Ribbon */}
      <div className="flex bg-[#EDF5F5] p-1.5 rounded-2xl w-fit gap-2">
        <button
          onClick={() => handleTabViewSwitch("student")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "student" 
              ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <FaGraduationCap className={activeTab === "student" ? "text-[#3B44F6]" : "text-gray-400"} />
          Student Attendance
        </button>
        <button
          onClick={() => handleTabViewSwitch("staff")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "staff" 
              ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <FaBookOpen className={activeTab === "staff" ? "text-[#3B44F6]" : "text-gray-400"} />
          Staff Attendance
        </button>
      </div>

      {/* Overview Stat Counters Card Grid Grid Block Components Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {/* Present Summary Box */}
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.01)] border-l-[6px] border-l-[#10B981]">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center text-lg">
            <FaCheck />
          </div>
          <div>
            <div className="text-3xl font-black text-gray-950 line-height-1">{metricsCountersSummary.present}</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Present</div>
          </div>
        </div>

        {/* Absent Summary Box */}
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.01)] border-l-[6px] border-l-[#EF4444]">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-[#EF4444] flex items-center justify-center text-lg">
            <FaTimes />
          </div>
          <div>
            <div className="text-3xl font-black text-gray-950 line-height-1">{metricsCountersSummary.absent}</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Absent</div>
          </div>
        </div>

        {/* Late Summary Box */}
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.01)] border-l-[6px] border-l-[#F59E0B]">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center text-lg">
            <FaClock />
          </div>
          <div>
            <div className="text-3xl font-black text-gray-950 line-height-1">{metricsCountersSummary.late}</div>
            <div className="text-xs text-gray-400 font-bold mt-1">Late</div>
          </div>
        </div>
      </div>

      {/* Operations Filter Interface Settings Controls Parameters Layout Row Component */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 w-full pt-2">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          {/* Search Inputs Field Wrapper Container */}
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === "student" ? "Search Student or roll no......" : "Search Staff or employee ID......"}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            />
            <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
          </div>

          {/* Date Picker Input Component Module */}
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5">
            <input 
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="bg-transparent text-gray-800 font-bold text-sm outline-none cursor-pointer pr-2"
            />
          </div>

          {/* CHANGED: Dynamic Grade Options Filter Context Selector Component Module */}
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5 min-w-[160px]">
            <select
              value={selectedGradeDept}
              onChange={(e) => setSelectedGradeDept(e.target.value)}
              className="w-full bg-transparent text-gray-800 font-bold text-sm outline-none pr-6 appearance-none cursor-pointer"
            >
              {uniqueFilterOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt === "All" ? (activeTab === "student" ? "All Grades" : "All Departments") : opt}
                </option>
              ))}
            </select>
            <span className="absolute right-3 pointer-events-none text-gray-500 text-[10px]">▼</span>
          </div>
        </div>

        <button 
          onClick={commitBatchDataToDatabase}
          className="bg-[#3B44F6] hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl transition shadow-sm whitespace-nowrap cursor-pointer"
        >
          Save Batch
        </button>
      </div>

      {/* Master Content Data Presentation Grid Matrix Layout Sheet */}
      <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.01)]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#EDF5F5]/40 text-gray-500 text-[11px] font-black tracking-wider uppercase border-b border-gray-100">
                <th className="py-4 px-6 font-extrabold w-[25%]">{activeTab === "student" ? "Student Details" : "Staff Details"}</th>
                <th className="py-4 px-6 font-extrabold w-[15%]">{activeTab === "student" ? "Roll ID" : "Employee ID"}</th>
                {/* CHANGED: Label dynamically points to Grade/Section */}
                <th className="py-4 px-6 font-extrabold w-[15%]">{activeTab === "student" ? "Grade/Section" : "Departments"}</th>
                <th className="py-4 px-6 font-extrabold w-[12%]">Role</th>
                <th className="py-4 px-6 font-extrabold w-[20%]">Status</th>
                <th className="py-4 px-6 font-extrabold w-[13%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-bold text-gray-800">
              {processedRecordsPipeline.length > 0 ? (
                processedRecordsPipeline.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-extrabold text-gray-900">{row.name}</td>
                    <td className="py-4 px-6 text-gray-500 font-mono text-xs font-semibold tracking-wide">{row.id}</td>
                    <td className="py-4 px-6 font-semibold text-gray-700">{row.dept}</td>
                    <td className="py-4 px-6 text-gray-400 font-medium">{row.role}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {/* Present Option Toggle Controller Button */}
                        <button
                          onClick={() => changeAttendanceStatus(row.id, "present")}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border border-transparent cursor-pointer ${
                            row.status === "present"
                              ? "bg-emerald-50 text-[#10B981] border-[#10B981]"
                              : "text-gray-500 hover:text-[#10B981]"
                          }`}
                        >
                          <FaCheck className="text-[10px]" /> Present
                        </button>

                        {/* Absent Option Toggle Controller Button */}
                        <button
                          onClick={() => changeAttendanceStatus(row.id, "absent")}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border border-transparent cursor-pointer ${
                            row.status === "absent"
                              ? "bg-red-50 text-[#EF4444] border-[#EF4444]"
                              : "text-gray-500 hover:text-[#EF4444]"
                          }`}
                        >
                          <FaTimes className="text-[10px]" /> Absent
                        </button>

                        {/* Late Option Toggle Controller Button */}
                        <button
                          onClick={() => changeAttendanceStatus(row.id, "late")}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border border-transparent cursor-pointer ${
                            row.status === "late"
                              ? "bg-amber-50 text-[#F59E0B] border-[#F59E0B]"
                              : "text-gray-500 hover:text-[#F59E0B]"
                          }`}
                        >
                          <FaClock className="text-[10px]" /> Late
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={row.remarks}
                        placeholder="Add remarks"
                        onChange={(e) => handleRemarksInput(row.id, e.target.value)}
                        className="w-full max-w-[160px] bg-[#EDF5F5]/60 placeholder-gray-400 font-medium text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-100 transition"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400 font-medium">
                    No matching attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}