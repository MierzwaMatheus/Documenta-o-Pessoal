---
title: Documentação e Benefícios do Storybook
order: 3
description: Como usar o Storybook para documentação automática e os benefícios de sua implementação.
tags: [storybook, documentacao, beneficios, ci/cd]
---

## Documentação Automática

Crie `src/stories/Introduction.mdx`:

```mdx
import { Meta } from \"@storybook/blocks\"

<Meta title=\"Introdução\" />

# Design System

Bem-vindo ao nosso design system! Este Storybook contém todos os componentes reutilizáveis do projeto.

## Componentes Disponíveis

### UI Base
- **Button**: Botões com múltiplas variantes
- **Input**: Campos de entrada com validação
- **Card**: Containers para conteúdo
- **Modal**: Diálogos e overlays

### Layout
- **ThemeToggle**: Alternador de temas

## Temas

O sistema suporta três temas:
- **Light**: Tema claro padrão
- **Dark**: Tema escuro
- **System**: Segue a preferência do sistema

Use o seletor de tema na toolbar para testar os componentes em diferentes temas.

## Cores Semânticas

O sistema usa cores semânticas que se adaptam automaticamente aos temas:

- `primary`: Cor principal da marca
- `secondary`: Cor secundária
- `background`: Fundo principal
- `foreground`: Texto principal
- `muted`: Elementos discretos
- `border`: Bordas e divisores
- `success`: Feedback positivo
- `error`: Feedback de erro
- `warning`: Avisos
- `info`: Informações neutras
```

## Scripts do Storybook

Adicione ao `package.json`:

```json
{
  \"scripts\": {
    \"storybook\": \"storybook dev -p 6006\",
    \"build-storybook\": \"storybook build\",
    \"test-storybook\": \"test-storybook\",
    \"chromatic\": \"chromatic --exit-zero-on-changes\"
  }
}
```

## Testes Visuais com Chromatic

Para testes de regressão visual, configure o Chromatic:

```bash
npm install -D chromatic
```

Crie `.github/workflows/chromatic.yml`:

```yaml
name: Chromatic

on: [push, pull_request]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - uses: actions/setup-node@v3
        with:
          node-version: \"18\"
          cache: \"npm\"
      
      - run: npm ci
      - run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## Benefícios do Storybook

1. **Desenvolvimento Isolado**: Desenvolva componentes sem depender da aplicação principal
2. **Documentação Viva**: Documentação sempre atualizada com exemplos interativos
3. **Testes Visuais**: Detecte mudanças visuais não intencionais
4. **Colaboração**: Facilita comunicação entre desenvolvedores e designers
5. **Acessibilidade**: Addon a11y ajuda a identificar problemas de acessibilidade
6. **Responsividade**: Teste componentes em diferentes viewports

O Storybook se torna uma ferramenta essencial para manter a consistência visual e facilitar o desenvolvimento colaborativo de componentes [8].


