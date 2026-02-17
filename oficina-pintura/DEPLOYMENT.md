# Guia de Implantação - Sistema de Gerenciamento de Oficina de Pintura

## 📋 Índice
1. [Configuração Inicial](#configuração-inicial)
2. [Integração com Supabase](#integração-com-supabase)
3. [Hospedagem no GitHub Pages](#hospedagem-no-github-pages)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Build e Deploy](#build-e-deploy)
6. [Troubleshooting](#troubleshooting)

---

## Configuração Inicial

### Pré-requisitos
- Node.js 18+ e npm/pnpm
- Conta no GitHub
- Conta no Supabase
- Git instalado

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/oficina-pintura.git
cd oficina-pintura

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O sistema estará disponível em `http://localhost:3000`

---

## Integração com Supabase

### Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Name**: oficina-pintura
   - **Database Password**: Escolha uma senha forte
   - **Region**: Selecione a região mais próxima
4. Clique em "Create new project"

### Passo 2: Copiar Credenciais

1. Na página do projeto, vá para "Settings" → "API"
2. Copie:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public** (VITE_SUPABASE_ANON_KEY)

### Passo 3: Criar Tabelas no Banco de Dados

1. Na página do Supabase, vá para "SQL Editor"
2. Clique em "New Query"
3. Cole o script SQL do arquivo `client/src/lib/supabase.ts` (seção `SQL_SCHEMA`)
4. Clique em "Run"

### Passo 4: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui

# GitHub Pages (se usar)
VITE_BASE_URL=/oficina-pintura/
```

---

## Hospedagem no GitHub Pages

### Passo 1: Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Preencha:
   - **Repository name**: oficina-pintura
   - **Description**: Sistema de Gerenciamento de Oficina de Pintura
   - **Public** (recomendado para Pages)
3. Clique em "Create repository"

### Passo 2: Fazer Push do Código

```bash
# Configure o git
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"

# Adicione o repositório remoto
git remote add origin https://github.com/seu-usuario/oficina-pintura.git

# Faça o primeiro commit
git add .
git commit -m "Initial commit: Sistema de gerenciamento de oficina de pintura"

# Faça push
git branch -M main
git push -u origin main
```

### Passo 3: Configurar GitHub Pages

1. Vá para "Settings" do repositório
2. Clique em "Pages" (no menu esquerdo)
3. Em "Source", selecione:
   - **Branch**: main
   - **Folder**: /root (ou /docs se preferir)
4. Clique em "Save"

### Passo 4: Configurar GitHub Actions para Deploy Automático

Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Passo 5: Adicionar Secrets no GitHub

1. Vá para "Settings" → "Secrets and variables" → "Actions"
2. Clique em "New repository secret"
3. Adicione:
   - **VITE_SUPABASE_URL**: Sua URL do Supabase
   - **VITE_SUPABASE_ANON_KEY**: Sua chave anônima

---

## Variáveis de Ambiente

### Arquivo `.env.local` (Desenvolvimento)

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui

# Base URL (para GitHub Pages)
VITE_BASE_URL=/oficina-pintura/
```

### Variáveis Disponíveis

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Chave pública do Supabase | `eyJhbGc...` |
| `VITE_BASE_URL` | URL base para GitHub Pages | `/oficina-pintura/` |

---

## Build e Deploy

### Build Local

```bash
# Build para produção
pnpm build

# Visualizar build localmente
pnpm preview
```

### Deploy Automático

Ao fazer push para a branch `main`, o GitHub Actions executará automaticamente:
1. ✅ Instalação de dependências
2. ✅ Build do projeto
3. ✅ Deploy para GitHub Pages

Seu site estará disponível em: `https://seu-usuario.github.io/oficina-pintura/`

### Deploy Manual

Se preferir fazer deploy manual:

```bash
# Build
pnpm build

# Copie os arquivos de dist para a pasta docs (se configurado assim)
cp -r dist/* docs/

# Faça commit e push
git add .
git commit -m "Deploy: atualização do site"
git push origin main
```

---

## Integração com Supabase no Código

### Instalando o Cliente Supabase

```bash
pnpm add @supabase/supabase-js
```

### Exemplo de Uso

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Buscar clientes
const { data, error } = await supabase
  .from('clientes')
  .select('*');

// Inserir novo cliente
const { data, error } = await supabase
  .from('clientes')
  .insert([{ nome: 'João', email: 'joao@email.com' }]);
```

---

## Troubleshooting

### Problema: "VITE_SUPABASE_URL não definido"

**Solução**: Certifique-se de que o arquivo `.env.local` existe na raiz do projeto com as variáveis corretas.

### Problema: "Erro ao conectar ao Supabase"

**Solução**: 
1. Verifique se a URL e chave estão corretas
2. Verifique se o projeto Supabase está ativo
3. Verifique a conexão de internet

### Problema: "GitHub Pages não atualiza"

**Solução**:
1. Verifique se o GitHub Actions completou com sucesso
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Aguarde alguns minutos para o deploy ser propagado

### Problema: "Erro 404 no GitHub Pages"

**Solução**: Verifique se a variável `VITE_BASE_URL` está correta e se o arquivo `index.html` está em `dist/`.

---

## Estrutura de Pastas

```
oficina-pintura/
├── client/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── lib/         # Utilitários e helpers
│   │   ├── App.tsx      # Componente raiz
│   │   └── index.css    # Estilos globais
│   └── index.html       # HTML principal
├── shared/
│   └── types.ts         # Tipos TypeScript compartilhados
├── .env.local           # Variáveis de ambiente (NÃO commitar)
├── .github/
│   └── workflows/
│       └── deploy.yml   # Workflow do GitHub Actions
├── package.json         # Dependências do projeto
└── DEPLOYMENT.md        # Este arquivo
```

---

## Próximas Etapas

1. **Integrar Cliente Supabase**: Instale `@supabase/supabase-js` e implemente as funções de banco de dados
2. **Autenticação**: Configure autenticação com Supabase Auth
3. **Testes**: Adicione testes unitários com Vitest
4. **CI/CD**: Configure verificações de qualidade no GitHub Actions
5. **Domínio Customizado**: Configure um domínio próprio no GitHub Pages

---

## Suporte

Para mais informações:
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação GitHub Pages](https://docs.github.com/en/pages)
- [Documentação React](https://react.dev)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)

---

**Última atualização**: Fevereiro 2026
