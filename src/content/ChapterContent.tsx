import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import MathFormula from '../components/MathFormula';
import UnitCircle from '../components/visualizations/UnitCircle';
import TrigGraph from '../components/visualizations/TrigGraph';
import TransformExplorer from '../components/visualizations/TransformExplorer';
import Hyperbolic from '../components/visualizations/Hyperbolic';
import ComparisonView from '../components/visualizations/ComparisonView';
import InverseTrig from '../components/visualizations/InverseTrig';
import TaylorSeries from '../components/visualizations/TaylorSeries';
import EulerFormula from '../components/visualizations/EulerFormula';
import { chapters } from '../data/chapters';
import { markCompleted } from '../components/Layout';

// Chapter content components
function Chapter1_1() {
  useEffect(() => { markCompleted(1, 1); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">1.1 角度与弧度</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          角度和弧度是度量角的两种常用单位。理解它们之间的转换关系是学习三角函数的基石。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">角度制</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        将一个圆周均分为 360 份，每份所对应的圆心角为 1 度（1°）。这种度量方式直观易懂，在日常生活中广泛应用。
      </p>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">弧度制</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        在数学分析中，弧度制更为自然。弧度的定义是：弧长等于半径的圆弧所对的圆心角为 1 弧度（1 rad）。
      </p>

      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm my-6">
        <h4 className="font-semibold mb-3 text-[#1a365d]">核心转换公式</h4>
        <div className="space-y-3">
          <MathFormula formula="360^\circ = 2\pi\ \text{rad}" displayMode />
          <MathFormula formula="180^\circ = \pi\ \text{rad}" displayMode />
          <MathFormula formula="1^\circ = \frac{\pi}{180}\ \text{rad}" displayMode />
          <MathFormula formula="1\ \text{rad} = \frac{180^\circ}{\pi} \approx 57.3^\circ" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">常见角度的弧度值</h3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="px-4 py-2 text-left">角度</th>
              <th className="px-4 py-2 text-center">0°</th><th className="px-4 py-2 text-center">30°</th>
              <th className="px-4 py-2 text-center">45°</th><th className="px-4 py-2 text-center">60°</th>
              <th className="px-4 py-2 text-center">90°</th><th className="px-4 py-2 text-center">180°</th>
              <th className="px-4 py-2 text-center">270°</th><th className="px-4 py-2 text-center">360°</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-gray-200">
              <td className="px-4 py-2 font-semibold text-left">弧度</td>
              <td className="px-4 py-2 text-center">0</td><td className="px-4 py-2 text-center"><MathFormula formula="\pi/6" /></td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\pi/4" /></td><td className="px-4 py-2 text-center"><MathFormula formula="\pi/3" /></td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\pi/2" /></td><td className="px-4 py-2 text-center"><MathFormula formula="\pi" /></td>
              <td className="px-4 py-2 text-center"><MathFormula formula="3\pi/2" /></td><td className="px-4 py-2 text-center"><MathFormula formula="2\pi" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mt-6">
        <p className="text-sm text-gray-700">
          💡 <strong>记忆技巧：</strong>记往 <MathFormula formula="180^\circ = \pi" />，就能推出所有角度与弧度的转换。例如 90° 就是 π/2，60° 就是 π/3。
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：角度可视化</h3>
        <p className="text-gray-600 text-sm mb-3">拖动滑块观察不同角度在单位圆上的位置，感受弧度与角度的对应关系。</p>
        <UnitCircle initialAngle={0} showTan={false} showValues height={380} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <div />
        <Link to="/chapter/1/2" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">
          下一节：单位圆上的三角函数 →
        </Link>
      </div>
    </div>
  );
}

function Chapter1_2() {
  useEffect(() => { markCompleted(1, 2); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">1.2 单位圆上的三角函数</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          单位圆是半径为 1 的圆。在单位圆上，每个角度对应圆上的一个点，该点的坐标直接给出三角函数值。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">单位圆的定义</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        单位圆是圆心在原点、半径为 1 的圆，方程为：
      </p>
      <MathFormula formula="x^2 + y^2 = 1" displayMode />

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">三角函数定义</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        对于单位圆上角度 θ 对应的点 P(x, y)，三角函数定义为：
      </p>
      <div className="space-y-2 bg-white rounded-lg p-5 border border-gray-200 shadow-sm my-4">
        <MathFormula formula="\cos\theta = x" displayMode />
        <MathFormula formula="\sin\theta = y" displayMode />
        <MathFormula formula="\tan\theta = \frac{y}{x} \quad (x \neq 0)" displayMode />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
        <p className="text-sm text-gray-700">
          💡 从单位圆上点的坐标就可以直接读出三角函数值！这是理解三角函数的几何意义的关键。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">象限符号</h3>
      <p className="text-gray-700 leading-relaxed mb-4">各象限三角函数值的符号规律：</p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="px-4 py-2">象限</th><th className="px-4 py-2">角度范围</th>
              <th className="px-4 py-2">sin</th><th className="px-4 py-2">cos</th>
              <th className="px-4 py-2">tan</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b"><td className="px-4 py-2 text-center">I</td><td className="px-4 py-2 text-center">(0°, 90°)</td><td className="px-4 py-2 text-center text-green-600">+</td><td className="px-4 py-2 text-center text-green-600">+</td><td className="px-4 py-2 text-center text-green-600">+</td></tr>
            <tr className="bg-gray-50 border-b"><td className="px-4 py-2 text-center">II</td><td className="px-4 py-2 text-center">(90°, 180°)</td><td className="px-4 py-2 text-center text-green-600">+</td><td className="px-4 py-2 text-center text-red-600">−</td><td className="px-4 py-2 text-center text-red-600">−</td></tr>
            <tr className="bg-white border-b"><td className="px-4 py-2 text-center">III</td><td className="px-4 py-2 text-center">(180°, 270°)</td><td className="px-4 py-2 text-center text-red-600">−</td><td className="px-4 py-2 text-center text-red-600">−</td><td className="px-4 py-2 text-center text-green-600">+</td></tr>
            <tr className="bg-gray-50"><td className="px-4 py-2 text-center">IV</td><td className="px-4 py-2 text-center">(270°, 360°)</td><td className="px-4 py-2 text-center text-red-600">−</td><td className="px-4 py-2 text-center text-green-600">+</td><td className="px-4 py-2 text-center text-red-600">−</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：单位圆与三角函数</h3>
        <p className="text-gray-600 text-sm mb-3">拖动角度滑块，观察 sin、cos、tan 的值如何随角度变化。</p>
        <UnitCircle initialAngle={0.785} showTan showValues height={380} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/1/1" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：角度与弧度</Link>
        <Link to="/chapter/1/3" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：三角函数线 →</Link>
      </div>
    </div>
  );
}

function Chapter1_3() {
  useEffect(() => { markCompleted(1, 3); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">1.3 三角函数线</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角函数线是在单位圆上用几何线段直观表示三角函数值的方法。每条线段的长度对应三角函数值的大小，方向对应符号。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">正弦线</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        从单位圆上的点向 x 轴作垂线，垂线段的长度等于 |sin θ|，方向向上为正，向下为负。这条有向线段称为正弦线。
      </p>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">余弦线</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        从单位圆上的点向 y 轴作垂线，垂线段的长度等于 |cos θ|，方向向右为正，向左为负。这条有向线段称为余弦线。
      </p>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">正切线</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        在单位圆上过 (1, 0) 点作切线，角的终边（或其反向延长线）与该切线的交点到切点的有向线段称为正切线，长度等于 |tan θ|。
      </p>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 my-6">
        <p className="text-sm text-gray-700">
          💡 三角函数线让抽象的三角函数有了直观的几何意义。看到 sin、cos 不再是冰冷的数字，而是可以测量长度的线段！
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：三角函数线</h3>
        <p className="text-gray-600 text-sm mb-3">
          红色线段 = 正弦线，蓝色线段 = 余弦线，橙色线段 = 正切线。观察不同角度下各线段的变化。
        </p>
        <UnitCircle initialAngle={0.785} showTan showValues height={380} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/1/2" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：单位圆上的三角函数</Link>
        <Link to="/chapter/1/4" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：特殊角与常用值 →</Link>
      </div>
    </div>
  );
}

function Chapter1_4() {
  useEffect(() => { markCompleted(1, 4); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">1.4 特殊角与常用值</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          30°、45°、60° 等特殊角的三角函数值经常使用，需要熟练掌握。这些值可以通过单位圆或特殊三角形推导得出。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">特殊角三角函数值表</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="px-4 py-2">角度</th><th className="px-4 py-2 text-center">0°</th><th className="px-4 py-2 text-center">30°</th>
              <th className="px-4 py-2 text-center">45°</th><th className="px-4 py-2 text-center">60°</th><th className="px-4 py-2 text-center">90°</th>
              <th className="px-4 py-2 text-center">180°</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b"><td className="px-4 py-2 font-semibold">sin</td><td className="px-4 py-2 text-center">0</td><td className="px-4 py-2 text-center"><MathFormula formula="\frac{1}{2}" /></td><td className="px-4 py-2 text-center"><MathFormula formula="\frac{\sqrt{2}}{2}" /></td><td className="px-4 py-2 text-center"><MathFormula formula="\frac{\sqrt{3}}{2}" /></td><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center">0</td></tr>
            <tr className="bg-gray-50 border-b"><td className="px-4 py-2 font-semibold">cos</td><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center"><MathFormula formula="\frac{\sqrt{3}}{2}" /></td><td className="px-4 py-2 text-center"><MathFormula formula="\frac{\sqrt{2}}{2}" /></td><td className="px-4 py-2 text-center"><MathFormula formula="\frac{1}{2}" /></td><td className="px-4 py-2 text-center">0</td><td className="px-4 py-2 text-center">-1</td></tr>
            <tr className="bg-white"><td className="px-4 py-2 font-semibold">tan</td><td className="px-4 py-2 text-center">0</td><td className="px-4 py-2 text-center"><MathFormula formula="\frac{\sqrt{3}}{3}" /></td><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center"><MathFormula formula="\sqrt{3}" /></td><td className="px-4 py-2 text-center">不存在</td><td className="px-4 py-2 text-center">0</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">记忆方法</h3>
      <div className="space-y-3">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">方法一：手指法</h4>
          <p className="text-sm text-gray-700">将左手五指分别对应 0°、30°、45°、60°、90°，计算 sin 值时：</p>
          <MathFormula formula="\sin\theta = \frac{\sqrt{n}}{2}" displayMode />
          <p className="text-sm text-gray-700 mt-1">其中 n 从小指到拇指分别为 0, 1, 2, 3, 4。cos 值相反，从拇指到小指。</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">方法二：特殊三角形</h4>
          <p className="text-sm text-gray-700">
            30°-60°-90° 三角形的三边比为 <MathFormula formula="1:\sqrt{3}:2" />；
            45°-45°-90° 三角形的三边比为 <MathFormula formula="1:1:\sqrt{2}" />。
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：特殊角可视化</h3>
        <UnitCircle initialAngle={0.785} showTan showValues height={380} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/1/3" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：三角函数线</Link>
        <Link to="/chapter/2/1" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一章：三角函数图像与性质 →</Link>
      </div>
    </div>
  );
}

function Chapter2_1() {
  useEffect(() => { markCompleted(2, 1); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">2.1 sin/cos/tan 图像</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角函数的图像是其函数性质的直观体现。通过图像，我们可以清晰地看到周期性、振幅、对称性等重要特征。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">y = sin x 的图像</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        正弦曲线呈波浪形，过原点 (0, 0)，在 x = π/2 处取最大值 1，在 x = 3π/2 处取最小值 -1。周期为 2π，值域为 [-1, 1]。
      </p>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">y = cos x 的图像</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        余弦曲线与正弦曲线形状相同，但向左平移了 π/2。在 x = 0 处取最大值 1，在 x = π 处取最小值 -1。周期也为 2π，值域为 [-1, 1]。
      </p>

      <MathFormula formula="\cos x = \sin(x + \frac{\pi}{2})" displayMode />

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">y = tan x 的图像</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        正切曲线由一系列分支组成，周期为 π。在 x = π/2 + kπ 处有垂直渐近线（cos x = 0），值域为全体实数。
      </p>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：三角函数的图像</h3>
        <p className="text-gray-600 text-sm mb-3">单位圆上的点旋转时，同步绘制 sin 和 cos 曲线。可分别开关显示。</p>
        <TrigGraph height={420} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/1/4" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：特殊角与常用值</Link>
        <Link to="/chapter/2/2" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：周期振幅相位 →</Link>
      </div>
    </div>
  );
}

function Chapter2_2() {
  useEffect(() => { markCompleted(2, 2); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">2.2 周期、振幅与相位</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          一般形式的正弦函数 <MathFormula formula="y = A\sin(\omega x + \varphi) + b" /> 中的三个参数 A、ω、φ、b 分别控制图像的振幅、周期、相位和垂直位移。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">振幅 A</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        振幅 A 决定波峰和波谷的高度。函数值在 [-A, A] 之间变化。A 越大，波动越剧烈。
      </p>
      <MathFormula formula="\text{值域} = [-|A|+b, |A|+b]" displayMode />

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">周期 T</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        角频率 ω 决定函数的周期。ω 越大，振荡越快，周期越短。
      </p>
      <MathFormula formula="T = \frac{2\pi}{|\omega|}" displayMode />

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">相位 φ</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        相位 φ 控制图像的水平平移。φ {'>'} 0 时图像向左移，φ {'<'} 0 时向右移。
      </p>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">垂直位移 b</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        b 决定图像的整体上下移动。b {'>'} 0 向上移，b {'<'} 0 向下移。
      </p>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：参数调参器</h3>
        <p className="text-gray-600 text-sm mb-3">调整四个滑块，观察每个参数对函数图像的影响。灰色虚线为参考 y = sin(x)。</p>
        <TransformExplorer height={420} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/2/1" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：sin/cos/tan图像</Link>
        <Link to="/chapter/2/3" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：图像变换 →</Link>
      </div>
    </div>
  );
}

function Chapter2_3() {
  useEffect(() => { markCompleted(2, 3); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">2.3 图像变换</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角函数的图像变换主要包括平移、伸缩和对称三种基本变换。理解这些变换有助于从 y = sin x 出发推导出一般形式的图像。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">平移变换</h3>
      <div className="space-y-3 mb-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-medium text-[#2b6cb0]">水平平移：<MathFormula formula="y = \sin(x - \varphi)" /></p>
          <p className="text-sm text-gray-700 mt-1">φ {'>'} 0 时图像向右平移 φ 个单位；φ {'<'} 0 时向左平移。</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-medium text-[#2b6cb0]">垂直平移：<MathFormula formula="y = \sin x + b" /></p>
          <p className="text-sm text-gray-700 mt-1">b {'>'} 0 时图像向上平移 b 个单位；b {'<'} 0 时向下平移。</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">伸缩变换</h3>
      <div className="space-y-3 mb-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-medium text-[#2b6cb0]">振幅伸缩：<MathFormula formula="y = A\sin x" /></p>
          <p className="text-sm text-gray-700 mt-1">A {'>'} 1 时纵向拉伸到 A 倍；0 {'<'} A {'<'} 1 时纵向压缩。</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-medium text-[#2b6cb0]">周期伸缩：<MathFormula formula="y = \sin(\omega x)" /></p>
          <p className="text-sm text-gray-700 mt-1">ω {'>'} 1 时横向压缩，周期变小；0 {'<'} ω {'<'} 1 时横向拉伸，周期变大。</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">对称变换</h3>
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <div className="space-y-2">
          <p><MathFormula formula="y = -\sin x" />：关于 x 轴对称</p>
          <p><MathFormula formula="y = \sin(-x)" />：关于 y 轴对称</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：图像变换</h3>
        <TransformExplorer height={420} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/2/2" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：周期振幅相位</Link>
        <Link to="/chapter/2/4" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：奇偶性与对称性 →</Link>
      </div>
    </div>
  );
}

function Chapter2_4() {
  useEffect(() => { markCompleted(2, 4); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">2.4 奇偶性与对称性</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角函数的奇偶性和对称性是其重要性质，可用于简化计算和判断函数特性。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">奇偶性</h3>
      <div className="space-y-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-medium text-green-700">y = sin x 是奇函数</p>
          <MathFormula formula="\sin(-x) = -\sin x" displayMode />
          <p className="text-sm text-gray-600 mt-1">图像关于原点对称</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-medium text-blue-700">y = cos x 是偶函数</p>
          <MathFormula formula="\cos(-x) = \cos x" displayMode />
          <p className="text-sm text-gray-600 mt-1">图像关于 y 轴对称</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-medium text-orange-700">y = tan x 是奇函数</p>
          <MathFormula formula="\tan(-x) = -\tan x" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">对称性</h3>
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">正弦曲线的对称性</h4>
        <p className="text-sm text-gray-700">对称轴：<MathFormula formula="x = \frac{\pi}{2} + k\pi" /></p>
        <p className="text-sm text-gray-700">对称中心：<MathFormula formula="(k\pi, 0)" /></p>
      </div>
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">余弦曲线的对称性</h4>
        <p className="text-sm text-gray-700">对称轴：<MathFormula formula="x = k\pi" /></p>
        <p className="text-sm text-gray-700">对称中心：<MathFormula formula="(\frac{\pi}{2} + k\pi, 0)" /></p>
      </div>

      <div className="mt-8">
        <TrigGraph height={420} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/2/3" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：图像变换</Link>
        <Link to="/chapter/3/1" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一章：恒等式与公式 →</Link>
      </div>
    </div>
  );
}

function Chapter3_1() {
  useEffect(() => { markCompleted(3, 1); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">3.1 诱导公式</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          诱导公式是一组将任意角的三角函数转化为锐角三角函数的公式，本质上反映了三角函数的周期性和对称性。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">核心诱导公式</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <MathFormula formula="\sin(-\theta) = -\sin\theta" displayMode />
          <MathFormula formula="\cos(-\theta) = \cos\theta" displayMode />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <MathFormula formula="\sin(\pi - \theta) = \sin\theta" displayMode />
          <MathFormula formula="\cos(\pi - \theta) = -\cos\theta" displayMode />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <MathFormula formula="\sin(\pi + \theta) = -\sin\theta" displayMode />
          <MathFormula formula="\cos(\pi + \theta) = -\cos\theta" displayMode />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <MathFormula formula="\sin(2\pi - \theta) = -\sin\theta" displayMode />
          <MathFormula formula="\cos(2\pi - \theta) = \cos\theta" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">余角公式</h3>
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
        <MathFormula formula="\sin(\frac{\pi}{2} - \theta) = \cos\theta" displayMode />
        <MathFormula formula="\cos(\frac{\pi}{2} - \theta) = \sin\theta" displayMode />
        <MathFormula formula="\tan(\frac{\pi}{2} - \theta) = \cot\theta" displayMode />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
        <p className="text-sm text-gray-700">
          💡 <strong>记忆口诀："奇变偶不变，符号看象限"</strong> — 当角度为 π/2 的奇数倍时，函数名改变（sin ↔ cos, tan ↔ cot）；偶数倍时函数名不变。符号由原角所在象限决定。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/2/4" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：奇偶性与对称性</Link>
        <Link to="/chapter/3/2" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：同角关系 →</Link>
      </div>
    </div>
  );
}

function Chapter3_2() {
  useEffect(() => { markCompleted(3, 2); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">3.2 同角关系</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          同一个角的三角函数之间存在密切联系，这些关系式是三角恒等变换的基础。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">基本恒等式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <h4 className="font-semibold text-[#2b6cb0] mb-3">平方关系</h4>
        <MathFormula formula="\sin^2\theta + \cos^2\theta = 1" displayMode />
        <div className="mt-2 text-sm text-gray-600">由单位圆方程 <MathFormula formula="x^2 + y^2 = 1" /> 直接推导。</div>
      </div>

      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <h4 className="font-semibold text-[#2b6cb0] mb-3">商数关系</h4>
        <MathFormula formula="\tan\theta = \frac{\sin\theta}{\cos\theta}" displayMode />
        <div className="text-sm text-gray-600 mt-1">成立条件：<MathFormula formula="\cos\theta \neq 0" /></div>
      </div>

      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <h4 className="font-semibold text-[#2b6cb0] mb-3">衍生恒等式</h4>
        <MathFormula formula="1 + \tan^2\theta = \sec^2\theta" displayMode />
        <MathFormula formula="1 + \cot^2\theta = \csc^2\theta" displayMode />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
        <p className="text-sm text-gray-700">
          💡 已知 sin θ 求 cos θ 时，用 <MathFormula formula="\cos\theta = \pm\sqrt{1-\sin^2\theta}" />，符号由 θ 所在象限决定。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/3/1" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：诱导公式</Link>
        <Link to="/chapter/3/3" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：和差角公式 →</Link>
      </div>
    </div>
  );
}

function Chapter3_3() {
  useEffect(() => { markCompleted(3, 3); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">3.3 和差角公式</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          和差角公式将两个角的和或差的三角函数用这两个角的三角函数表示，是推导其他三角恒等式的基础。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">正弦的和差公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta" displayMode />
        <MathFormula formula="\sin(\alpha - \beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta" displayMode />
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">余弦的和差公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta" displayMode />
        <MathFormula formula="\cos(\alpha - \beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta" displayMode />
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">正切的和差公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\tan(\alpha + \beta) = \frac{\tan\alpha + \tan\beta}{1 - \tan\alpha\tan\beta}" displayMode />
        <MathFormula formula="\tan(\alpha - \beta) = \frac{\tan\alpha - \tan\beta}{1 + \tan\alpha\tan\beta}" displayMode />
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
        <p className="text-sm text-gray-700">
          ✏️ <strong>例题：</strong>求 sin 75° 的值。<br />
          解：sin 75° = sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30°
          = <MathFormula formula="\frac{\sqrt{2}}{2} \cdot \frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2} \cdot \frac{1}{2} = \frac{\sqrt{6} + \sqrt{2}}{4}" />
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/3/2" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：同角关系</Link>
        <Link to="/chapter/3/4" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：倍角/半角公式 →</Link>
      </div>
    </div>
  );
}

function Chapter3_4() {
  useEffect(() => { markCompleted(3, 4); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">3.4 倍角/半角公式</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          倍角公式和半角公式是和差角公式的特殊情况，在实际计算中有着广泛的应用。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">二倍角公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sin 2\theta = 2\sin\theta\cos\theta" displayMode />
        <MathFormula formula="\cos 2\theta = \cos^2\theta - \sin^2\theta" displayMode />
        <MathFormula formula="\cos 2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta" displayMode />
        <MathFormula formula="\tan 2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}" displayMode />
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">三倍角公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sin 3\theta = 3\sin\theta - 4\sin^3\theta" displayMode />
        <MathFormula formula="\cos 3\theta = 4\cos^3\theta - 3\cos\theta" displayMode />
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">半角公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sin\frac{\theta}{2} = \pm\sqrt{\frac{1 - \cos\theta}{2}}" displayMode />
        <MathFormula formula="\cos\frac{\theta}{2} = \pm\sqrt{\frac{1 + \cos\theta}{2}}" displayMode />
        <MathFormula formula="\tan\frac{\theta}{2} = \frac{1 - \cos\theta}{\sin\theta} = \frac{\sin\theta}{1 + \cos\theta}" displayMode />
      </div>
      <p className="text-sm text-gray-600 mb-4">半角公式中符号由 θ/2 所在象限决定。</p>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
        <p className="text-sm text-gray-700">
          ✏️ <strong>例题：</strong>已知 cos θ = 3/5，求 cos 2θ。<br />
          解：cos 2θ = 2 cos²θ - 1 = 2·(9/25) - 1 = 18/25 - 1 = -7/25
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/3/3" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：和差角公式</Link>
        <Link to="/chapter/3/5" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：和积互化 →</Link>
      </div>
    </div>
  );
}

function Chapter3_5() {
  useEffect(() => { markCompleted(3, 5); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">3.5 和积互化</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          和积互化公式包括和差化积与积化和差两类公式，在积分计算和三角方程求解中十分有用。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">和差化积</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sin\alpha + \sin\beta = 2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}" displayMode />
        <MathFormula formula="\sin\alpha - \sin\beta = 2\cos\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}" displayMode />
        <MathFormula formula="\cos\alpha + \cos\beta = 2\cos\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}" displayMode />
        <MathFormula formula="\cos\alpha - \cos\beta = -2\sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}" displayMode />
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">积化和差</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sin\alpha\cos\beta = \frac{1}{2}[\sin(\alpha+\beta) + \sin(\alpha-\beta)]" displayMode />
        <MathFormula formula="\cos\alpha\sin\beta = \frac{1}{2}[\sin(\alpha+\beta) - \sin(\alpha-\beta)]" displayMode />
        <MathFormula formula="\cos\alpha\cos\beta = \frac{1}{2}[\cos(\alpha+\beta) + \cos(\alpha-\beta)]" displayMode />
        <MathFormula formula="\sin\alpha\sin\beta = \frac{1}{2}[\cos(\alpha-\beta) - \cos(\alpha+\beta)]" displayMode />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
        <p className="text-sm text-gray-700">
          💡 和差化积与积化和差是互逆的变换。记公式时，注意每种变换结果是两部分的组合，系数多为 1/2 或 2。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/3/4" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：倍角/半角公式</Link>
        <Link to="/practice" className="px-4 py-2 bg-[#dd6b20] text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">✏️ 做练习 →</Link>
      </div>
    </div>
  );
}

function Chapter4_1() {
  useEffect(() => { markCompleted(4, 1); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">4.1 基本三角方程</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角方程是包含三角函数的方程。了解三角函数的周期性和值域是求解三角方程的关键。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">基本方程及其通解</h3>
      <div className="space-y-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">sin x = a</h4>
          <p className="text-sm text-gray-700 mb-2">当 |a| ≤ 1 时，通解为：</p>
          <MathFormula formula="x = k\pi + (-1)^k \arcsin a \quad (k \in \mathbb{Z})" displayMode />
          <p className="text-xs text-gray-500 mt-1">等价于：x = arcsin a + 2kπ 或 x = π - arcsin a + 2kπ</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">cos x = a</h4>
          <p className="text-sm text-gray-700 mb-2">当 |a| ≤ 1 时，通解为：</p>
          <MathFormula formula="x = 2k\pi \pm \arccos a \quad (k \in \mathbb{Z})" displayMode />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">tan x = a</h4>
          <p className="text-sm text-gray-700 mb-2">通解为：</p>
          <MathFormula formula="x = k\pi + \arctan a \quad (k \in \mathbb{Z})" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">在指定区间上的解</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        通常题目要求在 [0, 2π) 或 [-π, π] 上求解。先写出通解，再取适当的整数 k 使解落在指定区间内。
      </p>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-4">
        <p className="text-sm text-gray-700">
          ✏️ <strong>例题：</strong>解方程 sin x = 1/2，x ∈ [0, 2π)。<br />
          解：通解 x = kπ + (-1)^k · π/6。<br />
          k=0: x = π/6, k=1: x = π - π/6 = 5π/6, k=2: x = 2π + π/6 = 13π/6 (超出区间)<br />
          ∴ x = π/6 或 5π/6。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/3/5" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：和积互化</Link>
        <Link to="/chapter/4/2" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：反三角函数定义与图像 →</Link>
      </div>
    </div>
  );
}

function Chapter4_2() {
  useEffect(() => { markCompleted(4, 2); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">4.2 反三角函数定义与图像</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角函数的反函数称为反三角函数。由于三角函数不是一一映射，需要限制定义域后才能定义反函数。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">反正弦函数 arcsin</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="y = \arcsin x \iff x = \sin y, \ y \in [-\frac{\pi}{2}, \frac{\pi}{2}]" displayMode />
        <p className="text-sm text-gray-600 mt-2">定义域：[-1, 1]，值域：[-π/2, π/2]，单调递增的奇函数。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">反余弦函数 arccos</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="y = \arccos x \iff x = \cos y, \ y \in [0, \pi]" displayMode />
        <p className="text-sm text-gray-600 mt-2">定义域：[-1, 1]，值域：[0, π]，单调递减，非奇非偶。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">反正切函数 arctan</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="y = \arctan x \iff x = \tan y, \ y \in (-\frac{\pi}{2}, \frac{\pi}{2})" displayMode />
        <p className="text-sm text-gray-600 mt-2">定义域：R，值域：(-π/2, π/2)，单调递增的奇函数，有水平渐近线 y = ±π/2。</p>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 记忆反函数值域时牢记：arcsin 和 arctan 取值靠近 0，范围对称；arccos 取值在 [0, π] 范围。
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：反三角函数图像</h3>
        <p className="text-gray-600 text-sm mb-3">实线为原函数，虚线为反函数（关于 y=x 对称）。拖动滑块观察函数值和反函数值的对应关系。</p>
        <InverseTrig height={480} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/4/1" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：基本三角方程</Link>
        <Link to="/chapter/4/3" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：反三角恒等式 →</Link>
      </div>
    </div>
  );
}

function Chapter4_3() {
  useEffect(() => { markCompleted(4, 3); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">4.3 反三角恒等式</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          反三角函数之间存在有趣的关系式，这些恒等式在积分计算和三角变换中非常有用。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">基本恒等式</h3>
      <div className="space-y-3 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">互补关系</h4>
          <MathFormula formula="\arcsin x + \arccos x = \frac{\pi}{2} \quad (x \in [-1, 1])" displayMode />
          <p className="text-xs text-gray-500 mt-1">这是因为 sin(π/2 - θ) = cos θ</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">负自变量</h4>
          <MathFormula formula="\arcsin(-x) = -\arcsin x" displayMode />
          <MathFormula formula="\arccos(-x) = \pi - \arccos x" displayMode />
          <MathFormula formula="\arctan(-x) = -\arctan x" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">三角与反三角的复合</h3>
      <div className="space-y-3 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">反函数恒等式（定义域内）</h4>
          <MathFormula formula="\sin(\arcsin x) = x" displayMode />
          <MathFormula formula="\cos(\arccos x) = x" displayMode />
          <MathFormula formula="\tan(\arctan x) = x" displayMode />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">三角函数的反函数值</h4>
          <MathFormula formula="\arcsin(\sin \theta) = \theta \quad (\theta \in [-\pi/2, \pi/2])" displayMode />
          <MathFormula formula="\arccos(\cos \theta) = \theta \quad (\theta \in [0, \pi])" displayMode />
          <MathFormula formula="\arctan(\tan \theta) = \theta \quad (\theta \in (-\pi/2, \pi/2))" displayMode />
          <p className="text-xs text-gray-500 mt-1">注意：θ 必须在对应反函数的值域内等号才成立！</p>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 arcsin x 和 arccos x 的和恒为 π/2。这是反三角函数最重要的恒等式之一，常用于相互转化。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/4/2" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：反三角函数定义与图像</Link>
        <Link to="/chapter/4/4" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：复合反三角函数 →</Link>
      </div>
    </div>
  );
}

function Chapter4_4() {
  useEffect(() => { markCompleted(4, 4); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">4.4 复合反三角函数</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角函数与反三角函数的复合表达式可以化简为代数式。通常设反三角函数值为 θ，利用三角关系求解。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">化简准则</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        处理复合表达式的一般策略：设 θ = 反三角函数值，写出 sin θ / cos θ 的值，再用三角恒等式求所需量。
      </p>

      <div className="space-y-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">cos(arcsin x)</h4>
          <p className="text-sm text-gray-700">设 θ = arcsin x，则 sin θ = x，θ ∈ [-π/2, π/2] → cos θ ≥ 0</p>
          <MathFormula formula="\cos(\arcsin x) = \sqrt{1 - x^2}" displayMode />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">sin(arccos x)</h4>
          <p className="text-sm text-gray-700">设 θ = arccos x，则 cos θ = x，θ ∈ [0, π] → sin θ ≥ 0</p>
          <MathFormula formula="\sin(\arccos x) = \sqrt{1 - x^2}" displayMode />
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">tan(arcsin x)</h4>
          <MathFormula formula="\tan(\arcsin x) = \frac{x}{\sqrt{1 - x^2}}" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">反三角函数的二倍角</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\cos(2\arcsin x) = 1 - 2x^2" displayMode />
        <MathFormula formula="\sin(2\arcsin x) = 2x\sqrt{1 - x^2}" displayMode />
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-4">
        <p className="text-sm text-gray-700">
          ✏️ <strong>例题：</strong>求 tan(arcsin(3/5))。<br />
          解：设 θ = arcsin(3/5)，则 sin θ = 3/5，cos θ = √(1 - 9/25) = 4/5。<br />
          ∴ tan(arcsin(3/5)) = tan θ = (3/5)/(4/5) = 3/4。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/4/3" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：反三角恒等式</Link>
        <Link to="/chapter/5/1" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一章：双曲函数 →</Link>
      </div>
    </div>
  );
}

function Chapter5_1() {
  useEffect(() => { markCompleted(5, 1); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">5.1 从悬链线到双曲函数</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          双曲函数起源于对悬链线和双曲线的研究，是三角函数在"双曲世界"中的对应物。它们与指数函数有着天然的密切联系。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">悬链线问题</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        一条均匀柔软的链条在重力作用下悬挂，两端固定在同一水平线上，链条形成的曲线称为悬链线。其方程为：
      </p>
      <MathFormula formula="y = a\cosh\frac{x}{a} = \frac{a}{2}(e^{x/a} + e^{-x/a})" displayMode />
      <p className="text-sm text-gray-600 mb-4">
        注意：悬链线不是抛物线！尽管它们形状相似，但悬链线是指数函数的组合。
      </p>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">双曲函数的指数定义</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <MathFormula formula="\cosh x = \frac{e^x + e^{-x}}{2}" displayMode />
        <MathFormula formula="\sinh x = \frac{e^x - e^{-x}}{2}" displayMode />
        <MathFormula formula="\tanh x = \frac{\sinh x}{\cosh x} = \frac{e^x - e^{-x}}{e^x + e^{-x}}" displayMode />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 双曲函数与三角函数在指数形式上的类比：
          <MathFormula formula="\cos\theta = (e^{i\theta} + e^{-i\theta})/2" />
          <MathFormula formula="\sin\theta = (e^{i\theta} - e^{-i\theta})/(2i)" />
          只需将 i 去掉，就得到双曲函数的定义！
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/4/4" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：复合反三角函数</Link>
        <Link to="/chapter/5/2" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：sinh/cosh/tanh 定义与图像 →</Link>
      </div>
    </div>
  );
}

function Chapter5_2() {
  useEffect(() => { markCompleted(5, 2); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">5.2 sinh/cosh/tanh 定义与图像</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          双曲函数 sinh、cosh、tanh 分别对应三角函数的 sin、cos、tan，它们在单位双曲线上有类似的几何解释。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">单位双曲线的参数化</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        单位双曲线方程为 <MathFormula formula="x^2 - y^2 = 1" />，可以用参数 t 表示为：
      </p>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="x = \cosh t, \quad y = \sinh t" displayMode />
        <p className="text-sm text-gray-600 mt-2">
          参数 t 的几何意义：双曲线扇形面积的两倍（类比单位圆中 θ = 扇形面积的两倍）。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">各函数性质</h3>
      <div className="space-y-3 mb-6">
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400 border border-gray-200">
          <h4 className="font-semibold text-sm text-red-700">sinh x（双曲正弦）</h4>
          <p className="text-sm text-gray-700">奇函数，值域 R，单调递增。过原点 (0, 0)。当 x → ∞ 时 ~ eˣ/2。</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400 border border-gray-200">
          <h4 className="font-semibold text-sm text-blue-700">cosh x（双曲余弦）</h4>
          <p className="text-sm text-gray-700">偶函数，值域 [1, +∞)。最低点 (0, 1)，形如悬链线。当 x → ±∞ 时 ~ e<sup>|x|</sup>/2。</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400 border border-gray-200">
          <h4 className="font-semibold text-sm text-orange-700">tanh x（双曲正切）</h4>
          <p className="text-sm text-gray-700">奇函数，值域 (-1, 1)。有水平渐近线 y = ±1。在神经网络中常用作激活函数（sigmoid 的缩放版）。</p>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 与三角函数的关键区别：sinh 和 cosh 的值域都是无界（或半无界）的，不像 sin 和 cos 限制在 [-1, 1]。
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：双曲函数可视化</h3>
        <p className="text-gray-600 text-sm mb-3">单位双曲线 x²-y²=1，可拖拽参数 t 观察 sinh、cosh、tanh 的几何意义。</p>
        <Hyperbolic height={450} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/5/1" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：从悬链线到双曲函数</Link>
        <Link to="/chapter/5/3" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：双曲恒等式 →</Link>
      </div>
    </div>
  );
}

function Chapter5_3() {
  useEffect(() => { markCompleted(5, 3); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">5.3 双曲恒等式</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          双曲函数也有一套完整的恒等式体系，与三角函数恒等式有着惊人的相似性，但需要注意符号差异。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">基本恒等式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\cosh^2 x - \sinh^2 x = 1" displayMode />
        <p className="text-sm text-gray-600 mt-1">对应 sin²θ + cos²θ = 1，但这里是减号！</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">和差公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sinh(x \pm y) = \sinh x \cosh y \pm \cosh x \sinh y" displayMode />
        <MathFormula formula="\cosh(x \pm y) = \cosh x \cosh y \pm \sinh x \sinh y" displayMode />
        <p className="text-sm text-gray-600 mt-1">注意 cosh 的和差公式符号与三角相同，而 sinh 的也相同（与三角一致）。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">二倍角公式</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\sinh 2x = 2\sinh x \cosh x" displayMode />
        <MathFormula formula="\cosh 2x = \cosh^2 x + \sinh^2 x = 2\cosh^2 x - 1 = 1 + 2\sinh^2 x" displayMode />
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">Osborn 法则</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          将任意的三角恒等式转化为双曲恒等式的法则：将三角恒等式中的 sin 替换为 i·sinh，cos 替换为 cosh，然后利用 i² = -1 化简。
          等价地：将 sin² 替换为 -sinh²（因为 sin²x → (i·sinh)² = -sinh²）。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/5/2" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：sinh/cosh/tanh 定义与图像</Link>
        <Link to="/chapter/5/4" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：反双曲函数 →</Link>
      </div>
    </div>
  );
}

function Chapter5_4() {
  useEffect(() => { markCompleted(5, 4); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">5.4 反双曲函数</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          双曲函数的反函数称为反双曲函数。由于双曲函数可以用指数函数表示，因此反双曲函数都可以用自然对数表达。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">arsinh x（反双曲正弦）</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\operatorname{arsinh} x = \ln(x + \sqrt{x^2 + 1})" displayMode />
        <p className="text-sm text-gray-600 mt-2">定义域：R，值域：R。奇函数，图像关于原点对称。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">arcosh x（反双曲余弦）</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\operatorname{arcosh} x = \ln(x + \sqrt{x^2 - 1})" displayMode />
        <p className="text-sm text-gray-600 mt-2">定义域：[1, +∞)，通常取主值 ≥ 0（因为 cosh 是偶函数）。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">artanh x（反双曲正切）</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-4">
        <MathFormula formula="\operatorname{artanh} x = \frac{1}{2}\ln\frac{1 + x}{1 - x}" displayMode />
        <p className="text-sm text-gray-600 mt-2">定义域：(-1, 1)。奇函数，当 x → ±1 时分别趋于 ±∞。</p>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 反双曲函数在积分表中常用，因为它们能简化含 √(x²±1) 和 √(1-x²) 的积分表达式。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/5/3" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：双曲恒等式</Link>
        <Link to="/chapter/5/5" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：三角 vs 双曲：类比与差异 →</Link>
      </div>
    </div>
  );
}

function Chapter5_5() {
  useEffect(() => { markCompleted(5, 5); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">5.5 三角 vs 双曲：类比与差异</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角（圆）函数和双曲函数构成了一对精妙的数学对应关系。理解它们的类比和差异有助于全面掌握两者的性质。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">核心对比表</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="px-4 py-2 text-left">性质</th>
              <th className="px-4 py-2 text-center">三角函数</th>
              <th className="px-4 py-2 text-center">双曲函数</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-4 py-2 font-semibold">几何来源</td>
              <td className="px-4 py-2 text-center">单位圆 x²+y²=1</td>
              <td className="px-4 py-2 text-center">单位双曲线 x²-y²=1</td>
            </tr>
            <tr className="bg-gray-50 border-b">
              <td className="px-4 py-2 font-semibold">参数意义</td>
              <td className="px-4 py-2 text-center">θ = 扇形面积×2</td>
              <td className="px-4 py-2 text-center">t = 双曲扇形面积×2</td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-4 py-2 font-semibold">基本恒等式</td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\sin^2\theta+\cos^2\theta=1" /></td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\cosh^2t-\sinh^2t=1" /></td>
            </tr>
            <tr className="bg-gray-50 border-b">
              <td className="px-4 py-2 font-semibold">值域(sin/sinh)</td>
              <td className="px-4 py-2 text-center">[-1, 1]</td>
              <td className="px-4 py-2 text-center text-red-600">R（无界）</td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-4 py-2 font-semibold">值域(cos/cosh)</td>
              <td className="px-4 py-2 text-center">[-1, 1]</td>
              <td className="px-4 py-2 text-center text-red-600">[1, +∞)</td>
            </tr>
            <tr className="bg-gray-50 border-b">
              <td className="px-4 py-2 font-semibold">导数关系</td>
              <td className="px-4 py-2 text-center"><MathFormula formula="(\sin x)'=\cos x" /><br /><MathFormula formula="(\cos x)'=-\sin x" /></td>
              <td className="px-4 py-2 text-center text-green-600"><MathFormula formula="(\sinh x)'=\cosh x" /><br /><MathFormula formula="(\cosh x)'=\sinh x" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">关键差异总结</h3>
      <div className="space-y-3 mb-6">
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400 border border-gray-200">
          <p className="text-sm text-gray-700"><strong>有界 vs 无界：</strong>三角函数值始终在 [-1, 1]，而双曲函数（sinh、cosh）值可以任意大。</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400 border border-gray-200">
          <p className="text-sm text-gray-700"><strong>导数符号：</strong>cos 的导数是 -sin（有负号），而 cosh 的导数是 sinh（无负号）。因此双曲函数无振荡行为。</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400 border border-gray-200">
          <p className="text-sm text-gray-700"><strong>恒等式符号：</strong>基本恒等式中 sin² 前符号为 +，sinh² 前符号为 −。Osborn 法则可系统转换。</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：并排对比</h3>
        <p className="text-gray-600 text-sm mb-3">左侧单位圆，右侧单位双曲线。用统一参数观察三角和双曲的对应关系。</p>
        <ComparisonView height={480} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/5/4" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：反双曲函数</Link>
        <Link to="/chapter/6/1" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一章：微积分中的三角与双曲 →</Link>
      </div>
    </div>
  );
}

function Chapter6_1() {
  useEffect(() => { markCompleted(6, 1); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">6.1 求导公式</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角函数的导数具有优美的循环性质。双曲函数的导数更为简洁——没有负号，且相互转换。掌握这些求导公式是微积分的基础。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">三角函数的导数</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-600 mb-2">六个基本三角函数的求导公式：</p>
        <div className="space-y-2">
          <MathFormula formula="(\\sin x)' = \\cos x" displayMode />
          <MathFormula formula="(\\cos x)' = -\\sin x" displayMode />
          <MathFormula formula="(\\tan x)' = \\sec^2 x = \\frac{1}{\\cos^2 x}" displayMode />
          <MathFormula formula="(\\cot x)' = -\\csc^2 x" displayMode />
          <MathFormula formula="(\\sec x)' = \\sec x \\tan x" displayMode />
          <MathFormula formula="(\\csc x)' = -\\csc x \\cot x" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">双曲函数的导数</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-600 mb-2">双曲函数的导数循环更简单：</p>
        <div className="space-y-2">
          <MathFormula formula="(\\sinh x)' = \\cosh x" displayMode />
          <MathFormula formula="(\\cosh x)' = \\sinh x" displayMode />
          <MathFormula formula="(\\tanh x)' = \\operatorname{sech}^2 x = \\frac{1}{\\cosh^2 x}" displayMode />
          <MathFormula formula="(\\coth x)' = -\\operatorname{csch}^2 x" displayMode />
          <MathFormula formula="(\\operatorname{sech} x)' = -\\operatorname{sech} x \\tanh x" displayMode />
          <MathFormula formula="(\\operatorname{csch} x)' = -\\operatorname{csch} x \\coth x" displayMode />
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 <strong>关键差异：</strong>cos 的导数是 -sin（有负号），而 cosh 的导数是 sinh（无负号）。这意味着双曲函数不会产生振荡行为。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">链式法则扩展</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <MathFormula formula="(\\sin(ax+b))' = a\\cos(ax+b)" displayMode />
        <MathFormula formula="(\\cos(ax+b))' = -a\\sin(ax+b)" displayMode />
        <MathFormula formula="(e^{\\sin x})' = e^{\\sin x}\\cos x" displayMode />
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-4">
        <p className="text-sm text-gray-700">
          ✏️ <strong>例题：</strong>求 y = sin(3x²) 的导数。<br />
          解：y' = cos(3x²) · 6x = 6x cos(3x²)
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/5/5" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：三角 vs 双曲</Link>
        <Link to="/chapter/6/2" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：积分公式 →</Link>
      </div>
    </div>
  );
}

function Chapter6_2() {
  useEffect(() => { markCompleted(6, 2); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">6.2 积分公式</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          积分是微分的逆运算。三角和双曲函数的不定积分有规律可循，记住基本公式后可以应对大多数积分问题。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">三角函数的基本积分</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <div className="space-y-2">
          <MathFormula formula="\\int \\sin x \\,dx = -\\cos x + C" displayMode />
          <MathFormula formula="\\int \\cos x \\,dx = \\sin x + C" displayMode />
          <MathFormula formula="\\int \\tan x \\,dx = -\\ln|\\cos x| + C = \\ln|\\sec x| + C" displayMode />
          <MathFormula formula="\\int \\cot x \\,dx = \\ln|\\sin x| + C" displayMode />
          <MathFormula formula="\\int \\sec x \\,dx = \\ln|\\sec x + \\tan x| + C" displayMode />
          <MathFormula formula="\\int \\csc x \\,dx = -\\ln|\\csc x + \\cot x| + C" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">平方型积分</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <div className="space-y-2">
          <MathFormula formula="\\int \\sec^2 x \\,dx = \\tan x + C" displayMode />
          <MathFormula formula="\\int \\csc^2 x \\,dx = -\\cot x + C" displayMode />
          <MathFormula formula="\\int \\sec x \\tan x \\,dx = \\sec x + C" displayMode />
          <MathFormula formula="\\int \\csc x \\cot x \\,dx = -\\csc x + C" displayMode />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">双曲函数的积分</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <div className="space-y-2">
          <MathFormula formula="\\int \\sinh x \\,dx = \\cosh x + C" displayMode />
          <MathFormula formula="\\int \\cosh x \\,dx = \\sinh x + C" displayMode />
          <MathFormula formula="\\int \\tanh x \\,dx = \\ln|\\cosh x| + C" displayMode />
          <MathFormula formula="\\int \\operatorname{sech}^2 x \\,dx = \\tanh x + C" displayMode />
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 <strong>积分技巧：</strong>遇到 sin²x 或 cos²x 的积分，常用二倍角公式化为一次项：<MathFormula formula="\\sin^2 x = \\frac{1-\\cos 2x}{2}" />
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-4">
        <p className="text-sm text-gray-700">
          ✏️ <strong>例题：</strong>求 ∫ sin²x dx。<br />
          解：∫ sin²x dx = ∫ (1 - cos 2x)/2 dx = x/2 - sin(2x)/4 + C。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/6/1" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：求导公式</Link>
        <Link to="/chapter/6/3" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：泰勒展开与逼近 →</Link>
      </div>
    </div>
  );
}

function Chapter6_3() {
  useEffect(() => { markCompleted(6, 3); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">6.3 泰勒展开与逼近</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          泰勒展开将函数表示为幂级数之和。对于 sin x 和 cos x，其泰勒展开在整个实数轴上收敛。通过有限项截断，我们可以用多项式逼近三角函数。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">sin x 的麦克劳林展开</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <MathFormula formula="\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\frac{x^9}{9!} - \\cdots" displayMode />
        <MathFormula formula="\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(2n+1)!} x^{2n+1}" displayMode />
        <p className="text-sm text-gray-600 mt-2">只有奇次项，且符号交替。所有 x ∈ R 都收敛。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">cos x 的麦克劳林展开</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <MathFormula formula="\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\frac{x^8}{8!} - \\cdots" displayMode />
        <MathFormula formula="\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(2n)!} x^{2n}" displayMode />
        <p className="text-sm text-gray-600 mt-2">只有偶次项，首项为 1。所有 x ∈ R 都收敛。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">逼近精度</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        泰勒定理告诉我们，n 项截断的误差为余项 <MathFormula formula="R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!} x^{n+1}" />。对于 sin 和 cos，|f⁽ⁿ⁾(ξ)| ≤ 1，所以误差不超过 <MathFormula formula="|x|^{n+1}/(n+1)!" />。
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        随着项数增加，因子 1/(n+1)! 迅速衰减，使得展开在很少的项数下就能达到很高的精度。例如，只用前 5 项就能将 sin x 在 |x| ≤ π 内的误差控制在 10⁻³ 以下。
      </p>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：泰勒逼近可视化</h3>
        <p className="text-gray-600 text-sm mb-3">蓝色实线为 sin(x) 原函数，红色虚线为泰勒多项式逼近。拖动项数滑块观察逼近效果如何随项数增加而改善。</p>
        <TaylorSeries height={450} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/6/2" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：积分公式</Link>
        <Link to="/chapter/6/4" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：物理/工程应用实例 →</Link>
      </div>
    </div>
  );
}

function Chapter6_4() {
  useEffect(() => { markCompleted(6, 4); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">6.4 物理/工程应用实例</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          三角和双曲函数的微积分在物理和工程中有着广泛的应用，从简谐振动到电路分析，从悬索桥到相对论。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">简谐振动 (SHM)</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 mb-2">位移：x(t) = A cos(ωt + φ)</p>
        <MathFormula formula="v(t) = x'(t) = -A\\omega\\sin(\\omega t + \\varphi)" displayMode />
        <MathFormula formula="a(t) = v'(t) = -A\\omega^2\\cos(\\omega t + \\varphi) = -\\omega^2 x(t)" displayMode />
        <p className="text-sm text-gray-600 mt-2">加速度与位移成正比且反向——这就是简谐运动的标志。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">RLC 电路分析</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 mb-2">交流电 i(t) = I₀ sin(ωt)：</p>
        <div className="space-y-2">
          <MathFormula formula="v_R = iR = I_0 R\\sin(\\omega t)" displayMode />
          <MathFormula formula="v_L = L\\frac{di}{dt} = \\omega L I_0\\cos(\\omega t)" displayMode />
          <MathFormula formula="v_C = \\frac{1}{C}\\int i\\,dt = -\\frac{I_0}{\\omega C}\\cos(\\omega t)" displayMode />
        </div>
        <p className="text-sm text-gray-600 mt-2">微分/积分使得电阻、电感、电容上的电压产生 90° 相位差。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">悬链线与双曲函数</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 mb-2">悬索桥的主缆形状为悬链线：y = a cosh(x/a)</p>
        <MathFormula formula="y' = \\sinh(x/a)" displayMode />
        <MathFormula formula="\\text{弧长} = \\int \\sqrt{1 + (y')^2}\\,dx = \\int \\cosh(x/a)\\,dx = a\\sinh(x/a) + C" displayMode />
        <MathFormula formula="\\text{曲率} = \\frac{y''}{(1+(y')^2)^{3/2}} = \\frac{1}{a\\cosh^2(x/a)}" displayMode />
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">傅里叶级数入门</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 mb-2">任意周期函数可分解为三角函数的和：</p>
        <MathFormula formula="f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left(a_n\\cos nx + b_n\\sin nx\\right)" displayMode />
        <p className="text-sm text-gray-600 mt-2">其中系数由积分求得（利用正交性）：</p>
        <MathFormula formula="a_n = \\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\cos nx\\,dx" displayMode />
        <MathFormula formula="b_n = \\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\sin nx\\,dx" displayMode />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 三角函数的微积分使它们成为描述波动、振动和周期现象的自然语言。从弹簧振子到电磁波，三角函数无处不在。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/6/3" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：泰勒展开与逼近</Link>
        <Link to="/chapter/7/1" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一章：欧拉公式与复数 →</Link>
      </div>
    </div>
  );
}

function Chapter7_1() {
  useEffect(() => { markCompleted(7, 1); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">7.1 欧拉公式 e^{'{'}iθ{'}'} = cos θ + i sin θ</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          欧拉公式将复指数函数与三角函数联系起来，被费曼称为"数学中最非凡的公式"。它揭示了指数函数与三角函数之间深刻的统一性。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">欧拉公式的陈述</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <MathFormula formula="e^{i\\theta} = \\cos\\theta + i\\sin\\theta" displayMode />
        <p className="text-sm text-gray-600 mt-2">对任意实数 θ 成立。特别的，θ = π 时得到欧拉恒等式：</p>
        <MathFormula formula="e^{i\\pi} + 1 = 0" displayMode />
        <p className="text-sm text-gray-500 mt-1">这个等式将五个最重要的数学常数 (e, i, π, 1, 0) 联系在一起。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">几何解释</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        在复平面上，e^{'{'}iθ{'}'} 对应单位圆上角度为 θ 的点。实部为 cos θ，虚部为 sin θ。随着 θ 从 0 增加到 2π，该点绕原点旋转一周。
      </p>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <h4 className="font-semibold text-sm text-[#2b6cb0] mb-2">重要性质</h4>
        <div className="space-y-2">
          <MathFormula formula="|e^{i\\theta}| = 1" displayMode />
          <MathFormula formula="e^{i(\\theta+2\\pi)} = e^{i\\theta}" displayMode />
          <MathFormula formula="e^{i(\\theta_1+\\theta_2)} = e^{i\\theta_1}e^{i\\theta_2}" displayMode />
          <MathFormula formula="(e^{i\\theta})^n = e^{in\\theta} = \\cos n\\theta + i\\sin n\\theta" displayMode />
        </div>
        <p className="text-sm text-gray-600 mt-2">最后一条即棣莫弗定理 (De Moivre's Theorem)。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">导出三角恒等式</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        欧拉公式提供了一种优雅的方式导出三角恒等式。利用指数运算性质可以大大简化推导。
      </p>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 mb-2"><strong>导出二倍角公式：</strong></p>
        <MathFormula formula="e^{i2\\theta} = (e^{i\\theta})^2 = (\\cos\\theta + i\\sin\\theta)^2" displayMode />
        <MathFormula formula="\\cos 2\\theta + i\\sin 2\\theta = (\\cos^2\\theta - \\sin^2\\theta) + i(2\\sin\\theta\\cos\\theta)" displayMode />
        <p className="text-sm text-gray-600 mt-2">比较实部和虚部即得 sin 2θ 和 cos 2θ 的公式。</p>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 欧拉公式是连接三角函数、复数和指数函数的桥梁。在傅里叶分析、量子力学和信号处理中都有核心应用。
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#1a365d] mb-3">交互探索：复平面旋转</h3>
        <p className="text-gray-600 text-sm mb-3">拖动 θ 观察 e^{'{'}iθ{'}'} 在复平面上的运动。红色为 cos θ（实部），蓝色为 sin θ（虚部）。</p>
        <EulerFormula height={480} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/6/4" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：物理/工程应用实例</Link>
        <Link to="/chapter/7/2" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：复数表示的三角/双曲关系 →</Link>
      </div>
    </div>
  );
}

function Chapter7_2() {
  useEffect(() => { markCompleted(7, 2); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">7.2 复数表示的三角/双曲关系</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          利用欧拉公式，三角函数和双曲函数都可以用复指数简洁表示。这种表示揭示了它们之间的深层联系。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">三角函数的复指数表示</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <MathFormula formula="\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}" displayMode />
        <MathFormula formula="\\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}" displayMode />
        <MathFormula formula="\\tan\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{i(e^{i\\theta} + e^{-i\\theta})}" displayMode />
        <p className="text-sm text-gray-600 mt-2">这解释了为什么余弦是偶函数、正弦是奇函数。</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">双曲函数的复指数表示</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <MathFormula formula="\\cosh x = \\frac{e^x + e^{-x}}{2}" displayMode />
        <MathFormula formula="\\sinh x = \\frac{e^x - e^{-x}}{2}" displayMode />
        <MathFormula formula="\\tanh x = \\frac{e^x - e^{-x}}{e^x + e^{-x}}" displayMode />
        <p className="text-sm text-gray-600 mt-2">与三角函数惊人相似——只需去掉 i！</p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">三角与双曲的复数桥梁</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        将虚数参数代入三角函数，就得到双曲函数；反之亦然。虚数单位 i 是连接两者的钥匙。
      </p>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <div className="space-y-2">
          <MathFormula formula="\\cos(ix) = \\cosh x" displayMode />
          <MathFormula formula="\\sin(ix) = i\\sinh x" displayMode />
          <MathFormula formula="\\tan(ix) = i\\tanh x" displayMode />
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <div className="space-y-2">
          <MathFormula formula="\\cosh(ix) = \\cos x" displayMode />
          <MathFormula formula="\\sinh(ix) = i\\sin x" displayMode />
          <MathFormula formula="\\tanh(ix) = i\\tan x" displayMode />
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 <strong>记忆技巧：</strong>从 sin x 到 sinh x 的转换只需把 x 换成 ix 再除以 i：sinh x = -i sin(ix)。反过来 sin x = -i sinh(ix)。
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400 mb-4">
        <p className="text-sm text-gray-700">
          ✏️ <strong>验证：</strong>cosh²x - sinh²x = cos²(ix) - (-i sin(ix))² = cos²(ix) - (-1)sin²(ix) = cos²(ix) + sin²(ix) = 1 ✓
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/7/1" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：欧拉公式</Link>
        <Link to="/chapter/7/3" className="px-4 py-2 bg-[#2b6cb0] text-white rounded-lg hover:bg-[#1a365d] transition-colors text-sm">下一节：深入：双曲与三角的复数统一 →</Link>
      </div>
    </div>
  );
}

function Chapter7_3() {
  useEffect(() => { markCompleted(7, 3); }, []);
  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-[#1a365d] mb-4">7.3 深入：双曲与三角的复数统一</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#2b6cb0]">
        <p className="text-gray-700 leading-relaxed">
          从更高的视角看，三角函数和双曲函数本质上是同一解析函数在不同"方向"上的表现。虚数 i 在复平面上实现了 90° 旋转，将圆变为双曲线。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">统一视角</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 mb-3">
          考虑复变量 z 上的函数：
        </p>
        <MathFormula formula="\\sin z = \\frac{e^{iz} - e^{-iz}}{2i}" displayMode />
        <MathFormula formula="\\cos z = \\frac{e^{iz} + e^{-iz}}{2}" displayMode />
        <p className="text-sm text-gray-600 mt-2">
          当 z 为实数时，这就是普通三角函数。当 z = ix 为纯虚数时，就退化为双曲函数。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">复平面上的单位"圆"</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 mb-2">
          单位圆的复方程：|z|² = x² + y² = 1 → 参数化为 z = e^{'{'}iθ{'}'}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          单位双曲线的复方程：x² - y² = 1 → 参数化为 z = e^t（实参数）
        </p>
        <p className="text-sm text-gray-600 mt-2">
          在复平面上，将 Re 轴旋转 90°（乘以 i）就将圆方程 x² + y² = 1 变为 x² - y² = 1 的双曲线方程。
        </p>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">完整对比表</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#1a365d] text-white">
              <th className="px-4 py-2 text-left">关系</th>
              <th className="px-4 py-2 text-center">三角</th>
              <th className="px-4 py-2 text-center">双曲</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="px-4 py-2 font-semibold">定义域</td>
              <td className="px-4 py-2 text-center">R（角度）</td>
              <td className="px-4 py-2 text-center">R（面积参数）</td>
            </tr>
            <tr className="bg-gray-50 border-b">
              <td className="px-4 py-2 font-semibold">复表示</td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\\frac{e^{i\\theta}\\pm e^{-i\\theta}}{2,\\,2i}" /></td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\\frac{e^x\\pm e^{-x}}{2}" /></td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-4 py-2 font-semibold">有界性</td>
              <td className="px-4 py-2 text-center">[-1, 1]</td>
              <td className="px-4 py-2 text-center text-red-600">无界</td>
            </tr>
            <tr className="bg-gray-50 border-b">
              <td className="px-4 py-2 font-semibold">基本恒等式</td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\\cos^2+\\sin^2=1" /></td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\\cosh^2-\\sinh^2=1" /></td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-4 py-2 font-semibold">导数循环</td>
              <td className="px-4 py-2 text-center">周期 4：sin→cos→-sin→-cos</td>
              <td className="px-4 py-2 text-center">周期 2：sinh→cosh→sinh→...</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 font-semibold">复数桥梁</td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\\cos(ix)=\\cosh x" /></td>
              <td className="px-4 py-2 text-center"><MathFormula formula="\\cosh(ix)=\\cos x" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-[#1a365d] mt-6 mb-3">哲学意义</h3>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          在复分析中，三角函数和双曲函数并非两类独立的函数，而是同一解析函数在不同截面上的投影。
          当我们在实数轴上观察时，看到的是三角函数的有界振荡；当沿着虚轴观察时，看到的是双曲函数的指数增长。
          这种统一性正是欧拉公式所揭示的深刻数学真理。
        </p>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
        <p className="text-sm text-gray-700">
          💡 欧拉公式不仅是计算工具，更是数学统一性的象征。它告诉我们：圆与双曲线、振荡与增长、周期与无界，本质上源于同一个复解析函数。
        </p>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/chapter/7/2" className="px-4 py-2 text-[#2b6cb0] hover:text-[#1a365d] transition-colors text-sm">← 上一节：复数表示的三角/双曲关系</Link>
        <Link to="/practice" className="px-4 py-2 bg-[#dd6b20] text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">✏️ 做练习 →</Link>
      </div>
    </div>
  );
}

// Map of chapter content components
const contentMap: Record<string, React.ComponentType> = {
  '1-1': Chapter1_1,
  '1-2': Chapter1_2,
  '1-3': Chapter1_3,
  '1-4': Chapter1_4,
  '2-1': Chapter2_1,
  '2-2': Chapter2_2,
  '2-3': Chapter2_3,
  '2-4': Chapter2_4,
  '3-1': Chapter3_1,
  '3-2': Chapter3_2,
  '3-3': Chapter3_3,
  '3-4': Chapter3_4,
  '3-5': Chapter3_5,
  '4-1': Chapter4_1,
  '4-2': Chapter4_2,
  '4-3': Chapter4_3,
  '4-4': Chapter4_4,
  '5-1': Chapter5_1,
  '5-2': Chapter5_2,
  '5-3': Chapter5_3,
  '5-4': Chapter5_4,
  '5-5': Chapter5_5,
  '6-1': Chapter6_1,
  '6-2': Chapter6_2,
  '6-3': Chapter6_3,
  '6-4': Chapter6_4,
  '7-1': Chapter7_1,
  '7-2': Chapter7_2,
  '7-3': Chapter7_3,
};

export default function ChapterPage() {
  const { chapter, section } = useParams();
  const key = `${chapter}-${section}`;
  const Content = contentMap[key];

  if (!Content) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">内容未找到</p>
        <p className="text-sm text-gray-400 mt-2">章节 {chapter}.{section} 暂不可用</p>
      </div>
    );
  }

  return <Content />;
}
