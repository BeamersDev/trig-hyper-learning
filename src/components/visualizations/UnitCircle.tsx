import { useCallback, useRef, useState } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';
import MathFormula from '../MathFormula';

interface UnitCircleProps {
  initialAngle?: number;
  showTan?: boolean;
  showValues?: boolean;
  className?: string;
  height?: number;
}

export default function UnitCircle({
  initialAngle = 0,
  showTan = true,
  showValues = true,
  className = '',
  height = 400,
}: UnitCircleProps) {
  const [angle, setAngle] = useState(initialAngle);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const angleRef = useRef(angle);

  angleRef.current = angle;
  playingRef.current = playing;

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
    ctx.save();

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 40;
    const currentAngle = playingRef.current
      ? (time * 1.2) % (2 * Math.PI)
      : angleRef.current;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    const gridStep = radius / 2;
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * gridStep, cy - radius - 10);
      ctx.lineTo(cx + i * gridStep, cy + radius + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - radius - 10, cy + i * gridStep);
      ctx.lineTo(cx + radius + 10, cy + i * gridStep);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - radius - 20, cy);
    ctx.lineTo(cx + radius + 20, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 20);
    ctx.lineTo(cx, cy + radius + 20);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('1', cx + radius + 12, cy + 4);
    ctx.fillText('-1', cx - radius - 12, cy + 4);
    ctx.textAlign = 'right';
    ctx.fillText('1', cx - 6, cy - radius + 4);
    ctx.fillText('-1', cx - 8, cy + radius + 4);

    // Unit circle
    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Point on circle
    const px = cx + radius * Math.cos(currentAngle);
    const py = cy - radius * Math.sin(currentAngle);

    // sin line (vertical, red)
    ctx.strokeStyle = '#e53e3e';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(px, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.setLineDash([]);

    // cos line (horizontal, blue)
    ctx.strokeStyle = '#3182ce';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, py);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.setLineDash([]);

    // tan line
    if (showTan && Math.abs(Math.cos(currentAngle)) > 0.05) {
      const tanVal = Math.tan(currentAngle);
      const tanX = cx + radius;
      const tanY = cy - radius * tanVal;

      ctx.strokeStyle = '#dd6b20';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(cx + radius, cy);
      ctx.lineTo(tanX, tanY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Radius line
    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Point dot
    ctx.fillStyle = '#dd6b20';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Angle arc
    ctx.strokeStyle = '#805ad5';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (currentAngle >= 0) {
      ctx.arc(cx, cy, 20, Math.PI * 1.5 - currentAngle, Math.PI * 1.5);
    } else {
      ctx.arc(cx, cy, 20, Math.PI * 1.5, Math.PI * 1.5 - currentAngle);
    }
    ctx.stroke();

    // Values display
    if (showValues) {
      const sinVal = Math.sin(currentAngle);
      const cosVal = Math.cos(currentAngle);
      const deg = ((currentAngle * 180) / Math.PI) % 360;
      const degDisplay = deg < 0 ? deg + 360 : deg;

      ctx.fillStyle = '#1a365d';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`θ = ${degDisplay.toFixed(1)}°`, 12, 24);
      ctx.fillText(`θ = ${currentAngle.toFixed(3)} rad`, 12, 44);

      ctx.fillStyle = '#e53e3e';
      ctx.fillText(`sin θ = ${cosVal.toFixed(4)}`, 12, 68);

      ctx.fillStyle = '#3182ce';
      ctx.fillText(`cos θ = ${sinVal.toFixed(4)}`, 12, 88);

      if (showTan && Math.abs(Math.cos(currentAngle)) > 0.01) {
        ctx.fillStyle = '#dd6b20';
        ctx.fillText(`tan θ = ${Math.tan(currentAngle).toFixed(4)}`, 12, 108);
      }
    }

    ctx.restore();
  }, [showTan, showValues]);

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
              <span className="text-sm text-gray-600 w-10 text-right">
                {degDisplay.toFixed(0)}°
              </span>
              <input
                type="range"
                min={0}
                max={2 * Math.PI}
                step={0.01}
                value={angle}
                onChange={(e) => {
                  setAngle(parseFloat(e.target.value));
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
        }
        onReset={() => {
          setAngle(0);
          setPlaying(false);
          playingRef.current = false;
        }}
      />
    </div>
  );
}
