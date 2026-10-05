import React, { useState } from 'react';

interface Step5Overview360Props {
  brandName: string;
  phone: string;
  couponCode: string;
  onOpenPdfModal: () => void;
  onNavigateStep: (step: number) => void;
  onToast: (msg: string, icon?: string) => void;
}

export const Step5Overview360: React.FC<Step5Overview360Props> = ({
  brandName,
  phone,
  couponCode,
  onOpenPdfModal,
  onNavigateStep,
  onToast,
}) => {
  const [perspective, setPerspective] = useState<'empresa' | 'mama'>('empresa');
  const [openDrawer, setOpenDrawer] = useState<number | null>(null);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);
  const [tourLabel, setTourLabel] = useState('');
  const [activeTimelineHeight, setActiveTimelineHeight] = useState(0);

  const toggleDrawer = (stepNum: number) => {
    setOpenDrawer((prev) => (prev === stepNum ? null : stepNum));
  };

  const runGuidedTour = () => {
    if (isTourRunning) return;
    setIsTourRunning(true);
    setTourProgress(0);
    setTourLabel('Iniciando simulación del embudo...');
    onToast('Iniciando demostración guiada del embudo 360°', 'play_circle');

    const stages = [
      { step: 1, label: 'Paso 1: Número verificado ante Meta API', pct: 20, h: 40 },
      { step: 2, label: `Paso 2: Bot de pauta activo con cupón ${couponCode}`, pct: 40, h: 100 },
      { step: 3, label: 'Paso 3: Asignando chat por Round Robin a Sarah', pct: 60, h: 160 },
      { step: 4, label: 'Paso 4: Traspaso contextual sin repetir información', pct: 80, h: 220 },
      { step: 5, label: 'Paso 5: Venta cerrada y boleta emitida con éxito', pct: 100, h: 280 },
    ];

    stages.forEach((s, idx) => {
      setTimeout(() => {
        setTourProgress(s.pct);
        setTourLabel(s.label);
        setActiveTimelineHeight(s.h);
        setOpenDrawer(s.step);

        if (idx === stages.length - 1) {
          setTimeout(() => {
            setIsTourRunning(false);
            setTourLabel('¡Demostración Completa!');
            onToast('🎉 ¡Recorrido completado! Las 5 fases del embudo han sido verificadas.', 'celebration');
          }, 1200);
        }
      }, (idx + 1) * 1100);
    });
  };

  const copyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    onToast('Enlace de la presentación copiado al portapapeles', 'share');
  };

  return (
    <div className="flex flex-col w-full pb-12 bg-slate-100 min-h-screen text-slate-800">
      <div className="p-4 max-w-lg mx-auto w-full flex flex-col gap-4">
        {/* Welcome Hero Banner */}
        <section className="bg-gradient-to-br from-[#075E54] to-[#128C7E] rounded-2xl p-4 text-white shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex flex-col gap-2 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200">
                Arquitectura de Ventas Digital
              </span>
              <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded-full font-semibold">
                v3.4 Oficial
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-xl leading-snug">
              Recorrido Completo: De la Pauta al Cierre de Venta
            </h2>

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Demostración interactiva de cómo opera la boutique 100% virtual de ropa en algodón pima, combinando alta velocidad de respuesta y calidez humana.
            </p>

            {/* Tour Button */}
            <button
              onClick={runGuidedTour}
              disabled={isTourRunning}
              className="mt-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-[#075E54] font-heading font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isTourRunning ? 'refresh' : 'play_circle'}
              </span>
              <span>
                {isTourRunning ? 'Demostración en curso...' : 'Iniciar Demostración Guiada (5 Pasos)'}
              </span>
            </button>

            {/* Tour Progress Bar */}
            {isTourRunning && (
              <div className="flex flex-col gap-1 mt-2 animate-enter">
                <div className="flex items-center justify-between text-[11px] text-emerald-100 font-medium">
                  <span>{tourLabel}</span>
                  <span className="font-bold">{tourProgress}%</span>
                </div>
                <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#25D366] h-full transition-all duration-300"
                    style={{ width: `${tourProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Respuesta Bot
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#128C7E]">bolt</span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-slate-900">&lt; 2.0 seg</span>
              <p className="text-[10px] text-emerald-600 font-semibold">Inmediato 24/7</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Retención Handoff
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#25D366]">
                support_agent
              </span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-slate-900">94.8%</span>
              <p className="text-[10px] text-slate-500 font-medium">Cero fricción ni datos repetidos</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Ticket Promedio
              </span>
              <span className="material-symbols-outlined text-[16px] text-amber-500">
                shopping_bag
              </span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg text-slate-900">$39.92</span>
              <p className="text-[10px] text-slate-500 font-medium">Ajuar Clínico Nacimiento</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Calificación CSAT
              </span>
              <span className="material-symbols-outlined text-[16px] text-yellow-500">star</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-heading font-extrabold text-lg text-slate-900">4.9 / 5</span>
                <span className="text-xs">⭐</span>
              </div>
              <p className="text-[10px] text-emerald-600 font-semibold">+1,400 familias felices</p>
            </div>
          </div>
        </section>

        {/* Perspective Switcher */}
        <section className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1">
          <button
            onClick={() => {
              setPerspective('empresa');
              onToast('Modo de visión: Administración y Operación', 'settings_suggest');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              perspective === 'empresa'
                ? 'text-white bg-[#075E54] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">settings_suggest</span>
            <span>Vista Administración</span>
          </button>

          <button
            onClick={() => {
              setPerspective('mama');
              onToast('Modo de visión: Experiencia de la Madre en WhatsApp', 'child_friendly');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-heading font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              perspective === 'mama'
                ? 'text-white bg-[#075E54] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">child_friendly</span>
            <span>Vista Mamá / Cliente</span>
          </button>
        </section>

        {/* Dynamic Context Card */}
        <div className="bg-emerald-50 border border-emerald-200/70 p-3 rounded-xl text-xs flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#128C7E] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">
              {perspective === 'empresa' ? 'admin_panel_settings' : 'child_friendly'}
            </span>
          </div>
          <div>
            <h4 className="font-heading font-bold text-[#075E54]">
              {perspective === 'empresa'
                ? 'Perspectiva: Panel de Administración & Operación'
                : 'Perspectiva: La Experiencia de la Madre en WhatsApp'}
            </h4>
            <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
              {perspective === 'empresa'
                ? 'Supervisión de la conexión técnica con Meta Cloud API, balanceo Round Robin entre asesoras y control de inventario de ajuares en tiempo real.'
                : 'La madre hace clic en la pauta de Instagram, recibe asesoría cálida en segundos sobre algodón pima, despeja dudas de tallas y paga con un clic seguro.'}
            </p>
          </div>
        </div>

        {/* 5 Stages Accordion Sequence */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-heading font-bold text-sm text-slate-800">
              Secuencia de las 5 Etapas del Flujo
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Toca para abrir detalles</span>
          </div>

          <div className="flex flex-col gap-2.5 relative">
            {/* Timeline Line */}
            <div className="absolute left-5 top-5 bottom-8 w-0.5 bg-slate-200 z-0"></div>
            <div
              className="absolute left-5 top-5 w-0.5 bg-[#25D366] z-0 transition-all duration-500"
              style={{ height: `${activeTimelineHeight}px` }}
            ></div>

            {/* Stage 1 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs relative z-10 overflow-hidden transition">
              <div
                onClick={() => toggleDrawer(1)}
                className="p-3.5 flex items-start justify-between cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#075E54] text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    1
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#128C7E]">
                        Paso 1 • Configuración Inicial
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      Número Oficial, Nombre y Meta API
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Validación telefónica (+51 {phone}), PIN SMS y token Meta Cloud.
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-slate-400 text-[20px] transition-transform ${
                    openDrawer === 1 ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </div>

              {openDrawer === 1 && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/70 animate-enter">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] flex flex-col gap-1 text-slate-600">
                    <div className="flex items-center justify-between font-semibold text-slate-800">
                      <span className="flex items-center gap-1 text-[#075E54]">
                        <span className="material-symbols-outlined text-[15px]">verified_user</span>{' '}
                        Validación Criptográfica
                      </span>
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                        PIN 654210 OK
                      </span>
                    </div>
                    <p>
                      Línea exclusiva verificada ante Meta Business Suite con certificación oficial para {brandName}.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateStep(1)}
                      className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-heading font-semibold text-[#075E54] flex items-center justify-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">edit</span>
                      <span>Modificar en Paso 1</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stage 2 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs relative z-10 overflow-hidden transition">
              <div
                onClick={() => toggleDrawer(2)}
                className="p-3.5 flex items-start justify-between cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    2
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#128C7E]">
                        Paso 2 • Onboarding & Menú
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600">Bot 24/7</span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      Perfil Comercial y Bot de Pauta
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Catálogo sincronizado, cupón {couponCode} y menú interactivo de 3 botones.
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-slate-400 text-[20px] transition-transform ${
                    openDrawer === 2 ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </div>

              {openDrawer === 2 && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/70 animate-enter">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] flex flex-col gap-1.5 text-slate-600">
                    <div className="flex items-center justify-between font-semibold text-slate-800">
                      <span className="flex items-center gap-1 text-[#075E54]">
                        <span className="material-symbols-outlined text-[15px]">smart_toy</span> Menú
                        de Bienvenida
                      </span>
                      <span className="text-[#075E54] font-bold text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
                        {couponCode} (-20%)
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[10px] text-center font-medium">
                      <div className="p-1 bg-slate-50 rounded border border-slate-200">1. Catálogo</div>
                      <div className="p-1 bg-slate-50 rounded border border-slate-200">2. Guía Tallas</div>
                      <div className="p-1 bg-emerald-50 rounded border border-emerald-300 text-[#075E54] font-bold">
                        3. Asesora
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateStep(2)}
                      className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-heading font-semibold text-[#075E54] flex items-center justify-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">forum</span>
                      <span>Probar Chat en Paso 2</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stage 3 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs relative z-10 overflow-hidden transition">
              <div
                onClick={() => toggleDrawer(3)}
                className="p-3.5 flex items-start justify-between cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    3
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#128C7E]">
                        Paso 3 • Equipo & Reglas
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600">2 Activas</span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      Gestión de Asesoras y Enrutamiento
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Consola multiagente (Sarah & Sofía) y distribución Round Robin equitativa.
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-slate-400 text-[20px] transition-transform ${
                    openDrawer === 3 ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </div>

              {openDrawer === 3 && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/70 animate-enter">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] flex flex-col gap-1.5 text-slate-600">
                    <div className="flex items-center justify-between font-semibold text-slate-800">
                      <span className="flex items-center gap-1 text-[#075E54]">
                        <span className="material-symbols-outlined text-[15px]">groups</span> Balanceo
                        de Carga
                      </span>
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                        Round Robin
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span>Sarah Concierge: <strong className="text-slate-800">3/5 chats</strong></span>
                      <span>Sofía Asesora: <strong className="text-slate-800">2/4 chats</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateStep(3)}
                      className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-heading font-semibold text-[#075E54] flex items-center justify-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">settings</span>
                      <span>Ajustar Reglas en Paso 3</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stage 4 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs relative z-10 overflow-hidden transition">
              <div
                onClick={() => toggleDrawer(4)}
                className="p-3.5 flex items-start justify-between cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    4
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#128C7E]">
                        Paso 4 • Handoff en Vivo
                      </span>
                      <span className="text-[10px] font-bold text-[#075E54] bg-emerald-100 px-1.5 py-0.2 rounded">
                        &lt; 25 seg
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      Transición & Traspaso Contextual
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Sarah recibe carrito, cotización del ajuar y cupón sin que el cliente repita nada.
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-slate-400 text-[20px] transition-transform ${
                    openDrawer === 4 ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </div>

              {openDrawer === 4 && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/70 animate-enter">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] flex flex-col gap-1 text-slate-600">
                    <span className="font-semibold text-slate-800 flex items-center gap-1 text-[#075E54]">
                      <span className="material-symbols-outlined text-[15px]">badge</span> Contexto
                      Transferido a Sarah:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-600 mt-0.5">
                      <li>
                        Producto: <strong>Ajuar Bienvenida Pima (3 piezas)</strong>
                      </li>
                      <li>
                        Descuento Activo: <strong>{couponCode} (-$8.50 USD)</strong>
                      </li>
                      <li>
                        Preferencia: <strong>Recién nacido (0-3 meses) hipoalergénico</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateStep(4)}
                      className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-heading font-semibold text-[#075E54] flex items-center justify-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">support_agent</span>
                      <span>Ver Pantalla de Sarah</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stage 5 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs relative z-10 overflow-hidden transition">
              <div
                onClick={() => toggleDrawer(5)}
                className="p-3.5 flex items-start justify-between cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    5
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Paso 5 • Cierre de Venta
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">check_circle</span>{' '}
                        Pago Exitoso
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      Chat en Vivo, Asesoría & Pago Seguro
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Recomendación experta, enlace oficial de pago, boleta electrónica y guía de despacho.
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-slate-400 text-[20px] transition-transform ${
                    openDrawer === 5 ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </div>

              {openDrawer === 5 && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 flex flex-col gap-2 bg-slate-50/70 animate-enter">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11px] flex flex-col gap-1.5 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Orden #PB-78921-MC</span>
                      <span className="font-bold text-emerald-700 text-xs">$39.92 USD</span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Pasarela segura conectada + Envío prioritario con empaque de regalo y dedicatoria.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onOpenPdfModal}
                      className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-heading font-semibold flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">receipt_long</span>
                      <span>Ver Boleta y Guía de Envío</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Live WhatsApp Chat Simulation Box */}
        <section className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#128C7E] text-white flex items-center justify-center text-xs font-bold font-heading">
                PB
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">
                  Simulación del Chat en Vivo
                </h4>
                <span className="text-[10px] text-emerald-600 font-medium">WhatsApp Cloud API</span>
              </div>
            </div>
            <button
              onClick={() => onToast('Simulador reiniciado con contexto fresco', 'refresh')}
              className="text-[11px] text-[#075E54] hover:text-emerald-700 font-medium flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              <span>Reiniciar</span>
            </button>
          </div>

          <div
            className="flex flex-col gap-2 p-2.5 bg-[#ECE5DD] rounded-xl text-xs"
            style={{
              backgroundImage: 'radial-gradient(#00000008 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          >
            {/* Mom's message */}
            <div className="self-start max-w-[85%] bg-white p-2.5 rounded-xl rounded-tl-none shadow-xs text-slate-800 flex flex-col">
              <p>
                ¡Hola! Vi el anuncio en Instagram del Ajuar de Nacimiento. Mi bebé nace en 3 semanas y tengo dudas de la talla.
              </p>
              <span className="text-[9px] text-slate-400 self-end mt-1">10:42 AM</span>
            </div>

            {/* Bot message */}
            <div className="self-end max-w-[85%] bg-[#DCF8C6] p-2.5 rounded-xl rounded-tr-none shadow-xs text-slate-800 flex flex-col">
              <p className="font-bold text-[#075E54] text-[10px]">🤖 Bot Petit Bébé Oficial</p>
              <p className="mt-0.5 leading-snug">
                ¡Felicidades por la llegada! 🍼 Tu cupón <strong>{couponCode}</strong> (-20%) está activo. Te conecto con Sarah Concierge para ayudarte con la talla clínica.
              </p>
              <span className="text-[9px] text-slate-500 self-end mt-1 flex items-center gap-0.5">
                10:42 AM{' '}
                <span className="material-symbols-outlined text-[12px] text-emerald-600">
                  done_all
                </span>
              </span>
            </div>

            {/* Sarah message */}
            <div className="self-end max-w-[85%] bg-[#DCF8C6] p-2.5 rounded-xl rounded-tr-none shadow-xs text-slate-800 flex flex-col">
              <p className="font-bold text-[#075E54] text-[10px] flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#128C7E] text-white flex items-center justify-center text-[8px]">
                  S
                </span>
                Sarah Concierge (En vivo)
              </p>
              <p className="mt-0.5 leading-snug">
                ¡Hola! Para 3 semanas te sugiero la talla 0-3M en 100% Algodón Pima hipoalergénico. Aquí tienes el link seguro con tu 20% aplicado:{' '}
                <strong className="text-emerald-900 underline">petitbebe.pe/pima-ajuar</strong>
              </p>
              <span className="text-[9px] text-slate-500 self-end mt-1 flex items-center gap-0.5">
                10:43 AM{' '}
                <span className="material-symbols-outlined text-[12px] text-emerald-600">
                  done_all
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* Executive Action Buttons */}
        <section className="grid grid-cols-2 gap-2 pt-1 pb-4">
          <button
            onClick={onOpenPdfModal}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-heading font-bold text-slate-700 flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-[#128C7E]">
              picture_as_pdf
            </span>
            <span>Exportar Resumen PDF</span>
          </button>

          <button
            onClick={copyShareLink}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-heading font-bold text-slate-700 flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-[#128C7E]">share</span>
            <span>Compartir Presentación</span>
          </button>
        </section>
      </div>
    </div>
  );
};
