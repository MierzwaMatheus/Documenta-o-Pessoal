---
title: Uso e Deploy de Monorepo
order: 4
description: Como usar os packages compartilhados e configurar o deploy de um monorepo no Vercel.
tags: [monorepo, deploy, vercel, ci/cd]
-

# Uso e Deploy de Monorepo

## Uso dos Packages Compartilhados

#### No App Web (apps/web/src/app/page.tsx)

```typescript
import { Button, ThemeToggle } from \"@meu-monorepo/ui\"
import { formatCurrency } from \"@meu-monorepo/utils\"

export default function HomePage() {
  return (
    <div className=\"min-h-screen bg-background\">
      <header className=\"border-b border-border\">
        <div className=\"container mx-auto px-4 py-4 flex justify-between items-center\">
          <h1 className=\"text-2xl font-bold\">Site Principal</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className=\"container mx-auto px-4 py-8\">
        <h2 className=\"text-3xl font-bold mb-6\">Bem-vindo!</h2>
        <p className=\"text-muted-foreground mb-4\">
          Preço: {formatCurrency(99.99)}
        </p>
        <Button variant=\"primary\">
          Comprar Agora
        </Button>
      </main>
    </div>
  )
}
```

#### No App Admin (apps/admin/src/App.tsx)

```typescript
import { Button, Input, Card } from \"@meu-monorepo/ui\"
import { generateId } from \"@meu-monorepo/utils\"

function App() {
  return (
    <div className=\"min-h-screen bg-background\">
      <header className=\"border-b border-border\">
        <div className=\"container mx-auto px-4 py-4\">
          <h1 className=\"text-2xl font-bold\">Dashboard Admin</h1>
        </div>
      </header>
      
      <main className=\"container mx-auto px-4 py-8\">
        <Card className=\"max-w-md\">
          <div className=\"p-6\">
            <h2 className=\"text-xl font-semibold mb-4\">Criar Usuário</h2>
            <div className=\"space-y-4\">
              <Input label=\"Nome\" placeholder=\"Nome do usuário\" />
              <Input label=\"Email\" type=\"email\" placeholder=\"email@exemplo.com\" />
              <Button variant=\"primary\" className=\"w-full\">
                Criar Usuário
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default App
```

## Deploy no Vercel para Monorepos

#### Configuração do vercel.json na Raiz

```json
{
  \"buildCommand\": \"cd ../.. && npm run build:web\",
  \"outputDirectory\": \"apps/web/.next\",
  \"installCommand\": \"npm install\",
  \"framework\": null
}
```

#### Configuração por Projeto no Vercel

**Para o App Web:**
- **Project Name**: `meu-projeto-web`
- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && npm run build:web`
- **Output Directory**: `apps/web/.next` (Next.js) ou `apps/web/dist` (Vite)
- **Install Command**: `npm install`

**Para o App Admin:**
- **Project Name**: `meu-projeto-admin`
- **Root Directory**: `apps/admin`
- **Build Command**: `cd ../.. && npm run build:admin`
- **Output Directory**: `apps/admin/dist`
- **Install Command**: `npm install`

#### Scripts de Deploy Específicos

Adicione ao `package.json` raiz:

```json
{
  \"scripts\": {
    \"deploy:web:vercel\": \"cd apps/web && vercel --prod\",
    \"deploy:admin:vercel\": \"cd apps/admin && vercel --prod\",
    \"deploy:all\": \"npm run deploy:web:vercel && npm run deploy:admin:vercel\"
  }
}
```

## Configuração de CI/CD para Monorepo

#### GitHub Actions (.github/workflows/ci.yml)

```yaml
name: CI/CD Monorepo

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      web: ${{ steps.changes.outputs.web }}
      admin: ${{ steps.changes.outputs.admin }}
      ui: ${{ steps.changes.outputs.ui }}
    steps:
      - uses: actions/checkout@v3
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            web:
              - \"apps/web/**\"
              - \"packages/**\"
            admin:
              - \"apps/admin/**\"
              - \"packages/**\"
            ui:
              - \"packages/ui/**\"

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: \"18\"
          cache: \"npm\"
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  build-web:
    needs: [changes, test]
    if: needs.changes.outputs.web == \"true\"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: \"18\"
          cache: \"npm\"
      
      - run: npm ci
      - run: npm run build:web

  build-admin:
    needs: [changes, test]
    if: needs.changes.outputs.admin == \"true\"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: \"18\"
          cache: \"npm\"
      
      - run: npm ci
      - run: npm run build:admin

  deploy-web:
    needs: [build-web]
    if: github.ref == \"refs/heads/main\"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_WEB }}
          working-directory: apps/web

  deploy-admin:
    needs: [build-admin]
    if: github.ref == \"refs/heads/main\"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_ADMIN }}
          working-directory: apps/admin
```

## Comandos de Desenvolvimento

```bash
# Instalar dependências de todo o monorepo
npm install

# Desenvolver todas as apps simultaneamente
npm run dev

# Desenvolver apenas o app web
npm run dev:web

# Desenvolver apenas o app admin
npm run dev:admin

# Build de todas as apps
npm run build

# Build apenas do app web
npm run build:web

# Testar todo o monorepo
npm run test

# Lint de todo o código
npm run lint

# Deploy do app web
npm run deploy:web

# Limpar todos os builds
npm run clean
```

## Vantagens do Setup Proposto

1. **Cache Inteligente**: Turborepo só rebuilda o que mudou
2. **Execução Paralela**: Múltiplas tasks executam simultaneamente
3. **Deploy Independente**: Cada app pode ser deployado separadamente
4. **Shared Dependencies**: Dependências comuns são instaladas uma vez
5. **Type Safety**: TypeScript funciona perfeitamente entre packages
6. **Hot Reload**: Mudanças em packages são refletidas imediatamente nas apps

Este setup de monorepo oferece uma base sólida para projetos que precisam compartilhar código entre múltiplas aplicações, mantendo a flexibilidade de desenvolvimento e deploy independentes [9].


