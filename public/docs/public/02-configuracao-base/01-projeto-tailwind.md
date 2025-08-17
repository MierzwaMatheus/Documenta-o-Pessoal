---
title: Configuração Base do Projeto e Tailwind
order: 1
description: Detalhes sobre a criação do projeto React/Next.js e a configuração inicial do Tailwind CSS.
tags: [configuracao, tailwind, react, nextjs, vite]
---

## Criação do Projeto

Para projetos com **Vite + React**:

```bash
npm create vite@latest meu-projeto -- --template react-ts
cd meu-projeto
npm install
```

Para projetos com **Next.js**:

```bash
npx create-next-app@latest meu-projeto --typescript --tailwind --eslint --app
cd meu-projeto
```

## Instalação e Configuração do Tailwind CSS

Se você estiver usando Vite (Next.js já vem com Tailwind pré-configurado):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Configuração Inicial do tailwind.config.js

A configuração base do Tailwind deve ser estruturada para suportar temas personalizados e um sistema de cores escalável. Aqui está a configuração inicial recomendada:

```javascript
/** @type {import(\'tailwindcss\').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilita modo escuro via classe
  theme: {
    extend: {
      // Configurações personalizadas serão adicionadas aqui
    },
  },
  plugins: [],
}
```

A configuração `darkMode: 'class'` é fundamental pois permite controle programático sobre o tema, ao contrário da opção `'media'` que depende apenas das preferências do sistema operacional [1].

## Estrutura CSS Base

Crie ou atualize o arquivo `src/index.css` (ou `src/app/globals.css` no Next.js) com a estrutura base:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variáveis CSS customizadas para temas */
:root {
  /* Cores do tema claro */
  --color-primary: 59 130 246; /* blue-500 */
  --color-primary-foreground: 255 255 255; /* white */
  --color-secondary: 156 163 175; /* gray-400 */
  --color-secondary-foreground: 17 24 39; /* gray-900 */
  --color-background: 255 255 255; /* white */
  --color-foreground: 17 24 39; /* gray-900 */
  --color-muted: 243 244 246; /* gray-100 */
  --color-muted-foreground: 107 114 128; /* gray-500 */
  --color-border: 229 231 235; /* gray-200 */
  --color-input: 255 255 255; /* white */
  --color-ring: 59 130 246; /* blue-500 */
}

.dark {
  /* Cores do tema escuro */
  --color-primary: 59 130 246; /* blue-500 */
  --color-primary-foreground: 255 255 255; /* white */
  --color-secondary: 75 85 99; /* gray-600 */
  --color-secondary-foreground: 243 244 246; /* gray-100 */
  --color-background: 17 24 39; /* gray-900 */
  --color-foreground: 243 244 246; /* gray-100 */
  --color-muted: 31 41 55; /* gray-800 */
  --color-muted-foreground: 156 163 175; /* gray-400 */
  --color-border: 55 65 81; /* gray-700 */
  --color-input: 31 41 55; /* gray-800 */
  --color-ring: 59 130 246; /* blue-500 */
}

/* Estilos base para transições suaves */
* {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

/* Reset e estilos base */
body {
  @apply bg-background text-foreground;
  font-feature-settings: "rlig" 1, "calt" 1;
}


