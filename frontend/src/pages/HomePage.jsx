import { Link } from 'react-router-dom';
import { ShieldAlert, Search } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
          Protege a los animales de <span className="text-blue-600">Morelia</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Plataforma ciudadana para la prevención del maltrato animal. Denuncia de manera rápida, segura y dale seguimiento a tus reportes.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Link 
            to="/denunciar" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-lg shadow-blue-200"
          >
            <ShieldAlert className="w-6 h-6" />
            Reportar Maltrato
          </Link>
          <Link 
            to="/seguimiento" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-sm"
          >
            <Search className="w-6 h-6" />
            Consultar mi Reporte
          </Link>
        </div>
      </div>
    </div>
  );
}
