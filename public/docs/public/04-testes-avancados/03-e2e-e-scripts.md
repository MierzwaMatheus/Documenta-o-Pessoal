---
title: Testes E2E e Scripts
order: 3
description: Configuração de testes End-to-End com Playwright e scripts NPM para execução de testes.
tags: [testes, e2e, playwright, scripts]
-

# Testes E2E e Scripts

## Configuração de Testes E2E com Playwright

Crie `playwright.config.ts`:

```typescript
import { defineConfig, devices } from \"@playwright/test\"

export default defineConfig({
  testDir: \"./e2e\",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: \"html\",
  use: {
    baseURL: \"http://localhost:3000\",
    trace: \"on-first-retry\",
  },

  projects: [
    {
      name: \"chromium\",
      use: { ...devices[\"Desktop Chrome\"] },
    },
    {
      name: \"firefox\",
      use: { ...devices[\"Desktop Firefox\"] },
    },
    {
      name: \"webkit\",
      use: { ...devices[\"Desktop Safari\"] },
    },
    {
      name: \"Mobile Chrome\",
      use: { ...devices[\"Pixel 5\"] },
    },
  ],

  webServer: {
    command: \"npm run dev\",
    url: \"http://localhost:3000\",
    reuseExistingServer: !process.env.CI,
  },
})
```

## Exemplo de Teste E2E

Crie `e2e/theme-toggle.spec.ts`:

```typescript
import { test, expect } from \"@playwright/test\"

test.describe(\"Theme Toggle\", () => {
  test(\"alterna entre temas claro e escuro\", async ({ page }) => {
    await page.goto(\"/\")
    
    // Verifica tema inicial
    await expect(page.locator(\"html\")).toHaveClass(/light/)
    
    // Clica no botão de tema
    await page.click(\"[data-testid=\"theme-toggle\"]\")
    
    // Verifica mudança para tema escuro
    await expect(page.locator(\"html\")).toHaveClass(/dark/)
    
    // Clica novamente
    await page.click(\"[data-testid=\"theme-toggle\"]\")
    
    // Verifica mudança para tema system
    await expect(page.locator(\"html\")).not.toHaveClass(/light|dark/)
  })

  test(\"persiste tema selecionado após reload\", async ({ page }) => {
    await page.goto(\"/\")
    
    // Seleciona tema escuro
    await page.click(\"[data-testid=\"theme-toggle\"]\")
    await expect(page.locator(\"html\")).toHaveClass(/dark/)
    
    // Recarrega a página
    await page.reload()
    
    // Verifica se tema foi mantido
    await expect(page.locator(\"html\")).toHaveClass(/dark/)
  })
})
```

## Scripts de Teste

Adicione ao `package.json`:

```json
{
  \"scripts\": {
    \"test\": \"vitest\",
    \"test:ui\": \"vitest --ui\",
    \"test:run\": \"vitest run\",
    \"test:coverage\": \"vitest run --coverage\",
    \"test:e2e\": \"playwright test\",
    \"test:e2e:ui\": \"playwright test --ui\",
    \"test:all\": \"npm run test:run && npm run test:e2e\"
  }
}
```

## Integração com CI/CD

Exemplo para GitHub Actions (`.github/workflows/test.yml`):

```yaml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: \"18\"
          cache: \"npm\"
      
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: \"18\"
          cache: \"npm\"
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

Este setup de testes avançados garante qualidade de código em todos os níveis, desde componentes individuais até fluxos completos do usuário, proporcionando confiança para refatorações e desenvolvimento contínuo [7].


