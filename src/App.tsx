import { useEffect } from "react";
import { WizardLayout } from "./components/WizardLayout";
import { useWizardStore } from "./store/wizardStore";
import { invoke } from "@tauri-apps/api/core";
import type { PlatformInfo } from "./types";

export default function App() {
  const { setPlatformInfo } = useWizardStore();

  useEffect(() => {
    invoke<PlatformInfo>("get_platform_info")
      .then(setPlatformInfo)
      .catch(console.error);
  }, [setPlatformInfo]);

  return <WizardLayout />;
}
