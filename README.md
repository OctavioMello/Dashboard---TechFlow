# TechFlow Dashboard

Checkpoint 5 – FrontEnd Design. Dashboard responsivo da empresa fictícia **TechFlow** para acompanhar projetos, equipes e indicadores.

## Integrantes

Octávio Mello Covre de Souza — RM: 571811

Gabriel Torres Zambo — RM: 569883

## Tecnologias utilizadas

- HTML5
- Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- Vite (servidor de desenvolvimento e build)
- JavaScript puro

## Principais recursos implementados

**Telas**
- Dashboard com navbar, sidebar, campo de pesquisa, informações do usuário, 4 cards de indicadores e 6 cards de projetos.
- Modal de **Novo projeto** (nome, responsável, categoria, prioridade, prazo e descrição).

**Layout**
- Mobile-first, com breakpoints `sm:`, `md:`, `lg:`, `xl:` e `2xl:`.
- Indicadores em `grid` (1 → 2 → 4 colunas).
- Projetos em `grid` com tamanhos diferentes usando `grid-cols-*`, `col-span-*` e `row-span-*` (um card destaque 2×2, quatro cards 1×1 e um card largo).
- Flexbox com `flex`, `flex-col`, `items-center`, `justify-between`, `flex-wrap` e `gap-*`.
- Sidebar fixa no desktop e em formato de menu deslizante (com overlay) no mobile.

**Interações**
- Dropdown do usuário e menu mobile da sidebar (fecham com clique fora ou `Esc`).
- Estados `hover:`, `focus:`, `active:` e `disabled:`.
- `group-hover:` nos cards de projeto, indicadores e links da sidebar.
- `peer-checked:` nos botões de prioridade do formulário.
- Transições com `transition`, `transition-all`, `duration-*` e `ease-*`.
- Busca que filtra os projetos por nome, responsável ou categoria.

**Formulário**
- Validação visual em JavaScript, com estados de erro e sucesso por campo, mensagens e foco automático no primeiro erro.
- Ao salvar, o projeto aparece na lista e o indicador de projetos ativos é atualizado (sem banco de dados).

**Tema**
- Seletor **Light | Dark | System** com a variante `dark:` do Tailwind (`@custom-variant dark` controlado pela classe `.dark`).
- Script no `<head>` que aplica o tema antes da primeira pintura, evitando o "flash" de tema errado.
- O modo System acompanha a preferência do sistema em tempo real.
- A escolha é salva no `localStorage`.

## Como executar

```bash
npm install
npm run dev
```

Depois abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

Para gerar a versão de produção: `npm run build` (saída em `dist/`).

## Estrutura

```
techflow-dashboard/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── vite.config.js
├── package.json
└── README.md
```

## Link do GitHub

https://github.com/usuario/techflow-dashboard

## Dificuldades encontradas

- Montar a grade de projetos com tamanhos diferentes (`col-span` e `row-span`) sem deixar espaços vazios entre os cards.
- Fazer o modo System reagir à mudança de tema do sistema e evitar o "flash" de tema errado ao carregar a página.
- Tornar a sidebar responsiva (fixa no desktop e deslizante no mobile) controlando o foco e a rolagem da página.
- Validar o formulário de forma visual, com estados de erro e sucesso, mantendo a página acessível.
