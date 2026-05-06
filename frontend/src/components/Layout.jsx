import { Link } from 'react-router-dom';
import { PawPrint, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <PawPrint className="h-8 w-8" />
            <span className="tracking-tight">Animalia Morelia</span>
          </Link>
          
          {/* Menú Desktop */}
          <nav className="hidden md:flex space-x-6 font-medium">
            <Link to="/denunciar" className="hover:text-blue-200 transition">Reportar Maltrato</Link>
            <Link to="/seguimiento" className="hover:text-blue-200 transition">Seguimiento</Link>
            <Link to="/admin" className="hover:text-blue-200 transition">Admin IMPA</Link>
          </nav>

          {/* Menú Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Menú Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-blue-700 px-4 pt-2 pb-4 space-y-2">
            <Link to="/denunciar" onClick={() => setMenuOpen(false)} className="block py-2 text-white font-medium border-b border-blue-500">Reportar Maltrato</Link>
            <Link to="/seguimiento" onClick={() => setMenuOpen(false)} className="block py-2 text-white font-medium border-b border-blue-500">Seguimiento</Link>
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="block py-2 text-white font-medium">Admin IMPA</Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Animalia Morelia. Sistema Municipal de Bienestar Animal.</p>
      </footer>
    </div>
  );
}
