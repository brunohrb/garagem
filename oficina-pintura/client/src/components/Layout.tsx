import { useState } from 'react';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { Link, useLocation } from 'wouter';

/**
 * Layout Principal - Design Artístico Contemporâneo
 * Sidebar esquerda com navegação vertical
 * Suporta tema claro/escuro
 */

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location] = useLocation();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/clientes', label: 'Clientes', icon: '👥' },
    { href: '/agendamentos', label: 'Agendamentos', icon: '📅' },
    { href: '/projetos', label: 'Projetos', icon: '🎨' },
    { href: '/materiais', label: 'Materiais', icon: '🛠️' },
    { href: '/financeiro', label: 'Financeiro', icon: '💰' },
    { href: '/relatorios', label: 'Relatórios', icon: '📈' },
  ];

  const isActive = (href: string) => location === href;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col border-r-2 border-sidebar-border shadow-lg`}
      >
        {/* Header da Sidebar */}
        <div className="p-6 border-b-2 border-sidebar-border flex items-center justify-between">
          {sidebarOpen && (
              <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sidebar-accent rounded-lg flex items-center justify-center text-lg font-bold">
                🎨
              </div>
              <div className="flex flex-col">
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-lg">Oficina</h1>
                <p className="text-xs opacity-75">Pintura</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sidebar-accent/20 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-md'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </a>
            </Link>
          ))}
        </nav>

        {/* Footer da Sidebar */}
        <div className="p-4 border-t-2 border-sidebar-border space-y-2">
          <button
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-sidebar-accent/10 transition-colors"
            title="Configurações"
          >
            <Settings size={20} />
            {sidebarOpen && <span className="text-sm">Configurações</span>}
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
            title="Sair"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b-2 border-border shadow-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }} className="text-3xl md:text-4xl text-foreground">
                {navItems.find((item) => isActive(item.href))?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                👤
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
