# MovieMania - Loja Virtual de Filmes

Projeto desenvolvido como desafio técnico para o DOT Digital Group.

## Proposta
Desenvolver uma loja virtual de filmes com interface moderna, integração com a API TMDb e navegação fluida, focando em usabilidade, responsividade e experiência do usuário.

## Requisitos Atendidos

### Obrigatórios
- [x] Utilização do framework Vue.js 3
- [x] Layout das telas principais: Página Inicial, Carrinho lateral e Checkout
- [x] Gerenciamento de estado com Vuex
- [x] Integração com a API de filmes TMDb
- [x] Listagem de filmes retornados da API
- [x] Carrinho de compras lateral totalmente funcional
- [x] Fluxo de checkout completo
- [x] Validação de todos os campos do formulário de checkout
- [x] Modal de sucesso ao finalizar a compra

### Desejáveis
- [x] Pesquisa de filmes (busca integrada à API)
- [x] Máscaras nos campos de email, celular, CEP e CPF
- [x] Adicionar/remover filmes à lista de favoritos do usuário

## Funcionalidades
- Listagem de filmes populares e busca por título
- Carrinho lateral com gerenciamento de itens
- Checkout com validação e máscaras
- Modal de sucesso após compra
- Favoritar/desfavoritar filmes com visualização rápida no header
- Responsividade total (mobile first)
- Animações e feedbacks visuais

### Autocomplete de Endereço via CEP

O formulário de checkout possui integração automática com a API [ViaCEP](https://viacep.com.br/):
- Ao digitar um CEP válido, o sistema consulta a API e preenche automaticamente os campos de endereço, bairro, cidade, estado e complemento.
- Isso facilita o preenchimento, reduz erros e melhora a experiência do usuário.
- Caso o CEP seja inválido ou não encontrado, o preenchimento automático não ocorre.

**Exemplo de uso:**
1. Digite um CEP válido no campo correspondente.
2. Os campos de endereço serão preenchidos automaticamente.

## Tecnologias Utilizadas
- [Vue 3](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) (testes)
- [ESLint](https://eslint.org/) (linting)
- [Prettier](https://prettier.io/) (formatação)

## Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/glaubermag/movie-mania-vue
cd movie-mania-vue

# Instale as dependências
npm install

# Crie um arquivo .env com suas chaves da TMDb (opcional)
# VITE_TMDB_API_KEY=sua_api_key
# VITE_TMDB_READ_TOKEN=seu_read_token

# Rode o projeto em modo desenvolvimento
npm run dev
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run preview      # Preview do build de produção

# Build
npm run build        # Build de produção
npm run build:dev    # Build de desenvolvimento

# Qualidade de código
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
npm run type-check   # Verifica tipos TypeScript

# Testes
npm run test         # Executa todos os testes
npm run test:ui      # Interface visual dos testes
npm run test:coverage # Testes com relatório de cobertura
npm run check:accessibility # Testes de acessibilidade
```

## Deploy
O projeto pode ser facilmente hospedado em serviços como Vercel, Netlify ou similares. Basta configurar as variáveis de ambiente `VITE_TMDB_API_KEY` e `VITE_TMDB_READ_TOKEN` no painel do serviço.

### Docker
O projeto inclui um Dockerfile para deploy em containers:

```bash
# Build da imagem
docker build -t movie-mania-vue .

# Executar container
docker run -p 80:80 movie-mania-vue
```

## Testes

O projeto possui uma cobertura abrangente de testes:

- **78 testes** passando
- **9 arquivos de teste** cobrindo componentes críticos
- Testes de acessibilidade com axe-core
- Testes de integração com APIs externas
- Mocks para Vuex e Vue Router

### Executar Testes
```bash
npm run test                    # Todos os testes
npm run test:coverage          # Com relatório de cobertura
npm run check:accessibility    # Testes de acessibilidade
```

## Acessibilidade

O projeto segue as melhores práticas de acessibilidade:

- **Navegação por teclado**: Todos os elementos interativos são acessíveis via teclado
- **Screen readers**: Labels descritivos, aria-labels e estrutura semântica
- **Contraste**: Alto contraste em todos os elementos
- **Feedback visual**: Estados claros para loading, erro e sucesso
- **Testes automatizados**: Verificação de acessibilidade com axe-core

## Estrutura do Projeto

```
src/
├── components/          # Componentes Vue reutilizáveis
│   ├── Cart.vue        # Carrinho lateral
│   ├── CheckoutForm.vue # Formulário de checkout
│   ├── Header.vue      # Header com navegação
│   ├── MovieCard.vue   # Card de filme
│   └── SuccessModal.vue # Modal de sucesso
├── views/              # Páginas da aplicação
│   ├── HomeView.vue    # Página inicial
│   ├── CheckoutView.vue # Página de checkout
│   └── NotFoundView.vue # Página 404
├── store/              # Gerenciamento de estado (Vuex)
│   ├── cart.ts         # Store do carrinho
│   ├── favorites.ts    # Store de favoritos
│   └── index.ts        # Configuração do store
├── services/           # Serviços externos
│   └── tmdbApi.ts      # Integração com API TMDb
├── types/              # Definições TypeScript
│   └── movie.ts        # Tipos relacionados a filmes
└── router/             # Configuração de rotas
    └── index.ts        # Definição das rotas
```

## Decisões Técnicas

- **Framework**: Vue.js 3 com Composition API
- **Estado**: Vuex modularizado (cart, favorites)
- **Estilização**: TailwindCSS com design responsivo
- **Testes**: Vitest + @vue/test-utils
- **Integração**: APIs TMDb (filmes) e ViaCEP (endereços)
- **Componentização**: Separação clara de responsabilidades
- **Performance**: Lazy loading de rotas e otimização de imagens

## CI/CD

O projeto inclui workflow GitHub Actions que executa:
- Lint com ESLint
- Testes com cobertura
- Verificação de tipos TypeScript
- Build de produção

## Considerações Finais

- O projeto foi desenvolvido priorizando padrões de código, componentização, usabilidade e responsividade
- Todas as funcionalidades solicitadas foram implementadas com diferenciais visuais e de UX
- A experiência mobile foi cuidadosamente trabalhada
- O código está documentado, testado e fácil de manter
- Cobertura de testes de 100% nos componentes críticos (78 testes)
- Acessibilidade completa seguindo padrões WCAG

---

## Diferenciais desta entrega

- ✅ **Integração real com APIs externas** (TMDb e ViaCEP)
- ✅ **Testes automatizados** com alta cobertura (78 testes)
- ✅ **Acessibilidade completa** com navegação por teclado e screen readers
- ✅ **Responsividade avançada** com design mobile-first
- ✅ **Componentização robusta** com separação clara de responsabilidades
- ✅ **CI/CD configurado** com GitHub Actions
- ✅ **Docker configurado** para deploy em containers
- ✅ **TypeScript** para type safety
- ✅ **Máscaras de input** para melhor UX
- ✅ **Animações e feedbacks visuais** para melhor experiência

## Como contribuir

Contribuições são bem-vindas! Para sugerir melhorias, abrir issues ou enviar pull requests:

- Faça um fork do projeto
- Crie uma branch descritiva (`feature/nome-da-feature` ou `fix/ajuste-x`)
- Envie um pull request detalhando sua contribuição
- Siga as boas práticas de código e acessibilidade

## Colaboração

Este projeto valoriza diversidade, inclusão e aprendizado contínuo. Sinta-se à vontade para sugerir melhorias, reportar bugs ou propor discussões!
