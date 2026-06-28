import { useCallback, useRef, useState } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';

interface TaylorSeriesProps {
  className?: string;
  height?: number;
}

function taylorSin(x: number, terms: number): number {
  let sum = 0;
  let term = x;
  let n = 0;
  for (let i = 0; i < terms; i++) {
    sum += term;
    n += 2;
    term = -term * x * x / (n * (n + 1));
  }
  return sum;
}

export default function TaylorSeries({
  className = '',
  height = 450,
}: TaylorSeriesProps) {
  const [terms, setTerms] = useState(3);
  const [xVal, setXVal] = useState(1.0);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const termsRef = useRef(terms);
  const xRef = useRef(xVal);

  termsRef.current = terms;
  xRef.current = xVal;
  playingRef.current = playing;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      ctx.save();

      const margin = { top: 30, right: 40, bottom: 60, left: 55 };
      const plotW = w - margin.left - margin.right;
      const plotH = h - margin.top - margin.bottom;

      const xMin = -2.5 * Math.PI;
      const xMax = 2.5 * Math.PI;
      const yMin = -2.2;
      const yMax = 2.2;

      const toX = (val: number) => margin.left + plotW * (val - xMin) / (xMax - xMin);
      const toY = (val: number) => margin.top + plotH * (1 - (val - yMin) / (yMax - yMin));

      const currentTerms = termsRef.current;
      const currentX = playingRef.current
        ? xMin + ((time * 0.8) % (xMax - xMin))
        : xRef.current;

      ctx.fillStyle = '#f7fafc';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      const xStep = Math.PI / 2;
      for (let xv = xMin; xv <= xMax; xv += xStep) {
        if (Math.abs(xv) < 0.001) continue;
        ctx.beginPath();
        ctx.moveTo(toX(xv), margin.top);
        ctx.lineTo(toX(xv), margin.top + plotH);
        ctx.stroke();
      }
      for (let yv = -2; yv <= 2; yv += 1) {
        if (yv === 0) continue;
        ctx.beginPath();
        ctx.moveTo(margin.left, toY(yv));
        ctx.lineTo(margin.left + plotW, toY(yv));
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(margin.left, toY(0));
      ctx.lineTo(margin.left + plotW, toY(0));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(toX(0), margin.top);
      ctx.lineTo(toX(0), margin.top + plotH);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      const xLabels: [number, string][] = [
        [-2 * Math.PI, '-2π'], [-Math.PI, '-π'],
        [0, '0'], [Math.PI, 'π'], [2 * Math.PI, '2π'],
      ];
      for (const [xv, lbl] of xLabels) {
        ctx.fillText(lbl, toX(xv), margin.top + plotH + 16);
      }
      ctx.textAlign = 'right';
      for (let yv = -2; yv <= 2; yv++) {
        ctx.fillText(String(yv), margin.left - 8, toY(yv) + 4);
      }

      // Draw original sin(x) — solid blue
      ctx.strokeStyle = '#3182ce';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      const steps = 400;
      for (let i = 0; i <= steps; i++) {
        const xv = xMin + (i / steps) * (xMax - xMin);
        const yv = Math.sin(xv);
        const sx = toX(xv);
        const sy = toY(yv);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Draw Taylor approximation — dashed red
      ctx.strokeStyle = '#e53e3e';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      let firstApproxPoint = true;
      for (let i = 0; i <= steps; i++) {
        const xv = xMin + (i / steps) * (xMax - xMin);
        const yv = taylorSin(xv, currentTerms);
        const sx = toX(xv);
        const sy = toY(yv);
        if (firstApproxPoint) {
          ctx.moveTo(sx, sy);
          firstApproxPoint = false;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw current x marker (vertical dashed line)
      const cxPx = toX(currentX);
      ctx.strokeStyle = '#805ad5';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cxPx, margin.top);
      ctx.lineTo(cxPx, margin.top + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point markers
      const sinY = Math.sin(currentX);
      const approxY = taylorSin(currentX, currentTerms);

      // Sin point
      ctx.fillStyle = '#3182ce';
      ctx.beginPath();
      ctx.arc(toX(currentX), toY(sinY), 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Approx point
      ctx.fillStyle = '#e53e3e';
      ctx.beginPath();
      ctx.arc(toX(currentX), toY(approxY), 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Info box
      const infoX = 12;
      const infoY = 20;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.fillRect(infoX, infoY, 240, 90);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(infoX, infoY, 240, 90);

      ctx.textAlign = 'left';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillStyle = '#1a365d';
      ctx.fillText(`泰勒展开项数: ${currentTerms}`, infoX + 10, infoY + 20);
      ctx.fillText(`x = ${currentX.toFixed(3)}`, infoX + 10, infoY + 40);

      ctx.font = '13px system-ui, sans-serif';
      ctx.fillStyle = '#3182ce';
      ctx.fillText(`sin(x) = ${sinY.toFixed(6)}`, infoX + 10, infoY + 60);

      ctx.fillStyle = '#e53e3e';
      ctx.fillText(`近似值 = ${approxY.toFixed(6)}`, infoX + 10, infoY + 78);

      // Legend
      const legY = h - 18;
      ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#3182ce';
      ctx.fillRect(margin.left, legY - 4, 20, 3);
      ctx.fillStyle = '#1a365d';
      ctx.fillText('sin(x) 原函数', margin.left + 25, legY + 1);

      ctx.fillStyle = '#e53e3e';
      const dashStart = margin.left + 140;
      ctx.fillRect(dashStart, legY - 4, 20, 3);
      ctx.fillStyle = '#1a365d';
      ctx.fillText('泰勒近似', dashStart + 25, legY + 1);

      ctx.restore();
    },
    [],
  );

  const controls = (
    <>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-sm text-gray-600 whitespace-nowrap">
          项数: {terms}
        </span>
        <input
          type="range"
          min={1}
          max={15}
          step={1}
          value={terms}
          onChange={(e) => {
            setTerms(parseInt(e.target.value));
            playingRef.current = false;
            setPlaying(false);
          }}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
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
          setTerms(3);
          setXVal(1.0);
          setPlaying(false);
          playingRef.current = false;
        }}
      />
    </div>
  );
}
