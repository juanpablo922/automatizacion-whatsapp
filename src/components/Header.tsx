import React from 'react';

interface HeaderProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onStepChange,
  isMobileFrame,
  onToggleFrame,
  onToast,
}) => {
  const steps = [
    { num: 1, label: '1. Identidad', title: 'Step 1 Business Identity' },
    { num: 2, label: '2. Perfil & Bot', title: 'Step 2 Profile Setup' },
    { num: 3, label: '3. Asesoras', title: 'Step 3 Auto Responder' },
    { num: 4, label: '4. Handoff', title: 'Step 4 Catalog Linking' },
    { num: 5, label: '5. Embudo 360°', title: 'Presentación Integral' },
  ];

  const currentStepObj = steps.find((s) => s.num === currentStep) || steps[0];

  return (
    <header className="sticky top-0 w-full z-40 bg-[#00685d] shadow-[0_1px_8px_rgba(0,0,0,0.12)] text-white">
      {/* Top App Bar */}
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          <button
            aria-label="Volver paso anterior"
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer ${
              currentStep === 1 ? 'opacity-40 cursor-default' : ''
            }`}
            onClick={() => {
              if (currentStep > 1) {
                onStepChange(currentStep - 1);
              }
            }}
            disabled={currentStep === 1}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>

          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[#66ff8e] text-[20px] shrink-0">
              verified
            </span>
            <div className="flex flex-col min-w-0">
              <h1 className="font-heading font-bold text-sm sm:text-base text-white truncate leading-tight">
                {currentStepObj.title}
              </h1>
              <span className="text-[11px] text-[#8ff4e3] opacity-90 truncate">
                WhatsApp Business Wizard • Petit Bébé
              </span>
            </div>
          </div>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Frame switcher toggle button */}
          <button
            onClick={onToggleFrame}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-medium transition cursor-pointer text-white border border-white/10"
            title="Alternar entre vista teléfono móvil o vista de escritorio completa"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">
              {isMobileFrame ? 'fullscreen' : 'smartphone'}
            </span>
            <span>{isMobileFrame ? 'Modo Expandido' : 'Modo Celular'}</span>
          </button>

          <span className="px-2.5 py-0.5 rounded-full bg-[#008376] text-white text-[11px] font-semibold">
            {currentStep === 5 ? 'Embudo 360°' : `Paso ${currentStep} de 4`}
          </span>

          <div
            className="w-8 h-8 rounded-full bg-[#005047] flex items-center justify-center cursor-pointer hover:bg-[#003d36] transition"
            onClick={() => onToast('Sesión activa: Administrador de Petit Bébé', 'person')}
            title="Usuario Administrador"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>
        </div>
      </div>

      {/* Global Navigation Tabs Bar */}
      <div className="bg-[#075E54] border-t border-white/10 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex items-center justify-start sm:justify-center px-2 py-1 gap-1">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => onStepChange(s.num)}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                currentStep === s.num
                  ? 'bg-white text-[#075E54] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              type="button"
            >
              <span>{s.label}</span>
              {currentStep === s.num && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
