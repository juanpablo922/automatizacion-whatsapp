import React, { useState } from 'react';
import { Advisor } from '../types';

interface RegisterAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (agent: Advisor) => void;
}

export const RegisterAgentModal: React.FC<RegisterAgentModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Especialista en recién nacidos');
  const [maxChats, setMaxChats] = useState(5);
  const [status, setStatus] = useState<'disponible' | 'ocupada' | 'pausa'>('disponible');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAdvisor: Advisor = {
      id: Date.now(),
      name: name.trim(),
      role,
      avatar: '',
      status,
      activeChats: 0,
      maxChats,
      responseTime: '< 30s inmediata',
    };

    onRegister(newAdvisor);
    setName('');
    setMaxChats(5);
    setStatus('disponible');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-enter"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[#00685d] font-bold">
            <div className="w-8 h-8 rounded-full bg-[#8ff4e3] flex items-center justify-center text-[#00201c]">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900">
              Registrar Asesora
            </h3>
          </div>
          <button
            aria-label="Cerrar modal"
            className="w-8 h-8 rounded-full text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-600 font-medium">Nombre Completo</label>
            <input
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-[#00685d] focus:bg-white transition-all"
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Camila Morales"
              required
              type="text"
              value={name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-600 font-medium">Rol Especializado</label>
            <select
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-[#00685d] transition-all"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="Especialista en recién nacidos">Especialista en recién nacidos</option>
              <option value="Atención Pauta Meta y Canastillas">Atención Pauta Meta y Canastillas</option>
              <option value="Asesora de Ventas WhatsApp VIP">Asesora de Ventas WhatsApp VIP</option>
              <option value="Supervisora de Atención">Supervisora de Atención</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-600 font-medium">Capacidad Máx.</label>
              <div className="relative flex items-center">
                <input
                  className="h-10 w-full px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-[#00685d] transition-all text-center font-bold"
                  max="15"
                  min="1"
                  onChange={(e) => setMaxChats(parseInt(e.target.value, 10) || 5)}
                  required
                  type="number"
                  value={maxChats}
                />
                <span className="absolute right-2 text-xs text-slate-400 pointer-events-none">chats</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-600 font-medium">Estado Inicial</label>
              <select
                className="h-10 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm outline-none focus:border-[#00685d]"
                onChange={(e) => setStatus(e.target.value as any)}
                value={status}
              >
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
                <option value="pausa">Pausa</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              className="h-9 px-4 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full hover:bg-slate-200 transition cursor-pointer"
              onClick={onClose}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="h-9 px-5 bg-[#006d2f] hover:bg-[#005322] text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition cursor-pointer"
              type="submit"
            >
              <span className="material-symbols-outlined text-[17px]">how_to_reg</span>
              <span>Guardar Asesora</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
