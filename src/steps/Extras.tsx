import { useWizardStore } from "../store/wizardStore";
import { StepHeader } from "../components/StepHeader";
import { SoftwareCard } from "../components/SoftwareCard";
import { NavButtons } from "../components/NavButtons";
import { gaming, communication, productivity } from "../data/catalog";

export function Extras() {
  const { selectedSoftware, toggleSoftware } = useWizardStore();

  const sections = [
    { title: "Gaming", items: gaming },
    { title: "Communication", items: communication },
    { title: "Productivity", items: productivity },
  ];

  return (
    <div>
      <StepHeader
        title="Extras"
        description="Gaming platforms, communication tools, and productivity apps."
      />

      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 text-sm font-medium text-text-secondary">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {section.items.map((item) => (
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
          </div>
        ))}
      </div>

      <NavButtons />
    </div>
  );
}
