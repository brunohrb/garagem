import Layout from '@/components/Layout';
import { Plus } from 'lucide-react';

/**
 * Página de Materiais
 * Gerenciamento de estoque de materiais
 */

export default function Materiais() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl md:text-4xl">Materiais</h2>
          <button className="btn-artistic primary flex items-center gap-2">
            <Plus size={20} />
            Novo Material
          </button>
        </div>

        <div className="card-colored gold p-12 text-center">
          <p className="text-lg text-muted-foreground mb-4">Funcionalidade em desenvolvimento</p>
          <p className="text-sm text-muted-foreground">
            Aqui você poderá gerenciar o estoque de tintas, pincéis e outros materiais
          </p>
        </div>
      </div>
    </Layout>
  );
}
