---
title: Configurações Complementares
order: 2
description: Configurações adicionais para ESLint, Prettier, fontes, ícones e animações.
tags: [configuracao, eslint, prettier, fontes, icones, animacoes]
---

# Configurações Complementares

## ESLint e Prettier

Configure ferramentas de qualidade de código. Instale as dependências:

```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint-plugin-react eslint-plugin-react-hooks
```

Crie `.eslintrc.json`:

```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["@typescript-eslint", "react", "react-hooks", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

Crie `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## Configuração de Fontes

Para uma tipografia profissional, configure fontes customizadas. No `tailwind.config.js`:

```javascript
import { fontFamily } from \'tailwindcss/defaultTheme\'

export default {
  // ... outras configurações
  theme: {
    extend: {
      fontFamily: {
        sans: [\'Inter\', ...fontFamily.sans],
        mono: [\'JetBrains Mono\', ...fontFamily.mono],
        display: [\'Poppins\', ...fontFamily.sans],
      },
    },
  },
}
```

No HTML (index.html para Vite ou layout.tsx para Next.js), adicione as fontes:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Configuração de Ícones

Instale uma biblioteca de ícones consistente:

```bash
npm install lucide-react
```

Crie um componente wrapper para ícones em `components/ui/Icon.tsx`:

```typescript
import { LucideIcon } from \'lucide-react\'
import { cn } from \'../../lib/utils\'

interface IconProps {
  icon: LucideIcon
  size?: \'sm\' | \'md\' | \'lg\' | \'xl\'
  className?: string
}

const sizeClasses = {
  sm: \'w-4 h-4\',
  md: \'w-5 h-5\',
  lg: \'w-6 h-6\',
  xl: \'w-8 h-8\',
}

export function Icon({ icon: IconComponent, size = \'md\', className }: IconProps) {
  return (
    <IconComponent 
      className={cn(
        sizeClasses[size],
        className
      )} 
    />
  )
}
```

## Configuração de Animações

Adicione animações customizadas ao `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      animation: {
        \'fade-in\': \'fadeIn 0.5s ease-in-out\',
        \'fade-out\': \'fadeOut 0.5s ease-in-out\',
        \'slide-in-right\': \'slideInRight 0.3s ease-out\',
        \'slide-in-left\': \'slideInLeft 0.3s ease-out\',
        \'slide-up\': \'slideUp 0.3s ease-out\',
        \'slide-down\': \'slideDown 0.3s ease-out\',
        \'scale-in\': \'scaleIn 0.2s ease-out\',
        \'bounce-subtle\': \'bounceSubtle 0.6s ease-in-out\',
        \'pulse-subtle\': \'pulseSubtle 2s ease-in-out infinite\',
      },
      keyframes: {
        fadeIn: {
          \'0%\': { opacity: \'0\' },
          \'100%\': { opacity: \'1\' },
        },
        fadeOut: {
          \'0%\': { opacity: \'1\' },
          \'100%\': { opacity: \'0\' },
        },
        slideInRight: {
          \'0%\': { transform: \'translateX(100%)\, opacity: \'0\' },
          \'100%\': { transform: \'translateX(0)\, opacity: \'1\' },
        },
        slideInLeft: {
          \'0%\': { transform: \'translateX(-100%)\, opacity: \'0\' },
          \'100%\': { transform: \'translateX(0)\, opacity: \'1\' },
        },
        slideUp: {
          \'0%\': { transform: \'translateY(10px)\, opacity: \'0\' },
          \'100%\': { transform: \'translateY(0)\, opacity: \'1\' },
        },
        slideDown: {
          \'0%\': { transform: \'translateY(-10px)\, opacity: \'0\' },
          \'100%\': { transform: \'translateY(0)\, opacity: \'1\' },
        },
        scaleIn: {
          \'0%\': { transform: \'scale(0.95)\, opacity: \'0\' },
          \'100%\': { transform: \'scale(1)\, opacity: \'1\' },
        },
        bounceSubtle: {
          \'0%, 100%\': { transform: \'translateY(0)\' },
          \'50%\': { transform: \'translateY(-5px)\' },
        },
        pulseSubtle: {
          \'0%, 100%\': { opacity: \'1\' },
          \'50%\': { opacity: \'0.7\' },
        },
      },
    },
  },
}
```


