import React, { useState } from "react";
import { BookOpen, Users, Calendar, Eye, FileText, Plus } from "lucide-react";

export default function MyClasses() {
  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form input state management
  const [formData, setFormData] = useState({
    className: "",
    gradeSection: "",
    subject: "",
    schedule: "",
    studentsCount: "0",
    room: "TBD"
  });

  // Main list of classes matching Screenshot 2026-06-05 145828.png & 145839.png
  const [classes, setClasses] = useState([
    {
      id: 1,
      className: "Class 10-A",
      subject: "Mathematics",
      studentsCount: "32",
      room: "Room 201",
      schedule: "Mon, Wed, Fri 9.00AM"
    },
    {
      id: 2,
      className: "Class 10-B",
      subject: "Mathematics",
      studentsCount: "30",
      room: "Room 202",
      schedule: "Tue, Thurs 10.30AM"
    },
    {
      id: 3,
      className: "Class 10-C",
      subject: "Advanced Algebra",
      studentsCount: "28",
      room: "Room 105",
      schedule: "Mon, Wed, 2.00pm"
    },
    {
      id: 4,
      className: "Class 10-D",
      subject: "Statistics",
      studentsCount: "26",
      room: "Room 106",
      schedule: "Tues, thurs, fri 11.00AM"
    }
  ]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create Class Form Submission Functionality
  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!formData.className || !formData.subject) return;

    const newClass = {
      id: Date.now(),
      className: formData.className + (formData.gradeSection ? ` (${formData.gradeSection})` : ""),
      subject: formData.subject,
      studentsCount: formData.studentsCount || "0",
      room: formData.room || "TBD",
      schedule: formData.schedule || "Not Scheduled"
    };

    setClasses((prevClasses) => [...prevClasses, newClass]);
    
    // Reset Form & Close
    setFormData({
      className: "",
      gradeSection: "",
      subject: "",
      schedule: "",
      studentsCount: "0",
      room: "TBD"
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-[#F4F7FE] p-6 md:p-8 min-h-screen relative font-sans antialiased">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1B2559] tracking-tight">My Classes</h1>
          <p className="text-base font-medium text-gray-500 mt-1">Manage at your assigned classes and subjects</p>
        </div>

        {/* NEW CLASS ACTION TRIGGER BUTTON */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4E36E2] hover:bg-[#3b25ca] text-white px-6 py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-200 active:scale-95"
        >
          <BookOpen size={18} />
          <span>New Class</span>
        </button>
      </div>

      {/* CLASSES GRID BLOCK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div 
            key={cls.id} 
            className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
          >
            {/* Left Accent Bar Decor */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4E36E2]"></div>
            
            <div>
              {/* Card Title Header info */}
              <div className="flex items-center gap-4 mb-5 pl-1">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-center text-[#4E36E2] shrink-0">
                  <BookOpen size={24} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-[#1B2559] truncate leading-tight">{cls.className}</h3>
                  <p className="text-sm font-bold text-[#4E36E2] mt-0.5 truncate">{cls.subject}</p>
                </div>
              </div>

              {/* Data Properties Meta layout */}
              <div className="space-y-3 pl-1 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-bold text-gray-400">
                    <Users size={16} /> Students
                  </span>
                  <span className="font-extrabold text-[#1B2559]">{cls.studentsCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-gray-400">Room</span>
                  <span className="font-extrabold text-[#1B2559]">{cls.room}</span>
                </div>
              </div>

              {/* Time Badge pill block */}
              <div className="inline-block bg-gray-50 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-xl mb-6">
                {cls.schedule}
              </div>
            </div>

            {/* Actions Button Bar */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button className="flex items-center justify-center gap-1.5 bg-[#4E36E2] hover:bg-[#3b25ca] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors">
                <Eye size={14} />
                <span>View Students</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 bg-[#4E36E2] hover:bg-[#3b25ca] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors">
                <FileText size={14} />
                <span>Attendance</span>
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* =========================================================================
         --- CREATE NEW CLASS DIALOG MODAL (Screenshot 2026-06-05 145900.png) ---
         ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-[28px] shadow-2xl p-8 border border-gray-100 transform transition-all">
            
            {/* Modal Heading Title */}
            <h2 className="text-2xl font-extrabold text-[#1B2559] mb-6">Create New Class</h2>
            
            <form onSubmit={handleCreateClass} className="space-y-5">
              
              {/* Row One: Class Name & Grade / Section inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-extrabold text-[#1B2559]">Class Name</label>
                  <input
                    type="text"
                    name="className"
                    required
                    placeholder="Maths"
                    value={formData.className}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 font-medium focus:outline-none focus:border-[#4E36E2]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-extrabold text-[#1B2559]">Grade / Section</label>
                  <input
                    type="text"
                    name="gradeSection"
                    placeholder="eg 10A"
                    value={formData.gradeSection}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 font-medium focus:outline-none focus:border-[#4E36E2]"
                  />
                </div>
              </div>

              {/* Row Two: Subject input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-extrabold text-[#1B2559]">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="eg midterm maths"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 font-medium focus:outline-none focus:border-[#4E36E2]"
                />
              </div>

              {/* Row Three: Schedule input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-extrabold text-[#1B2559]">Schedule</label>
                <input
                  type="text"
                  name="schedule"
                  placeholder="dd-mm-yyyy"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 font-medium focus:outline-none focus:border-[#4E36E2]"
                />
              </div>

              {/* Hidden/Default Data helpers for Mockup Generation */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400">Students Count (Optional)</label>
                  <input
                    type="number"
                    name="studentsCount"
                    value={formData.studentsCount}
                    onChange={handleInputChange}
                    className="bg-gray-50/50 border border-gray-100 rounded-xl px-3 py-1.5 text-xs text-gray-700 font-bold focus:outline-none focus:border-[#4E36E2]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400">Room Assignment (Optional)</label>
                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="bg-gray-50/50 border border-gray-100 rounded-xl px-3 py-1.5 text-xs text-gray-700 font-bold focus:outline-none focus:border-[#4E36E2]"
                  />
                </div>
              </div>

              {/* Form Cancel vs Submit Trigger Row Button System */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors w-28"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#4E36E2] hover:bg-[#3b25ca] text-white rounded-xl text-sm font-bold transition-colors shadow-md shadow-indigo-100"
                >
                  Create Class
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}