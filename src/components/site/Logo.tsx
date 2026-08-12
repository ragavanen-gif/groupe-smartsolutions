import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo officiel Groupe Smart Solutions (image détourée, fond transparent).
 * Le `variant` est conservé pour compatibilité mais le logo est le même
 * partout (il s'affiche sur les fonds clairs du site).
 */
export function Logo({
  variant: _variant = "dark",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <Image
      src="/logo-smart.png"
      alt="Groupe Smart Solutions"
      width={1200}
      height={434}
      priority
      className={cn("h-10 w-auto select-none", className)}
    />
  );
}
