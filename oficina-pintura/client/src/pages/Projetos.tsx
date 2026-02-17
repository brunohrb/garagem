import Layout from '@/components/Layout';
import { Plus } from 'lucide-react';

/**
 * Página de Projetos
 * Gerenciamento de projetos em andamento
 */

export default function Projetos() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl md:text-4xl">Projetos</h2>
          <button className="btn-artistic primary flex items-center gap-2">
            <Plus size={20} />
            Novo Projeto
          </button>
        </div>

        <div className="card-colored blue p-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">Funcionalidade em desenvolvimento</p>
          <p className="text-sm text-muted-foreground">
            Aqui você poderá gerenciar todos os seus projetos de pintura
          </p>
        </div>
      </div>
    </Layout>
  );
}
