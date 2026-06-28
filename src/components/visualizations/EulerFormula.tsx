import { useCallback, useRef, useState } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';

interface EulerFormulaProps {
  className?: string;
  height?: number;
}

export default function EulerFormula({
  className = '',
  height = 480,
}: EulerFormulaProps) {
  const [theta, setTheta] = useState(Math.PI / 4);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const thetaRef = useRef(theta);

  thetaRef.current = theta;
  playingRef.current = playing;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      ctx.save();

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.32;

      const currentTheta = playingRef.current
        ? (time * 1.2) % (2 * Math.PI)
        : thetaRef.current;

      const cosT = Math.cos(currentTheta);
      const sinT = Math.sin(currentTheta);
      const px = cx + radius * cosT;
      const py = cy - radius * sinT; // screen y is flipped

      ctx.fillStyle = '#f7fafc';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 0.5;
      for (let i = -5; i <= 5; i++) {
        const gx = cx + i * radius / 1.5;
        ctx.beginPath();
        ctx.moveTo(gx, cy - radius - 40);
        ctx.lineTo(gx, cy + radius + 40);
        ctx.stroke();
        const gy = cy + i * radius / 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - radius - 40, gy);
        ctx.lineTo(cx + radius + 40, gy);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - radius - 30, cy);
      ctx.lineTo(cx + radius + 30, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - radius - 30);
      ctx.lineTo(cx, cy + radius + 30);
      ctx.stroke();

      // Arrow heads
      const arrowSize = 6;
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(cx + radius + 30, cy);
      ctx.lineTo(cx + radius + 30 - arrowSize, cy - arrowSize / 2);
      ctx.lineTo(cx + radius + 30 - arrowSize, cy + arrowSize / 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx, cy - radius - 30);
      ctx.lineTo(cx - arrowSize / 2, cy - radius - 30 + arrowSize);
      ctx.lineTo(cx + arrowSize / 2, cy - radius - 30 + arrowSize);
      ctx.fill();

      // Axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Re', cx + radius + 42, cy + 4);
      ctx.fillText('Im', cx, cy - radius - 40);

      // Label axis ticks
      ctx.fillText('1', cx + radius, cy + 16);
      ctx.fillText('-1', cx - radius, cy + 16);
      ctx.fillText('1', cx + 16, cy - radius + 4);
      ctx.fillText('-1', cx + 16, cy + radius + 4);

      // Unit circle
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // Angle arc (from positive Re axis to current point)
      ctx.strokeStyle = '#805ad5';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      if (currentTheta >= 0) {
        ctx.arc(cx, cy, radius * 0.3, -currentTheta, 0);
      } else {
        ctx.arc(cx, cy, radius * 0.3, 0, -currentTheta, true);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Angle label
      const labelAngle = currentTheta / 2;
      const labelR = radius * 0.42;
      const labelX = cx + labelR * Math.cos(-labelAngle);
      const labelY = cy + labelR * Math.sin(-labelAngle);
      ctx.fillStyle = '#805ad5';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      const degLabel = ((currentTheta * 180 / Math.PI) % 360 + 360) % 360;
      ctx.fillText(`θ=${degLabel.toFixed(0)}°`, labelX, labelY - 8);

      // Radius line from origin to point
      ctx.strokeStyle = '#1a365d';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // cos projection (red, horizontal line from point to Im axis)
      ctx.strokeStyle = '#e53e3e';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, py);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Dashed line from cos to x-axis for better visibility
      ctx.strokeStyle = '#e53e3e';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // sin projection (blue, vertical line from point to Re axis)
      ctx.strokeStyle = '#3182ce';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(px, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Dashed line from sin to y-axis
      ctx.strokeStyle = '#3182ce';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(cx, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point dot
      ctx.fillStyle = '#dd6b20';
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // cos marker on real axis
      ctx.fillStyle = '#e53e3e';
      ctx.beginPath();
      ctx.arc(px, cy, 4, 0, 2 * Math.PI);
      ctx.fill();

      // sin marker on imaginary axis
      ctx.fillStyle = '#3182ce';
      ctx.beginPath();
      ctx.arc(cx, py, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Info panel
      const infoX = w - 260;
      const infoY = 12;
      const infoW = 248;
      const infoH = 115;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.93)';
      ctx.fillRect(infoX, infoY, infoW, infoH);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(infoX, infoY, infoW, infoH);

      ctx.textAlign = 'left';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillStyle = '#1a365d';
      ctx.fillText('欧拉公式', infoX + 12, infoY + 22);

      ctx.font = '13px system-ui, sans-serif';
      ctx.fillStyle = '#805ad5';
      ctx.fillText(`e^{iθ} = cos θ + i sin θ`, infoX + 12, infoY + 44);

      ctx.font = '12px system-ui, sans-serif';
      ctx.fillStyle = '#e53e3e';
      ctx.fillText(`cos θ = ${cosT.toFixed(4)}  (实部)`, infoX + 12, infoY + 68);

      ctx.fillStyle = '#3182ce';
      ctx.fillText(`sin θ = ${sinT.toFixed(4)}  (虚部)`, infoX + 12, infoY + 88);

      ctx.fillStyle = '#1a365d';
      ctx.fillText(`θ = ${currentTheta.toFixed(3)} rad = ${degLabel}°`, infoX + 12, infoY + 108);

      ctx.restore();
    },
    [],
  );

  const controls = (
    <>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-sm text-gray-600 whitespace-nowrap w-24 text-right">
          θ = {((theta * 180 / Math.PI) % 360).toFixed(0)}°
        </span>
        <input
          type="range"
          min={0}
          max={360}
          step={1}
          value={((theta * 180 / Math.PI) % 360 + 360) % 360}
          onChange={(e) => {
            const deg = parseFloat(e.target.value);
            setTheta(deg * Math.PI / 180);
            playingRef.current = false;
            setPlaying(false);
          }}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {theta.toFixed(2)} rad
        </span>
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
          setTheta(Math.PI / 4);
          setPlaying(false);
          playingRef.current = false;
        }}
      />
    </div>
  );
}
