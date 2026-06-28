import { useCallback, useRef, useState } from 'react';
import InteractiveCanvas from '../InteractiveCanvas';

interface ComparisonViewProps {
  className?: string;
  height?: number;
}

export default function ComparisonView({
  className = '',
  height = 480,
}: ComparisonViewProps) {
  const [angle, setAngle] = useState(0.785); // ~45°
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const angleRef = useRef(angle);

  angleRef.current = angle;
  playingRef.current = playing;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, _time: number) => {
      ctx.save();

      const t = playingRef.current
        ? (_time * 1.2) % (2 * Math.PI)
        : angleRef.current;

      const sinVal = Math.sin(t);
      const cosVal = Math.cos(t);
      const sinhVal = Math.sinh(t);
      const coshVal = Math.cosh(t);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#f7fafc';
      ctx.fillRect(0, 0, w, h);

      const halfW = w / 2;
      const leftCx = halfW / 2;
      const rightCx = halfW + halfW / 2;
      const cy = h / 2;
      const radius = Math.min(halfW / 2, cy) - 30;
      const scale = radius; // for hyperbola: 1 world unit = scale px

      // ─────────────────────────────────────────────
      // LEFT: Unit Circle
      // ─────────────────────────────────────────────
      const drawCircle = () => {
        // Grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.5;
        const gs = radius / 2;
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(leftCx + i * gs, cy - radius - 5);
          ctx.lineTo(leftCx + i * gs, cy + radius + 5);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(leftCx - radius - 5, cy + i * gs);
          ctx.lineTo(leftCx + radius + 5, cy + i * gs);
          ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftCx - radius - 15, cy);
        ctx.lineTo(leftCx + radius + 15, cy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(leftCx, cy - radius - 15);
        ctx.lineTo(leftCx, cy + radius + 15);
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#64748b';
        ctx.font = '10px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('1', leftCx + radius + 10, cy + 4);
        ctx.fillText('-1', leftCx - radius - 10, cy + 4);
        ctx.textAlign = 'right';
        ctx.fillText('1', leftCx - 6, cy - radius + 4);
        ctx.fillText('-1', leftCx - 8, cy + radius + 4);

        // Unit circle
        ctx.strokeStyle = '#1a365d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(leftCx, cy, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Point
        const px = leftCx + radius * cosVal;
        const py = cy - radius * sinVal;

        // sin line (red, vertical)
        ctx.strokeStyle = '#e53e3e';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(px, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // cos line (blue, horizontal)
        ctx.strokeStyle = '#3182ce';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(leftCx, py);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Radius
        ctx.strokeStyle = '#1a365d';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(leftCx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dot
        ctx.fillStyle = '#dd6b20';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Angle arc
        ctx.strokeStyle = '#805ad5';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (t >= 0) {
          ctx.arc(leftCx, cy, 18, Math.PI * 1.5 - t, Math.PI * 1.5);
        } else {
          ctx.arc(leftCx, cy, 18, Math.PI * 1.5, Math.PI * 1.5 - t);
        }
        ctx.stroke();

        // Theta label at midpoint of arc
        const labelAngle = Math.PI * 1.5 - t / 2;
        const labelR = 30;
        const lx = leftCx + labelR * Math.cos(labelAngle);
        const ly = cy + labelR * Math.sin(labelAngle);
        ctx.fillStyle = '#805ad5';
        ctx.font = 'italic bold 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('θ', lx, ly);
      };

      // ─────────────────────────────────────────────
      // RIGHT: Unit Hyperbola
      // ─────────────────────────────────────────────
      const drawHyperbola = () => {
        const toX = (wx: number) => rightCx + wx * scale;
        const toY = (wy: number) => cy - wy * scale;

        // Grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.5;
        for (let wx = -3; wx <= 3; wx++) {
          ctx.beginPath();
          ctx.moveTo(toX(wx), toY(-2.5));
          ctx.lineTo(toX(wx), toY(2.5));
          ctx.stroke();
        }
        for (let wy = -2; wy <= 2; wy++) {
          ctx.beginPath();
          ctx.moveTo(toX(-3), toY(wy));
          ctx.lineTo(toX(3), toY(wy));
          ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(toX(-3.5), toY(0));
        ctx.lineTo(toX(3.5), toY(0));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toX(0), toY(-2.8));
        ctx.lineTo(toX(0), toY(2.8));
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#64748b';
        ctx.font = '10px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('1', toX(1), toY(-0.15));
        ctx.fillText('-1', toX(-1), toY(-0.15));
        ctx.fillText('2', toX(2), toY(-0.15));
        ctx.textAlign = 'right';
        ctx.fillText('1', toX(-0.1), toY(1) + 3);
        ctx.fillText('-1', toX(-0.1), toY(-1) + 3);

        // Hyperbola right branch
        ctx.strokeStyle = '#1a365d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const maxCt = 3;
        const step = 0.03;
        for (let ct = -maxCt; ct <= maxCt; ct += step) {
          const sx = toX(Math.cosh(ct));
          const sy = toY(Math.sinh(ct));
          if (ct === -maxCt) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // Left branch
        ctx.setLineDash([6, 3]);
        ctx.beginPath();
        for (let ct = -maxCt; ct <= maxCt; ct += step) {
          const sx = toX(-Math.cosh(ct));
          const sy = toY(Math.sinh(ct));
          if (ct === -maxCt) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Asymptotes
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(toX(-3), toY(-3));
        ctx.lineTo(toX(3), toY(3));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toX(-3), toY(3));
        ctx.lineTo(toX(3), toY(-3));
        ctx.stroke();
        ctx.setLineDash([]);

        // Point
        const hpx = toX(coshVal);
        const hpy = toY(sinhVal);

        // sinh line (red)
        ctx.strokeStyle = '#e53e3e';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(hpx, toY(0));
        ctx.lineTo(hpx, hpy);
        ctx.stroke();
        ctx.setLineDash([]);

        // cosh line (blue)
        ctx.strokeStyle = '#3182ce';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(toX(0), hpy);
        ctx.lineTo(hpx, hpy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Radius
        ctx.strokeStyle = '#1a365d';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(toX(0), toY(0));
        ctx.lineTo(hpx, hpy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dot
        ctx.fillStyle = '#dd6b20';
        ctx.beginPath();
        ctx.arc(hpx, hpy, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Area fill
        ctx.fillStyle = 'rgba(128, 90, 213, 0.1)';
        ctx.beginPath();
        ctx.moveTo(toX(0), toY(0));
        const sectorSteps = 30;
        for (let i = 0; i <= sectorSteps; i++) {
          const st = (i / sectorSteps) * t;
          ctx.lineTo(toX(Math.cosh(st)), toY(Math.sinh(st)));
        }
        ctx.closePath();
        ctx.fill();

        // Sector label "t"
        const midT = t / 2;
        const midX = toX(Math.cosh(midT));
        const midY = toY(Math.sinh(midT));
        // Offset label outward from the curve
        const offsetAngle = Math.atan2(
          -(midY - toY(0)),
          midX - toX(0)
        );
        const labelDist = 18;
        const tlX = midX + labelDist * Math.cos(offsetAngle + 0.5);
        const tlY = midY + labelDist * Math.sin(offsetAngle + 0.5);
        ctx.fillStyle = '#805ad5';
        ctx.font = 'italic bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('t', tlX, tlY);
      };

      drawCircle();
      drawHyperbola();

      // Section titles
      ctx.fillStyle = '#1a365d';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('单位圆', leftCx, 20);
      ctx.fillText('单位双曲线', rightCx, 20);

      // Shared parameter display (above value rows)
      ctx.fillStyle = '#1a365d';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'center';
      const deg = ((t * 180) / Math.PI) % 360;
      const degD = deg < 0 ? deg + 360 : deg;
      ctx.fillText(`共同参数: ${degD.toFixed(1)}° / ${t.toFixed(3)} rad`, w / 2, h - 62);

      // Comparison values (centered at bottom of each side)
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px system-ui, sans-serif';
      const baseY = h - 40;

      ctx.fillStyle = '#3182ce';
      ctx.fillText(`cos θ = ${cosVal.toFixed(4)}`, 10, baseY);
      ctx.fillText(`cosh t = ${coshVal.toFixed(4)}`, halfW + 10, baseY);

      ctx.fillStyle = '#e53e3e';
      ctx.fillText(`sin θ = ${sinVal.toFixed(4)}`, 10, baseY + 18);
      ctx.fillText(`sinh t = ${sinhVal.toFixed(4)}`, halfW + 10, baseY + 18);

      ctx.fillStyle = '#dd6b20';
      ctx.fillText(
        `tan θ = ${(Math.abs(cosVal) > 0.01 ? Math.tan(t).toFixed(4) : '∞')}`,
        10,
        baseY + 36,
      );
      ctx.fillText(`tanh t = ${Math.tanh(t).toFixed(4)}`, halfW + 10, baseY + 36);

      // Divider line
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(halfW, 30);
      ctx.lineTo(halfW, h - 75);
      ctx.stroke();
      ctx.setLineDash([]);

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
              <span className="text-sm text-gray-600 w-10 text-right">
                {degDisplay.toFixed(0)}°
              </span>
              <input
                type="range"
                min={-Math.PI}
                max={Math.PI}
                step={0.02}
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
          setAngle(0.785);
          setPlaying(false);
          playingRef.current = false;
        }}
      />
    </div>
  );
}
