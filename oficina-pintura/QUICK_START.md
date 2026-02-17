# 🚀 Guia Rápido de Início

Siga este guia para colocar seu sistema de gerenciamento de oficina de pintura em funcionamento em minutos.

## 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/oficina-pintura.git
cd oficina-pintura
```

## 2️⃣ Instalar Dependências

```bash
pnpm install
```

## 3️⃣ Configurar Supabase

### Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - Name: `oficina-pintura`
   - Database Password: Escolha uma senha forte
   - Region: Selecione a região mais próxima
4. Clique em "Create new project"

### Copiar Credenciais

1. Na página do projeto, vá para "Settings" → "API"
2. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

### Criar Arquivo `.env.local`

Na raiz do projeto, crie um arquivo `.env.local`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### Criar Tabelas no Banco

1. No Supabase, vá para "SQL Editor"
2. Clique em "New Query"
3. Copie o script SQL de `client/src/lib/supabase.ts` (seção `SQL_SCHEMA`)
4. Cole no editor e clique em "Run"

## 4️⃣ Iniciar Servidor de Desenvolvimento

```bash
pnpm dev
```

O sistema estará disponível em `http://localhost:3000`

## 5️⃣ Explorar o Sistema

### Dashboard
Visualize estatísticas gerais, gráficos de receita e projetos recentes.

### Clientes
Adicione e gerencie clientes com `+ Novo Cliente`.

### Agendamentos
Crie agendamentos filtrando por status.

### Projetos, Materiais, Financeiro, Relatórios
Páginas em desenvolvimento com placeholders.

## 6️⃣ Fazer Build para Produção

```bash
pnpm build
```

Os arquivos compilados estarão em `dist/`.

## 7️⃣ Deploy no GitHub Pages

### Criar Repositório GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome: `oficina-pintura`
3. Clique em "Create repository"

### Fazer Push do Código

```bash
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"
git remote add origin https://github.com/seu-usuario/oficina-pintura.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Configurar GitHub Pages

1. Vá para "Settings" do repositório
2. Clique em "Pages"
3. Selecione "main" branch e "/root" folder
4. Clique em "Save"

### Adicionar Secrets

1. Vá para "Settings" → "Secrets and variables" → "Actions"
2. Clique em "New repository secret"
3. Adicione:
   - **VITE_SUPABASE_URL**: Sua URL do Supabase
   - **VITE_SUPABASE_ANON_KEY**: Sua chave anônima

## 🎉 Pronto!

Seu sistema estará disponível em:
- **Desenvolvimento**: `http://localhost:3000`
- **Produção**: `https://seu-usuario.github.io/oficina-pintura/`

## 📚 Próximos Passos

1. **Integrar Supabase**: Instale `@supabase/supabase-js` para usar dados reais
2. **Customizar Design**: Edite cores em `client/src/index.css`
3. **Implementar Funcionalidades**: Desenvolva as páginas em desenvolvimento
4. **Adicionar Autenticação**: Configure auth com Supabase

## 🆘 Troubleshooting

### Erro: "VITE_SUPABASE_URL não definido"
Verifique se `.env.local` existe na raiz com as variáveis corretas.

### Erro: "Falha ao conectar ao Supabase"
Confirme que a URL e chave estão corretas e que o projeto está ativo.

### GitHub Pages não atualiza
Limpe o cache do navegador e aguarde alguns minutos.

## 📖 Documentação Completa

- [README.md](./README.md) - Visão geral completa
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia detalhado de implantação
- [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) - Integração com Supabase
- [TESTING.md](./TESTING.md) - Guia de testes

---

**Última atualização: Fevereiro 2026**
