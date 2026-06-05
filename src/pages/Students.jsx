// src/pages/Students.jsx
import { useState, useRef, useEffect } from "react";
import { 
  FaSearch, 
  FaPlus, 
  FaFileImport, 
  FaChevronDown, 
  FaFilter,
  FaPencilAlt,  
  FaTrashAlt,
  FaTimes
} from "react-icons/fa";

export default function Students() {
  const [activeTab, setActiveTab] = useState("Students");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grade");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Dropdown UI visibility flags
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Modal Popup view state toggle
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Expanded Form-State Object strictly matching your criteria
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    grade: "",
    section: "",
    parentName: "",
    parentPhone: "",
    status: "Active"
  });

  const gradeDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  // Interactive Mock Data Records Array State (25 Records Total)
  const [studentsData, setStudentsData] = useState([
    {
      id: "STU-24001",
      name: "Alex Johnson",
      email: "alex.j@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 5",
      section: "A",
      guardian: "Michael Johnson",
      relationship: "Father",
      status: "Active",
      joinedDate: "Oct 24, 2023"
    },
    {
      id: "STU-24002",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 6",
      section: "B",
      guardian: "Emma Williams",
      relationship: "Mother",
      status: "Inactive",
      joinedDate: "Oct 22, 2023"
    },
    {
      id: "STU-24003",
      name: "David Chen",
      email: "david.c@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 4",
      section: "A",
      guardian: "Robert Chen",
      relationship: "Father",
      status: "Active",
      joinedDate: "Oct 18, 2023"
    },
    {
      id: "STU-24004",
      name: "Chloe Miller",
      email: "chloe.m@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 3",
      section: "B",
      guardian: "Sophia Miller",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Sep 05, 2023"
    },
    {
      id: "STU-24005",
      name: "Ethan Davis",
      email: "ethan.d@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 7",
      section: "C",
      guardian: "Marcus Davis",
      relationship: "Father",
      status: "Active",
      joinedDate: "Aug 29, 2023"
    },
    {
      id: "STU-24006",
      name: "Olivia Martinez",
      email: "olivia.m@example.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 5",
      section: "B",
      guardian: "Isabella Martinez",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Sep 12, 2023"
    },
    {
      id: "STU-24007",
      name: "James Wilson",
      email: "james.w@example.com",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 8",
      section: "A",
      guardian: "Thomas Wilson",
      relationship: "Father",
      status: "Inactive",
      joinedDate: "Sep 01, 2023"
    },
    {
      id: "STU-24008",
      name: "Sophia Anderson",
      email: "sophia.a@example.com",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 6",
      section: "A",
      guardian: "Rachel Anderson",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Oct 02, 2023"
    },
    {
      id: "STU-24009",
      name: "Lucas Taylor",
      email: "lucas.t@example.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 4",
      section: "B",
      guardian: "Steven Taylor",
      relationship: "Father",
      status: "Active",
      joinedDate: "Oct 15, 2023"
    },
    {
      id: "STU-24010",
      name: "Mia Thomas",
      email: "mia.t@example.com",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 3",
      section: "A",
      guardian: "Laura Thomas",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Sep 18, 2023"
    },
    {
      id: "STU-24011",
      name: "Benjamin White",
      email: "ben.w@example.com",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 7",
      section: "B",
      guardian: "Arthur White",
      relationship: "Father",
      status: "Active",
      joinedDate: "Jul 14, 2023"
    },
    {
      id: "STU-24012",
      name: "Isabella Harris",
      email: "isabella.h@example.com",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 5",
      section: "C",
      guardian: "Maria Harris",
      relationship: "Mother",
      status: "Inactive",
      joinedDate: "Nov 01, 2023"
    },
    {
      id: "STU-24013",
      name: "Mason Martin",
      email: "mason.m@example.com",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 8",
      section: "B",
      guardian: "Daniel Martin",
      relationship: "Father",
      status: "Active",
      joinedDate: "Aug 20, 2023"
    },
    {
      id: "STU-24014",
      name: "Natalie Thompson",
      email: "natalie.t@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 6",
      section: "C",
      guardian: "Linda Thompson",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Sep 22, 2023"
    },
    {
      id: "STU-24015",
      name: "Elijah Garcia",
      email: "elijah.g@example.com",
      avatar: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 4",
      section: "A",
      guardian: "Carlos Garcia",
      relationship: "Father",
      status: "Active",
      joinedDate: "Oct 05, 2023"
    },
    {
      id: "STU-24016",
      name: "Charlotte Robinson",
      email: "char.r@example.com",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 3",
      section: "C",
      guardian: "Diana Robinson",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Sep 11, 2023"
    },
    {
      id: "STU-24017",
      name: "Logan Clark",
      email: "logan.c@example.com",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 7",
      section: "A",
      guardian: "Kevin Clark",
      relationship: "Father",
      status: "Active",
      joinedDate: "Aug 15, 2023"
    },
    {
      id: "STU-24018",
      name: "Harper Lewis",
      email: "harper.l@example.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 5",
      section: "A",
      guardian: "Susan Lewis",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Oct 10, 2023"
    },
    {
      id: "STU-24019",
      name: "Michael Walker",
      email: "mike.w@example.com",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 8",
      section: "C",
      guardian: "George Walker",
      relationship: "Father",
      status: "Inactive",
      joinedDate: "Jul 28, 2023"
    },
    {
      id: "STU-24020",
      name: "Amelia Hall",
      email: "amelia.h@example.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 6",
      section: "B",
      guardian: "Nancy Hall",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Oct 01, 2023"
    },
    {
      id: "STU-24021",
      name: "Henry Allen",
      email: "henry.a@example.com",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 4",
      section: "C",
      guardian: "Patrick Allen",
      relationship: "Father",
      status: "Active",
      joinedDate: "Sep 29, 2023"
    },
    {
      id: "STU-24022",
      name: "Evelyn Young",
      email: "evelyn.y@example.com",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 3",
      section: "B",
      guardian: "Janet Young",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Sep 07, 2023"
    },
    {
      id: "STU-24023",
      name: "Alexander King",
      email: "alex.k@example.com",
      avatar: "https://images.unsplash.com/photo-1504257406231-184049b76410?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 7",
      section: "C",
      guardian: "Raymond King",
      relationship: "Father",
      status: "Active",
      joinedDate: "Aug 11, 2023"
    },
    {
      id: "STU-24024",
      name: "Ava Wright",
      email: "ava.w@example.com",
      avatar: "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 5",
      section: "B",
      guardian: "Carol Wright",
      relationship: "Mother",
      status: "Active",
      joinedDate: "Oct 19, 2023"
    },
    {
      id: "STU-24025",
      name: "Daniel Scott",
      email: "daniel.s@example.com",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 8",
      section: "A",
      guardian: "Edward Scott",
      relationship: "Father",
      status: "Active",
      joinedDate: "Aug 05, 2023"
    }
  ]);

  const gradeOptions = ["All Grade", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"];
  const statusOptions = ["All Status", "Active", "Inactive"];

  // Click outside handling effect
  useEffect(() => {
    function handleClickOutside(event) {
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(event.target)) {
        setIsGradeOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form input update tracker
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  // Add student action response handler
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email || !newStudent.grade) {
      alert("Please enter Name, Email and Grade variables!");
      return;
    }

    const nextIdNumber = studentsData.length + 1;
    const generatedId = `STU-240${nextIdNumber < 10 ? '0' + nextIdNumber : nextIdNumber}`;
    const formattedToday = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const newlyCreatedRecord = {
      id: generatedId,
      name: newStudent.name,
      email: newStudent.email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      grade: newStudent.grade.includes("Grade") ? newStudent.grade : `Grade ${newStudent.grade}`,
      section: newStudent.section || "A",
      guardian: newStudent.parentName || "Not Provided",
      relationship: "Parent",
      status: newStudent.status,
      joinedDate: formattedToday
    };

    setStudentsData([newlyCreatedRecord, ...studentsData]);
    setIsAddModalOpen(false);

    // Clear form state fields
    setNewStudent({
      name: "",
      email: "",
      phone: "",
      dob: "",
      grade: "",
      section: "",
      parentName: "",
      parentPhone: "",
      status: "Active"
    });
  };

  // Excel simulation parsing method wrapper
  const handleExcelImportSimulate = () => {
    const confirmImport = window.confirm("Import rows from data sheet registry payload?");
    if (confirmImport) {
      const formattedToday = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const bulkAppendedRows = [
        {
          id: `STU-240${studentsData.length + 1}`,
          name: "Liam Smith",
          email: "liam.s@example.com",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
          grade: "Grade 5",
          section: "A",
          guardian: "Elena Smith",
          relationship: "Mother",
          status: "Active",
          joinedDate: formattedToday
        },
        {
          id: `STU-240${studentsData.length + 2}`,
          name: "Emily Brown",
          email: "emily.b@example.com",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
          grade: "Grade 6",
          section: "A",
          guardian: "James Brown",
          relationship: "Father",
          status: "Active",
          joinedDate: formattedToday
        }
      ];
      setStudentsData([...bulkAppendedRows, ...studentsData]);
      alert("Spreadsheet payload processing complete! 2 rows added.");
    }
  };

  const handleEdit = (id, name) => alert(`Editing row: ${name} (${id})`);
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} permanently?`)) {
      setStudentsData(studentsData.filter(item => item.id !== id));
    }
  };

  // Live multi-layered data query filtering system
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = 
      selectedGrade === "All Grade" || 
      student.grade.toLowerCase() === selectedGrade.toLowerCase();

    const matchesStatus = 
      selectedStatus === "All Status" || 
      student.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div className="flex-1 bg-[#F4F9F9] xl:my-3 xl:mr-3 xl:rounded-[32px] p-8 shadow-inner overflow-y-auto flex flex-col space-y-6 relative">
      
      {/* Search Header Container Input Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="w-full lg:w-1/2 relative">
          <input
            type="text"
            placeholder="Search......"
            className="w-full bg-[#EDF5F5] rounded-2xl px-6 py-3.5 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent"
          />
          <span className="absolute left-5 top-4 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Primary Workspace Text Labeling Row Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-400 font-medium mt-1">Manage Students, Staffs and parents across the school</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleExcelImportSimulate}
            className="flex-1 sm:flex-none bg-white text-gray-700 border border-gray-200/80 rounded-2xl px-5 py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm"
          >
            <FaFileImport className="text-gray-400" /> Import Excel
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-none bg-[#3B44F6] text-white rounded-2xl px-5 py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md"
          >
            <FaPlus /> Add Student
          </button>
        </div>
      </div>

      {/* Active Tab Toggle Filters Array Layout */}
      <div className="flex bg-[#EDF5F5] p-1.5 rounded-2xl w-fit gap-2">
        <button 
          onClick={() => setActiveTab("Students")}
          className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "Students" ? "bg-white text-[#3B44F6] shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
        >
          Students <span className={`text-xs px-2 py-0.5 rounded-md ${activeTab === "Students" ? "bg-indigo-50 text-indigo-600" : "bg-gray-200 text-gray-600"}`}>{studentsData.length}</span>
        </button>
        <button onClick={() => setActiveTab("Staff")} className="px-5 py-2 rounded-xl font-bold text-sm text-gray-500 hover:text-gray-900 transition-all">
          Staff <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-md">10</span>
        </button>
        <button onClick={() => setActiveTab("Parents")} className="px-5 py-2 rounded-xl font-bold text-sm text-gray-500 hover:text-gray-900 transition-all">
          Parents <span className="bg-emerald-50 text-emerald-600 text-xs px-2 py-0.5 rounded-md">05</span>
        </button>
      </div>

      {/* Live State Mutation Grid Filters Bar Layout */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center z-10">
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400 text-sm" />
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-end relative">
          
          {/* Grade selection sorting component dropdown toggle element */}
          <div className="relative" ref={gradeDropdownRef}>
            <div 
              onClick={() => { setIsGradeOpen(!isGradeOpen); setIsStatusOpen(false); }}
              className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 min-w-[130px] select-none"
            >
              <FaFilter className="text-gray-400 text-xs" />
              <span>{selectedGrade}</span>
              <FaChevronDown className={`text-gray-400 ml-auto text-xs transition-transform duration-200 ${isGradeOpen ? "rotate-180" : ""}`} />
            </div>

            {isGradeOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                {gradeOptions.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => { setSelectedGrade(grade); setIsGradeOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between ${selectedGrade === grade ? "bg-indigo-50 text-[#3B44F6] font-bold" : "text-gray-600 hover:bg-gray-50 font-medium"}`}
                  >
                    <span>{grade === "All Grade" ? "All Grades" : grade}</span>
                    {selectedGrade === grade && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Status filtering component dropdown toggle element */}
          <div className="relative" ref={statusDropdownRef}>
            <div 
              onClick={() => { setIsStatusOpen(!isStatusOpen); setIsGradeOpen(false); }}
              className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 min-w-[130px] select-none"
            >
              <FaFilter className="text-gray-400 text-xs" />
              <span>{selectedStatus}</span>
              <FaChevronDown className={`text-gray-400 ml-auto text-xs transition-transform duration-200 ${isStatusOpen ? "rotate-180" : ""}`} />
            </div>

            {isStatusOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => { setSelectedStatus(status); setIsStatusOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between ${selectedStatus === status ? "bg-indigo-50 text-[#3B44F6] font-bold" : "text-gray-600 hover:bg-gray-50 font-medium"}`}
                  >
                    <span>{status}</span>
                    {selectedStatus === status && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Main Student Directory Data Rendering Table Canvas */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden flex-1 z-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBF5F5]/60 text-[#3F4E4E] font-extrabold text-xs tracking-wider border-b border-gray-100">
                <th className="py-4 px-6 font-bold">STUDENT DETAILS</th>
                <th className="py-4 px-6 font-bold">STUDENT ID</th>
                <th className="py-4 px-6 font-bold">GRADE/CLASS</th>
                <th className="py-4 px-6 font-bold">GUARDIAN</th>
                <th className="py-4 px-6 font-bold">STATUS</th>
                <th className="py-4 px-6 font-bold">JOINED DATE</th>
                <th className="py-4 px-6 font-bold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium text-sm text-gray-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-gray-400 font-semibold bg-gray-50/20">
                    No records match applied parameters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div>
                        <div className="font-bold text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-400">{student.email}</div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-gray-600 font-semibold">{student.id}</td>

                    <td className="py-4 px-6">
                      <span className="bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold px-3 py-1 rounded-full border border-[#E0E7FF]">
                        {student.grade} · {student.section}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{student.guardian}</div>
                      <div className="text-xs text-gray-400 font-normal">{student.relationship}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full inline-flex items-center gap-1.5 ${student.status === "Active" ? "bg-[#ECFDF5] text-[#059669]" : "bg-gray-100 text-gray-500"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${student.status === "Active" ? "bg-[#10B981]" : "bg-gray-400"}`}></span>
                        {student.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-gray-500 font-medium">{student.joinedDate}</td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-4 text-gray-400">
                        <button onClick={() => handleEdit(student.id, student.name)} className="hover:text-indigo-600 transition p-1"><FaPencilAlt className="text-sm" /></button>
                        <button onClick={() => handleDelete(student.id, student.name)} className="hover:text-red-500 transition p-1"><FaTrashAlt className="text-sm" /></button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== EXACT REPLICA ADD STUDENT INTERACTIVE POPUP FORM DIALOG CONTAINER ==================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs select-none">
          <div className="bg-[#F8FCFC] w-full max-w-2xl rounded-[28px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Form Input Section Block Grid */}
            <form onSubmit={handleAddStudentSubmit} className="space-y-5 text-gray-700">
              
              {/* Row 1: Student Full Name Input Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-900">Student Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={newStudent.name}
                  onChange={handleFormInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                />
              </div>

              {/* Row 2: Secondary Personal Email Contact Box Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-900">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={newStudent.email}
                  onChange={handleFormInputChange}
                  placeholder="hfdauiskf2@gmial.com"
                  className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                />
              </div>

              {/* Row 3: Cellular Contact and Date Matrix Entry Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-900">Phone</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={newStudent.phone}
                    onChange={handleFormInputChange}
                    placeholder="8493208402q"
                    className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-900">Date of birth</label>
                  <input 
                    type="text" 
                    name="dob"
                    value={newStudent.dob}
                    onChange={handleFormInputChange}
                    placeholder="DD-MM-YYYY"
                    className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Row 4: Class Metrics Core Parameters Selection Allocation Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-900">Grade/Class *</label>
                  <input 
                    type="text" 
                    name="grade"
                    required
                    value={newStudent.grade}
                    onChange={handleFormInputChange}
                    placeholder="eg Grade 5"
                    className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-900">Section</label>
                  <input 
                    type="text" 
                    name="section"
                    value={newStudent.section}
                    onChange={handleFormInputChange}
                    placeholder="eg.A"
                    className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* SECTION BLOCK BREAK: Separator Parent Section Heading */}
              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-md font-bold text-gray-900 tracking-tight">Parent Information</h3>
              </div>

              {/* Row 5: Parent Contact Profile Meta Mapping Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-900">Parent Name</label>
                  <input 
                    type="text" 
                    name="parentName"
                    value={newStudent.parentName}
                    onChange={handleFormInputChange}
                    placeholder="john"
                    className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-900">Phone Number</label>
                  <input 
                    type="text" 
                    name="parentPhone"
                    value={newStudent.parentPhone}
                    onChange={handleFormInputChange}
                    placeholder="8903432890"
                    className="w-full bg-[#EDF5F5] text-gray-800 rounded-xl px-4 py-3 text-sm font-medium border border-transparent focus:outline-none focus:bg-white focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Row 6: Status Picker Select Dropdown Container Layout */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-900">Status</label>
                <div className="relative w-40">
                  <select
                    name="status"
                    value={newStudent.status}
                    onChange={handleFormInputChange}
                    className="w-full bg-[#EDF5F5] text-gray-800 font-bold rounded-xl px-4 py-3 text-sm focus:outline-none appearance-none border border-transparent cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <span className="absolute right-4 top-4 pointer-events-none text-xs text-gray-500">▼</span>
                </div>
              </div>

              {/* Custom Form Footer Control Interface Action Panel Wrapper */}
              <div className="flex justify-end items-center gap-3 pt-6">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-white border border-gray-200 text-gray-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-50 shadow-xs transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#3B44F6] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-md"
                >
                  Add Student
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}