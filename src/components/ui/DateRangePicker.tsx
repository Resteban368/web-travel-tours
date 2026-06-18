'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS  = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

function toDate(str: string): Date | null {
  if (!str) return null;
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatLabel(str: string): string {
  if (!str) return '';
  const d = toDate(str)!;
  return `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekday(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
}

interface DateRangePickerProps {
  desde: string;
  hasta: string;
  onDesdeChange: (v: string) => void;
  onHastaChange:  (v: string) => void;
}

export function DateRangePicker({ desde, hasta, onDesdeChange, onHastaChange }: DateRangePickerProps) {
  const today     = new Date();
  const startDate = toDate(desde);
  const endDate   = toDate(hasta);

  const [open,    setOpen]    = useState(false);
  const [viewY,   setViewY]   = useState(today.getFullYear());
  const [viewM,   setViewM]   = useState(today.getMonth());
  const [hovered, setHovered] = useState<Date | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const prevMonth = useCallback(() => {
    if (viewM === 0) { setViewM(11); setViewY(y => y - 1); }
    else setViewM(m => m - 1);
  }, [viewM]);

  const nextMonth = useCallback(() => {
    if (viewM === 11) { setViewM(0); setViewY(y => y + 1); }
    else setViewM(m => m + 1);
  }, [viewM]);

  const handleDayClick = useCallback((date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Nueva selección
      onDesdeChange(toStr(date));
      onHastaChange('');
    } else {
      // Ya hay start, definir end
      if (date < startDate) {
        onDesdeChange(toStr(date));
        onHastaChange('');
      } else {
        onHastaChange(toStr(date));
        setOpen(false);
      }
    }
  }, [startDate, endDate, onDesdeChange, onHastaChange]);

  const days = getDaysInMonth(viewY, viewM);
  const firstDay = getFirstWeekday(viewY, viewM);
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: days }, (_, i) => new Date(viewY, viewM, i + 1)),
  ];
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const effectiveEnd = startDate && !endDate && hovered ? hovered : endDate;

  function dayState(date: Date | null) {
    if (!date) return 'empty';
    const isStart  = startDate && sameDay(date, startDate);
    const isEnd    = effectiveEnd && sameDay(date, effectiveEnd);
    const inRange  = startDate && effectiveEnd && date > startDate && date < effectiveEnd;
    const isToday  = sameDay(date, today);
    return { isStart, isEnd, inRange, isToday };
  }

  const hasRange = desde || hasta;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest hover:border-primary hover:bg-primary/5 transition-all text-sm text-on-surface group"
      >
        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" style={{ fontSize: 18 }}>
          date_range
        </span>
        <span className={hasRange ? 'text-on-surface font-medium' : 'text-outline'}>
          {desde && hasta
            ? `${formatLabel(desde)}  →  ${formatLabel(hasta)}`
            : desde
            ? `Desde ${formatLabel(desde)}`
            : 'Seleccionar fechas'}
        </span>
        {hasRange && (
          <span
            className="material-symbols-outlined text-outline hover:text-red-400 transition-colors ml-1"
            style={{ fontSize: 16 }}
            onClick={(e) => { e.stopPropagation(); onDesdeChange(''); onHastaChange(''); }}
          >
            close
          </span>
        )}
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant p-5 w-[320px]">

          {/* Cabecera mes */}
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
            </button>
            <span className="font-display font-bold text-on-surface text-sm">
              {MESES[viewM]} {viewY}
            </span>
            <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
          </div>

          {/* Headers días */}
          <div className="grid grid-cols-7 mb-1">
            {DIAS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-outline uppercase py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Grid de días */}
          <div className="grid grid-cols-7">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const s = dayState(date);
              if (typeof s === 'string') return <div key={i} />;
              const { isStart, isEnd, inRange, isToday } = s;

              return (
                <div
                  key={i}
                  className="relative flex items-center justify-center h-9"
                  style={{
                    backgroundColor: inRange ? 'rgba(27,144,210,0.08)' : undefined,
                    borderRadius: isStart ? '8px 0 0 8px' : isEnd ? '0 8px 8px 0' : undefined,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleDayClick(date)}
                    onMouseEnter={() => startDate && !endDate && setHovered(date)}
                    onMouseLeave={() => setHovered(null)}
                    className="w-8 h-8 rounded-lg text-xs font-medium transition-all hover:scale-105"
                    style={{
                      backgroundColor: isStart || isEnd ? '#1B90D2' : undefined,
                      color: isStart || isEnd ? '#ffffff' : 'var(--color-on-surface)',
                      fontWeight: isToday || isStart || isEnd ? 700 : undefined,
                    }}
                  >
                    {date.getDate()}
                    {isToday && !isStart && !isEnd && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary block" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Leyenda / helper */}
          <div className="mt-4 pt-4 border-t border-outline-variant text-[11px] text-outline text-center">
            {!startDate
              ? 'Selecciona la fecha de inicio'
              : !endDate
              ? 'Ahora selecciona la fecha de fin'
              : `${formatLabel(desde)}  →  ${formatLabel(hasta)}`}
          </div>
        </div>
      )}
    </div>
  );
}
