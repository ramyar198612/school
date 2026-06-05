import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Upload, 
  Download, 
  FileText, 
  Award, 
  FolderOpen, 
  Layers,
  Trash2,
  GraduationCap,
  ShieldCheck,
  Medal
} from 'lucide-react';

export default function Documents() {
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All Types');

  // --- STATS OVERVIEW CARD STATES ---
  const [docStats, setDocStats] = useState({
    totalDocs: 12,
    totalCertificates: 3,
    studentRecords: 9,
    otherFiles: 4
  });

  // --- FULL RAW DATASET FROM THE SCREENSHOT DESIGN ---
  const [documentsList, setDocumentsList] = useState([
    {
      id: 1,
      name: 'Enrollment Certificate - Liam Smith',
      meta: 'Liam smith . 2026-03-01 . 245KB . By Admin Office',
      tag: 'Certificates',
      subType: 'Completion',
      student: 'Liam Smith',
      issuedDate: '2026-03-15',
      tagColor: 'bg-[#EBF7F2] text-[#34A853]'
    },
    {
      id: 2,
      name: 'Grade 6 Report Card - Emily Brown',
      meta: 'Emily Brown . 2026-02-28 . 180KB . By Robert Chen',
      tag: 'Report Card',
      tagColor: 'bg-[#F1E9FF] text-[#9747FF]'
    },
    {
      id: 3,
      name: 'School Calendar 2026',
      meta: '2026-01-10 . 520KB . By Principal',
      tag: 'Other',
      tagColor: 'bg-[#EBF5F7] text-[#4EC1E2]'
    },
    {
      id: 4,
      name: 'Staff Handbook 2026',
      meta: '2026-01-05 . 1.2MB . By HR Department',
      tag: 'Other',
      tagColor: 'bg-[#EBF5F7] text-[#4EC1E2]'
    },
    {
      id: 5,
      name: 'Student ID - Noah Johnson',
      meta: 'Noah Johnson . 2026-04-01 . 95KB . By Admin Office',
      tag: 'ID Card',
      tagColor: 'bg-[#FFF6E6] text-[#FFB54A]'
    },
    {
      id: 6,
      name: 'Merit Certificate - Emily Brown',
      meta: 'Emily Brown . 2026-03-15 . 210KB . By Principal',
      tag: 'Certificates',
      subType: 'Merit',
      student: 'Emily Brown',
      issuedDate: '2026-03-15',
      tagColor: 'bg-[#EBF7F2] text-[#34A853]'
    },
    {
      id: 7,
      name: 'Attendance Certificate - Noah Johnson',
      meta: 'Noah Johnson . 2026-03-20 . 195KB . By Admin Office',
      tag: 'Certificates',
      subType: 'Attendance',
      student: 'Naoh Johnson',
      issuedDate: '2026-03-15',
      tagColor: 'bg-[#EBF7F2] text-[#34A853]'
    },
    {
      id: 8,
      name: 'Grade 5 Report Card - Ethan Jones',
      meta: 'Ethan Jones . 2026-02-10 . 165KB . By Sarah Connor',
      tag: 'Report Card',
      tagColor: 'bg-[#F1E9FF] text-[#9747FF]'
    },
    {
      id: 9,
      name: 'Staff Attendance Sheet - April',
      meta: '2026-04-01 . 88KB . By HR Department',
      tag: 'Other',
      tagColor: 'bg-[#EBF5F7] text-[#4EC1E2]'
    },
    {
      id: 10,
      name: 'Fee Receipt - Olivia Williams',
      meta: 'Olivia Williams . 2026-04-05 . 72KB . By Accounts Office',
      tag: 'Other',
      tagColor: 'bg-[#EBF5F7] text-[#4EC1E2]'
    },
    {
      id: 11,
      name: 'Student photo - Sophia Martinez',
      meta: 'Sophia Martinez . 2026-02-15 . 312KB . By Admin office',
      tag: 'ID Card',
      tagColor: 'bg-[#FFF6E6] text-[#FFB54A]'
    }
  ]);

  // --- DYNAMIC RUNTIME DOWNLOAD LOGIC ---
  const handleDownloadCertificate = (doc) => {
    const title = doc.subType ? `${doc.subType} Certificate` : doc.name;
    const recipient = doc.student || "Student";
    const date = doc.issuedDate || "2026-03-15";

    // Text Template layout representing an actual generated certificate file layout
    const certificateContent = `
    ==================================================
    ${title.toUpperCase()}
    ==================================================
    
    This document serves as verification that:
    ${recipient}
    
    Has been formally recognized and issued this credential.
    
    Status: Valid / Verified
    Date of Issuance: ${date}
    Authority: School Administration Office
    
    ==================================================
    Generated secure copy via EduSmart Portal.
    ==================================================
    `;

    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${title.replace(/\s+/g, '_')}_${recipient.replace(/\s+/g, '_')}.txt`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  // --- ACTIONS FUNCTIONALITIES ---
  const handleDeleteDoc = (id) => {
    if(window.confirm("Are you sure you want to delete this document?")) {
      setDocumentsList(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Document Name,Metadata,Tag\n";
    filteredDocuments.forEach(d => {
      csvContent += `"${d.name}","${d.meta}","${d.tag}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Documents_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- DYNAMIC FILTER PIPELINE ---
  const filteredDocuments = documentsList.filter(doc => {
    if (activeSubTab === 'student' && doc.tag !== 'Report Card' && doc.tag !== 'ID Card') return false;
    if (activeSubTab === 'certificates' && doc.tag !== 'Certificates') return false;
    if (selectedTypeFilter !== 'All Types' && doc.tag !== selectedTypeFilter) return false;

    const searchLower = searchQuery.toLowerCase();
    return doc.name.toLowerCase().includes(searchLower) || doc.meta.toLowerCase().includes(searchLower);
  });

  return (
    <div className="w-full p-8 overflow-y-auto bg-[#F4F7FE] text-slate-800 font-sans min-h-screen">
      
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

      {/* Page Title & Main Heading Layout */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2559]">Documents</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manager students records,certificates and uploaded files</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 shadow-sm font-medium text-sm hover:bg-gray-50 transition-all active:scale-95"
          >
            <Download className="h-4 w-4 text-gray-500" /> Export Excel
          </button>
        </div>
      </section>

      {/* Analytics Cards Matrix */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-600 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1B2559]">{docStats.totalDocs}</div>
            <div className="text-xs font-semibold text-gray-400">Total Documents</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-indigo-600 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1B2559]">{docStats.totalCertificates}</div>
            <div className="text-xs font-semibold text-gray-400">Total Certificates</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-purple-600 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1B2559]">{docStats.studentRecords}</div>
            <div className="text-xs font-semibold text-gray-400">Students Records</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-400 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-400 rounded-xl">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1B2559]">{docStats.otherFiles}</div>
            <div className="text-xs font-semibold text-gray-400">Other files</div>
          </div>
        </div>
      </section>

      {/* Sub-Filters Tabs Bar */}
      <div className="flex flex-wrap gap-2 p-1 bg-[#E0E5F2] w-max rounded-xl mb-6 text-sm font-semibold">
        <button 
          onClick={() => { setActiveSubTab('all'); setSelectedTypeFilter('All Types'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeSubTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          All documents
        </button>
        <button 
          onClick={() => { setActiveSubTab('student'); setSelectedTypeFilter('All Types'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeSubTab === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Student records
        </button>
        <button 
          onClick={() => { setActiveSubTab('certificates'); setSelectedTypeFilter('All Types'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeSubTab === 'certificates' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Certificates
        </button>
      </div>

      {/* Inline Local Search Engine and Select Field Filter */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Student or roll no......" 
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="w-full sm:w-44 bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Types">All Types</option>
            <option value="Certificates">Certificates</option>
            <option value="Report Card">Report Cards</option>
            <option value="ID Card">ID Cards</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </section>

      {/* Content Records Interactive Container */}
      {activeSubTab === 'certificates' ? (
        /* GRID CERTIFICATE CARD LAYOUT BASED ON SCREENSHOT 2026-06-05 072244.png */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => {
            const isMerit = doc.subType === 'Merit';
            const isCompletion = doc.subType === 'Completion';
            
            const headerBg = isMerit ? 'bg-[#FFFBF2]' : isCompletion ? 'bg-[#F4F6FF]' : 'bg-[#F2FAF7]';
            const badgeBg = isMerit ? 'bg-[#FFECC8] text-[#FFB54A]' : isCompletion ? 'bg-[#E1E6FF] text-[#4A76FF]' : 'bg-[#D2F2E9] text-[#34A853]';
            const Icon = isMerit ? Medal : isCompletion ? GraduationCap : ShieldCheck;
            const iconColor = isMerit ? 'text-[#FFB54A]' : isCompletion ? 'text-[#4A76FF]' : 'text-[#34A853]';

            return (
              <div key={doc.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className={`p-6 flex flex-col items-center justify-center relative ${headerBg} h-32`}>
                  <div className="bg-white p-2.5 rounded-full shadow-sm flex items-center justify-center mb-2">
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <span className={`px-4 py-0.5 rounded-full font-bold text-xs ${badgeBg}`}>
                    {doc.subType || 'Certificate'}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#1B2559] mb-1">
                      {doc.subType === 'Merit' ? 'Merit Certificate' : doc.subType === 'Completion' ? 'Completion Certificate' : 'Attendance Certificate'}
                    </h3>
                    <p className="text-sm font-semibold text-gray-600">{doc.student || 'Student'}</p>
                    <p className="text-xs font-bold text-gray-400 mt-2">Issued: {doc.issuedDate || '2026-03-15'}</p>
                  </div>

                  <div className="mt-5">
                    <button 
                      onClick={() => handleDownloadCertificate(doc)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98]"
                    >
                      <Download className="h-3.5 w-3.5 text-gray-500" /> Download Certificate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* STANDARD LIST VIEW FOR ALL OTHER TABS */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <div 
                  key={doc.id} 
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-50 text-red-400 rounded-xl mt-0.5">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1B2559] hover:text-blue-600 cursor-pointer flex items-center gap-1.5">
                        {doc.name}
                      </h4>
                      <p className="text-xs font-semibold text-gray-400 mt-1 tracking-wide">
                        {doc.meta}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <span className={`px-4 py-1.5 rounded-xl font-bold text-xs tracking-wide shadow-sm min-w-[95px] text-center ${doc.tagColor}`}>
                      {doc.tag}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleDownloadCertificate(doc)}
                        title="Download File"
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Upload className="h-4 w-4 rotate-180" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDoc(doc.id)}
                        title="Delete Entry"
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-400 font-medium">
                No documents matched your filter parameters.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}