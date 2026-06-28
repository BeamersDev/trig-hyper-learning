# 项目上下文 — 给后续 agent 的交接文档

## 项目
trig-hyper-learning — 三角函数与双曲函数交互式学习平台
React + TypeScript + Vite + Tailwind + KaTeX + Canvas

## 当前状态 (2026-06-24)
Phase 1-6 全部完成：

### Phase 1-4 (之前完成)
- 章节 1-7 已建成（第1-7章全部完成）
- 8个 Canvas 可视化组件：UnitCircle, TrigGraph, TransformExplorer, Hyperbolic, ComparisonView, InverseTrig, TaylorSeries, EulerFormula
- 73+24=97道练习题，按章节过滤+localStorage 持久化
- 学习进度持久化至 localStorage (key: trig-hyper-progress)
- 2个 localStorage key: trig-hyper-quiz (练习), trig-hyper-progress (进度)
- **错题本功能**：PracticePage 支持"答题模式"和"错题模式"切换，错题模式仅显示答错的题目（results[id] === false），答对后自动从错题列表移除。橙色主题 tab (#dd6b20)，带错误计数徽章。

### Phase 5 — 解题助手 (2026-06-24)
- 新增 `/solver` 路由和 SolverPage 组件
- 纯客户端实现，无后端依赖
- 支持以下模式匹配：
  - 恒等式：sin²x+cos²x → 1, sin(a±b) 展开, cos(a±b) 展开, sin(2x), cos(2x), tan(2x)
  - 求导：d/dx sin x, cos x, tan x, sinh x, cosh x, tanh x 等
  - 求值：sin(π/6), cos(π/4), tan(π/4), sin(π/3), cos(π/3), cos(π/6), sin(π/2), 以及 sin/cos(任意数字)
  - 简化：sin(-x) = -sin(x), cos(-x) = cos(x)
- 显示结果 + 步骤解释 + 相关章节链接
- 快速示例按钮（13个预置表达式）
- 历史记录（最近20条）
- 页面可从侧边栏导航访问

### Phase 6 — Polish (2026-06-24)
- ✅ 所有8个Canvas可视化添加 save/restore 模式（之前UnitCircle/TrigGraph/TransformExplorer缺少，已补充）
- ✅ 添加"回到顶部"按钮（ArrowUp图标），滚动超过400px时显示
- ✅ 路由切换时自动滚动到顶部
- ✅ 已验证侧边栏学习进度标记机制正确（markCompleted在章节组件mount时触发）

## 关键架构决策
- InteractiveCanvas 组件持续运行 requestAnimationFrame 循环
- 所有可视化 draw 函数必须包裹 ctx.save()/restore() 以配合 DPR 缩放（现已全部统一）
- 路由使用 HashRouter（因为 Caddy 静态部署没有 fallback）
- vite.config.ts 设 base: '/trig-hyper/'
- 部署路径: /usr/share/caddy/trig-hyper/
- Caddy 域名: richard969.freeddns.org:8606

## 已修复的 Bug
1. InteractiveCanvas 最初只画一帧不循环 → 改为持续动画
2. UnitCircle 播放按钮不响应 → 使用 playingRef 配合持续循环
3. canvas cursor-crosshair 无意义 → 已移除
4. 表格单元格未居中 → 加 text-center
5. quiz 已答题数统计跨章节 → 改用 filtered 集计算
6. 章节过滤按钮只到第3章 → 改为动态从 chapters 数据生成
7. KaTeX 公式显示为原始文本 → ChapterContent.tsx 中反斜杠转义不一致，统一修复为双反斜杠
8. 错题本自动跳题时选中状态残留 → PracticePage.tsx 在 results 变化且为错题模式时重置 selected/null 和 showResult/false
9. `{iθ}` 在 JSX 文本内容中被解析为 JSX 表达式导致 tsc 报错 → 改为 `{'{'}iθ{'}'}` 转义
10. 公式中的引号在 patch 时被错误转义为 `\"` → 修复为正常引号
11. ChapterContent.tsx 中 contentMap 与 Chapter6_1 函数头被合并 → 拆分修复
12. UnitCircle/TrigGraph/TransformExplorer 缺少 ctx.save()/restore() → Phase 6 已补充

## Phase 5+6 修改的文件
- src/pages/SolverPage.tsx — 新建解题助手页面
- src/App.tsx — 添加 /solver 路由
- src/components/Layout.tsx — 添加解题助手侧边栏链接、回到顶部按钮、路由自动滚动
- src/components/visualizations/UnitCircle.tsx — 添加 save/restore
- src/components/visualizations/TrigGraph.tsx — 添加 save/restore
- src/components/visualizations/TransformExplorer.tsx — 添加 save/restore

## 待做
- 可能扩展：泰勒展开更多函数（cos x, e^x）；路径动画；更多解题模式
- 大chunk优化：当前主bundle ~685KB，可通过动态import拆分优化

## Agent 持久化机制
- 每次 delegate 前，Hermes 会更新此文件
- 每个 agent 收工前**必须**更新此文件，追加本轮改动和 bug 修复
- Claude Code 会话 ID 存入 `.claude-session`，下一轮 agent 用 `--resume` 续接
