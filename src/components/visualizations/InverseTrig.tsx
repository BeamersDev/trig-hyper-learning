import { useCallback, useRef, useState } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';

interface InverseTrigProps {
  className?: string;
  height?: number;
}

export default function InverseTrig({
  className = '',
  height = 480,
}: InverseTrigProps) {
  const [angle, setAngle] = useState(0.5); // ~28.6° (in rad)
  const [showInvSin, setShowInvSin] = useState(true);
  const [showInvCos, setShowInvCos] = useState(true);
  const [showInvTan, setShowInvTan] = useState(true);
  const showInvSinRef = useRef(showInvSin);
  const showInvCosRef = useRef(showInvCos);
  const showInvTanRef = useRef(showInvTan);
  const angleRef = useRef(angle);

  angleRef.current = angle;
  showInvSinRef.current = showInvSin;
  showInvCosRef.current = showInvCos;
  showInvTanRef.current = showInvTan;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, _time: number) => {
      ctx.save();

      const t = angleRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#f7fafc';
      ctx.fillRect(0, 0, w, h);

      // Layout: 3 graphs horizontally
      const pad = 40;
      const graphW = (w - 4 * pad) / 3;
      const graphH = h - 80;
      const graphTop = 50;

      // Helper: draw a single graph panel
      const drawGraph = (
        gx: number,
        gy: number,
        gw: number,
        gh: number,
        title: string,
        fwd: (x: number) => number,
        inv: ((x: number) => number) | null,
        fwdColor: string,
        invColor: string,
        showInv: boolean,
        domainX: [number, number],
        rangeY: [number, number],
        xLabel: string,
        tickStep: number,
      ) => {
        const [xMin, xMax] = domainX;
        const [yMin, yMax] = rangeY;
        const xScale = gw / (xMax - xMin);
        const yScale = gh / (yMax - yMin);

        const toGx = (x: number) => gx + (x - xMin) * xScale;
        const toGy = (y: number) => gy + gh - (y - yMin) * yScale;

        // Background and axes
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.5;

        // Grid lines
        for (let tx = Math.ceil(xMin / tickStep) * tickStep; tx <= xMax; tx += tickStep) {
          const sx = toGx(tx);
          ctx.beginPath();
          ctx.moveTo(sx, gy);
          ctx.lineTo(sx, gy + gh);
          ctx.stroke();
        }
        for (let ty = Math.ceil(yMin / tickStep) * tickStep; ty <= yMax; ty += tickStep) {
          const sy = toGy(ty);
          ctx.beginPath();
          ctx.moveTo(gx, sy);
          ctx.lineTo(gx + gw, sy);
          ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        const zeroY = toGy(0);
        const zeroX = toGx(0);
        ctx.beginPath();
        ctx.moveTo(gx, zeroY);
        ctx.lineTo(gx + gw, zeroY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(zeroX, gy);
        ctx.lineTo(zeroX, gy + gh);
        ctx.stroke();

        // Format tick labels using π notation
        const formatTick = (v: number): string => {
          const ratio = v / Math.PI;
          const eps = 0.001;
          if (Math.abs(ratio - 1) < eps) return 'π';
          if (Math.abs(ratio + 1) < eps) return '-π';
          if (Math.abs(ratio - 2) < eps) return '2π';
          if (Math.abs(ratio + 2) < eps) return '-2π';
          if (Math.abs(ratio - 0.5) < eps) return 'π/2';
          if (Math.abs(ratio + 0.5) < eps) return '-π/2';
          if (Math.abs(ratio - 1.5) < eps) return '3π/2';
          if (Math.abs(ratio + 1.5) < eps) return '-3π/2';
          if (Math.abs(ratio - 0.25) < eps) return 'π/4';
          if (Math.abs(ratio + 0.25) < eps) return '-π/4';
          if (Math.abs(ratio - 0.75) < eps) return '3π/4';
          if (Math.abs(ratio + 0.75) < eps) return '-3π/4';
          return v.toFixed(1);
        };

        // Tick labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px system-ui, sans-serif';
        ctx.textAlign = 'center';
        for (let tx = Math.ceil(xMin / tickStep) * tickStep; tx <= xMax; tx += tickStep) {
          if (Math.abs(tx) < 0.001) continue;
          ctx.fillText(formatTick(tx), toGx(tx), zeroY + 14);
        }
        ctx.textAlign = 'right';
        for (let ty = Math.ceil(yMin / tickStep) * tickStep; ty <= yMax; ty += tickStep) {
          if (Math.abs(ty) < 0.001) continue;
          ctx.fillText(formatTick(ty), zeroX - 4, toGy(ty) + 4);
        }

        // Labels
        ctx.fillStyle = '#64748b';
        ctx.font = '9px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(xLabel, gx + gw / 2, gy + gh + 18);

        // Title
        ctx.fillStyle = '#1a365d';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(title, gx + gw / 2, gy - 8);

        // y = x mirror line (dashed)
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        const mStartX = Math.max(xMin, yMin);
        const mEndX = Math.min(xMax, yMax);
        ctx.moveTo(toGx(mStartX), toGy(mStartX));
        ctx.lineTo(toGx(mEndX), toGy(mEndX));
        ctx.stroke();
        ctx.setLineDash([]);

        // Forward function curve
        ctx.strokeStyle = fwdColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= gw; i++) {
          const x = xMin + (i / gw) * (xMax - xMin);
          const y = fwd(x);
          if (isNaN(y) || !isFinite(y)) {
            first = true;
            continue;
          }
          const sy = toGy(y);
          if (sy < gy - 50 || sy > gy + gh + 50) {
            first = true;
            continue;
          }
          const sx = toGx(x);
          if (first) {
            ctx.moveTo(sx, sy);
            first = false;
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.stroke();

        // Inverse function curve
        if (showInv && inv) {
          ctx.strokeStyle = invColor;
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 3]);
          ctx.beginPath();
          first = true;
          for (let i = 0; i <= gw; i++) {
            const x = xMin + (i / gw) * (xMax - xMin);
            const y = inv(x);
            if (isNaN(y) || !isFinite(y)) {
              first = true;
              continue;
            }
            const sy = toGy(y);
            if (sy < gy - 50 || sy > gy + gh + 50) {
              first = true;
              continue;
            }
            const sx = toGx(x);
            if (first) {
              ctx.moveTo(sx, sy);
              first = false;
            } else {
              ctx.lineTo(sx, sy);
            }
          }
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Current point markers (only if t is within this panel's domain)
        const fwdY = fwd(t);
        if (t >= xMin && t <= xMax && isFinite(fwdY)) {
          const mx = toGx(t);
          const my = toGy(fwdY);
          // Vertical line to x-axis
          ctx.strokeStyle = fwdColor;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(mx, zeroY);
          ctx.lineTo(mx, my);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = fwdColor;
          ctx.beginPath();
          ctx.arc(mx, my, 4, 0, 2 * Math.PI);
          ctx.fill();

          // Value label
          ctx.fillStyle = fwdColor;
          ctx.font = '10px system-ui, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`f(${formatTick(t)})=${fwdY.toFixed(3)}`, gx + 4, gy + 28);
        }

        if (t >= xMin && t <= xMax && showInv && inv) {
          const invY = inv(t);
          if (isFinite(invY)) {
            const mx = toGx(t);
            const my = toGy(invY);
            ctx.fillStyle = invColor;
            ctx.beginPath();
            ctx.arc(mx, my, 4, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = invColor;
            ctx.font = '10px system-ui, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`f⁻¹(${formatTick(t)})=${invY.toFixed(3)}`, gx + 4, gy + 44);
          }
        }
      };

      // Panel 1: sin / arcsin
      const g1x = pad;
      drawGraph(
        g1x, graphTop, graphW, graphH,
        'sin x',
        (x) => Math.sin(x),
        (x) => (x >= -1 && x <= 1 ? Math.asin(x) : NaN),
        '#e53e3e', '#f87171',
        showInvSinRef.current,
        [-Math.PI, Math.PI],
        [-Math.PI / 2 - 0.5, Math.PI / 2 + 0.5],
        'x', Math.PI / 2,
      );

      // Panel 2: cos / arccos
      const g2x = pad * 2 + graphW;
      drawGraph(
        g2x, graphTop, graphW, graphH,
        'cos x',
        (x) => Math.cos(x),
        (x) => (x >= -1 && x <= 1 ? Math.acos(x) : NaN),
        '#3182ce', '#63b3ed',
        showInvCosRef.current,
        [-Math.PI, Math.PI],
        [-0.5, Math.PI + 0.5],
        'x', Math.PI / 2,
      );

      // Panel 3: tan / arctan
      const g3x = pad * 3 + graphW * 2;
      drawGraph(
        g3x, graphTop, graphW, graphH,
        'tan x',
        (x) => Math.tan(x),
        (x) => Math.atan(x),
        '#dd6b20', '#fbbf24',
        showInvTanRef.current,
        [-Math.PI / 2 + 0.15, Math.PI / 2 - 0.15],
        [-Math.PI / 2 - 0.5, Math.PI / 2 + 0.5],
        'x', Math.PI / 4,
      );

      // Bottom legend
      ctx.fillStyle = '#1a365d';
      ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('实线 = 原函数  虚线 = 反函数 (y=x 镜像)', w / 2, h - 10);

      ctx.restore();
    },
    [],
  );

  const deg = ((angle * 180) / Math.PI) % 360;
  const degDisplay = deg < 0 ? deg + 360 : deg;

  return (
    <div className={className}>
      <InteractiveCanvas
        draw={draw}
        height={height}
        controls={
          <>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm text-gray-600 w-12 text-right">
                {degDisplay.toFixed(0)}°
              </span>
              <input
                type="range"
                min={-Math.PI}
                max={Math.PI}
                step={0.02}
                value={angle}
                onChange={(e) => setAngle(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInvSin}
                  onChange={(e) => setShowInvSin(e.target.checked)}
                  className="accent-red-400"
                />
                <span className="text-red-400">arcsin</span>
              </label>
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInvCos}
                  onChange={(e) => setShowInvCos(e.target.checked)}
                  className="accent-blue-400"
                />
                <span className="text-blue-400">arccos</span>
              </label>
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInvTan}
                  onChange={(e) => setShowInvTan(e.target.checked)}
                  className="accent-yellow-500"
                />
                <span className="text-yellow-600">arctan</span>
              </label>
            </div>
          </>
        }
        onReset={() => {
          setAngle(0.5);
        }}
      />
    </div>
  );
}
