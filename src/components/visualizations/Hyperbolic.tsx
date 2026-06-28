import { useCallback, useRef, useState } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';

interface HyperbolicProps {
  initialT?: number;
  className?: string;
  height?: number;
}

export default function Hyperbolic({
  initialT = 0,
  className = '',
  height = 450,
}: HyperbolicProps) {
  const [t, setT] = useState(initialT);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const tRef = useRef(t);

  tRef.current = t;
  playingRef.current = playing;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      ctx.save();

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) / 6; // world units to px

      const currentT = playingRef.current
        ? (time * 1.5) % 4 // animate t cycling continuously 0→4
        : tRef.current;

      const coshT = Math.cosh(currentT);
      const sinhT = Math.sinh(currentT);
      const tanhT = Math.tanh(currentT);

      // World-to-screen transform: world x→right, world y→up
      const toX = (wx: number) => cx + wx * scale;
      const toY = (wy: number) => cy - wy * scale;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#f7fafc';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      const gs = scale;
      for (let wx = -4; wx <= 4; wx++) {
        ctx.beginPath();
        ctx.moveTo(toX(wx), toY(-3));
        ctx.lineTo(toX(wx), toY(3));
        ctx.stroke();
      }
      for (let wy = -3; wy <= 3; wy++) {
        ctx.beginPath();
        ctx.moveTo(toX(-4), toY(wy));
        ctx.lineTo(toX(4), toY(wy));
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(toX(-4.5), toY(0));
      ctx.lineTo(toX(4.5), toY(0));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(-3.5));
      ctx.lineTo(toX(0), toY(3.5));
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('1', toX(1), toY(-0.2));
      ctx.fillText('-1', toX(-1), toY(-0.2));
      ctx.fillText('2', toX(2), toY(-0.2));
      ctx.fillText('-2', toX(-2), toY(-0.2));
      ctx.textAlign = 'right';
      ctx.fillText('1', toX(-0.15), toY(1) + 4);
      ctx.fillText('-1', toX(-0.15), toY(-1) + 4);

      // Unit hyperbola x² - y² = 1, x ≥ 1 (right branch)
      ctx.strokeStyle = '#1a365d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const step = 0.02;
      const maxT_curve = 3.5;
      for (let ct = -maxT_curve; ct <= maxT_curve; ct += step) {
        const ch = Math.cosh(ct);
        const sh = Math.sinh(ct);
        const sx = toX(ch);
        const sy = toY(sh);
        if (ct === -maxT_curve) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Left branch: x = -cosh(t), y = sinh(t)
      ctx.strokeStyle = '#1a365d';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      for (let ct = -maxT_curve; ct <= maxT_curve; ct += step) {
        const ch = Math.cosh(ct);
        const sh = Math.sinh(ct);
        const sx = toX(-ch);
        const sy = toY(sh);
        if (ct === -maxT_curve) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Asymptotes y = ±x
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(toX(-4), toY(-4));
      ctx.lineTo(toX(4), toY(4));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(toX(-4), toY(4));
      ctx.lineTo(toX(4), toY(-4));
      ctx.stroke();
      ctx.setLineDash([]);

      // Point on hyperbola (right branch)
      const px = toX(coshT);
      const py = toY(sinhT);

      // Radius line from origin to point
      ctx.strokeStyle = '#1a365d';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(0));
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // sinh line: point to x-axis (vertical, red)
      ctx.strokeStyle = '#e53e3e';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(px, toY(0));
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // cosh line: from y-axis to point (horizontal, blue) — from (0, sinhT) to (coshT, sinhT)
      // Actually cosh is the x-coordinate. Draw from origin x projection.
      ctx.strokeStyle = '#3182ce';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(toX(0), py);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // tanh segment: at x=1, draw tangent to hyperbola intersection
      // tanh = sinh/cosh. The line from (1,0) to (1, tanhT) on the vertical line x=1
      ctx.strokeStyle = '#dd6b20';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(toX(1), toY(0));
      ctx.lineTo(toX(1), toY(tanhT));
      ctx.stroke();
      ctx.setLineDash([]);

      // Point dot
      ctx.fillStyle = '#dd6b20';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Hyperbolic sector (area t/2 between radius, x-axis, and hyperbola)
      // Draw filled region: approximate with polygon
      ctx.fillStyle = 'rgba(128, 90, 213, 0.12)';
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(0));
      // Draw along hyperbola from t=0 to t=currentT
      const sectorSteps = 40;
      const sign = currentT >= 0 ? 1 : -1;
      for (let i = 0; i <= sectorSteps; i++) {
        const st = (i / sectorSteps) * currentT;
        const sch = Math.cosh(st);
        const ssh = Math.sinh(st);
        ctx.lineTo(toX(sch), toY(ssh));
      }
      ctx.closePath();
      ctx.fill();

      // Sector arc marker on hyperbola
      ctx.strokeStyle = '#805ad5';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);

      // Values display
      ctx.fillStyle = '#1a365d';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`t = ${currentT.toFixed(3)}`, 12, 22);

      ctx.fillStyle = '#3182ce';
      ctx.fillText(`cosh t = ${coshT.toFixed(4)}`, 12, 44);

      ctx.fillStyle = '#e53e3e';
      ctx.fillText(`sinh t = ${sinhT.toFixed(4)}`, 12, 66);

      ctx.fillStyle = '#dd6b20';
      ctx.fillText(`tanh t = ${tanhT.toFixed(4)}`, 12, 88);

      // Legend
      const legendY = h - 24;
      ctx.font = '11px system-ui, sans-serif';
      const drawLegend = (label: string, color: string, x: number) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, legendY - 4, 16, 3);
        ctx.fillStyle = '#1a365d';
        ctx.fillText(label, x + 20, legendY + 1);
      };
      drawLegend('sinh t 线', '#e53e3e', 12);
      drawLegend('cosh t 线', '#3182ce', 120);
      drawLegend('tanh t 线', '#dd6b20', 228);

      ctx.restore();
    },
    [],
  );

  const controls = (
    <>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-sm text-gray-600 w-12 text-right">
          t={t.toFixed(2)}
        </span>
        <input
          type="range"
          min={-3}
          max={3}
          step={0.02}
          value={t}
          onChange={(e) => {
            setT(parseFloat(e.target.value));
            playingRef.current = false;
            setPlaying(false);
          }}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
      </div>
      <button
        onClick={() => {
          setPlaying(!playing);
          playingRef.current = !playing;
        }}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
          playing
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {playing ? '⏸ 暂停' : '▶ 播放'}
      </button>
    </>
  );

  return (
    <div className={className}>
      <InteractiveCanvas
        draw={draw}
        height={height}
        controls={controls}
        onReset={() => {
          setT(0);
          setPlaying(false);
          playingRef.current = false;
        }}
      />
    </div>
  );
}
