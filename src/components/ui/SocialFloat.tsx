export function SocialFloat() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/TravelToursoficial?locale=es_LA"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Síguenos en Facebook"
        className="flex items-center justify-center w-12 h-12 rounded-l-xl transition-all duration-200 hover:-translate-x-1 hover:shadow-lg"
        style={{ backgroundColor: '#1877F2' }}
      >
        <svg viewBox="0 0 24 24" fill="white" width="22" height="22" aria-hidden="true">
          <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9V12h2.538V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/traveltours_oficial/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Síguenos en Instagram"
        className="flex items-center justify-center w-12 h-12 rounded-l-xl transition-all duration-200 hover:-translate-x-1 hover:shadow-lg"
        style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
      >
        <svg viewBox="0 0 24 24" fill="white" width="21" height="21" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@traveltours.oficial"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Síguenos en TikTok"
        className="flex items-center justify-center w-12 h-12 rounded-l-xl transition-all duration-200 hover:-translate-x-1 hover:shadow-lg"
        style={{ backgroundColor: '#010101' }}
      >
        <svg viewBox="0 0 24 24" fill="white" width="20" height="20" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
        </svg>
      </a>
    </div>
  );
}
