import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { SoftwareCard } from "../components/SoftwareCard";
import { NavButtons } from "../components/NavButtons";
import { devtools } from "../data/catalog";

export function DevTools() {
  const { selectedSoftware, toggleSoftware } = useWizardStore();

  return (
    <div>
      <StepHeader
        title="Dev Tools"
        description="Version control, containers, API testing, and other developer essentials."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {devtools.map((item) => (
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
