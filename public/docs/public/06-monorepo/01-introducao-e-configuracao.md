---
title: Introdução e Configuração de Monorepo
order: 1
description: Guia para configurar um monorepo com Turborepo, incluindo estrutura de pastas e configurações iniciais.
tags: [monorepo, turborepo, estrutura, configuracao]
---

## Introdução aos Monorepos

Um monorepo é uma estratégia de organização de código onde múltiplos projetos relacionados são mantidos em um único repositório. Esta abordagem oferece vantagens significativas para equipes que desenvolvem múltiplas aplicações que compartilham código, como um site principal, dashboard administrativo, aplicativo mobile e bibliotecas de componentes.

## Vantagens dos Monorepos

1. **Compartilhamento de Código**: Componentes, utilitários e configurações podem ser reutilizados entre projetos
2. **Versionamento Coordenado**: Mudanças podem ser aplicadas atomicamente em múltiplos projetos
3. **Refatoração Simplificada**: Mudanças em código compartilhado são refletidas imediatamente em todos os projetos
4. **Tooling Unificado**: Configurações de linting, testing e build são centralizadas
5. **Onboarding Facilitado**: Novos desenvolvedores precisam clonar apenas um repositório

## Estrutura Recomendada

```
meu-monorepo/
├── apps/                    # Aplicações deployáveis
│   ├── web/                # Site principal (Next.js/Vite)
│   ├── admin/              # Dashboard admin (Next.js/Vite)
│   ├── mobile/             # App React Native (opcional)
│   └── docs/               # Documentação (Storybook/Docusaurus)
├── packages/               # Pacotes compartilhados
│   ├── ui/                 # Componentes UI compartilhados
│   ├── utils/              # Utilitários compartilhados
│   ├── config/             # Configurações compartilhadas
│   ├── types/              # Tipos TypeScript compartilhados
│   └── api-client/         # Cliente de API compartilhado
├── tools/                  # Scripts e ferramentas
│   ├── build/              # Scripts de build
│   └── deploy/             # Scripts de deploy
├── .github/                # Workflows do GitHub
├── package.json            # Configuração raiz
├── turbo.json              # Configuração do Turborepo
└── README.md
```

## Configuração com Turborepo

O Turborepo é a ferramenta recomendada para orquestração de monorepos modernos. Instale e configure:

```bash
# Criar novo monorepo
npx create-turbo@latest meu-monorepo
cd meu-monorepo

# Ou adicionar ao projeto existente
npm install -D turbo
```

## Configuração do package.json Raiz

```json
{
  "name": "meu-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean",
    "type-check": "turbo run type-check",
    "dev:web": "turbo run dev --filter=web",
    "dev:admin": "turbo run dev --filter=admin",
    "build:web": "turbo run build --filter=web",
    "build:admin": "turbo run build --filter=admin",
    "deploy:web": "turbo run deploy --filter=web",
    "deploy:admin": "turbo run deploy --filter=admin"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  },
  "packageManager": "npm@9.0.0"
}
```

## Configuração do Turborepo (turbo.json)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    },
    "deploy": {
      "dependsOn": ["build", "test", "lint"],
      "cache": false
    }
  }
}
```


