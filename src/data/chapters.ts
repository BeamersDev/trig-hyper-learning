export interface Section {
  id: string;
  title: string;
  chapter: number;
  section: number;
}

export interface Chapter {
  id: number;
  title: string;
  sections: Section[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: '从单位圆开始',
    sections: [
      { id: '1-1', title: '角度与弧度', chapter: 1, section: 1 },
      { id: '1-2', title: '单位圆上的三角函数', chapter: 1, section: 2 },
      { id: '1-3', title: '三角函数线', chapter: 1, section: 3 },
      { id: '1-4', title: '特殊角与常用值', chapter: 1, section: 4 },
    ],
  },
  {
    id: 2,
    title: '三角函数图像与性质',
    sections: [
      { id: '2-1', title: 'sin/cos/tan图像', chapter: 2, section: 1 },
      { id: '2-2', title: '周期振幅相位', chapter: 2, section: 2 },
      { id: '2-3', title: '图像变换', chapter: 2, section: 3 },
      { id: '2-4', title: '奇偶性与对称性', chapter: 2, section: 4 },
    ],
  },
  {
    id: 3,
    title: '恒等式与公式',
    sections: [
      { id: '3-1', title: '诱导公式', chapter: 3, section: 1 },
      { id: '3-2', title: '同角关系', chapter: 3, section: 2 },
      { id: '3-3', title: '和差角公式', chapter: 3, section: 3 },
      { id: '3-4', title: '倍角/半角公式', chapter: 3, section: 4 },
      { id: '3-5', title: '和积互化', chapter: 3, section: 5 },
    ],
  },
  {
    id: 4,
    title: '三角方程与反三角函数',
    sections: [
      { id: '4-1', title: '基本三角方程', chapter: 4, section: 1 },
      { id: '4-2', title: '反三角函数定义与图像', chapter: 4, section: 2 },
      { id: '4-3', title: '反三角恒等式', chapter: 4, section: 3 },
      { id: '4-4', title: '复合反三角函数', chapter: 4, section: 4 },
    ],
  },
  {
    id: 5,
    title: '双曲函数',
    sections: [
      { id: '5-1', title: '从悬链线到双曲函数', chapter: 5, section: 1 },
      { id: '5-2', title: 'sinh/cosh/tanh 定义与图像', chapter: 5, section: 2 },
      { id: '5-3', title: '双曲恒等式', chapter: 5, section: 3 },
      { id: '5-4', title: '反双曲函数', chapter: 5, section: 4 },
      { id: '5-5', title: '三角 vs 双曲：类比与差异', chapter: 5, section: 5 },
    ],
  },
  {
    id: 6,
    title: '微积分中的三角与双曲',
    sections: [
      { id: '6-1', title: '求导公式', chapter: 6, section: 1 },
      { id: '6-2', title: '积分公式', chapter: 6, section: 2 },
      { id: '6-3', title: '泰勒展开与逼近', chapter: 6, section: 3 },
      { id: '6-4', title: '物理/工程应用实例', chapter: 6, section: 4 },
    ],
  },
  {
    id: 7,
    title: '统一视角：欧拉公式与复数',
    sections: [
      { id: '7-1', title: '欧拉公式 e^(iθ) = cos θ + i sin θ', chapter: 7, section: 1 },
      { id: '7-2', title: '复数表示的三角/双曲关系', chapter: 7, section: 2 },
      { id: '7-3', title: '深入：双曲与三角的复数统一', chapter: 7, section: 3 },
    ],
  },
];

export function getSectionKey(chapter: number, section: number): string {
  return `${chapter}-${section}`;
}
