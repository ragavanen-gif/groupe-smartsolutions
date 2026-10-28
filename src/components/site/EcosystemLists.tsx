import { ExpandableGrid } from "./ExpandableGrid";
import { getEcosystem } from "@/lib/settings";
import { getRatingStats } from "@/lib/comments";

export async function EcosystemLists() {
  const [{ projects, partners }, stats] = await Promise.all([
    getEcosystem(),
    getRatingStats(),
  ]);

  return (
    <div className="mt-12 space-y-16">
      {projects.length > 0 && (
        <div>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Nos projets</p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-plum-900 sm:text-3xl">
              Les solutions que nous avons créées
            </h3>
          </div>
          <div className="mt-8">
            <ExpandableGrid items={projects} initial={2} stats={stats} />
          </div>
        </div>
      )}

      {partners.length > 0 && (
        <div>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-pink-dark">Pour nos partenaires</p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-plum-900 sm:text-3xl">
              Développées sur mesure pour nos partenaires
            </h3>
          </div>
          <div className="mt-8">
            <ExpandableGrid items={partners} initial={2} stats={stats} />
          </div>
        </div>
      )}
    </div>
  );
}
