import Layout from '@/components/Layout';
import { Plus } from 'lucide-react';

/**
 * Página de Financeiro
 * Gerenciamento de receitas e despesas
 */

export default function Financeiro() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl md:text-4xl">Financeiro</h2>
          <button className="btn-artistic primary flex items-center gap-2">
            <Plus size={20} />
            Nova Transação
          </button>
        </div>

        <div className="card-colored rose p-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">Funcionalidade em desenvolvimento</p>
          <p className="text-sm text-muted-foreground">
            Aqui você poderá gerenciar todas as receitas e despesas da sua oficina
          </p>
        </div>
      </div>
    </Layout>
  );
}
