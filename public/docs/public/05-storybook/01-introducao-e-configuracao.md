---
title: Introdução e Configuração do Storybook
order: 1
description: Guia para instalar e configurar o Storybook para documentação de componentes.
tags: [storybook, documentacao, componentes, ui]
---

## Introdução ao Storybook

O Storybook é uma ferramenta fundamental para desenvolvimento de componentes isolados e criação de documentação interativa. Ele permite visualizar, testar e documentar componentes fora do contexto da aplicação principal, facilitando o desenvolvimento de design systems e a colaboração entre desenvolvedores e designers.

## Instalação e Configuração Inicial

Instale o Storybook no seu projeto:

```bash
npx storybook@latest init
```

O comando acima detecta automaticamente seu framework (React + Vite/Next.js) e configura o Storybook adequadamente. Após a instalação, você terá:

- Pasta `.storybook/` com configurações
- Pasta `src/stories/` com exemplos
- Scripts no `package.json`

## Configuração Principal (.storybook/main.ts)

```typescript
import type { StorybookConfig } from \'@storybook/react-vite\'
import { mergeConfig } from \'vite\'

const config: StorybookConfig = {
  stories: [\'../src/**/*.stories.@(js|jsx|ts|tsx|mdx)\'],
  addons: [
    \'@storybook/addon-links\',
    \'@storybook/addon-essentials\',
    \'@storybook/addon-interactions\',
    \'@storybook/addon-a11y\',
    \'@storybook/addon-docs\',
    \'@storybook/addon-controls\',
    \'@storybook/addon-viewport\',
  ],
  framework: {
    name: \'@storybook/react-vite\',
    options: {},
  },
  docs: {
    autodocs: \'tag\',
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          \'@\': \'/src\',
        },
      },
    })
  },
}

export default config
```

## Configuração de Preview (.storybook/preview.ts)

```typescript
import type { Preview } from \'@storybook/react\'
import { ThemeProvider } from \'../src/contexts/ThemeContext\'
import \'../src/styles/globals.css\'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: \'^on[A-Z].*\' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    viewport: {
      viewports: {
        mobile: {
          name: \'Mobile\',
          styles: {
            width: \'375px\',
            height: \'667px\',
          },
        },
        tablet: {
          name: \'Tablet\',
          styles: {
            width: \'768px\',
            height: \'1024px\',
          },
        },
        desktop: {
          name: \'Desktop\',
          styles: {
            width: \'1200px\',
            height: \'800px\',
          },
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className=\"min-h-screen bg-background text-foreground p-4\">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    theme: {
      description: \'Global theme for components\',
      defaultValue: \'light\',
      toolbar: {
        title: \'Theme\',
        icon: \'circlehollow\',
        items: [
          { value: \'light\', icon: \'sun\', title: \'Light\' },
          { value: \'dark\', icon: \'moon\', title: \'Dark\' },
          { value: \'system\', icon: \'browser\', title: \'System\' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
}

export default preview
```

## Configuração de Tema no Storybook

Crie `.storybook/withTheme.decorator.tsx`:

```typescript
import React, { useEffect } from \'react\'
import type { Decorator } from \'@storybook/react\'

export const withTheme: Decorator = (Story, context) => {
  const { theme } = context.globals

  useEffect(() => {
    const htmlElement = document.documentElement
    
    // Remove classes existentes
    htmlElement.classList.remove(\'light\', \'dark\')
    
    if (theme === \'system\') {
      const systemTheme = window.matchMedia(\'(prefers-color-scheme: dark)\').matches ? \'dark\' : \'light\'
      htmlElement.classList.add(systemTheme)
    } else {
      htmlElement.classList.add(theme)
    }
  }, [theme])

  return <Story />
}
```

Atualize o `.storybook/preview.ts` para incluir o decorator:

```typescript
import { withTheme } from \'./withTheme.decorator\'

const preview: Preview = {
  // ... outras configurações
  decorators: [
    withTheme,
    (Story) => (
      <ThemeProvider>
        <div className=\"min-h-screen bg-background text-foreground p-4\">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}
```


