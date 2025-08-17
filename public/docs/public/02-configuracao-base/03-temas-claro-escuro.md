---
title: Configuração de Temas Claro/Escuro
order: 3
description: Guia detalhado para implementar temas claro e escuro em projetos React com Tailwind CSS.
tags: [temas, dark-mode, light-mode, react, tailwind]
---

## Hook Personalizado para Gerenciamento de Tema

Crie um hook customizado para gerenciar o estado do tema de forma eficiente. Crie o arquivo `src/hooks/useTheme.ts`:

```typescript
import { useEffect, useState } from \'react\'

type Theme = \'light\' | \'dark\' | \'system\'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Recupera o tema salvo no localStorage ou usa \'system\' como padrão
    if (typeof window !== \'undefined\') {
      return (localStorage.getItem(\'theme\') as Theme) || \'system\'
    }
    return \'system\'
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove classes de tema existentes
    root.classList.remove(\'light\', \'dark\')

    if (theme === \'system\') {
      // Usa a preferência do sistema
      const systemTheme = window.matchMedia(\'(prefers-color-scheme: dark)\').matches
        ? \'dark\'
        : \'light\'
      root.classList.add(systemTheme)
    } else {
      // Usa o tema selecionado
      root.classList.add(theme)
    }

    // Salva a preferência no localStorage
    localStorage.setItem(\'theme\', theme)
  }, [theme])

  // Escuta mudanças na preferência do sistema quando tema está em \'system\'
  useEffect(() => {
    if (theme === \'system\') {
      const mediaQuery = window.matchMedia(\'(prefers-color-scheme: dark)\')
      
      const handleChange = () => {
        const root = window.document.documentElement
        root.classList.remove(\'light\', \'dark\')
        root.classList.add(mediaQuery.matches ? \'dark\' : \'light\')
      }

      mediaQuery.addEventListener(\'change\', handleChange)
      return () => mediaQuery.removeEventListener(\'change\', handleChange)
    }
  }, [theme])

  return {
    theme,
    setTheme,
    // Função utilitária para verificar se está no modo escuro
    isDark: theme === \'dark\' || (theme === \'system\' && 
      window.matchMedia(\'(prefers-color-scheme: dark)\').matches),
  }
}
```

## Context Provider para Tema

Para disponibilizar o tema globalmente na aplicação, crie um Context Provider em `src/contexts/ThemeContext.tsx`:

```typescript
import React, { createContext, useContext, ReactNode } from \'react\'
import { useTheme } from \'../hooks/useTheme\'

type Theme = \'light\' | \'dark\' | \'system\'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeData = useTheme()

  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(\'useThemeContext must be used within a ThemeProvider\')
  }
  return context
}
```

## Componente Toggle de Tema

Crie um componente reutilizável para alternar entre temas em `src/components/ThemeToggle.tsx`:

```typescript
import React from \'react\'
import { useThemeContext } from \'../contexts/ThemeContext\'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = \'\' }: ThemeToggleProps) {
  const { theme, setTheme, isDark } = useThemeContext()

  const toggleTheme = () => {
    if (theme === \'light\') {
      setTheme(\'dark\')
    } else if (theme === \'dark\') {
      setTheme(\'system\')
    } else {
      setTheme(\'light\')
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case \'light\':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} 
                  d=\"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z\" />
          </svg>
        )
      case \'dark\':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} 
                  d=\"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z\" />
          </svg>
        )
      case \'system\':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} 
                  d=\"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" />
          </svg>
        )
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case \'light\': return \'Claro\'
      case \'dark\': return \'Escuro\'
      case \'system\': return \'Sistema\'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-md
        bg-muted hover:bg-muted/80 
        text-muted-foreground hover:text-foreground
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        ${className}
      `}
      title={`Tema atual: ${getThemeLabel()}. Clique para alternar.`}
    >
      {getThemeIcon()}
      <span className=\"text-sm font-medium\">{getThemeLabel()}</span>
    </button>
  )
}
```

## Configuração no App Principal

Para Vite + React, atualize seu `src/App.tsx`:

```typescript
import React from \'react\'
import { ThemeProvider } from \'./contexts/ThemeContext\'
import { ThemeToggle } from \'./components/ThemeToggle\'

function App() {
  return (
    <ThemeProvider>
      <div className=\"min-h-screen bg-background text-foreground\">
        <header className=\"border-b border-border\">
          <div className=\"container mx-auto px-4 py-4 flex justify-between items-center\">
            <h1 className=\"text-2xl font-bold text-primary\">Meu App</h1>
            <ThemeToggle />
          </div>
        </header>
        
        <main className=\"container mx-auto px-4 py-8\">
          <div className=\"max-w-4xl mx-auto\">
            <h2 className=\"text-3xl font-bold mb-6\">Bem-vindo!</h2>
            <p className=\"text-muted-foreground mb-4\">
              Este é um exemplo de aplicação com tema claro/escuro configurado.
            </p>
            
            {/* Exemplo de card com cores semânticas */}
            <div className=\"bg-muted rounded-lg p-6 mb-6\">
              <h3 className=\"text-xl font-semibold mb-3\">Card de Exemplo</h3>
              <p className=\"text-muted-foreground mb-4\">
                Este card demonstra o uso das cores semânticas do sistema.
              </p>
              <div className=\"flex gap-2\">
                <button className=\"bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90\">
                  Primário
                </button>
                <button className=\"bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90\">
                  Secundário
                </button>
              </div>
            </div>
            
            {/* Exemplo de estados */}
            <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4\">
              <div className=\"bg-success/10 border border-success/20 rounded-lg p-4\">
                <div className=\"text-success font-semibold\">Sucesso</div>
                <div className=\"text-sm text-muted-foreground\">Operação concluída</div>
              </div>
              <div className=\"bg-error/10 border border-error/20 rounded-lg p-4\">
                <div className=\"text-error font-semibold\">Erro</div>
                <div className=\"text-sm text-muted-foreground\">Algo deu errado</div>
              </div>
              <div className=\"bg-warning/10 border border-warning/20 rounded-lg p-4\">
                <div className=\"text-warning font-semibold\">Aviso</div>
                <div className=\"text-sm text-muted-foreground\">Atenção necessária</div>
              </div>
              <div className=\"bg-info/10 border border-info/20 rounded-lg p-4\">
                <div className=\"text-info font-semibold\">Info</div>
                <div className=\"text-sm text-muted-foreground\">Informação útil</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
```

Para Next.js, atualize seu `src/app/layout.tsx`:

```typescript
import type { Metadata } from \'next\'
import { Inter } from \'next/font/google\'
import \'./globals.css\'
import { ThemeProvider } from \'./contexts/ThemeContext\'

const inter = Inter({ subsets: [\'latin\'] })

export const metadata: Metadata = {
  title: \'Meu App\',
  description: \'Aplicação com tema claro/escuro\',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang=\"pt-BR\" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Persistência e Hidratação

O sistema proposto inclui várias funcionalidades avançadas:

1. **Persistência**: O tema selecionado é salvo no localStorage e restaurado na próxima visita
2. **Detecção do Sistema**: Opção \'system\' que respeita a preferência do sistema operacional
3. **Hidratação Segura**: Uso de `suppressHydrationWarning` no Next.js para evitar problemas de hidratação
4. **Transições Suaves**: Animações CSS para mudanças de tema sem flickering
5. **Acessibilidade**: Suporte a focus states e labels descritivos

## Testando o Sistema

Para verificar se tudo está funcionando corretamente:

1. **Teste Manual**: Clique no botão de alternância e observe as mudanças
2. **Teste de Persistência**: Recarregue a página e verifique se o tema é mantido
3. **Teste do Sistema**: Mude a preferência do sistema e observe o comportamento no modo \'system\'
4. **Teste de Acessibilidade**: Use Tab para navegar e verifique os focus states

Este sistema de temas oferece uma experiência robusta e profissional, seguindo as melhores práticas da comunidade React e Tailwind CSS [4].


