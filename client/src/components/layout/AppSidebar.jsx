import React from 'react';
import {
  Home,
  Bookmark,
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  FolderOpen,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Moon,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function AppSidebar({
  currentSection,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
}) {
  return (
    <aside className="w-[260px] bg-white border-r border-slate-100 flex flex-col justify-between h-full p-6 shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center justify-between mb-8 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">❄</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                Academic
              </h1>
              <span className="text-[10px] font-semibold text-teal-600 tracking-wide uppercase">
                LexiSight AI
              </span>
            </div>
          </div>

          <button
            title="Expand / Minimize"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <LogOut size={16} className="rotate-180" />
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="space-y-6">
          {/* Main Group */}
          <div className="space-y-1">
            <SidebarItem
              icon={<Home size={19} />}
              label="Home Dashboard"
              active={currentSection === 'dashboard'}
              onClick={() => onNavigate('dashboard')}
            />
            <SidebarItem
              icon={<Sparkles size={19} />}
              label="Hero Showcase"
              active={currentSection === 'hero'}
              onClick={() => onNavigate('hero')}
            />
            <SidebarItem
              icon={<Bookmark size={19} />}
              label="Bookmarks"
              active={currentSection === 'bookmarks'}
              onClick={() => onNavigate('bookmarks')}
            />
          </div>

          {/* Learning & Modules Group */}
          <div className="space-y-1 pt-2 border-t border-slate-100/80">
            <SidebarItem
              icon={<BookOpen size={19} />}
              label="Courses"
              active={currentSection === 'courses'}
              onClick={() => onNavigate('courses')}
            />
            <SidebarItem
              icon={<GraduationCap size={19} />}
              label="Tutorials"
              active={currentSection === 'tutorials'}
              onClick={() => onNavigate('tutorials')}
            />
            <SidebarItem
              icon={<Sparkles size={19} />}
              label="Best Practices"
              active={currentSection === 'practices'}
              onClick={() => onNavigate('practices')}
            />
            <SidebarItem
              icon={<Award size={19} />}
              label="Certifications"
              active={currentSection === 'certifications'}
              onClick={() => onNavigate('certifications')}
            />
          </div>

          {/* Resources & Community Group */}
          <div className="space-y-1 pt-2 border-t border-slate-100/80">
            <SidebarItem
              icon={<FolderOpen size={19} />}
              label="Resources"
              active={currentSection === 'reader'}
              onClick={() => onNavigate('reader')}
            />
            <SidebarItem
              icon={<Calendar size={19} />}
              label="Events"
              active={currentSection === 'events'}
              onClick={() => onNavigate('events')}
            />
            <SidebarItem
              icon={<Users size={19} />}
              label="Community"
              active={currentSection === 'community'}
              onClick={() => onNavigate('community')}
            />
          </div>
        </nav>
      </div>

      {/* Footer Nav & Settings */}
      <div className="space-y-2 pt-4 border-t border-slate-100">
        <SidebarItem
          icon={<Settings size={19} />}
          label="Setting"
          active={currentSection === 'settings'}
          onClick={() => onNavigate('settings')}
        />
        <SidebarItem
          icon={<HelpCircle size={19} />}
          label="Help Center"
          active={currentSection === 'help'}
          onClick={() => onNavigate('help')}
        />

        {/* Dark Mode Switcher */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
            <Moon size={19} />
            <span>Dark Mode</span>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`w-10 h-5 rounded-full transition-colors relative p-0.5 focus:outline-none ${
              isDarkMode ? 'bg-teal-600' : 'bg-slate-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                isDarkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left group ${
        active
          ? 'bg-teal-50/80 text-teal-800 font-bold shadow-sm'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
    >
      <span
        className={`transition-colors ${
          active ? 'text-teal-700' : 'text-slate-400 group-hover:text-slate-600'
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {active && (
        <div className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
      )}
    </button>
  );
}
