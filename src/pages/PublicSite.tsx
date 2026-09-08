import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { MenuItem } from "../context/AppContext";
import heroImg from "@/imports/hero_almuerxo.png";

const WA_NUMBER = "56912345678";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const IG_LINK = "https://www.instagram.com/producciones_sya/";

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

function LogoSA({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="S&A Producciones">
      <defs>
        <radialGradient id="logoGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F06292" />
          <stop offset="100%" stopColor="#AD1457" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#logoGrad)" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <text x="50" y="48" textAnchor="middle" fill="white" fontSize="26" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="-1">S&amp;A</text>
      <text x="50" y="63" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="Arial, sans-serif" letterSpacing="2.5" opacity="0.9">BANQUETERÍA</text>
    </svg>
  );
}

function Header({ onAdminClick }: { onAdminClick: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Menú del día", href: "#menu" },
    { label: "Banquetería", href: "#banqueteria" },
    { label: "Contacto", href: "#contacto" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <LogoSA size={42} />
          <div className="hidden sm:block">
            <div className="font-display font-800 text-dark text-[15px] leading-tight tracking-tight">S&A Producciones</div>
            <div className="text-muted text-[10px] font-500 tracking-widest uppercase">La Florida · Santiago</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="px-3 py-2 text-sm font-display font-600 text-dark hover:text-primary transition-colors rounded-lg hover:bg-sand">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#menu" className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-display font-700 text-[13px] px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95">
            Ver menú de hoy
          </a>
          <button className="md:hidden p-2 rounded-lg hover:bg-sand transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-dark transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-dark transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-dark transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="py-3 px-2 font-display font-600 text-dark border-b border-border/50 last:border-0 hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
          <a href="#menu" className="mt-2 flex items-center justify-center gap-2 bg-primary text-white font-display font-700 py-3 rounded-xl">
            Ver menú de hoy
          </a>
          <button onClick={onAdminClick} className="mt-1 py-2 text-xs text-muted text-center">
            Acceso administrador
          </button>
        </div>
      )}
    </header>
  );
}

function AvisoBanner() {
  const { aviso } = useApp();
  if (aviso.type === "normal") {
    return (
      <div className="bg-[#ECFDF5] border-b border-[#D1FAE5] px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <span className="text-[#059669]">✓</span>
          <span className="font-display font-600 text-[#065F46] text-sm">{aviso.message}</span>
        </div>
      </div>
    );
  }
  if (aviso.type === "importante") {
    return (
      <div className="bg-amber-light border-b border-amber px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-start gap-3">
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <div className="font-display font-800 text-warning text-[13px] uppercase tracking-wider">{aviso.title}</div>
            <div className="text-dark text-sm mt-0.5">{aviso.message}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-primary px-4 py-3.5">
      <div className="max-w-6xl mx-auto flex items-start gap-3">
        <span className="text-xl mt-0.5">🔒</span>
        <div>
          <div className="font-display font-900 text-white text-[14px] uppercase tracking-wider">HOY ESTAREMOS CERRADOS</div>
          <div className="text-white/90 text-sm mt-0.5">{aviso.message}</div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden" style={{ minHeight: "88dvh" }}>
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Cazuela de pollo chilena con ensalada a la chilena y pebre"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradiente: muy oscuro a la izquierda para legibilidad del texto, se abre hacia la derecha para mostrar los platos */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(28,24,20,0.88) 0%, rgba(28,24,20,0.65) 45%, rgba(28,24,20,0.25) 70%, rgba(28,24,20,0.10) 100%)" }} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col justify-center" style={{ minHeight: "88dvh" }}>
        <div className="max-w-lg py-20">
          <div className="inline-flex items-center gap-2 bg-primary/90 text-white text-xs font-display font-700 px-3 py-1.5 rounded-full mb-5 tracking-wider uppercase">
            <span>🍽️</span> Colaciones caseras · La Florida
          </div>
          <h1 className="font-display font-900 text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight mb-4">
            Colaciones<br />
            <span className="text-amber-light italic">caseras</span><br />
            todos los días
          </h1>
          <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-sm">
            Almuerzos preparados con cariño para servir o llevar en La Florida, Santiago.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#menu" className="bg-primary hover:bg-primary-hover text-white font-display font-700 px-6 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
              Ver menú de hoy
            </a>
            <a href="#banqueteria" className="bg-white/15 hover:bg-white/25 text-white font-display font-700 px-6 py-3.5 rounded-full border border-white/30 transition-all hover:scale-105 active:scale-95">
              Banquetería
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function DishCard({ item }: { item: MenuItem }) {
  return (
    <div className={`relative bg-white rounded-2xl p-4 border transition-all hover:shadow-md group ${!item.available ? "opacity-60" : "border-border hover:border-primary/30"}`}>
      {!item.available && (
        <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center z-10">
          <span className="bg-dark/80 text-white text-xs font-display font-700 px-3 py-1.5 rounded-full uppercase tracking-wider">Agotado</span>
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-700 text-dark text-[15px] leading-snug">{item.name}</h3>
          {item.description && <p className="text-muted text-xs mt-0.5">{item.description}</p>}
        </div>
        <div className="shrink-0">
          <span className="bg-amber text-white font-display font-800 text-[15px] px-3 py-1 rounded-lg block text-right whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
          <div className="text-muted text-[9px] text-right mt-0.5 font-600 uppercase tracking-wide">para servir</div>
        </div>
      </div>
    </div>
  );
}

function MenuDelDia() {
  const { menuItems } = useApp();
  const principales = menuItems.filter((i) => i.category === "principal");
  const extras = menuItems.filter((i) => i.category === "extra");
  const ninos = menuItems.filter((i) => i.category === "ninos");

  const today = new Date(2026, 8, 8);
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const dateLabel = `${dayNames[today.getDay()]} ${today.getDate()} de ${monthNames[today.getMonth()]}`;

  return (
    <section id="menu" className="bg-cream py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary font-display font-700 text-xs uppercase tracking-widest mb-3">
            <div className="w-8 h-px bg-primary" />
            Menú del día
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display font-900 text-dark text-3xl sm:text-4xl tracking-tight">Menú de hoy</h2>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-primary text-white font-display font-700 text-sm px-4 py-1.5 rounded-full uppercase tracking-wider">
            📅 {dateLabel.toUpperCase()}
          </div>
        </div>

        <div className="bg-sand rounded-2xl p-4 mb-3 border border-sand-dark">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-display font-700 text-dark text-sm">Agregados incluidos:</span>
            {["Arroz + papas fritas", "Arroz + papas mayo", "Arroz + salpicón"].map((a) => (
              <span key={a} className="bg-white border border-border text-dark text-xs font-500 px-2.5 py-1 rounded-full">{a}</span>
            ))}
          </div>
          <p className="text-muted text-xs mt-2">Cambio de agregado: <span className="font-700 text-dark">$500 adicional</span> · Todos incluyen ensalada, consomé, pan y pebre + bebida</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h3 className="font-display font-800 text-dark text-base uppercase tracking-wide">Platos principales</h3>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {principales.map((item) => <DishCard key={item.id} item={item} />)}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-rose rounded-full" />
            <h3 className="font-display font-800 text-dark text-base uppercase tracking-wide">Extras</h3>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {extras.map((item) => <DishCard key={item.id} item={item} />)}
          </div>
        </div>

        {ninos.map((item) => (
          <div key={item.id} className="bg-[#F3E8FF] border border-[#E9D5FF] rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🧒</span>
                  <h3 className="font-display font-800 text-[#6B21A8] text-lg">{item.name}</h3>
                </div>
                <p className="text-[#7C3AED] text-sm">{item.description}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="bg-[#7C3AED] text-white font-display font-900 text-xl px-4 py-1.5 rounded-xl">{formatPrice(item.price)}</div>
                <div className="text-[#9C6FE4] text-[9px] mt-0.5 font-600 uppercase tracking-wide">para servir</div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="font-display font-700 text-dark text-sm mb-2">🥡 Para llevar</div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted">Adicional envases</span>
                <span className="font-display font-700 text-primary">{formatPrice(600)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Con consomé incluido</span>
                <span className="font-display font-700 text-primary">{formatPrice(900)}</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="font-display font-700 text-dark text-sm mb-2">🍲 Consomé (suelto)</div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted">Para servir</span>
                <span className="font-display font-700 text-primary">{formatPrice(1500)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Para llevar</span>
                <span className="font-display font-700 text-primary">{formatPrice(1700)}</span>
              </div>
              <p className="text-muted text-xs">Incluye pan y pebre</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-sand rounded-2xl p-4 text-center border border-sand-dark">
          <p className="text-dark text-sm font-500">
            🏠 <span className="font-700">Para servir:</span> ven directamente a nuestro local en La Florida.<br />
            <span className="text-muted text-xs mt-1 block">También disponible para llevar · Los esperamos 🙌</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Banqueteria() {
  const services = [
    { icon: "💍", title: "Matrimonios", desc: "Hacemos de tu día especial un momento único e inolvidable.", img: "1519225421980-715cb0215aed" },
    { icon: "🎂", title: "Bautizos y celebraciones", desc: "Atención personalizada para tus momentos más importantes.", img: "1737682599438-319b61711b5f" },
    { icon: "☕", title: "Coffee Break", desc: "Desayunos y breaks corporativos con variedad y calidad.", img: "1672826979217-7156a305acf5" },
    { icon: "🍽️", title: "Catering", desc: "Servicio completo de alimentación para grupos y empresas.", img: "1637059395523-d5a35541d544" },
    { icon: "🥐", title: "Desayunos a domicilio", desc: "Sorprende a alguien especial con un desayuno en su casa.", img: "1525441273400-056e9c7517b3" },
    { icon: "🎉", title: "Eventos corporativos", desc: "Reuniones, lanzamientos y eventos de empresa con estilo.", img: "1644753787064-9f2846d6c995" },
  ];

  return (
    <section id="banqueteria" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-rose font-display font-700 text-xs uppercase tracking-widest mb-3">
            <div className="w-8 h-px bg-rose" />
            Banquetería
            <div className="w-8 h-px bg-rose" />
          </div>
          <h2 className="font-display font-900 text-dark text-3xl sm:text-4xl tracking-tight max-w-lg mx-auto leading-tight">
            También hacemos de tus momentos algo especial
          </h2>
          <p className="text-muted mt-3 text-base max-w-md mx-auto">
            Servicios de banquetería para celebraciones y eventos en toda la Región Metropolitana.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-0.5">
              <div className="h-44 overflow-hidden bg-sand">
                <img
                  src={`https://images.unsplash.com/photo-${s.img}?w=600&h=400&fit=crop&auto=format`}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <h3 className="font-display font-700 text-dark text-base">{s.title}</h3>
                </div>
                <p className="text-muted text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 bg-rose hover:bg-[#AD1457] text-white font-display font-700 text-base px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.097 1.508 5.818L.057 23.885a.5.5 0 00.606.606l6.08-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-4.988-1.365l-.357-.212-3.704.883.9-3.606-.232-.371A9.794 9.794 0 012.182 12C2.182 6.569 6.569 2.182 12 2.182S21.818 6.569 21.818 12 17.431 21.818 12 21.818z"/>
            </svg>
            💬 Cotizar mi evento por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Galeria() {
  const photos = [
    { id: "1519225421980-715cb0215aed", alt: "Mesa de matrimonio" },
    { id: "1525441273400-056e9c7517b3", alt: "Montaje elegante" },
    { id: "1737682599438-319b61711b5f", alt: "Iluminación de evento" },
    { id: "1672826979217-7156a305acf5", alt: "Coffee break corporativo" },
    { id: "1637059395523-d5a35541d544", alt: "Servicio de catering" },
    { id: "1608500218987-0f2b3be34b47", alt: "Comida casera servida" },
  ];
  return (
    <section className="py-16 px-4 bg-sand">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-dark font-display font-700 text-xs uppercase tracking-widest mb-3">
            <div className="w-8 h-px bg-dark/40" />
            Galería
            <div className="w-8 h-px bg-dark/40" />
          </div>
          <h2 className="font-display font-900 text-dark text-3xl sm:text-4xl tracking-tight">Conoce nuestro trabajo</h2>
          <p className="text-muted mt-2">Inspiración real de nuestros eventos y servicios</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {photos.map((photo, i) => (
            <div key={photo.id} className={`rounded-xl overflow-hidden bg-sand-dark group ${i === 0 ? "col-span-2 sm:col-span-1 row-span-2" : ""}`}>
              <img
                src={`https://images.unsplash.com/photo-${photo.id}?w=500&h=500&fit=crop&auto=format`}
                alt={photo.alt}
                className="w-full h-full object-cover min-h-40 group-hover:scale-105 transition-transform duration-500"
                style={{ minHeight: i === 0 ? "320px" : "160px" }}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={IG_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 bg-dark hover:bg-dark/80 text-white font-display font-700 px-7 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Ver Instagram @producciones_sya
          </a>
        </div>
      </div>
    </section>
  );
}

function Contacto() {
  return (
    <section id="contacto" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary font-display font-700 text-xs uppercase tracking-widest mb-3">
          <div className="w-8 h-px bg-primary" />
          Contacto
          <div className="w-8 h-px bg-primary" />
        </div>
        <h2 className="font-display font-900 text-dark text-3xl sm:text-4xl tracking-tight">¿Tienes alguna pregunta?</h2>
        <p className="text-muted mt-3 text-base">¿Tienes un evento o celebración en mente? Cotiza tu banquetería directo por WhatsApp.</p>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { icon: "📍", label: "Ubicación", value: "La Florida, Santiago" },
            { icon: "📱", label: "WhatsApp", value: "+56 9 1234 5678" },
            { icon: "📸", label: "Instagram", value: "@producciones_sya" },
          ].map((c) => (
            <div key={c.label} className="bg-sand rounded-xl p-5 flex flex-col items-center gap-2">
              <div className="text-3xl">{c.icon}</div>
              <div className="font-display font-700 text-dark text-sm">{c.label}</div>
              <div className="text-muted text-sm text-center">{c.value}</div>
            </div>
          ))}
        </div>

        <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fbb5a] text-white font-display font-800 text-lg px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.097 1.508 5.818L.057 23.885a.5.5 0 00.606.606l6.08-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-4.988-1.365l-.357-.212-3.704.883.9-3.606-.232-.371A9.794 9.794 0 012.182 12C2.182 6.569 6.569 2.182 12 2.182S21.818 6.569 21.818 12 17.431 21.818 12 21.818z"/>
          </svg>
          💬 Cotizar banquetería por WhatsApp
        </a>
      </div>
    </section>
  );
}

function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <footer className="bg-dark text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <LogoSA size={48} />
            <div>
              <div className="font-display font-800 text-white text-base">S&A Producciones</div>
              <div className="text-white/50 text-xs mt-0.5">Colaciones y banquetería en La Florida</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Menú del día", href: "#menu" },
              { label: "Banquetería", href: "#banqueteria" },
              { label: "Contacto", href: "#contacto" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-white/70 hover:text-white transition-colors font-500">{l.label}</a>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] px-4 py-2 rounded-lg text-sm font-display font-600 transition-colors flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.097 1.508 5.818L.057 23.885a.5.5 0 00.606.606l6.08-1.45A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-4.988-1.365l-.357-.212-3.704.883.9-3.606-.232-.371A9.794 9.794 0 012.182 12C2.182 6.569 6.569 2.182 12 2.182S21.818 6.569 21.818 12 17.431 21.818 12 21.818z"/></svg>
              WhatsApp
            </a>
            <a href={IG_LINK} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-4 py-2 rounded-lg text-sm font-display font-600 transition-colors flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© 2026 S&A Producciones · La Florida, Santiago de Chile</span>
          <button onClick={onAdminClick} className="hover:text-white/70 transition-colors">
            Panel administrador
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function PublicSite() {
  const { setCurrentView } = useApp();
  const goAdmin = () => setCurrentView("admin");
  return (
    <div className="min-h-screen flex flex-col">
      <Header onAdminClick={goAdmin} />
      <AvisoBanner />
      <main className="flex-1">
        <Hero />
        <MenuDelDia />
        <Banqueteria />
        <Galeria />
        <Contacto />
      </main>
      <Footer onAdminClick={goAdmin} />
    </div>
  );
}
