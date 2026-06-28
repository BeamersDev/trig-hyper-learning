import { useCallback, useState } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';
import MathFormula from '../MathFormula';

interface TransformExplorerProps {
  className?: string;
  height?: number;
}

export default function TransformExplorer({ className = '', height = 400 }: TransformExplorerProps) {
  const [A, setA] = useState(1);
  const [omega, setOmega] = useState(1);
  const [phi, setPhi] = useState(0);
  const [b, setB] = useState(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, _time: number) => {
    ctx.save();

    const pad = { top: 20, bottom: 30, left: 40, right: 20 };
    const gw = w - pad.left - pad.right;
    const gh = h - pad.top - pad.bottom;
    const gx = pad.left;
    const gy = pad.top;

    // Background
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    const xSteps = 6;
    const ySteps = 4;
    for (let i = 0; i <= xSteps; i++) {
      ctx.beginPath();
      ctx.moveTo(gx + (gw / xSteps) * i, gy);
      ctx.lineTo(gx + (gw / xSteps) * i, gy + gh);
      ctx.stroke();
    }
    for (let i = 0; i <= ySteps; i++) {
      ctx.beginPath();
      ctx.moveTo(gx, gy + (gh / ySteps) * i);
      ctx.lineTo(gx + gw, gy + (gh / ySteps) * i);
      ctx.stroke();
    }

    // Axes
    const cx = gx;
    const cy = gy + gh / 2;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(gx, cy);
    ctx.lineTo(gx + gw, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx, gy + gh);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('1', gx - 4, cy - gh / 4 + 4);
    ctx.fillText('-1', gx - 4, cy + gh / 4 + 4);
    ctx.fillText('0', gx - 4, cy + 4);

    // X range: 0 to 4π
    const xRange = 4 * Math.PI;
    const xScale = gw / xRange;
    const yScale = gh / 3;

    // Draw reference y = sin(x)
    ctx.strokeStyle = '#cbd5e0';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let px = 0; px <= gw; px++) {
      const x = px / xScale;
      const y = -Math.sin(x) * yScale;
      const screenY = cy + y;
      if (px === 0) ctx.moveTo(gx + px, screenY);
      else ctx.lineTo(gx + px, screenY);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw transformed: A * sin(ωx + φ) + b
    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px <= gw; px++) {
      const x = px / xScale;
      const y = - (A * Math.sin(omega * x + phi) + b) * yScale;
      const screenY = cy + y;
      if (px === 0) ctx.moveTo(gx + px, screenY);
      else ctx.lineTo(gx + px, screenY);
    }
    ctx.stroke();

    // Legend
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.strokeStyle = '#cbd5e0';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(gx + 10, gy + 14);
    ctx.lineTo(gx + 40, gy + 14);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('y = sin(x)', gx + 44, gy + 18);

    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(gx + 10, gy + 30);
    ctx.lineTo(gx + 40, gy + 30);
    ctx.stroke();
    ctx.fillStyle = '#1a365d';
    ctx.fillText('y = A·sin(ωx+φ)+b', gx + 44, gy + 34);

    // X axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('π', gx + gw / 4, gy + gh + 14);
    ctx.fillText('2π', gx + gw / 2, gy + gh + 14);
    ctx.fillText('3π', gx + 3 * gw / 4, gy + gh + 14);
    ctx.fillText('4π', gx + gw, gy + gh + 14);

    ctx.restore();
  }, [A, omega, phi, b]);

  return (
    <div className={className}>
      <div className="mb-2 text-center">
        <MathFormula formula={`y = ${A}\\cdot\\sin(${omega}x ${phi >= 0 ? '+' : ''}${phi})+${b}`} displayMode />
      </div>
      <InteractiveCanvas
        draw={draw}
        height={height}
        controls={
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-0.5">振幅 A</label>
              <input type="range" min={0.1} max={3} step={0.1} value={A}
                onChange={e => setA(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              <span className="text-xs text-gray-600">{A.toFixed(1)}</span>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-0.5">角频率 ω</label>
              <input type="range" min={0.1} max={4} step={0.1} value={omega}
                onChange={e => setOmega(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              <span className="text-xs text-gray-600">{omega.toFixed(1)}</span>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-0.5">相位 φ</label>
              <input type="range" min={-Math.PI} max={Math.PI} step={0.1} value={phi}
                onChange={e => setPhi(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              <span className="text-xs text-gray-600">{(phi * 180 / Math.PI).toFixed(0)}°</span>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-0.5">垂直位移 b</label>
              <input type="range" min={-2} max={2} step={0.1} value={b}
                onChange={e => setB(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
              <span className="text-xs text-gray-600">{b.toFixed(1)}</span>
            </div>
          </div>
        }
        onReset={() => { setA(1); setOmega(1); setPhi(0); setB(0); }}
      />
    </div>
  );
}
