import React from 'react';

interface PdfSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  phone: string;
}

export const PdfSummaryModal: React.FC<PdfSummaryModalProps> = ({
  isOpen,
  onClose,
  brandName,
  phone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-enter">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-slate-200">
        {/* Header */}
        <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#25D366]">
              description
            </span>
            <div>
              <h3 className="font-heading font-bold text-base">Ficha Técnica Ejecutiva</h3>
              <p className="text-[11px] text-emerald-100">Arquitectura de Ventas WhatsApp Business Cloud API</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Document Body */}
        <div className="p-5 flex flex-col gap-4 text-xs text-slate-700">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900">{brandName}</h4>
              <p className="text-slate-500 text-[11px]">Línea Oficial: +51 {phone}</p>
              <p className="text-slate-500 text-[11px]">Meta Business Manager ID: 9048-2819-WABA</p>
            </div>
            <span className="bg-emerald-50 text-[#075E54] font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-200">
              Certificado Meta Cloud
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="font-heading font-bold text-slate-800 text-xs uppercase tracking-wider text-[#00685d]">
              Métricas Operativas del Embudo
            </h5>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500">Tiempo de Respuesta Bot</span>
                <p className="font-bold text-slate-900 text-sm">&lt; 2.0 segundos</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Tasa Retención Handoff</span>
                <p className="font-bold text-slate-900 text-sm">94.8% sin fricción</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Ticket Promedio Canastilla</span>
                <p className="font-bold text-slate-900 text-sm">$39.92 USD</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Índice Satisfacción CSAT</span>
                <p className="font-bold text-slate-900 text-sm">4.9 / 5 ⭐</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="font-heading font-bold text-slate-800 text-xs uppercase tracking-wider text-[#00685d]">
              Componentes Tecnológicos Integrados
            </h5>
            <ul className="space-y-1.5 pl-2 text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0">check_circle</span>
                <span><strong>Meta Cloud API:</strong> Webhook seguro con verificación criptográfica en tiempo real.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0">check_circle</span>
                <span><strong>Bot Inteligente de Pauta:</strong> Atiende leads con cupón de bienvenida activado y menú interactivo.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0">check_circle</span>
                <span><strong>Enrutamiento Round Robin:</strong> Distribución equitativa y detección de intención comercial para handoff.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0">check_circle</span>
                <span><strong>Catálogo Sincronizado:</strong> Presentación visual de prendas de algodón pima hipoalergénico.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-[11px] text-[#075E54]">
            <strong>Nota de Auditoría:</strong> El flujo cumple con las normas de privacidad de datos para prendas de recién nacido y cuenta con cifrado de extremo a extremo en cada sesión.
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 px-3 bg-[#075E54] hover:bg-[#128C7E] text-white font-heading font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">print</span>
            <span>Imprimir / Guardar PDF</span>
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition cursor-pointer"
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
