---
title: Sistema de Cores Reutilizável
order: 2
description: Detalhes sobre a filosofia e implementação de um sistema de cores semântico com Tailwind CSS.
tags: [cores, tailwind, design-system, theming]
---

## Filosofia do Sistema de Cores

Um sistema de cores bem estruturado é a base de qualquer design system eficiente. O objetivo é criar uma paleta que seja semanticamente clara, visualmente harmoniosa e facilmente escalável. Em vez de usar cores específicas como `blue-500` ou `red-600` diretamente nos componentes, utilizamos nomes semânticos que descrevem a função da cor no contexto da interface.

## Configuração Avançada do tailwind.config.js

Atualize seu `tailwind.config.js` com a seguinte configuração expandida:

```javascript
/** @type {import(\'tailwindcss\').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: \'class\',
  theme: {
    extend: {
      colors: {
        // Cores semânticas baseadas em variáveis CSS
        primary: {
          DEFAULT: \'rgb(var(--color-primary) / <alpha-value>)\,\n          foreground: \'rgb(var(--color-primary-foreground) / <alpha-value>)\,\n        },
        secondary: {
          DEFAULT: \'rgb(var(--color-secondary) / <alpha-value>)\,\n          foreground: \'rgb(var(--color-secondary-foreground) / <alpha-value>)\,\n        },
        background: \'rgb(var(--color-background) / <alpha-value>)\,\n        foreground: \'rgb(var(--color-foreground) / <alpha-value>)\,\n        muted: {
          DEFAULT: \'rgb(var(--color-muted) / <alpha-value>)\,\n          foreground: \'rgb(var(--color-muted-foreground) / <alpha-value>)\,\n        },
        border: \'rgb(var(--color-border) / <alpha-value>)\,\n        input: \'rgb(var(--color-input) / <alpha-value>)\,\n        ring: \'rgb(var(--color-ring) / <alpha-value>)\,\n        
        // Cores de estado (sucesso, erro, aviso, info)
        success: {
          DEFAULT: \'rgb(34 197 94 / <alpha-value>)\, // green-500
          foreground: \'rgb(255 255 255 / <alpha-value>)\,\n          muted: \'rgb(240 253 244 / <alpha-value>)\, // green-50
        },
        error: {
          DEFAULT: \'rgb(239 68 68 / <alpha-value>)\, // red-500
          foreground: \'rgb(255 255 255 / <alpha-value>)\,\n          muted: \'rgb(254 242 242 / <alpha-value>)\, // red-50
        },
        warning: {
          DEFAULT: \'rgb(245 158 11 / <alpha-value>)\, // amber-500
          foreground: \'rgb(255 255 255 / <alpha-value>)\,\n          muted: \'rgb(255 251 235 / <alpha-value>)\, // amber-50
        },
        info: {
          DEFAULT: \'rgb(59 130 246 / <alpha-value>)\, // blue-500
          foreground: \'rgb(255 255 255 / <alpha-value>)\,\n          muted: \'rgb(239 246 255 / <alpha-value>)\, // blue-50
        },
      },
      
      // Espaçamentos customizados
      spacing: {
        \'18\': \'4.5rem\',
        \'88\': \'22rem\',
      },
      
      // Tipografia customizada
      fontFamily: {
        sans: [\'Inter\', \'system-ui\', \'sans-serif\'],
        mono: [\'JetBrains Mono\', \'monospace\'],
      },
      
      // Animações customizadas
      animation: {
        \'fade-in\': \'fadeIn 0.5s ease-in-out\',
        \'slide-up\': \'slideUp 0.3s ease-out\',
        \'bounce-subtle\': \'bounceSubtle 0.6s ease-in-out\',
      },
      
      keyframes: {
        fadeIn: {
          \'0%\': { opacity: \'0\' },
          \'100%\': { opacity: \'1\' },
        },
        slideUp: {
          \'0%\': { transform: \'translateY(10px)\, opacity: \'0\' },
          \'100%\': { transform: \'translateY(0)\, opacity: \'1\' },
        },
        bounceSubtle: {
          \'0%, 100%\': { transform: \'translateY(0)\' },
          \'50%\': { transform: \'translateY(-5px)\' },
        },
      },
    },
  },
  plugins: [],
}
```

## Variáveis CSS Expandidas

Atualize seu arquivo CSS com variáveis mais abrangentes:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Cores principais */
  --color-primary: 59 130 246; /* blue-500 */
  --color-primary-foreground: 255 255 255;
  --color-secondary: 156 163 175; /* gray-400 */
  --color-secondary-foreground: 17 24 39;
  
  /* Cores de fundo e texto */
  --color-background: 255 255 255;
  --color-foreground: 17 24 39;
  --color-muted: 243 244 246;
  --color-muted-foreground: 107 114 128;
  
  /* Cores de interface */
  --color-border: 229 231 235;
  --color-input: 255 255 255;
  --color-ring: 59 130 246;
  
  /* Cores de estado no tema claro */
  --color-success: 34 197 94;
  --color-success-muted: 240 253 244;
  --color-error: 239 68 68;
  --color-error-muted: 254 242 242;
  --color-warning: 245 158 11;
  --color-warning-muted: 255 251 235;
  --color-info: 59 130 246;
  --color-info-muted: 239 246 255;
  
  /* Sombras customizadas */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.dark {
  /* Cores principais no tema escuro */
  --color-primary: 59 130 246;
  --color-primary-foreground: 255 255 255;
  --color-secondary: 75 85 99;
  --color-secondary-foreground: 243 244 246;
  
  /* Cores de fundo e texto no tema escuro */
  --color-background: 17 24 39;
  --color-foreground: 243 244 246;
  --color-muted: 31 41 55;
  --color-muted-foreground: 156 163 175;
  
  /* Cores de interface no tema escuro */
  --color-border: 55 65 81;
  --color-input: 31 41 55;
  --color-ring: 59 130 246;
  
  /* Cores de estado no tema escuro */
  --color-success: 34 197 94;
  --color-success-muted: 20 83 45;
  --color-error: 239 68 68;
  --color-error-muted: 127 29 29;
  --color-warning: 245 158 11;
  --color-warning-muted: 146 64 14;
  --color-info: 59 130 246;
  --color-info-muted: 30 58 138;
  
  /* Sombras no tema escuro */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3);
}

/* Estilos base */
* {
  transition: background-color 0.2s ease-in-out, 
              color 0.2s ease-in-out, 
              border-color 0.2s ease-in-out,
              box-shadow 0.2s ease-in-out;
}

body {
  @apply bg-background text-foreground;
  font-feature-settings: "rlig" 1, "calt" 1;
}

/* Classes utilitárias customizadas */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .shadow-custom-sm {
    box-shadow: var(--shadow-sm);
  }
  
  .shadow-custom-md {
    box-shadow: var(--shadow-md);
  }
  
  .shadow-custom-lg {
    box-shadow: var(--shadow-lg);
  }
}

}

## Paleta de Cores Semântica

A estrutura de cores proposta segue uma hierarquia semântica clara:

| Categoria | Uso | Exemplo de Aplicação |
|-----------|-----|---------------------|
| **Primary** | Ações principais, links, botões CTA | Botões de submit, links ativos |
| **Secondary** | Ações secundárias, elementos de apoio | Botões de cancelar, texto auxiliar |
| **Background** | Fundo principal da aplicação | Body, containers principais |
| **Foreground** | Texto principal | Títulos, parágrafos, labels |
| **Muted** | Elementos discretos, backgrounds secundários | Cards, sidebars, texto secundário |
| **Border** | Bordas e divisores | Inputs, cards, separadores |
| **Success** | Feedback positivo | Mensagens de sucesso, ícones de confirmação |
| **Error** | Feedback de erro | Mensagens de erro, validações |
| **Warning** | Avisos e alertas | Notificações de atenção |
| **Info** | Informações neutras | Tooltips, mensagens informativas |

## Vantagens do Sistema Proposto

1. **Consistência**: Todas as cores são definidas centralmente e aplicadas semanticamente
2. **Manutenibilidade**: Mudanças de tema requerem apenas alteração das variáveis CSS
3. **Acessibilidade**: Contraste adequado é mantido automaticamente entre temas
4. **Escalabilidade**: Novas cores podem ser facilmente adicionadas seguindo o padrão
5. **Performance**: Transições suaves entre temas sem re-renderização desnecessária

Este sistema permite que você use classes como `bg-primary`, `text-foreground`, `border-muted` em seus componentes, sabendo que elas se adaptarão automaticamente aos diferentes temas [3].


