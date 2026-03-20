export type WizardStep =
  | "welcome"
  | "languages"
  | "runtimes"
  | "ides"
  | "browsers"
  | "devtools"
  | "extras"
  | "repos"
  | "review"
  | "installing"
  | "summary";

export type Category =
  | "language"
  | "runtime"
  | "ide"
  | "browser"
  | "devtool"
  | "gaming"
  | "communication"
  | "productivity";

export type PackageManagerType =
  | "winget"
  | "choco"
  | "scoop"
  | "apt"
  | "brew"
  | "url";

export interface InstallInfo {
  winget?: string;
  choco?: string;
  scoop?: string;
  apt?: string;
  brew?: string;
  url?: string;
}

export interface SoftwareItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: Category;
  subcategory?: string;
  installInfo: InstallInfo;
  relatedLanguages?: string[];
  dependsOn?: string[];
}

export interface LanguageOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface CustomRepoItem {
  id: string;
  repo: string;
  name: string;
  icon?: string;
  path?: string;
}

export interface PresetProfile {
  name: string;
  description: string;
  icon: string;
  selections: string[];
  languages: string[];
  customInstalls?: CustomRepoItem[];
  defaultRepoBase?: string;
}

export interface InstallResult {
  packageId: string;
  success: boolean;
  message: string;
  skipped?: boolean;
}

export interface PlatformInfo {
  os: "windows" | "linux" | "macos" | "unknown";
  packageManagers: PackageManagerType[];
}

export const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "welcome", label: "Welcome" },
  { id: "languages", label: "Languages" },
  { id: "runtimes", label: "Runtimes & Tools" },
  { id: "ides", label: "IDEs & Editors" },
  { id: "browsers", label: "Browsers" },
  { id: "devtools", label: "Dev Tools" },
  { id: "extras", label: "Extras" },
  { id: "repos", label: "Repositories" },
  { id: "review", label: "Review" },
  { id: "installing", label: "Installing" },
  { id: "summary", label: "Summary" },
];
