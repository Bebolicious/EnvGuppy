import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { SoftwareCard } from "../components/SoftwareCard";
import { NavButtons } from "../components/NavButtons";
import { languages } from "../data/catalog";

export function Languages() {
  const { selectedLanguages, toggleLanguage } = useWizardStore();

  return (
    <div>
      <StepHeader
        title="Programming Languages"
        description="Select the languages you work with. We'll suggest relevant runtimes and tools in the next step."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {languages.map((lang) => (
          <SoftwareCard
            key={lang.id}
            id={lang.id}
            name={lang.name}
            description={lang.description}
            icon={lang.icon}
            selected={selectedLanguages.includes(lang.id)}
            onToggle={toggleLanguage}
          />
        ))}
      </div>

      <NavButtons />
    </div>
  );
}
