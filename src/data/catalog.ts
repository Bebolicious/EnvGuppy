import type { LanguageOption, SoftwareItem } from "../types";

export const languages: LanguageOption[] = [
  {
    id: "javascript",
    name: "JavaScript",
    description: "Web & server-side scripting",
    icon: "Braces",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Typed superset of JavaScript",
    icon: "FileType",
  },
  {
    id: "csharp",
    name: "C#",
    description: ".NET ecosystem language",
    icon: "Hash",
  },
  {
    id: "python",
    name: "Python",
    description: "General-purpose scripting",
    icon: "Code",
  },
  {
    id: "rust",
    name: "Rust",
    description: "Systems programming",
    icon: "Cog",
  },
  {
    id: "go",
    name: "Go",
    description: "Cloud & systems language",
    icon: "Workflow",
  },
  {
    id: "java",
    name: "Java",
    description: "Enterprise & Android",
    icon: "Coffee",
  },
  {
    id: "cpp",
    name: "C / C++",
    description: "Low-level systems programming",
    icon: "Cpu",
  },
  {
    id: "php",
    name: "PHP",
    description: "Server-side web scripting",
    icon: "Globe",
  },
  {
    id: "ruby",
    name: "Ruby",
    description: "Web development with Rails",
    icon: "Gem",
  },
];

export const runtimes: SoftwareItem[] = [
  // JavaScript / TypeScript runtimes
  {
    id: "nodejs-lts",
    name: "Node.js LTS",
    description: "Long-term support release",
    icon: "Server",
    category: "runtime",
    relatedLanguages: ["javascript", "typescript"],
    installInfo: {
      winget: "OpenJS.NodeJS.LTS",
      choco: "nodejs-lts",
      scoop: "nodejs-lts",
      apt: "nodejs",
      brew: "node",
    },
  },
  {
    id: "nodejs-current",
    name: "Node.js Current",
    description: "Latest features release",
    icon: "Server",
    category: "runtime",
    relatedLanguages: ["javascript", "typescript"],
    installInfo: {
      winget: "OpenJS.NodeJS",
      choco: "nodejs",
      scoop: "nodejs",
      brew: "node",
    },
  },
  {
    id: "nvm",
    name: "nvm",
    description: "Node Version Manager",
    icon: "Layers",
    category: "runtime",
    relatedLanguages: ["javascript", "typescript"],
    installInfo: {
      winget: "CoreyButler.NVMforWindows",
      choco: "nvm",
      brew: "nvm",
    },
  },
  {
    id: "yarn",
    name: "Yarn",
    description: "Alternative package manager for Node",
    icon: "Package",
    category: "runtime",
    relatedLanguages: ["javascript", "typescript"],
    installInfo: {
      winget: "Yarn.Yarn",
      choco: "yarn",
      scoop: "yarn",
      brew: "yarn",
    },
  },
  {
    id: "pnpm",
    name: "pnpm",
    description: "Fast, disk-efficient package manager",
    icon: "Package",
    category: "runtime",
    relatedLanguages: ["javascript", "typescript"],
    installInfo: {
      winget: "pnpm.pnpm",
      choco: "pnpm",
      scoop: "pnpm",
      brew: "pnpm",
    },
  },
  {
    id: "bun",
    name: "Bun",
    description: "All-in-one JS runtime & toolkit",
    icon: "Zap",
    category: "runtime",
    relatedLanguages: ["javascript", "typescript"],
    installInfo: {
      winget: "Oven-sh.Bun",
      scoop: "bun",
      brew: "oven-sh/bun/bun",
    },
  },

  // C# / .NET runtimes
  {
    id: "dotnet-sdk-8",
    name: ".NET SDK 8",
    description: "LTS SDK for building .NET apps",
    icon: "Box",
    category: "runtime",
    relatedLanguages: ["csharp"],
    installInfo: {
      winget: "Microsoft.DotNet.SDK.8",
      choco: "dotnet-sdk",
      apt: "dotnet-sdk-8.0",
      brew: "--cask dotnet-sdk",
    },
  },
  {
    id: "dotnet-sdk-9",
    name: ".NET SDK 9",
    description: "Latest SDK for .NET development",
    icon: "Box",
    category: "runtime",
    relatedLanguages: ["csharp"],
    installInfo: {
      winget: "Microsoft.DotNet.SDK.9",
      choco: "dotnet-sdk --version=9.0.0",
    },
  },
  {
    id: "dotnet-runtime-8",
    name: ".NET Runtime 8",
    description: "Runtime for running .NET 8 apps",
    icon: "Play",
    category: "runtime",
    relatedLanguages: ["csharp"],
    installInfo: {
      winget: "Microsoft.DotNet.Runtime.8",
      apt: "dotnet-runtime-8.0",
    },
  },
  {
    id: "aspnet-runtime-8",
    name: "ASP.NET Runtime 8",
    description: "Runtime for ASP.NET web applications",
    icon: "Globe",
    category: "runtime",
    relatedLanguages: ["csharp"],
    installInfo: {
      winget: "Microsoft.DotNet.AspNetCore.8",
      apt: "aspnetcore-runtime-8.0",
    },
  },

  // Python
  {
    id: "python-3-12",
    name: "Python 3.12",
    description: "Stable Python release",
    icon: "Code",
    category: "runtime",
    relatedLanguages: ["python"],
    installInfo: {
      winget: "Python.Python.3.12",
      choco: "python312",
      apt: "python3.12",
      brew: "python@3.12",
    },
  },
  {
    id: "python-3-13",
    name: "Python 3.13",
    description: "Latest Python release",
    icon: "Code",
    category: "runtime",
    relatedLanguages: ["python"],
    installInfo: {
      winget: "Python.Python.3.13",
      choco: "python313",
      apt: "python3.13",
      brew: "python@3.13",
    },
  },
  {
    id: "poetry",
    name: "Poetry",
    description: "Python dependency management",
    icon: "Package",
    category: "runtime",
    relatedLanguages: ["python"],
    installInfo: {
      winget: "Python.Poetry",
      brew: "poetry",
    },
  },
  {
    id: "pipenv",
    name: "Pipenv",
    description: "Python virtualenv management",
    icon: "Package",
    category: "runtime",
    relatedLanguages: ["python"],
    installInfo: {
      choco: "pipenv",
      brew: "pipenv",
    },
  },

  // Rust
  {
    id: "rustup",
    name: "Rustup + Cargo",
    description: "Rust toolchain installer & build system",
    icon: "Cog",
    category: "runtime",
    relatedLanguages: ["rust"],
    installInfo: {
      winget: "Rustlang.Rustup",
      brew: "rustup",
    },
  },

  // Go
  {
    id: "go-sdk",
    name: "Go SDK",
    description: "Go programming language toolchain",
    icon: "Workflow",
    category: "runtime",
    relatedLanguages: ["go"],
    installInfo: {
      winget: "GoLang.Go",
      choco: "golang",
      scoop: "go",
      apt: "golang-go",
      brew: "go",
    },
  },

  // Java
  {
    id: "jdk-21",
    name: "JDK 21 (Temurin)",
    description: "Latest LTS Java Development Kit",
    icon: "Coffee",
    category: "runtime",
    relatedLanguages: ["java"],
    installInfo: {
      winget: "EclipseAdoptium.Temurin.21.JDK",
      choco: "temurin21",
      apt: "temurin-21-jdk",
      brew: "--cask temurin21",
    },
  },
  {
    id: "jdk-17",
    name: "JDK 17 (Temurin)",
    description: "Long-term support JDK",
    icon: "Coffee",
    category: "runtime",
    relatedLanguages: ["java"],
    installInfo: {
      winget: "EclipseAdoptium.Temurin.17.JDK",
      choco: "temurin17",
      apt: "temurin-17-jdk",
      brew: "--cask temurin17",
    },
  },
  {
    id: "maven",
    name: "Apache Maven",
    description: "Java project build tool",
    icon: "Hammer",
    category: "runtime",
    relatedLanguages: ["java"],
    installInfo: {
      winget: "Apache.Maven",
      choco: "maven",
      scoop: "maven",
      apt: "maven",
      brew: "maven",
    },
  },
  {
    id: "gradle",
    name: "Gradle",
    description: "Flexible Java build automation",
    icon: "Hammer",
    category: "runtime",
    relatedLanguages: ["java"],
    installInfo: {
      winget: "Gradle.Gradle",
      choco: "gradle",
      scoop: "gradle",
      brew: "gradle",
    },
  },

  // C/C++
  {
    id: "cmake",
    name: "CMake",
    description: "Cross-platform build system",
    icon: "Wrench",
    category: "runtime",
    relatedLanguages: ["cpp"],
    installInfo: {
      winget: "Kitware.CMake",
      choco: "cmake",
      scoop: "cmake",
      apt: "cmake",
      brew: "cmake",
    },
  },
  {
    id: "mingw",
    name: "MinGW-w64",
    description: "GCC compiler for Windows",
    icon: "Cpu",
    category: "runtime",
    relatedLanguages: ["cpp"],
    installInfo: {
      winget: "MartinStorsjo.LLVM-MinGW",
      choco: "mingw",
      scoop: "mingw",
    },
  },

  // PHP
  {
    id: "php",
    name: "PHP",
    description: "PHP interpreter",
    icon: "Globe",
    category: "runtime",
    relatedLanguages: ["php"],
    installInfo: {
      winget: "PHP.PHP",
      choco: "php",
      scoop: "php",
      apt: "php",
      brew: "php",
    },
  },
  {
    id: "composer",
    name: "Composer",
    description: "PHP dependency manager",
    icon: "Package",
    category: "runtime",
    relatedLanguages: ["php"],
    installInfo: {
      winget: "Composer.Composer",
      choco: "composer",
      scoop: "composer",
      brew: "composer",
    },
  },

  // Ruby
  {
    id: "ruby",
    name: "Ruby",
    description: "Ruby interpreter",
    icon: "Gem",
    category: "runtime",
    relatedLanguages: ["ruby"],
    installInfo: {
      winget: "RubyInstallerTeam.RubyWithDevKit.3.3",
      choco: "ruby",
      scoop: "ruby",
      apt: "ruby-full",
      brew: "ruby",
    },
  },
];

export const ides: SoftwareItem[] = [
  {
    id: "vscode",
    name: "Visual Studio Code",
    description: "Lightweight, extensible code editor",
    icon: "Code",
    category: "ide",
    installInfo: {
      winget: "Microsoft.VisualStudioCode",
      choco: "vscode",
      scoop: "vscode",
      apt: "code",
      brew: "--cask visual-studio-code",
    },
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-powered code editor",
    icon: "Bot",
    category: "ide",
    installInfo: {
      winget: "Anysphere.Cursor",
      brew: "--cask cursor",
    },
  },
  {
    id: "vs-2022",
    name: "Visual Studio 2022",
    description: "Full-featured IDE for .NET & C++",
    icon: "Monitor",
    category: "ide",
    installInfo: {
      winget: "Microsoft.VisualStudio.2022.Community",
      choco: "visualstudio2022community",
    },
  },
  {
    id: "intellij",
    name: "IntelliJ IDEA",
    description: "Java & Kotlin IDE",
    icon: "Lightbulb",
    category: "ide",
    installInfo: {
      winget: "JetBrains.IntelliJIDEA.Community",
      choco: "intellijidea-community",
      brew: "--cask intellij-idea-ce",
    },
  },
  {
    id: "webstorm",
    name: "WebStorm",
    description: "JavaScript & TypeScript IDE",
    icon: "Globe",
    category: "ide",
    installInfo: {
      winget: "JetBrains.WebStorm",
      choco: "webstorm",
      brew: "--cask webstorm",
    },
  },
  {
    id: "rider",
    name: "Rider",
    description: ".NET & Unity IDE",
    icon: "Bike",
    category: "ide",
    installInfo: {
      winget: "JetBrains.Rider",
      choco: "jetbrains-rider",
      brew: "--cask rider",
    },
  },
  {
    id: "pycharm",
    name: "PyCharm",
    description: "Python IDE",
    icon: "Brain",
    category: "ide",
    installInfo: {
      winget: "JetBrains.PyCharm.Community",
      choco: "pycharm-community",
      brew: "--cask pycharm-ce",
    },
  },
  {
    id: "goland",
    name: "GoLand",
    description: "Go IDE",
    icon: "Workflow",
    category: "ide",
    installInfo: {
      winget: "JetBrains.GoLand",
      choco: "goland",
      brew: "--cask goland",
    },
  },
  {
    id: "clion",
    name: "CLion",
    description: "C/C++ IDE",
    icon: "Cpu",
    category: "ide",
    installInfo: {
      winget: "JetBrains.CLion",
      choco: "clion",
      brew: "--cask clion",
    },
  },
  {
    id: "rustrover",
    name: "RustRover",
    description: "Rust IDE",
    icon: "Cog",
    category: "ide",
    installInfo: {
      winget: "JetBrains.RustRover",
      brew: "--cask rustrover",
    },
  },
  {
    id: "neovim",
    name: "Neovim",
    description: "Hyperextensible terminal editor",
    icon: "Terminal",
    category: "ide",
    installInfo: {
      winget: "Neovim.Neovim",
      choco: "neovim",
      scoop: "neovim",
      apt: "neovim",
      brew: "neovim",
    },
  },
  {
    id: "sublime",
    name: "Sublime Text",
    description: "Fast, minimal text editor",
    icon: "FileText",
    category: "ide",
    installInfo: {
      winget: "SublimeHQ.SublimeText.4",
      choco: "sublimetext4",
      scoop: "sublime-text",
      brew: "--cask sublime-text",
    },
  },
  {
    id: "zed",
    name: "Zed",
    description: "High-performance collaborative editor",
    icon: "Zap",
    category: "ide",
    installInfo: {
      winget: "Zed.Zed",
      brew: "--cask zed",
    },
  },
  {
    id: "notepadpp",
    name: "Notepad++",
    description: "Classic Windows text editor",
    icon: "FileEdit",
    category: "ide",
    installInfo: {
      winget: "Notepad++.Notepad++",
      choco: "notepadplusplus",
      scoop: "notepadplusplus",
    },
  },
];

export const browsers: SoftwareItem[] = [
  {
    id: "chrome",
    name: "Google Chrome",
    description: "Popular cross-platform browser",
    icon: "Chrome",
    category: "browser",
    installInfo: {
      winget: "Google.Chrome",
      choco: "googlechrome",
      brew: "--cask google-chrome",
    },
  },
  {
    id: "firefox",
    name: "Firefox",
    description: "Privacy-focused open-source browser",
    icon: "Flame",
    category: "browser",
    installInfo: {
      winget: "Mozilla.Firefox",
      choco: "firefox",
      scoop: "firefox",
      apt: "firefox",
      brew: "--cask firefox",
    },
  },
  {
    id: "brave",
    name: "Brave",
    description: "Privacy-first browser with ad blocking",
    icon: "Shield",
    category: "browser",
    installInfo: {
      winget: "Brave.Brave",
      choco: "brave",
      brew: "--cask brave-browser",
    },
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    description: "Chromium-based Windows browser",
    icon: "Globe",
    category: "browser",
    installInfo: {
      winget: "Microsoft.Edge",
      choco: "microsoft-edge",
      brew: "--cask microsoft-edge",
    },
  },
  {
    id: "arc",
    name: "Arc",
    description: "Reimagined browser experience",
    icon: "Compass",
    category: "browser",
    installInfo: {
      winget: "TheBrowserCompany.Arc",
      brew: "--cask arc",
    },
  },
  {
    id: "vivaldi",
    name: "Vivaldi",
    description: "Highly customizable power browser",
    icon: "Settings",
    category: "browser",
    installInfo: {
      winget: "Vivaldi.Vivaldi",
      choco: "vivaldi",
      brew: "--cask vivaldi",
    },
  },
  {
    id: "zen",
    name: "Zen Browser",
    description: "Firefox-based privacy browser",
    icon: "Leaf",
    category: "browser",
    installInfo: {
      winget: "Zen-Team.Zen-Browser",
      brew: "--cask zen-browser",
    },
  },
];

export const devtools: SoftwareItem[] = [
  {
    id: "git",
    name: "Git",
    description: "Distributed version control",
    icon: "GitBranch",
    category: "devtool",
    installInfo: {
      winget: "Git.Git",
      choco: "git",
      scoop: "git",
      apt: "git",
      brew: "git",
    },
  },
  {
    id: "github-cli",
    name: "GitHub CLI",
    description: "GitHub from the command line",
    icon: "Github",
    category: "devtool",
    installInfo: {
      winget: "GitHub.cli",
      choco: "gh",
      scoop: "gh",
      apt: "gh",
      brew: "gh",
    },
  },
  {
    id: "azure-cli",
    name: "Azure CLI",
    description: "Microsoft Azure command-line tools",
    icon: "Cloud",
    category: "devtool",
    installInfo: {
      winget: "Microsoft.AzureCLI",
      choco: "azure-cli",
      brew: "azure-cli",
    },
  },
  {
    id: "docker-desktop",
    name: "Docker Desktop",
    description: "Container development environment",
    icon: "Container",
    category: "devtool",
    installInfo: {
      winget: "Docker.DockerDesktop",
      choco: "docker-desktop",
      brew: "--cask docker",
    },
  },
  {
    id: "podman",
    name: "Podman",
    description: "Daemonless container engine",
    icon: "Container",
    category: "devtool",
    installInfo: {
      winget: "RedHat.Podman",
      choco: "podman-cli",
      apt: "podman",
      brew: "podman",
    },
  },
  {
    id: "postman",
    name: "Postman",
    description: "API development & testing",
    icon: "Send",
    category: "devtool",
    installInfo: {
      winget: "Postman.Postman",
      choco: "postman",
      brew: "--cask postman",
    },
  },
];

export const gaming: SoftwareItem[] = [
  {
    id: "steam",
    name: "Steam",
    description: "Valve's game distribution platform",
    icon: "Gamepad2",
    category: "gaming",
    installInfo: {
      winget: "Valve.Steam",
      choco: "steam",
      brew: "--cask steam",
    },
  },
  {
    id: "epic-games",
    name: "Epic Games Launcher",
    description: "Epic Games store & launcher",
    icon: "Gamepad2",
    category: "gaming",
    installInfo: {
      winget: "EpicGames.EpicGamesLauncher",
      choco: "epicgameslauncher",
    },
  },
  {
    id: "gog-galaxy",
    name: "GOG Galaxy",
    description: "DRM-free gaming platform",
    icon: "Gamepad2",
    category: "gaming",
    installInfo: {
      winget: "GOG.Galaxy",
      choco: "goggalaxy",
    },
  },
  {
    id: "battlenet",
    name: "Battle.net",
    description: "Blizzard gaming platform",
    icon: "Gamepad2",
    category: "gaming",
    installInfo: {
      winget: "Blizzard.BattleNet",
      choco: "battle.net",
    },
  },
];

export const communication: SoftwareItem[] = [
  {
    id: "discord",
    name: "Discord",
    description: "Voice, video & text chat",
    icon: "MessageCircle",
    category: "communication",
    installInfo: {
      winget: "Discord.Discord",
      choco: "discord",
      brew: "--cask discord",
    },
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team communication platform",
    icon: "Hash",
    category: "communication",
    installInfo: {
      winget: "SlackTechnologies.Slack",
      choco: "slack",
      brew: "--cask slack",
    },
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Business communication & collaboration",
    icon: "Users",
    category: "communication",
    installInfo: {
      winget: "Microsoft.Teams",
      choco: "microsoft-teams",
      brew: "--cask microsoft-teams",
    },
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Video conferencing",
    icon: "Video",
    category: "communication",
    installInfo: {
      winget: "Zoom.Zoom",
      choco: "zoom",
      brew: "--cask zoom",
    },
  },
];

export const productivity: SoftwareItem[] = [
  {
    id: "notion",
    name: "Notion",
    description: "All-in-one workspace & notes",
    icon: "BookOpen",
    category: "productivity",
    installInfo: {
      winget: "Notion.Notion",
      choco: "notion",
      brew: "--cask notion",
    },
  },
  {
    id: "vlc",
    name: "VLC",
    description: "Universal media player",
    icon: "Play",
    category: "productivity",
    installInfo: {
      winget: "VideoLAN.VLC",
      choco: "vlc",
      scoop: "vlc",
      apt: "vlc",
      brew: "--cask vlc",
    },
  },
  {
    id: "7zip",
    name: "7-Zip",
    description: "File archiver with high compression",
    icon: "FolderArchive",
    category: "productivity",
    installInfo: {
      winget: "7zip.7zip",
      choco: "7zip",
      scoop: "7zip",
      apt: "p7zip-full",
      brew: "7-zip",
    },
  },
  {
    id: "powertoys",
    name: "PowerToys",
    description: "Windows power user utilities",
    icon: "Wrench",
    category: "productivity",
    installInfo: {
      winget: "Microsoft.PowerToys",
      choco: "powertoys",
    },
  },
  {
    id: "winrar",
    name: "WinRAR",
    description: "Archive manager for RAR & ZIP",
    icon: "FolderArchive",
    category: "productivity",
    installInfo: {
      winget: "RARLab.WinRAR",
      choco: "winrar",
    },
  },
];

export const allSoftware: SoftwareItem[] = [
  ...runtimes,
  ...ides,
  ...browsers,
  ...devtools,
  ...gaming,
  ...communication,
  ...productivity,
];

export function getSoftwareById(id: string): SoftwareItem | undefined {
  return allSoftware.find((s) => s.id === id);
}

export function getRuntimesForLanguages(languageIds: string[]): SoftwareItem[] {
  return runtimes.filter((r) =>
    r.relatedLanguages?.some((l) => languageIds.includes(l)),
  );
}
