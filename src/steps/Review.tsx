import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { NavButtons } from "../components/NavButtons";
import { allSoftware, languages } from "../data/catalog";
import { Download, Eye, GitBranch } from "lucide-react";

export function Review() {
  const {
    selectedLanguages,
    selectedSoftware,
    customRepos,
    dryRun,
    setDryRun,
    nextStep,
    exportProfile,
  } = useWizardStore();

  const selectedItems = allSoftware.filter((s) =>
    selectedSoftware.includes(s.id),
  );
  const selectedLangs = languages.filter((l) =>
    selectedLanguages.includes(l.id),
  );

  const handleExport = () => {
    const profile = exportProfile();
    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "envguppy-profile.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalCount = selectedItems.length + customRepos.length;

  return (
    <div>
      <StepHeader
        title="Review"
        description="Review your selections before installing. You can go back to make changes."
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-accent">{totalCount}</span> items
          will be installed
        </p>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-default bg-bg-surface px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-border-hover">
            <Eye className="h-3.5 w-3.5" />
            <input
              type="checkbox"
              checked={dryRun}
              onChange={(e) => setDryRun(e.target.checked)}
              className="accent-accent"
            />
            Dry Run
          </label>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-surface px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
          >
            <Download className="h-3.5 w-3.5" />
            Export Profile
          </button>
        </div>
      </div>

      {selectedLangs.length > 0 && (
        <Section title="Languages">
          {selectedLangs.map((l) => (
            <Chip key={l.id} label={l.name} />
          ))}
        </Section>
      )}

      {selectedItems.length > 0 && (
        <Section title="Software">
          {selectedItems.map((s) => (
            <Chip key={s.id} label={s.name} />
          ))}
        </Section>
      )}

      {customRepos.length > 0 && (
        <Section title="Repositories">
          {customRepos.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-surface px-3 py-2"
            >
              <GitBranch className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs text-text-primary">{r.name}</span>
              <span className="text-xs text-text-muted">({r.repo})</span>
            </div>
          ))}
        </Section>
      )}

      {totalCount === 0 && (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border-default">
          <p className="text-sm text-text-muted">
            Nothing selected. Go back to add software.
          </p>
        </div>
      )}

      <NavButtons
        nextLabel={dryRun ? "Preview Install" : "Install All"}
        onNext={nextStep}
        nextDisabled={totalCount === 0}
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-xs font-medium tracking-wide text-text-muted uppercase">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-lg border border-border-default bg-bg-surface px-3 py-1.5 text-xs text-text-primary">
      {label}
    </span>
  );
}
