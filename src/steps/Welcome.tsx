import { useWizardStore } from "../store/wizardStore";
import { NavButtons } from "../components/NavButtons";
import { Upload } from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PresetProfile } from "../types";

import webDev from "../data/presets/web-developer.json";
import gameDev from "../data/presets/game-developer.json";
import fullStack from "../data/presets/full-stack.json";
import devops from "../data/presets/devops.json";

const presets: PresetProfile[] = [
  webDev as PresetProfile,
  gameDev as PresetProfile,
  fullStack as PresetProfile,
  devops as PresetProfile,
];

function getIcon(name: string): LucideIcon {
  return (
    (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Package
  );
}

export function Welcome() {
  const { applyPreset, nextStep } = useWizardStore();

  const handlePreset = (preset: PresetProfile) => {
    applyPreset(preset);
    nextStep();
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const profile = JSON.parse(text) as PresetProfile;
        applyPreset(profile);
        nextStep();
      } catch {
        alert("Invalid profile JSON file.");
      }
    };
    input.click();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <img src="/icon.png" alt="EnvGuppy" className="mx-auto mb-4 h-16 w-16 rounded-2xl" />
        <h2 className="text-2xl font-bold text-text-primary">
          Welcome to EnvGuppy
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Set up your development environment in minutes. Choose a preset to get
          started quickly, import a saved profile, or start from scratch.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        {presets.map((preset) => {
          const Icon = getIcon(preset.icon);
          return (
            <button
              key={preset.name}
              onClick={() => handlePreset(preset)}
              className="group flex flex-col gap-2 rounded-xl border border-border-default bg-bg-surface p-4 text-left transition-all hover:border-accent/40 hover:bg-bg-surface-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary">
                  {preset.name}
                </h3>
                <p className="mt-0.5 text-xs text-text-secondary">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleImport}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-border-hover bg-bg-surface p-3 text-sm text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
        >
          <Upload className="h-4 w-4" />
          Import Profile
        </button>
      </div>

      <NavButtons
        showBack={false}
        nextLabel="Start from Scratch"
        onNext={nextStep}
      />
    </div>
  );
}
