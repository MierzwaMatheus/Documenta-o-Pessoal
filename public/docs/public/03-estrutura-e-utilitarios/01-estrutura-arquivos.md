---
title: Estrutura de Arquivos Recomendada
order: 1
description: Organização de pastas e arquivos para projetos React/Next.js com Tailwind CSS.
tags: [estrutura, arquivos, organização]
---

# Estrutura de Arquivos Recomendada

## Organização do Projeto

Uma estrutura de arquivos bem organizada é fundamental para a manutenibilidade e escalabilidade do projeto. A seguir está a estrutura recomendada que funciona tanto para Vite quanto para Next.js:

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (Button, Input, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts     # Barrel exports
│   ├── layout/          # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── forms/           # Componentes de formulário
│   │   ├── ContactForm.tsx
│   │   └── LoginForm.tsx
│   └── ThemeToggle.tsx  # Componente de alternância de tema
├── contexts/            # React Contexts
│   ├── ThemeContext.tsx
│   └── AuthContext.tsx
├── hooks/               # Custom hooks
│   ├── useTheme.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── lib/                 # Utilitários e configurações
│   ├── utils.ts         # Funções utilitárias
│   ├── constants.ts     # Constantes da aplicação
│   └── api.ts          # Configurações de API
├── styles/              # Arquivos de estilo
│   ├── globals.css      # Estilos globais e variáveis CSS
│   └── components.css   # Estilos específicos de componentes
├── types/               # Definições de tipos TypeScript
│   ├── index.ts
│   └── api.ts
└── pages/ ou app/       # Páginas (dependendo do framework)
```

## Arquivo de Utilitários (lib/utils.ts)

Crie um arquivo de utilitários para funções comuns:

```typescript
import { type ClassValue, clsx } from \'clsx\'
import { twMerge } from \'tailwind-merge\'

/**
 * Combina classes CSS de forma inteligente, resolvendo conflitos do Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata texto para capitalizar primeira letra
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Gera um ID único simples
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Debounce function para otimizar performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Formata números para moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(\'pt-BR\', {
    style: \'currency\',
    currency: \'BRL\',
  }).format(value)
}

/**
 * Valida email usando regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  return emailRegex.test(email)
}
```

## Constantes da Aplicação (lib/constants.ts)

```typescript
export const APP_CONFIG = {
  name: \'Meu App\',
  description: \'Descrição da aplicação\',
  version: \'1.0.0\',
  author: \'Seu Nome\',
} as const

export const ROUTES = {
  home: \'\/',
  about: \'\/sobre\',
  contact: \'\/contato\',
  login: \'\/login\',
  dashboard: \'\/dashboard\',
} as const

export const THEME_STORAGE_KEY = \'theme-preference\'

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  \'2xl\': 1536,
} as const

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const
```

## Barrel Exports (components/ui/index.ts)

Para facilitar as importações, use barrel exports:

```typescript
export { Button } from \'./Button\'
export { Input } from \'./Input\'
export { Card } from \'./Card\'
export { ThemeToggle } from \'../ThemeToggle\'
```


