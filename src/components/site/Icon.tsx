import {
  Rocket,
  GraduationCap,
  Home,
  Code2,
  PartyPopper,
  type LucideProps,
} from "lucide-react";

const MAP = {
  rocket: Rocket,
  graduation: GraduationCap,
  home: Home,
  code: Code2,
  party: PartyPopper,
} as const;

export type IconKey = keyof typeof MAP;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = MAP[name as IconKey] ?? Rocket;
  return <Cmp {...props} />;
}
