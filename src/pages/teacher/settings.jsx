import React, { useState } from "react";
import { 
  LogOut, 
  User, 
  Bell, 
  Mail, 
  Lock, 
  Save, 
  CheckCircle,
  Building,
  Phone,
  BookOpen,
  FileText
} from "lucide-react";

export default function SettingsPage() {
  // Authentication routing simulation state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // --- PROFILE FORM STATES (From Screenshots 192946 & 192959) ---
  const [profile, setProfile] = useState({
    fullName: "Ms. Sarah Johnson",
    email: "Sarah.johnson@oakwood.edu",
    phone: "6390459849",
    subject: "Mathematics",
    department: "Science & Mathematics",
    bio: "Experienced mathematics teacher with 8 years in secondary education. passionate about making complex concepts accessible to all Students."
  });

  // --- NOTIFICATION TOGGLE STATES (From Screenshots 193022 & 193030) ---
  const [notifications, setNotifications] = useState({
    assignmentSubmissions: true,
    attendanceAlerts: true,
    newMessages: true,
    gradeApprovals: false,
  });

  const [saveStatus, setSaveStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 800);
  };

  // --- LOGOUT ACTION -> SIMULATING SCREENSHOT 193252.JPG ---
  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  // Render Login view state if user triggers layout action
  if (!isLoggedIn) {
    return <MockLoginPage />;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans pb-16">
      
      {/* --- TOP BANNER LEVEL ROW --- */}
      <div className="flex items-center justify-between px-8 py-6 bg-transparent">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your account preferences and profile</p>
        </div>
        
        <button 
          onClick={handleLogOut}
          className="px-5 py-2.5 bg-[#523ae4] text-white font-bold text-sm rounded-xl shadow-sm hover:bg-[#432ec4] transition-all flex items-center gap-2"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>

      <div className="max-w-5xl px-8 space-y-6">
        
        {/* --- SECTION 1: PROFILE CARDS & INPUT MATRIX --- */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-8">
          <div className="flex items-center gap-2 text-slate-700 font-bold mb-6 text-base border-b border-slate-100 pb-3">
            <User size={18} className="text-[#523ae4]" />
            <h2>Suggestions</h2>
          </div>

          {/* Teacher Info Avatar Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-[#523ae4] text-white font-bold text-xl rounded-2xl flex items-center justify-center shadow-inner">
              SJ
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{profile.fullName}</h3>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">{profile.subject}. {profile.department}</p>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Joined August 2019</p>
            </div>
          </div>

          {/* Form Configurations Inputs */}
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 focus:border-[#523ae4] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 focus:border-[#523ae4] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Phone number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 focus:border-[#523ae4] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={profile.subject}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 focus:border-[#523ae4] transition-all"
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Department</label>
              <input 
                type="text" 
                name="department"
                value={profile.department}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 focus:border-[#523ae4] transition-all"
                />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Bio</label>
              <textarea 
                rows="3"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 focus:border-[#523ae4] transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                disabled={saveStatus === "saving"}
                className="px-6 py-3 bg-[#523ae4] hover:bg-[#432ec4] text-white font-bold text-sm rounded-xl shadow-xs flex items-center gap-2 transition-all disabled:opacity-70"
              >
                {saveStatus === "saving" ? (
                  <span>Saving...</span>
                ) : saveStatus === "success" ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Changes Saved!</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* --- SECTION 2: NOTIFICATIONS PANEL CARDS --- */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs p-8">
          <div className="flex items-center gap-2 text-slate-700 font-bold mb-6 text-base border-b border-slate-100 pb-3">
            <Bell size={18} className="text-[#523ae4]" />
            <h2>Notification</h2>
          </div>

          <div className="space-y-4">
            
            {/* Setting Item 1 */}
            <div className="flex items-center justify-between p-5 bg-white border border-slate-150 rounded-2xl shadow-xs transition-all hover:border-slate-300">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Assignment Submissions</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Get notified when students submit assignments</p>
              </div>
              <button 
                onClick={() => toggleNotification("assignmentSubmissions")}
                className={`w-14 h-7 rounded-full transition-all relative outline-none ${
                  notifications.assignmentSubmissions ? "bg-[#523ae4]" : "bg-slate-200"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${
                  notifications.assignmentSubmissions ? "left-8" : "left-1"
                }`} />
              </button>
            </div>

            {/* Setting Item 2 */}
            <div className="flex items-center justify-between p-5 bg-white border border-slate-150 rounded-2xl shadow-xs transition-all hover:border-slate-300">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Attendance Alerts</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Low attendance threshold warnings</p>
              </div>
              <button 
                onClick={() => toggleNotification("attendanceAlerts")}
                className={`w-14 h-7 rounded-full transition-all relative outline-none ${
                  notifications.attendanceAlerts ? "bg-[#523ae4]" : "bg-slate-200"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${
                  notifications.attendanceAlerts ? "left-8" : "left-1"
                }`} />
              </button>
            </div>

            {/* Setting Item 3 */}
            <div className="flex items-center justify-between p-5 bg-white border border-slate-150 rounded-2xl shadow-xs transition-all hover:border-slate-300">
              <div>
                <h3 className="text-sm font-bold text-slate-800">New Messages</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Messages from students and parents</p>
              </div>
              <button 
                onClick={() => toggleNotification("newMessages")}
                className={`w-14 h-7 rounded-full transition-all relative outline-none ${
                  notifications.newMessages ? "bg-[#523ae4]" : "bg-slate-200"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${
                  notifications.newMessages ? "left-8" : "left-1"
                }`} />
              </button>
            </div>

            {/* Setting Item 4 */}
            <div className="flex items-center justify-between p-5 bg-white border border-slate-150 rounded-2xl shadow-xs transition-all hover:border-slate-300">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Grade Approvals</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">When admin approves published grades</p>
              </div>
              <button 
                onClick={() => toggleNotification("gradeApprovals")}
                className={`w-14 h-7 rounded-full transition-all relative outline-none ${
                  notifications.gradeApprovals ? "bg-[#523ae4]" : "bg-slate-200"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${
                  notifications.gradeApprovals ? "left-8" : "left-1"
                }`} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// --- SUBSIDIARY LAYOUT VIEW: MOCK LOGIN PAGE ---
// This rendering block accurately references Screenshot 2026-06-05 193252.jpg layout details
function MockLoginPage() {
  const [activeTab, setActiveTab] = useState("teacher"); // admin, teacher

  return (
    <div className="w-full min-h-screen bg-[#FFFBF4] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Graphic Context Layer Placeholder */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#523ae4] rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-white border border-orange-100 rounded-[32px] p-8 shadow-xl relative z-10">
        
        {/* Main Branding Header Titles */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 font-medium text-sm mt-1">Sign into your careerwave account</p>
        </div>

        {/* Admin/Teacher Segment Control Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-[#F9F7F4] rounded-2xl border border-slate-100 mb-8">
          <button 
            onClick={() => setActiveTab("admin")}
            className={`py-3 text-sm font-bold rounded-xl transition-all ${
              activeTab === "admin" 
                ? "bg-transparent text-slate-800 border border-slate-300 shadow-3xs" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Admin
          </button>
          
          <button 
            onClick={() => setActiveTab("teacher")}
            className={`py-3 text-sm font-bold rounded-xl transition-all ${
              activeTab === "teacher" 
                ? "bg-[#523ae4] text-white shadow-md" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Teacher
          </button>
        </div>

        {/* Input Forms */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="Enter your Email"
                className="w-full bg-[#FFFBF4]/40 border border-teal-600/40 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400/80 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Enter your password"
                className="w-full bg-[#FFFBF4]/40 border border-teal-600/40 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400/80 focus:outline-none focus:ring-2 focus:ring-[#523ae4]/20 transition-all"
              />
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()} 
            className="w-full py-4 bg-[#523ae4] hover:bg-[#432ec4] text-white font-bold text-base rounded-2xl shadow-md transition-all mt-4 transform active:scale-[0.99]"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
}