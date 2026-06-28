export interface Question {
  id: number;
  chapter: number;
  section: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const questions: Question[] = [
  // Chapter 1 - 从单位圆开始
  // 1.1 角度与弧度
  { id: 1, chapter: 1, section: 1, question: '180° 等于多少弧度？', options: ['π/2', 'π', '2π', '3π/2'], correct: 1, explanation: '180° = π 弧度，这是角度与弧度转换的基本关系。' },
  { id: 2, chapter: 1, section: 1, question: 'π/3 弧度等于多少度？', options: ['45°', '60°', '90°', '120°'], correct: 1, explanation: 'π/3 = 60°，因为 π = 180°，所以 π/3 = 180°/3 = 60°。' },
  { id: 3, chapter: 1, section: 1, question: '1 弧度约等于多少度？', options: ['45.2°', '57.3°', '60.0°', '90.0°'], correct: 1, explanation: '1 rad ≈ 57.3°，精确值为 180°/π。' },
  { id: 4, chapter: 1, section: 1, question: '下列哪个角是第三象限角？', options: ['120°', '210°', '30°', '330°'], correct: 1, explanation: '210° 在 180° 到 270° 之间，属于第三象限。' },
  { id: 5, chapter: 1, section: 1, question: '一个完整圆的弧度为：', options: ['π', '2π', 'π/2', '4π'], correct: 1, explanation: '一个完整圆的弧度 = 360° = 2π 弧度。' },

  // 1.2 单位圆上的三角函数
  { id: 6, chapter: 1, section: 2, question: '在单位圆上，角 θ 对应的点的 x 坐标等于：', options: ['sin θ', 'cos θ', 'tan θ', 'sec θ'], correct: 1, explanation: '在单位圆上，点坐标为 (cos θ, sin θ)，x 坐标 = cos θ。' },
  { id: 7, chapter: 1, section: 2, question: 'sin(π/2) 的值是：', options: ['0', '1', '-1', '不存在'], correct: 1, explanation: 'sin(π/2) = 1，在单位圆上对应 (0, 1) 点。' },
  { id: 8, chapter: 1, section: 2, question: 'cos(π) 的值是：', options: ['0', '1', '-1', '不存在'], correct: 2, explanation: 'cos(π) = -1，在单位圆上对应 (-1, 0) 点。' },
  { id: 9, chapter: 1, section: 2, question: '下列哪个公式正确？', options: ['sin²θ + cos²θ = 1', 'sinθ + cosθ = 1', 'sin²θ - cos²θ = 1', 'sinθ·cosθ = 1'], correct: 0, explanation: 'sin²θ + cos²θ = 1 是三角函数中最基本的恒等式。' },
  { id: 10, chapter: 1, section: 2, question: 'tan θ 在单位圆上表示为：', options: ['y/x', 'x/y', '1/x', '1/y'], correct: 0, explanation: 'tan θ = sin θ / cos θ = y/x（当 x ≠ 0 时）。' },

  // 1.3 三角函数线
  { id: 11, chapter: 1, section: 3, question: '正弦线对应单位圆中的哪条线段？', options: ['从原点到点的连线', '点到 x 轴的垂线', '点到 y 轴的垂线', '圆的切线'], correct: 1, explanation: '正弦线是从单位圆上的点到 x 轴的垂线段，长度等于 sin θ。' },
  { id: 12, chapter: 1, section: 3, question: '余弦线对应单位圆中的哪条线段？', options: ['从原点到点的连线', '点到 x 轴的垂线', '点到 y 轴的垂线', '圆的切线'], correct: 2, explanation: '余弦线是从单位圆上的点到 y 轴的垂线段，长度等于 |cos θ|。' },
  { id: 13, chapter: 1, section: 3, question: '当 θ 在第二象限时，sin θ 的符号为：', options: ['正', '负', '零', '不存在'], correct: 0, explanation: '第二象限 sin θ > 0，因为 y > 0。' },

  // 1.4 特殊角与常用值
  { id: 14, chapter: 1, section: 4, question: 'sin 30° 的值是：', options: ['0', '1/2', '√2/2', '√3/2'], correct: 1, explanation: 'sin 30° = 1/2，这是最常用的特殊角值之一。' },
  { id: 15, chapter: 1, section: 4, question: 'cos 45° 的值是：', options: ['1/2', '√2/2', '√3/2', '1'], correct: 1, explanation: 'cos 45° = √2/2，45°角的正余弦值相等。' },
  { id: 16, chapter: 1, section: 4, question: 'tan 60° 的值是：', options: ['√3/3', '1', '√3', '不存在'], correct: 2, explanation: 'tan 60° = √3，即 sin 60°/cos 60° = (√3/2)/(1/2) = √3。' },
  { id: 17, chapter: 1, section: 4, question: 'sin 0° 的值是：', options: ['0', '1', '-1', '不存在'], correct: 0, explanation: 'sin 0° = 0，单位圆上角度为 0 的点为 (1, 0)。' },

  // Chapter 2 - 三角函数图像与性质
  // 2.1 sin/cos/tan图像
  { id: 18, chapter: 2, section: 1, question: 'y = sin x 的图像周期是：', options: ['π', '2π', '3π', '4π'], correct: 1, explanation: 'y = sin x 的周期为 2π。' },
  { id: 19, chapter: 2, section: 1, question: 'y = cos x 在 x = 0 处的值是：', options: ['0', '1', '-1', '不存在'], correct: 1, explanation: 'cos 0 = 1，cos 函数的起始点为 (0, 1)。' },
  { id: 20, chapter: 2, section: 1, question: 'y = tan x 在 x = π/2 处：', options: ['取值为 1', '取值为 0', '有垂直渐近线', '取值为 -1'], correct: 2, explanation: 'tan x = sin x / cos x，在 x = π/2 处 cos x = 0，所以有垂直渐近线。' },
  { id: 21, chapter: 2, section: 1, question: 'sin x 在 [0, π] 区间上的值域是：', options: ['[-1, 1]', '[0, 1]', '[-1, 0]', '[0, π]'], correct: 1, explanation: '在 [0, π] 上，sin x 从 0 增加到 1 再减小到 0，值域为 [0, 1]。' },

  // 2.2 周期振幅相位
  { id: 22, chapter: 2, section: 2, question: '函数 y = 3 sin x 的振幅是：', options: ['1', '3', '3π', '6π'], correct: 1, explanation: '振幅为 |A| = 3，A 是 sin 函数前的系数。' },
  { id: 23, chapter: 2, section: 2, question: '函数 y = sin(2x) 的周期是：', options: ['π', '2π', 'π/2', '4π'], correct: 0, explanation: '周期 T = 2π/|ω| = 2π/2 = π。' },
  { id: 24, chapter: 2, section: 2, question: '函数 y = sin(x + π/2) 相对于 y = sin x 的相位移动是：', options: ['左移 π/2', '右移 π/2', '上移 π/2', '下移 π/2'], correct: 0, explanation: 'y = sin(x + φ)，φ > 0 时向左平移。' },

  // 2.3 图像变换
  { id: 25, chapter: 2, section: 3, question: '将 y = sin x 向上平移 1 个单位得到：', options: ['y = sin(x + 1)', 'y = sin x + 1', 'y = sin(2x)', 'y = 2 sin x'], correct: 1, explanation: '垂直平移：y = sin x + c，c > 0 向上平移。' },
  { id: 26, chapter: 2, section: 3, question: 'y = -sin x 的图像是 y = sin x 关于哪条轴的对称？', options: ['x 轴', 'y 轴', '原点', '直线 y = x'], correct: 0, explanation: 'y = -f(x) 是 f(x) 关于 x 轴的对称变换。' },

  // 2.4 奇偶性与对称性
  { id: 27, chapter: 2, section: 4, question: '正弦函数 y = sin x 是：', options: ['偶函数', '奇函数', '非奇非偶', '既是奇又是偶'], correct: 1, explanation: 'sin(-x) = -sin x，所以是奇函数，关于原点对称。' },
  { id: 28, chapter: 2, section: 4, question: '余弦函数 y = cos x 是：', options: ['偶函数', '奇函数', '非奇非偶', '既是奇又是偶'], correct: 0, explanation: 'cos(-x) = cos x，所以是偶函数，关于 y 轴对称。' },

  // Chapter 3 - 恒等式与公式
  // 3.1 诱导公式
  { id: 29, chapter: 3, section: 1, question: 'sin(π - θ) = ?', options: ['-sin θ', 'sin θ', 'cos θ', '-cos θ'], correct: 1, explanation: 'sin(π - θ) = sin θ，这是诱导公式中的基本关系。' },
  { id: 30, chapter: 3, section: 1, question: 'cos(π + θ) = ?', options: ['cos θ', '-cos θ', 'sin θ', '-sin θ'], correct: 1, explanation: 'cos(π + θ) = -cos θ，第三象限余弦为负。' },
  { id: 31, chapter: 3, section: 1, question: 'sin(π/2 - θ) = ?', options: ['sin θ', '-sin θ', 'cos θ', '-cos θ'], correct: 2, explanation: 'sin(π/2 - θ) = cos θ，这是余角公式。' },

  // 3.2 同角关系
  { id: 32, chapter: 3, section: 2, question: '已知 sin θ = 3/5 且 θ 在第一象限，则 cos θ = ?', options: ['2/5', '3/5', '4/5', '5/4'], correct: 2, explanation: 'cos²θ = 1 - sin²θ = 1 - 9/25 = 16/25，cos θ = 4/5（第一象限正）。' },
  { id: 33, chapter: 3, section: 2, question: 'tan θ = sin θ / cos θ 成立的条件是：', options: ['θ ≠ 0', 'sin θ ≠ 0', 'cos θ ≠ 0', '对所有 θ 都成立'], correct: 2, explanation: 'tan θ = sin θ / cos θ，分母 cos θ ≠ 0。' },
  { id: 34, chapter: 3, section: 2, question: '1 + tan²θ = ?', options: ['sin²θ', 'cos²θ', 'sec²θ', 'csc²θ'], correct: 2, explanation: '1 + tan²θ = sec²θ，这是同角关系中的重要恒等式。' },

  // 3.3 和差角公式
  { id: 35, chapter: 3, section: 3, question: 'sin(α + β) = ?', options: ['sin α + sin β', 'sin α cos β + cos α sin β', 'sin α cos β - cos α sin β', 'cos α cos β - sin α sin β'], correct: 1, explanation: 'sin(α + β) = sin α cos β + cos α sin β，这是和角公式。' },
  { id: 36, chapter: 3, section: 3, question: 'cos(α - β) = ?', options: ['cos α cos β + sin α sin β', 'cos α cos β - sin α sin β', 'sin α cos β + cos α sin β', 'sin α cos β - cos α sin β'], correct: 0, explanation: 'cos(α - β) = cos α cos β + sin α sin β。' },
  { id: 37, chapter: 3, section: 3, question: 'sin 15° 可以表示为：', options: ['sin(45° - 30°)', 'sin(45° + 30°)', 'sin(60° - 45°)', 'A 和 C 都正确'], correct: 3, explanation: '15° 可看作 45° - 30° 或 60° - 45°。' },

  // 3.4 倍角/半角公式
  { id: 38, chapter: 3, section: 4, question: 'sin 2θ = ?', options: ['2 sin θ', '2 sin θ cos θ', 'sin²θ - cos²θ', '1 - 2 sin²θ'], correct: 1, explanation: 'sin 2θ = 2 sin θ cos θ，令和角公式中 α = β = θ 即得。' },
  { id: 39, chapter: 3, section: 4, question: 'cos 2θ 的表达式不包括：', options: ['cos²θ - sin²θ', '2 cos²θ - 1', '1 - 2 sin²θ', '2 sin θ cos θ'], correct: 3, explanation: '2 sin θ cos θ = sin 2θ，不是 cos 2θ 的表达式。' },
  { id: 40, chapter: 3, section: 4, question: 'sin(θ/2) 用 cos θ 表示为：', options: ['±√((1 + cos θ)/2)', '±√((1 - cos θ)/2)', '±(1 + cos θ)/2', '±(1 - cos θ)/2'], correct: 1, explanation: '由 cos θ = 1 - 2 sin²(θ/2) 推导得 sin(θ/2) = ±√((1 - cos θ)/2)。' },

  // 3.5 和积互化
  { id: 41, chapter: 3, section: 5, question: 'sin α + sin β = ?', options: ['2 sin((α+β)/2) cos((α-β)/2)', '2 cos((α+β)/2) sin((α-β)/2)', '2 sin((α-β)/2) cos((α+β)/2)', '2 cos((α-β)/2) sin((α+β)/2)'], correct: 0, explanation: '和化积公式：sin α + sin β = 2 sin((α+β)/2) cos((α-β)/2)。' },
  { id: 42, chapter: 3, section: 5, question: 'cos A - cos B = ?', options: ['2 cos((A+B)/2) sin((A-B)/2)', '-2 sin((A+B)/2) sin((A-B)/2)', '2 sin((A+B)/2) cos((A-B)/2)', '-2 cos((A+B)/2) cos((A-B)/2)'], correct: 1, explanation: 'cos A - cos B = -2 sin((A+B)/2) sin((A-B)/2)。' },
  { id: 43, chapter: 3, section: 5, question: '2 cos α sin β 可化为：', options: ['sin(α+β) + sin(α-β)', 'sin(α+β) - sin(α-β)', 'cos(α+β) + cos(α-β)', 'cos(α+β) - cos(α-β)'], correct: 1, explanation: '2 cos α sin β = sin(α+β) - sin(α-β)，这是积化和差公式。' },

  // Chapter 4 - 三角方程与反三角函数
  // 4.1 基本三角方程
  { id: 44, chapter: 4, section: 1, question: '方程 sin x = 1/2 在 [0, 2π) 内的解有几个？', options: ['1个', '2个', '3个', '无穷多个'], correct: 1, explanation: 'sin x = 1/2 在 [0, 2π) 内的解为 π/6 和 5π/6，共 2 个。' },
  { id: 45, chapter: 4, section: 1, question: '方程 cos x = -1 的解集是：', options: ['x = π + 2kπ', 'x = 2kπ', 'x = π/2 + 2kπ', 'x = -π + kπ'], correct: 0, explanation: 'cos x = -1 的解为 x = π + 2kπ (k ∈ Z)，即奇数倍的 π。' },
  { id: 46, chapter: 4, section: 1, question: '方程 tan x = √3 在 (0, π) 内的解是：', options: ['π/6', 'π/3', '2π/3', '5π/6'], correct: 1, explanation: 'tan(π/3) = √3，且在 (0, π) 内 tan x 单调递增，只有这一个解。' },
  { id: 47, chapter: 4, section: 1, question: 'sin x = sin α 的通解公式是：', options: ['x = α + 2kπ', 'x = α + 2kπ 或 x = π - α + 2kπ', 'x = α + kπ', 'x = (-1)^k α + kπ'], correct: 1, explanation: 'sin x = sin α 的通解为 x = α + 2kπ 或 x = π - α + 2kπ。' },

  // 4.2 反三角函数定义与图像
  { id: 48, chapter: 4, section: 2, question: 'arcsin x 的定义域是：', options: ['[-1, 1]', '[0, π]', '[-π/2, π/2]', '全体实数'], correct: 0, explanation: 'arcsin x 的定义域为 [-1, 1]，值域为 [-π/2, π/2]。' },
  { id: 49, chapter: 4, section: 2, question: 'arccos(0) 的值是：', options: ['0', 'π/2', 'π', '2π'], correct: 1, explanation: 'arccos(0) = π/2，因为 cos(π/2) = 0 且 π/2 在 arccos 的值域 [0, π] 内。' },
  { id: 50, chapter: 4, section: 2, question: 'arctan x 的值域是：', options: ['[-1, 1]', '[0, π]', '(-π/2, π/2)', '全体实数'], correct: 2, explanation: 'arctan x 的值域为 (-π/2, π/2)，图像有两条水平渐近线 y = ±π/2。' },
  { id: 51, chapter: 4, section: 2, question: 'arcsin(1/2) 的值是：', options: ['π/6', 'π/3', 'π/2', '-π/6'], correct: 0, explanation: 'sin(π/6) = 1/2，且 π/6 ∈ [-π/2, π/2]，所以 arcsin(1/2) = π/6。' },

  // 4.3 反三角恒等式
  { id: 52, chapter: 4, section: 3, question: 'arcsin x + arccos x = ?（x ∈ [-1, 1]）', options: ['π/2', 'π', '0', 'x'], correct: 0, explanation: '对任意 x ∈ [-1, 1]，arcsin x + arccos x = π/2。' },
  { id: 53, chapter: 4, section: 3, question: 'sin(arcsin x) = ?（x ∈ [-1, 1]）', options: ['x', '√(1-x²)', '1/x', 'x²'], correct: 0, explanation: 'sin 和 arcsin 互为反函数，sin(arcsin x) = x。' },
  { id: 54, chapter: 4, section: 3, question: 'cos(arcsin x) = ?（设 arcsin x = θ）', options: ['x', '√(1-x²)', '1/√(1+x²)', '√(1+x²)'], correct: 1, explanation: '由 sin²θ + cos²θ = 1，sin θ = x，在 arcsin 的值域内 cos θ ≥ 0，所以 cos(arcsin x) = √(1-x²)。' },
  { id: 55, chapter: 4, section: 3, question: '下列等式中正确的是：', options: ['arcsin(cos x) = x', 'arctan(tan x) = x', 'sin(arccos x) = √(1-x²)', 'cos(arctan x) = x'], correct: 2, explanation: 'sin(arccos x) = √(1-x²) 与 cos(arcsin x) 类似。arctan(tan x) = x 仅在 x ∈ (-π/2, π/2) 时成立。' },

  // 4.4 复合反三角函数
  { id: 56, chapter: 4, section: 4, question: 'tan(arcsin x) 可化简为：', options: ['x/√(1-x²)', '√(1-x²)/x', '1/√(1-x²)', '√(1+x²)'], correct: 0, explanation: '设 θ = arcsin x，则 sin θ = x，cos θ = √(1-x²)，tan θ = x/√(1-x²)。' },
  { id: 57, chapter: 4, section: 4, question: 'arcsin(cos(π/3)) 的值是：', options: ['π/3', 'π/6', '5π/6', '2π/3'], correct: 1, explanation: 'cos(π/3) = 1/2，arcsin(1/2) = π/6。' },
  { id: 58, chapter: 4, section: 4, question: 'cos(2 arcsin x) = ?', options: ['2x²-1', '1-2x²', '2x√(1-x²)', '√(1-2x²)'], correct: 1, explanation: 'cos(2θ) = 1 - 2sin²θ = 1 - 2x²，其中 θ = arcsin x。' },

  // Chapter 5 - 双曲函数
  // 5.1 从悬链线到双曲函数
  { id: 59, chapter: 5, section: 1, question: '悬链线的方程是：', options: ['y = cosh x', 'y = sinh x', 'y = tanh x', 'y = cos x'], correct: 0, explanation: '均匀柔软的链条两端悬挂形成的曲线是悬链线，其方程为 y = a·cosh(x/a)。' },
  { id: 60, chapter: 5, section: 1, question: 'cosh x 的另一种表达是：', options: ['(eˣ + e⁻ˣ)/2', '(eˣ - e⁻ˣ)/2', '(eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)', 'eˣ + e⁻ˣ'], correct: 0, explanation: 'cosh x = (eˣ + e⁻ˣ)/2，是偶函数。' },
  { id: 61, chapter: 5, section: 1, question: 'sinh x 的指数定义是：', options: ['(eˣ + e⁻ˣ)/2', '(eˣ - e⁻ˣ)/2', '(eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)', '(eˣ + 1)/2'], correct: 1, explanation: 'sinh x = (eˣ - e⁻ˣ)/2，是奇函数。' },

  // 5.2 sinh/cosh/tanh 定义与图像
  { id: 62, chapter: 5, section: 2, question: '双曲函数的参数 t 在几何上表示：', options: ['单位双曲线上的弧长', '双曲线扇形面积的两倍', '从 x 轴起的角度', '从原点出发的距离'], correct: 1, explanation: '在单位双曲线上，参数 t 等于双曲线扇形面积的两倍，类比单位圆中 θ = 扇形面积的两倍。' },
  { id: 63, chapter: 5, section: 2, question: 'cosh x 的值域是：', options: ['[-1, 1]', '[0, 1]', '[1, +∞)', '(-∞, +∞)'], correct: 2, explanation: 'cosh x 的最小值为 1（当 x = 0 时），当 |x| → ∞ 时 cosh x → +∞。' },
  { id: 64, chapter: 5, section: 2, question: 'tanh x 的值域是：', options: ['[-1, 1]', '(-1, 1)', '[0, 1]', '(-∞, +∞)'], correct: 1, explanation: 'tanh x = sinh x / cosh x，值域为 (-1, 1)，当 x → ±∞ 时分别趋近于 ±1。' },
  { id: 65, chapter: 5, section: 2, question: 'cosh x 是：', options: ['奇函数', '偶函数', '非奇非偶', '既是奇又是偶'], correct: 1, explanation: 'cosh(-x) = cosh x，图像关于 y 轴对称。' },

  // 5.3 双曲恒等式
  { id: 66, chapter: 5, section: 3, question: 'cosh²x - sinh²x = ?', options: ['0', '1', '-1', '2'], correct: 1, explanation: 'cosh²x - sinh²x = 1 是双曲函数最基本的恒等式，类比三角中的 sin²θ + cos²θ = 1。' },
  { id: 67, chapter: 5, section: 3, question: 'sinh(x + y) = ?', options: ['sinh x cosh y + cosh x sinh y', 'sinh x sinh y + cosh x cosh y', 'sinh x cosh y - cosh x sinh y', 'cosh x cosh y - sinh x sinh y'], correct: 0, explanation: 'sinh(x + y) = sinh x cosh y + cosh x sinh y，与三角函数的 sin(α+β) 公式形式相同。' },
  { id: 68, chapter: 5, section: 3, question: 'cosh(2x) 可化简为：', options: ['2 cosh²x - 1', '1 - 2 sinh²x', 'cosh²x + sinh²x', '以上都是'], correct: 3, explanation: 'cosh(2x) = cosh²x + sinh²x = 2 cosh²x - 1 = 1 + 2 sinh²x，三种表达式等价。' },

  // 5.4 反双曲函数
  { id: 69, chapter: 5, section: 4, question: 'arsinh x 的表达式为：', options: ['ln(x + √(x²+1))', 'ln(x + √(x²-1))', '(1/2)ln((1+x)/(1-x))', 'eˣ - 1'], correct: 0, explanation: 'arsinh x = ln(x + √(x²+1))，定义域为 R。' },
  { id: 70, chapter: 5, section: 4, question: 'arcosh x 的定义域是：', options: ['[-1, 1]', '[1, +∞)', '[0, +∞)', '全体实数'], correct: 1, explanation: 'arcosh x 的定义域为 [1, +∞)，因为 cosh x 的值域为 [1, +∞)。' },
  { id: 71, chapter: 5, section: 4, question: 'artanh x = ?', options: ['ln(x + √(x²+1))', 'ln(x + √(x²-1))', '(1/2)ln((1+x)/(1-x))', '(eˣ + e⁻ˣ)/2'], correct: 2, explanation: 'artanh x = (1/2)ln((1+x)/(1-x))，定义域为 (-1, 1)。' },

  // 5.5 三角 vs 双曲：类比与差异
  { id: 72, chapter: 5, section: 5, question: '下列哪组公式体现了三角与双曲的类比关系？', options: ['sin²θ+cos²θ=1 ↔ cosh²x-sinh²x=1', 'sin²θ+cos²θ=1 ↔ sinh²x+cosh²x=1', 'sin(2θ)=2sinθcosθ ↔ sinh(2x)=2sinhx sinhx', 'tanθ=sinθ/cosθ ↔ tanhx=coshx/sinhx'], correct: 0, explanation: '三角的 sin²θ+cos²θ=1 对应双曲的 cosh²x-sinh²x=1，注意符号相反。' },
  { id: 73, chapter: 5, section: 5, question: '关于 Osborn 法则，以下说法正确的是：', options: ['直接照搬所有三角恒等式即可', '将三角恒等式中的 cos 替换为 cosh，sin 替换为 i·sinh', '将三角恒等式中的 sin² 替换为 -sinh²', '以上都不对'], correct: 2, explanation: 'Osborn 法则：将三角恒等式中的 sin² 替换为 -sinh²（乘积中有两个 sinh 因子时变号）。' },

  // Chapter 6 - 微积分中的三角与双曲
  // 6.1 求导公式
  { id: 74, chapter: 6, section: 1, question: 'sin x 的导数是：', options: ['cos x', '-cos x', 'sin x', '-sin x'], correct: 0, explanation: 'd/dx(sin x) = cos x，这是最基本的求导公式。' },
  { id: 75, chapter: 6, section: 1, question: 'cosh x 的导数是：', options: ['-sinh x', 'sinh x', 'cosh x', '-cosh x'], correct: 1, explanation: 'd/dx(cosh x) = sinh x，注意没有负号，与 cos 不同。' },
  { id: 76, chapter: 6, section: 1, question: 'tan x 的导数是：', options: ['sec²x', 'csc²x', 'cot²x', 'sin²x'], correct: 0, explanation: 'd/dx(tan x) = sec²x = 1/cos²x。' },
  { id: 77, chapter: 6, section: 1, question: 'tanh x 的导数是：', options: ['sech²x', '-sech²x', 'csch²x', 'cosh²x'], correct: 0, explanation: 'd/dx(tanh x) = sech²x = 1/cosh²x，与 tan 类似。' },

  // 6.2 积分公式
  { id: 78, chapter: 6, section: 2, question: '∫ sin x dx = ?', options: ['cos x + C', '-cos x + C', 'sin x + C', '-sin x + C'], correct: 1, explanation: '∫ sin x dx = -cos x + C，因为 (-cos x)\' = sin x。' },
  { id: 79, chapter: 6, section: 2, question: '∫ cosh x dx = ?', options: ['-sinh x + C', 'sinh x + C', 'cosh x + C', 'tanh x + C'], correct: 1, explanation: '∫ cosh x dx = sinh x + C，因为 (sinh x)\' = cosh x。' },
  { id: 80, chapter: 6, section: 2, question: '∫ sec²x dx = ?', options: ['tan x + C', 'sec x + C', 'cot x + C', 'csc x + C'], correct: 0, explanation: '∫ sec²x dx = tan x + C，因为 (tan x)\' = sec²x。' },
  { id: 81, chapter: 6, section: 2, question: '∫ tan x dx 的结果是：', options: ['ln|sec x| + C', 'ln|sin x| + C', '-ln|cos x| + C', 'A 和 C 都正确'], correct: 3, explanation: '∫ tan x dx = -ln|cos x| + C = ln|sec x| + C，两种写法等价。' },

  // 6.3 泰勒展开与逼近
  { id: 82, chapter: 6, section: 3, question: 'sin x 的麦克劳林展开式（x=0处）的第一项是：', options: ['1', 'x', 'x²/2', '-x³/6'], correct: 1, explanation: 'sin x = x - x³/3! + x⁵/5! - ...，第一项（n=1）是 x。' },
  { id: 83, chapter: 6, section: 3, question: 'cos x 的泰勒展开中，x² 项的系数是：', options: ['1', '1/2', '-1/2', '-1/6'], correct: 2, explanation: 'cos x = 1 - x²/2! + x⁴/4! - ...，x² 系数为 -1/2。' },
  { id: 84, chapter: 6, section: 3, question: '用 3 项（x - x³/6 + x⁵/120）近似 sin(0.5)，误差约在什么量级？', options: ['10⁻²', '10⁻⁴', '10⁻⁶', '10⁻⁸'], correct: 2, explanation: '下一项为 x⁷/5040 ≈ 0.5⁷/5040 ≈ 1.5×10⁻⁶，所以误差约在 10⁻⁶ 量级。' },

  // 6.4 物理/工程应用实例
  { id: 85, chapter: 6, section: 4, question: '简谐振动 x(t) = A cos(ωt + φ) 中，速度 v(t) = ?', options: ['-Aω sin(ωt + φ)', 'Aω sin(ωt + φ)', '-A sin(ωt + φ)', 'A cos(ωt + φ)'], correct: 0, explanation: 'v(t) = x\'(t) = -Aω sin(ωt + φ)，是位移的导数。' },
  { id: 86, chapter: 6, section: 4, question: '悬链线 y = a cosh(x/a) 的导数是：', options: ['sinh(x/a)', 'a sinh(x/a)', 'cosh(x/a)', 'tanh(x/a)'], correct: 0, explanation: 'y\' = a · sinh(x/a) · (1/a) = sinh(x/a)。' },
  { id: 87, chapter: 6, section: 4, question: 'RLC 电路中，电流 i(t) = I₀ sin(ωt)，电感电压为：', options: ['Lω I₀ cos(ωt)', 'Lω I₀ sin(ωt)', '-Lω I₀ cos(ωt)', 'L I₀ cos(ωt)'], correct: 0, explanation: '电感电压 v_L = L·di/dt = Lω I₀ cos(ωt)。' },

  // Chapter 7 - 统一视角：欧拉公式与复数
  // 7.1 欧拉公式
  { id: 88, chapter: 7, section: 1, question: '欧拉公式 e^(iθ) 等于：', options: ['cos θ + i sin θ', 'sin θ + i cos θ', 'cos θ - i sin θ', 'i cos θ + sin θ'], correct: 0, explanation: 'e^(iθ) = cos θ + i sin θ，这是数学中最优美的公式之一。' },
  { id: 89, chapter: 7, section: 1, question: 'e^(iπ) + 1 = ?', options: ['0', '1', '-1', '2'], correct: 0, explanation: 'e^(iπ) = cos π + i sin π = -1，所以 e^(iπ) + 1 = 0，这是著名的欧拉恒等式。' },
  { id: 90, chapter: 7, section: 1, question: '|e^(iθ)| = ?', options: ['取决于 θ', '1', 'cos θ', 'sin θ'], correct: 1, explanation: '|e^(iθ)| = √(cos²θ + sin²θ) = 1，e^(iθ) 在复平面上始终位于单位圆。' },
  { id: 91, chapter: 7, section: 1, question: 'e^(i·π/2) 的值是：', options: ['1', '-1', 'i', '-i'], correct: 2, explanation: 'e^(i·π/2) = cos(π/2) + i sin(π/2) = 0 + i = i。' },

  // 7.2 复数表示的三角/双曲关系
  { id: 92, chapter: 7, section: 2, question: 'cos θ 用复指数表示为：', options: ['(e^(iθ) + e^(-iθ))/2', '(e^(iθ) - e^(-iθ))/2', '(e^(iθ) - e^(-iθ))/(2i)', 'e^(iθ) + e^(-iθ)'], correct: 0, explanation: 'cos θ = (e^(iθ) + e^(-iθ))/2，是偶函数部分的复指数表示。' },
  { id: 93, chapter: 7, section: 2, question: 'cosh x 与复数的关系是：', options: ['cosh x = cos(ix)', 'cosh x = cos(x)', 'cosh x = i cos(ix)', 'cosh x = sin(ix)'], correct: 0, explanation: 'cosh x = cos(ix)，因为 cos(ix) = (e^(i·ix) + e^(-i·ix))/2 = (e^(-x) + e^x)/2 = cosh x。' },
  { id: 94, chapter: 7, section: 2, question: 'sinh x 用复三角函数表示为：', options: ['sinh x = -i sin(ix)', 'sinh x = i sin(ix)', 'sinh x = sin(ix)', 'sinh x = i cos(ix)'], correct: 0, explanation: 'sinh x = -i sin(ix)，因为 sin(ix) = (e^(i·ix) - e^(-i·ix))/(2i) = (e^(-x) - e^x)/(2i) = i sinh x。' },

  // 7.3 双曲与三角的复数统一
  { id: 95, chapter: 7, section: 3, question: 'cosh(ix) = ?', options: ['cos x', 'sin x', 'i cos x', 'i sin x'], correct: 0, explanation: 'cosh(ix) = cos(i·ix) = cos(-x) = cos x。双曲与三角通过虚数参数建立桥梁。' },
  { id: 96, chapter: 7, section: 3, question: 'sinh(ix) = ?', options: ['i sin x', '-i sin x', 'sin x', 'cos x'], correct: 0, explanation: 'sinh(ix) = -i sin(i·ix) = -i sin(-x) = i sin x。' },
  { id: 97, chapter: 7, section: 3, question: '下列哪个等式不正确？', options: ['cos(ix) = cosh x', 'sin(ix) = i sinh x', 'tan(ix) = i tanh x', 'cos(ix) = i cosh x'], correct: 3, explanation: 'cos(ix) = cosh x（没有 i），sin(ix) = i sinh x，tan(ix) = i tanh x。' },
];
