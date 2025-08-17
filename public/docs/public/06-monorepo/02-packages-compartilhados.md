---
title: Packages Compartilhados
order: 2
description: Detalhes sobre a configuração e estrutura de packages compartilhados em um monorepo.
tags: [monorepo, packages, shared-code]
---

## Configuração do Package UI Compartilhado

Crie `packages/ui/package.json`:

```json
{
  "name": "@meu-monorepo/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tsup": "^7.0.0",
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

## Configuração de Build do Package UI (packages/ui/tsup.config.ts)

```typescript
import { defineConfig } from \'tsup\'

export default defineConfig({
  entry: [\'src/index.ts\'],
  format: [\'cjs\', \'esm\'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [\'react\', \'react-dom\'],
  injectStyle: true,
})
```

## Estrutura do Package UI

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── index.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## Export do Package UI (packages/ui/src/index.ts)

```typescript
// Componentes
export * from \'./components\'

// Hooks
export * from \'./hooks\'

// Utilitários
export * from \'./utils\'

// Estilos
import \'./styles/globals.css\'
```


