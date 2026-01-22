import { devTooltipDev } from "./dev-tooltip-dev.js";
import { devTooltipBuild } from "./dev-tooltip-build.js";

export function devTooltip(options = {}) {
    const prefix = options.prefix ?? "debug_";
    return [
        devTooltipDev(prefix),
        devTooltipBuild(prefix)
    ];
}

export default devTooltip;
