# 🚀 Template Inicial React + Tailwind CSS

Este repositório contém um template inicial robusto e escalável para projetos React (com Vite ou Next.js) integrados com Tailwind CSS. O objetivo é fornecer uma base sólida para novos projetos, focando em:

-   🎨 **Sistema de Cores Reutilizável**: Gerenciamento de cores semânticas para fácil adaptação e consistência visual.
-   🌓 **Temas Claro/Escuro**: Implementação de um sistema de temas dinâmico com persistência e detecção de preferência do sistema.
-   📦 **Componentes Base**: Um conjunto de componentes UI reutilizáveis e acessíveis.
-   🧪 **Testes Avançados**: Configuração completa para testes unitários, de integração e E2E (End-to-End).
-   📚 **Storybook**: Ferramenta para desenvolvimento isolado e documentação interativa de componentes.
-   🏗️ **Monorepo**: Estrutura otimizada para gerenciar múltiplos projetos que compartilham código, com foco em performance e deploy.

## ✨ Funcionalidades Principais

-   **Configuração Tailwind CSS**: `tailwind.config.js` otimizado para temas e cores customizadas.
-   **Variáveis CSS**: Uso de variáveis CSS para temas claro e escuro, permitindo transições suaves.
-   **Hooks Customizados**: `useTheme`, `useLocalStorage`, `useDebounce` para funcionalidades comuns.
-   **Utilitários**: Funções auxiliares para manipulação de classes (`cn`), formatação de moeda, validação de email, etc.
-   **Qualidade de Código**: ESLint, Prettier e Git Hooks (Husky + lint-staged) para manter o código limpo e consistente.
-   **Fontes e Ícones**: Configuração para fontes customizadas e biblioteca de ícones (Lucide React).
-   **Animações**: Keyframes e classes de animação customizadas no Tailwind.
-   **Testes Unitários/Integração**: Vitest, React Testing Library e MSW (Mock Service Worker).
-   **Testes E2E**: Playwright para automação de testes de ponta a ponta.
-   **Documentação de Componentes**: Storybook para criar um catálogo interativo de componentes.
-   **Testes Visuais**: Integração com Chromatic para detecção de regressões visuais.
-   **Estrutura Monorepo**: Organização de projetos com Turborepo para compartilhamento de código e builds otimizados.
-   **Deploy Otimizado**: Instruções detalhadas para deploy de monorepos no Vercel.
-   **CI/CD**: Exemplos de workflows GitHub Actions para automação de testes, builds e deploys.

## 🚀 Como Começar

### Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior) e o npm (ou yarn/pnpm) instalados.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-projeto.git
    cd seu-projeto
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    # ou pnpm install
    ```

### Scripts Úteis

No `package.json` raiz, você encontrará scripts para gerenciar o monorepo:

-   `npm run dev`: Inicia todos os aplicativos em modo de desenvolvimento.
-   `npm run dev:web`: Inicia apenas o aplicativo web.
-   `npm run dev:admin`: Inicia apenas o painel administrativo.
-   `npm run build`: Constrói todos os aplicativos para produção.
-   `npm run test`: Executa todos os testes (unitários, integração, E2E).
-   `npm run lint`: Executa o linter para verificar a qualidade do código.
-   `npm run format`: Formata o código com Prettier.
-   `npm run storybook`: Inicia o Storybook para visualização de componentes.
-   `npm run deploy:web:vercel`: Realiza o deploy do aplicativo web no Vercel.

## 📚 Documentação

Para uma visão mais aprofundada sobre a estrutura, configurações e boas práticas deste template, consulte a documentação completa:

[Acesse a Documentação Completa Aqui](https://seulink.com/para/documentacao) <!-- Substitua pelo link real da sua documentação web -->

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estas etapas:

1.  Faça um fork do repositório.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e adicione testes, se aplicável.
4.  Certifique-se de que todos os testes passem (`npm test`).
5.  Envie suas alterações (`git commit -am 'feat: Adiciona nova funcionalidade'`).
6.  Envie para a branch (`git push origin feature/sua-feature`).
7.  Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.



