import { useEffect, useRef } from "react";
import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { allSoftware } from "../data/catalog";
import { invoke } from "@tauri-apps/api/core";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  SkipForward,
  Eye,
} from "lucide-react";
import type { InstallResult, PlatformInfo } from "../types";

function getBestManager(
  installInfo: Record<string, string | undefined>,
  available: string[],
  os: string,
): { manager: string; identifier: string } | null {
  const preference =
    os === "windows"
      ? ["winget", "choco", "scoop"]
      : os === "macos"
        ? ["brew"]
        : ["apt"];

  for (const mgr of preference) {
    if (available.includes(mgr) && installInfo[mgr]) {
      return { manager: mgr, identifier: installInfo[mgr]! };
    }
  }
  return null;
}

export function Installing() {
  const {
    selectedSoftware,
    customRepos,
    defaultRepoBase,
    installResults,
    addInstallResult,
    setInstalling,
    setInstallProgress,
    isInstalling,
    currentInstallIndex,
    totalInstallCount,
    currentInstallingName,
    platformInfo,
    dryRun,
    setStep,
  } = useWizardStore();

  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    runInstallation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function runInstallation() {
    setInstalling(true);

    let platform = platformInfo;
    if (!platform) {
      try {
        platform = await invoke<PlatformInfo>("get_platform_info");
      } catch {
        platform = { os: "unknown", packageManagers: [] };
      }
    }

    const items = allSoftware.filter((s) => selectedSoftware.includes(s.id));
    const total = items.length + customRepos.length;
    setInstallProgress(0, total, "");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setInstallProgress(i + 1, total, item.name);

      if (dryRun) {
        await new Promise((r) => setTimeout(r, 200));
        addInstallResult({
          packageId: item.id,
          success: true,
          message: `[Dry Run] Would install ${item.name}`,
          skipped: true,
        });
        continue;
      }

      const best = getBestManager(
        item.installInfo as Record<string, string | undefined>,
        platform?.packageManagers ?? [],
        platform?.os ?? "unknown",
      );

      if (!best) {
        addInstallResult({
          packageId: item.id,
          success: false,
          message: `No compatible package manager found for ${item.name}`,
        });
        continue;
      }

      try {
        const result = await invoke<InstallResult>("install_package", {
          packageId: item.id,
          manager: best.manager,
          identifier: best.identifier,
        });
        addInstallResult(result);
      } catch (err) {
        addInstallResult({
          packageId: item.id,
          success: false,
          message: String(err),
        });
      }
    }

    for (let i = 0; i < customRepos.length; i++) {
      const repo = customRepos[i];
      const idx = items.length + i + 1;
      setInstallProgress(idx, total, `Clone: ${repo.name}`);

      const clonePath =
        repo.path || `${defaultRepoBase}/${repo.name}`.replace("~", "");

      if (dryRun) {
        await new Promise((r) => setTimeout(r, 200));
        addInstallResult({
          packageId: repo.id,
          success: true,
          message: `[Dry Run] Would clone ${repo.repo} to ${clonePath}`,
          skipped: true,
        });
        continue;
      }

      try {
        const result = await invoke<InstallResult>("clone_repo", {
          url: repo.repo,
          path: clonePath,
        });
        addInstallResult(result);
      } catch (err) {
        addInstallResult({
          packageId: repo.id,
          success: false,
          message: String(err),
        });
      }
    }

    setInstalling(false);
    setStep("summary");
  }

  const progress =
    totalInstallCount > 0
      ? Math.round((currentInstallIndex / totalInstallCount) * 100)
      : 0;

  return (
    <div>
      <StepHeader
        title={dryRun ? "Dry Run Preview" : "Installing"}
        description={
          dryRun
            ? "Previewing what would be installed..."
            : "Please wait while your environment is being set up."
        }
      />

      {dryRun && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 px-4 py-2">
          <Eye className="h-4 w-4 text-warning" />
          <span className="text-sm text-warning">
            Dry run mode -- nothing is being installed
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            {isInstalling ? currentInstallingName : "Complete"}
          </span>
          <span className="font-mono text-text-muted">
            {currentInstallIndex}/{totalInstallCount}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-bg-surface-active">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex max-h-80 flex-col gap-1 overflow-y-auto">
        {installResults.map((result, idx) => {
          const item = allSoftware.find((s) => s.id === result.packageId);
          return (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
            >
              {result.skipped ? (
                <SkipForward className="h-4 w-4 shrink-0 text-text-muted" />
              ) : result.success ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0 text-error" />
              )}
              <span className="text-text-primary">
                {item?.name ?? result.packageId}
              </span>
              {!result.success && !result.skipped && (
                <span className="truncate text-xs text-error">
                  {result.message.slice(0, 120)}
                </span>
              )}
            </div>
          );
        })}

        {isInstalling && (
          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-accent" />
            <span className="text-text-secondary">
              {currentInstallingName}...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
