import { WIZARD_STEPS, type WizardStep } from "../types";
import { useWizardStore } from "../store/wizardStore";
import { Check, Circle, Loader2 } from "lucide-react";

const NAVIGABLE_STEPS: WizardStep[] = [
  "welcome",
  "languages",
  "runtimes",
  "ides",
  "browsers",
  "devtools",
  "extras",
  "repos",
  "review",
];

export function Sidebar() {
  const { currentStep, setStep, isInstalling } = useWizardStore();

  const currentIdx = WIZARD_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-border-default bg-bg-sidebar">
      <div className="flex items-center gap-3 border-b border-border-default px-5 py-5">
        <img src="/icon.png" alt="EnvGuppy" className="h-9 w-9 rounded-lg" />
        <div>
          <h1 className="text-sm font-semibold text-text-primary">EnvGuppy</h1>
          <p className="text-xs text-text-muted">v0.1.0</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-0.5">
          {WIZARD_STEPS.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isDone = idx < currentIdx;
            const isClickable =
              !isInstalling &&
              NAVIGABLE_STEPS.includes(step.id) &&
              (isDone || isActive);

            return (
              <li key={step.id}>
                <button
                  onClick={() => isClickable && setStep(step.id)}
                  disabled={!isClickable}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : isDone
                        ? "text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary"
                        : "cursor-default text-text-muted"
                  } ${isClickable && !isActive ? "cursor-pointer" : ""} `}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {step.id === "installing" && isInstalling ? (
                      <Loader2 className="h-4 w-4 animate-spin text-accent" />
                    ) : isDone ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : isActive ? (
                      <Circle className="h-3 w-3 fill-accent text-accent" />
                    ) : (
                      <Circle className="h-3 w-3 text-text-muted" />
                    )}
                  </span>
                  {step.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border-default px-4 py-3">
        <p className="text-[10px] text-text-muted">
          Setup your dev environment
        </p>
      </div>
    </aside>
  );
}
