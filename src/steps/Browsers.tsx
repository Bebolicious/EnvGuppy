import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { SoftwareCard } from "../components/SoftwareCard";
import { NavButtons } from "../components/NavButtons";
import { browsers } from "../data/catalog";

export function Browsers() {
  const { selectedSoftware, toggleSoftware } = useWizardStore();

  return (
    <div>
      <StepHeader
        title="Browsers"
        description="Select which browsers you'd like installed."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {browsers.map((item) => (
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
