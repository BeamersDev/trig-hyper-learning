import { useState, useEffect } from 'react';
import { questions, type Question } from '../data/questions';
import { chapters } from '../data/chapters';
import MathFormula from '../components/MathFormula';

function getSectionTitle(ch: number, sec: number): string {
  const chapter = chapters.find(c => c.id === ch);
  const section = chapter?.sections.find(s => s.section === sec);
  return section?.title || `第${sec}节`;
}

function getChapterTitle(ch: number): string {
  const chapter = chapters.find(c => c.id === ch);
  return chapter?.title || `第${ch}章`;
}

type QuizMode = 'normal' | 'wrong';

export default function PracticePage() {
  const [mode, setMode] = useState<QuizMode>('normal');
  const [filtered, setFiltered] = useState<Question[]>(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [chapterFilter, setChapterFilter] = useState<number>(0);
  const [results, setResults] = useState<Record<number, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('trig-hyper-quiz') || '{}');
    } catch { return {}; }
  });

  const persistResults = (r: Record<number, boolean>) => {
    setResults(r);
    try { localStorage.setItem('trig-hyper-quiz', JSON.stringify(r)); } catch {}
  };

  // Compute wrong count from ALL questions
  const wrongCount = questions.filter(q => results[q.id] === false).length;

  const rebuildFiltered = () => {
    if (mode === 'wrong') {
      setFiltered(questions.filter(q => results[q.id] === false));
    } else if (chapterFilter === 0) {
      setFiltered(questions);
    } else {
      setFiltered(questions.filter(q => q.chapter === chapterFilter));
    }
  };

  // Rebuild filtered when mode or chapter changes — reset index
  useEffect(() => {
    rebuildFiltered();
    setCurrentIndex(0);
    setSelected(null);
    setShowResult(false);
  }, [mode, chapterFilter]);

  // Rebuild filtered when results change (wrong-mode shrinking) — reset state in wrong mode
  useEffect(() => {
    rebuildFiltered();
    if (mode === 'wrong') {
      setSelected(null);
      setShowResult(false);
    }
  }, [results]);

  const current = filtered[currentIndex];
  const total = filtered.length;

  // Clamp currentIndex when list shrinks (e.g., wrong answer corrected)
  useEffect(() => {
    if (total > 0 && currentIndex >= total) {
      setCurrentIndex(total - 1);
    }
  }, [total, currentIndex]);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    persistResults({ ...results, [current.id]: idx === current.correct });
  };

  const next = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const correctCount = filtered.filter(q => results[q.id] === true).length;
  const answeredCount = filtered.filter(q => results[q.id] !== undefined).length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1a365d] mb-2">✏️ 随堂练习</h2>
      <p className="text-gray-500 text-sm mb-6">选择章节筛选题目，检验你的学习成果</p>

      {/* Mode toggle tabs */}
      <div className="flex gap-0 mb-6">
        <button
          onClick={() => setMode('normal')}
          className={`px-4 py-2 text-sm font-medium rounded-l-lg border transition-colors ${
            mode === 'normal'
              ? 'bg-[#1a365d] text-white border-[#1a365d]'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          📝 答题模式
        </button>
        <button
          onClick={() => setMode('wrong')}
          className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-l-0 transition-colors relative ${
            mode === 'wrong'
              ? 'bg-[#dd6b20] text-white border-[#dd6b20]'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          📕 错题本
          {wrongCount > 0 && (
            <span className={`ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs rounded-full ${
              mode === 'wrong'
                ? 'bg-white/25 text-white'
                : 'bg-[#dd6b20] text-white'
            }`}>
              {wrongCount}
            </span>
          )}
        </button>
      </div>

      {/* Chapter filter — only in normal mode */}
      {mode === 'normal' && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setChapterFilter(0)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              chapterFilter === 0 ? 'bg-[#2b6cb0] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部 ({questions.length}题)
          </button>
          {chapters.map(ch => (
            <button
              key={ch.id}
              onClick={() => setChapterFilter(ch.id)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                chapterFilter === ch.id ? 'bg-[#2b6cb0] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              第{ch.id}章 {ch.title} ({questions.filter(q => q.chapter === ch.id).length}题)
            </button>
          ))}
        </div>
      )}

      {/* Stats */}
      {answeredCount > 0 && (
        <div className="text-sm text-gray-500 mb-4">
          已答 {answeredCount}/{total} 题，正确率：{answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%
        </div>
      )}

      {total === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {mode === 'wrong' ? (
            <>
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-lg font-medium text-gray-600 mb-1">没有错题了！</p>
              <p className="text-sm">你已答对所有题目，太棒了！</p>
            </>
          ) : (
            '该章节暂无题目'
          )}
        </div>
      ) : current ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-400">
              第 {currentIndex + 1}/{total} 题
            </span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2b6cb0] rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-4">
            <span className="text-xs text-[#2b6cb0] font-medium bg-blue-50 px-2 py-0.5 rounded">
              {getChapterTitle(current.chapter)} · {getSectionTitle(current.chapter, current.section)}
            </span>
          </div>
          <p className="text-lg font-medium text-gray-900 mb-6">{current.question}</p>

          {/* Options */}
          <div className="space-y-2">
            {current.options.map((opt, idx) => {
              let bg = 'bg-gray-50 hover:bg-gray-100 border-gray-200';
              let textColor = 'text-gray-900';
              let indicator = '';

              if (showResult) {
                if (idx === current.correct) {
                  bg = 'bg-green-50 border-green-400';
                  textColor = 'text-green-800';
                  indicator = '✓';
                } else if (idx === selected) {
                  bg = 'bg-red-50 border-red-400';
                  textColor = 'text-red-800';
                  indicator = '✗';
                }
              } else if (idx === selected) {
                bg = 'bg-blue-50 border-blue-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-4 py-3 border rounded-lg transition-colors flex items-center gap-3 ${bg} ${textColor}`}
                  disabled={showResult}
                >
                  <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-sm flex-shrink-0 ${
                    showResult && idx === current.correct
                      ? 'bg-green-500 text-white border-green-500'
                      : showResult && idx === selected
                      ? 'bg-red-500 text-white border-red-500'
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {indicator || String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`mt-4 p-4 rounded-lg ${
              selected === current.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-sm font-medium mb-1">
                {selected === current.correct ? '✅ 回答正确！' : '❌ 回答错误'}
              </p>
              <p className="text-sm text-gray-700">{current.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← 上一题
            </button>
            <button
              onClick={next}
              disabled={currentIndex === total - 1}
              className="px-4 py-2 text-sm rounded-md bg-[#2b6cb0] text-white hover:bg-[#1a365d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              下一题 →
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
