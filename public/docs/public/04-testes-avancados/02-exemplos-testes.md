---
title: Exemplos de Testes
order: 2
description: Exemplos práticos de testes unitários para componentes e hooks, e testes E2E com Playwright.
tags: [testes, unitarios, e2e, playwright]
---

## Exemplos de Testes

#### Teste de Componente Button

Crie `src/components/ui/__tests__/Button.test.tsx`:

```typescript
import { describe, it, expect, vi } from \'vitest\'
import { render, screen, fireEvent } from \'../../../test/utils\'
import { Button } from \'../Button\'

describe(\'Button\', () => {
  it(\'renderiza corretamente\', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByRole(\'button\', { name: /clique aqui/i })).toBeInTheDocument()
  })

  it(\'aplica variante primary por padrão\', () => {
    render(<Button>Botão</Button>)
    const button = screen.getByRole(\'button\')
    expect(button).toHaveClass(\'bg-primary\')
  })

  it(\'aplica variante secondary quando especificada\', () => {
    render(<Button variant=\"secondary\">Botão</Button>)
    const button = screen.getByRole(\'button\')
    expect(button).toHaveClass(\'bg-secondary\')
  })

  it(\'chama onClick quando clicado\', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clique</Button>)
    
    fireEvent.click(screen.getByRole(\'button\'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it(\'mostra loading spinner quando loading=true\', () => {
    render(<Button loading>Carregando</Button>)
    expect(screen.getByRole(\'button\')).toBeDisabled()
    // Verifica se o spinner está presente
    expect(document.querySelector(\'\.animate-spin\')).toBeInTheDocument()
  })

  it(\'fica desabilitado quando disabled=true\', () => {
    render(<Button disabled>Desabilitado</Button>)
    expect(screen.getByRole(\'button\')).toBeDisabled()
  })
})
```

#### Teste do Hook useTheme

Crie `src/hooks/__tests__/useTheme.test.tsx`:

```typescript
import { describe, it, expect, beforeEach } from \'vitest\'
import { renderHook, act } from \'@testing-library/react\'
import { useTheme } from \'../useTheme\'
import { mockDarkMode, mockLightMode } from \'../../test/utils\'

describe(\'useTheme\', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = \'\'
  })

  it(\'inicia com tema system por padrão\', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe(\'system\')
  })

  it(\'aplica tema light quando setTheme(\"light\") é chamado\', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme(\'light\')
    })
    
    expect(result.current.theme).toBe(\'light\')
    expect(document.documentElement).toHaveClass(\'light\')
    expect(localStorage.getItem(\'theme\')).toBe(\'light\')
  })

  it(\'aplica tema dark quando setTheme(\"dark\") é chamado\', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme(\'dark\')
    })
    
    expect(result.current.theme).toBe(\'dark\')
    expect(document.documentElement).toHaveClass(\'dark\')
    expect(localStorage.getItem(\'theme\')).toBe(\'dark\')
  })

  it(\'detecta preferência do sistema quando tema é system\', () => {
    mockDarkMode()
    const { result } = renderHook(() => useTheme())
    
    expect(result.current.isDark).toBe(true)
    expect(document.documentElement).toHaveClass(\'dark\')
  })

  it(\'restaura tema do localStorage\', () => {
    localStorage.setItem(\'theme\', \'dark\')
    const { result } = renderHook(() => useTheme())
    
    expect(result.current.theme).toBe(\'dark\')
  })
})
```


