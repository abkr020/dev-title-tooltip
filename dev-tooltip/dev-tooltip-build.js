// dev-tooltip-build.js
export function devTooltipBuild(prefix = "debug_") {
  return {
    name: "dev-tooltip-build",
    enforce: "pre",
    transform(code, id) {
      if (!/\.(jsx|tsx)$/.test(id)) return code;

      const isProd = process.env.MODE === "production" || process.env.NODE_ENV === "production";
      if (!isProd) return code;

      const regex = new RegExp(`\\s${prefix}[a-zA-Z0-9_-]+=(?:"[^"]*"|'[^']*')`, "g");
      return code.replace(regex, "");
    },
  };
}
