import { useRef, useEffect, useCallback, type ReactNode } from 'react';

interface InteractiveCanvasProps {
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void;
  width?: number;
  height?: number;
  className?: string;
  controls?: ReactNode;
  onReset?: () => void;
  running?: boolean;
}

export default function InteractiveCanvas({
  draw,
  width = 600,
  height = 400,
  className = '',
  controls,
  onReset,
  running = true,
}: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const loop = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const elapsed = (time - startTimeRef.current) / 1000;
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    draw(ctx, displayWidth, displayHeight, elapsed);
    ctx.restore();

    animRef.current = requestAnimationFrame(loop);
  }, [draw]);

  useEffect(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }
    if (running) {
      animRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = 0;
      }
    };
  }, [running, loop]);

  const handleReset = () => {
    startTimeRef.current = performance.now();
    onReset?.();
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="relative">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: height + 'px' }}
        />
      </div>
      {(controls || onReset) && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center gap-3">
          {controls}
          {onReset && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              重置
            </button>
          )}
        </div>
      )}
    </div>
  );
}
