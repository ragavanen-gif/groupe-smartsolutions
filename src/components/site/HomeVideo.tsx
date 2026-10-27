import { getHomeVideo, getEmbed } from "@/lib/settings";

/** Section vidéo de l'accueil — masquée tant qu'aucune vidéo n'est définie en admin. */
export async function HomeVideo() {
  const v = await getHomeVideo();
  if (!v.enabled || !v.url) return null;

  const embed = getEmbed(v.url);
  if (!embed.src) return null;

  return (
    <section className="bg-ivory pb-4">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        {v.title && (
          <h2 className="mb-6 text-center font-heading text-2xl font-bold text-plum-900 sm:text-3xl">
            {v.title}
          </h2>
        )}
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-plum/10 bg-plum-900 shadow-soft">
          {embed.type === "video" ? (
            <video
              src={embed.src}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <iframe
              src={embed.src}
              title={v.title || "Vidéo de présentation"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
