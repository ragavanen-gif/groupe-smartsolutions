"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp, Star } from "lucide-react";
import type { EcoItem } from "@/lib/utils";
import type { RatingStat } from "@/lib/comments";

function Card({ item, stat }: { item: EcoItem; stat?: RatingStat }) {
  return (
    <Link href={`/projet/${item.id}`} className="block h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-plum/10 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-card">
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: item.color }} />
        <div className="flex items-start justify-between gap-3">
          <p className="eyebrow" style={{ color: item.color }}>
            {item.category}
          </p>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {item.status && (
              <span
                className="rounded-full px-3 py-0.5 text-xs font-semibold"
                style={{ color: item.color, backgroundColor: `${item.color}1f` }}
              >
                {item.status}
              </span>
            )}
            {stat && stat.count > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-plum-700">
                <Star size={13} className="fill-pink text-pink" />
                {stat.avg != null && <span>{stat.avg.toFixed(1)}</span>}
                <span className="font-normal text-plum-400">
                  · {stat.count} avis
                </span>
              </span>
            )}
          </div>
        </div>
        <h4 className="mt-2 font-heading text-2xl font-extrabold text-plum-900">{item.name}</h4>
        <p className="mt-3 leading-relaxed text-plum-700/80">{item.description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pink transition-transform group-hover:translate-x-1">
          Découvrir & laisser un avis <ArrowUpRight size={16} />
        </span>
      </article>
    </Link>
  );
}

export function ExpandableGrid({
  items,
  initial = 2,
  stats,
}: {
  items: EcoItem[];
  initial?: number;
  stats?: Record<string, RatingStat>;
}) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  const shown = open ? items : items.slice(0, initial);
  const hiddenCount = items.length - initial;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {shown.map((item) => (
          <Card key={item.id} item={item} stat={stats?.[item.id]} />
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-plum/20 px-6 py-3 text-sm font-semibold text-plum-800 transition-colors hover:border-pink hover:text-pink"
          >
            {open ? (
              <>
                Voir moins <ChevronUp size={16} />
              </>
            ) : (
              <>
                Voir plus ({hiddenCount}) <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
