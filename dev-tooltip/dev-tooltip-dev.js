// dev-tooltip-dev.js
export function devTooltipDev(prefix = "debug_") {
  return {
    name: "dev-tooltip-dev",
    apply: "serve", // only runs in dev mode
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
  };
}
