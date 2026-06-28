import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

/**
 * Normalize LaTeX formula by collapsing consecutive backslashes.
 * The Vite/SWC compiler may double-escape backslashes when compiling
 * JSX string attributes into template literals. This ensures KaTeX
 * always receives single backslash commands.
 *
 * Example: "\\sin\\theta" → "\sin\theta" (no-op if already correct)
 *          "\\\\sin\\\\theta" → "\\sin\\theta" → "\sin\theta"
 */
function normalizeFormula(raw: string): string {
  // The Vite/SWC compiler double-escapes backslashes when compiling
  // JSX string attributes into template literals:
  //   Source: "\\sin" → JSX value: "\sin" (correct)
  //   Compiled: `\\\\sin` → runtime: "\\sin" (double backslash!)
  // This function normalizes by halving consecutive backslash runs.
  // Strategy: replace each "\\" (2 BS chars) with "\" (1 BS char).
  // Handles: 2→1 (typical), 4→2, 6→3, etc.
  return raw.replace(/\\\\/g, '\\');
}

export default function MathFormula({ formula, displayMode = false, className = '' }: MathFormulaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const normalized = normalizeFormula(formula);
      try {
        katex.render(normalized, containerRef.current, {
          displayMode,
          throwOnError: false,
          strict: false,
        });
        // Check if KaTeX rendered an error span
        if (containerRef.current.querySelector('.katex-error')) {
          console.error(
            '[MathFormula] KaTeX parse error for formula:',
            formula,
            '\nNormalized:',
            normalized,
          );
        }
      } catch (err) {
        console.error(
          '[MathFormula] KaTeX render threw for formula:',
          formula,
          '\nError:',
          err,
        );
        containerRef.current.textContent = formula;
      }
    }
  }, [formula, displayMode]);

  const Tag = displayMode ? 'div' as const : 'span' as const;
  return <Tag ref={containerRef as any} className={className} />;
}
