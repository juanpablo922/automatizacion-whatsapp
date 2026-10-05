import React, { useState } from 'react';

interface ChatLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  couponCode: string;
}

export const ChatLiveModal: React.FC<ChatLiveModalProps> = ({
  isOpen,
  onClose,
  couponCode,
}) => {
  const [messages, setMessages] = useState([
    {
      sender: 'sarah',
      text: `¡Hola mamá/papá! 💕 Soy Sarah Concierge. Ya tengo en pantalla tu cotización del Ajuar de Bienvenida Pima ($39.92) con el cupón ${couponCode} aplicado.`,
      time: '10:44 AM',
    },
    {
      sender: 'sarah',
      text: '¿Para qué fecha esperas a tu bebé o deseas agregar el servicio de bordado personalizado?',
      time: '10:44 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputText.trim(),
      time: '10:45 AM',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg = {
        sender: 'sarah',
        text: '¡Excelente! Tenemos disponible la talla en nuestro algodón 100% Pima orgánico peinado sin níquel. Te envío aquí el enlace directo para confirmar con despacho gratuito: petitbebe.pe/checkout-pima ✨',
        time: '10:45 AM',
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-enter">
      <div className="bg-white rounded-2xl max-w-sm w-full h-[540px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Chat Header */}
        <div className="bg-[#075E54] text-white p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center font-bold text-sm text-white">
                SC
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-heading font-bold text-sm leading-tight">Sarah Concierge</h4>
                <span className="material-symbols-outlined text-[#25D366] text-[14px]">verified</span>
              </div>
              <p className="text-[10px] text-emerald-200">Especialista en Maternidad • En línea</p>
            </div>
          </div>
          <button
            aria-label="Cerrar chat"
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Handover notification bar */}
        <div className="bg-[#DCF8C6]/60 border-b border-emerald-200/50 px-3 py-1.5 flex items-center justify-between text-[11px] text-[#075E54]">
          <span className="flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Cotización transferida sin fricción
          </span>
          <span className="font-bold bg-white/80 px-1.5 py-0.5 rounded text-[10px]">
            {couponCode} -20%
          </span>
        </div>

        {/* Message canvas */}
        <div
          className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 bg-[#ECE5DD]"
          style={{
            backgroundImage: 'radial-gradient(#d4cbbe 0.75px, transparent 0.75px)',
            backgroundSize: '16px 16px',
          }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-2.5 shadow-xs text-xs leading-snug ${
                  m.sender === 'user'
                    ? 'bg-[#DCF8C6] text-slate-800 rounded-tr-none'
                    : 'bg-white text-slate-800 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-[9px] ${
                    m.sender === 'user' ? 'text-slate-500 justify-end' : 'text-slate-400 justify-end'
                  }`}
                >
                  <span>{m.time}</span>
                  {m.sender === 'user' && (
                    <span className="material-symbols-outlined text-[#34B7F1] text-[13px]">
                      done_all
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="self-start bg-white px-3 py-2 rounded-xl rounded-tl-none shadow-xs text-xs flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">Sarah escribiendo</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] typing-dot"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] typing-dot"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] typing-dot"></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick chip responses */}
        <div className="px-2 py-1.5 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[11px]">
          <button
            type="button"
            onClick={() => setInputText('Nace en 2 semanas, talla 0-3M por favor')}
            className="whitespace-nowrap px-2 py-0.5 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            🍼 Nace en 2 semanas (0-3M)
          </button>
          <button
            type="button"
            onClick={() => setInputText('¿Qué colores tienen en stock inmediato?')}
            className="whitespace-nowrap px-2 py-0.5 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            🎨 ¿Colores disponibles?
          </button>
        </div>

        {/* Input box */}
        <form
          onSubmit={handleSend}
          className="p-2 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            className="flex-1 h-9 px-3 bg-slate-100 rounded-full text-xs text-slate-800 outline-none focus:ring-1 focus:ring-[#00685d]"
            placeholder="Escribe a Sarah Concierge..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#075E54] hover:bg-[#128C7E] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
