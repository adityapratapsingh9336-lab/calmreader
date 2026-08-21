import React, { useState } from 'react';
import {
  Search,
  Bell,
  GraduationCap,
  BookOpen,
  Award,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Layers,
  Sparkles,
  Zap,
  Briefcase,
  PenTool,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function AcademicDashboard({
  onOpenTracingStudio,
  onOpenNumberSense,
  onOpenMathStudio,
  onOpenSpeechModal,
  onOpenReader,
  onOpenPractice,
  onOpenAnalytics,
  onOpenDirectionTrainer,
}) {
  const [activeTabFilter, setActiveTabFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: 'tracing',
      title: 'Writing & Tracing Studio',
      subtitle: 'Advanced • 5 hours • Motor Memory & b/d Drills',
      icon: '✍️',
      iconBg: 'bg-cyan-500',
      progress: 30,
      status: 'In Progress',
      statusType: 'progress',
      action: onOpenTracingStudio,
    },
    {
      id: 'numbersense',
      title: 'Number Sense & Numerosity Lab',
      subtitle: 'Intermediate • 6 hours • 12 Cognitive Levels',
      icon: '🔢',
      iconBg: 'bg-indigo-500',
      progress: 70,
      status: 'In Progress',
      statusType: 'progress',
      action: onOpenNumberSense,
    },
    {
      id: 'math',
      title: 'Dyscalculia Math Studio',
      subtitle: 'Beginner • 3 hours • Base-10 CRA Blocks & Number Line',
      icon: '🧮',
      iconBg: 'bg-amber-500',
      progress: 100,
      status: 'Completed',
      statusType: 'completed',
      action: onOpenMathStudio,
    },
    {
      id: 'speech',
      title: 'Speech Reading & Phonics Coach',
      subtitle: 'Beginner • 7 hours • Groq Whisper-v3 Real-Time Feedback',
      icon: '🎤',
      iconBg: 'bg-slate-900',
      progress: 100,
      status: 'Completed',
      statusType: 'completed',
      action: onOpenSpeechModal,
    },
    {
      id: 'reader',
      title: 'Cognitive Reading Canvas & OCR',
      subtitle: 'Beginner • 8 hours • Anti-Crowding & Directional Anchors',
      icon: '📖',
      iconBg: 'bg-teal-600',
      progress: 100,
      status: 'Completed',
      statusType: 'completed',
      action: onOpenReader,
    },
  ];

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white p-6 lg:p-8 space-y-8 select-none">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100/60">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Home
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Welcome back to your personalized adaptive learning dashboard
          </p>
        </div>

        <div className="flex items-center gap-5">
          {/* Search Input */}
          <div className="relative hidden sm:block">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Notification Bell */}
          <button
            title="Notifications"
            className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 p-0.5 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Alesia K."
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hidden md:block text-left leading-tight">
              <p className="text-xs font-bold text-slate-800">Alesia K.</p>
              <p className="text-[10px] font-semibold text-slate-400">
                Basic Member
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left / Center Section (8 Cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Row of 3 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: Enrolled Courses */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal-600/10 text-teal-700 flex items-center justify-center font-bold">
                  <GraduationCap size={22} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">
                    24
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Enrolled Course
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenReader}
                className="text-xs font-semibold text-slate-400 hover:text-teal-700 flex items-center justify-between pt-3 border-t border-slate-100/80 transition-colors"
              >
                <span>View details</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 2: Lessons */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold">
                  <BookOpen size={22} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">
                    56
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Lesson
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenNumberSense}
                className="text-xs font-semibold text-slate-400 hover:text-indigo-700 flex items-center justify-between pt-3 border-t border-slate-100/80 transition-colors"
              >
                <span>View details</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 3: Certificates */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <Award size={22} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">
                    17
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Certificates
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenTracingStudio}
                className="text-xs font-semibold text-slate-400 hover:text-orange-600 flex items-center justify-between pt-3 border-t border-slate-100/80 transition-colors"
              >
                <span>View details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Middle Row: Hours Spend Graph & Lessons Progress */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Hours Spend Spline Graph Card (7 Cols) */}
            <div className="md:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-black text-slate-800 leading-none">
                    30
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Hours spend
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <span>This week</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              {/* Spline Wave Graph */}
              <div className="relative pt-6 pb-2">
                {/* SVG Curve */}
                <svg
                  viewBox="0 0 340 120"
                  className="w-full h-28 overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="teal-gradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area */}
                  <path
                    d="M 10 90 Q 60 70 100 85 T 180 35 T 260 75 T 330 65 L 330 115 L 10 115 Z"
                    fill="url(#teal-gradient)"
                  />

                  {/* Smooth Spline Stroke */}
                  <path
                    d="M 10 90 Q 60 70 100 85 T 180 35 T 260 75 T 330 65"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Dashed vertical indicator at Wednesday */}
                  <line
                    x1="180"
                    y1="35"
                    x2="180"
                    y2="115"
                    stroke="#0d9488"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Active Point Circle */}
                  <circle
                    cx="180"
                    cy="35"
                    r="5"
                    fill="#0d9488"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                </svg>

                {/* Floating 15 hour Tooltip Badge */}
                <div className="absolute top-1 left-[48%] -translate-x-1/2 bg-white border border-teal-600/30 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md shadow-teal-900/5 flex items-center gap-1">
                  <span>15 hour</span>
                </div>

                {/* Day Labels */}
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2 px-2">
                  <span>Sun</span>
                  <span className="text-slate-700 font-bold">Wed</span>
                  <span>Sat</span>
                </div>
              </div>
            </div>

            {/* Lessons Bar Chart Card (5 Cols) */}
            <div className="md:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-slate-800">Lessons</h4>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <span>This week</span>
                  <ChevronDown size={13} />
                </div>
              </div>

              {/* Total Quiz Metric */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xl font-black text-slate-800 leading-none">
                      126
                    </h5>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                      Total quiz
                    </p>
                  </div>
                  {/* Mini Teal Bar Group */}
                  <div className="flex items-end gap-1.5 h-10">
                    <div className="w-2 h-4 bg-teal-200 rounded-full" />
                    <div className="w-2 h-8 bg-teal-600 rounded-full" />
                    <div className="w-2 h-6 bg-teal-400 rounded-full" />
                    <div className="w-2 h-5 bg-teal-300 rounded-full" />
                    <div className="w-2 h-7 bg-teal-500 rounded-full" />
                    <div className="w-2 h-6 bg-teal-400 rounded-full" />
                  </div>
                </div>

                {/* Answers Metric */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <h5 className="text-xl font-black text-slate-800 leading-none">
                      67,5%
                    </h5>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                      Answers
                    </p>
                  </div>
                  {/* Mini Purple Bar Group */}
                  <div className="flex items-end gap-1.5 h-10">
                    <div className="w-2 h-3 bg-purple-200 rounded-full" />
                    <div className="w-2 h-6 bg-purple-400 rounded-full" />
                    <div className="w-2 h-8 bg-purple-600 rounded-full" />
                    <div className="w-2 h-7 bg-purple-500 rounded-full" />
                    <div className="w-2 h-5 bg-purple-300 rounded-full" />
                    <div className="w-2 h-6 bg-purple-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Continue Learning Course List */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-black text-slate-800">
                Continue Learning
              </h3>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search for courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/70 rounded-lg text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white w-44"
                  />
                </div>
                <button
                  onClick={onOpenReader}
                  className="text-xs font-bold text-slate-600 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/70 transition-colors"
                >
                  See All
                </button>
              </div>
            </div>

            {/* Courses Table Header */}
            <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5 border-b border-slate-100">
              <span className="col-span-6 sm:col-span-5">Course Name</span>
              <span className="col-span-3 sm:col-span-4">Progress</span>
              <span className="col-span-3 sm:col-span-3 text-right">Status</span>
            </div>

            {/* Courses Table Rows */}
            <div className="divide-y divide-slate-100/70">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={course.action}
                  className="grid grid-cols-12 items-center px-2 py-3.5 hover:bg-slate-50/80 rounded-xl transition-all cursor-pointer group"
                >
                  {/* Name Column */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3 pr-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm ${course.iconBg} text-white`}
                    >
                      {course.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors truncate">
                        {course.title}
                      </h4>
                      <p className="text-[10px] font-semibold text-slate-400 truncate">
                        {course.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Progress Column */}
                  <div className="col-span-3 sm:col-span-4 flex items-center gap-3 pr-3">
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          course.progress === 100
                            ? 'bg-teal-600'
                            : 'bg-teal-600'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 w-8 text-right shrink-0">
                      {course.progress}%
                    </span>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-3 sm:col-span-3 flex items-center justify-end gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md border flex items-center gap-1 ${
                        course.statusType === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}
                    >
                      {course.statusType === 'completed' ? '✓ ' : '⏳ '}
                      <span>{course.status}</span>
                    </span>
                    <ChevronRight
                      size={15}
                      className="text-slate-300 group-hover:text-teal-600 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Section (4 Cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Calendar Widget Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800">
                January 2024
              </h3>
              <div className="flex items-center gap-1 text-slate-400">
                <button className="p-1 hover:text-slate-700 rounded transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1 hover:text-slate-700 rounded transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Calendar Dates Row */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-700 items-center">
              <span>15</span>
              <span>16</span>
              <span>17</span>
              <span>18</span>
              <span className="w-7 h-7 mx-auto bg-teal-800 text-white rounded-full flex items-center justify-center shadow-md shadow-teal-900/20 font-extrabold">
                19
              </span>
              <span>20</span>
              <span>21</span>
            </div>

            {/* Today Schedule List */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Today
              </div>

              {/* Task 1 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                      Element of Design Test
                    </h5>
                    <p className="text-[10px] font-semibold text-slate-400">
                      10:00 - 11:00 AM
                    </p>
                  </div>
                </div>
                <MoreVertical size={15} className="text-slate-300" />
              </div>

              {/* Sat Jan 20 Header */}
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-2">
                Sat, Jan 20
              </div>

              {/* Task 2 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                      Design Principle Test
                    </h5>
                    <p className="text-[10px] font-semibold text-slate-400">
                      10:00 - 11:00 AM
                    </p>
                  </div>
                </div>
                <MoreVertical size={15} className="text-slate-300" />
              </div>

              {/* Task 3 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                      Prepare Job Interview
                    </h5>
                    <p className="text-[10px] font-semibold text-slate-400">
                      09:00 - 10:30 AM
                    </p>
                  </div>
                </div>
                <MoreVertical size={15} className="text-slate-300" />
              </div>
            </div>
          </div>

          {/* Assessment Banner Card (Peach / Coral) */}
          <div
            onClick={onOpenPractice}
            className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#fed7aa]/50 via-[#ffedd5]/40 to-[#ffedd5] border border-orange-200/50 shadow-sm cursor-pointer group hover:scale-[1.01] transition-transform"
          >
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600/80">
                ASSESSMENT
              </span>
              <h4 className="text-lg font-black text-slate-900 leading-tight">
                Principle of Design
              </h4>
              <p className="text-xs font-medium text-slate-600">
                Intermediate • 25 questions
              </p>
            </div>

            {/* Geometric Subtle Background Overlay */}
            <div className="absolute right-0 bottom-0 w-32 h-32 opacity-15 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="70" cy="70" r="50" fill="#ea580c" />
                <rect x="20" y="20" width="60" height="60" rx="10" fill="#f97316" />
              </svg>
            </div>
          </div>

          {/* Pro Banner Card (Lavender / Violet) */}
          <div
            onClick={onOpenAnalytics}
            className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#ede9fe]/70 via-[#f5f3ff]/50 to-[#f5f3ff] border border-purple-200/50 shadow-sm cursor-pointer group hover:scale-[1.01] transition-transform"
          >
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-600/80">
                PRO
              </span>
              <h4 className="text-lg font-black text-slate-900 leading-tight">
                Premium Member
              </h4>
              <p className="text-xs font-medium text-slate-600">
                Unlimited access to all learning content
              </p>
            </div>

            {/* Geometric Subtle Background Overlay */}
            <div className="absolute right-0 bottom-0 w-32 h-32 opacity-15 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="60" cy="60" r="45" fill="#7c3aed" />
                <path d="M10 90 Q 50 10 90 90 Z" fill="#8b5cf6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
