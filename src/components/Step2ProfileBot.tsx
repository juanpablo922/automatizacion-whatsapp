import React, { useState } from 'react';
import { CatalogProduct } from '../types';

interface Step2ProfileBotProps {
  brandName: string;
  phone: string;
  couponCode: string;
  setCouponCode: (val: string) => void;
  discountPercent: number;
  setDiscountPercent: (val: number) => void;
  onNext: () => void;
  onOpenProduct: (product: CatalogProduct) => void;
  onToast: (msg: string, icon?: string) => void;
}

export const Step2ProfileBot: React.FC<Step2ProfileBotProps> = ({
  brandName,
  phone,
  couponCode,
  setCouponCode,
  discountPercent,
  setDiscountPercent,
  onNext,
  onOpenProduct,
  onToast,
}) => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [botActive, setBotActive] = useState(true);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; content: React.ReactNode; time: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [successSaved, setSuccessSaved] = useState(false);

  const toggleCoupon = () => {
    if (discountPercent === 20) {
      setDiscountPercent(25);
      setCouponCode('BIENVENIDO25');
      onToast('Cupón cambiado a BIENVENIDO25 (25% OFF)', 'local_offer');
    } else {
      setDiscountPercent(20);
      setCouponCode('BIENVENIDO20');
      onToast('Cupón cambiado a BIENVENIDO20 (20% OFF)', 'local_offer');
    }
  };

  const copyCoupon = () => {
    navigator.clipboard?.writeText(couponCode);
    onToast(`Código ${couponCode} copiado al portapapeles`, 'content_copy');
  };

  const handleQuickReply = (action: 'catalogo' | 'tallas' | 'asesora') => {
    if (action === 'catalogo') {
      const userBubble = {
        sender: 'user' as const,
        content: '🧸 1. Ver Catálogo y Precios',
        time: '10:43 AM',
      };
      setChatHistory((prev) => [...prev, userBubble]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const botReply = {
          sender: 'bot' as const,
          content: (
            <div className="flex flex-col gap-2">
              <span className="font-heading font-bold text-[#075E54] text-xs">
                Catálogo Express Petit Bébé 🧸
              </span>
              <div className="flex flex-col gap-1.5 text-xs text-slate-700">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span>• Ajuar 5 piezas Algodón Pima</span>
                  <strong className="text-[#00685d]">S/ 119</strong>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span>• Pack 3 Bodys Manga Larga</span>
                  <strong className="text-[#00685d]">S/ 79</strong>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>• Gorritos & Mitones Orgánicos</span>
                  <strong className="text-[#00685d]">S/ 49</strong>
                </div>
              </div>
              <div className="bg-[#DCF8C6]/70 p-2 rounded-lg text-[11px] text-[#075E54] flex items-center justify-between mt-1">
                <span>Cupón {couponCode} aplicado</span>
                <span className="font-bold font-mono">-{discountPercent}%</span>
              </div>
            </div>
          ),
          time: '10:43 AM',
        };
        setChatHistory((prev) => [...prev, botReply]);
        onToast('Mostrando catálogo interactivo en WhatsApp', 'inventory_2');
      }, 700);
    } else if (action === 'tallas') {
      const userBubble = {
        sender: 'user' as const,
        content: '📏 2. Guía de Tallas (0-12m)',
        time: '10:43 AM',
      };
      setChatHistory((prev) => [...prev, userBubble]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const botReply = {
          sender: 'bot' as const,
          content: (
            <div className="flex flex-col gap-2">
              <span className="font-heading font-bold text-[#075E54] text-xs">
                Guía de Tallas Petit Bébé 📏
              </span>
              <div className="grid grid-cols-3 gap-1 text-[10px] text-center bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-700">Talla</div>
                <div className="font-bold text-slate-700">Peso</div>
                <div className="font-bold text-slate-700">Longitud</div>
                <div className="py-0.5">Recién Nacido</div>
                <div className="py-0.5">2.5 - 4.0 kg</div>
                <div className="py-0.5">&lt; 54 cm</div>
                <div className="py-0.5 border-t border-slate-200">0 - 3 Meses</div>
                <div className="py-0.5 border-t border-slate-200">4.0 - 6.5 kg</div>
                <div className="py-0.5 border-t border-slate-200">54 - 62 cm</div>
                <div className="py-0.5 border-t border-slate-200">3 - 6 Meses</div>
                <div className="py-0.5 border-t border-slate-200">6.5 - 8.5 kg</div>
                <div className="py-0.5 border-t border-slate-200">62 - 68 cm</div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Tip: Nuestro corte holgado permite uso cómodo con pañales ecológicos o clínicos.
              </p>
            </div>
          ),
          time: '10:43 AM',
        };
        setChatHistory((prev) => [...prev, botReply]);
        onToast('Guía de tallas enviada con éxito', 'straighten');
      }, 700);
    } else if (action === 'asesora') {
      const userBubble = {
        sender: 'user' as const,
        content: '👩‍💼 3. Hablar con Asesora en Vivo',
        time: '10:43 AM',
      };
      setChatHistory((prev) => [...prev, userBubble]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const botReply = {
          sender: 'bot' as const,
          content: (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                    SC
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#25D366] border border-white"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xs text-slate-900 leading-tight">
                    Sarah Concierge
                  </span>
                  <span className="text-[10px] text-slate-500">Asesora Senior de Maternidad</span>
                </div>
              </div>
              <p className="text-xs text-slate-800 leading-snug">
                ¡Hola mamá/papá! 🌸 Ya tomé tu chat. Cuéntame, ¿para qué fecha esperas la llegada de tu bebé o qué ajuar te gustaría personalizar?
              </p>
            </div>
          ),
          time: '10:43 AM',
        };
        setChatHistory((prev) => [...prev, botReply]);
        onToast('¡Sarah Concierge ha tomado el chat en vivo!', 'support_agent');
      }, 800);
    }
  };

  const handleNextClick = () => {
    setSuccessSaved(true);
    onToast('Configuración guardada ✓ Pasando al Paso 3: Asignar Asesoras...', 'arrow_forward');
    setTimeout(() => {
      onNext();
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-10 bg-[#f6faff] min-h-screen text-[#141d23]">
      {/* Stepper Progress Header */}
      <div className="px-4 pt-3 pb-2 bg-[#f6faff]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#008376] text-white flex items-center justify-center text-xs font-bold font-heading">
              2
            </span>
            <span className="font-heading font-bold text-base text-slate-900">
              Paso 2 de 4
            </span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00685d]">
            Flujo de Pauta
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-2">
          Perfil Comercial y Bot de Respuesta Inmediata
        </p>

        {/* Progress Bar 50% */}
        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-[#00685d] rounded-full transition-all duration-300" style={{ width: '50%' }}></div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* WhatsApp Business Profile Card */}
        <section
          className={`bg-white rounded-xl shadow-xs p-3.5 flex flex-col gap-3 border transition-all ${
            isAdminView ? 'ring-2 ring-[#00685d] bg-emerald-50/20' : 'border-slate-200/70'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#00685d] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                storefront
              </span>
              <h2 className="font-heading font-bold text-sm text-slate-900">
                Ficha del Perfil WhatsApp Oficial
              </h2>
            </div>
            <button
              onClick={() => {
                setIsAdminView(!isAdminView);
                onToast(
                  !isAdminView ? 'Modo Admin: ID Comercial WABA verificado' : 'Modo: Así ve tu perfil una clienta',
                  'visibility'
                );
              }}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-[#00685d] text-slate-600 text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">visibility</span>
              <span>{isAdminView ? 'Vista Admin' : 'Vista Cliente'}</span>
            </button>
          </div>

          {/* Brand Info Row */}
          <div className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="relative shrink-0">
              <img
                alt="Logo Petit Bébé"
                className="w-14 h-14 rounded-full object-cover shadow-xs bg-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgVOFPl3laTjwyZ602n0zMMBn_i1Me3EnFyYiP9dxgqeCdUTPZssOW4HXaVlkyC-wFNzm49eCnIZn42-cOr-14zhdrv0hBziCuSMtX-Ljc-vmBGTfv5eGdW1ST1RFaQVPempwAsHO095Ime1G7zsGoLRmBDb1zx_Grv3vi0MLGqViPC6NbY3plAH9AAXDdcRC_JnH1mKRs01cv3VArnqhzFsCBd5zaxKECr1WuOkiavCgKxCyiaInrtA"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-heading font-bold text-sm text-slate-900 truncate">
                  {brandName || 'Petit Bébé Oficial'}
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#5dfd8a]/40 text-[#005322] text-[10px] font-bold flex items-center gap-0.5 border border-[#006d2f]/20">
                  <span className="material-symbols-outlined text-[11px]">verified</span> Verificado
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Cuenta Comercial de Meta • +51 {phone}
              </span>
              <span className="text-[11px] font-semibold text-[#00685d] mt-0.5">
                Ropa para Bebés y Recién Nacidos
              </span>
            </div>
          </div>

          {/* Description & Schedule */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0 mt-0.5">
                info
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Boutique especializada en ajuares y prendas 100% Algodón Pima orgánico para recién nacidos y bebés hasta 12 meses.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">
                schedule
              </span>
              <p className="text-xs text-slate-700">
                <strong className="font-semibold text-slate-900">Lunes a Sábado:</strong> 8:00 AM - 8:00 PM{' '}
                <span className={botActive ? 'text-[#00685d] font-semibold' : 'text-amber-700 font-semibold'}>
                  • {botActive ? 'Bot activo 24/7' : 'Bot pausado'}
                </span>
              </p>
            </div>

            {/* Catalog Synced Pill */}
            <div className="flex items-center justify-between bg-slate-100/80 rounded-lg p-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00685d] text-[20px]">
                  inventory_2
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">Catálogo Sincronizado</span>
                  <span className="text-[11px] text-slate-500">14 productos activos disponibles</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-white text-[#00685d] text-[11px] font-bold shadow-xs border border-slate-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006d2f]"></span> Activo
              </span>
            </div>
          </div>
        </section>

        {/* Ad Trigger Section */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00685d] text-[20px]">
                campaign
              </span>
              <h2 className="font-heading font-bold text-sm text-slate-900">
                Disparador de Pauta (Meta / TikTok Ads)
              </h2>
            </div>
            <span className="text-xs font-bold text-[#006d2f]">Respuesta &lt;2s</span>
          </div>

          {/* Interactive Coupon Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00685d] text-[18px]">
                confirmation_number
              </span>
              <span className="text-xs text-slate-700 font-medium">Cupón Activo:</span>
              <button
                onClick={toggleCoupon}
                className="px-2 py-0.5 rounded-lg bg-white border border-emerald-300 font-mono font-bold text-xs text-[#00685d] shadow-xs hover:bg-[#008376] hover:text-white transition flex items-center gap-1 active:scale-95 cursor-pointer"
                title="Clic para cambiar descuento entre 20% y 25%"
                type="button"
              >
                <span>{couponCode}</span>
                <span className="material-symbols-outlined text-[12px] opacity-70">swap_horiz</span>
              </button>
            </div>
            <button
              onClick={copyCoupon}
              className="text-xs font-semibold text-[#00685d] hover:underline flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              <span>Copiar</span>
            </button>
          </div>

          {/* WhatsApp Conversation Canvas Simulation */}
          <div
            className="bg-[#ECE5DD] rounded-xl p-3.5 flex flex-col gap-3 shadow-xs border border-black/5 relative overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(#d4cbbe 0.75px, transparent 0.75px)',
              backgroundSize: '16px 16px',
            }}
          >
            {/* Header reset control */}
            <div className="flex items-center justify-between pb-1 border-b border-black/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] shadow-xs"></div>
                <span className="text-[11px] text-stone-700 font-semibold">
                  Simulador de Conversación en Vivo
                </span>
              </div>
              <button
                onClick={() => {
                  setChatHistory([]);
                  setIsTyping(false);
                  onToast('Simulación reiniciada', 'restart_alt');
                }}
                className="text-[11px] font-medium text-stone-600 hover:text-stone-900 bg-white/70 px-2 py-0.5 rounded-md hover:bg-white shadow-xs transition flex items-center gap-1 active:scale-95 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[13px]">restart_alt</span>
                <span>Reiniciar simulación</span>
              </button>
            </div>

            {/* Client incoming message from ad */}
            <div className="flex flex-col items-end w-full">
              <span className="text-[10px] text-stone-500 mb-0.5">
                Mensaje predeterminado de anuncio
              </span>
              <div className="max-w-[85%] bg-[#DCF8C6] rounded-xl rounded-tr-none p-2.5 shadow-xs flex flex-col gap-1 border border-black/5">
                <div className="flex items-center gap-1 text-[#075E54]">
                  <span className="material-symbols-outlined text-[14px]">ads_click</span>
                  <span className="text-[10px] font-bold">Campaña: Ajuar_Bienvenida_Setiembre</span>
                </div>
                <p className="text-xs text-stone-800 leading-snug">
                  ¡Hola! Vi el anuncio del Ajuar de Bienvenida con{' '}
                  <span className="font-bold">{discountPercent}% OFF</span> 👶✨
                </p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <span className="text-[9px] text-stone-500">10:42 AM</span>
                  <span className="material-symbols-outlined text-[#34B7F1] text-[13px]">
                    done_all
                  </span>
                </div>
              </div>
            </div>

            {/* Outgoing automatic Bot welcome */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span className="text-[10px] text-[#075E54] font-bold">Bot de Bienvenida Automático</span>
              </div>
              <div className="max-w-[90%] bg-white rounded-xl rounded-tl-none shadow-xs overflow-hidden flex flex-col border border-black/5">
                <div className="p-2.5 flex flex-col gap-1">
                  <p className="text-xs text-slate-800 leading-snug">
                    ¡Hola! 🍼 Bienvenida a <strong className="text-[#00685d]">Petit Bébé</strong>. Tu cupón{' '}
                    <span className="bg-[#DCF8C6] px-1.5 py-0.5 rounded font-mono font-bold text-[#075E54] border border-[#25D366]/30">
                      {couponCode}
                    </span>{' '}
                    está activado. ¿Cómo deseas continuar?
                  </p>
                  <div className="flex items-center justify-end">
                    <span className="text-[9px] text-slate-400">10:42 AM</span>
                  </div>
                </div>

                {/* Quick Reply interactive options */}
                <div className="flex flex-col bg-slate-50/80 divide-y divide-slate-100 text-xs">
                  <button
                    onClick={() => handleQuickReply('catalogo')}
                    className="w-full py-2 px-3 text-center text-[#00685d] font-semibold hover:bg-white active:bg-emerald-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    <span>🧸</span>
                    <span>1. Ver Catálogo y Precios</span>
                  </button>
                  <button
                    onClick={() => handleQuickReply('tallas')}
                    className="w-full py-2 px-3 text-center text-[#00685d] font-semibold hover:bg-white active:bg-emerald-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    <span>📏</span>
                    <span>2. Guía de Tallas (0-12m)</span>
                  </button>
                  <button
                    onClick={() => handleQuickReply('asesora')}
                    className="w-full py-2 px-3 text-center text-[#00685d] font-semibold hover:bg-white active:bg-emerald-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    <span>👩‍💼</span>
                    <span>3. Hablar con Asesora en Vivo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic history bubbles */}
            {chatHistory.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  item.sender === 'user' ? 'items-end' : 'items-start'
                } w-full animate-enter`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-2.5 shadow-xs text-xs leading-snug border border-black/5 ${
                    item.sender === 'user'
                      ? 'bg-[#DCF8C6] text-stone-800 rounded-tr-none'
                      : 'bg-white text-stone-800 rounded-tl-none'
                  }`}
                >
                  <div>{item.content}</div>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-stone-400">
                    <span>{item.time}</span>
                    {item.sender === 'user' && (
                      <span className="material-symbols-outlined text-[#34B7F1] text-[13px]">
                        done_all
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="self-start bg-white px-3 py-1.5 rounded-xl rounded-tl-none shadow-xs text-xs flex items-center gap-1.5 border border-black/5">
                <span className="text-[10px] text-stone-500 font-medium">Petit Bébé escribiendo</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] typing-dot"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] typing-dot"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] typing-dot"></span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Visual Catalog Samples */}
        <section className="bg-white rounded-xl p-3.5 shadow-xs flex flex-col gap-2.5 border border-slate-200/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold text-slate-900">
              Muestra Visual del Catálogo
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00685d]">touch_app</span>
              <span>Toca para ver detalle</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Card 1 */}
            <div
              onClick={() =>
                onOpenProduct({
                  id: 'ajuar-5',
                  title: 'Ajuar 5 piezas Recién Nacido',
                  price: 'S/ 119.00',
                  desc: 'Confeccionado en 100% Algodón Pima orgánico peinado. Incluye enterizo antialérgico, body cruzado, gorrito, mitones y babero bordado.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtwK7cL_dhoMx1XMvn73xXTAkzhMW1V_3YbF8liBuxKgnvzlESeElPmPA-_-UHOdT-n5eyGnfUg3n0sxSc9hdOobzP8TRJJYY0Y6ToEsuK7zEhC2AtsJFNhVfxGrqAmPy-1IjBzVEMlc7nFv60c38nWPEV6scbSHR0E8TBkiEKv7A94nne4aX5S1fXgKoMFaIfnkTfc--NI7_24Fy8jkd0ASVS6deazW5Y3MxGNtrwyTdo6IIJMJ6QZA',
                  tag: '100% Algodón Pima',
                  stock: '28 unidades',
                })
              }
              className="relative rounded-lg overflow-hidden h-28 bg-slate-100 shadow-xs cursor-pointer group hover:ring-2 hover:ring-[#00685d] transition-all"
            >
              <img
                alt="Ajuar 5 piezas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtwK7cL_dhoMx1XMvn73xXTAkzhMW1V_3YbF8liBuxKgnvzlESeElPmPA-_-UHOdT-n5eyGnfUg3n0sxSc9hdOobzP8TRJJYY0Y6ToEsuK7zEhC2AtsJFNhVfxGrqAmPy-1IjBzVEMlc7nFv60c38nWPEV6scbSHR0E8TBkiEKv7A94nne4aX5S1fXgKoMFaIfnkTfc--NI7_24Fy8jkd0ASVS6deazW5Y3MxGNtrwyTdo6IIJMJ6QZA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded text-white text-[10px] flex items-center gap-1 font-medium">
                <span>Ajuar 5 piezas</span>
                <span className="text-[#66ff8e] font-bold">S/ 119</span>
              </div>
              <div className="absolute top-1.5 right-1.5 bg-[#00685d] text-white p-0.5 rounded-full shadow opacity-90">
                <span className="material-symbols-outlined text-[13px] block">info</span>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() =>
                onOpenProduct({
                  id: 'pack-acc',
                  title: 'Pack Accesorios Pima Soft',
                  price: 'S/ 49.00',
                  desc: 'Zapatitos tejidos con hilo de algodón hipoalergénico y mitones suaves que previenen rasguños en los primeros 100 días.',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7eo4B_KHnl-JHpneRaQrhny1uB8yk0MS8X_zQRuAuTSHC5AO9fPWRfV1mniSuigg5GBeBxhoP2BLUudABwoPYY27wN9VVm5tZsrjBLXRedxe2FkKfhGI-Ai9df-8j4K4hWKoWVvtCGWPiTZkBIi3OVsY-R9InjbQBo8EuI-I5l-TsI1M9QrSWWQrN-ROovvMSFJSPJb5LZZlue06MiYzu3WNTzk34IGzKq8qMNqzV94ilZirZZuGQfA',
                  tag: 'Hipoalergénico',
                  stock: '15 unidades',
                })
              }
              className="relative rounded-lg overflow-hidden h-28 bg-slate-100 shadow-xs cursor-pointer group hover:ring-2 hover:ring-[#00685d] transition-all"
            >
              <img
                alt="Pack Accesorios"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7eo4B_KHnl-JHpneRaQrhny1uB8yk0MS8X_zQRuAuTSHC5AO9fPWRfV1mniSuigg5GBeBxhoP2BLUudABwoPYY27wN9VVm5tZsrjBLXRedxe2FkKfhGI-Ai9df-8j4K4hWKoWVvtCGWPiTZkBIi3OVsY-R9InjbQBo8EuI-I5l-TsI1M9QrSWWQrN-ROovvMSFJSPJb5LZZlue06MiYzu3WNTzk34IGzKq8qMNqzV94ilZirZZuGQfA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded text-white text-[10px] flex items-center gap-1 font-medium">
                <span>Pack Accesorios</span>
                <span className="text-[#66ff8e] font-bold">S/ 49</span>
              </div>
              <div className="absolute top-1.5 right-1.5 bg-[#00685d] text-white p-0.5 rounded-full shadow opacity-90">
                <span className="material-symbols-outlined text-[13px] block">info</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Bot Toggle Switch */}
        <section className="bg-white rounded-xl p-3.5 shadow-xs flex items-center justify-between gap-3 border border-slate-200/70">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                botActive ? 'bg-[#5dfd8a]/40 text-[#005322]' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                  Bot de Pauta Encendido en Vivo
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    botActive
                      ? 'bg-[#5dfd8a]/30 text-[#006d2f] border-[#006d2f]/30'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}
                >
                  {botActive ? 'Activo 24/7' : 'En Pausa'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {botActive
                  ? 'Atenderá leads entrantes de anuncios 24/7 sin demora'
                  : 'Pausado: Las respuestas automáticas están en espera'}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={botActive}
              onChange={(e) => {
                const nextState = e.target.checked;
                setBotActive(nextState);
                onToast(
                  nextState ? 'Bot encendido: atendiendo en tiempo real' : 'Bot pausado temporalmente',
                  nextState ? 'smart_toy' : 'pause_circle'
                );
              }}
              className="sr-only peer"
            />
            <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#00685d]"></div>
          </label>
        </section>

        {/* Confirmation banner */}
        {successSaved && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-xl flex items-start gap-2.5 animate-enter">
            <span className="material-symbols-outlined text-[#006d2f] text-[22px] shrink-0 mt-0.5">
              task_alt
            </span>
            <div className="text-xs">
              <strong className="font-bold text-[#005322]">¡Configuración guardada con éxito!</strong>
              <p className="text-slate-600 mt-0.5">
                Perfil y Bot sincronizados. Pasando a asignar asesoras humanas y reglas en el Paso 3.
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <section className="pt-1 flex flex-col gap-2">
          <button
            onClick={handleNextClick}
            className="w-full h-12 bg-[#00685d] hover:bg-[#008376] active:scale-[0.98] text-white rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            type="button"
          >
            <span>Siguiente: Asignar Asesoras y Reglas</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <div className="flex items-center justify-center gap-1 text-center text-slate-500 text-[11px]">
            <span className="material-symbols-outlined text-[14px] text-[#006d2f]">lock</span>
            <span>Conexión cifrada vía API Oficial WhatsApp Cloud</span>
          </div>
        </section>
      </div>
    </div>
  );
};
