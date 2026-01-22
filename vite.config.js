import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import debugStripper from './debug-stripper'
import { devTooltip } from "dev-tooltip"; // import the local package
import { devTooltipDev } from './dev-tooltip/dev-tooltip-dev';
import { devTooltipBuild } from './dev-tooltip/dev-tooltip-build';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    // debugStripper({ prefix: "debug_" }),
    // devTooltip()
    devTooltipDev(),
    devTooltipBuild()
  ],
})
