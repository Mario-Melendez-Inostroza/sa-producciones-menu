import { useState } from "react";
import { useApp, menuHistory } from "../context/AppContext";
import type { MenuItem, Aviso, AvisoType } from "../context/AppContext";

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

let nextId = 100;

function LogoSA({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="S&A Producciones">
      <defs>
        <radialGradient id="lg2" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F06292" />
          <stop offset="100%" stopColor="#AD1457" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#lg2)" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <text x="50" y="48" textAnchor="middle" fill="white" fontSize="26" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="-1">S&amp;A</text>
      <text x="50" y="63" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="Arial, sans-serif" letterSpacing="2.5" opacity="0.9">BANQUETERÍA</text>
    </svg>
  );
}

function AvisaBannerPreview({ aviso }: { aviso: Aviso }) {
  if (aviso.type === "normal") {
    return (
      <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-xl px-4 py-3 flex items-start gap-2">
        <span className="text-[#059669] font-700">✓</span>
        <span className="text-[#065F46] text-sm font-600">{aviso.message}</span>
      </div>
    );
  }
  if (aviso.type === "importante") {
    return (
      <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-3 flex items-start gap-2">
        <span className="text-xl">⚠️</span>
        <div>
          <div className="font-display font-800 text-[#92400E] text-xs uppercase tracking-wider">{aviso.title}</div>
          <div className="text-[#78350F] text-sm mt-0.5">{aviso.message}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-primary border border-primary rounded-xl px-4 py-3 flex items-start gap-2">
      <span className="text-xl">🔒</span>
      <div>
        <div className="font-display font-900 text-white text-xs uppercase tracking-wider">HOY ESTAREMOS CERRADOS</div>
        <div className="text-white/90 text-sm mt-0.5">{aviso.message}</div>
      </div>
    </div>
  );
}

function EditarMenuSection() {
  const { menuItems, setMenuItems } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({ name: "", description: "", price: 6000, available: true, category: "principal" });
  const [saved, setSaved] = useState(false);

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    setMenuItems(menuItems.map(i => i.id === editingId ? { ...i, ...editForm } as MenuItem : i));
    setEditingId(null);
    setEditForm({});
  };

  const toggleAvailable = (id: string) => {
    setMenuItems(menuItems.map(i => i.id === id ? { ...i, available: !i.available } : i));
  };

  const deleteItem = (id: string) => {
    setMenuItems(menuItems.filter(i => i.id !== id));
  };

  const addItem = () => {
    if (!newItem.name || !newItem.price) return;
    setMenuItems([...menuItems, { id: String(++nextId), name: newItem.name!, description: newItem.description || "", price: Number(newItem.price), available: true, category: newItem.category || "principal" }]);
    setNewItem({ name: "", description: "", price: 6000, available: true, category: "principal" });
    setShowAddForm(false);
  };

  const handleSaveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const categories: Array<{ key: MenuItem["category"]; label: string }> = [
    { key: "principal", label: "Principales" },
    { key: "extra", label: "Extras" },
    { key: "ninos", label: "Niños" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-800 text-dark text-xl">Editar Menú de Hoy</h2>
          <p className="text-muted text-sm mt-0.5">Martes 8 de septiembre, 2026</p>
        </div>
        <button onClick={handleSaveAll} className={`font-display font-700 text-sm px-5 py-2.5 rounded-full transition-all ${saved ? "bg-[#166534] text-white" : "bg-primary hover:bg-primary-hover text-white hover:scale-105"}`}>
          {saved ? "✓ Guardado" : "Guardar cambios"}
        </button>
      </div>

      {categories.map(({ key, label }) => {
        const items = menuItems.filter(i => i.category === key);
        if (items.length === 0) return null;
        return (
          <div key={key} className="mb-6">
            <h3 className="font-display font-700 text-muted text-xs uppercase tracking-widest mb-3">{label}</h3>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="bg-white border border-border rounded-xl overflow-hidden">
                  {editingId === item.id ? (
                    <div className="p-4 space-y-3">
                      <input className="w-full border border-border rounded-lg px-3 py-2 text-sm font-display font-600 focus:outline-none focus:border-primary" value={editForm.name || ""} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="Nombre del plato" />
                      <input className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" value={editForm.description || ""} onChange={e => setEditForm({ ...editForm, description: e.target.value })} placeholder="Descripción" />
                      <div className="flex gap-2">
                        <input type="number" className="w-32 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" value={editForm.price || 0} onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })} placeholder="Precio" />
                        <select className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" value={editForm.category || "principal"} onChange={e => setEditForm({ ...editForm, category: e.target.value as MenuItem["category"] })}>
                          <option value="principal">Principal</option>
                          <option value="extra">Extra</option>
                          <option value="ninos">Niños</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="bg-primary text-white font-display font-700 text-sm px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors">Guardar</button>
                        <button onClick={() => setEditingId(null)} className="bg-sand text-dark font-display font-600 text-sm px-4 py-2 rounded-lg hover:bg-sand-dark transition-colors">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex items-center gap-3">
                      <button onClick={() => toggleAvailable(item.id)} className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${item.available ? "bg-primary border-primary" : "border-border bg-white"}`}>
                        {item.available && <span className="text-white text-[10px]">✓</span>}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className={`font-display font-700 text-sm ${!item.available ? "text-muted line-through" : "text-dark"}`}>{item.name}</div>
                        {item.description && <div className="text-muted text-xs truncate">{item.description}</div>}
                      </div>
                      <div className="font-display font-800 text-amber text-sm shrink-0">{formatPrice(item.price)}</div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg hover:bg-sand text-muted hover:text-dark transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg hover:bg-[#FEF2F2] text-muted hover:text-primary transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {showAddForm ? (
        <div className="bg-white border-2 border-dashed border-primary/40 rounded-xl p-4 space-y-3 mb-4">
          <div className="font-display font-700 text-dark text-sm mb-1">Nuevo plato</div>
          <input className="w-full border border-border rounded-lg px-3 py-2.5 text-sm font-600 focus:outline-none focus:border-primary" value={newItem.name || ""} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="Nombre del plato *" />
          <input className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" value={newItem.description || ""} onChange={e => setNewItem({ ...newItem, description: e.target.value })} placeholder="Descripción (opcional)" />
          <div className="flex gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
              <input type="number" className="w-32 border border-border rounded-lg pl-6 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary" value={newItem.price || ""} onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })} placeholder="Precio" />
            </div>
            <select className="border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" value={newItem.category || "principal"} onChange={e => setNewItem({ ...newItem, category: e.target.value as MenuItem["category"] })}>
              <option value="principal">Principal</option>
              <option value="extra">Extra</option>
              <option value="ninos">Niños</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addItem} className="bg-primary text-white font-display font-700 text-sm px-5 py-2.5 rounded-lg hover:bg-primary-hover transition-colors">Agregar plato</button>
            <button onClick={() => setShowAddForm(false)} className="bg-sand text-dark font-display font-600 text-sm px-4 py-2.5 rounded-lg hover:bg-sand-dark transition-colors">Cancelar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAddForm(true)} className="w-full border-2 border-dashed border-border hover:border-primary/50 rounded-xl py-3.5 text-muted hover:text-primary font-display font-600 text-sm transition-colors flex items-center justify-center gap-2">
          <span className="text-lg">+</span> Agregar plato
        </button>
      )}
    </div>
  );
}

function PublicarAvisoSection() {
  const { aviso, setAviso } = useApp();
  const [draft, setDraft] = useState<Aviso>({ ...aviso });
  const [published, setPublished] = useState(false);

  const typeOptions: Array<{ type: AvisoType; label: string; icon: string; color: string }> = [
    { type: "normal", label: "Atención normal", icon: "✓", color: "bg-[#ECFDF5] border-[#D1FAE5] text-[#065F46]" },
    { type: "importante", label: "Aviso importante", icon: "⚠️", color: "bg-amber-light border-amber text-warning" },
    { type: "cerrado", label: "Estamos cerrados", icon: "🔒", color: "bg-[#FEF2F2] border-primary text-primary" },
  ];

  const handlePublish = () => {
    setAviso(draft);
    setPublished(true);
    setTimeout(() => setPublished(false), 2500);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display font-800 text-dark text-xl">Publicar aviso</h2>
        <p className="text-muted text-sm mt-0.5">Este aviso aparecerá destacado en la página para tus clientes.</p>
      </div>

      <div className="space-y-3 mb-6">
        {typeOptions.map(opt => (
          <button key={opt.type} onClick={() => setDraft({ ...draft, type: opt.type })} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${draft.type === opt.type ? opt.color + " border-current" : "bg-white border-border hover:border-primary/30"}`}>
            <span className="text-xl">{opt.icon}</span>
            <span className={`font-display font-700 text-sm ${draft.type === opt.type ? "" : "text-dark"}`}>{opt.label}</span>
            {draft.type === opt.type && <span className="ml-auto text-xs font-600">Seleccionado</span>}
          </button>
        ))}
      </div>

      {draft.type !== "normal" && (
        <div className="space-y-3 mb-6 bg-sand rounded-xl p-4">
          <div>
            <label className="text-xs font-display font-700 text-muted uppercase tracking-wider block mb-1.5">Título del aviso</label>
            <input className="w-full border border-border rounded-lg px-3 py-2.5 text-sm font-600 focus:outline-none focus:border-primary bg-white" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="Ej: Aviso importante para hoy" />
          </div>
          <div>
            <label className="text-xs font-display font-700 text-muted uppercase tracking-wider block mb-1.5">Mensaje</label>
            <textarea rows={3} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none bg-white" value={draft.message} onChange={e => setDraft({ ...draft, message: e.target.value })} placeholder="Escribe el mensaje para tus clientes..." />
          </div>
        </div>
      )}

      {draft.type === "normal" && (
        <div className="mb-6 bg-sand rounded-xl p-4">
          <label className="text-xs font-display font-700 text-muted uppercase tracking-wider block mb-1.5">Mensaje de bienvenida</label>
          <input className="w-full border border-border rounded-lg px-3 py-2.5 text-sm font-600 focus:outline-none focus:border-primary bg-white" value={draft.message} onChange={e => setDraft({ ...draft, message: e.target.value })} />
        </div>
      )}

      <div className="mb-5">
        <div className="text-xs font-display font-700 text-muted uppercase tracking-wider mb-2">Vista previa del aviso</div>
        <AvisaBannerPreview aviso={draft} />
      </div>

      <button onClick={handlePublish} className={`w-full font-display font-800 text-base py-4 rounded-xl transition-all ${published ? "bg-[#166534] text-white" : "bg-primary hover:bg-primary-hover text-white hover:scale-[1.01] active:scale-[0.99]"}`}>
        {published ? "✓ Aviso publicado en la página" : "Publicar aviso"}
      </button>
    </div>
  );
}

function HistorialSection() {
  const { setMenuItems } = useApp();
  const [usedId, setUsedId] = useState<string | null>(null);

  const useAsBase = (h: typeof menuHistory[0]) => {
    setMenuItems([...h.items]);
    setUsedId(h.date);
    setTimeout(() => setUsedId(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display font-800 text-dark text-xl">Historial de menús</h2>
        <p className="text-muted text-sm mt-0.5">Reutiliza un menú anterior como base para hoy.</p>
      </div>
      <div className="space-y-3">
        {menuHistory.map(h => (
          <div key={h.date} className="bg-white border border-border rounded-xl p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-display font-700 text-dark text-sm">{h.label}</div>
              <div className="text-muted text-xs mt-0.5 flex items-center gap-1">
                <span className="text-[#059669]">✓</span>
                <span>Publicado · {h.items.filter(i => i.available).length} platos disponibles</span>
              </div>
            </div>
            <button onClick={() => useAsBase(h)} className={`shrink-0 font-display font-700 text-xs px-4 py-2 rounded-full transition-all ${usedId === h.date ? "bg-[#ECFDF5] text-[#065F46] border border-[#D1FAE5]" : "bg-sand hover:bg-primary hover:text-white text-dark border border-border hover:border-primary"}`}>
              {usedId === h.date ? "✓ Aplicado" : "Usar como base"}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-sand rounded-xl p-4 text-sm text-muted text-center">
        <span className="font-600 text-dark">Tip:</span> Al usar un menú anterior como base, puedes editarlo libremente en la sección "Editar Menú".
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { setCurrentView, adminSection, setAdminSection } = useApp();

  const sections = [
    { key: "dashboard" as const, label: "Inicio", icon: "🏠" },
    { key: "menu" as const, label: "Menú", icon: "🍽️" },
    { key: "aviso" as const, label: "Avisos", icon: "📢" },
    { key: "historial" as const, label: "Historial", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => setCurrentView("public")} className="p-2 rounded-lg hover:bg-sand transition-colors text-muted hover:text-dark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <LogoSA size={34} />
          <div>
            <div className="font-display font-800 text-dark text-sm leading-tight">Panel de administración</div>
            <div className="text-muted text-xs">S&A Producciones</div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 flex gap-1 pb-2">
          {sections.map(s => (
            <button key={s.key} onClick={() => setAdminSection(s.key)} className={`flex-1 flex flex-col sm:flex-row items-center gap-1 py-2 px-1 rounded-lg text-xs font-display font-700 transition-all ${adminSection === s.key ? "bg-primary text-white" : "text-muted hover:text-dark hover:bg-sand"}`}>
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {adminSection === "dashboard" && (
          <div>
            <div className="mb-7">
              <h1 className="font-display font-900 text-dark text-2xl">Hola 👋</h1>
              <p className="text-muted text-base mt-1">¿Qué quieres actualizar hoy?</p>
            </div>
            <div className="space-y-3">
              {[
                { key: "menu" as const, icon: "🍽️", title: "Editar menú de hoy", desc: "Agrega, edita o desactiva platos del día", color: "border-l-4 border-l-primary" },
                { key: "aviso" as const, icon: "📢", title: "Publicar aviso", desc: "Informa a tus clientes sobre cambios o novedades", color: "border-l-4 border-l-amber" },
                { key: "historial" as const, icon: "📋", title: "Ver historial", desc: "Reutiliza un menú anterior como punto de partida", color: "border-l-4 border-l-rose" },
              ].map(action => (
                <button key={action.key} onClick={() => setAdminSection(action.key)} className={`w-full bg-white ${action.color} rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-all hover:-translate-x-0.5 text-left`}>
                  <span className="text-3xl">{action.icon}</span>
                  <div>
                    <div className="font-display font-800 text-dark text-base">{action.title}</div>
                    <div className="text-muted text-sm mt-0.5">{action.desc}</div>
                  </div>
                  <div className="ml-auto text-muted">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 bg-white border border-border rounded-xl p-4">
              <div className="font-display font-700 text-dark text-sm mb-3">Vista rápida de la página</div>
              <button onClick={() => setCurrentView("public")} className="w-full bg-sand hover:bg-sand-dark text-dark font-display font-700 text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Ver cómo ve el cliente la página
              </button>
            </div>
          </div>
        )}
        {adminSection === "menu" && <EditarMenuSection />}
        {adminSection === "aviso" && <PublicarAvisoSection />}
        {adminSection === "historial" && <HistorialSection />}
      </main>
    </div>
  );
}
