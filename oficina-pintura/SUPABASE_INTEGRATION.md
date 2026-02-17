# Guia de Integração com Supabase

Este documento fornece instruções detalhadas para integrar o cliente Supabase ao sistema de gerenciamento de oficina de pintura.

## 📦 Instalação do Cliente Supabase

```bash
pnpm add @supabase/supabase-js
```

## 🔧 Configuração Inicial

### 1. Criar Cliente Supabase

Crie o arquivo `client/src/lib/supabaseClient.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. Configurar Variáveis de Ambiente

Adicione ao `.env.local`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

## 📊 Exemplos de Operações CRUD

### Clientes

#### Buscar Todos os Clientes

```typescript
import { supabase } from '@/lib/supabaseClient';

async function buscarClientes() {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('data_cadastro', { ascending: false });

  if (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }

  return data;
}
```

#### Buscar Cliente por ID

```typescript
async function buscarClientePorId(id: string) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar cliente:', error);
    return null;
  }

  return data;
}
```

#### Criar Novo Cliente

```typescript
interface NovoCliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

async function criarCliente(cliente: NovoCliente) {
  const { data, error } = await supabase
    .from('clientes')
    .insert([{
      ...cliente,
      data_cadastro: new Date().toISOString(),
      ativo: true,
    }])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar cliente:', error);
    return null;
  }

  return data;
}
```

#### Atualizar Cliente

```typescript
async function atualizarCliente(id: string, updates: Partial<NovoCliente>) {
  const { data, error } = await supabase
    .from('clientes')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar cliente:', error);
    return null;
  }

  return data;
}
```

#### Deletar Cliente

```typescript
async function deletarCliente(id: string) {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar cliente:', error);
    return false;
  }

  return true;
}
```

### Agendamentos

#### Buscar Agendamentos por Status

```typescript
async function buscarAgendamentosPorStatus(status: string) {
  const { data, error } = await supabase
    .from('agendamentos')
    .select(`
      *,
      clientes (nome, email, telefone)
    `)
    .eq('status', status)
    .order('data_agendamento', { ascending: true });

  if (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return [];
  }

  return data;
}
```

#### Criar Agendamento

```typescript
interface NovoAgendamento {
  cliente_id: string;
  data_agendamento: string;
  data_inicio: string;
  tipo_servico: string;
  descricao: string;
  valor_estimado: number;
  endereco_servico: string;
}

async function criarAgendamento(agendamento: NovoAgendamento) {
  const { data, error } = await supabase
    .from('agendamentos')
    .insert([{
      ...agendamento,
      status: 'pendente',
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar agendamento:', error);
    return null;
  }

  return data;
}
```

#### Atualizar Status do Agendamento

```typescript
async function atualizarStatusAgendamento(id: string, novoStatus: string) {
  const { data, error } = await supabase
    .from('agendamentos')
    .update({
      status: novoStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return null;
  }

  return data;
}
```

### Projetos

#### Buscar Projetos por Status

```typescript
async function buscarProjetosPorStatus(status: string) {
  const { data, error } = await supabase
    .from('projetos')
    .select(`
      *,
      agendamentos (cliente_id, clientes (nome))
    `)
    .eq('status', status)
    .order('data_inicio', { ascending: false });

  if (error) {
    console.error('Erro ao buscar projetos:', error);
    return [];
  }

  return data;
}
```

#### Atualizar Progresso do Projeto

```typescript
async function atualizarProgressoProjeto(
  id: string,
  progresso: number,
  gasto: number
) {
  const { data, error } = await supabase
    .from('projetos')
    .update({
      progresso_percentual: progresso,
      gasto_atual: gasto,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar projeto:', error);
    return null;
  }

  return data;
}
```

### Materiais

#### Buscar Materiais com Estoque Baixo

```typescript
async function buscarMateriaisEstoqueBaixo(limite: number = 10) {
  const { data, error } = await supabase
    .from('materiais')
    .select('*')
    .lte('quantidade_estoque', limite)
    .eq('ativo', true)
    .order('quantidade_estoque', { ascending: true });

  if (error) {
    console.error('Erro ao buscar materiais:', error);
    return [];
  }

  return data;
}
```

#### Registrar Uso de Material

```typescript
async function registrarUsoMaterial(
  projeto_id: string,
  material_id: string,
  quantidade: number
) {
  // Registrar uso
  const { error: erroUso } = await supabase
    .from('materiais_projetos')
    .insert([{
      projeto_id,
      material_id,
      quantidade_usada: quantidade,
      data_uso: new Date().toISOString(),
    }]);

  if (erroUso) {
    console.error('Erro ao registrar uso:', erroUso);
    return false;
  }

  // Atualizar estoque
  const { data: material } = await supabase
    .from('materiais')
    .select('quantidade_estoque')
    .eq('id', material_id)
    .single();

  if (material) {
    const novaQuantidade = material.quantidade_estoque - quantidade;
    await supabase
      .from('materiais')
      .update({ quantidade_estoque: novaQuantidade })
      .eq('id', material_id);
  }

  return true;
}
```

### Financeiro

#### Buscar Transações por Período

```typescript
async function buscarTransacoesPorPeriodo(
  dataInicio: string,
  dataFim: string
) {
  const { data, error } = await supabase
    .from('transacoes')
    .select('*')
    .gte('data_transacao', dataInicio)
    .lte('data_transacao', dataFim)
    .order('data_transacao', { ascending: false });

  if (error) {
    console.error('Erro ao buscar transações:', error);
    return [];
  }

  return data;
}
```

#### Calcular Resumo Financeiro

```typescript
async function calcularResumoFinanceiro(mes: number, ano: number) {
  const dataInicio = new Date(ano, mes - 1, 1).toISOString();
  const dataFim = new Date(ano, mes, 0).toISOString();

  const { data, error } = await supabase
    .from('transacoes')
    .select('tipo, valor')
    .gte('data_transacao', dataInicio)
    .lte('data_transacao', dataFim);

  if (error) {
    console.error('Erro ao calcular resumo:', error);
    return null;
  }

  const receita = data
    .filter((t) => t.tipo === 'receita')
    .reduce((sum, t) => sum + t.valor, 0);

  const despesa = data
    .filter((t) => t.tipo === 'despesa')
    .reduce((sum, t) => sum + t.valor, 0);

  return {
    receita,
    despesa,
    lucro: receita - despesa,
  };
}
```

## 🔄 Real-time Subscriptions

### Monitorar Mudanças em Clientes

```typescript
import { RealtimeChannel } from '@supabase/supabase-js';

export function monitorarClientes(
  callback: (evento: any) => void
): RealtimeChannel {
  return supabase
    .channel('clientes-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'clientes',
      },
      (payload) => callback(payload)
    )
    .subscribe();
}
```

### Usar em React

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados iniciais
    buscarClientes().then((data) => {
      setClientes(data);
      setLoading(false);
    });

    // Monitorar mudanças
    const subscription = supabase
      .channel('clientes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clientes',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setClientes([...clientes, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setClientes(
              clientes.map((c) =>
                c.id === payload.new.id ? payload.new : c
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setClientes(clientes.filter((c) => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { clientes, loading };
}
```

## 🔐 Segurança

### Row Level Security (RLS)

Configure RLS no Supabase para proteger dados:

```sql
-- Exemplo: Apenas o proprietário pode ver seus clientes
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own clients"
  ON clientes
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own clients"
  ON clientes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 🚀 Deployment

Ao fazer deploy:

1. Configure as variáveis de ambiente no GitHub Actions
2. Certifique-se de que o Supabase está acessível
3. Teste as conexões antes de fazer push

## 📚 Recursos Adicionais

- [Documentação Supabase JS](https://supabase.com/docs/reference/javascript)
- [Exemplos de Supabase](https://github.com/supabase/supabase/tree/master/examples)
- [Guia de Segurança](https://supabase.com/docs/guides/auth)

---

**Última atualização: Fevereiro 2026**
