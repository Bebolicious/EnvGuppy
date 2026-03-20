import { create } from "zustand";
import type {
  WizardStep,
  PlatformInfo,
  InstallResult,
  CustomRepoItem,
  PresetProfile,
} from "../types";

interface WizardState {
  currentStep: WizardStep;
  selectedLanguages: string[];
  selectedSoftware: string[];
  customRepos: CustomRepoItem[];
  defaultRepoBase: string;
  installResults: InstallResult[];
  isInstalling: boolean;
  currentInstallIndex: number;
  totalInstallCount: number;
  currentInstallingName: string;
  platformInfo: PlatformInfo | null;
  dryRun: boolean;
  installedPackagesRaw: string[];

  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  toggleLanguage: (id: string) => void;
  toggleSoftware: (id: string) => void;
  setSelectedLanguages: (ids: string[]) => void;
  setSelectedSoftware: (ids: string[]) => void;

  addCustomRepo: (repo: CustomRepoItem) => void;
  removeCustomRepo: (id: string) => void;
  updateCustomRepo: (id: string, repo: Partial<CustomRepoItem>) => void;
  setDefaultRepoBase: (path: string) => void;

  addInstallResult: (result: InstallResult) => void;
  setInstalling: (val: boolean) => void;
  setInstallProgress: (index: number, total: number, name: string) => void;
  clearResults: () => void;

  setPlatformInfo: (info: PlatformInfo) => void;
  setDryRun: (val: boolean) => void;
  setInstalledPackagesRaw: (raw: string[]) => void;

  applyPreset: (preset: PresetProfile) => void;
  exportProfile: () => PresetProfile;
  reset: () => void;
}

const STEP_ORDER: WizardStep[] = [
  "welcome",
  "languages",
  "runtimes",
  "ides",
  "browsers",
  "devtools",
  "extras",
  "repos",
  "review",
  "installing",
  "summary",
];

export const useWizardStore = create<WizardState>((set, get) => ({
  currentStep: "welcome",
  selectedLanguages: [],
  selectedSoftware: [],
  customRepos: [],
  defaultRepoBase: "~/repos",
  installResults: [],
  isInstalling: false,
  currentInstallIndex: 0,
  totalInstallCount: 0,
  currentInstallingName: "",
  platformInfo: null,
  dryRun: false,
  installedPackagesRaw: [],

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) {
      set({ currentStep: STEP_ORDER[idx + 1] });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx > 0) {
      set({ currentStep: STEP_ORDER[idx - 1] });
    }
  },

  toggleLanguage: (id) =>
    set((s) => ({
      selectedLanguages: s.selectedLanguages.includes(id)
        ? s.selectedLanguages.filter((l) => l !== id)
        : [...s.selectedLanguages, id],
    })),

  toggleSoftware: (id) =>
    set((s) => ({
      selectedSoftware: s.selectedSoftware.includes(id)
        ? s.selectedSoftware.filter((sw) => sw !== id)
        : [...s.selectedSoftware, id],
    })),

  setSelectedLanguages: (ids) => set({ selectedLanguages: ids }),
  setSelectedSoftware: (ids) => set({ selectedSoftware: ids }),

  addCustomRepo: (repo) =>
    set((s) => ({ customRepos: [...s.customRepos, repo] })),

  removeCustomRepo: (id) =>
    set((s) => ({ customRepos: s.customRepos.filter((r) => r.id !== id) })),

  updateCustomRepo: (id, update) =>
    set((s) => ({
      customRepos: s.customRepos.map((r) =>
        r.id === id ? { ...r, ...update } : r,
      ),
    })),

  setDefaultRepoBase: (path) => set({ defaultRepoBase: path }),

  addInstallResult: (result) =>
    set((s) => ({ installResults: [...s.installResults, result] })),

  setInstalling: (val) => set({ isInstalling: val }),

  setInstallProgress: (index, total, name) =>
    set({
      currentInstallIndex: index,
      totalInstallCount: total,
      currentInstallingName: name,
    }),

  clearResults: () => set({ installResults: [] }),

  setPlatformInfo: (info) => set({ platformInfo: info }),
  setDryRun: (val) => set({ dryRun: val }),
  setInstalledPackagesRaw: (raw) => set({ installedPackagesRaw: raw }),

  applyPreset: (preset) =>
    set({
      selectedLanguages: preset.languages ?? [],
      selectedSoftware: preset.selections ?? [],
      customRepos: preset.customInstalls ?? [],
      defaultRepoBase: preset.defaultRepoBase ?? "~/repos",
    }),

  exportProfile: () => {
    const s = get();
    return {
      name: "My Profile",
      description: "Exported EnvGuppy profile",
      icon: "User",
      selections: s.selectedSoftware,
      languages: s.selectedLanguages,
      customInstalls: s.customRepos,
      defaultRepoBase: s.defaultRepoBase,
    };
  },

  reset: () =>
    set({
      currentStep: "welcome",
      selectedLanguages: [],
      selectedSoftware: [],
      customRepos: [],
      defaultRepoBase: "~/repos",
      installResults: [],
      isInstalling: false,
      currentInstallIndex: 0,
      totalInstallCount: 0,
      currentInstallingName: "",
      dryRun: false,
    }),
}));
