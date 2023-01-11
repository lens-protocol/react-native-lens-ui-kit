import { LensContext } from "../context/context";
import { Theme, Environment } from "../types/types";

export function LensProvider({
  children,
  environment,
  theme,
}: {
  children: React.ReactNode;
  theme?: Theme;
  environment?: Environment;
}) {
  return (
    <LensContext.Provider
      value={{
        environment,
        theme,
      }}
    >
      {children}
    </LensContext.Provider>
  );
}
