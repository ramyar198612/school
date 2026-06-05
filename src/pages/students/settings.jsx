import React, { useState, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Upload, 
  Building2, 
  ShieldCheck, 
  CalendarDays, 
  Blocks,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  Users2,
  GraduationCap,
  CalendarCheck2,
  CreditCard,
  BarChart3,
  FolderClosed,
  Settings2,
  Plus,
  X,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Settings() {
  // --- SUB TAB ACTIVE NAVIGATION SYSTEM ---
  const [activeTab, setActiveTab] = useState('integration'); 

  // --- FORM FIELDS STATE (SCHOOL PROFILE SECTION - UNCHANGED) ---
  const [schoolData, setSchoolData] = useState({
    name: 'Lincoln Academy',
    email: 'hfdauskf2@gmial.com',
    phone: '8493208402',
    website: 'WWW.lincoinacademy.edu',
    address: '123 Education Drive, Springfield, IL 62850',
    boardAffiliation: 'CBSE',
    establishedYear: '1985'
  });

  // --- ROLES & PERMISSIONS MATRIX GRID STATE (UNCHANGED) ---
  const [permissions, setPermissions] = useState([
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, admin: true, teacher: true, staff: true, parent: true },
    { id: 'user_management', label: 'User Management', icon: Users2, admin: true, teacher: false, staff: false, parent: false },
    { id: 'academic', label: 'Academic', icon: GraduationCap, admin: true, teacher: true, staff: false, parent: false },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck2, admin: true, teacher: true, staff: true, parent: true },
    { id: 'fees', label: 'Fees', icon: CreditCard, admin: true, teacher: false, staff: false, parent: true },
    { id: 'reports', label: 'Reports', icon: BarChart3, admin: true, teacher: true, staff: false, parent: true },
    { id: 'documents', label: 'Documents', icon: FolderClosed, admin: true, teacher: false, staff: false, parent: false },
    { id: 'settings', label: 'Settings', icon: Settings2, admin: true, teacher: false, staff: false, parent: false }
  ]);

  // --- ACADEMIC YEARS LIST STATE (UNCHANGED) ---
  const [academicYears, setAcademicYears] = useState([
    { id: 1, name: '2025-2026', startDate: '2025/08/01', endDate: '2026/06/30', status: 'Current' },
    { id: 2, name: '2024-2025', startDate: '2025/08/01', endDate: '2026/06/30', status: 'Past' },
    { id: 3, name: '2023-2024', startDate: '2025/08/01', endDate: '2026/06/30', status: 'Past' }
  ]);

  // --- NEW STATE: INTEGRATION SIDE-BY-SIDE PANELS (MATCHES FIGMA EXACTLY) ---
  const [stripeConfig, setStripeConfig] = useState({
    enabled: true,
    secretKey: 'sk_live_stripe_secret_key_mock_value',
    webhookSecret: 'whsec_stripe_webhook_secret_mock_value'
  });

  const [razorpayConfig, setRazorpayConfig] = useState({
    enabled: true,
    keyId: 'rzp_live_583920fhsdkf',
    keySecret: 'rzp_live_secret_key_mock_value'
  });

  // Input Field Visibility Toggles (Eye Icons)
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showStripeWebhook, setShowStripeWebhook] = useState(false);
  const [showRazorpayId, setShowRazorpayId] = useState(true); // default visible text match
  const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);

  // --- ADD YEAR POPUP OVERLAY INTERACTION CONTROLS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newYearForm, setNewYearForm] = useState({ name: '', startDate: '', endDate: '' });

  // --- LOGO IMAGE PREVIEW STATE ---
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // --- INTERACTION NOTIFICATION STATES ---
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('success');

  // --- CHANGE HANDLERS (SCHOOL PROFILE SECTION) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchoolData(prev => ({ ...prev, [name]: value }));
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        showAlert('Logo file size must be less than 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        showAlert('Logo uploaded successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // --- PERMISSION TOGGLE HANDLER (ROLES & PERMISSIONS SECTION) ---
  const handlePermissionToggle = (moduleId, roleKey) => {
    setPermissions(prevPermissions => 
      prevPermissions.map(module => {
        if (module.id === moduleId) {
          const updatedValue = !module[roleKey];
          showAlert(`Updated context accessibility for ${module.label} (${roleKey.toUpperCase()})`, 'success');
          return { ...module, [roleKey]: updatedValue };
        }
        return module;
      })
    );
  };

  // --- HANDLERS: ACADEMIC YEAR MODAL SUBMISSIONS ---
  const handleYearFormChange = (e) => {
    const { name, value } = e.target;
    setNewYearForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAcademicYear = (e) => {
    e.preventDefault();
    if (!newYearForm.name.trim() || !newYearForm.startDate || !newYearForm.endDate) {
      showAlert('Please enter a valid Year Name, Start Date, and End Date.', 'error');
      return;
    }
    const formattedStart = newYearForm.startDate.replace(/-/g, '/');
    const formattedEnd = newYearForm.endDate.replace(/-/g, '/');
    const nextYearEntry = {
      id: Date.now(),
      name: newYearForm.name,
      startDate: formattedStart,
      endDate: formattedEnd,
      status: 'Past' 
    };
    setAcademicYears([nextYearEntry, ...academicYears]);
    setIsModalOpen(false);
    setNewYearForm({ name: '', startDate: '', endDate: '' });
    showAlert(`Academic Year ${nextYearEntry.name} successfully registered!`, 'success');
  };

  const showAlert = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => setAlertMessage(null), 4000);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!schoolData.name.trim() || !schoolData.email.trim()) {
      showAlert('School Name and Email are mandatory fields.', 'error');
      return;
    }
    showAlert('School profile adjustments updated successfully!', 'success');
  };

  // --- HANDLERS: NEW INTEGRATION SAVE SYSTEM ---
  const handleSaveStripe = (e) => {
    e.preventDefault();
    showAlert('Stripe payment gateway configuration saved successfully!', 'success');
  };

  const handleSaveRazorpay = (e) => {
    e.preventDefault();
    showAlert('Razorpay payment gateway configuration saved successfully!', 'success');
  };

  return (
    <div className="w-full p-8 overflow-y-auto bg-[#F4F7FE] text-slate-800 font-sans min-h-screen relative">
      
      {/* Top Bar Header Layout */}
      <header className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input 
            type="text" 
            placeholder="Search....../" 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white rounded-xl border border-gray-100 relative text-gray-600 hover:bg-gray-50">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white font-bold shadow-sm">R</div>
        </div>
      </header>

      {/* Main Feature Title Header */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B2559]">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure school profile, permisson and integration</p>
      </section>

      {/* Alert Overlay Notification System */}
      {alertMessage && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-md text-sm font-semibold transition-all duration-300 ${
          alertType === 'success' ? 'bg-[#EBF7F2] text-[#34A853] border border-[#d3f2df]' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {alertType === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          {alertMessage}
        </div>
      )}

      {/* Horizontal Tab Filtering Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#E0E5F2]/60 w-max rounded-2xl mb-8 text-sm font-bold text-[#1B2559]">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-white text-[#1B2559] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <Building2 className="h-4 w-4" /> School Profile
        </button>
        <button 
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeTab === 'roles' ? 'bg-white text-[#1B2559] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <ShieldCheck className="h-4 w-4" /> Roles & permission
        </button>
        <button 
          onClick={() => setActiveTab('year')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeTab === 'year' ? 'bg-white text-[#1B2559] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <CalendarDays className="h-4 w-4" /> Academic Year
        </button>
        <button 
          onClick={() => setActiveTab('integration')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${activeTab === 'integration' ? 'bg-white text-[#1B2559] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <Blocks className="h-4 w-4" /> Integration
        </button>
      </div>

      {/* --- TAB PANEL RENDERING DISPATCH MATRIX --- */}
      
      {/* 1. SCHOOL PROFILE TAB PANEL */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-4xl">
          <h2 className="text-lg font-bold text-[#1B2559] mb-6">School Profile</h2>
          
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div 
                onClick={triggerFileSelect}
                className="relative w-16 h-16 rounded-full bg-slate-100 border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors group overflow-hidden"
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="School Logo preview" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="h-6 w-6 text-slate-400 group-hover:scale-105 transition-transform" />
                )}
                <div className="absolute bottom-0 right-0 bg-[#3F51B5] p-1 rounded-full text-white border border-white">
                  <Upload className="w-2.5 h-2.5" />
                </div>
              </div>
              <div>
                <button 
                  type="button" 
                  onClick={triggerFileSelect} 
                  className="flex items-center gap-2 text-sm font-bold text-[#1B2559] hover:text-blue-600"
                >
                  <Upload className="h-4 w-4" /> Upload Logo
                </button>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">PNG or JPG max 2MB</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleLogoChange} 
                  accept="image/png, image/jpeg, image/jpg" 
                  className="hidden" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-[#1B2559] mb-2">School Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={schoolData.name}
                  onChange={handleInputChange}
                  placeholder="Enter School Name"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B2559] mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={schoolData.email}
                  onChange={handleInputChange}
                  placeholder="name@school.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-[#1B2559] mb-2">Phone</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={schoolData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1B2559] mb-2">Website</label>
                  <input 
                    type="text" 
                    name="website"
                    value={schoolData.website}
                    onChange={handleInputChange}
                    placeholder="www.schoolsite.edu"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B2559] mb-2">Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={schoolData.address}
                  onChange={handleInputChange}
                  placeholder="Full physical office location address"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-[#1B2559] mb-2">Board / Affiliation</label>
                  <select 
                    name="boardAffiliation"
                    value={schoolData.boardAffiliation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-slate-700"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">IB Diploma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1B2559] mb-2">Established Year</label>
                  <input 
                    type="number" 
                    name="establishedYear"
                    value={schoolData.establishedYear}
                    onChange={handleInputChange}
                    placeholder="e.g. 1985"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-[#4F46E5] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#4338CA] transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. ROLES & PERMISSIONS MATRIX PANEL */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden w-full max-w-6xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold tracking-wider text-[#A3AED0]">
                  <th className="py-4 px-6 min-w-[240px]">MODULES</th>
                  <th className="py-4 px-6 text-center">ADMIN</th>
                  <th className="py-4 px-6 text-center">TEACHER</th>
                  <th className="py-4 px-6 text-center">STAFF</th>
                  <th className="py-4 px-6 text-center">PARENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-bold text-[#1B2559]">
                {permissions.map((module) => {
                  const ModuleIcon = module.icon;
                  return (
                    <tr key={module.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#F4F7FE] text-[#4318FF] flex items-center justify-center">
                          <ModuleIcon className="w-4 h-4" />
                        </div>
                        <span className="text-slate-700 font-bold">{module.label}</span>
                      </td>
                      {['admin', 'teacher', 'staff', 'parent'].map((roleKey) => (
                        <td key={roleKey} className="py-4 px-6 text-center">
                          <div className="inline-flex items-center justify-center">
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input 
                                type="checkbox" 
                                checked={module[roleKey]}
                                onChange={() => handlePermissionToggle(module.id, roleKey)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4318FF]"></div>
                            </label>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. INTERACTIVE ACADEMIC YEAR SECTION */}
      {activeTab === 'year' && (
        <div className="w-full max-w-4xl relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1B2559]">Academic Years</h2>
              <p className="text-sm text-gray-400 mt-0.5 font-medium">Manage school academic year calendar</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#4318FF] text-white px-5 py-2 rounded-2xl font-bold text-sm shadow-sm hover:bg-[#3610DB] transition-all active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" /> Add Year
            </button>
          </div>

          {isModalOpen && (
            <div className="absolute top-12 left-0 w-full z-40 bg-[#F4F7FE] border border-gray-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/50 transition-all animate-in fade-in duration-200">
              <h3 className="text-[#3F51B5] font-bold text-base mb-4 tracking-wide">New Academic Year</h3>
              <form onSubmit={handleSaveAcademicYear} className="flex flex-col gap-5 md:flex-row md:items-end justify-between">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                  <div>
                    <label className="block text-xs font-bold text-[#1B2559] mb-2">Year Name</label>
                    <input 
                      type="text" name="name" value={newYearForm.name} onChange={handleYearFormChange} placeholder="eg 2026-2027"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs font-bold text-slate-700 placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1B2559] mb-2">Start Date</label>
                    <input 
                      type="date" name="startDate" value={newYearForm.startDate} onChange={handleYearFormChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs font-bold text-slate-600 uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1B2559] mb-2">End Date</label>
                    <input 
                      type="date" name="endDate" value={newYearForm.endDate} onChange={handleYearFormChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs font-bold text-slate-600 uppercase"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0 md:pl-4">
                  <button type="submit" className="flex items-center gap-1.5 bg-[#4318FF] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm hover:bg-[#3610DB] transition-colors">
                    <Check className="w-3.5 h-3.5" /> Save Year
                  </button>
                  <button type="button" onClick={() => { setIsModalOpen(false); setNewYearForm({ name: '', startDate: '', endDate: '' }); }} className="flex items-center gap-1.5 bg-white border border-gray-200 text-slate-700 text-xs font-bold px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <X className="w-3.5 h-3.5 text-gray-500" /> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4 mt-4">
            {academicYears.map((year) => {
              const isCurrent = year.status === 'Current';
              return (
                <div key={year.id} className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center justify-between shadow-sm hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#F4F7FE] text-[#4318FF] rounded-xl flex items-center justify-center">
                      <Users2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-[#1B2559] tracking-tight">{year.name}</h4>
                      <p className="text-xs font-bold text-[#A3AED0] mt-0.5">{year.startDate} - {year.endDate}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-5 py-1.5 rounded-full text-xs font-extrabold shadow-sm inline-block ${isCurrent ? 'bg-[#EBF7F2] text-[#34A853]' : 'bg-[#E8F1F5] text-[#707EAE]'}`}>
                      {year.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. EXACT FIGMA MATCHED INTEGRATION VIEW SECTION */}
      {activeTab === 'integration' && (
        <div className="w-full max-w-6xl mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* ----- STRIPE PANEL ----- */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
            
            {/* Card Top Branding Header */}
            <div className="flex justify-between items-start pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#EEF2FF] text-[#4318FF] rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1B2559]">Stripe</h3>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Accept online fee payments via cards</p>
                </div>
              </div>
              
              {/* Configuration Status Switch */}
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={stripeConfig.enabled}
                  onChange={() => {
                    const toggled = !stripeConfig.enabled;
                    setStripeConfig(p => ({ ...p, enabled: toggled }));
                    showAlert(`Stripe portal integration ${toggled ? 'Activated' : 'Deactivated'}`, 'success');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
              </label>
            </div>

            {/* Input fields configurations */}
            <form onSubmit={handleSaveStripe} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1B2559] mb-2">Secret Key</label>
                <div className="relative">
                  <input 
                    type={showStripeSecret ? "text" : "password"} 
                    value={stripeConfig.secretKey}
                    onChange={(e) => setStripeConfig(p => ({ ...p, secretKey: e.target.value }))}
                    className="w-full pl-4 pr-11 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs font-bold text-slate-700 tracking-wide"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowStripeSecret(!showStripeSecret)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showStripeSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B2559] mb-2">WebHook Secret</label>
                <div className="relative">
                  <input 
                    type={showStripeWebhook ? "text" : "password"} 
                    value={stripeConfig.webhookSecret}
                    onChange={(e) => setStripeConfig(p => ({ ...p, webhookSecret: e.target.value }))}
                    className="w-full pl-4 pr-11 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs font-bold text-slate-700 tracking-wide"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowStripeWebhook(!showStripeWebhook)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showStripeWebhook ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="inline-flex items-center gap-1.5 bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1E40AF] transition-colors shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            </form>
          </div>

          {/* ----- RAZORPAY PANEL ----- */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
            
            {/* Card Top Branding Header */}
            <div className="flex justify-between items-start pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#EEF2FF] text-[#4318FF] rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1B2559]">Razorpay</h3>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Indian payment gateway for fees collect</p>
                </div>
              </div>
              
              {/* Configuration Status Switch */}
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={razorpayConfig.enabled}
                  onChange={() => {
                    const toggled = !razorpayConfig.enabled;
                    setRazorpayConfig(p => ({ ...p, enabled: toggled }));
                    showAlert(`Razorpay portal integration ${toggled ? 'Activated' : 'Deactivated'}`, 'success');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
              </label>
            </div>

            {/* Input fields configurations */}
            <form onSubmit={handleSaveRazorpay} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1B2559] mb-2">Key ID</label>
                <div className="relative">
                  <input 
                    type={showRazorpayId ? "text" : "password"} 
                    value={razorpayConfig.keyId}
                    onChange={(e) => setRazorpayConfig(p => ({ ...p, keyId: e.target.value }))}
                    className="w-full pl-4 pr-11 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs font-bold text-slate-700 tracking-wide"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowRazorpayId(!showRazorpayId)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showRazorpayId ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B2559] mb-2">Key Secret</label>
                <div className="relative">
                  <input 
                    type={showRazorpaySecret ? "text" : "password"} 
                    value={razorpayConfig.keySecret}
                    onChange={(e) => setRazorpayConfig(p => ({ ...p, keySecret: e.target.value }))}
                    className="w-full pl-4 pr-11 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs font-bold text-slate-700 tracking-wide"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showRazorpaySecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="inline-flex items-center gap-1.5 bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1E40AF] transition-colors shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}