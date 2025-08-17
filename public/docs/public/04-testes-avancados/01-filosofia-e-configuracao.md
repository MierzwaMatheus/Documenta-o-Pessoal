---
title: Filosofia e Configuração de Testes
order: 1
description: Detalhes sobre a filosofia de testes e a configuração do ambiente de testes com Vitest e MSW.
tags: [testes, vitest, msw, qualidade]
---

## Filosofia de Testes

Um sistema de testes robusto é fundamental para manter a qualidade e confiabilidade do código ao longo do tempo. A estratégia de testes deve cobrir diferentes níveis: unitários (componentes isolados), integração (interação entre componentes) e end-to-end (fluxos completos do usuário). Esta abordagem em camadas garante que bugs sejam detectados precocemente e que refatorações possam ser feitas com confiança.

## Configuração Base de Testes

Instale as dependências necessárias para um ambiente de testes completo:

```bash
# Ferramentas de teste principais
npm install -D vitest @vitest/ui jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D msw @mswjs/data
npm install -D @playwright/test

# Para testes visuais (opcional)
npm install -D @storybook/test-runner chromatic
```

## Configuração do Vitest

Crie `vitest.config.ts` na raiz do projeto:

```typescript
import { defineConfig } from \'vitest/config\'
import react from \'@vitejs/plugin-react\'
import path from \'path\'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: \'jsdom\',
    setupFiles: [\'./src/test/setup.ts\'],
    globals: true,
    css: true,
    coverage: {
      provider: \'v8\',
      reporter: [\'text\', \'json\', \'html\'],
      exclude: [
        \'node_modules/\',
        \'src/test/\',
        \'**/*.d.ts\',
        \'**/*.config.*\',
        \'**/coverage/**\',
      ],
    },
  },
  resolve: {
    alias: {
      \'@\': path.resolve(__dirname, \'./src\'),
    },
  },
})
```

## Arquivo de Setup de Testes

Crie `src/test/setup.ts`:

```typescript
import \'@testing-library/jest-dom\'
import { cleanup } from \'@testing-library/react\'
import { afterEach, beforeAll, afterAll } from \'vitest\'
import { server } from \'./mocks/server\'

// Limpa após cada teste
afterEach(() => {
  cleanup()
})

// Configura MSW
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock do matchMedia para testes de tema
Object.defineProperty(window, \'matchMedia\', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock do localStorage
const localStorageMock = {
  getItem: (key: string) => {
    return localStorageMock[key] || null
  },
  setItem: (key: string, value: string) => {
    localStorageMock[key] = value
  },
  removeItem: (key: string) => {
    delete localStorageMock[key]
  },
  clear: () => {
    Object.keys(localStorageMock).forEach(key => {
      if (key !== \'getItem\' && key !== \'setItem\' && key !== \'removeItem\' && key !== \'clear\') {
        delete localStorageMock[key]
      }
    })
  },
}

Object.defineProperty(window, \'localStorage\', {
  value: localStorageMock,
})
```

## Mock Service Worker (MSW)

Configure mocks para APIs. Crie `src/test/mocks/handlers.ts`:

```typescript
import { http, HttpResponse } from \'msw\'

export const handlers = [
  // Mock de API de usuário
  http.get(\'/api/user\', () => {
    return HttpResponse.json({
      id: \'1\',
      name: \'João Silva\',
      email: \'joao@exemplo.com\',
    })
  }),

  // Mock de API de posts
  http.get(\'/api/posts\', () => {
    return HttpResponse.json([
      {
        id: \'1\',
        title: \'Primeiro Post\',
        content: \'Conteúdo do primeiro post\',
        author: \'João Silva\',
      },
      {
        id: \'2\',
        title: \'Segundo Post\',
        content: \'Conteúdo do segundo post\',
        author: \'Maria Santos\',
      },
    ])
  }),

  // Mock de erro
  http.get(\'/api/error\', () => {
    return new HttpResponse(null, { status: 500 })
  }),
]
```

Crie `src/test/mocks/server.ts`:

```typescript
import { setupServer } from \'msw/node\'
import { handlers } from \'./handlers\'

export const server = setupServer(...handlers)
```


## Utilitários de Teste

Crie `src/test/utils.tsx` com helpers para testes:

```typescript
import React, { ReactElement } from \'react\'
import { render, RenderOptions } from \'@testing-library/react\'
import { ThemeProvider } from \'../contexts/ThemeContext\'

// Provider customizado para testes
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

// Função de render customizada
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, \'wrapper\'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export tudo
export * from \'@testing-library/react\'
export { customRender as render }

// Helpers para testes de tema
export const mockDarkMode = () => {
  Object.defineProperty(window, \'matchMedia\', {
    writable: true,
    value: (query: string) => ({
      matches: query === \'(prefers-color-scheme: dark)\'
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  })
}

export const mockLightMode = () => {
  Object.defineProperty(window, \'matchMedia\', {
    writable: true,
    value: (query: string) => ({
      matches: query === \'(prefers-color-scheme: light)\'
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  })
}
```


