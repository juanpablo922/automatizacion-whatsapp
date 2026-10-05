import React, { useState } from 'react';
import { Advisor } from '../types';

interface Step3AutoResponderProps {
  advisors: Advisor[];
  onCycleStatus: (id: number) => void;
  onAdjustChats: (id: number, delta: number) => void;
  onOpenRegisterModal: () => void;
  routingMode: 'round_robin' | 'least_load';
  setRoutingMode: (mode: 'round_robin' | 'least_load') => void;
  keywords: string[];
  onAddKeyword: (word: string) => void;
  onRemoveKeyword: (word: string) => void;
  onNext: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const Step3AutoResponder: React.FC<Step3AutoResponderProps> = ({
  advisors,
  onCycleStatus,
  onAdjustChats,
  onOpenRegisterModal,
  routingMode,
  setRoutingMode,
  keywords,
  onAddKeyword,
  onRemoveKeyword,
  onNext,
  onToast,
}) => {
  const [triggerBtn, setTriggerBtn] = useState(true);
  const [triggerKeywords, setTriggerKeywords] = useState(true);
  const [triggerAmount, setTriggerAmount] = useState(true);
  const [soundPriority, setSoundPriority] = useState(true);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<0 | 1 | 2 | 3>(0);

  const activeAdvisorsCount = advisors.filter((a) => a.status === 'disponible').length;

  const handleSimulateHandoff = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    onToast('Simulando relevo automático...', 'play_circle');

    setTimeout(() => {
      setSimStep(2);
      setTimeout(() => {
        setSimStep(3);
        setIsSimulating(false);
        onToast('¡Handoff transferido con éxito en 1.8 segundos!', 'verified');
      }, 1000);
    }, 800);
  };

  const promptAddKeyword = () => {
    const word = window.prompt(
      'Ingresa la nueva palabra clave para activar relevo (ej: algodón, canastilla, tarjeta):'
    );
    if (word && word.trim()) {
      onAddKeyword(word.trim().toLowerCase());
      onToast(`Palabra clave agregada: "${word.trim().toLowerCase()}"`, 'label');
    }
  };

  const getStatusBadge = (status: Advisor['status']) => {
    switch (status) {
      case 'disponible':
        return {
          label: 'Disponible',
          classes: 'bg-[#5dfd8a]/40 text-[#005322] border border-[#006d2f]/20',
          dot: 'bg-[#006d2f]',
        };
      case 'ocupada':
        return {
          label: 'Ocupada',
          classes: 'bg-amber-100 text-amber-900 border border-amber-300',
          dot: 'bg-amber-500',
        };
      case 'pausa':
        return {
          label: 'Pausa',
          classes: 'bg-slate-200 text-slate-700 border border-slate-300',
          dot: 'bg-slate-400',
        };
    }
  };

  return (
    <div className="flex flex-col w-full pb-10 bg-[#f6faff] min-h-screen text-[#141d23]">
      <div className="p-4 flex flex-col gap-4">
        {/* Progress Stepper Header */}
        <div className="bg-[#ecf5fe] rounded-xl p-3.5 shadow-xs border border-slate-200/60 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#00685d] text-white text-[11px] font-bold">
                Paso 3 de 4
              </span>
              <span className="text-[11px] text-slate-600 font-medium">Asignación & Handoff</span>
            </div>
            <span className="text-xs font-bold text-[#00685d]">75% Completado</span>
          </div>

          {/* Segmented Bar (3 of 4) */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex gap-1 p-0.5">
            <div className="bg-[#00685d] h-full flex-1 rounded-full"></div>
            <div className="bg-[#00685d] h-full flex-1 rounded-full"></div>
            <div className="bg-[#00685d] h-full flex-1 rounded-full"></div>
            <div className="bg-slate-300 h-full flex-1 rounded-full"></div>
          </div>

          <p className="text-xs text-slate-600 mt-0.5">
            Conecta a tus asesoras humanas para relevar la atención cuando el bot detecte una intención de compra o solicitud directa.
          </p>
        </div>

        {/* Quick Action / Add Agent Trigger Card */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8ff4e3] flex items-center justify-center text-[#00201c]">
              <span className="material-symbols-outlined text-[22px]">person_add</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-heading font-bold text-sm text-slate-900">
                Gestión de Asesoras
              </h2>
              <span className="text-[11px] text-slate-500">
                Invita a tu equipo al panel multiagente
              </span>
            </div>
          </div>

          <button
            onClick={onOpenRegisterModal}
            className="h-9 px-3.5 bg-[#006d2f] hover:bg-[#005322] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">add</span>
            <span>Registrar</span>
          </button>
        </div>

        {/* Active Connected Agents List */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <span>Consola de Asesoras en Línea</span>
              <span className="px-2 py-0.5 rounded-full bg-[#5dfd8a]/40 text-[#005322] text-[10px] font-bold border border-[#006d2f]/20">
                {activeAdvisorsCount} Activa{activeAdvisorsCount === 1 ? '' : 's'}
              </span>
            </h3>
            <span className="text-[11px] text-[#00685d] flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
              <span>En vivo</span>
            </span>
          </div>

          <p className="text-[11px] text-slate-500 px-1 -mt-0.5">
            Toca el estado de cada asesora para cambiar entre <strong>Disponible</strong>,{' '}
            <strong>Ocupada</strong> o <strong>Pausa</strong>. Ajusta chats con +/-.
          </p>

          <div className="flex flex-col gap-2.5">
            {advisors.map((adv) => {
              const statusInfo = getStatusBadge(adv.status);
              return (
                <div
                  key={adv.id}
                  className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/70 flex items-start gap-3 relative transition hover:border-[#00685d]"
                >
                  <div className="relative shrink-0">
                    {adv.avatar ? (
                      <img
                        alt={adv.name}
                        className="w-12 h-12 rounded-full object-cover shadow-xs"
                        src={adv.avatar}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#8ff4e3] text-[#00201c] flex items-center justify-center font-bold text-sm shadow-xs font-heading">
                        {adv.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs ${statusInfo.dot}`}
                    ></span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {adv.name}
                      </h4>
                      <button
                        onClick={() => onCycleStatus(adv.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap flex items-center gap-1 active:scale-95 transition cursor-pointer ${statusInfo.classes}`}
                        title="Clic para cambiar estado"
                        type="button"
                      >
                        <span>{statusInfo.label}</span>
                        <span className="material-symbols-outlined text-[12px] opacity-70">
                          sync_alt
                        </span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 truncate">{adv.role}</p>

                    <div className="flex items-center justify-between flex-wrap gap-1 mt-1 pt-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-[#00685d]">
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span className="text-xs font-bold font-mono">
                          {adv.activeChats}/{adv.maxChats} chats
                        </span>
                        <div className="inline-flex items-center gap-1 ml-1.5">
                          <button
                            onClick={() => onAdjustChats(adv.id, -1)}
                            className="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center text-xs font-bold shadow-xs hover:bg-slate-100 active:scale-95 transition cursor-pointer border border-slate-200"
                            type="button"
                          >
                            -
                          </button>
                          <button
                            onClick={() => onAdjustChats(adv.id, 1)}
                            className="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center text-xs font-bold shadow-xs hover:bg-slate-100 active:scale-95 transition cursor-pointer border border-slate-200"
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500">
                        <span className="material-symbols-outlined text-[15px] text-[#00685d]">
                          timer
                        </span>
                        <span className="text-[11px] font-medium">{adv.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Routing Rules Section */}
        <section className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/70 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#a8f0e3] flex items-center justify-center text-[#00201c]">
              <span className="material-symbols-outlined text-[22px]">alt_route</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Reglas de Enrutamiento Inteligente
              </h3>
              <span className="text-[11px] text-slate-500">
                Lógica algorítmica para derivar al chat humano
              </span>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-700 font-bold">
              Modo de Distribución Algorítmica
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => {
                  setRoutingMode('round_robin');
                  onToast('Enrutamiento cambiado a Round Robin Equitativo', 'sync');
                }}
                className={`p-3 rounded-xl border-2 transition cursor-pointer flex flex-col gap-1 shadow-xs ${
                  routingMode === 'round_robin'
                    ? 'border-[#00685d] bg-[#ecf5fe]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00685d] text-[18px]">sync</span>
                    <span className="font-heading font-bold text-xs text-slate-900">Round Robin</span>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      routingMode === 'round_robin' ? 'bg-[#00685d]' : 'bg-slate-300'
                    }`}
                  ></span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Turnos equitativos y alternados entre asesoras disponibles.
                </p>
                <span className="self-start px-1.5 py-0.5 rounded bg-[#008376] text-white text-[10px] font-bold mt-0.5">
                  Activo
                </span>
              </div>

              <div
                onClick={() => {
                  setRoutingMode('least_load');
                  onToast('Enrutamiento cambiado a Menor Cola / Menor Carga', 'tune');
                }}
                className={`p-3 rounded-xl border-2 transition cursor-pointer flex flex-col gap-1 shadow-xs ${
                  routingMode === 'least_load'
                    ? 'border-[#00685d] bg-[#ecf5fe]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-500 text-[18px]">tune</span>
                    <span className="font-heading font-bold text-xs text-slate-900">Menor Cola</span>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      routingMode === 'least_load' ? 'bg-[#00685d]' : 'bg-slate-300'
                    }`}
                  ></span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Prioriza a la asesora con menor número de chats en vivo.
                </p>
                <span className="self-start px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-semibold mt-0.5">
                  Alternativo
                </span>
              </div>
            </div>
          </div>

          {/* Triggers */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Disparadores Automáticos (Derivación Inmediata)
              </span>
              <span className="text-[11px] text-[#00685d] font-semibold">
                {[triggerBtn, triggerKeywords, triggerAmount].filter(Boolean).length} activos
              </span>
            </div>

            {/* Trigger 1 */}
            <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer select-none border border-slate-100">
              <input
                type="checkbox"
                checked={triggerBtn}
                onChange={(e) => {
                  setTriggerBtn(e.target.checked);
                  onToast(
                    e.target.checked ? 'Disparador activado: Botón interactivo' : 'Disparador desactivado',
                    'check_circle'
                  );
                }}
                className="mt-1 w-4 h-4 accent-[#00685d] rounded cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900">
                  Clic en botón interactivo [Hablar con Asesora]
                </span>
                <span className="text-[11px] text-slate-500">
                  Pasa inmediatamente el contexto completo y cotización previa
                </span>
              </div>
            </label>

            {/* Trigger 2: Keywords */}
            <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer select-none border border-slate-100">
              <input
                type="checkbox"
                checked={triggerKeywords}
                onChange={(e) => {
                  setTriggerKeywords(e.target.checked);
                  onToast(
                    e.target.checked ? 'Disparador activado: Palabras clave' : 'Disparador desactivado',
                    'check_circle'
                  );
                }}
                className="mt-1 w-4 h-4 accent-[#00685d] rounded cursor-pointer"
              />
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">
                    Detección de palabras clave críticas
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      promptAddKeyword();
                    }}
                    className="text-[11px] text-[#00685d] font-bold hover:underline"
                  >
                    + Añadir
                  </span>
                </div>
                <div
                  className="flex flex-wrap gap-1 mt-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      onClick={() => onRemoveKeyword(kw)}
                      className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-medium flex items-center gap-1 cursor-pointer hover:bg-rose-100 hover:text-rose-800 transition"
                      title="Clic para eliminar palabra"
                    >
                      <span>{kw}</span>
                      <span className="text-[10px]">✕</span>
                    </span>
                  ))}
                </div>
              </div>
            </label>

            {/* Trigger 3: Cart Amount */}
            <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer select-none border border-slate-100">
              <input
                type="checkbox"
                checked={triggerAmount}
                onChange={(e) => {
                  setTriggerAmount(e.target.checked);
                  onToast(
                    e.target.checked ? 'Disparador activado: Monto VIP > $40' : 'Disparador desactivado',
                    'check_circle'
                  );
                }}
                className="mt-1 w-4 h-4 accent-[#00685d] rounded cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900">
                  Monto de carrito / cotización superior a $40 USD
                </span>
                <span className="text-[11px] text-slate-500">
                  Alerta VIP para cierre de venta asistido en tiempo real
                </span>
              </div>
            </label>
          </div>

          {/* Priority sound notification */}
          <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#00685d] shadow-xs">
                <span className="material-symbols-outlined text-[18px]">
                  {soundPriority ? 'notifications_active' : 'notifications_off'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">
                  Notificación sonora prioritaria
                </span>
                <span className="text-[10px] text-slate-500">
                  Sonido distintivo en la app móvil de la asesora
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSoundPriority(!soundPriority);
                onToast(
                  !soundPriority ? 'Alerta sonora prioritaria activada 🔔' : 'Notificaciones en silencio',
                  !soundPriority ? 'notifications_active' : 'notifications_off'
                );
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${
                soundPriority ? 'bg-[#00685d]' : 'bg-slate-300'
              }`}
              type="button"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform shadow-xs ${
                  soundPriority ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </section>

        {/* Visual Simulation of Handoff */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Simulación visual de relevo al cliente
            </span>
            <button
              onClick={handleSimulateHandoff}
              disabled={isSimulating}
              className="px-2.5 py-1 rounded-full bg-[#00685d] text-white text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-[#008376] active:scale-95 transition cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">
                {isSimulating ? 'refresh' : 'play_circle'}
              </span>
              <span>{isSimulating ? 'Transfiriendo...' : 'Simular Relevo en Vivo'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-200/70 flex flex-col gap-2.5 relative overflow-hidden border border-slate-300/60">
            {/* Outgoing Client Request */}
            <div
              className={`self-end bg-[#5dfd8a]/40 text-[#005322] rounded-xl rounded-tr-none px-3 py-2 max-w-[85%] shadow-xs transition-all ${
                simStep >= 1 ? 'ring-2 ring-[#006d2f]' : ''
              }`}
            >
              <p className="text-xs leading-snug">
                Quiero consultar por tallas especiales para recién nacido
              </p>
              <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] text-[#005322]/80">
                <span>10:42 AM</span>
                <span className="material-symbols-outlined text-[13px] text-[#00685d]">
                  done_all
                </span>
              </div>
            </div>

            {/* System Routing Banner */}
            <div
              className={`self-center bg-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 text-slate-600 transition-all ${
                simStep >= 2 ? 'scale-105 bg-[#8ff4e3] text-[#00201c] font-semibold' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-[#00685d]">
                support_agent
              </span>
              <span className="text-[11px]">Bot transfirió la charla a Sarah Concierge</span>
            </div>

            {/* Incoming Advisor Warm Welcome */}
            <div
              className={`self-start bg-white text-slate-800 rounded-xl rounded-tl-none px-3 py-2 max-w-[88%] shadow-xs flex flex-col gap-1 transition-all ${
                simStep === 3 ? 'ring-2 ring-[#00685d] pulse-emerald' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-heading font-bold text-[#00685d]">
                  Sarah Concierge (En vivo)
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#5dfd8a]/40 text-[#005322] font-bold">
                  Asesora
                </span>
              </div>
              <p className="text-xs leading-snug">
                ¡Hola! Con mucho gusto te asesoro. Ya revisé tu cotización de canastilla y tengo modelos especiales listos para despachar hoy. 💕
              </p>
              <div className="flex items-center justify-end text-[9px] text-slate-400">
                <span>10:43 AM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Action Button: Proceed to Step 4 */}
        <section className="pt-1 flex flex-col gap-2">
          <button
            onClick={() => {
              onToast('Guardando reglas y avanzando a Paso 4: Transición y Catálogo...', 'save');
              setTimeout(onNext, 500);
            }}
            className="w-full h-12 bg-[#006d2f] hover:bg-[#005322] text-white rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition cursor-pointer"
            type="button"
          >
            <span>Siguiente: Flujo de Respuesta y Cierre</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-center text-slate-500 text-[11px]">
            <span className="material-symbols-outlined text-[14px] text-[#00685d]">lock</span>
            <span>Cifrado de extremo a extremo corporativo Meta Cloud API</span>
          </div>
        </section>
      </div>
    </div>
  );
};
