# dev-tooltip

Dev-only tooltips using `debug_*` attributes, stripped from production builds.  
Built for **Vite + React** projects to show tooltips in development and automatically remove debug info in production.

---

## Features

- Show tooltips in dev mode on any element with `debug_*` attributes
- Automatically stripped from production builds
- Works with React JSX
- Simple one-line plugin import

---

## Installation

```bash
npm install dev-tooltip --save-dev
```
or
```bash
pnpm add dev-tooltip -D
```


# Usage
Vite Config

In your vite.config.js:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devTooltip } from 'dev-tooltip';

export default defineConfig({
  plugins: [
    react(),
    devTooltip()
  ],
});
```

This will:

Show tooltips in dev mode for elements with debug_* attributes.

Automatically strip the attributes in production builds.

Require no manual runtime import — the plugin injects the tooltip automatically in dev.

Example in JSX

```jsx
function App() {
  return (
    <div
      title="Database table name users"
      debug_title="Users table">
      Hover me in development
    </div>
  );
}

export default App;
```

In dev mode, hovering over the element will show the tooltip.

In production build (npm run build), debug_title will be removed automatically.
<!-- 
Options

devTooltip({ prefix }) — optional config:

Option	Default	Description
prefix	"debug_"	The prefix for debug attributes.

Example:
```javascript
devTooltip({ prefix: "dev_" })
```
Advanced Tips

You can use multiple debug attributes on a single element:
```jsx
<div debug_title="Users table" debug_note="Only for admin">
  Hover me in dev
</div>
```

All attributes with the given prefix are stripped automatically in production.

Works out-of-the-box for multiple projects — just install and add devTooltip() in vite.config.js. -->

---

License

MIT © Abhishek Kumar


---
