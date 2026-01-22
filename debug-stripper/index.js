export default function debugStripper(options = {}) {
    const prefix = options.prefix ?? "debug_";
    console.log("remove debug_", options, prefix);

    return {
        name: "debug-stripper",
        apply: "build",
        enforce: "pre", // 🔥 THIS IS THE KEY

        transform(code, id) {
            if (!/\.(jsx|tsx)$/.test(id)) return;

            return code.replace(
                new RegExp(`\\s${prefix}[a-zA-Z0-9_-]+="[^"]*"`, "g"),
                ""
            );
        },
    };
}
