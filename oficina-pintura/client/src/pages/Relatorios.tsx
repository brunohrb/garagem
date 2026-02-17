import Layout from '@/components/Layout';
import { Download } from 'lucide-react';

/**
 * Página de Relatórios
 * Geração de relatórios financeiros e operacionais
 */

export default function Relatorios() {
  return (
    <Layout>
      <div className="space-y-6">
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl md:text-4xl">Relatórios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-colored orange p-6">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-2xl md:text-3xl mb-4">Relatório Financeiro</h3>
            <p className="text-muted-foreground mb-4">
              Gere relatórios detalhados de receitas, despesas e lucro
            </p>
            <button className="btn-artistic primary w-full flex items-center justify-center gap-2">
              <Download size={20} />
              Gerar Relatório
            </button>
          </div>

          <div className="card-colored blue p-6">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-2xl md:text-3xl mb-4">Relatório de Projetos</h3>
            <p className="text-muted-foreground mb-4">
              Analise o desempenho e progresso dos seus projetos
            </p>
            <button className="btn-artistic secondary w-full flex items-center justify-center gap-2">
              <Download size={20} />
              Gerar Relatório
            </button>
          </div>

          <div className="card-colored gold p-6">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-2xl md:text-3xl mb-4">Relatório de Clientes</h3>
            <p className="text-muted-foreground mb-4">
              Veja dados sobre seus clientes e histórico de serviços
            </p>
            <button className="btn-artistic outline w-full flex items-center justify-center gap-2">
              <Download size={20} />
              Gerar Relatório
            </button>
          </div>

          <div className="card-colored rose p-6">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-2xl md:text-3xl mb-4">Relatório de Materiais</h3>
            <p className="text-muted-foreground mb-4">
              Acompanhe o uso e estoque de materiais
            </p>
            <button className="btn-artistic outline w-full flex items-center justify-center gap-2">
              <Download size={20} />
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
