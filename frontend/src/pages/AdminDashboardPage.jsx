import { useState } from 'react';
import { Users, AlertOctagon, Activity, FileText, ShieldAlert } from 'lucide-react';

export default function AdminDashboardPage() {
  // Simulando autenticación:
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Datos mockeados de la tabla
  const mockReports = [
    { id: 'REP-2026-001', tipo: 'Abandono', ubicacion: 'Centro Histórico', fecha: '06/05/2026', estatus: 'En Proceso', urgencia: 'Normal' },
    { id: 'REP-2026-002', tipo: 'Violencia', ubicacion: 'Villas del Pedregal', fecha: '06/05/2026', estatus: 'Recibido', urgencia: 'Crítica' },
    { id: 'REP-2026-003', tipo: 'Desnutrición', ubicacion: 'Chapultepec', fecha: '05/05/2026', estatus: 'Resuelto', urgencia: 'Alta' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Contraseña incorrecta (Usa: admin123)');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
          <div className="text-center mb-6">
            <ShieldAlert className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Acceso IMPA</h2>
            <p className="text-sm text-gray-500">Panel de Control Administrativo</p>
          </div>
          <input 
            type="password" 
            placeholder="Contraseña (admin123)" 
            className="w-full border-gray-300 rounded-lg shadow-sm p-3 bg-gray-50 border outline-none mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-500">Gestión de Reportes y Mapeo del IMPA</p>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition">
          Cerrar Sesión
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Denuncias" value="128" icon={<FileText className="w-6 h-6 text-blue-600"/>} bg="bg-blue-50" />
        <MetricCard title="Casos Críticos" value="12" icon={<AlertOctagon className="w-6 h-6 text-red-600"/>} bg="bg-red-50" />
        <MetricCard title="En Proceso" value="45" icon={<Activity className="w-6 h-6 text-yellow-600"/>} bg="bg-yellow-50" />
        <MetricCard title="Agresores Reg." value="8" icon={<Users className="w-6 h-6 text-purple-600"/>} bg="bg-purple-50" />
      </div>

      {/* Tabla de Reportes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Últimas Denuncias Recibidas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Folio</th>
                <th className="px-6 py-4">Tipo de Incidente</th>
                <th className="px-6 py-4">Ubicación</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estatus</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">{report.id}</td>
                  <td className="px-6 py-4">
                    <span className="text-gray-800 font-medium">{report.tipo}</span>
                    {report.urgencia === 'Crítica' && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800">Crítico</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{report.ubicacion}</td>
                  <td className="px-6 py-4 text-gray-600">{report.fecha}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      report.estatus === 'Resuelto' ? 'bg-green-100 text-green-800' :
                      report.estatus === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {report.estatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-900 font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg transition">Ver Detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, bg }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center hover:-translate-y-1 transition-transform duration-300">
      <div className={`p-4 rounded-xl ${bg} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}
