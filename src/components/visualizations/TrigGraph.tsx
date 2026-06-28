import { useCallback, useRef, useState, useEffect } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';

interface TrigGraphProps {
  className?: string;
  height?: number;
}

export default function TrigGraph({ className = '', height = 400 }: TrigGraphProps) {
  const [speed, setSpeed] = useState(1);
  const [showSin, setShowSin] = useState(true);
  const [showCos, setShowCos] = useState(true);
  const speedRef = useRef(speed);
  const showSinRef = useRef(showSin);
  const showCosRef = useRef(showCos);
  const playingRef = useRef(true);

  speedRef.current = speed;
  showSinRef.current = showSin;
  showCosRef.current = showCos;

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
    ctx.save();

    const cx = w * 0.3;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 30;
    const t = time * speedRef.current;

    // Background
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(0, 0, w, h);

    // ─── LEFT: Unit Circle ───
    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    const gs = radius / 2;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * gs, cy - radius - 5);
      ctx.lineTo(cx + i * gs, cy + radius + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - radius - 5, cy + i * gs);
      ctx.lineTo(cx + radius + 5, cy + i * gs);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - radius - 10, cy);
    ctx.lineTo(cx + radius + 10, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 10);
    ctx.lineTo(cx, cy + radius + 10);
    ctx.stroke();

    // Circle
    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Point
    const px = cx + radius * Math.cos(t);
    const py = cy - radius * Math.sin(t);

    // Radius line
    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sin line
    if (showSinRef.current) {
      ctx.strokeStyle = '#e53e3e';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(px, cy);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Cos line
    if (showCosRef.current) {
      ctx.strokeStyle = '#3182ce';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, py);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Point dot
    ctx.fillStyle = '#dd6b20';
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Angle arc
    ctx.strokeStyle = '#805ad5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 15, -t, 0);
    ctx.stroke();

    // ─── RIGHT: Graph ───
    const gx = w * 0.52;
    const gw = w * 0.44;
    const gy = cy;
    const gh = radius * 2;

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= gw; x += gw / 8) {
      ctx.beginPath();
      ctx.moveTo(gx + x, gy - gh / 2 - 5);
      ctx.lineTo(gx + x, gy + gh / 2 + 5);
      ctx.stroke();
    }
    for (let y = 0; y <= gh; y += gh / 4) {
      ctx.beginPath();
      ctx.moveTo(gx - 5, gy - gh / 2 + y);
      ctx.lineTo(gx + gw + 5, gy - gh / 2 + y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + gw, gy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(gx, gy - gh / 2);
    ctx.lineTo(gx, gy + gh / 2);
    ctx.stroke();

    // Draw sin curve
    const xScale = gw / (4 * Math.PI);
    const yScale = gh / 2;

    if (showSinRef.current) {
      ctx.strokeStyle = '#e53e3e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= gw; i++) {
        const xVal = (i / xScale);
        const yVal = -Math.sin(xVal) * yScale;
        if (i === 0) ctx.moveTo(gx + i, gy + yVal);
        else ctx.lineTo(gx + i, gy + yVal);
      }
      ctx.stroke();
    }

    if (showCosRef.current) {
      ctx.strokeStyle = '#3182ce';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= gw; i++) {
        const xVal = (i / xScale);
        const yVal = -Math.cos(xVal) * yScale;
        if (i === 0) ctx.moveTo(gx + i, gy + yVal);
        else ctx.lineTo(gx + i, gy + yVal);
      }
      ctx.stroke();
    }

    // Current position marker
    const markerX = gx + (t % (4 * Math.PI)) * xScale;
    ctx.strokeStyle = '#dd6b20';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(markerX, gy - gh / 2);
    ctx.lineTo(markerX, gy + gh / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }, [speed]);

  return (
    <div className={className}>
      <InteractiveCanvas
        draw={draw}
        height={height}
        controls={
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">速度:</span>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.1}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <span className="text-sm text-gray-600 w-8">{speed.toFixed(1)}x</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSin}
                  onChange={(e) => setShowSin(e.target.checked)}
                  className="accent-red-500"
                />
                <span className="text-red-600">sin</span>
              </label>
              <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCos}
                  onChange={(e) => setShowCos(e.target.checked)}
                  className="accent-blue-500"
                />
                <span className="text-blue-600">cos</span>
              </label>
            </div>
          </>
        }
        onReset={() => {}}
      />
    </div>
  );
}
