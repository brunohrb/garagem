/* Tipos compartilhados para Sistema de Gerenciamento de Oficina de Pintura */

/* ============ CLIENTES ============ */
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  cpf_cnpj?: string;
  data_cadastro: string;
  ativo: boolean;
  notas?: string;
}

/* ============ AGENDAMENTOS ============ */
export type TipoServico = 'pintura_residencial' | 'pintura_comercial' | 'pintura_fachada' | 'restauracao' | 'consultoria';
export type StatusAgendamento = 'pendente' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado';

export interface Agendamento {
  id: string;
  cliente_id: string;
  data_agendamento: string;
  data_inicio: string;
  data_fim?: string;
  tipo_servico: TipoServico;
  descricao: string;
  status: StatusAgendamento;
  valor_estimado: number;
  valor_final?: number;
  endereco_servico: string;
  notas?: string;
  criado_em: string;
  atualizado_em: string;
}

/* ============ PROJETOS ============ */
export type StatusProjeto = 'planejamento' | 'em_andamento' | 'pausado' | 'concluido' | 'cancelado';

export interface Projeto {
  id: string;
  agendamento_id: string;
  nome: string;
  descricao: string;
  status: StatusProjeto;
  data_inicio: string;
  data_fim_prevista: string;
  data_fim_real?: string;
  responsavel: string;
  equipe: string[];
  orcamento: number;
  gasto_atual: number;
  progresso_percentual: number;
  criado_em: string;
  atualizado_em: string;
}

/* ============ MATERIAIS ============ */
export interface Material {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  quantidade_estoque: number;
  unidade: 'litro' | 'kg' | 'unidade' | 'metro';
  preco_unitario: number;
  fornecedor: string;
  data_aquisicao: string;
  data_validade?: string;
  ativo: boolean;
}

export interface MaterialProjeto {
  id: string;
  projeto_id: string;
  material_id: string;
  quantidade_usada: number;
  data_uso: string;
}

/* ============ FINANCEIRO ============ */
export type TipoTransacao = 'receita' | 'despesa';
export type CategoriaFinanceira = 'servico' | 'material' | 'salario' | 'aluguel' | 'utilidades' | 'outro';

export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  categoria: CategoriaFinanceira;
  descricao: string;
  valor: number;
  data_transacao: string;
  data_pagamento?: string;
  status: 'pendente' | 'pago' | 'cancelado';
  projeto_id?: string;
  cliente_id?: string;
  notas?: string;
  criado_em: string;
}

export interface Relatorio {
  id: string;
  tipo: 'mensal' | 'trimestral' | 'anual';
  periodo_inicio: string;
  periodo_fim: string;
  receita_total: number;
  despesa_total: number;
  lucro_liquido: number;
  projetos_concluidos: number;
  clientes_atendidos: number;
  gerado_em: string;
}

/* ============ USUÁRIOS ============ */
export type RoleUsuario = 'admin' | 'gerente' | 'pintor' | 'cliente';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  role: RoleUsuario;
  ativo: boolean;
  data_cadastro: string;
  ultimo_acesso?: string;
}

/* ============ DASHBOARD ============ */
export interface DashboardStats {
  agendamentos_proximos: number;
  projetos_em_andamento: number;
  clientes_total: number;
  receita_mes: number;
  despesa_mes: number;
  lucro_mes: number;
  taxa_conclusao: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}
