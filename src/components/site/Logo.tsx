import { cn } from "@/lib/utils";

/** Marque Smart Solutions : spark multicolore + flèche. */
export function LogoMark({
  className,
  arrow = "#4a1a4a",
}: {
  className?: string;
  /** Couleur de la flèche (plum sur fond clair, blanc sur fond sombre) */
  arrow?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Smart Solutions">
      {/* Pétales */}
      <g>
        {/* haut — magenta */}
        <path d="M22,32 C15,24 15,16 22,11 C29,16 29,24 22,32 Z" fill="#e91e63" />
        {/* haut-gauche — vert */}
        <path
          d="M22,32 C15,24 15,16 22,11 C29,16 29,24 22,32 Z"
          fill="#34c24a"
          transform="rotate(-58 22 32)"
        />
        {/* bas-gauche — jaune */}
        <path
          d="M22,32 C15,24 15,16 22,11 C29,16 29,24 22,32 Z"
          fill="#f4c81f"
          transform="rotate(-122 22 32)"
        />
        {/* bas — cyan */}
        <path
          d="M22,32 C15,24 15,16 22,11 C29,16 29,24 22,32 Z"
          fill="#29abe2"
          transform="rotate(180 22 32)"
        />
      </g>
      {/* Flèche pointant à gauche */}
      <path
        d="M13,32 L27,19 L27,26.5 L52,26.5 L52,37.5 L27,37.5 L27,45 Z"
        fill={arrow}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  variant = "light",
  className,
}: {
  /** "light" = pour fond sombre (texte clair) ; "dark" = pour fond clair */
  variant?: "light" | "dark";
  className?: string;
}) {
  const textColor = variant === "light" ? "text-ivory" : "text-plum-900";
  const subColor = variant === "light" ? "text-plum-200" : "text-plum-600";
  const arrow = variant === "light" ? "#faf7fb" : "#4a1a4a";

  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <LogoMark className="h-9 w-9 shrink-0" arrow={arrow} />
      <span className="flex flex-col leading-[0.95]">
        <span
          className={cn(
            "font-heading text-[0.95rem] font-extrabold uppercase tracking-[0.16em]",
            textColor
          )}
        >
          Smart
        </span>
        <span
          className={cn(
            "font-heading text-[0.8rem] font-bold uppercase tracking-[0.145em]",
            subColor
          )}
        >
          Solutions
        </span>
      </span>
    </span>
  );
}
