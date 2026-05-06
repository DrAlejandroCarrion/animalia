import { useState } from 'react';
import { Search, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function SeguimientoPage() {
  const [folio, setFolio] = useState('');
  const [resultado, setResultado] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!folio) return;
    
    setIsSearching(true);
    // Simular llamada a la API
    setTimeout(() => {
      setIsSearching(false);
      // Data simulada
      if (folio.toUpperCase() === 'REP-2026-001') {
        setResultado({
          folio: 'REP-2026-001',
          fecha: '06/05/2026',
          estatus: 'EN_PROCESO',
          comentarios_impa: 'Un inspector ha sido asignado a la zona. Estamos recolectando información adicional.',
          tipo: 'Abandono'
        });
      } else {
        setResultado({ error: 'No se encontró ninguna denuncia con este folio.' });
      }
    }, 1000);
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case 'RECIBIDO': return { icon: <Clock className="w-8 h-8 text-blue-500"/>, color: 'bg-blue-100 text-blue-800', label: 'Recibido' };
      case 'EN_PROCESO': return { icon: <Search className="w-8 h-8 text-yellow-500"/>, color: 'bg-yellow-100 text-yellow-800', label: 'En Proceso' };
      case 'RESUELTO': return { icon: <CheckCircle className="w-8 h-8 text-green-500"/>, color: 'bg-green-100 text-green-800', label: 'Resuelto' };
      default: return { icon: <AlertTriangle className="w-8 h-8 text-gray-500"/>, color: 'bg-gray-100 text-gray-800', label: 'Desconocido' };
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900">Seguimiento de Denuncia</h2>
        <p className="text-gray-600 mt-2">Ingresa tu Folio Único para conocer el estatus de tu reporte.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Ej. REP-2026-001" 
            className="flex-1 border-gray-300 rounded-xl shadow-sm p-4 bg-gray-50 border outline-none font-mono text-lg uppercase"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={isSearching}
            className="px-8 py-4 sm:py-0 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSearching ? 'Buscando...' : (
              <>
                <Search className="w-5 h-5" />
                Consultar
              </>
            )}
          </button>
        </form>
      </div>

      {resultado && !resultado.error && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Folio de Reporte</p>
              <h3 className="text-2xl font-black text-gray-900 font-mono">{resultado.folio}</h3>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${getStatusConfig(resultado.estatus).color}`}>
              {getStatusConfig(resultado.estatus).icon}
              {getStatusConfig(resultado.estatus).label}
            </div>
          </div>
          <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-500">Fecha de Registro</p>
              <p className="text-gray-800 font-medium">{resultado.fecha}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Tipo de Incidente</p>
              <p className="text-gray-800 font-medium">{resultado.tipo}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-gray-500">Comentarios del IMPA</p>
              <div className="mt-2 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-900">
                {resultado.comentarios_impa}
              </div>
            </div>
          </div>
        </div>
      )}

      {resultado && resultado.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center font-medium flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <AlertTriangle className="w-8 h-8" />
          {resultado.error}
        </div>
      )}
    </div>
  );
}
