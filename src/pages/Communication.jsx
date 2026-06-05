import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Megaphone, 
  User, 
  Calendar, 
  Clock, 
  Plus,
  CheckCircle2,
  AlertTriangle,
  Info,
  Radio,
  Mail,
  MessageSquare,
  Users,
  Send,
  TrendingUp
} from 'lucide-react';

export default function Communication() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState('Announcements');
  
  // Modal PopUp State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Announcement Form input states
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('Everyone');
  const [priority, setPriority] = useState('Medium');
  const [content, setContent] = useState('');
  const [publishOption, setPublishOption] = useState('Publish Now');

  // Broadcast Form States
  const [selectedChannel, setSelectedChannel] = useState('Email');
  const [selectedGroup, setSelectedGroup] = useState('All Students');
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Dynamic Broadcast Counters State
  const [broadcastStats, setBroadcastStats] = useState({
    recipients: 512,
    totalSent: 807,
    emailCount: 3,
    smsCount: 1
  });

  // Announcements Dataset
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Annual sports Day 2026",
      priority: "High",
      status: "Published",
      content: "We are excited to announce our annual sports day on April 25th, All students are encouraged to participate in atleast one event. Practice Sessions start from Monday.",
      audience: "Everyone",
      date: "2026-04-10",
      author: "principal Johnson",
      expires: "Expires 2026-04-25"
    },
    {
      id: 2,
      title: "Parent teacher conference schedule",
      priority: "Medium",
      status: "Published",
      content: "The parent teacher conference is scheduled for April 20th. Please book your slot via the parent portal. Sessions run from 9AM to 5PM.",
      audience: "Parent, Staff",
      date: "2026-04-08",
      author: "Admin office",
      expires: ""
    },
    {
      id: 3,
      title: "Library Book Return Reminder",
      priority: "Low",
      status: "Published",
      content: "All borrowed library books must be returned before the upcoming examination week to avoid late fines. Check your accounts for due dates.",
      audience: "Student",
      date: "2026-04-05",
      author: "Library staff",
      expires: ""
    }
  ]);

  // Notifications Dataset
  const notificationsData = [
    {
      timeframe: "Today",
      items: [
        { id: 101, type: "success", title: "New Admission Request", desc: "A new admission request has been submitted for Grade 5", time: "08.30AM" },
        { id: 102, type: "warning", title: "Fee payment overdue", desc: "12 students have overdue fee payments", time: "07.15AM" },
        { id: 103, type: "warning", title: "Attendance Alert", desc: "Attendance below 75% for 5 students this week.", time: "09.00AM" }
      ]
    },
    {
      timeframe: "Yesterday",
      items: [
        { id: 104, type: "info", title: "System update", desc: "System maintenance successfully completed over night.", time: "11:30 PM" },
        { id: 105, type: "info", title: "New exam schedule posted", desc: "Final exam timetables are now public.", time: "03:45 PM" }
      ]
    }
  ];

  const groupCounts = {
    'All Students': 512,
    'All Parents': 248,
    'All Staff': 47,
    'Specific Class': 32
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastSubject.trim() || !broadcastMessage.trim()) return;

    const countToSend = groupCounts[selectedGroup] || 0;

    setBroadcastStats(prev => {
      const isEmail = selectedChannel === 'Email' || selectedChannel === 'Email & SMS';
      const isSms = selectedChannel === 'SMS' || selectedChannel === 'Email & SMS';

      return {
        recipients: countToSend,
        totalSent: prev.totalSent + countToSend,
        emailCount: isEmail ? prev.emailCount + 1 : prev.emailCount,
        smsCount: isSms ? prev.smsCount + 1 : prev.smsCount
      };
    });

    setBroadcastSubject('');
    setBroadcastMessage('');
    alert(`Broadcast sent via ${selectedChannel} channel to ${selectedGroup}!`);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    
    const newAnnouncement = {
      id: Date.now(),
      title,
      priority: priority || 'Medium',
      status: "Published",
      content,
      audience,
      date: new Date().toISOString().split('T')[0],
      author: "Sarah Johnson", 
      expires: ""
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    
    setTitle('');
    setContent('');
    setPriority('Medium');
    setAudience('Everyone');
    setIsModalOpen(false);
  };

  const getPriorityStyles = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return { border: 'border-l-[6px] border-l-red-500', badge: 'bg-red-100 text-red-600' };
      case 'medium': return { border: 'border-l-[6px] border-l-orange-500', badge: 'bg-orange-100 text-orange-600' };
      default: return { border: 'border-l-[6px] border-l-slate-400', badge: 'bg-slate-100 text-slate-600' };
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': 
        return <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><CheckCircle2 size={22} /></div>
      case 'warning': 
        return <div className="p-2 bg-amber-50 rounded-xl text-amber-500"><AlertTriangle size={22} /></div>
      default: 
        return <div className="p-2 bg-sky-50 rounded-xl text-sky-500"><Info size={22} /></div>
    }
  };

  return (
    /* Removed overflow-hidden and h-screen from the parent layout to allow full-page native scrolling */
    <div className="flex-1 flex flex-col min-h-screen bg-[#f5fbf9] text-gray-900 font-sans">
      
      {/* --- TOP SEARCH BAR --- */}
      <header className="bg-white px-10 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-40 shadow-xs">
        <div className="w-3/5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search......./" 
            className="w-full pl-11 pr-4 py-2 bg-gray-100 rounded-full text-sm border border-transparent focus:bg-white focus:border-gray-200 outline-none transition"
          />
        </div>
        <div className="flex items-center gap-5">
          <Bell className="text-gray-600 cursor-pointer hover:text-gray-900 transition" size={20} />
          <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
              alt="avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT CANVAS --- */}
      <main className="flex-1 p-10 flex flex-col">
        
        {/* Title / Action Header section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Communication</h1>
            <p className="text-gray-500 text-sm mt-0.5">Announcements, notifications and broadcasts</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2563eb] text-white hover:bg-[#1d4ed8] font-semibold text-sm px-5 py-2.5 rounded-full shadow-md transition flex items-center gap-1.5"
          >
            <Plus size={16} /> New Announcement
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="inline-flex bg-gray-200/70 p-1 rounded-full gap-1 mb-8 self-start">
          <button 
            onClick={() => setActiveTab('Announcements')}
            className={`font-semibold text-sm px-6 py-2 rounded-full flex items-center gap-2 transition ${
              activeTab === 'Announcements' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Megaphone size={16} /> Announcements
          </button>
          <button 
            onClick={() => setActiveTab('Notifications')}
            className={`font-semibold text-sm px-6 py-2 rounded-full flex items-center gap-2 transition ${
              activeTab === 'Notifications' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell size={16} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('Broadcast')}
            className={`font-semibold text-sm px-6 py-2 rounded-full flex items-center gap-2 transition ${
              activeTab === 'Broadcast' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Radio size={16} /> Broadcast
          </button>
        </div>

        {/* --- VIEW ROUTER VIEWS (Height limits and inner scrollbars removed) --- */}
        <div className="w-full">
          
          {/* --- ANNOUNCEMENTS TAB --- */}
          {activeTab === 'Announcements' && (
            <div className="flex flex-col gap-4">
              {announcements.map((item) => {
                const styles = getPriorityStyles(item.priority);
                return (
                  /* Set height to auto and overflow to visible so it naturally expands text down without scrolling */
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-2xl p-6 shadow-xs border border-gray-150/80 transition-all duration-200 h-auto overflow-visible ${styles.border}`}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles.badge}`}>{item.priority}</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
                      {item.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-6 text-gray-400 text-xs items-center border-t border-gray-50 pt-3">
                      <div className="flex items-center gap-1.5"><User size={14} /> {item.audience}</div>
                      <div className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</div>
                      <div>By {item.author}</div>
                      {item.expires && (
                        <div className="flex items-center gap-1.5 text-slate-400"><Clock size={14} /> {item.expires}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* --- NOTIFICATIONS TAB --- */}
          {activeTab === 'Notifications' && (
            <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-xs flex flex-col gap-8 h-auto overflow-visible">
              {notificationsData.map((group) => (
                <div key={group.timeframe} className="flex flex-col">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{group.timeframe}</h2>
                  <div className="flex flex-col border-b border-gray-100 last:border-b-0 pb-2 last:pb-0 gap-5">
                    {group.items.map((notif) => (
                      <div key={notif.id} className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          {getNotificationIcon(notif.type)}
                          <div className="flex flex-col gap-0.5">
                            <h4 className="text-base font-bold text-gray-900 tracking-tight">{notif.title}</h4>
                            <p className="text-sm text-gray-400 font-medium leading-normal">{notif.desc}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-500 whitespace-nowrap pt-1 pl-4">
                          {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- BROADCAST TAB --- */}
          {activeTab === 'Broadcast' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start h-auto overflow-visible">
              
              {/* Left Column Form */}
              <div className="lg:col-span-2 bg-white rounded-[28px] p-8 border border-gray-100 shadow-xs flex flex-col">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-6">
                  <Radio size={20} className="text-gray-900" />
                  <h2>Send Broadcast</h2>
                </div>

                <form onSubmit={handleSendBroadcast} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-bold text-sm text-gray-900">Broadcast channel</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { name: 'Email', icon: <Mail size={16} />, desc: 'Send rich HTML email to selected groups.' },
                        { name: 'SMS', icon: <MessageSquare size={16} />, desc: 'Send SMS to registered phone numbers' },
                        { name: 'Email & SMS', icon: <Radio size={16} />, desc: 'Multi channel broadcast to maximum reach' }
                      ].map(ch => (
                        <div 
                          key={ch.name}
                          onClick={() => setSelectedChannel(ch.name)}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition flex flex-col gap-1.5 ${
                            selectedChannel === ch.name 
                              ? 'border-blue-500 bg-blue-50/20' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className={`flex items-center gap-1.5 font-bold text-sm ${selectedChannel === ch.name ? 'text-blue-600' : 'text-gray-700'}`}>
                            {ch.icon} {ch.name}
                          </div>
                          <p className="text-xs text-gray-400 font-medium leading-normal">{ch.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-bold text-sm text-gray-900">Recipient Group</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { name: 'All Students', total: '512' },
                        { name: 'All Parents', total: '248' },
                        { name: 'All Staff', total: '47' },
                        { name: 'Specific Class', total: '32' }
                      ].map(grp => (
                        <div 
                          key={grp.name}
                          onClick={() => setSelectedGroup(grp.name)}
                          className={`px-4 py-3 rounded-xl border flex justify-between items-center cursor-pointer transition ${
                            selectedGroup === grp.name 
                              ? 'border-blue-500 bg-blue-50/10 font-semibold' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Users size={16} className="text-gray-400" />
                            {grp.name}
                          </div>
                          <span className="text-sm font-bold text-gray-700">{grp.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-gray-900">Subject</label>
                    <input 
                      type="text"
                      value={broadcastSubject}
                      onChange={(e) => setBroadcastSubject(e.target.value)}
                      placeholder="Eg Term 2 Fee Reminder"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-gray-900">Message</label>
                    <textarea 
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      placeholder="Write your message........."
                      required
                      className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500 resize-none font-medium"
                    />
                  </div>

                  <div className="flex justify-center mt-2">
                    <button 
                      type="submit"
                      className="bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition"
                    >
                      <Send size={15} /> Send Broadcast
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column Statistics Panel */}
              <div className="bg-white rounded-[28px] p-8 border border-gray-100 shadow-xs flex flex-col gap-6">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                  <Radio size={20} />
                  <h2>Stats Broadcast</h2>
                </div>

                <div className="bg-emerald-50/30 border border-l-[6px] border-l-emerald-500 rounded-2xl p-5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-100/60 rounded-xl text-emerald-600">
                    <Users size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-gray-900">{broadcastStats.recipients}+</span>
                    <span className="text-xs font-semibold text-gray-400">Recipients</span>
                  </div>
                </div>

                <div className="bg-blue-50/20 border border-l-[6px] border-l-blue-600 rounded-2xl p-5 flex items-center gap-4">
                  <div className="p-3 bg-blue-100/60 rounded-xl text-blue-600">
                    <TrendingUp size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-gray-900">{broadcastStats.totalSent}</span>
                    <span className="text-xs font-semibold text-gray-400">Total Sent</span>
                  </div>
                </div>

                <div className="bg-purple-50/20 border border-l-[6px] border-l-purple-500 rounded-2xl p-5 flex items-center gap-4">
                  <div className="p-3 bg-purple-100/60 rounded-xl text-purple-500">
                    <Mail size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-gray-900">{broadcastStats.emailCount}</span>
                    <span className="text-xs font-semibold text-gray-400">Email Counts</span>
                  </div>
                </div>

                <div className="bg-amber-50/20 border border-l-[6px] border-l-amber-500 rounded-2xl p-5 flex items-center gap-4">
                  <div className="p-3 bg-amber-100/60 rounded-xl text-amber-500">
                    <MessageSquare size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-gray-900">{broadcastStats.smsCount}</span>
                    <span className="text-xs font-semibold text-gray-400">SMS Counts</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* --- POPUP MODAL PANEL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
          <div className="bg-[#f0fdfa] w-full max-w-xl rounded-[24px] shadow-2xl p-6 border border-gray-200 max-h-[90vh] flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex-shrink-0">Create Announcement</h2>
            
            <form onSubmit={handlePublish} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 max-h-[60vh]">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-xs text-gray-700">Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Eg sports day" 
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-xs text-gray-700">Target Audience</label>
                    <select 
                      value={audience} 
                      onChange={(e) => setAudience(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-blue-500 transition"
                    >
                      <option value="Everyone">Everyone</option>
                      <option value="Parent, Staff">Parent, Staff</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-xs text-gray-700">Priority</label>
                    <input 
                      type="text" 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      placeholder="Medium, high......" 
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-xs text-gray-700">Content</label>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your announcement content here..." 
                    required
                    className="w-full h-24 px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-xs text-gray-700">Publish Time</label>
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setPublishOption('Publish Now')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${
                        publishOption === 'Publish Now' 
                          ? 'bg-white border-slate-300 font-semibold text-gray-900 shadow-xs' 
                          : 'bg-white/50 text-gray-500 border-slate-200'
                      }`}
                    >
                      Publish Now
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPublishOption('Schedule')}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition flex items-center justify-center gap-1.5 ${
                        publishOption === 'Schedule' 
                          ? 'bg-white border-slate-300 font-semibold text-gray-900 shadow-xs' 
                          : 'bg-white/50 text-gray-500 border-slate-200'
                      }`}
                    >
                      Schedule <Calendar size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-gray-200/60 flex-shrink-0">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-1.5 rounded-full text-sm font-semibold border border-blue-500 bg-white text-gray-900 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-1.5 rounded-full text-sm font-semibold bg-[#4338ca] text-white hover:bg-[#312e81] transition"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}