import type { ReactNode } from "react";

type TileProps = {
  label?: string;
  title: string;
  children?: ReactNode;
};

/** Editorial content tile used across feature grids. */
export function Tile({ label, title, children }: TileProps) {
  return (
    <div className="tile">
      {label ? <div className="dep">{label}</div> : null}
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

type PanelProps = { label?: string; children: ReactNode };
export function Panel({ label, children }: PanelProps) {
  return (
    <div className="panel">
      {label ? <div className="qmark">{label}</div> : null}
      {children}
    </div>
  );
}

type ChipProps = { children: ReactNode; lead?: boolean };
export function Chip({ children, lead = false }: ChipProps) {
  return <span className={lead ? "chip lead" : "chip"}>{children}</span>;
}
