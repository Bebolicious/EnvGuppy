import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { allSoftware } from "../data/catalog";
import {
  CheckCircle2,
  XCircle,
  SkipForward,
  RotateCcw,
  Download,
  PartyPopper,
} from "lucide-react";

export function Summary() {
  const { installResults, dryRun, reset, exportProfile } = useWizardStore();

  const successes = installResults.filter(
    (r) => r.success && !r.skipped,
  );
  const failures = installResults.filter((r) => !r.success);
  const skipped = installResults.filter((r) => r.skipped);

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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15">
          <PartyPopper className="h-7 w-7 text-accent" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">
          {dryRun ? "Dry Run Complete" : "Setup Complete"}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {dryRun
            ? "Here's what would have been installed."
            : "Your development environment is ready."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard
          label="Installed"
          count={successes.length}
          color="text-success"
        />
        <StatCard label="Failed" count={failures.length} color="text-error" />
        <StatCard
          label="Skipped"
          count={skipped.length}
          color="text-text-muted"
        />
      </div>

      {failures.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-error">
            Failed Installations
          </h3>
          <div className="flex flex-col gap-1 rounded-xl border border-error/20 bg-error/5 p-3">
            {failures.map((r, idx) => {
              const item = allSoftware.find((s) => s.id === r.packageId);
              return (
                <div key={idx} className="flex items-start gap-2 py-1">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">
                      {item?.name ?? r.packageId}
                    </p>
                    <p className="truncate text-xs text-text-muted">
                      {r.message.slice(0, 200)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {successes.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-success">
            Successfully Installed
          </h3>
          <div className="flex flex-wrap gap-2">
            {successes.map((r, idx) => {
              const item = allSoftware.find((s) => s.id === r.packageId);
              return (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 rounded-lg border border-success/20 bg-success/5 px-2.5 py-1 text-xs text-success"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {item?.name ?? r.packageId}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {skipped.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-text-muted">
            Skipped (Dry Run)
          </h3>
          <div className="flex flex-wrap gap-2">
            {skipped.map((r, idx) => {
              const item = allSoftware.find((s) => s.id === r.packageId);
              return (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 rounded-lg border border-border-default bg-bg-surface px-2.5 py-1 text-xs text-text-muted"
                >
                  <SkipForward className="h-3 w-3" />
                  {item?.name ?? r.packageId}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-3 border-t border-border-default pt-5">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-surface px-4 py-2 text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
        >
          <Download className="h-4 w-4" />
          Export Profile
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-bg-base transition-all hover:brightness-110"
        >
          <RotateCcw className="h-4 w-4" />
          Start Over
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border-default bg-bg-surface p-4">
      <span className={`text-2xl font-bold ${color}`}>{count}</span>
      <span className="mt-1 text-xs text-text-muted">{label}</span>
    </div>
  );
}
