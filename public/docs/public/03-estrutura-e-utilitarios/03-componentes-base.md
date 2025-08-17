---
title: Componentes Base
order: 3
description: Exemplos de componentes reutilizáveis como Button, Input, Card e Modal.
tags: [componentes, ui, design-system]
---

# Componentes Base

## Sistema de Design Consistente

Para manter consistência visual e facilitar a manutenção, é essencial criar um conjunto de componentes base reutilizáveis. Estes componentes seguem as cores semânticas definidas anteriormente e incluem variações para diferentes estados e tamanhos.

## Componente Button (components/ui/Button.tsx)

```typescript
import React, { forwardRef } from \'react\'
import { cn } from \'../../lib/utils\'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: \'primary\' | \'secondary\' | \'outline\' | \'ghost\' | \'destructive\'
  size?: \'sm\' | \'md\' | \'lg\'
  loading?: boolean
  children: React.ReactNode
}

const buttonVariants = {
  primary: \'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary\',
  secondary: \'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary\',
  outline: \'border border-border bg-background hover:bg-muted text-foreground focus:ring-ring\',
  ghost: \'hover:bg-muted text-foreground focus:ring-ring\',
  destructive: \'bg-error text-error-foreground hover:bg-error/90 focus:ring-error\',
}

const buttonSizes = {
  sm: \'px-3 py-1.5 text-sm\',
  md: \'px-4 py-2 text-base\',
  lg: \'px-6 py-3 text-lg\',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = \'primary\', size = \'md\', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          \'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200\',
          \'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background\',
          \'disabled:opacity-50 disabled:cursor-not-allowed\',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className=\"animate-spin -ml-1 mr-2 h-4 w-4\"
            xmlns=\"http://www.w3.org/2000/svg\"
            fill=\"none\"
            viewBox=\"0 0 24 24\"
          >
            <circle
              className=\"opacity-25\"
              cx=\"12\"
              cy=\"12\"
              r=\"10\"
              stroke=\"currentColor\"
              strokeWidth=\"4\"
            />
            <path
              className=\"opacity-75\"
              fill=\"currentColor\"
              d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = \'Button\'
```

## Componente Input (components/ui/Input.tsx)

```typescript
import React, { forwardRef } from \'react\'
import { cn } from \'../../lib/utils\'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className=\"space-y-2\">
        {label && (
          <label
            htmlFor={inputId}
            className=\"block text-sm font-medium text-foreground\"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            \'flex w-full rounded-md border border-border bg-input px-3 py-2\',
            \'text-sm text-foreground placeholder:text-muted-foreground\',
            \'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background\',
            \'disabled:cursor-not-allowed disabled:opacity-50\',
            error && \'border-error focus:ring-error\',
            className
          )}
          {...props}
        />
        {error && (
          <p className=\"text-sm text-error\">{error}</p>
        )}
        {helperText && !error && (
          <p className=\"text-sm text-muted-foreground\">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = \'Input\'
```

## Componente Card (components/ui/Card.tsx)

```typescript
import React from \'react\'
import { cn } from \'../../lib/utils\'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        \'rounded-lg border border-border bg-background shadow-custom-sm\',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(\'flex flex-col space-y-1.5 p-6\', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn(\'p-6 pt-0\', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(\'flex items-center p-6 pt-0\', className)}
      {...props}
    >
      {children}
    </div>
  )
}
```

## Componente Modal (components/ui/Modal.tsx)

```typescript
import React, { useEffect } from \'react\'
import { cn } from \'../../lib/utils\'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: \'sm\' | \'md\' | \'lg\' | \'xl\'
}

const modalSizes = {
  sm: \'max-w-md\',
  md: \'max-w-lg\',
  lg: \'max-w-2xl\',
  xl: \'max-w-4xl\',
}

export function Modal({ isOpen, onClose, title, children, size = \'md\' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === \'Escape\') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener(\'keydown\', handleEscape)
      document.body.style.overflow = \'hidden\'
    }

    return () => {
      document.removeEventListener(\'keydown\', handleEscape)
      document.body.style.overflow = \'unset\'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className=\"fixed inset-0 z-50 flex items-center justify-center\">
      {/* Backdrop */}
      <div
        className=\"absolute inset-0 bg-black/50 backdrop-blur-sm\"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={cn(
          \'relative w-full mx-4 bg-background rounded-lg shadow-custom-lg animate-scale-in\',
          modalSizes[size]
        )}
      >
        {/* Header */}
        {title && (
          <div className=\"flex items-center justify-between p-6 border-b border-border\">
            <h2 className=\"text-lg font-semibold text-foreground\">{title}</h2>
            <button
              onClick={onClose}
              className=\"text-muted-foreground hover:text-foreground transition-colors\"
            >
              <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M6 18L18 6M6 6l12 12\" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className=\"p-6\">
          {children}
        </div>
      </div>
    </div>
  )
}
```

## Hook useLocalStorage (hooks/useLocalStorage.ts)

```typescript
import { useState, useEffect } from \'react\'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === \'undefined\') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key \"${key}\":`, error)
      return initialValue
    }
  })

  // Função para definir o valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== \'undefined\') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key \"${key}\":`, error)
    }
  }

  return [storedValue, setValue] as const
}
```

## Hook useDebounce (hooks/useDebounce.ts)

```typescript
import { useState, useEffect } from \'react\'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```


