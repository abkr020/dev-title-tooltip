export function devTooltip(options = {}) {
    const prefix = options.prefix ?? "debug_";
    console.log('prefix', prefix);

    return {
        name: "dev-tooltip",

        configResolved(config) {
            this.isProd = config.mode === "production"; // Save the mode in plugin context
        },


        // 🟢 DEV: Inject tooltip runtime automatically
        apply: "serve",
        transformIndexHtml() {
            return {
                tags: [
                    {
                        tag: "script",
                        injectTo: "body",
                        children: `
              document.addEventListener("mouseover", (e) => {
                const el = e.target.closest("[${prefix}title]");
                if (!el) return;

                const tooltip = document.createElement("div");
                tooltip.textContent = el.getAttribute("${prefix}title");
                tooltip.style.cssText = \`
                  position: fixed;
                  background: black;
                  color: white;
                  padding: 6px 10px;
                  font-size: 12px;
                  border-radius: 4px;
                  z-index: 9999;
                  pointer-events: none;
                \`;

                document.body.appendChild(tooltip);

                const move = (ev) => {
                  tooltip.style.left = ev.clientX + 10 + "px";
                  tooltip.style.top = ev.clientY + 10 + "px";
                };

                document.addEventListener("mousemove", move);

                el.addEventListener(
                  "mouseleave",
                  () => {
                    tooltip.remove();
                    document.removeEventListener("mousemove", move);
                  },
                  { once: true }
                );
              });
            `,
                    },
                ],
            };
        },

        // 🔴 BUILD: Strip debug_* attributes
        // apply: "build",
        // enforce: "pre",
        // transform(code, id) {
        //   if (!/\.(jsx|tsx)$/.test(id)) return;

        //   return code.replace(
        //     new RegExp(`\\s${prefix}[a-zA-Z0-9_-]+="[^"]*"`, "g"),
        //     ""
        //   );
        // },



        // 🔴 BUILD: Strip debug_* attributes
        // transform(code, id) {
        //   if (!/\.(jsx|tsx)$/.test(id)) return;
        // //   if (process.env.NODE_ENV !== "production") return code;
        // if (!import.meta.env.PROD) return code;


        //   return code.replace(
        //     new RegExp(`\\s${prefix}[a-zA-Z0-9_-]+="[^"]*"`, "g"),
        //     ""
        //   );
        // },




        // transform(code, id) {
        //     // Only strip JSX/TSX files
        //     if (!/\.(jsx|tsx)$/.test(id)) return;

        //     // Only run in production build
        //     if (!import.meta.env.PROD) return code;

        //     // Remove any debug_* attribute (double or single quotes)
        //     const regex = new RegExp(`\\s${prefix}[a-zA-Z0-9_-]+=(?:"[^"]*"|'[^']*')`, "g");

        //     return code.replace(regex, "");
        // }



         // BUILD: Strip debug_* attributes
    transform(code, id) {
      if (!/\.(jsx|tsx)$/.test(id)) return code;

      if (!this.isProd) return code; // ✅ only strip in production

      // remove debug_* attributes (single or double quotes)
      const regex = new RegExp(`\\s${prefix}[a-zA-Z0-9_-]+=(?:"[^"]*"|'[^']*')`, "g");
      return code.replace(regex, "");
    },




    };
}
