import { useState } from 'react';
import { Advisor, CatalogProduct } from './types';
import { Header } from './components/Header';
import { Step1Identity } from './components/Step1Identity';
import { Step2ProfileBot } from './components/Step2ProfileBot';
import { Step3AutoResponder } from './components/Step3AutoResponder';
import { Step4CatalogHandoff } from './components/Step4CatalogHandoff';
import { Step5Overview360 } from './components/Step5Overview360';
import { ProductModal } from './components/ProductModal';
import { RegisterAgentModal } from './components/RegisterAgentModal';
import { ChatLiveModal } from './components/ChatLiveModal';
import { PdfSummaryModal } from './components/PdfSummaryModal';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // Business state
  const [brandName, setBrandName] = useState('Petit Bébé - Ropa de Bebé & Algodón Pima');
  const [phone, setPhone] = useState('987 654 321');
  const [couponCode, setCouponCode] = useState('BIENVENIDO20');
  const [discountPercent, setDiscountPercent] = useState(20);

  // Advisors state
  const [advisors, setAdvisors] = useState<Advisor[]>([
    {
      id: 1,
      name: 'Sarah Concierge',
      role: 'Especialista en Ajuares y Canastillas',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAS8QWoQQfJLZGTlI1RAnZh7hlHyDMds6P3V6YdzUHIoK8Qi8oYTECBnq0OkJ_kE5QsvrDP6x3Qh8umqrqtkdvxPl1M4Ka82t2DU0nc9RyQ7ppA-ij2PufadvsMeTU9eiHdoLs6zY1CeHttqIKpuCdrDJPEzI225twBkvOmSnt_FKwvWXORwikzt-i7kO_SxeEMLMimO4fTFKCRZnP4EvyFKxhHqBt2rRg9wtmjp1cURNipwO3EhetlSg',
      status: 'disponible',
      activeChats: 3,
      maxChats: 5,
      responseTime: '< 1 min respuesta',
    },
    {
      id: 2,
      name: 'Sofía Asesora',
      role: 'Atención Pauta y Asesoría de Tallas',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAQgBQOw8qmbdqt8NiOra0EIOMH05DtY82qHUbw0PuMfpUD7PZZsjJOB8CMxoMe-rRnJtfD3koyDw6jnN9PJJVWVtznCXvsqw8SO5q6Xvaw6p-Sc_E16iBk1h7lwqn5bIXCfhSyUfJKnZ3gyHPLi3MRDXRdjNZKf9U5vSnK9ow1MbNAFu12o1pbcgoX68Ei89sRWjQ203CG-EjTiYtr-xDmTMIm1GBkx9LubunYEaxCFrOpCrt8Q3tWAg',
      status: 'disponible',
      activeChats: 2,
      maxChats: 4,
      responseTime: '< 2 min respuesta',
    },
  ]);

  const [routingMode, setRoutingMode] = useState<'round_robin' | 'least_load'>('round_robin');
  const [keywords, setKeywords] = useState<string[]>([
    'humano',
    'asesora',
    'pago',
    'talla especial',
  ]);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; icon: string; isVisible: boolean }>({
    message: '',
    icon: 'check_circle',
    isVisible: false,
  });

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 2800);
  };

  // Advisor handlers
  const handleCycleStatus = (id: number) => {
    setAdvisors((prev) =>
      prev.map((adv) => {
        if (adv.id !== id) return adv;
        const nextStatus =
          adv.status === 'disponible'
            ? 'ocupada'
            : adv.status === 'ocupada'
            ? 'pausa'
            : 'disponible';
        showToast(`${adv.name}: Estado cambiado a "${nextStatus}"`, 'published_with_changes');
        return { ...adv, status: nextStatus };
      })
    );
  };

  const handleAdjustChats = (id: number, delta: number) => {
    setAdvisors((prev) =>
      prev.map((adv) => {
        if (adv.id !== id) return adv;
        const newChats = Math.max(0, Math.min(adv.activeChats + delta, adv.maxChats + 2));
        const newResponseTime =
          newChats === 0
            ? '< 30s inmediata'
            : newChats <= 2
            ? '< 1 min respuesta'
            : newChats <= 4
            ? '< 2 min respuesta'
            : '< 4 min carga alta';
        return { ...adv, activeChats: newChats, responseTime: newResponseTime };
      })
    );
  };

  const handleRegisterAdvisor = (newAdv: Advisor) => {
    setAdvisors((prev) => [...prev, newAdv]);
    showToast(`Asesora ${newAdv.name} registrada con éxito`, 'person_add');
  };

  const handleAddKeyword = (kw: string) => {
    if (!keywords.includes(kw)) {
      setKeywords((prev) => [...prev, kw]);
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kw));
    showToast(`Palabra clave eliminada: "${kw}"`, 'label_off');
  };

  return (
    <div className="min-h-screen bg-slate-900/90 text-slate-800 flex flex-col items-center">
      {/* Container wrapper for mobile frame or full width */}
      <div
        className={`w-full min-h-screen flex flex-col bg-[#f6faff] transition-all duration-300 shadow-2xl relative ${
          isMobileFrame
            ? 'max-w-[430px] my-0 sm:my-3 sm:rounded-[32px] overflow-hidden border-0 sm:border-[8px] sm:border-slate-800'
            : 'max-w-4xl'
        }`}
      >
        {/* Global Header */}
        <Header
          currentStep={currentStep}
          onStepChange={(step) => setCurrentStep(step)}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
          onToast={showToast}
        />

        {/* Step Views */}
        <main className="flex-1 flex flex-col">
          {currentStep === 1 && (
            <Step1Identity
              brandName={brandName}
              setBrandName={setBrandName}
              phone={phone}
              setPhone={setPhone}
              onNext={() => setCurrentStep(2)}
              onToast={showToast}
            />
          )}

          {currentStep === 2 && (
            <Step2ProfileBot
              brandName={brandName}
              phone={phone}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
              onNext={() => setCurrentStep(3)}
              onOpenProduct={(prod) => setSelectedProduct(prod)}
              onToast={showToast}
            />
          )}

          {currentStep === 3 && (
            <Step3AutoResponder
              advisors={advisors}
              onCycleStatus={handleCycleStatus}
              onAdjustChats={handleAdjustChats}
              onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
              routingMode={routingMode}
              setRoutingMode={setRoutingMode}
              keywords={keywords}
              onAddKeyword={handleAddKeyword}
              onRemoveKeyword={handleRemoveKeyword}
              onNext={() => setCurrentStep(4)}
              onToast={showToast}
            />
          )}

          {currentStep === 4 && (
            <Step4CatalogHandoff
              couponCode={couponCode}
              onOpenLiveChat={() => setIsLiveChatOpen(true)}
              onNext={() => setCurrentStep(5)}
              onToast={showToast}
            />
          )}

          {currentStep === 5 && (
            <Step5Overview360
              brandName={brandName}
              phone={phone}
              couponCode={couponCode}
              onOpenPdfModal={() => setIsPdfModalOpen(true)}
              onNavigateStep={(step) => setCurrentStep(step)}
              onToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          toast.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700/60 text-xs font-medium">
          <span className="material-symbols-outlined text-[#25D366] text-[18px]">
            {toast.icon}
          </span>
          <span>{toast.message}</span>
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <RegisterAgentModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterAdvisor}
      />

      <ChatLiveModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        couponCode={couponCode}
      />

      <PdfSummaryModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        brandName={brandName}
        phone={phone}
      />
    </div>
  );
}
