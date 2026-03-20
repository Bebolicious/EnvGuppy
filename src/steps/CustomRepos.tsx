import { useState } from "react";
import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { NavButtons } from "../components/NavButtons";
import { Plus, Trash2, GitBranch, FolderOpen } from "lucide-react";
import type { CustomRepoItem } from "../types";

export function CustomRepos() {
  const {
    customRepos,
    addCustomRepo,
    removeCustomRepo,
    updateCustomRepo,
    defaultRepoBase,
    setDefaultRepoBase,
  } = useWizardStore();

  const [newRepo, setNewRepo] = useState("");
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (!newRepo.trim()) return;

    const repoName =
      newName.trim() ||
      newRepo
        .split("/")
        .pop()
        ?.replace(/\.git$/, "") ||
      "repo";

    const item: CustomRepoItem = {
      id: `repo-${Date.now()}`,
      repo: newRepo.trim(),
      name: repoName,
      path: "",
    };

    addCustomRepo(item);
    setNewRepo("");
    setNewName("");
  };

  return (
    <div>
      <StepHeader
        title="Custom Repositories"
        description="Clone Git repositories as part of your setup. Requires Git to be installed (selected in Dev Tools)."
      />

      <div className="mb-6">
        <label className="mb-2 block text-sm text-text-secondary">
          Default clone directory
        </label>
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={defaultRepoBase}
            onChange={(e) => setDefaultRepoBase(e.target.value)}
            placeholder="~/repos"
            className="flex-1 rounded-lg border border-border-default bg-bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-border-default bg-bg-surface p-4">
        <h3 className="mb-3 text-sm font-medium text-text-primary">
          Add Repository
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="https://github.com/user/repo.git"
            className="rounded-lg border border-border-default bg-bg-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
          />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Display name (optional)"
            className="rounded-lg border border-border-default bg-bg-base px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={!newRepo.trim()}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent/15 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {customRepos.length > 0 && (
        <div className="flex flex-col gap-2">
          {customRepos.map((repo) => (
            <div
              key={repo.id}
              className="flex items-center gap-3 rounded-lg border border-border-default bg-bg-surface px-4 py-3"
            >
              <GitBranch className="h-4 w-4 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">
                  {repo.name}
                </p>
                <p className="truncate text-xs text-text-muted">{repo.repo}</p>
              </div>
              <input
                type="text"
                value={repo.path || ""}
                onChange={(e) =>
                  updateCustomRepo(repo.id, { path: e.target.value })
                }
                placeholder={`${defaultRepoBase}/${repo.name}`}
                className="w-48 rounded-md border border-border-default bg-bg-base px-2 py-1 text-xs text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
              />
              <button
                onClick={() => removeCustomRepo(repo.id)}
                className="shrink-0 rounded-md p-1 text-text-muted transition-colors hover:bg-error/10 hover:text-error"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {customRepos.length === 0 && (
        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-border-default">
          <p className="text-sm text-text-muted">
            No repositories added. This step is optional.
          </p>
        </div>
      )}

      <NavButtons />
    </div>
  );
}
