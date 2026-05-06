import { useState } from 'react';
import { Camera, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CrearDenunciaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: '',
    lat: '',
    lng: ''
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulación de Geolocation (Esto lo terminará Persona 3)
  const handleGetLocation = () => {
    setFormData({ ...formData, lat: '19.7027', lng: '-101.1923' });
    alert("Ubicación de Morelia capturada exitosamente (Simulación GPS)");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de petición a la API
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Denuncia registrada! Tu folio único es: REP-2026-001");
      navigate('/seguimiento');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Nueva Denuncia</h2>
          <p className="text-blue-100 text-sm mt-1">Tu reporte puede salvar una vida. Proporciona todos los detalles posibles.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Maltrato */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Incidente *</label>
            <select 
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border outline-none"
              value={formData.tipo}
              onChange={(e) => setFormData({...formData, tipo: e.target.value})}
            >
              <option value="">Selecciona una opción...</option>
              <option value="abandono">Abandono en vía pública o azotea</option>
              <option value="violencia">Violencia física / Golpes</option>
              <option value="desnutricion">Desnutrición severa / Falta de agua</option>
              <option value="sobrepoblacion">Acumulación de animales / Sobrepoblación</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción de los hechos *</label>
            <textarea 
              required
              rows="4" 
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border outline-none"
              placeholder="Describe detalladamente qué sucedió, colores del animal, o si el agresor está identificado."
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            ></textarea>
          </div>

          {/* Ubicación Simulada */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ubicación del incidente *</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly
                placeholder="Coordenadas Lat / Lng" 
                value={formData.lat ? `${formData.lat}, ${formData.lng}` : ''}
                className="flex-1 border-gray-300 rounded-lg shadow-sm p-3 bg-gray-100 border text-gray-500 outline-none"
              />
              <button 
                type="button" 
                onClick={handleGetLocation}
                className="px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium flex items-center gap-2 transition"
              >
                <MapPin className="w-5 h-5" />
                Obtener GPS
              </button>
            </div>
          </div>

          {/* Evidencia */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Evidencia Fotográfica (Opcional)</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 font-medium">
                  {file ? file.name : "Toca aquí para subir foto o video"}
                </p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Procesando Reporte...' : (
              <>
                <Send className="w-5 h-5" />
                Generar Folio de Denuncia
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
