---
title: Configuração das Aplicações
order: 3
description: Detalhes sobre a configuração de aplicações individuais (web e admin) dentro de um monorepo.
tags: [monorepo, apps, configuracao, nextjs, vite]
---

## Configuração das Apps

#### App Web (apps/web/package.json)

```json
{
  "name": "web",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint",
    "start": "next start",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@meu-monorepo/ui": "*",
    "@meu-monorepo/utils": "*",
    "@meu-monorepo/config": "*",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### App Admin (apps/admin/package.json)

```json
{
  "name": "admin",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "lint": "eslint .",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@meu-monorepo/ui": "*",
    "@meu-monorepo/utils": "*",
    "@meu-monorepo/config": "*",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.0.0"
  }
}
```


