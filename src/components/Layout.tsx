import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';
import { chapters, type Section } from '../data/chapters';

const STORAGE_KEY = 'trig-hyper-progress';

function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr: string[] = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set(arr);
      }
    }
  } catch {
    // Ignore parse errors, fall through to empty set
  }
  return new Set<string>();
}

function saveProgress(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // Ignore storage errors (quota exceeded, etc.)
  }
}

const completedSections = loadProgress();

export function markCompleted(chapter: number, section: number) {
  completedSections.add(`${chapter}-${section}`);
  saveProgress(completedSections);
}

export function isCompleted(chapter: number, section: number): boolean {
  return completedSections.has(`${chapter}-${section}`);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPath = location.pathname;
  const match = currentPath.match(/^\/chapter\/(\d+)\/(\d+)/);
  const currentChapter = match ? parseInt(match[1]) : null;
  const currentSection = match ? parseInt(match[2]) : null;

  const handleNav = (section: Section) => {
    navigate(`/chapter/${section.chapter}/${section.section}`);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f7fafc' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-[#1a365d] text-white">
          <button onClick={() => { navigate('/'); setSidebarOpen(false); }} className="font-bold text-lg hover:text-orange-300 transition-colors">
            三角函数学习
          </button>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded">
            <X size={20} />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100vh-3.5rem)] sidebar-scroll py-2">
          {/* Home link */}
          <button
            onClick={() => { navigate('/'); setSidebarOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
              currentPath === '/' ? 'bg-blue-50 text-[#1a365d] font-semibold border-r-2 border-[#2b6cb0]' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            🏠 首页
          </button>

          {chapters.map((ch) => (
            <div key={ch.id} className="mt-1">
              <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                {ch.title}
              </div>
              {ch.sections.map((sec) => {
                const isActive = currentChapter === sec.chapter && currentSection === sec.section;
                const done = isCompleted(sec.chapter, sec.section);
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleNav(sec)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                      isActive
                        ? 'bg-blue-50 text-[#1a365d] font-semibold border-r-2 border-[#2b6cb0]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs"
                      style={{
                        borderColor: done ? '#2b6cb0' : isActive ? '#2b6cb0' : '#cbd5e0',
                        backgroundColor: done ? '#2b6cb0' : 'transparent',
                        color: done ? '#fff' : isActive ? '#2b6cb0' : '#94a3b8',
                      }}
                    >
                      {done ? '✓' : sec.section}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Practice link */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={() => { navigate('/practice'); setSidebarOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                currentPath === '/practice' ? 'bg-blue-50 text-[#1a365d] font-semibold border-r-2 border-[#2b6cb0]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              ✏️ 随堂练习
            </button>
            <button
              onClick={() => { navigate('/solver'); setSidebarOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                currentPath === '/solver' ? 'bg-blue-50 text-[#1a365d] font-semibold border-r-2 border-[#2b6cb0]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              🧮 解题助手
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 lg:hidden bg-white border-b border-gray-200 h-14 flex items-center px-4 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-700">
            <Menu size={22} />
          </button>
          <span className="ml-3 font-medium text-[#1a365d]">三角函数学习</span>
        </div>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>

        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-[#1a365d] text-white rounded-full shadow-lg hover:bg-[#2b6cb0] transition-all flex items-center justify-center"
            aria-label="回到顶部"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
