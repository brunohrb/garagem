import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '@/components/Layout';

/**
 * Dashboard - Página Principal
 * Exibe estatísticas, gráficos e informações gerais
 * Design Artístico Contemporâneo com cores vibrantes
 */

export default function Dashboard() {
  // Dados simulados - Substituir com dados reais do Supabase
  const stats = [
    { label: 'Agendamentos Próximos', value: 12, icon: '📅', color: 'orange' },
    { label: 'Projetos em Andamento', value: 5, icon: '🎨', color: 'blue' },
    { label: 'Clientes Total', value: 48, icon: '👥', color: 'gold' },
    { label: 'Receita Mês', value: 'R$ 15.200', icon: '💰', color: 'rose' },
  ];

  const chartDataReceita = [
    { mes: 'Jan', receita: 8000, despesa: 3000 },
    { mes: 'Fev', receita: 12000, despesa: 4500 },
    { mes: 'Mar', receita: 15200, despesa: 5000 },
    { mes: 'Abr', receita: 11000, despesa: 4000 },
    { mes: 'Mai', receita: 18500, despesa: 6000 },
    { mes: 'Jun', receita: 16800, despesa: 5500 },
  ];

  const chartDataProjetos = [
    { name: 'Concluídos', value: 24, color: '#FF6B35' },
    { name: 'Em Andamento', value: 5, color: '#004E89' },
    { name: 'Planejamento', value: 8, color: '#F7B801' },
    { name: 'Cancelados', value: 2, color: '#E63946' },
  ];

  const projetosRecentes = [
    { id: 1, nome: 'Pintura Residencial - Apto 301', cliente: 'João Silva', status: 'em_andamento', progresso: 65 },
    { id: 2, nome: 'Fachada Comercial - Loja Centro', cliente: 'Maria Santos', status: 'planejamento', progresso: 10 },
    { id: 3, nome: 'Restauração - Casa Histórica', cliente: 'Carlos Oliveira', status: 'em_andamento', progresso: 45 },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      em_andamento: 'bg-orange-500 text-white',
      planejamento: 'bg-yellow-500 text-gray-900',
      concluido: 'bg-green-500 text-white',
      cancelado: 'bg-red-500 text-white',
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`card-colored ${stat.color} animate-slide-in-up`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Receita vs Despesa */}
          <div className="lg:col-span-2 card-colored blue p-6">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-2xl md:text-3xl mb-6 text-foreground">Receita vs Despesa</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartDataReceita}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,107,53,0.1)" />
                <XAxis dataKey="mes" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,107,53,0.9)',
                    border: '2px solid #FF6B35',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="receita" fill="#FF6B35" radius={[8, 8, 0, 0]} />
                <Bar dataKey="despesa" fill="#E63946" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza - Status dos Projetos */}
          <div className="card-colored gold p-6">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-2xl md:text-3xl mb-6 text-foreground">Status dos Projetos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartDataProjetos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartDataProjetos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projetos Recentes */}
        <div className="card-colored rose p-6">
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-2xl md:text-3xl mb-6 text-foreground">Projetos Recentes</h3>
          <div className="space-y-4">
            {projetosRecentes.map((projeto) => (
              <div key={projeto.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{projeto.nome}</h4>
                  <p className="text-sm text-muted-foreground">{projeto.cliente}</p>
                  <div className="mt-2 w-full bg-border rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${projeto.progresso}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="text-sm font-medium text-muted-foreground">{projeto.progresso}%</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(projeto.status)}`}>
                    {projeto.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="btn-artistic primary w-full py-4 text-lg">
            ➕ Novo Agendamento
          </button>
          <button className="btn-artistic secondary w-full py-4 text-lg">
            ➕ Novo Cliente
          </button>
          <button className="btn-artistic outline w-full py-4 text-lg">
            📊 Gerar Relatório
          </button>
        </div>
      </div>
    </Layout>
  );
}
