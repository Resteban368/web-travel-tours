'use client';

import { useEffect } from 'react';

export function RevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-anim]'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('anim-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    els.forEach((el) => {
      const delay = el.dataset.animDelay;
      if (delay) el.style.transitionDelay = delay;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
