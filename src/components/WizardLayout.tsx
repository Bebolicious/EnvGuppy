import { Sidebar } from "./Sidebar";
import { useWizardStore } from "../store/wizardStore";
import { Welcome } from "../steps/Welcome";
import { Languages } from "../steps/Languages";
import { Runtimes } from "../steps/Runtimes";
import { IDEs } from "../steps/IDEs";
import { Browsers } from "../steps/Browsers";
import { DevTools } from "../steps/DevTools";
import { Extras } from "../steps/Extras";
import { CustomRepos } from "../steps/CustomRepos";
import { Review } from "../steps/Review";
import { Installing } from "../steps/Installing";
import { Summary } from "../steps/Summary";

const stepComponents: Record<string, React.FC> = {
  welcome: Welcome,
  languages: Languages,
  runtimes: Runtimes,
  ides: IDEs,
  browsers: Browsers,
  devtools: DevTools,
  extras: Extras,
  repos: CustomRepos,
  review: Review,
  installing: Installing,
  summary: Summary,
};

export function WizardLayout() {
  const { currentStep } = useWizardStore();
  const StepComponent = stepComponents[currentStep] ?? Welcome;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-base">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="animate-fade-in flex-1 overflow-y-auto px-8 py-6">
          <StepComponent key={currentStep} />
        </div>
      </main>
    </div>
  );
}
