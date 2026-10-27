import { cn } from "@/lib/utils";

export function VideoPlayer({
  src,
  type,
  title,
  className,
}: {
  src: string;
  type: "iframe" | "video" | null;
  title?: string;
  className?: string;
}) {
  if (!src || !type) return null;
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-2xl border border-plum/10 bg-plum-900 shadow-soft",
        className
      )}
    >
      {type === "video" ? (
        <video src={src} controls playsInline className="h-full w-full object-cover" />
      ) : (
        <iframe
          src={src}
          title={title || "Vidéo de présentation"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      )}
    </div>
  );
}
