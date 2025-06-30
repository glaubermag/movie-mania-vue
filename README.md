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

## Instalação e Uso

```bash
# Clone o repositório
git clone <SUA_GIT_URL>
cd <NOME_DO_PROJETO>

# Instale as dependências
npm install

# Crie um arquivo .env com suas chaves da TMDb
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Rode o projeto em modo desenvolvimento
npm run dev
```

## Deploy
O projeto pode ser facilmente hospedado em serviços como Vercel, Netlify ou similares. Basta configurar as variáveis de ambiente `VITE_TMDB_API_KEY` e `VITE_TMDB_READ_TOKEN` no painel do serviço.

## Considerações Finais
- O projeto foi desenvolvido priorizando padrões de código, componentização, usabilidade e responsividade.
- Todas as funcionalidades solicitadas foram implementadas, com diferenciais visuais e de UX.
- A experiência mobile foi cuidadosamente trabalhada.
- O código está documentado e fácil de manter.


---


