# Guia de Testes - Sistema de Gerenciamento de Oficina de Pintura

## 🧪 Testes Manuais

### 1. Testes de Navegação

#### Dashboard
- [ ] Página carrega sem erros
- [ ] Todos os gráficos são renderizados
- [ ] Cards de estatísticas mostram dados
- [ ] Botões de ação rápida funcionam
- [ ] Sidebar funciona corretamente

#### Clientes
- [ ] Lista de clientes carrega
- [ ] Busca por nome funciona
- [ ] Busca por email funciona
- [ ] Formulário de novo cliente abre
- [ ] Novo cliente é adicionado à lista
- [ ] Botão de deletar remove cliente
- [ ] Botão de editar abre formulário

#### Agendamentos
- [ ] Lista de agendamentos carrega
- [ ] Filtros por status funcionam
- [ ] Novo agendamento pode ser criado
- [ ] Data e hora são exibidas corretamente
- [ ] Status é atualizado visualmente

#### Projetos, Materiais, Financeiro, Relatórios
- [ ] Páginas carregam sem erros
- [ ] Placeholders são exibidos corretamente
- [ ] Navegação funciona

### 2. Testes de Responsividade

#### Mobile (320px - 480px)
- [ ] Layout se adapta corretamente
- [ ] Sidebar collapsa em versão mobile
- [ ] Textos são legíveis
- [ ] Botões são clicáveis
- [ ] Gráficos são responsivos

#### Tablet (481px - 768px)
- [ ] Grid de cards se adapta
- [ ] Tabelas são legíveis
- [ ] Navegação funciona

#### Desktop (769px+)
- [ ] Layout completo é exibido
- [ ] Sidebar permanece visível
- [ ] Gráficos têm tamanho apropriado

### 3. Testes de Formulários

#### Novo Cliente
- [ ] Campo de nome é obrigatório
- [ ] Campo de email valida formato
- [ ] Telefone é formatado corretamente
- [ ] Dados são salvos corretamente
- [ ] Mensagem de sucesso é exibida

#### Novo Agendamento
- [ ] Data é obrigatória
- [ ] Hora é obrigatória
- [ ] Serviço é obrigatório
- [ ] Dados são salvos corretamente
- [ ] Agendamento aparece na lista

### 4. Testes de Performance

#### Carregamento Inicial
- [ ] Página carrega em menos de 3 segundos
- [ ] Sem erros de console
- [ ] Sem warnings desnecessários

#### Interações
- [ ] Cliques em botões respondem imediatamente
- [ ] Transições são suaves
- [ ] Sem lag ou travamentos

### 5. Testes de Acessibilidade

#### Navegação por Teclado
- [ ] Tab navega entre elementos
- [ ] Enter ativa botões
- [ ] Escape fecha modais
- [ ] Focus é visível

#### Leitores de Tela
- [ ] Títulos são semânticos
- [ ] Imagens têm alt text
- [ ] Botões têm labels
- [ ] Cores não são a única indicação

### 6. Testes de Integração com Supabase

#### Conexão
- [ ] Variáveis de ambiente estão corretas
- [ ] Cliente Supabase inicializa sem erros
- [ ] Conexão é estabelecida

#### Operações CRUD
- [ ] Dados podem ser lidos do banco
- [ ] Novos registros podem ser criados
- [ ] Registros podem ser atualizados
- [ ] Registros podem ser deletados

## 🔍 Testes Automatizados

### Setup

```bash
# Instalar dependências de teste
pnpm add -D vitest @testing-library/react @testing-library/jest-dom

# Criar arquivo de configuração vitest.config.ts
```

### Exemplo de Teste

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '@/pages/Dashboard';

describe('Dashboard', () => {
  it('deve renderizar o título', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('deve exibir cards de estatísticas', () => {
    render(<Dashboard />);
    expect(screen.getByText('Agendamentos Próximos')).toBeInTheDocument();
    expect(screen.getByText('Projetos em Andamento')).toBeInTheDocument();
  });
});
```

### Executar Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Gerar relatório de cobertura
pnpm test:coverage
```

## 📋 Checklist de Deploy

### Antes de Fazer Deploy

- [ ] Todos os testes passam
- [ ] Sem erros de TypeScript
- [ ] Sem warnings de console
- [ ] Variáveis de ambiente configuradas
- [ ] Supabase está acessível
- [ ] Build local funciona
- [ ] Responsividade testada em múltiplos dispositivos

### Configuração do GitHub

- [ ] Repositório criado
- [ ] Secrets configurados
- [ ] GitHub Pages habilitado
- [ ] Workflow do GitHub Actions configurado

### Após Deploy

- [ ] Site está acessível
- [ ] Todas as páginas carregam
- [ ] Funcionalidades principais funcionam
- [ ] Sem erros de console
- [ ] Performance é aceitável

## 🐛 Relatório de Bugs

Ao encontrar um bug, registre:

1. **Descrição**: O que aconteceu?
2. **Passos para Reproduzir**: Como reproduzir o problema?
3. **Resultado Esperado**: O que deveria acontecer?
4. **Resultado Atual**: O que aconteceu?
5. **Ambiente**: Navegador, dispositivo, SO
6. **Screenshots**: Se aplicável

## 📊 Métricas de Qualidade

### Cobertura de Testes
- Meta: > 80%
- Crítico: > 90%

### Performance
- Tempo de carregamento: < 3s
- Tempo de interação: < 100ms
- Lighthouse Score: > 80

### Acessibilidade
- WCAG 2.1 AA
- Sem erros de acessibilidade

---

**Última atualização: Fevereiro 2026**
