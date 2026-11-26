/*
 * A centre and its tools, held still: real logos in their own colours on
 * spokes. Used once a page at most.
 */
export type HubNode = { label: string; icon: string; wide?: boolean };

const SPOTS = [
  [28, 16], [72, 16], [17, 50], [83, 50], [28, 84], [72, 84],
];

export function Hub({ center, nodes, alt }: { center: HubNode; nodes: HubNode[]; alt: string }) {
  return (
    <div className="hub" role="img" aria-label={alt}>
      <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {nodes.map((_, i) => (
          <line key={i} x1="50" y1="50" x2={SPOTS[i][0]} y2={SPOTS[i][1]} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span className="node core" style={{ left: "50%", top: "50%" }} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={center.icon} alt="" />
        {center.label}
      </span>
      {nodes.map((n, i) => (
        <span key={n.label} className="node" style={{ left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%` }} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={n.icon} alt="" style={n.wide ? { width: 44, height: 18 } : undefined} />
          {n.label}
        </span>
      ))}
    </div>
  );
}
