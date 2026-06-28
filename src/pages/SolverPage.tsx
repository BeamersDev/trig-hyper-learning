import { useState } from 'react';
import { Link } from 'react-router-dom';
import MathFormula from '../components/MathFormula';

interface SolverResult {
  type: 'identity' | 'derivative' | 'evaluate' | 'simplify' | 'unknown';
  input: string;
  result: string;
  explanation: string;
  steps: string[];
  relatedChapter?: { label: string; to: string };
}

// Parse the input expression and return a result
function solve(input: string): SolverResult {
  const expr = input.trim().replace(/\s+/g, '');

  // === sin²x + cos²x = 1 ===
  const pythagMatch = expr.match(
    /^(?:sin|sen)\s*\^?\s*2\s*[xθαβa-zA-Z]\s*\+\s*(?:cos)\s*\^?\s*2\s*[xθαβa-zA-Z]$/
  ) || expr.match(/^sin\^2\(?([xθαβa-zA-Z])\)?\s*\+\s*cos\^2\(?\1\)?$/);
  if (
    pythagMatch ||
    expr.match(/^(?:sin\^2|sin²)\s*[xθαβ]\s*\+\s*(?:cos\^2|cos²)\s*[xθαβ]$/) ||
    expr === 'sin²x+cos²x' || expr === 'sin^2(x)+cos^2(x)' || expr === 'sin^2x+cos^2x' ||
    expr === 'sin²θ+cos²θ' || expr === 'sin^2θ+cos^2θ'
  ) {
    return {
      type: 'identity',
      input: expr,
      result: '1',
      explanation: '这是三角函数中最基本的恒等式 —— 勾股恒等式（Pythagorean Identity）。它的几何意义是：在单位圆上，任意角度对应的点 (cos θ, sin θ) 到原点的距离恒为 1。',
      steps: [
        '识别表达式：sin²x + cos²x',
        '应用勾股恒等式：sin²x + cos²x = 1',
        '结果：1',
      ],
      relatedChapter: { label: '第3章 §3.2 同角关系', to: '/chapter/3/2' },
    };
  }

  // === sin(a±b) expansion ===
  const sinSumMatch = expr.match(/^sin\(([a-zA-Zαβ])\s*\+\s*([a-zA-Zαβ])\)$/);
  const sinDiffMatch = expr.match(/^sin\(([a-zA-Zαβ])\s*-\s*([a-zA-Zαβ])\)$/);
  if (sinSumMatch) {
    const a = sinSumMatch[1];
    const b = sinSumMatch[2];
    const result = `sin ${a} cos ${b} + cos ${a} sin ${b}`;
    return {
      type: 'identity',
      input: expr,
      result,
      explanation: `这是两角和的正弦公式。sin(${a}+${b}) 展开为 sin ${a} cos ${b} + cos ${a} sin ${b}。`,
      steps: [
        `识别表达式：sin(${a}+${b})`,
        `应用和角公式：sin(${a}+${b}) = sin ${a} cos ${b} + cos ${a} sin ${b}`,
        `结果：${result}`,
      ],
      relatedChapter: { label: '第3章 §3.3 和差角公式', to: '/chapter/3/3' },
    };
  }
  if (sinDiffMatch) {
    const a = sinDiffMatch[1];
    const b = sinDiffMatch[2];
    const result = `sin ${a} cos ${b} - cos ${a} sin ${b}`;
    return {
      type: 'identity',
      input: expr,
      result,
      explanation: `这是两角差的正弦公式。sin(${a}-${b}) 展开为 sin ${a} cos ${b} - cos ${a} sin ${b}。`,
      steps: [
        `识别表达式：sin(${a}-${b})`,
        `应用差角公式：sin(${a}-${b}) = sin ${a} cos ${b} - cos ${a} sin ${b}`,
        `结果：${result}`,
      ],
      relatedChapter: { label: '第3章 §3.3 和差角公式', to: '/chapter/3/3' },
    };
  }

  // === cos(a±b) expansion ===
  const cosSumMatch = expr.match(/^cos\(([a-zA-Zαβ])\s*\+\s*([a-zA-Zαβ])\)$/);
  const cosDiffMatch = expr.match(/^cos\(([a-zA-Zαβ])\s*-\s*([a-zA-Zαβ])\)$/);
  if (cosSumMatch) {
    const a = cosSumMatch[1];
    const b = cosSumMatch[2];
    const result = `cos ${a} cos ${b} - sin ${a} sin ${b}`;
    return {
      type: 'identity',
      input: expr,
      result,
      explanation: `这是两角和的余弦公式。cos(${a}+${b}) 展开为 cos ${a} cos ${b} - sin ${a} sin ${b}。注意中间是减号，与正弦公式不同。`,
      steps: [
        `识别表达式：cos(${a}+${b})`,
        `应用和角公式：cos(${a}+${b}) = cos ${a} cos ${b} - sin ${a} sin ${b}`,
        `结果：${result}`,
      ],
      relatedChapter: { label: '第3章 §3.3 和差角公式', to: '/chapter/3/3' },
    };
  }
  if (cosDiffMatch) {
    const a = cosDiffMatch[1];
    const b = cosDiffMatch[2];
    const result = `cos ${a} cos ${b} + sin ${a} sin ${b}`;
    return {
      type: 'identity',
      input: expr,
      result,
      explanation: `这是两角差的余弦公式。cos(${a}-${b}) 展开为 cos ${a} cos ${b} + sin ${a} sin ${b}。注意中间是加号。`,
      steps: [
        `识别表达式：cos(${a}-${b})`,
        `应用差角公式：cos(${a}-${b}) = cos ${a} cos ${b} + sin ${a} sin ${b}`,
        `结果：${result}`,
      ],
      relatedChapter: { label: '第3章 §3.3 和差角公式', to: '/chapter/3/3' },
    };
  }

  // === sin(2x) ===
  const sin2xMatch = expr.match(/^sin\(2\s*([a-zA-Zαβxθ])\)$/);
  if (sin2xMatch) {
    const v = sin2xMatch[1];
    return {
      type: 'identity',
      input: expr,
      result: `2 sin ${v} cos ${v}`,
      explanation: `这是二倍角正弦公式。sin(2${v}) = 2 sin ${v} cos ${v}。它可以从和角公式 sin(${v}+${v}) 直接推出。`,
      steps: [
        `识别表达式：sin(2${v})`,
        `应用二倍角公式：sin(2${v}) = 2 sin ${v} cos ${v}`,
        `结果：2 sin ${v} cos ${v}`,
      ],
      relatedChapter: { label: '第3章 §3.4 倍角/半角公式', to: '/chapter/3/4' },
    };
  }

  // === cos(2x) ===
  const cos2xMatch = expr.match(/^cos\(2\s*([a-zA-Zαβxθ])\)$/);
  if (cos2xMatch) {
    const v = cos2xMatch[1];
    return {
      type: 'identity',
      input: expr,
      result: `cos²${v} - sin²${v}`,
      explanation: `这是二倍角余弦公式。cos(2${v}) = cos²${v} - sin²${v} = 2cos²${v} - 1 = 1 - 2sin²${v}（三种等价形式）。`,
      steps: [
        `识别表达式：cos(2${v})`,
        `应用二倍角公式：cos(2${v}) = cos²${v} - sin²${v}`,
        `等价形式：= 2cos²${v} - 1 = 1 - 2sin²${v}`,
        `结果：cos²${v} - sin²${v}`,
      ],
      relatedChapter: { label: '第3章 §3.4 倍角/半角公式', to: '/chapter/3/4' },
    };
  }

  // === Derivatives ===
  const derivMatch = expr.match(/^d\/dx\s*(?:of\s*)?(sin|cos|tan|cot|sec|csc|sinh|cosh|tanh)\s*(?:\(?([xθαβa-zA-Z])\)?)?$/i);
  const altDerivMatch = expr.match(/^derivative\s+of\s+(sin|cos|tan|cot|sec|csc|sinh|cosh|tanh)/i);
  const dMatch = derivMatch || altDerivMatch;

  if (dMatch) {
    const func = dMatch[1].toLowerCase();
    const derivMap: Record<string, string> = {
      sin: 'cos x',
      cos: '-sin x',
      tan: 'sec² x',
      cot: '-csc² x',
      sec: 'sec x tan x',
      csc: '-csc x cot x',
      sinh: 'cosh x',
      cosh: 'sinh x',
      tanh: 'sech² x',
    };
    const result = derivMap[func] || '未知';
    return {
      type: 'derivative',
      input: expr,
      result: `d/dx(${func} x) = ${result}`,
      explanation: `这是 ${func} 函数对 x 的导数。这些基本导数公式是微积分的基础。三角函数的导数有 4 步循环性质（sin→cos→-sin→-cos），双曲函数则有 2 步循环（sinh↔cosh）。`,
      steps: [
        `识别：求 ${func} x 的导数`,
        `应用基本导数公式：d/dx(${func} x) = ${result}`,
      ],
      relatedChapter: { label: '第6章 §6.1 求导公式', to: '/chapter/6/1' },
    };
  }

  // === Evaluations ===
  // sin(π/6)
  const sinPi6 = expr.match(/^sin\(π\/6\)$/);
  if (sinPi6) {
    return {
      type: 'evaluate',
      input: expr,
      result: '1/2 = 0.5',
      explanation: 'sin(π/6) = sin(30°) = 1/2。这是最常见的特殊角值之一。',
      steps: [
        '识别：sin(π/6) 即 sin(30°)',
        '在单位圆上，30° 对应点坐标为 (√3/2, 1/2)',
        'sin 为 y 坐标：1/2 = 0.5',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // sin(π/4)
  const sinPi4 = expr.match(/^sin\(π\/4\)$/);
  if (sinPi4) {
    return {
      type: 'evaluate',
      input: expr,
      result: '√2/2 ≈ 0.7071',
      explanation: 'sin(π/4) = sin(45°) = √2/2 ≈ 0.7071。',
      steps: [
        '识别：sin(π/4) 即 sin(45°)',
        '在单位圆上，45° 对应点坐标为 (√2/2, √2/2)',
        'sin 为 y 坐标：√2/2 ≈ 0.7071',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // sin(π/3)
  const sinPi3 = expr.match(/^sin\(π\/3\)$/);
  if (sinPi3) {
    return {
      type: 'evaluate',
      input: expr,
      result: '√3/2 ≈ 0.8660',
      explanation: 'sin(π/3) = sin(60°) = √3/2 ≈ 0.8660。',
      steps: [
        '识别：sin(π/3) 即 sin(60°)',
        '在单位圆上，60° 对应点坐标为 (1/2, √3/2)',
        'sin 为 y 坐标：√3/2 ≈ 0.8660',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // sin(π/2)
  const sinPi2 = expr.match(/^sin\(π\/2\)$/);
  if (sinPi2) {
    return {
      type: 'evaluate',
      input: expr,
      result: '1',
      explanation: 'sin(π/2) = sin(90°) = 1。在单位圆上，90° 对应点 (0, 1)。',
      steps: [
        '识别：sin(π/2) 即 sin(90°)',
        '90° 时单位圆上的点为 (0, 1)',
        'sin 为 y 坐标：1',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // cos(π/4)
  const cosPi4 = expr.match(/^cos\(π\/4\)$/);
  if (cosPi4) {
    return {
      type: 'evaluate',
      input: expr,
      result: '√2/2 ≈ 0.7071',
      explanation: 'cos(π/4) = cos(45°) = √2/2 ≈ 0.7071。',
      steps: [
        '识别：cos(π/4) 即 cos(45°)',
        '在单位圆上，45° 对应点坐标为 (√2/2, √2/2)',
        'cos 为 x 坐标：√2/2 ≈ 0.7071',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // cos(π/3)
  const cosPi3 = expr.match(/^cos\(π\/3\)$/);
  if (cosPi3) {
    return {
      type: 'evaluate',
      input: expr,
      result: '1/2 = 0.5',
      explanation: 'cos(π/3) = cos(60°) = 1/2 = 0.5。',
      steps: [
        '识别：cos(π/3) 即 cos(60°)',
        '在单位圆上，60° 对应点坐标为 (1/2, √3/2)',
        'cos 为 x 坐标：1/2 = 0.5',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // cos(π/6)
  const cosPi6 = expr.match(/^cos\(π\/6\)$/);
  if (cosPi6) {
    return {
      type: 'evaluate',
      input: expr,
      result: '√3/2 ≈ 0.8660',
      explanation: 'cos(π/6) = cos(30°) = √3/2 ≈ 0.8660。',
      steps: [
        '识别：cos(π/6) 即 cos(30°)',
        '在单位圆上，30° 对应点坐标为 (√3/2, 1/2)',
        'cos 为 x 坐标：√3/2 ≈ 0.8660',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // tan(π/4)
  const tanPi4 = expr.match(/^tan\(π\/4\)$/);
  if (tanPi4) {
    return {
      type: 'evaluate',
      input: expr,
      result: '1',
      explanation: 'tan(π/4) = tan(45°) = 1。因为 sin(45°) = cos(45°)，所以比值为 1。',
      steps: [
        '识别：tan(π/4) 即 tan(45°)',
        'tan = sin/cos，而 sin(45°) = cos(45°) = √2/2',
        '所以 tan(45°) = (√2/2) / (√2/2) = 1',
      ],
      relatedChapter: { label: '第1章 §1.4 特殊角与常用值', to: '/chapter/1/4' },
    };
  }

  // General evaluation: sin(number), cos(number), tan(number)
  const sinEval = expr.match(/^sin\(([-]?[\d.]+)\)$/);
  if (sinEval) {
    const val = parseFloat(sinEval[1]);
    const result = Math.sin(val);
    const degStr = ((val * 180 / Math.PI) % 360 + 360) % 360;
    return {
      type: 'evaluate',
      input: expr,
      result: result.toFixed(6),
      explanation: `sin(${val.toFixed(4)} rad) ≈ sin(${degStr.toFixed(1)}°) ≈ ${result.toFixed(6)}。`,
      steps: [
        `输入：sin(${val.toFixed(4)})`,
        `计算 sin(${val.toFixed(4)}) = ${result.toFixed(6)}`,
      ],
      relatedChapter: { label: '第1章 §1.2 单位圆上的三角函数', to: '/chapter/1/2' },
    };
  }

  const cosEval = expr.match(/^cos\(([-]?[\d.]+)\)$/);
  if (cosEval) {
    const val = parseFloat(cosEval[1]);
    const result = Math.cos(val);
    const degStr = ((val * 180 / Math.PI) % 360 + 360) % 360;
    return {
      type: 'evaluate',
      input: expr,
      result: result.toFixed(6),
      explanation: `cos(${val.toFixed(4)} rad) ≈ cos(${degStr.toFixed(1)}°) ≈ ${result.toFixed(6)}。`,
      steps: [
        `输入：cos(${val.toFixed(4)})`,
        `计算 cos(${val.toFixed(4)}) = ${result.toFixed(6)}`,
      ],
      relatedChapter: { label: '第1章 §1.2 单位圆上的三角函数', to: '/chapter/1/2' },
    };
  }

  // === Simplification patterns ===
  // sin(-x) = -sin(x)
  const sinNeg = expr.match(/^sin\(-\s*([a-zA-Zxθαβ])\)$/);
  if (sinNeg) {
    return {
      type: 'simplify',
      input: expr,
      result: `-sin(${sinNeg[1]})`,
      explanation: 'sin 是奇函数，sin(-x) = -sin(x)。',
      steps: [
        `识别：sin(-${sinNeg[1]})`,
        '应用奇函数性质：sin(-x) = -sin(x)',
        `结果：-sin(${sinNeg[1]})`,
      ],
      relatedChapter: { label: '第2章 §2.4 奇偶性与对称性', to: '/chapter/2/4' },
    };
  }

  // cos(-x) = cos(x)
  const cosNeg = expr.match(/^cos\(-\s*([a-zA-Zxθαβ])\)$/);
  if (cosNeg) {
    return {
      type: 'simplify',
      input: expr,
      result: `cos(${cosNeg[1]})`,
      explanation: 'cos 是偶函数，cos(-x) = cos(x)。',
      steps: [
        `识别：cos(-${cosNeg[1]})`,
        '应用偶函数性质：cos(-x) = cos(x)',
        `结果：cos(${cosNeg[1]})`,
      ],
      relatedChapter: { label: '第2章 §2.4 奇偶性与对称性', to: '/chapter/2/4' },
    };
  }

  // tan(2x) = 2tan(x) / (1 - tan²(x))
  const tan2xMatch = expr.match(/^tan\(2\s*([a-zA-Zαβxθ])\)$/);
  if (tan2xMatch) {
    const v = tan2xMatch[1];
    return {
      type: 'identity',
      input: expr,
      result: `2 tan ${v} / (1 - tan²${v})`,
      explanation: `这是二倍角正切公式。tan(2${v}) = 2 tan ${v} / (1 - tan²${v})。`,
      steps: [
        `识别表达式：tan(2${v})`,
        `应用二倍角正切公式：tan(2${v}) = 2 tan ${v} / (1 - tan²${v})`,
        `结果：2 tan ${v} / (1 - tan²${v})`,
      ],
      relatedChapter: { label: '第3章 §3.4 倍角/半角公式', to: '/chapter/3/4' },
    };
  }

  // Default: unknown
  return {
    type: 'unknown',
    input: expr,
    result: '无法识别',
    explanation: '未能识别输入的表达式。请尝试输入以下格式的表达式：\n• sin²x + cos²x\n• sin(a+b)\n• cos(a-b)\n• sin(2x) 或 cos(2x)\n• d/dx sin x（求导）\n• sin(π/6)（求值）\n• sin(-x)（简化）',
    steps: [
      '支持的表达式类型：',
      '恒等式：sin²x + cos²x, sin(a+b), cos(a-b), sin(2x), cos(2x), tan(2x)',
      '求导：d/dx sin x, d/dx cos x, derivative of tan x, 等',
      '求值：sin(π/6), cos(π/4), sin(0.5), 等',
      '简化：sin(-x), cos(-x)',
    ],
  };
}

const EXAMPLE_QUERIES = [
  'sin²x + cos²x',
  'sin(a+b)',
  'cos(a-b)',
  'sin(2x)',
  'cos(2x)',
  'd/dx sin x',
  'd/dx cosh x',
  'sin(π/6)',
  'cos(π/4)',
  'tan(π/4)',
  'sin(-x)',
  'cos(-x)',
  'tan(2x)',
];

export default function SolverPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SolverResult | null>(null);
  const [history, setHistory] = useState<SolverResult[]>([]);

  const handleSolve = () => {
    if (!query.trim()) return;
    const res = solve(query);
    setResult(res);
    setHistory((prev) => [res, ...prev].slice(0, 20));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSolve();
    }
  };

  const handleExample = (q: string) => {
    setQuery(q);
    const res = solve(q);
    setResult(res);
    setHistory((prev) => [res, ...prev].slice(0, 20));
  };

  const typeColors: Record<string, string> = {
    identity: 'bg-blue-100 text-blue-800 border-blue-300',
    derivative: 'bg-purple-100 text-purple-800 border-purple-300',
    evaluate: 'bg-green-100 text-green-800 border-green-300',
    simplify: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    unknown: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  const typeLabels: Record<string, string> = {
    identity: '恒等式',
    derivative: '求导',
    evaluate: '求值',
    simplify: '简化',
    unknown: '未知',
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] mb-2">
          🧮 解题助手
        </h1>
        <p className="text-gray-600">
          输入三角表达式，获取逐步解答和公式推导
        </p>
      </div>

      {/* Input area */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入表达式，如：sin²x + cos²x, sin(π/6), d/dx sin x..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6cb0] focus:border-transparent text-sm font-mono"
            autoFocus
          />
          <button
            onClick={handleSolve}
            disabled={!query.trim()}
            className="px-6 py-2.5 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            求解
          </button>
        </div>

        {/* Quick examples */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">快速尝试：</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleExample(q)}
                className="px-3 py-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-gray-700 transition-colors font-mono"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${typeColors[result.type]}`}
            >
              {typeLabels[result.type]}
            </span>
            <span className="text-sm text-gray-400 font-mono">
              输入：{result.input}
            </span>
          </div>

          {/* Result display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
            <div className="text-center">
              <MathFormula
                formula={`${result.input} = ${result.result}`}
                displayMode
              />
            </div>
          </div>

          {/* Explanation */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-[#1a365d] mb-2">📖 解释</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {result.explanation}
            </p>
          </div>

          {/* Step-by-step */}
          {result.steps.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[#1a365d] mb-2">
                📝 求解步骤
              </h3>
              <ol className="space-y-1.5">
                {result.steps.map((step, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2b6cb0] text-white text-xs flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Related chapter link */}
          {result.relatedChapter && (
            <div className="pt-3 border-t border-gray-100">
              <Link
                to={result.relatedChapter.to}
                className="inline-flex items-center gap-1.5 text-sm text-[#2b6cb0] hover:text-[#1a365d] transition-colors font-medium"
              >
                📚 相关章节：{result.relatedChapter.label} →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#1a365d] mb-3">
            🕐 历史记录
          </h3>
          <div className="space-y-2">
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(item.input);
                  setResult(item);
                }}
                className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors group"
              >
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full border flex-shrink-0 ${typeColors[item.type]}`}
                >
                  {typeLabels[item.type]}
                </span>
                <span className="text-sm text-gray-600 font-mono truncate">
                  {item.input}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  = {item.result}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🧮</p>
          <p className="text-sm">输入表达式后点击"求解"查看结果</p>
          <p className="text-xs mt-2">支持恒等式展开、求导、特殊角求值等</p>
        </div>
      )}
    </div>
  );
}
