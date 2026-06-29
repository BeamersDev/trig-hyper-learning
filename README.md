<div align="center">
  <h1>🧮 三角函数与双曲函数 · 交互式学习平台</h1>

  <p><em>Interactive Learning Platform for Trigonometry & Hyperbolic Functions</em></p>

  <img src="https://img.shields.io/github/last-commit/BeamersDev/trig-hyper-learning?style=flat-square" alt="last commit"/>
  <img src="https://img.shields.io/github/languages/top/BeamersDev/trig-hyper-learning?style=flat-square" alt="top lang"/>
  <img src="https://img.shields.io/github/license/BeamersDev/trig-hyper-learning?style=flat-square" alt="license"/>
  <img src="https://img.shields.io/github/deployments/BeamersDev/trig-hyper-learning/github-pages?style=flat-square&label=deploy" alt="deploy"/>

  <br/>

  <a href="https://beamersdev.github.io/trig-hyper-learning/">🚀 Live Demo</a>

</div>

---

## 📚 Overview

A fully interactive, visual learning platform covering the complete spectrum of trigonometry and hyperbolic functions — from the unit circle to Euler's formula.

Built with **React + TypeScript + Vite + KaTeX**, all visualizations are rendered on **HTML5 Canvas** with real-time interaction.

## 📦 Content

| # | Chapter | Sections |
|---|---------|----------|
| 1 | **从单位圆开始** | 角度与弧度 · 单位圆定义 · 三角函数线 · 特殊角与常用值 |
| 2 | **三角函数图像与性质** | sin/cos/tan 图像 · 周期振幅相位 · 图像变换 · 奇偶性与对称性 |
| 3 | **恒等式与公式** | 诱导公式 · 同角关系 · 和差倍角 · 和积互化 |
| 4 | **三角方程与反三角函数** | 基本三角方程 · 反三角函数定义 · 反函数恒等式 · 复合反三角函数 |
| 5 | **双曲函数** | 悬链线起源 · 定义与基本性质 · 恒等式 · 反双曲函数 · 类比总结 |
| 6 | **微积分中的三角与双曲** | 求导公式 · 积分公式 · 泰勒展开 · 物理/工程应用 |
| 7 | **统一视角：欧拉公式与复数** | 欧拉公式 · 复数表示 · 三角与双曲的复数统一 |

## 🎨 Visualizations

All 8 interactive Canvas components:

- **UnitCircle** — 单位圆上的三角函数（拖拽 + 动画）
- **TrigGraph** — sin/cos/tan 函数图像
- **TransformExplorer** — A·sin(ωx+φ)+b 图像变换
- **Hyperbolic** — 单位双曲线与 sinh/cosh/tanh
- **ComparisonView** — 单位圆 vs 单位双曲线 类比对
- **InverseTrig** — 反三角函数图像与 y=x 镜像
- **TaylorSeries** — 泰勒展开逐项逼近
- **EulerFormula** — 复平面 e^(iθ) 旋转

## 🧪 Features

- **97 道练习题** — 7 章全覆盖，按章节筛选，错题本
- **localStorage 持久化** — 练习进度、学习进度均保留
- **解题助手** — 恒等式化简、求导、求值，分步解答
- **响应式布局** — 桌面 / 移动端均可使用
- **回到顶部** — 长页面自动出现

## 🛠 Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | React 19 + TypeScript |
| Build | Vite + Rolldown |
| Styling | Tailwind CSS 4 |
| Math | KaTeX |
| Visualization | HTML5 Canvas |
| Deploy | GitHub Pages (Actions) |

## 🚀 Quick Start

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
```

## 📄 License

MIT — see [LICENSE](LICENSE).
