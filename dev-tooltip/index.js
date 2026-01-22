import { devTooltipDev } from "./dev-tooltip-dev";
import { devTooltipBuild } from "./dev-tooltip-build";

export function devTooltip(options = {}) {
  const prefix = options.prefix ?? "debug_";

  return [
    devTooltipDev(prefix),
    devTooltipBuild(prefix)
  ];
}

// default export for convenience
export default devTooltip;
