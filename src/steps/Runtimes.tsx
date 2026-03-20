import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { SoftwareCard } from "../components/SoftwareCard";
import { NavButtons } from "../components/NavButtons";
import { getRuntimesForLanguages, languages } from "../data/catalog";

export function Runtimes() {
  const { selectedLanguages, selectedSoftware, toggleSoftware } =
    useWizardStore();

  const relevantRuntimes = getRuntimesForLanguages(selectedLanguages);

  const groupedByLanguage = selectedLanguages.map((langId) => {
    const lang = languages.find((l) => l.id === langId);
    const items = relevantRuntimes.filter((r) =>
      r.relatedLanguages?.includes(langId),
    );
    return { lang, items };
  });

  if (selectedLanguages.length === 0) {
    return (
      <div>
        <StepHeader
          title="Runtimes & Tools"
          description="Go back and select at least one language to see relevant runtimes."
        />
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border-default">
          <p className="text-sm text-text-muted">
            No languages selected yet.
          </p>
        </div>
        <NavButtons />
      </div>
    );
  }

  return (
    <div>
      <StepHeader
        title="Runtimes & Tools"
        description="Based on your language selections, here are the relevant runtimes, SDKs, and package managers."
      />

      <div className="flex flex-col gap-6">
        {groupedByLanguage.map(
          ({ lang, items }) =>
            items.length > 0 && (
              <div key={lang?.id}>
                <h3 className="mb-3 text-sm font-medium text-text-secondary">
                  {lang?.name}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {items.map((item) => (
                    <SoftwareCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      icon={item.icon}
                      selected={selectedSoftware.includes(item.id)}
                      onToggle={toggleSoftware}
                    />
                  ))}
                </div>
              </div>
            ),
        )}
      </div>

      <NavButtons />
    </div>
  );
}
