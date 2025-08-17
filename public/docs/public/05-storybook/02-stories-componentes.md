---
title: Stories dos Componentes Base
order: 2
description: Exemplos de como criar stories para os componentes Button, Input e ThemeToggle no Storybook.
tags: [storybook, componentes, stories, button, input, themetoggle]
---

# Stories dos Componentes Base

## Stories dos Componentes Base

#### Story do Button (src/components/ui/Button.stories.tsx)

```typescript
import type { Meta, StoryObj } from \'@storybook/react\'
import { fn } from \'@storybook/test\'
import { Button } from \'./Button\'

const meta = {
  title: \'UI/Button\',
  component: Button,
  parameters: {
    layout: \'centered\',
    docs: {
      description: {
        component: \'Componente de botão reutilizável com múltiplas variantes e estados.\',
      },
    },
  },
  tags: [\'autodocs\'],
  argTypes: {
    variant: {
      control: { type: \'select\' },
      options: [\'primary\', \'secondary\', \'outline\', \'ghost\', \'destructive\'],
      description: \'Variante visual do botão\',
    },
    size: {
      control: { type: \'select\' },
      options: [\'sm\', \'md\', \'lg\'],
      description: \'Tamanho do botão\',
    },
    loading: {
      control: { type: \'boolean\' },
      description: \'Estado de carregamento\',
    },
    disabled: {
      control: { type: \'boolean\' },
      description: \'Estado desabilitado\',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: \'primary\',
    children: \'Botão Primário\',
  },
}

export const Secondary: Story = {
  args: {
    variant: \'secondary\',
    children: \'Botão Secundário\',
  },
}

export const Outline: Story = {
  args: {
    variant: \'outline\',
    children: \'Botão Outline\',
  },
}

export const Ghost: Story = {
  args: {
    variant: \'ghost\',
    children: \'Botão Ghost\',
  },
}

export const Destructive: Story = {
  args: {
    variant: \'destructive\',
    children: \'Botão Destrutivo\',
  },
}

export const Small: Story = {
  args: {
    size: \'sm\',
    children: \'Botão Pequeno\',
  },
}

export const Large: Story = {
  args: {
    size: \'lg\',
    children: \'Botão Grande\',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: \'Carregando...\',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: \'Botão Desabilitado\',
  },
}

// Story com múltiplas variantes
export const AllVariants: Story = {
  render: () => (
    <div className=\"flex flex-wrap gap-4\">
      <Button variant=\"primary\">Primary</Button>
      <Button variant=\"secondary\">Secondary</Button>
      <Button variant=\"outline\">Outline</Button>
      <Button variant=\"ghost\">Ghost</Button>
      <Button variant=\"destructive\">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: \'Todas as variantes do botão lado a lado para comparação.\',
      },
    },
  },
}

// Story com múltiplos tamanhos
export const AllSizes: Story = {
  render: () => (
    <div className=\"flex items-center gap-4\">
      <Button size=\"sm\">Pequeno</Button>
      <Button size=\"md\">Médio</Button>
      <Button size=\"lg\">Grande</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: \'Todos os tamanhos disponíveis do botão.\',
      },
    },
  },
}
```

#### Story do Input (src/components/ui/Input.stories.tsx)

```typescript
import type { Meta, StoryObj } from \'@storybook/react\'
import { Input } from \'./Input\'

const meta = {
  title: \'UI/Input\',
  component: Input,
  parameters: {
    layout: \'centered\',
    docs: {
      description: {
        component: \'Componente de input com suporte a labels, erros e texto de ajuda.\',
      },
    },
  },
  tags: [\'autodocs\'],
  argTypes: {
    type: {
      control: { type: \'select\' },
      options: [\'text\', \'email\', \'password\', \'number\', \'tel\', \'url\'],
    },
    disabled: {
      control: { type: \'boolean\' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: \'Digite algo...\',
  },
}

export const WithLabel: Story = {
  args: {
    label: \'Nome completo\',
    placeholder: \'Digite seu nome\',
  },
}

export const WithError: Story = {
  args: {
    label: \'Email\',
    placeholder: \'seu@email.com\',
    error: \'Email é obrigatório\',
    value: \'\',
  },
}

export const WithHelperText: Story = {
  args: {
    label: \'Senha\',
    type: \'password\',
    placeholder: \'Digite sua senha\',
    helperText: \'Mínimo 8 caracteres\',
  },
}

export const Disabled: Story = {
  args: {
    label: \'Campo desabilitado\',
    placeholder: \'Não editável\',
    disabled: true,
    value: \'Valor fixo\',
  },
}

export const FormExample: Story = {
  render: () => (
    <form className=\"space-y-4 w-80\">
      <Input
        label=\"Nome\"
        placeholder=\"Seu nome completo\"
      />
      <Input
        label=\"Email\"
        type=\"email\"
        placeholder=\"seu@email.com\"
      />
      <Input
        label=\"Senha\"
        type=\"password\"
        placeholder=\"Sua senha\"
        helperText=\"Mínimo 8 caracteres\"
      />
      <Input
        label=\"Confirmar senha\"
        type=\"password\"
        placeholder=\"Confirme sua senha\"
        error=\"Senhas não coincidem\"
      />
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: \'Exemplo de formulário usando múltiplos inputs.\',
      },
    },
  },
}
```

#### Story do ThemeToggle

```typescript
import type { Meta, StoryObj } from \'@storybook/react\'
import { ThemeToggle } from \'./ThemeToggle\'

const meta = {
  title: \'UI/ThemeToggle\',
  component: ThemeToggle,
  parameters: {
    layout: \'centered\',
    docs: {
      description: {
        component: \'Componente para alternar entre temas claro, escuro e sistema.\',
      },
    },
  },
  tags: [\'autodocs\'],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InHeader: Story = {
  render: () => (
    <header className=\"border-b border-border w-full\">
      <div className=\"container mx-auto px-4 py-4 flex justify-between items-center\">
        <h1 className=\"text-2xl font-bold text-primary\">Meu App</h1>
        <ThemeToggle />
      </div>
    </header>
  ),
  parameters: {
    layout: \'fullscreen\',
    docs: {
      description: {
        story: \'Exemplo de uso do ThemeToggle em um header.\',
      },
    },
  },
}
```


