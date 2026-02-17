/* Utilitários para integração com Supabase */

/**
 * INSTRUÇÕES DE CONFIGURAÇÃO DO SUPABASE:
 * 
 * 1. Crie um projeto em https://supabase.com
 * 2. Copie a URL e a chave anônima do projeto
 * 3. Crie um arquivo .env.local na raiz do projeto com:
 *    VITE_SUPABASE_URL=sua_url_aqui
 *    VITE_SUPABASE_ANON_KEY=sua_chave_aqui
 * 
 * 4. Execute o script SQL abaixo no editor SQL do Supabase para criar as tabelas
 */

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

/**
 * Script SQL para criar as tabelas no Supabase
 * Execute isso no editor SQL do Supabase
 */
export const SQL_SCHEMA = `
-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT UNIQUE,
  telefone TEXT,
  endereco TEXT,
  cidade TEXT,
  estado TEXT,
  cep TEXT,
  cpf_cnpj TEXT UNIQUE,
  data_cadastro TIMESTAMP DEFAULT NOW(),
  ativo BOOLEAN DEFAULT true,
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  data_agendamento TIMESTAMP NOT NULL,
  data_inicio TIMESTAMP NOT NULL,
  data_fim TIMESTAMP,
  tipo_servico TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'pendente',
  valor_estimado DECIMAL(10, 2),
  valor_final DECIMAL(10, 2),
  endereco_servico TEXT,
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Projetos
CREATE TABLE IF NOT EXISTS projetos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agendamento_id UUID REFERENCES agendamentos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'planejamento',
  data_inicio TIMESTAMP,
  data_fim_prevista TIMESTAMP,
  data_fim_real TIMESTAMP,
  responsavel TEXT,
  equipe TEXT[],
  orcamento DECIMAL(10, 2),
  gasto_atual DECIMAL(10, 2) DEFAULT 0,
  progresso_percentual INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Materiais
CREATE TABLE IF NOT EXISTS materiais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  categoria TEXT,
  descricao TEXT,
  quantidade_estoque DECIMAL(10, 2),
  unidade TEXT,
  preco_unitario DECIMAL(10, 2),
  fornecedor TEXT,
  data_aquisicao TIMESTAMP,
  data_validade TIMESTAMP,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Materiais por Projeto
CREATE TABLE IF NOT EXISTS materiais_projetos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID REFERENCES projetos(id) ON DELETE CASCADE,
  material_id UUID REFERENCES materiais(id) ON DELETE CASCADE,
  quantidade_usada DECIMAL(10, 2),
  data_uso TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Transações Financeiras
CREATE TABLE IF NOT EXISTS transacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT,
  valor DECIMAL(10, 2) NOT NULL,
  data_transacao TIMESTAMP DEFAULT NOW(),
  data_pagamento TIMESTAMP,
  status TEXT DEFAULT 'pendente',
  projeto_id UUID REFERENCES projetos(id),
  cliente_id UUID REFERENCES clientes(id),
  notas TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Relatórios
CREATE TABLE IF NOT EXISTS relatorios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,
  periodo_inicio TIMESTAMP NOT NULL,
  periodo_fim TIMESTAMP NOT NULL,
  receita_total DECIMAL(10, 2),
  despesa_total DECIMAL(10, 2),
  lucro_liquido DECIMAL(10, 2),
  projetos_concluidos INTEGER,
  clientes_atendidos INTEGER,
  gerado_em TIMESTAMP DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_agendamentos_cliente ON agendamentos(cliente_id);
CREATE INDEX idx_agendamentos_status ON agendamentos(status);
CREATE INDEX idx_projetos_agendamento ON projetos(agendamento_id);
CREATE INDEX idx_projetos_status ON projetos(status);
CREATE INDEX idx_materiais_categoria ON materiais(categoria);
CREATE INDEX idx_transacoes_tipo ON transacoes(tipo);
CREATE INDEX idx_transacoes_data ON transacoes(data_transacao);
`;

/**
 * Função para inicializar o cliente Supabase
 * Retorna um cliente configurado ou null se as credenciais não estiverem definidas
 */
export function initSupabaseClient() {
  if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.warn('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.local');
    return null;
  }

  // Aqui você importaria e inicializaria o cliente Supabase
  // import { createClient } from '@supabase/supabase-js';
  // return createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  
  return null;
}

/**
 * Funções auxiliares para operações comuns com Supabase
 */
export const SupabaseHelpers = {
  /**
   * Formata data para o padrão ISO
   */
  formatDate: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString();
  },

  /**
   * Converte valor monetário para decimal
   */
  formatMoney: (value: number): number => {
    return Math.round(value * 100) / 100;
  },

  /**
   * Gera um ID único (UUID v4)
   */
  generateId: (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
};

/**
 * Tipos de erro personalizados para Supabase
 */
export class SupabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'SupabaseError';
  }
}
