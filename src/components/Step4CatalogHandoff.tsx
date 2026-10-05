import React, { useState, useEffect } from 'react';

interface Step4CatalogHandoffProps {
  couponCode: string;
  onOpenLiveChat: () => void;
  onNext: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const Step4CatalogHandoff: React.FC<Step4CatalogHandoffProps> = ({
  couponCode,
  onOpenLiveChat,
  onNext,
  onToast,
}) => {
  const initialSeconds = 14;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('0-3M');
  const [showVoucherDetails, setShowVoucherDetails] = useState(false);
  const [showPrefDetails, setShowPrefDetails] = useState(false);
  const [showProductBreakdown, setShowProductBreakdown] = useState(false);
  const [showBotModal, setShowBotModal] = useState(false);
  const [activeStepExpanded, setActiveStepExpanded] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;
    if (seconds > 0 && !isCompleted) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsCompleted(true);
            onToast('¡Sarah Concierge está lista para atenderte!', 'support_agent');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [seconds, isCompleted, onToast]);

  const handleRestart = () => {
    setSeconds(initialSeconds);
    setIsCompleted(false);
    onToast('Simulación de relevo reiniciada', 'replay');
  };

  const elapsed = initialSeconds - seconds;
  const progressPercent = isCompleted ? 100 : Math.min(100, Math.round(25 + (elapsed / initialSeconds) * 75));

  const copySessionId = () => {
    navigator.clipboard?.writeText('PB-78921-MC');
    onToast('ID de Conversación copiado: PB-78921-MC', 'content_copy');
  };

  const copyVoucher = () => {
    navigator.clipboard?.writeText(couponCode);
    setShowVoucherDetails(true);
    onToast(`Cupón ${couponCode} copiado al portapapeles`, 'content_copy');
  };

  return (
    <div className="flex flex-col w-full pb-10 bg-[#f6faff] min-h-screen text-[#141d23]">
      {/* Live Status Bar */}
      <div className="bg-[#00685d] px-4 py-2 shadow-xs flex items-center justify-between text-white">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#66ff8e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#66ff8e]"></span>
          </div>
          <p className="text-xs text-white font-medium truncate">
            {isCompleted
              ? 'Chat activo con Sarah Concierge • En Vivo'
              : 'Transfiriendo chat • Tiempo estimado < 25s'}
          </p>
        </div>

        <button
          onClick={() => onToast('Meta Cloud API: Latencia 35ms • Conexión Cifrada SSL 200 OK', 'lock')}
          className="flex items-center gap-1 shrink-0 bg-[#008376]/80 hover:bg-[#008376] px-2 py-0.5 rounded-full cursor-pointer transition text-[11px]"
          type="button"
        >
          <span className="material-symbols-outlined text-[#66ff8e] text-[14px]">lock</span>
          <span>Meta API 200 OK</span>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3.5">
        {/* Central Transition Delight Card */}
        <div className="bg-white rounded-xl p-4 shadow-xs relative overflow-hidden flex flex-col items-center text-center border border-slate-200/70">
          {/* Ambient Decorative Backdrop Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#8ff4e3]/30 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#66ff8e]/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Agent Avatar with Animated Pulsing Ring */}
          <div className="relative my-1 flex items-center justify-center cursor-pointer group">
            {/* SVG Orbit Ring */}
            <svg
              className="w-24 h-24 animate-spin transition-all"
              style={{ animationDuration: '9s', animationTimingFunction: 'linear' }}
              viewBox="0 0 100 100"
            >
              <circle
                className="text-[#3de273]"
                cx="50"
                cy="50"
                fill="none"
                opacity="0.8"
                r="44"
                stroke="currentColor"
                strokeDasharray="16 10"
                strokeWidth="2.5"
              ></circle>
            </svg>

            {/* Concierge Avatar SVG */}
            <div className="absolute w-20 h-20 rounded-full bg-[#ecf5fe] overflow-hidden shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-full h-full" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bgSkin" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#E8F5E9"></stop>
                    <stop offset="100%" stopColor="#C8E6C9"></stop>
                  </linearGradient>
                </defs>
                <rect fill="url(#bgSkin)" height="120" width="120"></rect>
                <path d="M22 120 C22 92, 42 78, 60 78 C78 78, 98 92, 98 120 Z" fill="#00685D"></path>
                <path d="M46 88 Q60 96 74 88" fill="none" stroke="#8FF4E3" strokeLinecap="round" strokeWidth="2.5"></path>
                <circle cx="60" cy="102" fill="#8FF4E3" r="2.5"></circle>
                <circle cx="60" cy="110" fill="#8FF4E3" r="2.5"></circle>
                <rect fill="#FFDCB8" height="16" rx="5" width="16" x="52" y="58"></rect>
                <ellipse cx="60" cy="46" fill="#FFE2C6" rx="20" ry="24"></ellipse>
                <ellipse cx="53" cy="45" fill="#293238" rx="2" ry="2.5"></ellipse>
                <ellipse cx="67" cy="45" fill="#293238" rx="2" ry="2.5"></ellipse>
                <path d="M54 53 Q60 59 66 53" fill="none" stroke="#BA6858" strokeLinecap="round" strokeWidth="2"></path>
                <path d="M40 40 C40 24, 80 24, 80 40 C80 30, 72 20, 60 20 C48 20, 40 30, 40 40 Z" fill="#422918"></path>
                <path d="M38 42 C38 48, 42 54, 43 57 C41 45, 43 38, 44 35 Z" fill="#422918"></path>
                <path d="M38 45 A22 22 0 0 1 82 45" fill="none" stroke="#141D23" strokeLinecap="round" strokeWidth="3"></path>
                <circle cx="39" cy="46" fill="#008376" r="4.5"></circle>
                <path d="M40 50 Q43 63 54 62" fill="none" stroke="#141D23" strokeLinecap="round" strokeWidth="2"></path>
                <circle cx="55" cy="62" fill="#006D2F" r="2.5"></circle>
              </svg>
            </div>

            {/* Emblem */}
            <div className="absolute -bottom-1 -right-1 bg-[#006d2f] text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                child_friendly
              </span>
            </div>
          </div>

          {/* Identity & Badges */}
          <div className="mt-2 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                Sarah Concierge
              </h2>
              <span
                className="material-symbols-outlined text-[#006d2f] text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <button
              onClick={() =>
                onToast('Sarah: 6 años en asesoría de prendas hipoalergénicas recién nacido', 'award_star')
              }
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#00685d] active:scale-95 transition text-[11px] font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
              <span>Especialista Maternidad & Algodón Pima</span>
            </button>
          </div>

          {/* Reassuring Message */}
          <p className="mt-2 text-xs text-slate-600 max-w-[92%] leading-relaxed">
            {isCompleted ? (
              <>
                ¡Sarah está en línea! Puedes consultar detalles de bordado, empaque de regalo y despacho express.
              </>
            ) : (
              <>
                Sarah está leyendo tu cotización del{' '}
                <strong className="text-slate-900 font-semibold">Ajuar de Bienvenida</strong> para atenderte al instante. ¡No tendrás que repetir nada!
              </>
            )}
          </p>

          {/* Progress Bar & Countdown */}
          <div
            onClick={() => {
              setIsCompleted(true);
              setSeconds(0);
              onToast('Conexión completada instantáneamente', 'flash_on');
            }}
            className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden relative cursor-pointer"
            title="Toca para acelerar al 100%"
          >
            <div
              className="h-full bg-[#008376] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="w-full flex justify-between items-center mt-1.5 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCompleted ? 'bg-[#006d2f]' : 'bg-[#25D366] animate-pulse'
                }`}
              ></span>
              <span>{isCompleted ? '¡Conexión establecida!' : 'Sincronizando carrito con WhatsApp Cloud...'}</span>
            </span>
            <span className={`font-bold font-mono ${isCompleted ? 'text-[#006d2f]' : 'text-[#00685d]'}`}>
              {isCompleted ? '¡Listo!' : `0:${seconds < 10 ? '0' + seconds : seconds}s`}
            </span>
          </div>

          {/* Restart button */}
          <button
            onClick={handleRestart}
            className="mt-2 text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition"
            type="button"
          >
            <span className="material-symbols-outlined text-[13px]">replay</span>
            <span>Reiniciar simulación</span>
          </button>
        </div>

        {/* Captured Context Handover Card */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/70">
          <div className="flex items-center justify-between pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00685d] text-[20px]">
                inventory_2
              </span>
              <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                Ficha Transferida a Sarah
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#5dfd8a]/40 text-[#005322] text-[10px] font-bold border border-[#006d2f]/20">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              <span>Autoguardado</span>
            </span>
          </div>

          {/* Context List */}
          <div className="mt-2 flex flex-col gap-1.5">
            {/* Origin */}
            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[#00685d] text-[16px]">campaign</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-slate-500">Origen de Entrada</p>
                <p className="text-xs text-slate-800 font-medium truncate">
                  Campaña Instagram • Ajuar Nacimiento Pima
                </p>
              </div>
            </div>

            {/* Voucher */}
            <div
              onClick={copyVoucher}
              className="flex flex-col p-2 rounded-lg bg-slate-50 cursor-pointer hover:bg-emerald-50/50 transition border border-transparent hover:border-emerald-200"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#5dfd8a]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#005322]">
                  <span className="material-symbols-outlined text-[16px]">loyalty</span>
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500">Beneficio Bloqueado</p>
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-[#006d2f] font-bold font-mono">{couponCode}</p>
                      <span className="material-symbols-outlined text-[13px] text-slate-400">
                        content_copy
                      </span>
                    </div>
                  </div>
                  <span className="bg-[#66ff8e] text-[#002109] text-[10px] px-2 py-0.5 rounded-full font-bold">
                    20% OFF
                  </span>
                </div>
              </div>
              {showVoucherDetails && (
                <div className="mt-1.5 pt-1.5 border-t border-slate-200 text-[10px] text-slate-600">
                  Cupón de bienvenida copiado al portapapeles. Válido en este pedido.
                </div>
              )}
            </div>

            {/* Preference */}
            <div
              onClick={() => setShowPrefDetails(!showPrefDetails)}
              className="flex flex-col p-2 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[#00685d] text-[16px]">
                    featured_seasonal_and_gifts
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500">Preferencia Identificada</p>
                    <p className="text-xs text-slate-800 font-medium">
                      Enterizo 100% Algodón • Baby Shower (0-3 meses)
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-slate-400">
                    {showPrefDetails ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>
              {showPrefDetails && (
                <div className="mt-1.5 pt-1.5 border-t border-slate-200 text-[10px] text-slate-600 flex flex-wrap gap-1">
                  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-[#00685d]">
                    Tejido: Interlock Suave
                  </span>
                  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-[#00685d]">
                    Talla: 0-3 Meses
                  </span>
                  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-medium text-[#00685d]">
                    Incluye caja de regalo Petit
                  </span>
                </div>
              )}
            </div>

            {/* Guarantee */}
            <div
              onClick={() => onToast('Certificado OEKO-TEX®: Libre de pesticidas y tintes tóxicos', 'verified')}
              className="mt-1 p-2 rounded-lg bg-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-200/70 transition"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00685d] text-[18px]">
                  verified_user
                </span>
                <p className="text-[11px] text-slate-700 font-medium">
                  Garantía Hipoalergénica Petit Bébé® certificada.
                </p>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#00685d]">info</span>
            </div>
          </div>
        </div>

        {/* Live Transition Timeline */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/70">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
              Progreso de la Conexión
            </h3>
            <span className="text-[11px] text-[#00685d] font-bold">
              {isCompleted ? 'Completado (3/3)' : 'Fase 2 de 3'}
            </span>
          </div>

          <div className="relative flex flex-col gap-3 pl-2">
            {/* Step 1 */}
            <div
              onClick={() =>
                setActiveStepExpanded(activeStepExpanded === 's1' ? null : 's1')
              }
              className="cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#006d2f] text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                  <span className="material-symbols-outlined text-[14px]">done</span>
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Solicitud recibida del asistente virtual
                    </p>
                    <p className="text-[10px] text-slate-500">Historial consolidado con éxito</p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-400">info</span>
                </div>
              </div>
              {activeStepExpanded === 's1' && (
                <div className="mt-1 ml-8 p-2 rounded bg-slate-50 text-[10px] text-slate-600 border border-slate-200">
                  Transmisión de 4 respuestas del cliente, selección de ajuar y cupón validado vía webhook seguro.
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div
              onClick={() =>
                setActiveStepExpanded(activeStepExpanded === 's2' ? null : 's2')
              }
              className="cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-xs ${
                    isCompleted
                      ? 'bg-[#006d2f] text-white'
                      : 'bg-[#008376] text-white ring-4 ring-[#8ff4e3]/40'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[14px]">done</span>
                  ) : (
                    <span className="animate-pulse w-2 h-2 rounded-full bg-white"></span>
                  )}
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <div>
                    <p
                      className={`text-xs font-semibold ${
                        isCompleted ? 'text-slate-900' : 'text-[#00685d]'
                      }`}
                    >
                      Sarah Concierge asignada y revisando notas
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Preparando catálogo de recién nacidos
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-400">info</span>
                </div>
              </div>
              {activeStepExpanded === 's2' && (
                <div className="mt-1 ml-8 p-2 rounded bg-slate-50 text-[10px] text-slate-600 border border-slate-200">
                  Sarah ha priorizado la talla 0-3 meses y verificado el stock en almacén de algodón Pima 50/1.
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div
              onClick={() =>
                setActiveStepExpanded(activeStepExpanded === 's3' ? null : 's3')
              }
              className={`cursor-pointer group ${isCompleted ? 'opacity-100' : 'opacity-60'}`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-xs ${
                    isCompleted
                      ? 'bg-[#008376] text-white ring-4 ring-[#8ff4e3]/40'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isCompleted ? 'chat' : 'forum'}
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Apertura del chat personalizado
                    </p>
                    <p className="text-[10px] text-slate-500">Transferencia de canal fluida</p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-slate-400">info</span>
                </div>
              </div>
              {activeStepExpanded === 's3' && (
                <div className="mt-1 ml-8 p-2 rounded bg-slate-50 text-[10px] text-slate-600 border border-slate-200">
                  Sesión cifrada lista para saludo personalizado sin reingreso de datos.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggested Catalog Peek Thumbnail */}
        <div
          onClick={() => setShowProductBreakdown(!showProductBreakdown)}
          className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/70 flex flex-col gap-2 cursor-pointer hover:border-emerald-300 transition"
        >
          <div className="flex items-center gap-3">
            <img
              alt="Ajuar Bienvenida Pima"
              className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0 shadow-xs"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOcX0MN9WYlzZ3r8khdDwi8VikPiEPdZCt4VDCWYAL-LShbSTNI6LMfA3KOrCEGZHBMJ6B3RjO1QIQlX4qv5Kq8nm2VGxzaD5VtXHo3zJrWopotP_p2m89GcyhVYjYiRGVTpXWzugXV_bi5VxCB2JTgIADTX0rmD0GOcVQXFU3JFpPAXOY_HedA5BXxWEcei_WrwymmwpRBuRmNf5-sf9n-cRh4S0twJRrCnRn9e2dycW4F9IAwA13Mw"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#006d2f]">Ajuar Bienvenida Pima</span>
                <span className="text-[11px] text-slate-400 line-through">$49.90</span>
              </div>
              <p className="font-heading font-bold text-sm text-slate-900 leading-tight">
                $39.92{' '}
                <span className="text-[10px] text-[#006d2f] font-semibold">con {couponCode}</span>
              </p>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[10px] text-slate-500 truncate">
                  3 piezas hipoalergénicas • Algodón 100%
                </p>
                <span className="material-symbols-outlined text-[15px] text-slate-400">tune</span>
              </div>
            </div>
          </div>

          {showProductBreakdown && (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-xs">
              <div className="bg-slate-50 p-2 rounded-lg text-[11px] text-slate-700">
                <p className="font-bold text-slate-900 mb-1">Piezas incluidas en el set:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Body cruzado kimono (broches sin níquel)</li>
                  <li>Ranita con piecitos en algodón pima peruano</li>
                  <li>Gorrito regulable anatómico para recién nacido</li>
                </ul>
              </div>

              <div
                className="flex items-center justify-between pt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[11px] font-medium text-slate-700">Talla seleccionada:</span>
                <div className="flex items-center gap-1.5">
                  {['RN', '0-3M', '3-6M'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        onToast(`Talla cambiada a: ${sz}`, 'checkroom');
                      }}
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                        selectedSize === sz
                          ? 'bg-[#006d2f] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      type="button"
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={onOpenLiveChat}
            className={`w-full h-12 bg-[#006d2f] hover:bg-[#005322] active:scale-[0.98] text-white rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer ${
              isCompleted ? 'pulse-emerald' : ''
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>
              {isCompleted ? 'Ingresar al Chat con Sarah en Vivo' : 'Ingresar al Chat con Sarah'}
            </span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <button
            onClick={() => setShowBotModal(true)}
            className="w-full h-10 bg-transparent hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            <span>Continuar navegando con el Bot automatizado</span>
          </button>

          <button
            onClick={onNext}
            className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-heading font-bold text-[#00685d] flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer mt-1"
            type="button"
          >
            <span>Ver Presentación Integral del Embudo 360°</span>
            <span className="material-symbols-outlined text-[16px]">analytics</span>
          </button>
        </div>

        {/* Security & Conversation ID */}
        <div className="pt-2 flex flex-col items-center justify-center gap-1 text-center text-slate-500 text-[11px]">
          <div
            onClick={copySessionId}
            className="flex items-center gap-1 cursor-pointer hover:text-slate-800 transition"
          >
            <span className="material-symbols-outlined text-[15px] text-[#006d2f]">verified</span>
            <span>Cifrado de extremo a extremo corporativo de Meta Cloud API</span>
          </div>

          <button
            onClick={copySessionId}
            className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
            type="button"
          >
            <span>
              Petit Bébé Oficial • ID de Conversación:{' '}
              <strong className="text-slate-700">PB-78921-MC</strong>
            </span>
            <span className="material-symbols-outlined text-[12px]">content_copy</span>
          </button>
        </div>
      </div>

      {/* Stay with bot confirmation modal */}
      {showBotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-enter">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl flex flex-col items-center text-center border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-[#00685d] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[28px]">smart_toy</span>
            </div>
            <h4 className="font-heading font-bold text-sm text-slate-900 mb-1">
              ¿Deseas volver con PetitBot?
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              Sarah Concierge quedará en espera. El asistente virtual automático puede resolver dudas frecuentes o guiarte en el catálogo.
            </p>
            <div className="flex flex-col w-full gap-2">
              <button
                onClick={() => {
                  setShowBotModal(false);
                  onToast('Regresando a navegar con PetitBot', 'smart_toy');
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
                type="button"
              >
                Sí, regresar al Bot automatizado
              </button>
              <button
                onClick={() => setShowBotModal(false)}
                className="w-full py-2.5 bg-[#006d2f] text-white rounded-xl text-xs font-bold transition cursor-pointer"
                type="button"
              >
                Permanecer con Sarah Concierge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
