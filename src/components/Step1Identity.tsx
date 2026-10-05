import React, { useState, useEffect } from 'react';

interface Step1IdentityProps {
  brandName: string;
  setBrandName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  onNext: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const Step1Identity: React.FC<Step1IdentityProps> = ({
  brandName,
  setBrandName,
  phone,
  setPhone,
  onNext,
  onToast,
}) => {
  const [verificationMode, setVerificationMode] = useState<'sms' | 'call'>('sms');
  const [pinDigits, setPinDigits] = useState<string[]>(['6', '5', '4', '2', '1', '0']);
  const [countdown, setCountdown] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(true);
  const [metaTesting, setMetaTesting] = useState(false);
  const [showPreApprovedBanner, setShowPreApprovedBanner] = useState(true);
  const [isContinuing, setIsContinuing] = useState(false);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleDigitChange = (index: number, val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    const newDigits = [...pinDigits];
    newDigits[index] = cleaned ? cleaned.slice(-1) : '';
    setPinDigits(newDigits);

    if (cleaned && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleFillDemoPin = () => {
    setPinDigits(['6', '5', '4', '2', '1', '0']);
    onToast('PIN 654210 autocompletado y validado', 'bolt');
  };

  const handleClearPin = () => {
    setPinDigits(['', '', '', '', '', '']);
    onToast('PIN limpiado', 'backspace');
  };

  const handleResend = () => {
    setIsResending(true);
    setCountdown(60);
    setTimeout(() => {
      setIsResending(false);
      setPinDigits(['6', '5', '4', '2', '1', '0']);
      onToast(`Nuevo SMS enviado a +51 ${phone}: 654-210`, 'sms');
    }, 600);
  };

  const testMetaPing = () => {
    setMetaTesting(true);
    setTimeout(() => {
      setMetaTesting(false);
      onToast('Meta Cloud API: Latencia 38ms • Estado 200 OK', 'cloud_done');
    }, 800);
  };

  const handleContinue = () => {
    if (!legalAccepted) {
      onToast('Debes aceptar las políticas de comercio para continuar', 'error');
      return;
    }
    setIsContinuing(true);
    onToast('Guardando datos y avanzando a Paso 2: Perfil y Bot...', 'hourglass_top');
    setTimeout(() => {
      setIsContinuing(false);
      onNext();
    }, 650);
  };

  const isPinComplete = pinDigits.every((d) => d.length === 1);

  return (
    <div className="flex flex-col w-full pb-10 bg-[#f6faff] min-h-screen text-[#141d23]">
      {/* Toast Banner if active */}
      {showPreApprovedBanner && (
        <div className="px-4 pt-3 pb-0 animate-enter">
          <div className="flex items-center gap-3 p-3 bg-[#5dfd8a]/30 border border-[#006d2f]/20 text-[#005322] rounded-xl shadow-xs">
            <span
              className="material-symbols-outlined text-[20px] text-[#006d2f] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-heading font-bold">Número comercial pre-aprobado</span>
              <span className="text-[11px] opacity-90 truncate">
                Línea oficial lista para integrarse con Meta Cloud API
              </span>
            </div>
            <button
              onClick={() => setShowPreApprovedBanner(false)}
              className="ml-auto p-1 text-[#005322] hover:opacity-70 transition cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Stepper Progress */}
      <section className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-[#00685d] font-bold">
            Paso 1 de 4
          </span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-[#006d2f] animate-pulse"></span>
            Meta Verified Partner Ready
          </span>
        </div>

        {/* 4 segments */}
        <div className="flex items-center gap-1.5 w-full">
          <div className="h-1.5 flex-1 rounded-full bg-[#00685d]"></div>
          <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
          <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
          <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <h2 className="font-heading font-bold text-xl text-slate-900">
            Alta y Verificación de WhatsApp
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Asigna el número oficial exclusivo y valida la identidad comercial de tu boutique de ropa de bebé para habilitar mensajes masivos y catálogo.
          </p>
        </div>
      </section>

      {/* Live WhatsApp Customer Preview Bubble Card */}
      <section className="px-4 pb-2">
        <div className="bg-[#ecf5fe] rounded-xl p-3.5 shadow-xs flex flex-col gap-2 border border-slate-200/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Vista Previa del Cliente
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white text-slate-600 text-[10px] font-medium border border-slate-200">
              Burbuja Oficial
            </span>
          </div>

          <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-xs border border-slate-100">
            <div className="relative shrink-0">
              <img
                alt="Petit Bébé"
                className="w-12 h-12 rounded-full object-cover shadow-xs bg-slate-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHVPkwhWjYxsZ4-VOtvLzUn8wKELF9YFdclnaks3zYOBYtdcEBU0_U_W5-yqZT-k6W6Osq_00fOQrhTZ3UPLdVBJ2pYNhO6aXwDrL1LgkTiXKJUBQG-GmWlzKSrZHP201vA-YDfBlkSCnRAOTHjicPBMBROe7aTC7JnFSsM_6w3ncPsxu95Q_3Ddt9FRdwrAXBF3y-wPswZkpqGDFNklKmGGI6GZMWyHM0s1CpDb6s_RZfcRTCh5yCnA"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-[#006d2f] text-white rounded-full p-0.5 flex items-center justify-center shadow-xs">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1 min-w-0">
                <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
                  {brandName || 'Petit Bébé - Ropa de Bebé'}
                </span>
                <span
                  className="material-symbols-outlined text-[#006d2f] text-[16px] shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <span className="text-[11px] text-[#00685d] font-medium truncate">
                Cuenta de empresa oficial • Meta verified
              </span>
              <span className="text-[11px] text-slate-600 truncate mt-0.5">
                ¡Hola! Bienvenidos a Petit Bébé 🧸 Especialistas en ajuar 100% Pima.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Business Official Info */}
      <section className="px-4 py-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#008376] text-white flex items-center justify-center text-xs font-bold font-heading">
            1
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900">
            Datos del Negocio Oficial
          </h3>
        </div>

        {/* Visible Name Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-700 font-semibold" htmlFor="brandNameInput">
              Nombre comercial visible
            </label>
            <span className="text-[11px] text-[#00685d] font-medium">Aprobación automática</span>
          </div>
          <div className="relative flex items-center">
            <input
              id="brandNameInput"
              className="w-full h-11 px-3 pr-10 rounded-lg bg-white text-slate-900 text-sm shadow-xs border border-slate-200 outline-none focus:border-[#00685d] transition-all"
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Ej. Petit Bébé - Ropa de Bebé & Algodón Pima"
            />
            <span
              className="material-symbols-outlined absolute right-3 text-[#006d2f] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <span className="text-[10px] text-slate-500">
            Cumple las directrices de nombres comerciales de Meta Commerce.
          </span>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-700 font-semibold">
            Categoría comercial en WhatsApp
          </label>
          <div className="h-11 px-3 flex items-center justify-between rounded-lg bg-white text-slate-800 text-sm shadow-xs border border-slate-200">
            <div className="flex items-center gap-2 truncate">
              <span className="material-symbols-outlined text-[#00685d] text-[20px] shrink-0">
                styler
              </span>
              <span className="truncate text-xs font-medium">Ropa Infantil y Bebés / Maternidad</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[20px] shrink-0">
              expand_more
            </span>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-700 font-semibold" htmlFor="phoneInput">
              Número comercial exclusivo
            </label>
            <span className="text-[11px] text-[#006d2f] font-semibold">Línea limpia Meta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-11 px-3 rounded-lg bg-white text-slate-800 flex items-center gap-1.5 shrink-0 shadow-xs border border-slate-200">
              <span className="text-[16px] leading-none">🇵🇪</span>
              <span className="text-xs font-bold">+51</span>
              <span className="material-symbols-outlined text-[16px] text-slate-400">
                arrow_drop_down
              </span>
            </div>
            <div className="flex-1 relative flex items-center">
              <input
                id="phoneInput"
                className="w-full h-11 px-3 pr-9 rounded-lg bg-white text-slate-900 text-sm shadow-xs border border-slate-200 outline-none focus:border-[#00685d] tracking-wider font-mono font-medium transition-all"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <span
                className="material-symbols-outlined absolute right-3 text-[#006d2f] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">
            No debe estar registrado en una app estándar de WhatsApp personal o Messenger.
          </p>
        </div>

        {/* Visual Catalog Banner Card */}
        <div className="relative rounded-xl overflow-hidden h-36 bg-slate-800 shadow-sm mt-1">
          <img
            alt="Colección Ajuar Pima"
            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtwK7cL_dhoMx1XMvn73xXTAkzhMW1V_3YbF8liBuxKgnvzlESeElPmPA-_-UHOdT-n5eyGnfUg3n0sxSc9hdOobzP8TRJJYY0Y6ToEsuK7zEhC2AtsJFNhVfxGrqAmPy-1IjBzVEMlc7nFv60c38nWPEV6scbSHR0E8TBkiEKv7A94nne4aX5S1fXgKoMFaIfnkTfc--NI7_24Fy8jkd0ASVS6deazW5Y3MxGNtrwyTdo6IIJMJ6QZA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
            <div>
              <p className="text-white font-heading font-bold text-xs drop-shadow-sm">
                Petit Bébé Perú
              </p>
              <p className="text-emerald-200 text-[10px] drop-shadow-sm">
                Colección Ajuar Pima 50/1 Verano 2025
              </p>
            </div>
            <span className="px-2 py-0.5 bg-[#006d2f] text-white rounded text-[10px] font-bold shadow">
              Catálogo Activo
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Verification Method */}
      <section className="px-4 py-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#008376] text-white flex items-center justify-center text-xs font-bold font-heading">
            2
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900">
            Método de Verificación de Número
          </h3>
        </div>

        {/* Radio Option 1: SMS */}
        <div
          onClick={() => {
            setVerificationMode('sms');
            onToast('Modo seleccionado: SMS con código de 6 dígitos', 'sms');
          }}
          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all shadow-xs border ${
            verificationMode === 'sms'
              ? 'bg-[#5dfd8a]/20 border-[#006d2f]/40'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                verificationMode === 'sms'
                  ? 'bg-[#5dfd8a] text-[#005322]'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">sms</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xs text-slate-900">
                SMS con código de 6 dígitos
              </span>
              <span className="text-[11px] text-slate-500">Recomendado • Llega en ~10 segundos</span>
            </div>
          </div>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
              verificationMode === 'sms' ? 'bg-[#006d2f]' : 'bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">done</span>
          </div>
        </div>

        {/* Radio Option 2: Automatic Call */}
        <div
          onClick={() => {
            setVerificationMode('call');
            onToast('Modo seleccionado: Llamada telefónica automática', 'phone_in_talk');
          }}
          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all shadow-xs border ${
            verificationMode === 'call'
              ? 'bg-[#5dfd8a]/20 border-[#006d2f]/40'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                verificationMode === 'call'
                  ? 'bg-[#5dfd8a] text-[#005322]'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xs text-slate-900">
                Llamada telefónica automática
              </span>
              <span className="text-[11px] text-slate-500">Operador de voz de Meta anunciará tu PIN</span>
            </div>
          </div>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
              verificationMode === 'call' ? 'bg-[#006d2f]' : 'bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">done</span>
          </div>
        </div>

        {/* Interactive PIN box */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold text-slate-800">Código de seguridad</span>
            <span className="text-[11px] font-semibold text-[#006d2f] flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[16px] text-[#006d2f]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span>
                {isPinComplete ? 'Código verificado con éxito' : 'Ingresa los 6 dígitos'}
              </span>
            </span>
          </div>

          {/* 6 Digit Cells */}
          <div className="flex items-center justify-center gap-2 w-full py-1">
            {pinDigits.slice(0, 3).map((val, idx) => (
              <input
                key={idx}
                id={`pin-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-10 h-12 rounded-lg bg-slate-100 text-center font-heading font-bold text-lg text-slate-800 shadow-xs border border-slate-200 outline-none focus:border-[#00685d] focus:bg-white transition-all"
              />
            ))}
            <span className="text-slate-400 font-bold text-base">-</span>
            {pinDigits.slice(3, 6).map((val, idx) => (
              <input
                key={idx + 3}
                id={`pin-${idx + 3}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => handleDigitChange(idx + 3, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx + 3, e)}
                className="w-10 h-12 rounded-lg bg-slate-100 text-center font-heading font-bold text-lg text-slate-800 shadow-xs border border-slate-200 outline-none focus:border-[#00685d] focus:bg-white transition-all"
              />
            ))}
          </div>

          {/* Auto fill / Clear controls */}
          <div className="flex items-center justify-between w-full pt-1 border-t border-slate-100 text-xs">
            <button
              onClick={handleFillDemoPin}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#006d2f] hover:bg-emerald-100 font-semibold transition flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">bolt</span>
              <span>Autocompletar (654210)</span>
            </button>
            <button
              onClick={handleClearPin}
              className="px-2 py-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
              type="button"
            >
              Borrar
            </button>
          </div>

          <div className="flex items-center justify-between w-full pt-1 text-[11px] text-slate-500">
            <span>Recibido en +51 {phone}</span>
            <button
              onClick={handleResend}
              disabled={countdown > 0 || isResending}
              className={`font-semibold flex items-center gap-1 cursor-pointer transition ${
                countdown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-[#00685d] hover:underline'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">refresh</span>
              <span>
                {countdown > 0
                  ? `Reenviar PIN (0:${countdown < 10 ? '0' + countdown : countdown})`
                  : 'Reenviar PIN ahora'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Meta Business Manager */}
      <section className="px-4 py-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#008376] text-white flex items-center justify-center text-xs font-bold font-heading">
            3
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900">
            Meta Business Manager Vinculado
          </h3>
        </div>

        <div className="bg-[#ecf5fe] rounded-xl p-3.5 shadow-xs border border-slate-200/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#00685d] border border-slate-100">
                <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-heading font-bold text-xs text-slate-900 truncate">
                  Petit Bébé S.A.C.
                </span>
                <span className="text-[11px] text-slate-500">ID Oficial: 9048-2819-WABA</span>
              </div>
            </div>

            <button
              onClick={testMetaPing}
              className="px-2.5 py-1 rounded-full bg-[#5dfd8a]/40 hover:bg-[#5dfd8a]/60 text-[#005322] text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer border border-[#006d2f]/20"
              type="button"
            >
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  metaTesting ? 'bg-amber-500 animate-ping' : 'bg-[#006d2f]'
                }`}
              ></span>
              <span>{metaTesting ? 'Verificando...' : 'Conectado'}</span>
            </button>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded-lg flex items-center gap-1.5 shadow-xs border border-slate-100">
              <span className="material-symbols-outlined text-[#006d2f] text-[16px]">cloud_sync</span>
              <span className="text-[11px] text-slate-800 font-medium truncate">
                WhatsApp Cloud API
              </span>
            </div>
            <div className="bg-white p-2 rounded-lg flex items-center gap-1.5 shadow-xs border border-slate-100">
              <span className="material-symbols-outlined text-[#006d2f] text-[16px]">security</span>
              <span className="text-[11px] text-slate-800 font-medium truncate">
                Cifrado Extremo a Extremo
              </span>
            </div>
          </div>

          {/* Legal checkbox */}
          <div
            onClick={() => setLegalAccepted(!legalAccepted)}
            className="flex items-start gap-2.5 pt-1 cursor-pointer select-none"
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition ${
                legalAccepted
                  ? 'bg-[#006d2f] text-white'
                  : 'bg-white border border-slate-300 text-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Acepto las{' '}
              <span className="text-[#00685d] font-semibold hover:underline">
                Políticas de Comercio de WhatsApp
              </span>
              , los Términos del Servicio de{' '}
              <span className="text-[#00685d] font-semibold hover:underline">
                Meta Cloud API
              </span>{' '}
              y la reglamentación de protección de datos infantiles.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="p-4 mt-2 flex flex-col gap-2">
        <button
          onClick={handleContinue}
          disabled={isContinuing}
          className="w-full h-12 bg-[#006d2f] hover:bg-[#005322] active:scale-[0.98] text-white rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
          type="button"
        >
          {isContinuing ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                progress_activity
              </span>
              <span>Guardando y conectando...</span>
            </>
          ) : (
            <>
              <span>Continuar a Configurar Perfil y Bot</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-center text-slate-500 text-[11px]">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span>Entorno de producción certificado para WhatsApp Business API</span>
        </div>
      </section>
    </div>
  );
};
