// src/pages/Academic.jsx
import { useState } from "react";
import { 
  FaPlus, 
  FaPencilAlt, 
  FaTrashAlt, 
  FaGraduationCap, 
  FaBook, 
  FaClock, 
  FaFileAlt,
  FaSearch,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

export default function Academic() {
  const [activeTab, setActiveTab] = useState("Classes & sections");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter Sub-States
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");
  const [timetableSearchQuery, setTimetableSearchQuery] = useState("");
  const [examsSearchQuery, setExamsSearchQuery] = useState("");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState("All");
  const [selectedTimetableGrade, setSelectedTimetableGrade] = useState("Grade 3");
  
  // Track open state for nested student result breakdowns
  const [expandedExamId, setExpandedExamId] = useState(null);

  // Form Input Tracking Structures
  const [newClass, setNewClass] = useState({ grade: "", section: "", room: "", teacher: "" });
  const [newSubject, setNewSubject] = useState({ grade: "", subjectCode: "", subjectName: "", teacher: "", weeklyHours: "" });
  
  // Exam parameters updated to match the new modal's field mappings
  const [newExam, setNewExam] = useState({ examTitle: "", date: "", status: "Upcoming", gradeLevel: "", subject: "" });

  // --- PRESERVED UNCHANGED: Classes & Sections State ---
  const [classesData, setClassesData] = useState([
    { id: 1, grade: "Grade 5", section: "Section A", room: "Room 101", studentsCount: 32, teacher: "Sarah Connor", schedule: "Mon - Fri 8:00-15:00", tag: "Grade 5" },
    { id: 2, grade: "Grade 6", section: "Section B", room: "Room 205", studentsCount: 28, teacher: "Robert Chen", schedule: "Mon - Fri 8:00-15:30", tag: "Grade 6" },
    { id: 3, grade: "Grade 4", section: "Section A", room: "Room 103", studentsCount: 30, teacher: "Maria Santos", schedule: "Mon - Fri 8:00-14:30", tag: "Grade 5" },
    { id: 4, grade: "Grade 7", section: "Section C", room: "Room 302", studentsCount: 35, teacher: "David Miller", schedule: "Mon - Fri 8:00-16:00", tag: "Grade 7" },
    { id: 5, grade: "Grade 7", section: "Section C", room: "Room 101", studentsCount: 32, teacher: "James Porter", schedule: "Mon - Fri 8:00-15:00", tag: "Grade 7" },
    { id: 6, grade: "Grade 5", section: "Section B", room: "Room 205", studentsCount: 28, teacher: "Lisa Park", schedule: "Mon - Fri 8:00-15:30", tag: "Grade 5" },
    { id: 7, grade: "Grade 8", section: "Section A", room: "Room 103", studentsCount: 30, teacher: "Alice Johnson", schedule: "Mon - Fri 8:00-14:30", tag: "Grade 8" },
    { id: 8, grade: "Grade 3", section: "Section A", room: "Room 101", studentsCount: 32, teacher: "David Kim", schedule: "Mon - Fri 8:00-15:00", tag: "Grade 3" }
  ]);

  // --- PRESERVED UNCHANGED: Subjects State ---
  const [subjectsData, setSubjectsData] = useState([
    { id: 1, name: "Mathematics", code: "MATH101", teacher: "Sarah Connor", hoursPerWeek: "5h", grade: "Grade 5" },
    { id: 2, name: "Science", code: "SCI101", teacher: "Robert Chen", hoursPerWeek: "5h", grade: "Grade 3" },
    { id: 3, name: "English Literature", code: "ENG202", teacher: "Alice Johnson", hoursPerWeek: "4h", grade: "Grade 8" },
    { id: 4, name: "History & Geography", code: "HIST301", teacher: "James Porter", hoursPerWeek: "3h", grade: "Grade 7" },
    { id: 5, name: "Computer Science", code: "CS102", teacher: "Lisa Park", hoursPerWeek: "5h", grade: "Grade 5" }
  ]);

  // --- EXAMS & RESULTS DATASET (with support for nested student breakdowns) ---
  const [examsData, setExamsData] = useState([
    { id: 1, title: "English Writing Assessment", status: "Completed", date: "April 16 2026", grade: "Grade 6", subject: "English", stats: "4/6 Passed", 
      students: [
        { roll: 1, name: "Olivia Williams", marks: "42/100", pct: "42%", letter: "B", outcome: "Fail" },
        { roll: 2, name: "Ethan Jones", marks: "48/100", pct: "48%", letter: "B", outcome: "Fail" },
        { roll: 3, name: "Ava Davis", marks: "54/100", pct: "54%", letter: "B", outcome: "Pass" },
        { roll: 4, name: "Masson Garcia", marks: "60/100", pct: "60%", letter: "A", outcome: "Pass" },
        { roll: 5, name: "Sophia Martinez", marks: "66/100", pct: "66%", letter: "A", outcome: "Pass" },
        { roll: 6, name: "James Hernandez", marks: "72/100", pct: "72%", letter: "A", outcome: "Pass" }
      ]
    },
    { id: 2, title: "Unit Test Mathematics", status: "Completed", date: "April 18 2026", grade: "Grade 5", subject: "Mathematics", stats: "3/8 Passed", students: [] },
    { id: 3, title: "Mid Term Examination", status: "Scheduled", date: "April 20-25 2026", grade: "Grade 5-8", subject: "All Subjects", stats: "8/8 Passed", students: [] },
    { id: 4, title: "Final Exam Term 1", status: "Planning", date: "May 5-15 2026", grade: "Grade 3-8", subject: "All Subjects", stats: "", students: [] },
    { id: 5, title: "Science Lab Practical", status: "Upcoming", date: "Apr 22 2026", grade: "Grade 7-8", subject: "Science", stats: "", students: [] }
  ]);

  // Input state event handlers
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({ ...prev, [name]: value }));
  };

  const handleExamInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam(prev => ({ ...prev, [name]: value }));
  };

  // Toggles the visibility of student grade details when clicking the list item arrow
  const toggleExamAccordion = (id) => {
    setExpandedExamId(expandedExamId === id ? null : id);
  };

  // Pipeline execution for new record forms
  const handleFormSubmissionPipeline = (e) => {
    e.preventDefault();
    if (activeTab === "Subjects") {
      const compiledSubjectRecord = {
        id: Date.now(),
        name: newSubject.subjectName,
        code: newSubject.subjectCode,
        teacher: newSubject.teacher,
        hoursPerWeek: newSubject.weeklyHours,
        grade: newSubject.grade
      };
      setSubjectsData([compiledSubjectRecord, ...subjectsData]);
      setNewSubject({ grade: "", subjectCode: "", subjectName: "", teacher: "", weeklyHours: "" });
    } else if (activeTab === "Exams & Results") {
      const compiledExamRecord = {
        id: Date.now(),
        title: newExam.examTitle,
        status: newExam.status,
        date: newExam.date || "TBD 2026",
        grade: newExam.gradeLevel || "All Grades",
        subject: newExam.subject || "All Subjects",
        stats: "",
        students: []
      };
      setExamsData([compiledExamRecord, ...examsData]);
      setNewExam({ examTitle: "", date: "", status: "Upcoming", gradeLevel: "", subject: "" });
    } else {
      const compiledRecord = {
        id: Date.now(),
        grade: newClass.grade,
        section: newClass.section.toUpperCase().startsWith("SECTION") ? newClass.section : `Section ${newClass.section.toUpperCase()}`,
        room: newClass.room || "Room TBD",
        studentsCount: 0,
        teacher: newClass.teacher,
        schedule: "Mon - Fri 8:00-15:00",
        tag: newClass.grade
      };
      setClassesData([compiledRecord, ...classesData]);
      setNewClass({ grade: "", section: "", room: "", teacher: "" });
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (type, id, title) => {
    if (window.confirm(`Permanently remove ${title} database record?`)) {
      if (type === "class") setClassesData(classesData.filter(item => item.id !== id));
      if (type === "subject") setSubjectsData(subjectsData.filter(item => item.id !== id));
      if (type === "exam") setExamsData(examsData.filter(item => item.id !== id));
    }
  };

  // Matrix Filter Pipelines
  const filteredClasses = classesData.filter(item => 
    item.grade.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
    item.teacher.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
    item.section.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  const filteredSubjects = subjectsData.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(subjectSearchQuery.toLowerCase()) || sub.code.toLowerCase().includes(subjectSearchQuery.toLowerCase());
    const matchesGrade = selectedGradeFilter === "All" || sub.grade === selectedGradeFilter;
    return matchesSearch && matchesGrade;
  });

  const filteredExams = examsData.filter(ex => 
    ex.title.toLowerCase().includes(examsSearchQuery.toLowerCase()) ||
    ex.subject.toLowerCase().includes(examsSearchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#F4F9F9] xl:my-3 xl:mr-3 xl:rounded-[32px] p-8 shadow-inner overflow-y-auto flex flex-col space-y-6 relative">
      
      {/* Top Search Field Bar Row */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="w-full lg:w-1/2 relative">
          <input
            type="text"
            placeholder="Search....../"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full bg-[#EDF5F5] rounded-2xl px-6 py-3.5 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent"
          />
          <span className="absolute left-5 top-4 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Main Row Header Section Component */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Academic Management</h1>
          <p className="text-gray-400 font-medium mt-1">Classes, subject , Timetable and exams</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#3B44F6] text-white rounded-2xl px-6 py-3.5 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md"
        >
          <FaPlus /> {activeTab === "Subjects" ? "Add Subject" : activeTab === "Exams & Results" ? "Add Exam" : "Add Class"}
        </button>
      </div>

      {/* Primary Tab Navigation Ribbon Component */}
      <div className="flex bg-[#EDF5F5] p-1.5 rounded-2xl w-fit gap-2 overflow-x-auto max-w-full">
        {[
          { id: "Classes & sections", label: "Classes & sections", icon: <FaGraduationCap /> },
          { id: "Subjects", label: "Subjects", icon: <FaBook /> },
          { id: "Timetable", label: "Timetable", icon: <FaClock /> },
          { id: "Exams & Results", label: "Exams & Results", icon: <FaFileAlt /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className={activeTab === tab.id ? "text-[#3B44F6]" : "text-gray-400"}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Views Render Engine Wrapper */}
      <div className="flex-1 flex flex-col space-y-4">
        
        {/* --- PRESERVED UNCHANGED: CLASSES & SECTIONS --- */}
        {activeTab === "Classes & sections" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClasses.map((item) => (
              <div key={item.id} className="bg-white rounded-[24px] border border-gray-100 p-6 flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div className="bg-[#EEF2FF] p-3 rounded-2xl text-[#3B44F6]"><FaGraduationCap className="text-xl" /></div>
                  <div className="flex gap-2 text-gray-400">
                    <button className="hover:text-gray-700 transition p-1"><FaPencilAlt className="text-sm" /></button>
                    <button onClick={() => handleDelete("class", item.id, `${item.grade} ${item.section}`)} className="hover:text-red-500 transition p-1"><FaTrashAlt className="text-sm" /></button>
                  </div>
                </div>
                <div className="my-4">
                  <h2 className="text-xl font-extrabold text-gray-900">{item.grade} - {item.section}</h2>
                  <p className="text-sm text-gray-400 font-medium mt-0.5">{item.room}</p>
                  <div className="flex items-center gap-2 mt-3 text-sm font-bold text-gray-500">
                    <span>👥 {item.studentsCount} Students</span>
                    <span className="ml-auto bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-extrabold px-3 py-1 rounded-full border border-[#E0E7FF]">{item.tag}</span>
                  </div>
                </div>
                <div className="border-t border-gray-50 pt-4 space-y-1.5 text-xs font-semibold">
                  <div className="text-gray-400">Class Teacher: <span className="text-gray-800 font-bold">{item.teacher}</span></div>
                  <div className="text-gray-400">Schedule: <span className="text-gray-800 font-medium">{item.schedule}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PRESERVED UNCHANGED: SUBJECTS TAB --- */}
        {activeTab === "Subjects" && (
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full pb-2">
              <div className="w-full sm:w-80 relative">
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={subjectSearchQuery}
                  onChange={(e) => setSubjectSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200/80 rounded-xl px-4 py-2.5 pl-10 text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
              </div>
              <div className="w-full sm:w-auto relative flex items-center bg-white border border-gray-200/80 rounded-xl px-3 py-2">
                <select
                  value={selectedGradeFilter}
                  onChange={(e) => setSelectedGradeFilter(e.target.value)}
                  className="bg-transparent text-gray-800 font-bold text-sm outline-none pr-8 appearance-none cursor-pointer"
                >
                  <option value="All">All Grades</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                </select>
                <span className="absolute right-3 pointer-events-none text-gray-500 text-[10px]">▼</span>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.01)]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EDF5F5]/40 text-gray-500 text-[11px] font-black tracking-wider uppercase border-b border-gray-100">
                    <th className="py-4 px-6 font-extrabold">Subject Name</th>
                    <th className="py-4 px-6 font-extrabold">Code</th>
                    <th className="py-4 px-6 font-extrabold">Teacher</th>
                    <th className="py-4 px-6 font-extrabold">Hrs/Wk</th>
                    <th className="py-4 px-6 font-extrabold">Grade</th>
                    <th className="py-4 px-6 text-center font-extrabold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm font-bold text-gray-800">
                  {filteredSubjects.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-4.5 px-6 font-extrabold text-gray-900">{sub.name}</td>
                      <td className="py-4.5 px-6">
                        <span className="bg-gray-100/80 border border-gray-200/40 text-gray-500 px-3 py-1 rounded-lg text-xs font-mono tracking-wide">{sub.code}</span>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className="bg-indigo-50/60 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">{sub.teacher}</span>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className="bg-[#10B981] text-white px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 w-fit font-extrabold">
                          <span className="w-1.5 h-1.5 rounded-full bg-white block"></span>{sub.hoursPerWeek}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-gray-500 font-semibold">{sub.grade}</td>
                      <td className="py-4.5 px-6">
                        <div className="flex justify-center items-center gap-3.5 text-gray-400">
                          <button className="hover:text-gray-700 transition"><FaPencilAlt className="text-sm" /></button>
                          <button onClick={() => handleDelete("subject", sub.id, sub.name)} className="hover:text-red-500 transition"><FaTrashAlt className="text-sm" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PRESERVED UNCHANGED: TIMETABLE VIEW MATRIX --- */}
        {activeTab === "Timetable" && (
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full pb-2">
              <div className="w-full sm:w-80 relative">
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={timetableSearchQuery}
                  onChange={(e) => setTimetableSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200/80 rounded-xl px-4 py-2.5 pl-10 text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
              </div>
              <div className="w-full sm:w-auto relative flex items-center bg-white border border-gray-200/80 rounded-xl px-3 py-2">
                <select
                  value={selectedTimetableGrade}
                  onChange={(e) => setSelectedTimetableGrade(e.target.value)}
                  className="bg-transparent text-gray-800 font-bold text-sm outline-none pr-8 appearance-none cursor-pointer"
                >
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                </select>
                <span className="absolute right-3 pointer-events-none text-gray-500 text-[10px]">▼</span>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-gray-100 p-6 overflow-x-auto shadow-[0_8px_24px_rgba(0,0,0,0.01)]">
              <div className="min-w-[800px] space-y-4">
                <div className="grid grid-cols-6 text-left text-xs font-black tracking-wider uppercase text-gray-400 pb-2 border-b border-gray-50">
                  <div className="pl-2">Time</div>
                  <div>Monday</div>
                  <div>Tuesday</div>
                  <div>Wednesday</div>
                  <div>Thursday</div>
                  <div>Friday</div>
                </div>

                <div className="grid grid-cols-6 items-stretch gap-4 text-xs">
                  <div className="flex flex-col justify-center text-gray-400 font-bold pl-2 font-mono"><span>08:00 AM</span><span>09:00 AM</span></div>
                  <div className="bg-[#EFF6FF] border-l-4 border-[#3B44F6] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#1E3A8A] text-sm">Mathematics</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mr. Anderson</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#ECFDF5] border-l-4 border-[#10B981] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#065F46] text-sm">Physics</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Dr. Banner</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#FAF5FF] border-l-4 border-[#A855F7] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#581C87] text-sm">English Lit.</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mrs. Smith</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#FFF7ED] border-l-4 border-[#F97316] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#7C2D12] text-sm">World History</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mr. Jones</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#EFF6FF] border-l-4 border-[#3B44F6] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#1E3A8A] text-sm">Mathematics</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mr. Anderson</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-stretch gap-4 text-xs mt-2">
                  <div className="flex flex-col justify-center text-gray-400 font-bold pl-2 font-mono"><span>09:00 AM</span><span>10:00 AM</span></div>
                  <div className="bg-[#FAF5FF] border-l-4 border-[#A855F7] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#581C87] text-sm">English Lit.</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mrs. Smith</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#FEF2F2] border border-red-200 border-l-4 border-[#EF4444] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#991B1B] text-sm">Physics</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Dr. Banner</p>
                    <div className="mt-3 bg-[#FEE2E2] text-[#EF4444] px-2.5 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1.5 w-fit"><FaExclamationTriangle /> Teacher overlap</div>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#ECFDF5] border-l-4 border-[#10B981] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#065F46] text-sm">Biology</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Dr. Stark</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#EFF6FF] border-l-4 border-[#3B44F6] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#1E3A8A] text-sm">Mathematics</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mr. Anderson</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#FFF7ED] border-l-4 border-[#F97316] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#7C2D12] text-sm">Geography</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mr. Jones</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center text-xs my-3">
                  <div className="flex flex-col justify-center text-gray-400 font-bold pl-2 font-mono"><span>10:00 AM</span><span>10:30 AM</span></div>
                  <div className="col-span-5 bg-[#EFF2FF] rounded-xl py-3 text-center text-[#4F46E5] font-black tracking-[0.25em] text-xs uppercase">Lunch Break</div>
                </div>

                <div className="grid grid-cols-6 items-stretch gap-4 text-xs">
                  <div className="flex flex-col justify-center text-gray-400 font-bold pl-2 font-mono"><span>10:30 AM</span><span>11:30 AM</span></div>
                  <div className="bg-[#ECFDF5] border-l-4 border-[#10B981] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#065F46] text-sm">Chemistry</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Dr. Pym</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#FFF7ED] border-l-4 border-[#F97316] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#7C2D12] text-sm">World History</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mr. Jones</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <button className="border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors rounded-xl flex flex-col items-center justify-center p-4 text-gray-400 font-bold gap-1 bg-gray-50/30">
                    <span className="text-lg text-gray-300">+</span><span>Add Period</span>
                  </button>
                  <div className="bg-[#FAF5FF] border-l-4 border-[#A855F7] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#581C87] text-sm">English Lit.</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Mrs. Smith</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                  <div className="bg-[#ECFDF5] border-l-4 border-[#10B981] p-4 rounded-xl relative">
                    <h4 className="font-extrabold text-[#065F46] text-sm">Physics</h4>
                    <p className="text-gray-400 font-semibold mt-1">👤 Dr. Banner</p>
                    <span className="absolute right-3 top-3 text-gray-300 text-[10px]">⣿</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- EXAMS & RESULTS VIEW (With Dropdown Arrow Hooked Up to Display Nested Table) --- */}
        {activeTab === "Exams & Results" && (
          <div className="flex flex-col space-y-4 w-full">
            <div className="w-full sm:w-80 relative pb-2">
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={examsSearchQuery}
                onChange={(e) => setExamsSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200/80 rounded-xl px-4 py-2.5 pl-10 text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
            </div>

            <div className="space-y-4 w-full">
              {filteredExams.map((exam) => {
                const isExpanded = expandedExamId === exam.id;
                
                let statusColorClass = "bg-purple-50 text-purple-600";
                if (exam.status === "Completed") statusColorClass = "bg-amber-50 text-amber-600 text-[11px]";
                if (exam.status === "Scheduled") statusColorClass = "bg-emerald-50 text-emerald-600";
                if (exam.status === "Planning") statusColorClass = "bg-blue-50 text-blue-500";

                return (
                  <div key={exam.id} className="bg-white rounded-[24px] border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.01)] overflow-hidden transition-all">
                    
                    {/* Item Container Header Row */}
                    <div className="p-5 flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#EEF2FF] text-[#3B44F6] p-3.5 rounded-2xl">
                          <FaGraduationCap className="text-xl" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-extrabold text-gray-900 text-base">{exam.title}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] uppercase tracking-wide ${statusColorClass}`}>
                              {exam.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 font-semibold mt-1">
                            {exam.date} . {exam.grade} . <span className="text-gray-500 font-bold">{exam.subject}</span>
                          </p>
                        </div>
                      </div>

                      {/* Right Action Menu Panel Component */}
                      <div className="flex items-center gap-6 ml-auto">
                        {exam.stats && (
                          <span className="text-xs font-black text-[#10B981] bg-emerald-50/60 px-3 py-1 rounded-md">
                            {exam.stats}
                          </span>
                        )}
                        <div className="flex items-center gap-3 text-gray-400">
                          <button className="hover:text-gray-700 transition p-1"><FaPencilAlt className="text-sm" /></button>
                          <button onClick={() => handleDelete("exam", exam.id, exam.title)} className="hover:text-red-500 transition p-1"><FaTrashAlt className="text-sm" /></button>
                          
                          {/* DROPDOWN TOGGLE HOOK: Expanded on click to reveal subtable */}
                          <button 
                            onClick={() => toggleExamAccordion(exam.id)}
                            className="ml-2 bg-gray-50 hover:bg-gray-100 p-2 rounded-xl text-gray-600 transition flex items-center justify-center cursor-pointer"
                          >
                            {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* --- EXPANDABLE NESTED STUDENT MARK TABLE (Screenshot 2026-06-04 110353.png) --- */}
                    {isExpanded && exam.students && exam.students.length > 0 && (
                      <div className="border-t border-gray-100 bg-[#FCFDFD] px-6 pb-6 pt-2 overflow-x-auto">
                        <table className="w-full text-left text-xs font-bold border-collapse">
                          <thead>
                            <tr className="text-gray-400 border-b border-gray-100 uppercase text-[10px] tracking-wider">
                              <th className="py-4 pl-2">#</th>
                              <th className="py-4">Student</th>
                              <th className="py-4">Marks</th>
                              <th className="py-4">%</th>
                              <th className="py-4">Grade</th>
                              <th className="py-4">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-sm">
                            {exam.students.map((st, index) => (
                              <tr key={index} className="hover:bg-slate-50/40 transition">
                                <td className="py-4 pl-2 font-medium text-gray-400">{st.roll}</td>
                                <td className="py-4 font-extrabold text-gray-900">{st.name}</td>
                                <td className="py-4 font-black text-gray-900">{st.marks}</td>
                                <td className={`py-4 font-black ${st.outcome === "Fail" ? "text-red-500" : "text-gray-900"}`}>{st.pct}</td>
                                <td className="py-4">
                                  <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-extrabold text-[11px] border ${
                                    st.letter === "A" ? "border-emerald-200 text-emerald-600 bg-emerald-50/20" : "border-blue-200 text-blue-600 bg-blue-50/20"
                                  }`}>
                                    {st.letter}
                                  </span>
                                </td>
                                <td className="py-4">
                                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide ${
                                    st.outcome === "Pass" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                                  }`}>
                                    {st.outcome}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* --- POPUP CONTEXT MODAL ENGINE --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/30 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#F4F9F9] w-full max-w-2xl rounded-[32px] shadow-xl p-8 border border-white/60">
            <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
              {activeTab === "Subjects" ? "Add New Subject" : activeTab === "Exams & Results" ? "Add New Exam" : "Add New Class"}
            </h2>

            <form onSubmit={handleFormSubmissionPipeline} className="space-y-5 text-sm font-bold text-gray-800">
              
              {activeTab === "Subjects" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Grade</label>
                      <div className="relative">
                        <select
                          required
                          name="grade"
                          value={newSubject.grade}
                          onChange={handleSubjectInputChange}
                          className="w-full bg-[#EDF5F5] text-gray-500 font-medium rounded-xl px-4 py-3.5 appearance-none focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                        >
                          <option value="" disabled hidden>Select Grade</option>
                          <option value="Grade 3">Grade 3</option>
                          <option value="Grade 4">Grade 4</option>
                          <option value="Grade 5">Grade 5</option>
                          <option value="Grade 6">Grade 6</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-xs">▼</div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Subject code</label>
                      <input
                        required
                        type="text"
                        name="subjectCode"
                        placeholder="A,B,C..."
                        value={newSubject.subjectCode}
                        onChange={handleSubjectInputChange}
                        className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-gray-900 font-bold text-sm">Subject Name</label>
                    <input
                      required
                      type="text"
                      name="subjectName"
                      placeholder="Mathematics"
                      value={newSubject.subjectName}
                      onChange={handleSubjectInputChange}
                      className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-gray-900 font-bold text-sm">Teacher</label>
                    <input
                      required
                      type="text"
                      name="teacher"
                      placeholder="Teacher Name"
                      value={newSubject.teacher}
                      onChange={handleSubjectInputChange}
                      className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-gray-900 font-bold text-sm">Weekly hours</label>
                    <input
                      required
                      type="text"
                      name="weeklyHours"
                      placeholder="eg 6hrs"
                      value={newSubject.weeklyHours}
                      onChange={handleSubjectInputChange}
                      className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                    />
                  </div>
                </>
              ) : activeTab === "Exams & Results" ? (
                /* --- FIXED: "ADD NEW EXAM" MODAL GRID (Screenshot 2026-06-04 111011.png) --- */
                <>
                  <div className="flex flex-col space-y-2">
                    <label className="text-gray-900 font-bold text-sm">Exam Title</label>
                    <input
                      required
                      type="text"
                      name="examTitle"
                      placeholder="Midterm"
                      value={newExam.examTitle}
                      onChange={handleExamInputChange}
                      className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Date</label>
                      <input 
                        required
                        type="text"
                        name="date"
                        placeholder="DD-MM-YYYY"
                        value={newExam.date}
                        onChange={handleExamInputChange}
                        className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Status</label>
                      <input 
                        required
                        type="text"
                        name="status"
                        placeholder="Upcoming"
                        value={newExam.status}
                        onChange={handleExamInputChange}
                        className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Grade Level</label>
                      <input 
                        required
                        type="text"
                        name="gradeLevel"
                        placeholder="grade 5 -8"
                        value={newExam.gradeLevel}
                        onChange={handleExamInputChange}
                        className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Subject</label>
                      <input 
                        required
                        type="text"
                        name="subject"
                        placeholder="All subjects"
                        value={newExam.subject}
                        onChange={handleExamInputChange}
                        className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Grade</label>
                      <div className="relative">
                        <select
                          required
                          name="grade"
                          value={newClass.grade}
                          onChange={handleFormInputChange}
                          className="w-full bg-[#EDF5F5] text-gray-500 font-medium rounded-xl px-4 py-3.5 appearance-none focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                        >
                          <option value="" disabled hidden>Select Grade</option>
                          <option value="Grade 3">Grade 3</option>
                          <option value="Grade 4">Grade 4</option>
                          <option value="Grade 5">Grade 5</option>
                          <option value="Grade 6">Grade 6</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-xs">▼</div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-900 font-bold text-sm">Section</label>
                      <input
                        required
                        type="text"
                        name="section"
                        placeholder="A,B,C..."
                        value={newClass.section}
                        onChange={handleFormInputChange}
                        className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-gray-900 font-bold text-sm">Room</label>
                    <input
                      type="text"
                      name="room"
                      placeholder="eg Room 101"
                      value={newClass.room}
                      onChange={handleFormInputChange}
                      className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-gray-900 font-bold text-sm">Class Teacher</label>
                    <input
                      required
                      type="text"
                      name="teacher"
                      placeholder="Teacher Name"
                      value={newClass.teacher}
                      onChange={handleFormInputChange}
                      className="w-full bg-[#EDF5F5] placeholder-gray-400 font-medium rounded-xl px-4 py-3.5 focus:outline-none focus:bg-white border border-transparent focus:border-indigo-200 transition"
                    />
                  </div>
                </>
              )}

              {/* Action Buttons Container */}
              <div className="flex justify-end items-center gap-3 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="border border-[#3B44F6] text-[#3B44F6] px-6 py-2.5 rounded-xl font-bold text-sm bg-white hover:bg-indigo-50 transition min-w-[90px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3B44F6] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition min-w-[100px] shadow-sm"
                >
                  {activeTab === "Subjects" ? "Add Subject" : activeTab === "Exams & Results" ? "Add Exam" : "Add Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}