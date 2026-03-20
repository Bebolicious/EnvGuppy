# EnvGuppy

A desktop GUI application that sets up your development environment through an intuitive wizard. Select what you need, and EnvGuppy installs everything for you.

## Tech Stack

- **Tauri v2** (Rust backend)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Zustand** (state management)

## Features

- Wizard-style setup flow with 9 steps
- Contextual runtime suggestions based on language selections
- Support for winget (Windows), apt (Linux), and brew (macOS)
- Auto-detects available package managers (including Chocolatey and Scoop)
- Built-in preset profiles (Web Dev, Game Dev, Full Stack, DevOps)
- Import/export configuration as JSON
- Custom Git repository cloning
- Dry-run mode to preview without installing
- Post-install summary with success/failure details
- Spacedrive-inspired dark UI with pastel mint accents (EnvGuppy)

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) >= 1.77
- [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)

### Setup

```bash
npm install
```

### Run in development

```bash
npm run tauri dev
```

### Build for production

```bash
npm run tauri build
```

## Adding Software to the Catalog

Edit `src/data/catalog.ts` to add new software entries. Each entry needs:

- Unique `id`
- Display `name` and `description`
- Lucide icon name
- `installInfo` with package manager identifiers (winget, choco, scoop, apt, brew)

## Creating Preset Profiles

Add JSON files to `src/data/presets/`. See existing presets for the schema.
