interface CursorGlowProps {
  x: number;
  y: number;
  isHovering: boolean;
}

export default function CursorGlow({ x, y, isHovering }: CursorGlowProps) {
  return (
    <>
      {/* Background spotlight */}
      <div
        className="cursor-spotlight"
        style={{ left: x, top: y }}
      />
      {/* Cursor dot */}
      <div
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ left: x, top: y }}
      />
    </>
  );
}
