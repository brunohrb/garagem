# 🎨 Sistema de Gerenciamento de Oficina de Pintura

Um sistema web completo e profissional para gerenciar todos os aspectos de uma oficina de pintura, desenvolvido com React, TypeScript, Tailwind CSS e integrado com Supabase.

## ✨ Características Principais

### 📊 Dashboard Inteligente
- Estatísticas em tempo real de agendamentos, projetos e clientes
- Gráficos de receita vs despesa
- Visualização do status dos projetos
- Projetos recentes com progresso

### 👥 Gerenciamento de Clientes
- Cadastro completo de clientes
- Busca e filtros avançados
- Histórico de serviços por cliente
- Informações de contato organizadas

### 📅 Agendamentos
- Calendário de agendamentos
- Filtros por status (pendente, confirmado, em andamento, concluído)
- Detalhes de localização e serviço
- Gerenciamento de confirmações

### 🎨 Projetos
- Rastreamento de projetos em andamento
- Barra de progresso visual
- Equipe responsável
- Orçamento e gastos

### 🛠️ Materiais
- Controle de estoque
- Categorização de materiais
- Preço unitário e fornecedor
- Data de validade

### 💰 Financeiro
- Registro de receitas e despesas
- Categorização de transações
- Status de pagamento
- Relatórios financeiros

### 📈 Relatórios
- Relatórios financeiros mensais
- Análise de desempenho de projetos
- Dados de clientes atendidos
- Uso de materiais

## 🎯 Design

O sistema utiliza um **Design Artístico Contemporâneo** com:
- **Paleta de Cores**: Laranja vibrante (#FF6B35), Azul profundo (#004E89), Amarelo ouro (#F7B801), Rosa coral (#E63946)
- **Tipografia**: Playfair Display (títulos elegantes) + Poppins (corpo legível)
- **Layout**: Grid assimétrico com sidebar esquerda, elementos flutuantes e pinceladas abstratas
- **Animações**: Transições suaves, hover effects coloridos, entrada com efeito de desenho

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- npm ou pnpm
- Conta no Supabase
- Git

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/oficina-pintura.git
cd oficina-pintura

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Inicie o servidor de desenvolvimento
pnpm dev
```

O sistema estará disponível em `http://localhost:3000`

## 📦 Estrutura do Projeto

```
oficina-pintura/
├── client/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── pages/           # Páginas principais
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Clientes.tsx
│   │   │   ├── Agendamentos.tsx
│   │   │   ├── Projetos.tsx
│   │   │   ├── Materiais.tsx
│   │   │   ├── Financeiro.tsx
│   │   │   └── Relatorios.tsx
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   └── Layout.tsx   # Layout principal com sidebar
│   │   ├── lib/
│   │   │   └── supabase.ts  # Integração com Supabase
│   │   ├── App.tsx          # Roteador principal
│   │   ├── main.tsx         # Entrada do React
│   │   └── index.css        # Estilos globais
│   └── index.html           # HTML principal
├── shared/
│   └── types.ts             # Tipos TypeScript compartilhados
├── .env.local               # Variáveis de ambiente (não commitar)
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions para deploy
├── package.json             # Dependências
├── DEPLOYMENT.md            # Guia de implantação
└── README.md                # Este arquivo
```

## 🔧 Configuração do Supabase

### 1. Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados e crie o projeto

### 2. Copiar Credenciais
1. Vá para "Settings" → "API"
2. Copie a **Project URL** e a **anon public key**

### 3. Criar Tabelas
1. Vá para "SQL Editor"
2. Clique em "New Query"
3. Cole o script SQL de `client/src/lib/supabase.ts`
4. Execute

### 4. Configurar Variáveis de Ambiente
Crie `.env.local`:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

## 🌐 Hospedagem no GitHub Pages

### 1. Criar Repositório
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/oficina-pintura.git
git push -u origin main
```

### 2. Configurar GitHub Pages
1. Vá para "Settings" → "Pages"
2. Selecione "main" branch e "/root" folder
3. Clique em "Save"

### 3. Configurar GitHub Actions
O arquivo `.github/workflows/deploy.yml` já está configurado para deploy automático.

### 4. Adicionar Secrets
1. Vá para "Settings" → "Secrets and variables" → "Actions"
2. Adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 📝 Uso

### Dashboard
- Visualize estatísticas gerais da oficina
- Acompanhe receita vs despesa
- Veja status dos projetos
- Acesse ações rápidas

### Clientes
- Adicione novos clientes com `+ Novo Cliente`
- Busque clientes por nome ou email
- Edite ou delete clientes
- Visualize informações de contato

### Agendamentos
- Filtre por status (pendente, confirmado, etc.)
- Adicione novos agendamentos
- Veja localização e horário
- Atualize status

### Projetos
- Rastreie progresso com barra visual
- Veja equipe responsável
- Acompanhe orçamento
- Marque como concluído

### Materiais
- Gerencie estoque
- Registre preços unitários
- Controle validade
- Organize por fornecedor

### Financeiro
- Registre receitas e despesas
- Categorize transações
- Acompanhe pagamentos
- Gere relatórios

### Relatórios
- Relatório Financeiro: receitas, despesas, lucro
- Relatório de Projetos: desempenho e progresso
- Relatório de Clientes: dados e histórico
- Relatório de Materiais: uso e estoque

## 🔌 Integração com Supabase

O sistema está preparado para integração completa com Supabase. Para ativar:

1. Instale o cliente Supabase:
```bash
pnpm add @supabase/supabase-js
```

2. Use as funções em `client/src/lib/supabase.ts`

3. Exemplo de uso:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Buscar clientes
const { data } = await supabase.from('clientes').select('*');
```

## 🎨 Personalização

### Cores
Edite `client/src/index.css` para mudar as cores:
```css
:root {
  --primary: #FF6B35;        /* Laranja */
  --secondary: #004E89;      /* Azul */
  --accent: #F7B801;         /* Ouro */
}
```

### Tipografia
As fontes estão importadas em `client/index.html`:
- Playfair Display (títulos)
- Poppins (corpo)

### Componentes
Customize componentes em `client/src/components/` e `client/src/pages/`

## 📊 Dados de Exemplo

O sistema vem com dados de exemplo para teste:
- 3 clientes
- 3 agendamentos
- 3 projetos recentes

Substitua pelos dados reais do Supabase conforme necessário.

## 🐛 Troubleshooting

### Erro: "VITE_SUPABASE_URL não definido"
- Verifique se `.env.local` existe na raiz do projeto
- Confirme que as variáveis estão corretas

### Erro: "Falha ao conectar ao Supabase"
- Verifique a URL e chave do Supabase
- Confirme que o projeto está ativo
- Teste a conexão de internet

### GitHub Pages não atualiza
- Verifique se o GitHub Actions completou
- Limpe o cache do navegador
- Aguarde alguns minutos

## 📚 Documentação Adicional

- [Guia de Implantação](./DEPLOYMENT.md) - Instruções detalhadas de deploy
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação React](https://react.dev)
- [Documentação Tailwind CSS](https://tailwindcss.com)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a [Documentação](./DEPLOYMENT.md)
2. Abra uma issue no GitHub
3. Entre em contato

---

**Desenvolvido com ❤️ para sua oficina de pintura**

*Última atualização: Fevereiro 2026*
