'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { EMPRESA } from '@/lib/constants';
import { cn } from '@/lib/utils/cn';

const WA_NUMBER = EMPRESA.whatsapp.replace(/\D/g, '');

const GREETING =
  '¡Hola! 👋 Soy del equipo de *Travel Tours*. Estamos listos para ayudarte a planear tu próxima aventura. ¿En qué podemos ayudarte?';

export function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [shown, setShown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mostrar notificación tras 3 s para llamar la atención
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleSend = () => {
    const text = message.trim() || '¡Hola! Me gustaría recibir más información sobre sus tours.';
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggle = () => {
    setOpen((v) => !v);
    setShown(false);
  };

  return (
    <>
      {/* Panel de chat */}
      <div
        role="dialog"
        aria-label="Chat de WhatsApp"
        aria-hidden={!open}
        className={cn(
          'fixed bottom-24 right-5 z-50 w-[330px] max-w-[calc(100vw-40px)] rounded-2xl shadow-2xl overflow-hidden',
          'transition-all duration-350 origin-bottom-right',
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none',
        )}
      >
        {/* Header verde */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)' }}
        >
          <div className="relative shrink-0">
            <Image
              src="/LOGO.png"
              alt="Travel Tours"
              width={42}
              height={42}
              className="rounded-full object-contain bg-white p-0.5"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-[#075E54]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">{EMPRESA.nombre}</p>
            <p className="text-white/75 text-xs">En línea ahora</p>
          </div>
          <button
            onClick={toggle}
            aria-label="Cerrar chat"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:rotate-90 shrink-0"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>close</span>
          </button>
        </div>

        {/* Cuerpo */}
        <div
          className="flex flex-col gap-4 px-4 py-5"
          style={{ background: '#ECE5DD url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c8b8a2\' fill-opacity=\'0.25\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        >
          {/* Burbuja de saludo */}
          <div className="flex items-end gap-2">
            <Image
              src="/LOGO.png"
              alt=""
              width={28}
              height={28}
              className="rounded-full object-contain bg-white p-0.5 shrink-0 mb-0.5"
              aria-hidden
            />
            <div className="relative bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[85%]">
              {/* Cola de la burbuja */}
              <span
                aria-hidden
                className="absolute -left-2 bottom-3 w-3 h-3 bg-white"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
              <p className="text-[13px] text-[#303030] leading-relaxed whitespace-pre-line">
                {GREETING}
              </p>
              <p className="text-[10px] text-[#9B9B9B] text-right mt-1.5 select-none">
                {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Área de mensaje */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-black/5">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje aquí…"
              rows={3}
              className="w-full px-4 pt-3 pb-2 text-sm text-[#303030] placeholder:text-[#9B9B9B] resize-none outline-none bg-transparent leading-relaxed"
              aria-label="Escribe tu mensaje para WhatsApp"
            />
            <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-2">
              <span className="text-[11px] text-[#9B9B9B]">
                Enter para enviar · Shift+Enter nueva línea
              </span>
              <button
                onClick={handleSend}
                aria-label="Enviar por WhatsApp"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 shrink-0"
                style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>send</span>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {/* Tooltip / llamada a la acción */}
        <div
          aria-hidden={open || !shown}
          className={cn(
            'bg-white text-[#303030] text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-black/5 transition-all duration-300 origin-bottom-right',
            shown && !open
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 scale-95 pointer-events-none',
          )}
        >
          💬 ¿Necesitas ayuda?
        </div>

        <button
          onClick={toggle}
          aria-label={open ? 'Cerrar WhatsApp' : 'Abrir chat de WhatsApp'}
          aria-expanded={open}
          className={cn(
            'relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300',
            'hover:scale-110 hover:shadow-2xl active:scale-95',
            open && 'rotate-[360deg]',
          )}
          style={{ background: 'linear-gradient(145deg, #25D366 0%, #128C7E 100%)' }}
        >
          {/* Ping de notificación */}
          {!open && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-25" />
          )}

          {/* Badge mensaje */}
          {shown && !open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white select-none">
              1
            </span>
          )}

          {/* Ícono WhatsApp SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="white"
            width="28"
            height="28"
            aria-hidden="true"
            className={cn('transition-all duration-300', open ? 'opacity-0 scale-50 absolute' : 'opacity-100 scale-100')}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.862L.057 23.158a.75.75 0 0 0 .92.921l5.401-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.99 0-3.865-.537-5.476-1.476l-.39-.232-4.045 1.096 1.115-4.01-.255-.41A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>

          {/* X cuando está abierto */}
          <span
            className={cn(
              'material-symbols-outlined text-white transition-all duration-300',
              open ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute',
            )}
            style={{ fontSize: '1.6rem' }}
          >
            close
          </span>
        </button>
      </div>
    </>
  );
}
