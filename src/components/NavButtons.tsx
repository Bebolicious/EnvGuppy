import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWizardStore } from "../store/wizardStore";

interface NavButtonsProps {
  showBack?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
}

export function NavButtons({
  showBack = true,
  showNext = true,
  nextLabel = "Next",
  onNext,
  onBack,
  nextDisabled = false,
}: NavButtonsProps) {
  const { nextStep, prevStep } = useWizardStore();

  return (
    <div className="mt-8 flex items-center justify-between border-t border-border-default pt-5">
      {showBack ? (
        <button
          onClick={onBack ?? prevStep}
          className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-surface px-4 py-2 text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      ) : (
        <div />
      )}

      {showNext && (
        <button
          onClick={onNext ?? nextStep}
          disabled={nextDisabled}
          className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-bg-base transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
