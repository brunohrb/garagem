import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';

/**
 * Página de Clientes
 * Listagem, busca, adição e edição de clientes
 * Design Artístico Contemporâneo
 */

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  ativo: boolean;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 98765-4321',
      cidade: 'São Paulo',
      estado: 'SP',
      ativo: true,
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 99876-5432',
      cidade: 'São Paulo',
      estado: 'SP',
      ativo: true,
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos@email.com',
      telefone: '(21) 98765-4321',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      ativo: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
  });

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCliente = (e: React.FormEvent) => {
    e.preventDefault();
    const novoCliente: Cliente = {
      id: Date.now().toString(),
      ...formData,
      ativo: true,
    };
    setClientes([...clientes, novoCliente]);
    setFormData({ nome: '', email: '', telefone: '', cidade: '', estado: '' });
    setShowForm(false);
  };

  const handleDeleteCliente = (id: string) => {
    setClientes(clientes.filter((c) => c.id !== id));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header com Busca e Botão */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Buscar cliente por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-artistic primary flex items-center gap-2"
          >
            <Plus size={20} />
            Novo Cliente
          </button>
        </div>

        {/* Formulário de Novo Cliente */}
        {showForm && (
          <div className="card-colored orange p-6 animate-fade-in-scale">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl md:text-4xl">Adicionar Novo Cliente</h3>
            <form onSubmit={handleAddCliente} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-artistic primary flex-1">
                  Salvar Cliente
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

        {/* Listagem de Clientes */}
        <div className="grid gap-4">
          {filteredClientes.length === 0 ? (
            <div className="card-colored blue p-12 text-center">
              <p className="text-lg text-muted-foreground">Nenhum cliente encontrado</p>
            </div>
          ) : (
            filteredClientes.map((cliente) => (
              <div
                key={cliente.id}
                className="card-colored gold hover:shadow-xl transition-all p-6 flex items-start justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{cliente.nome}</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail size={16} />
                      {cliente.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone size={16} />
                      {cliente.telefone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      {cliente.cidade}, {cliente.estado}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                    title="Editar"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteCliente(cliente.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
                    title="Deletar"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
