import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { SoftwareCard } from "../components/SoftwareCard";
import { NavButtons } from "../components/NavButtons";
import { ides } from "../data/catalog";

export function IDEs() {
  const { selectedSoftware, toggleSoftware } = useWizardStore();

  return (
    <div>
      <StepHeader
        title="IDEs & Editors"
        description="Choose your preferred code editors and development environments."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ides.map((item) => (
          <SoftwareCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            icon={item.icon}
            selected={selectedSoftware.includes(item.id)}
            onToggle={toggleSoftware}
          />
        ))}
      </div>

      <NavButtons />
    </div>
  );
}
