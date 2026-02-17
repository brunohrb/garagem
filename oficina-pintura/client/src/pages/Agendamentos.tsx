import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, X } from 'lucide-react';
import Layout from '@/components/Layout';

/**
 * Página de Agendamentos
 * Listagem de agendamentos com filtros e adição de novos
 * Design Artístico Contemporâneo
 */

interface Agendamento {
  id: string;
  cliente: string;
  data: string;
  hora: string;
  servico: string;
  endereco: string;
  status: 'pendente' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado';
}

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    {
      id: '1',
      cliente: 'João Silva',
      data: '2026-02-20',
      hora: '09:00',
      servico: 'Pintura Residencial',
      endereco: 'Rua A, 123 - São Paulo, SP',
      status: 'confirmado',
    },
    {
      id: '2',
      cliente: 'Maria Santos',
      data: '2026-02-21',
      hora: '14:00',
      servico: 'Pintura Comercial',
      endereco: 'Av. B, 456 - São Paulo, SP',
      status: 'pendente',
    },
    {
      id: '3',
      cliente: 'Carlos Oliveira',
      data: '2026-02-22',
      hora: '10:00',
      servico: 'Restauração',
      endereco: 'Rua C, 789 - Rio de Janeiro, RJ',
      status: 'confirmado',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [formData, setFormData] = useState({
    cliente: '',
    data: '',
    hora: '',
    servico: '',
    endereco: '',
    status: 'pendente',
  });

  const filteredAgendamentos =
    filterStatus === 'todos'
      ? agendamentos
      : agendamentos.filter((a) => a.status === filterStatus);

  const handleAddAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    const novoAgendamento: Agendamento = {
      id: Date.now().toString(),
      ...formData,
      status: formData.status as any,
    };
    setAgendamentos([...agendamentos, novoAgendamento]);
    setFormData({
      cliente: '',
      data: '',
      hora: '',
      servico: '',
      endereco: '',
      status: 'pendente',
    });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pendente: 'bg-yellow-500 text-gray-900',
      confirmado: 'bg-green-500 text-white',
      em_andamento: 'bg-blue-500 text-white',
      concluido: 'bg-purple-500 text-white',
      cancelado: 'bg-red-500 text-white',
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pendente: 'Pendente',
      confirmado: 'Confirmado',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      cancelado: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header com Filtros e Botão */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {['todos', 'pendente', 'confirmado', 'em_andamento', 'concluido'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === status
                    ? 'btn-artistic primary'
                    : 'btn-artistic outline'
                }`}
              >
                {status === 'todos' ? 'Todos' : getStatusLabel(status)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-artistic primary flex items-center gap-2"
          >
            <Plus size={20} />
            Novo Agendamento
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="card-colored blue p-6 animate-fade-in-scale">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl md:text-4xl">Novo Agendamento</h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAgendamento} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome do Cliente"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  required
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  required
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
                <select
                  value={formData.servico}
                  onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                  required
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Selecione um serviço</option>
                  <option value="Pintura Residencial">Pintura Residencial</option>
                  <option value="Pintura Comercial">Pintura Comercial</option>
                  <option value="Pintura Fachada">Pintura Fachada</option>
                  <option value="Restauração">Restauração</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Endereço do Serviço"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
              />
              <div className="flex gap-4">
                <button type="submit" className="btn-artistic primary flex-1">
                  Agendar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-artistic outline flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Listagem de Agendamentos */}
        <div className="space-y-4">
          {filteredAgendamentos.length === 0 ? (
            <div className="card-colored rose p-12 text-center">
              <p className="text-lg text-muted-foreground">Nenhum agendamento encontrado</p>
            </div>
          ) : (
            filteredAgendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className="card-colored gold hover:shadow-xl transition-all p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {agendamento.servico}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={16} />
                        {agendamento.cliente}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={16} />
                        {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={16} />
                        {agendamento.hora}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={16} />
                        {agendamento.endereco}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold text-center ${getStatusColor(
                        agendamento.status
                      )}`}
                    >
                      {getStatusLabel(agendamento.status)}
                    </span>
                    <button className="btn-artistic outline text-sm py-2">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
