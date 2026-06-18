interface TourInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export function TourInclusions({ inclusions, exclusions }: TourInclusionsProps) {
  if (inclusions.length === 0 && exclusions.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Lo que incluye */}
      {inclusions.length > 0 && (
        <div className="bg-surface-container-low p-6 sm:p-10 rounded-2xl border-l-8 border-primary shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-3xl icon-filled">check_circle</span>
            <h3 className="text-xl font-bold text-on-surface">Lo que incluye</h3>
          </div>
          <ul className="space-y-4 text-on-surface">
            {inclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-base">
                <span className="material-symbols-outlined text-primary mt-0.5 shrink-0">check</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lo que no incluye */}
      {exclusions.length > 0 && (
        <div className="bg-surface-container-low p-6 sm:p-10 rounded-2xl border-l-8 border-error shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-error text-3xl icon-filled">cancel</span>
            <h3 className="text-xl font-bold text-on-surface">Lo que no incluye</h3>
          </div>
          <ul className="space-y-4 text-on-surface">
            {exclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-base opacity-80">
                <span className="material-symbols-outlined text-error mt-0.5 shrink-0">close</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
