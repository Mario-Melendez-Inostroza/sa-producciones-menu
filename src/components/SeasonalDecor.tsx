/**
 * Decoración de temporada — Fiestas Patrias (septiembre).
 *
 * Todo lo visual de este archivo se controla con SEASONAL_DECOR_ENABLED.
 * Para quitar la decoración después de septiembre, basta con poner esta
 * constante en `false` (o eliminar los usos de estos componentes en
 * PublicSite.tsx) sin tocar el resto del diseño ni la estructura del sitio.
 */
export const SEASONAL_DECOR_ENABLED = true;

const RED = "#D52B1E";
const BLUE = "#0039A6";

export function ChileFlag({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" className={className} role="img" aria-label="Bandera de Chile">
      <rect width="30" height="20" fill={RED} />
      <rect width="30" height="10" fill="#FFFFFF" />
      <rect width="10" height="10" fill={BLUE} />
      <text x="5" y="7.6" fontSize="7.5" textAnchor="middle" fill="#FFFFFF">★</text>
    </svg>
  );
}

/** Fila de banderines (guirnalda) colgando de un hilo, en rojo/blanco/azul. */
export function BuntingStrip({
  count = 9,
  flagWidth = 16,
  flagHeight = 20,
  className = "",
}: {
  count?: number;
  flagWidth?: number;
  flagHeight?: number;
  className?: string;
}) {
  const colors = [RED, "#FFFFFF", BLUE];
  const gap = 5;
  const totalWidth = count * flagWidth + (count - 1) * gap;
  const totalHeight = flagHeight + 6;
  return (
    <svg
      width="100%"
      height={totalHeight}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      preserveAspectRatio="xMidYMin meet"
      className={className}
      aria-hidden="true"
    >
      <polyline points={`0,3 ${totalWidth},3`} fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      {Array.from({ length: count }).map((_, i) => {
        const x = i * (flagWidth + gap);
        const color = colors[i % colors.length];
        return (
          <polygon
            key={i}
            points={`${x},3 ${x + flagWidth},3 ${x + flagWidth / 2},${flagHeight + 3}`}
            fill={color}
            stroke={color === "#FFFFFF" ? "#E5E7EB" : "none"}
            strokeWidth={color === "#FFFFFF" ? 0.6 : 0}
          />
        );
      })}
    </svg>
  );
}

/** Separador discreto entre secciones, con harto espacio en blanco. */
export function SeasonalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-5 ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-border" />
      <ChileFlag size={14} />
      <span className="h-px w-10 bg-border" />
    </div>
  );
}
