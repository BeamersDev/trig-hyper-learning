import { useNavigate } from 'react-router-dom';
import { BookOpen, FunctionSquare, BarChart3, BrainCircuit, Zap } from 'lucide-react';
import { chapters } from '../data/chapters';

const paths = [
  {
    icon: BookOpen,
    title: '从零开始',
    desc: '从单位圆出发，系统学习三角函数的基础概念与公式（第1-3章）',
    color: '#2b6cb0',
    to: '/chapter/1/1',
  },
  {
    icon: FunctionSquare,
    title: '反函数与双曲',
    desc: '三角方程、反三角函数、双曲函数及其恒等式（第4-5章）',
    color: '#dd6b20',
    to: '/chapter/4/1',
  },
  {
    icon: BarChart3,
    title: '微积分直通车',
    desc: '导数、积分、泰勒展开、欧拉公式的统一视角（第6-7章）',
    color: '#1a365d',
    to: '/chapter/6/1',
  },
  {
    icon: BrainCircuit,
    title: '随堂练习',
    desc: '97 道自测题 · 章节筛选 · 错题本',
    color: '#38a169',
    to: '/practice',
  },
  {
    icon: Zap,
    title: '解题助手',
    desc: '化简恒等式 · 求导 · 求值 · 分步推理',
    color: '#9333ea',
    to: '/solver',
  },
];

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="text-center py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a365d] mb-4">
          三角函数与双曲函数
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          交互式学习平台 · 从单位圆到欧拉公式，可视化探索三角函数与双曲函数的奥秘
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button
            onClick={() => navigate('/chapter/1/1')}
            className="px-6 py-2.5 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors font-medium"
          >
            开始学习 →
          </button>
          <button
            onClick={() => navigate('/practice')}
            className="px-6 py-2.5 bg-white text-[#2b6cb0] border border-[#2b6cb0] rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            自测练习
          </button>
        </div>
      </div>

      {/* Learning paths */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
        {paths.map((path) => (
          <button
            key={path.title}
            onClick={() => navigate(path.to)}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all p-5 text-left group"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: path.color + '15' }}
              >
                <path.icon size={22} style={{ color: path.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#1a365d] group-hover:text-[#2b6cb0] transition-colors text-sm">
                  {path.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{path.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Overview */}
      <div className="mt-12 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-[#1a365d] mb-4 text-center">课程概览</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => navigate(`/chapter/${ch.id}/1`)}
              className="bg-white rounded-lg border border-gray-200 p-3.5 text-left hover:shadow-sm transition-shadow"
            >
              <h3 className="font-semibold text-[#2b6cb0] text-sm mb-1">
                第{ch.id}章 · {ch.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {ch.sections.map((s) => s.title).join('、')}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-400">
          全部内容以 HTML5 Canvas 实现 · 8 个交互式可视化 · 97 道练习题 · KaTeX 公式渲染
        </p>
      </div>
    </div>
  );
}
